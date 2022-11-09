<template>
  <q-page class="">

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar
        color="black"
        inverted
      >
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>🔥 핫 딜 🔥</q-toolbar-title>
        <q-btn flat round dense icon="search" @click="goSearch" />
        <!-- <q-select inverted-light color="white" v-model="selectedOrderBy" :options="selectedOrderByOptions" style="width:120px" /> -->
      </q-toolbar>
    </q-layout-header>

    <!-- 2. 상품 리스트 -->
    <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" >
      <q-infinite-scroll :handler="loadMore" ref="infiniteScroll">
        <q-card-separator />
        <div style="padding:0px 0px 0px 0px" v-for="item in productList" :key="item.seq">
          <q-item @click.native="goProductDetail(item.seq)" style="padding:0px 0px 0px 0px">
            <table border="0" style="width: 95%" cellpadding="0" cellspacing="0" align="center">
              <tr>
                <td colspan="4" align="center">&nbsp;</td>
              </tr>
              <tr>
                <td colspan="4" align="center">&nbsp;</td>
              </tr>
              <tr>
                <td colspan="4" align="center"><font size="2" color="grey"><div v-html="setHtml(item.subtitle)" style="word-break:keep-all; word-wrap:break-word;"></div></font></td>
              </tr>
              <tr>
                <td colspan="4" align="center"><font size="3" color="black"><div v-html="setHtml(item.title)" style="word-break:keep-all; word-wrap:break-word;"></div></font></td>
              </tr>
              <tr>
                <td colspan="4" align="center">&nbsp;</td>
              </tr>
              <tr>
                <td colspan="4" align="center"><img :src="item.image_url" :width="`${widthRate}%`" style="display: block; border-radius: 5px;"></td>
              </tr>
              <tr>
                <td colspan="4" align="center">&nbsp;</td>
              </tr>
              <tr>
                <td :width="`${(100 - widthRate) / 2}%`"></td>
                <td :width="`${(widthRate) / 5 * 3}%`" align="left"><font size="3" color="black" style="font-weight:bold;">&nbsp;{{ addComma(item.price) }}&nbsp;원</font></td>
                <td :width="`${(widthRate) / 5 * 2}%`" align="right"><font size="2" color="black">{{ addComma(item.reward_coin) }} <img src="statics/images/logo/logocoin.png" style="width: 9px">&nbsp;</font></td>
                <td :width="`${(100 - widthRate) / 2}%`"></td>
              </tr>
              <tr>
                <td colspan="4" align="center">&nbsp;</td>
              </tr>
              <tr>
                <td colspan="4" align="center">&nbsp;</td>
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
    <br>
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
      widthRate: 50, // 레이아웃 너비 % - PC화면 대응
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
    if (this.$store.state.device === 'P') { // PC인 경우
      this.widthRate = 25 // 화면 너비 50%
    }
    this.selectedOrderBy = '11'
    this.selectListMax() // 마지막페이지 조회
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
      this.$axios.get(this.$store.state.apiServerIp + '/api/product/selectHotdealProductListLastPageNum',
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
      this.$axios.get(this.$store.state.apiServerIp + '/api/product/selectHotdealProductList',
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
    setHtml (str) {
      return Vue.prototype.$setHtml(str)
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
