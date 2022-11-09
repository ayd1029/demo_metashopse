<template>
  <q-page class="">

    <eventInfoModal ref="eventInfoModal" />
    <loginModal ref="loginModal" @callback-login="goAddVideo" />

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>이벤트 랭킹</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
      </q-toolbar>
    </q-layout-header>

    <!-- 순위 설명 -->
    <table width="94%" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td colspan="2" align="center">
          <font size="2" color="grey">
            획득 원더 = 등록한 게시물 수 X 100&nbsp;<img src="statics/images/logo/logocoin.png" style="width: 9px">
          </font>
        </td>
      </tr>
      <tr>
        <td colspan="2" align="center">
          <font size="1" color="grey">
            이벤트 원더는 7월 1일에 일괄 지급됩니다.
          </font>
        </td>
      </tr>
      <tr>
        <td colspan="2" align="center">&nbsp;</td>
      </tr>
      <tr>
        <td align="center">
          <q-btn dense color="primary" icon="cake" @click="showEventInfoModal" size="md" style="width:165px;">&nbsp;&nbsp;&nbsp;이벤트 정보 보기&nbsp;&nbsp;</q-btn>
        </td>
        <td align="center">
          <q-btn dense color="primary" icon="play_arrow" @click="checkLoginToAddVideo" size="md" style="width:165px;">&nbsp;&nbsp;&nbsp;유튜브 링크 등록&nbsp;&nbsp;</q-btn>
        </td>
      </tr>
      <tr>
        <td colspan="2" align="center">&nbsp;</td>
      </tr>
    </table>
    <q-card-separator />

    <div style="width: 100%; margin: 0px 0px 0px 0px;">
      <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" >
        <!-- 랭킹 -->
        <q-infinite-scroll :handler="loadMoreRank" ref="infiniteScrollRank">
          <div style="padding:0px 0px 0px 0px" v-for="item in rankList" :key="item.seq">
            <q-item link @click.native="showUserHome(item.uid)" style="padding:0px 0px 0px 0px">
              <table border="0" style="width: 100%; padding:5px 0px 5px 0px;">
                <tr>
                  <td rowspan="2" width="5px">&nbsp;</td>
                  <td rowspan="2" width="50">
                    <div class="round">
                      <img :src="item.profile_image" style="width: 50px">
                    </div>
                  </td>
                  <td rowspan="2" width="5px">&nbsp;</td>
                  <td colspan="1">
                    <font size="2" color="black">{{ item.name }}</font>
                  </td>
                  <td colspan="1" align="right" width="30%">
                    <font size="2" color="black">랭킹</font>&nbsp;&nbsp;<font size="2" color="red">{{ addComma(item.ranking) }}</font><font size="2" color="black">위&nbsp;&nbsp;&nbsp;&nbsp;</font>
                  </td>
                </tr>
                <tr>
                  <td align="left"><font size="1" color="grey">{{ item.introduce }}</font></td>
                  <td align="right"><font size="2" color="black">{{ addComma(item.coin) }}&nbsp;<img src="statics/images/logo/logocoin.png" style="width: 9px">&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                </tr>
              </table>
            </q-item>
            <q-card-separator />
          </div>
          <br>
          <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
        </q-infinite-scroll>
      </q-pull-to-refresh>

    </div>
    <br>
    <br>
    <br>&nbsp;
  </q-page>
</template>

<style>
.round {
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
}
.round img {
  display: block;
  min-width: 100%;
  min-height: 100%;
}
</style>

<script>
import Vue from 'vue'

export default {
  name: 'event-open',
  data () {
    return {
      endOfEventDate: '2019-07-01', // 이벤트 종료일 - 쿼리에서 REG_TIME < '2019-07-01'
      refresherDone: '',
      // offset: 500,
      pageSizeRank: 30,
      lastPageNumRank: 1, // 랭킹 마지막 페이지
      widthOneOne: 0, // 화면너비를 1로 나눈 값 : 이미지형 리스트 정사각형으로 만들어야 되는데..시간점..
      rankList: [] // 랭킹 리스트
    }
  },
  components: {
  },
  created: function () {
    this.selectRankListMax() // 랭킹 마지막페이지 조회
  },
  mounted: function () {
  },
  methods: {
    // 필터링 핸들러
    filterHandler (param) {
      this.rankList = [] // 리스트 초기화
      this.$refs.infiniteScrollRank.reset() // index 초기화
      this.$refs.infiniteScrollRank.resume() // stop에서 다시 재생
      this.$refs.infiniteScrollRank.loadMore() // loadMore로 검색
    },
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      setTimeout(() => { // 3초 후에 로딩메세지 비표시
        done()
      }, 3000)

      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScrollRank.reset() // index 초기화
      this.$refs.infiniteScrollRank.resume() // stop에서 다시 재생
      this.$refs.infiniteScrollRank.loadMore() // loadMore로 검색
    },
    loadMoreRank: function (index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        console.log('loadMoreRank called index: ' + index + ' this.lastPageNumRank: ' + this.lastPageNumRank)
        if (index <= this.lastPageNumRank) {
          this.selectRankList(index, done)
        } else {
          this.$refs.infiniteScrollRank.stop()
        }
        // refresher 로딩메세지 처리
        if (this.refresherDone != null && this.refresherDone !== '') {
          this.refresherDone() // 로딩메세지 종료
          this.refresherDone = '' // 로딩메세지 초기화
        }
      }, 100)
    },
    // 이벤트 랭킹 리스트 마지막 페이지 조회
    selectRankListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/event/selectEventRewardRankListLastPageNum',
        {params: {pageSize: this.pageSizeRank}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumRank = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 이벤트 랭킹 리스트 조회
    selectRankList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/event/selectEventRewardRankList',
        {params: {pageNum: idx, pageSize: this.pageSizeRank, endDate: this.endOfEventDate}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.rankList = [] // 리스트 초기화
          }
          this.rankList = this.rankList.concat(result.data)
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    },
    showEventInfoModal () {
      this.$refs.eventInfoModal.show()
    },
    // 유저홈 팝업
    showUserHome (uid) {
      Vue.prototype.$showUserHome(uid)
    },
    addComma (num) {
      return Vue.prototype.$addComma(num)
    },
    goSearch () {
      this.$router.push('/search')
    },
    // 동영상 링크 등록 화면으로 이동
    checkLoginToAddVideo () {
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        // 쿠키에 돌아올 패스 저장
        this.$cookie.set('LOGIN_REDIRECT_URL', '/add/video', 1)
        this.$refs.loginModal.show()
      } else {
        this.goAddVideo()
      }
    },
    goAddVideo () {
      this.$router.push('/add/video')
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
