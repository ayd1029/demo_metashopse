<template>
  <q-page class="">

    <!--<hotdealRegisterModal ref="hotdealRegisterModal" />--><!-- 핫딜 등록 -->

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>상품 관리</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
      </q-toolbar>
    </q-layout-header>

    <!-- 상품 리스트 -->
    <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" >
      <q-infinite-scroll :handler="loadMore" ref="infiniteScroll">
        <q-list style="padding:0px 0px 0px 0px" v-for="(item, index) in productList" :key="item.seq">
          <q-item link style="padding:0px 0px 0px 0px">
            <table border="0" style="width: 100%; padding:5px 0px 5px 0px;">
              <tr>
                <td rowspan="6" width="150"><a @click="goProductDetail(item.seq)"><img :src="item.image_url" class='image-product-list'></a></td>
                <td rowspan="6" width="10">&nbsp;</td>
                <td colspan="4">
                  <a @click="goProductDetail(item.seq)">
                    <font v-if="item.free_delivery_yn === 'true'" size="1" color="red">무료배송&nbsp;&nbsp;</font>
                    <font v-if="item.dawn_delivery_yn === 'true'" size="1" color="green">새벽배송&nbsp;&nbsp;</font>
                    <font size="1" color="blue">&nbsp;&nbsp;</font>
                  </a>
                </td>
                <td align="right"><q-btn dense color="red" label="삭제" @click="deleteProduct(index)" outline size="md" />&nbsp;&nbsp;</td>
              </tr>
              <tr>
                <td colspan="5"><a @click="goProductDetail(item.seq)"><font size="2" color="grey">{{ item.subtitle }}&nbsp;</font></a></td>
              </tr>
              <tr>
                <td colspan="5"><a @click="goProductDetail(item.seq)">{{ item.title }}</a></td>
              </tr>
              <tr>
                <td colspan="5" align="left">
                  &nbsp;
                  <!-- <q-btn dense color="primary" label="🔥 핫딜 등록" @click="showHotdealRegisterModal(item)" style="width:90px;" /> -->
                </td>
              </tr>
              <tr>
                <td colspan="2"><a @click="goProductDetail(item.seq)"><font size="4" color="black" style="font-weight:bold;">{{ addComma(item.price) }}&nbsp;원</font></a></td>
                <td colspan="3" style="text-align: right;"><a @click="goProductDetail(item.seq)"><font size="2" color="black">{{ addComma(item.reward_coin) }} <img src="statics/images/logo/logocoin.png" style="width: 9px">&nbsp;&nbsp;&nbsp;</font></a></td>
              </tr>
              <tr>
                <td colspan="5" style="text-align: right;">
                  <a @click="goProductDetail(item.seq)">
                    <div v-if="item.avg_rating == null"><font size="1" color="orange">☆☆☆☆☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                    <div v-if="item.avg_rating === '1'"><font size="1" color="orange">★</font><font size="1" color="grey">☆☆☆☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                    <div v-if="item.avg_rating === '2'"><font size="1" color="orange">★★</font><font size="1" color="grey">☆☆☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                    <div v-if="item.avg_rating === '3'"><font size="1" color="orange">★★★</font><font size="1" color="grey">☆☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                    <div v-if="item.avg_rating === '4'"><font size="1" color="orange">★★★★</font><font size="1" color="grey">☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                    <div v-if="item.avg_rating === '5'"><font size="1" color="orange">★★★★★</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                  </a>
                </td>
              </tr>
            </table>
          </q-item>
        </q-list>
        <br>
        <br>
        <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
      </q-infinite-scroll>
    </q-pull-to-refresh>
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn round color="primary" @click="goProductRegister" icon="" style="width: 60px; height: 60px">등록</q-btn>
    </q-page-sticky>
    <br>
    <br>
    <br>
    <br>
  </q-page>
</template>

<style>
</style>

<script>
import Vue from 'vue'

export default {
  name: 'product-list',
  data () {
    return {
      refresherDone: '',
      pageSize: 15,
      lastPageNum: 1, // 마지막 페이지
      productList: []
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
      this.$axios.get(this.$store.state.apiServerIp + '/api/product/selectSellerProductListLastPageNum',
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
      this.$axios.get(this.$store.state.apiServerIp + '/api/product/selectSellerProductList',
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
    // 상품 등록
    goProductRegister () {
      // 계좌정보 및 출고지 주소 등록 여부 확인
      if (this.$store.state.sellerVo.deposit_account_no == null ||
          this.$store.state.sellerVo.from_post_no == null) {
        this.$q.dialog({
          title: '판매자 필수정보 필요',
          message: '상품 출고지 및 입금 계좌정보를 등록해주세요. 지금 등록하시겠습니까?',
          ok: '예',
          cancel: '아니오',
          preventClose: true
        }).then(() => {
          // 판매자 정보 관리 화면으로 이동
          this.$router.push('/menu/sellerInfo')
        }).catch(() => {
          // this.$q.notify(`You didn't agree`)
        })
      } else {
        this.$router.push('/seller/product/productRegister')
      }
    },
    // 상품 삭제
    deleteProduct (index) {
      // 삭제 확인
      this.$q.dialog({
        title: '상품 삭제',
        message: '정말 삭제하시겠습니까?',
        ok: '예',
        cancel: '아니오',
        preventClose: true
      }).then(() => {
        // 상품 삭제
        this.$q.loading.show() // 로딩 표시 시작
        this.$axios.post(this.$store.state.apiServerIp + '/api/product/deleteProduct', this.productList[index])
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.$q.loading.hide() // 로딩 표시 종료
            // 리스트에서 해당 상품 삭제
            this.productList.splice(index, 1)

            this.$q.notify({
              color: 'red',
              position: 'left',
              message: '삭제되었습니다.',
              icon: 'notifications_active'
            })
          })
          .catch((err) => {
            console.log(err)
            this.$q.loading.hide() // 로딩 표시 종료
          })
      }).catch(() => {
        // this.$q.notify(`You didn't agree`)
      })
    },
    // 상품 상세 화면으로 이동
    goProductDetail (seqProduct) {
      this.$router.push('/seller/product/productDetail?seq=' + seqProduct)
    },
    /*
    // 핫딜 등록 표시
    showHotdealRegisterModal (item) {
      this.$refs.hotdealRegisterModal.productVo = item
      this.$refs.hotdealRegisterModal.show()
    },
    */
    addComma (num) {
      return Vue.prototype.$addComma(num)
    },
    goBack () {
      // this.$router.go(-1)
      // this.$router.replace('/menu')
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
