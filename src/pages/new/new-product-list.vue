<template>
  <q-page class="">
    <personalInfoPolicyModal ref="personalInfoPolicyModal" />
    <redirectModal ref="redirectModal" />
    <termOfServiceModal ref="termOfServiceModal" />

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>최신 상품</q-toolbar-title>
        <q-btn flat round dense icon="search" @click="goSearch" />
        <!-- <q-select inverted-light color="white" v-model="selectedOrderBy" :options="selectedOrderByOptions" style="width:120px" /> -->
      </q-toolbar>
    </q-layout-header>

    <!-- 2. 상품 리스트 -->
    <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" >
      <q-infinite-scroll :handler="loadMore" ref="infiniteScroll">
        <q-card-separator />
        <div style="padding:0px 0px 0px 0px" v-for="item in productList" :key="item.seq">
          <q-item link @click.native="goProductDetail(item.seq)" style="padding:0px 0px 0px 0px">
            <table border="0" style="width: 100%" cellpadding="0" cellspacing="0">
              <tr>
                <td rowspan="6" width="150"><img :src="item.image_url" class='image-product-list'></td>
                <td rowspan="6" width="10">&nbsp;</td>
                <td colspan="5">
                  <font v-if="item.free_delivery_yn === 'true'" size="1" color="red">무료배송&nbsp;&nbsp;</font>
                  <font v-if="item.dawn_delivery_yn === 'true'" size="1" color="green">새벽배송&nbsp;&nbsp;</font>
                  <font size="1" color="blue">&nbsp;&nbsp;</font>
                </td>
              </tr>
              <tr>
                <td colspan="5"><font size="2" color="grey">{{ item.subtitle }}&nbsp;</font></td>
              </tr>
              <tr>
                <td colspan="5">{{ item.title }}</td>
              </tr>
              <tr>
                <td colspan="5">&nbsp;</td>
              </tr>
              <tr>
                <td colspan="2"><font size="4" color="black" style="font-weight:bold;">{{ addComma(item.price) }}&nbsp;원</font></td>
                <td style="text-align: right;" colspan="3"><font size="2" color="black">{{ addComma(item.reward_coin) }} <img src="statics/images/logo/logocoin.png" style="width: 9px">&nbsp;&nbsp;&nbsp;</font></td>
              </tr>
              <tr>
                <td colspan="5" style="text-align: right;">
                  <div v-if="item.avg_rating == null"><font size="1" color="orange">☆☆☆☆☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                  <div v-if="item.avg_rating === '1'"><font size="1" color="orange">★</font><font size="1" color="grey">☆☆☆☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                  <div v-if="item.avg_rating === '2'"><font size="1" color="orange">★★</font><font size="1" color="grey">☆☆☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                  <div v-if="item.avg_rating === '3'"><font size="1" color="orange">★★★</font><font size="1" color="grey">☆☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                  <div v-if="item.avg_rating === '4'"><font size="1" color="orange">★★★★</font><font size="1" color="grey">☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                  <div v-if="item.avg_rating === '5'"><font size="1" color="orange">★★★★★</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                </td>
              </tr>
            </table>
          </q-item>
          <q-card-separator />
          <q-card-separator />
          <q-card-separator />
          <q-card-separator />
          <q-card-separator />
          <q-card-separator />
          <q-card-separator />
          <q-card-separator />
          <q-card-separator />
          <q-card-separator />
        </div>
        <br>
        <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
      </q-infinite-scroll>
    </q-pull-to-refresh>
    <br>
    <br>
    <!-- ########################################################################################### -->
    <!-- 사업자정보 -->
    <q-collapsible>
      <!-- 제목 -->
      <template slot="header">
        <q-chip color="black" small class="q-mr-sm"><font size="1">사업자정보</font></q-chip>
        <q-item-main label="" />
        <q-item-side right>
        </q-item-side>
      </template>
      <!-- 내용 -->
      <table width="100%" align="center" border="0">
        <tr>
          <td align="left" colspan="5">
            <font size="1" color="black"><b>주식회사 클레이스타</b></font><br>
            <font size="1" color="grey">
              (04206) 서울특별시 마포구 마포대로 196 1707호<br>
              대표이사 : 안영대<br>
              통신판매업신고 :2022-서울마포-1213 | <a @click="showPersonalInfoPolicy"><b>개인정보처리방침</b></a><br>
              사업자등록번호 : 139-87-02383 &nbsp;<a @click="goBusinessInfo"><b>사업자정보확인</b></a><br>
              고객센터 :010-9394-1941 | <a @click="showTermOfService"><b>이용약관</b></a><br>
              이메일 : metashopse@gmail.com
            </font>
          </td>
        </tr>
        <tr>
          <td colspan="5">&nbsp;</td>
        </tr>
      </table>
    </q-collapsible>
    <br>
    <!-- 저작권 -->
    <table width="100%" align="center" border="0">
      <tr>
        <td align="center">
          <font size="1" color="grey">
            Copyright © OneOn Inc. All Rights Reserved.
          </font>
        </td>
      </tr>
    </table>
    <!-- ########################################################################################### -->
    <br>
  </q-page>
</template>

<style>
</style>

<script>
import Vue from 'vue'

export default {
  name: 'new-product-list',
  data () {
    return {
      refresherDone: '',
      pageSize: 15,
      lastPageNum: 1, // 마지막 페이지
      selectedOrderBy: '',
      selectedOrderByOptions: [
        {label: '최신순', value: '11'},
        {label: '인기순', value: '21'},
        {label: '판매순', value: '31'},
        {label: '원더 ↑', value: '41'},
        {label: '원더 ↓', value: '42'},
        {label: '가격 ↑', value: '51'},
        {label: '가격 ↓', value: '52'}
      ],
      productList: []
    }
  },
  components: {
  },
  created: function () {
    this.selectedOrderBy = '11'
    this.selectListMax() // 마지막페이지 조회
  },
  methods: {
    // 서비스 이용 약관
    showTermOfService () {
      this.$refs.termOfServiceModal.show()
    },
    // 개인정보처리방침
    showPersonalInfoPolicy () {
      this.$refs.personalInfoPolicyModal.show()
    },
    // 사업자정보확인
    goBusinessInfo () {
      /*
      this.$refs.redirectModal.title = '사업자정보'
      this.$refs.redirectModal.url = this.$store.state.BUSINESS_SITE_INFO
      this.$refs.redirectModal.icon = 'play_arrow'
      this.$refs.redirectModal.show()
      */
      window.open(this.$store.state.BUSINESS_SITE_INFO, '_system')
    },
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
      this.$axios.get(this.$store.state.apiServerIp + '/api/product/selectNewProductListLastPageNum',
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
      this.$axios.get(this.$store.state.apiServerIp + '/api/product/selectNewProductList',
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
    // 상품 상세 화면으로 이동
    goProductDetail (seqProduct) {
      this.$router.push('/productDetail?seq=' + seqProduct)
    },
    addComma (num) {
      return Vue.prototype.$addComma(num)
    },
    goSearch () {
      this.$router.push('/search')
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
