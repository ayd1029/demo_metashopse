<template>
  <q-page class="">

    <shareModal ref="shareModal" />
    <!-- <qnaReplyModal ref="qnaReplyModal" /> -->

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>판매 문의사항</q-toolbar-title>
        <q-select  hide-underline color="black" v-model="filterType" @input="filterHandler" :options="$store.state.sellerQnaStatusOptions" style="width:90px" />
      </q-toolbar>
    </q-layout-header>

    <!-- 문의사항 -->
    <div style="width: 100%; margin: 20px 0px 0px 0px;">
      <q-infinite-scroll :handler="loadMoreQna" ref="infiniteScrollQna">
        <div v-for="item in qnaList" :key="item.seq">
          <!-- <q-card-separator v-if="index > 0" /> -->
          <table border="0" cellpadding="1" cellspacing="0" style="width: 95%" align="center">
            <thead>
              <th width="25" />
              <th/>
            </thead>
            <tr>
              <td colspan="2" style="word-break:break-all;">상품명: <font size="3" color="red">{{ item.product_title }}</font></td>
            </tr>
            <tr>
              <td colspan="2"><font size="3" color="black">상품번호: {{ item.seq_product }}</font></td>
            </tr>
            <tr>
              <td colspan="2"><font size="3" color="grey">{{ item.product_option }}</font></td>
            </tr>
            <tr>
              <td><font size="3" color="black"><b>Q:</b></font></td>
              <td><font size="3" color="black"><b>{{ item.question }}</b></font></td>
            </tr>
            <tr>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td><font size="3" color="black"><b v-if="item.answer !== ''">A:</b></font></td>
              <td>
                <font v-if="item.answer !== ''" size="3" color="black">{{ item.answer }}</font>
                <font v-else size="3" color="grey">아직 답변이 없습니다.</font>
              </td>
            </tr>
            <tr>
              <td></td>
              <td align="right">
                <font v-if="item.mod_time != null" size="2" color="grey">답변등록 : {{ item.mod_time }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>
                <q-btn v-if="item.mod_time == null" dense color="primary" label="답변하기" @click="goSellerQnaRegister(item)" size="md" />
                <q-btn v-else dense color="blue" label="답변수정" @click="goSellerQnaRegister(item)" size="md" />
              </td>
            </tr>
          </table>
          <br>
        </div>
        <br>
        <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
      </q-infinite-scroll>
    </div>
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
  // name: 'mystore',
  data () {
    return {
      filterType: '', // 필터링 타입
      uid: '',
      seqProduct: '',
      qnaList: [], // 상품리뷰 리스트
      pageSizeQna: 15,
      lastPageNumQna: 1 // 상품리뷰 마지막 페이지
      // widthOneThird: 0, // 화면너비를 3으로 나눈 값 : 이미지형 리스트 정사각형으로 만들어야 되는데..시간점..
    }
  },
  created: function () {
    // 로그인 체크
    if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
      this.$router.push(this.$store.state.PAGE_LOGIN)
      return
    }
    // this.widthOneThird = window.innerWidth / 3 - 6
    this.widthOneOne = window.innerWidth
    this.selectQnaListMax() // 컨텐츠 마지막페이지 조회
  },
  methods: {
    // 필터링 핸들러
    filterHandler (param) {
      this.$q.loading.show() // 로딩중 표시 시작
      this.rankList = [] // 리스트 초기화
      this.$refs.infiniteScrollQna.reset() // index 초기화
      this.$refs.infiniteScrollQna.resume() // stop에서 다시 재생
      this.$refs.infiniteScrollQna.loadMore() // loadMore로 검색
    },
    // Q&A 등록 화면으로 이동
    goSellerQnaRegister (item) {
      this.$router.push('/productDetail/qnaRegister?seq=' + item.seq_product + '&seq_qna=' + item.seq)
    },
    // 상품리뷰 loadMore
    loadMoreQna: function (index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        console.log('loadMoreQna called index: ' + index + ' this.lastPageNumQna: ' + this.lastPageNumQna)
        if (index <= this.lastPageNumQna) {
          this.selectQnaList(index, done)
        } else {
          this.$refs.infiniteScrollQna.stop()
        }
      }, 100)
    },
    // 컨텐츠 리스트 마지막 페이지 조회
    selectQnaListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/qna/selectSellerQnaListLastPageNum',
        {params: {pageSize: this.pageSizeQna, sid: this.$store.state.userVo.sid, filterType: this.filterType}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumQna = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 컨텐츠 리스트 조회
    selectQnaList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/qna/selectSellerQnaList',
        {params: {pageNum: idx, pageSize: this.pageSizeQna, sid: this.$store.state.userVo.sid, filterType: this.filterType}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.qnaList = [] // 리스트 초기화
          }
          this.qnaList = this.qnaList.concat(result.data)
          this.$q.loading.hide() // 로딩중 표시 종료
          done()
        })
        .catch((err) => {
          console.log(err)
          this.$q.loading.hide() // 로딩중 표시 종료
          done()
        })
    },
    // 유저홈 팝업
    showUserHome (uid) {
      Vue.prototype.$showUserHome(uid)
    },
    setHtml (str) {
      return Vue.prototype.$setHtml(str)
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
