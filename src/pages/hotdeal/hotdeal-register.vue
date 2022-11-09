<template>
  <q-page class="flex justify-center">

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>핫딜 신청</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
      </q-toolbar>
    </q-layout-header>

    <br>

    <div :style="`width: ${widthRate}%`">
      <table align="center" border="0" width="85%">
        <tr>
          <td width="120"><font size="3">핫딜 시작일</font></td>
          <td align="left">
            <q-select v-model="hotdealVo.start_date" :options="startDateOptions" @input="startDateChangedHandler" />
          </td>
        </tr>
        <tr>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td><font size="3">핫딜 종료일</font></td>
          <td align="left">
            <q-select v-model="hotdealVo.end_date" :options="endDateOptions" style="width:180px;" hide-underline readonly="" />
          </td>
        </tr>
        <tr>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td colspan="2">
            <font size="1" color="grey">
              ※ 사업자는 세금계산서 발행을 위해 '판매자 정보' 메뉴에서<br>사업자등록번호, 상호, 대표자명, 사업장주소, 업태, 종목, 이메일을 꼭 등록해주세요.
            </font>
          </td>
        </tr>
      </table>
      <br>

      <!-- 2. 상품 리스트 -->
      <q-card-separator />
      <q-infinite-scroll :handler="loadMore" ref="infiniteScroll">
        <!-- <div style="padding:0px 0px 0px 0px" v-for="(item, index) in productList" :key="item.seq_cart"> -->
        <div style="padding:0px 0px 0px 0px" v-for="item in productList" :key="item.seq">
          <q-item link style="padding:0px 0px 0px 0px">
            <table border="0" style="width: 100%; padding:5px 0px 5px 0px;" cellpadding="0" cellspacing="0">
              <thead>
                <th width="5" />
                <th width="50" />
                <th width="100" />
                <th width="" />
              </thead>
              <tr>
                <td rowspan="2"></td>
                <td rowspan="2"><img :src="item.image_url" style="width:60px; height:60px; object-fit:cover; border-radius: 3px; display: block;"></td>
                <td colspan="2">&nbsp;<font size="2" color="black">{{ item.title }}</font></td>
              </tr>
              <tr>
                <td>
                  &nbsp;
                  <q-checkbox v-model="item.checked" color="primary" @input="setTotalPrice(item)">
                    &nbsp;<font size="2" color="black">선택</font>
                  </q-checkbox>
                </td>
                <td align="right">
                  <font size="2" color="black">입금액 : &nbsp;</font>
                  <input type="number" v-model.trim="item.bid_price" style="width:40px" @change="setTotalPrice(item)" />
                  &nbsp;<font size="2" color="black">만원</font>&nbsp;&nbsp;&nbsp;
                </td>
              </tr>
            </table>
          </q-item>
          <q-card-separator />
        </div>
        <br>
        <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
      </q-infinite-scroll>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
    </div>

    <q-page-sticky expand position="bottom" style="background:white;height:50px;">
      <!-- 구매 버튼 -->
      <table border="0" :width="`${widthRate}%`" cellspacing="0" cellpadding="0" style="background:white;">
        <tr>
          <td width="28%" align="left">&nbsp;&nbsp;&nbsp;&nbsp;<q-checkbox v-model="checkAll" @input="changeCheckAll" color="primary">&nbsp;<font size="2" color="black">전체선택</font></q-checkbox></td>
          <td width="32%" align="center"><font size="3" color="red">{{ addComma(hotdealVo.total_price) }}</font>&nbsp;<font size="3" color="black">만원</font></td>
          <td width="40%">
            <q-btn color="primary" :loading="loading" :percentage="percentage" label="신청하기" @click="requestHotdeal" style="width:99%; height:40px;">
              <span slot="loading">
                <q-spinner-oval class="on-left" />
                신청중...
              </span>
            </q-btn>
          </td>
        </tr>
      </table>
    </q-page-sticky>
  </q-page>
</template>

<style>
</style>

<script>
import Vue from 'vue'

export default {
  name: 'hotdeal-register',
  data () {
    return {
      checkAll: false, // 전체선택/해제 체크박스
      pageSize: 15,
      lastPageNum: 1, // 마지막 페이지
      widthRate: 100, // 레이아웃 너비 % - PC화면 대응
      loading: false,
      percentage: 0,
      hotdealVo: {
        total_price: 0, // 총입금액
        seller_name: this.$store.state.sellerVo.seller_name
      }, // 핫딜 정보
      startDateOptions: [], // 핫딜 시작일 배열 - 콤보박스
      endDateOptions: [], // 핫딜 시작일 배열 - 콤보박스
      productList: [], // 장바구니의 상품 리스트
      orderProductList: [] // 선택한 상품 리스트 - buyOrderModal에 설정할 리스트
    }
  },
  components: {
  },
  created: function () {
    // 로그인 체크
    if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
      this.$router.push(this.$store.state.PAGE_LOGIN)
      return
    }

    if (this.$store.state.device === 'P') { // PC인 경우
      this.widthRate = 50 // 화면 너비 50%
    }

    // 상품 리스트 맥스 조회
    this.selectListMax()

    // 시작일 종료일 콤보박스 설정
    this.setDateOption()
  },
  methods: {
    // 시작일 종료일 콤보박스 설정
    setDateOption () {
      // 일주일 후 월요일 날짜 구하기
      this.startDateOptions = [] // 핫딜 시작일 옵션 리스트 초기화
      this.endDateOptions = [] // 핫딜 종료일 옵션 리스트 초기화
      let now = new Date()
      /*
      let nextMonday1 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (8 - now.getDay()))
      let nextMonday2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (15 - now.getDay()))
      let nextMonday3 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (22 - now.getDay()))
      let nextMonday4 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (29 - now.getDay()))
      */
      for (let w = 1; w < 5; w++) { // 4주치 정보(1개월) 설정
        let nextStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + ((1 + (7 * w)) - now.getDay()))
        let nextEndtDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + ((7 + (7 * w)) - now.getDay()))

        let startDateOption = {}
        let endDateOption = {}

        // 레이블 - 화면 표시 날짜
        startDateOption.label = nextStartDate.getFullYear() + '년 ' + (nextStartDate.getMonth() + 1) + '월 ' + nextStartDate.getDate() + '일 '
        endDateOption.label = nextEndtDate.getFullYear() + '년 ' + (nextEndtDate.getMonth() + 1) + '월 ' + nextEndtDate.getDate() + '일 '

        // 날짜 DATA - DB 저장용
        startDateOption.value = this.getYYYYMMDD(nextStartDate)
        endDateOption.value = this.getYYYYMMDD(nextEndtDate)

        this.startDateOptions.push(startDateOption)
        this.endDateOptions.push(endDateOption)
      }
    },
    // yyyyMMdd 포맷으로 반환
    getYYYYMMDD (date) {
      let year = date.getFullYear() // yyyy
      let month = (1 + date.getMonth()) // M
      month = month >= 10 ? month : '0' + month // MM
      let day = date.getDate() // d
      day = day >= 10 ? day : '0' + day // dd
      return year + '' + month + '' + day
    },
    // 핫딜시작일 변경 이벤트 처리
    startDateChangedHandler () {
      // alert(this.hotdealVo.start_date)
      if (this.hotdealVo.start_date != null && this.hotdealVo.start_date !== '') {
        // 선택된 인덱스 찾아서 핫딜 종료일 설정
        for (let i = 0; i < this.startDateOptions.length; i++) { // 핫딜 시작일 갯수만큼 반복
          if (this.startDateOptions[i].value === this.hotdealVo.start_date) { // 선택된 날짜와 같으면
            // 핫딜 종료일도 해당 인덱스로 설정 -> 처음부처 종료일은 시작일 + 6일 로 맞춰놨기 때문에 인덱스만 같으면 됨
            this.hotdealVo.end_date = this.endDateOptions[i].value
            break
          }
        }
      }
    },
    loadMore: function (index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      console.log('index: ' + index)
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        // alert(index)
        console.log('loadMore called index: ' + index)
        if (index <= this.lastPageNum) {
          this.selectList(index, done)
          if (index === this.lastPageNum) {
            this.$refs.infiniteScroll.stop()
          }
        }
      }, 500)
    },
    // 상품 리스트 마지막 페이지 조회
    selectListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/hotdeal/selectSellerProductListForHotdealLastPageNum',
        {params: {pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 상품 리스트 조회
    selectList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/hotdeal/selectSellerProductListForHotdeal',
        {params: {pageNum: idx, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.productList = [] // 리스트 초기화
          }
          this.productList = this.productList.concat(result.data)
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    },
    // 체크박스 선택 이벤트
    setTotalPrice (item) {
      if (item != null) { // 개별 체크 또는 수량 수정일 경우 - 전체선택은 제외
        // 주문 수량 정합성 체크
        if (item.bid_price === '' || item.bid_price < 1) { // 입찰금이 없을 경우
          item.bid_price = 1 // 1로 설정
        }
      }
      let total = 0
      for (let i = 0; i < this.productList.length; i++) {
        const product = this.productList[i]
        if (product.checked) { // 체크상태인 상품인 경우
          total += Number(product.bid_price) // 총액 더하기
        }
      }
      // 총 입금액 설정
      this.hotdealVo.total_price = total
    },
    // 체크박스 전체선택 이벤트
    changeCheckAll () {
      if (!this.checkAll) { // 전체선택이 체크상태일 경우
        // 전체 체크해제
        for (let i = 0; i < this.productList.length; i++) {
          const product = this.productList[i]
          product.checked = false // 해제
        }
      } else { // 전체선택이 체크상태가 아닐 경우
        // 전체 체크
        for (let i = 0; i < this.productList.length; i++) {
          const product = this.productList[i]
          product.checked = true // 체크
        }
      }
      // 총금액 계산
      this.setTotalPrice()
    },
    // 핫딜 신청
    requestHotdeal () {
      // 정합성 체크
      if (this.hotdealVo.start_date == null || this.hotdealVo.start_date === '' || // 핫딜 시작일
          this.hotdealVo.end_date == null || this.hotdealVo.end_date === '') { // 핫딜 종료일
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '핫딜 시작일을 선택해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.hotdealVo.total_price == null || this.hotdealVo.total_price === '') { // 입금액
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '입금액을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.hotdealVo.total_price < 1) { // 입금액
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '입금액을 확인해주세요.',
          icon: 'notifications_active'
        })
        return
      }

      // 핫딜상품 리스트 설정
      let hotdealProductList = []
      for (let i = 0; i < this.productList.length; i++) {
        const product = this.productList[i]
        if (product.checked) {
          let hotdealProductVo = {}
          hotdealProductVo.seq_product = product.seq // 상품시컨스
          hotdealProductVo.bid_price = product.bid_price // 입찰금액
          hotdealProductList.push(hotdealProductVo)
        }
      }
      this.hotdealVo.hotdealProductList = hotdealProductList

      this.loading = true
      // 핫딜 등록
      this.$axios.post(this.$store.state.apiServerIp + '/api/hotdeal/insertHotdeal', this.hotdealVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.loading = false
          if (result.data != null && result.data !== '') {
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: '핫딜이 신청되었습니다.',
              icon: 'notifications_active'
            })
            let seqHotdeal = result.data
            this.$router.push('/menu/hotdealDetail?seq=' + seqHotdeal)
          } else {
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: '신청에 실패했습니다. 항목을 확인해주세요.',
              icon: 'notifications_active'
            })
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '신청에 실패했습니다. 다시 신청해주세요.',
            icon: 'notifications_active'
          })
        })
    },
    // 상품 상세 화면으로 이동
    goProductDetail (seqProduct) {
      this.$router.push('/productDetail?seq=' + seqProduct)
    },
    addComma (num) {
      return Vue.prototype.$addComma(num)
    },
    goBack () {
      // 라우터 백 패스 설정
      let path = this.$store.state.ROUTER_FROM_PATH[this.$store.state.ROUTER_FROM_PATH.length - 1]
      // 라우터 백 패스 1개 삭제
      this.$store.state.ROUTER_FROM_PATH.splice(this.$store.state.ROUTER_FROM_PATH.length - 1, 1)
      // 뒤로가기 여부 - true일 경우 라우터 패스를 저장 안함, goBack() 함수 내에서 true로 설정, 라우터에서 false로 초기화
      this.$store.state.ROUTER_IS_MOVE_BACK = true
      // 라우터 백 패스로 이동
      this.$router.push(path)
    }
  }
}
</script>
