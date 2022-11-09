<template>
  <q-page class="">
    <q-layout-header>
      <q-toolbar
        color="black"
        inverted
      >
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>장바구니</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
      </q-toolbar>
    </q-layout-header>

    <!-- 주문 모달 -->
    <buyOrderModal ref="buyOrderModal" />

    <!-- 2. 상품 리스트 -->
    <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" >
      <q-infinite-scroll :handler="loadMore" ref="infiniteScroll">
        <div style="padding:0px 0px 0px 0px" v-for="(item, index) in productList" :key="item.seq_cart">
          <q-item link style="padding:0px 0px 0px 0px">
            <table border="0" style="width: 100%; padding:5px 0px 5px 0px;">
              <tr>
                <td colspan="2">
                  &nbsp;&nbsp;&nbsp;<q-checkbox v-model="item.check" color="primary" @input="setTotalPrice(item)" />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <!-- <q-input color="primary" v-model.trim="item.order_quantity" /> -->
                  <input type="number" v-model.trim="item.order_quantity" style="width:30px" @change="setTotalPrice(item)" />&nbsp;<font size="2" color="black">개</font>
                </td>
                <td colspan="4">
                  <font v-if="item.free_delivery_yn === 'true'" size="1" color="red">무료배송&nbsp;&nbsp;</font>
                  <font v-if="item.dawn_delivery_yn === 'true'" size="1" color="green">새벽배송&nbsp;&nbsp;</font>
                  <font size="1" color="blue">&nbsp;&nbsp;</font>
                </td>
                <td align="right"><q-btn dense color="red" label="삭제" @click="deleteProduct(index)" outline size="md" />&nbsp;&nbsp;</td>
              </tr>
              <tr>
                <td rowspan="5" width="150"><img :src="item.image_url" class='image-product-list'></td>
                <td rowspan="5" width="10">&nbsp;</td>
                <td colspan="5"><font size="2" color="grey">{{ item.subtitle }}&nbsp;</font></td>
              </tr>
              <tr>
                <td colspan="5"><a @click="goProductDetail(item.seq_product)">{{ item.title }}</a></td>
              </tr>
              <tr>
                <td colspan="5"><font size="2" color="red">{{ item.select_option1 }}&nbsp;{{ item.select_option2 }}&nbsp;{{ item.select_option3 }}</font></td>
              </tr>
              <tr>
                <td style="text-align: right;"><font size="2" color="grey">&nbsp;</font></td>
                <td><font size="4" color="black" style="font-weight:bold;">{{ addComma(item.order_price) }}&nbsp;원</font></td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td style="text-align: right;">
                  &nbsp;
                  <!-- <font size="1" color="grey">보상코인 {{ addComma(item.reward_coin) }}&nbsp;&nbsp;&nbsp;</font> -->
                </td>
              </tr>
              <tr>
                <td colspan="5" style="text-align: right;">
                  &nbsp;
                  <!--
                  <div v-if="item.avg_rating == null"><font size="1" color="orange">☆☆☆☆☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                  <div v-if="item.avg_rating === '1'"><font size="1" color="orange">★</font><font size="1" color="grey">☆☆☆☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                  <div v-if="item.avg_rating === '2'"><font size="1" color="orange">★★</font><font size="1" color="grey">☆☆☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                  <div v-if="item.avg_rating === '3'"><font size="1" color="orange">★★★</font><font size="1" color="grey">☆☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                  <div v-if="item.avg_rating === '4'"><font size="1" color="orange">★★★★</font><font size="1" color="grey">☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                  <div v-if="item.avg_rating === '5'"><font size="1" color="orange">★★★★★</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                  -->
                </td>
              </tr>
            </table>
          </q-item>
          <q-card-separator />
        </div>
        <br>
        <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
      </q-infinite-scroll>
    </q-pull-to-refresh>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <q-page-sticky expand position="bottom" style="background:white;height:50px;">
      <!-- 구매 버튼 -->
      <table border="0" width="100%" cellspacing="0" cellpadding="0" style="background:white;">
        <tr>
          <td width="28%" align="left">&nbsp;&nbsp;&nbsp;&nbsp;<q-checkbox v-model="checkAll" @input="changeCheckAll" color="primary">&nbsp;<font size="2" color="black">전체선택</font></q-checkbox></td>
          <td width="32%" align="center"><font size="3" color="red">{{ addComma(totalPrice) }}</font>&nbsp;<font size="3" color="black">원</font></td>
          <td width="40%"><q-btn color="primary" label="구매하기" @click="showBuyOrderModal" style="width:99%; height:40px;" /></td>
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
  name: 'cart-product-list',
  data () {
    return {
      checkAll: false, // 전체선택/해제 체크박스
      totalPrice: 0, // 선택 상품 총합
      refresherDone: '',
      pageSize: 15,
      lastPageNum: 1, // 마지막 페이지
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
    // this.selectList(0)
    this.selectListMax()
  },
  methods: {
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()

      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScroll.reset() // index 초기화
      this.$refs.infiniteScroll.resume() // stop에서 다시 재생
      this.$refs.infiniteScroll.loadMore() // loadMore로 검색
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

          // refresher 로딩메세지 처리
          if (this.refresherDone != null && this.refresherDone !== '') {
            this.refresherDone() // 로딩메세지 종료
            this.refresherDone = '' // 로딩메세지 초기화
          }
        }
      }, 500)
    },
    // 상품 리스트 마지막 페이지 조회
    selectListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/cart/selectCartProductListLastPageNum',
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
      this.$axios.get(this.$store.state.apiServerIp + '/api/cart/selectCartProductList',
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
    // 상품 삭제
    deleteProduct (index) {
      // alert(seqProduct)
      // 삭제 확인
      this.$q.dialog({
        title: '상품 삭제',
        message: '정말 삭제하시겠습니까?',
        ok: '예',
        cancel: '아니오',
        preventClose: true
      }).then(() => {
        // 광고상품 삭제
        this.$q.loading.show() // 로딩 표시 시작
        this.$axios.post(this.$store.state.apiServerIp + '/api/cart/deleteCartProduct', this.productList[index])
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.$q.loading.hide() // 로딩 표시 종료
            if (result.data > 0) { // 삭제 성공시
              // 리스트에서 해당 상품 삭제
              this.productList.splice(index, 1)

              // 총금액 계산
              this.setTotalPrice()

              this.$q.notify({
                color: 'red',
                position: 'left',
                message: '삭제되었습니다.',
                icon: 'notifications_active'
              })
            } else {
              this.$q.notify({
                color: 'red',
                position: 'left',
                message: '삭제 실패',
                icon: 'notifications_active'
              })
            }
          })
          .catch((err) => {
            console.log(err)
            this.$q.loading.hide() // 로딩 표시 종료
          })
      }).catch(() => {
        // this.$q.notify(`You didn't agree`)
      })
    },
    // 체크박스 선택 이벤트
    setTotalPrice (item) {
      if (item != null) { // 개별 체크 또는 수량 수정일 경우 - 전체선택은 제외
        // 주문 수량 정합성 체크
        if (item.order_quantity === '' || Number(item.order_quantity) === 0) { // 수량이 지워졌을 경우
          item.order_quantity = 1 // 1로 설정 - 0인 경우 체크를 해도 의미가 없기 때문에
        } else {
          item.order_quantity = Number(item.order_quantity) // 01은 1로 변환
        }
        // 주문상품 금액 및 보상코인 수정
        item.order_price = item.base_order_price * item.order_quantity // 주문상품 금액
        item.order_reward_coin = item.reward_coin * item.order_quantity // 보상코인
        // console.log(item.order_reward_coin)
      }
      let total = 0
      for (let i = 0; i < this.productList.length; i++) {
        const product = this.productList[i]
        if (product.check) { // 체크상태인 상품인 경우
          total += product.base_order_price * product.order_quantity // 총액 더하기
        }
      }
      this.totalPrice = total
    },
    // 체크박스 전체선택 이벤트
    changeCheckAll () {
      if (!this.checkAll) { // 전체선택이 체크상태일 경우
        // 전체 체크해제
        for (let i = 0; i < this.productList.length; i++) {
          const product = this.productList[i]
          product.check = false // 해제
        }
      } else { // 전체선택이 체크상태가 아닐 경우
        // 전체 체크
        for (let i = 0; i < this.productList.length; i++) {
          const product = this.productList[i]
          product.check = true // 체크
        }
      }
      // 총금액 계산
      this.setTotalPrice()
    },
    // 주문 모달 표시
    showBuyOrderModal () {
      this.orderProductList = [] // 주문상품 초기화
      // 체크상태인 상품 주문상품 리스트에 담기
      for (let i = 0; i < this.productList.length; i++) {
        const product = this.productList[i]
        if (product.check) { // 체크상태인 상품인 경우
          this.orderProductList.push(product) // 주문상품에 추가
        }
      }

      if (this.orderProductList.length < 1) { // 선택 상품이 없는 경우
        this.$q.notify({
          color: 'blue',
          position: 'left',
          message: '상품을 선택해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      // 구매 결제 화면 표시
      this.$refs.buyOrderModal.fromCartFlag = true // 장바구니에서 주문하는 경우 결제 완료시 장바구니에서 삭제해야함
      this.$refs.buyOrderModal.orderProductList = this.orderProductList // 주문상품 리스트 설정
      // this.buyOptionModal = false // 주문옵션 모달 닫기
      this.$refs.buyOrderModal.show() // 주문결제 모달 열기
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
