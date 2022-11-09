<template>
  <q-page class="">

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar
        color="black"
        inverted
      >
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>원더배당</q-toolbar-title>
        <q-select hide-underline color="black" @input="filterHandler" v-model="filterType" :options="$store.state.dividendrankingTypeOptions" style="width:80px" />
      </q-toolbar>
    </q-layout-header>

    <!-- 순위 설명 -->
    <table width="94%" border="0" align="center" cellpadding="1" cellspacing="1">
      <tr>
        <td align="center">
          <font size="2" color="grey">
            원더(<img src="statics/images/logo/logocoin.png" style="width: 9px">) 보유량/기간에 따른 예상 배당입니다.
          </font>
        </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align="center">
          <font size="2" color="black">
            2019년도 메타샵스 예상 순수익 (입력)
          </font>
        </td>
      </tr>
      <tr>
        <td align="center">
          <q-input color="black" v-model.trim="benefit" @input="calcDividend" type="number" align="right" suffix="00,000,000" inverted style="width:180px; height:35px;" clearable />
        </td>
      </tr>
      <!--
      <tr>
        <td align="center">
          <q-btn dense color="primary" label="예상 배당 보기" @click="showVbankDepositInfoModal(orders.tid)" size="md" style="width:180px; height:35px;" />
        </td>
      </tr>
      -->
      <tr>
        <td align="center">&nbsp;</td>
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
                  <td rowspan="2" width="45"><div class="round-rank-list"><img :src="item.profile_image" style="width: 45px"></div></td>
                  <td rowspan="2" width="5px">&nbsp;</td>
                  <td colspan="1"><font size="2" color="black">{{ item.name }}</font></td>
                  <td colspan="2" align="right">
                    <font size="2" color="black">랭킹</font>&nbsp;&nbsp;<font size="2" color="red">{{ addComma(item.ranking) }}</font><font size="2" color="black">위&nbsp;&nbsp;&nbsp;</font>
                  </td>
                </tr>
                <tr>
                  <td align="left"><font size="2" color="grey">보유율 : </font><font size="2" color="red">{{ item.possession_rate }}%</font></td>
                  <td align="left" width="66"><font size="2" color="grey">예상 배당 : </font></td>
                  <td align="right" width="115"><font size="2" color="red">{{ addComma(item.coin) }}&nbsp;<img src="statics/images/logo/logocoin.png" style="width: 9px">&nbsp;&nbsp;&nbsp;</font></td>
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
.round-rank-list {
  border-radius: 50%;
  overflow: hidden;
  width: 45px;
  height: 45px;
}
.round-rank-list img {
  display: block;
  min-width: 100%;
  min-height: 100%;
}
</style>

<script>
import Vue from 'vue'

export default {
  name: 'reward-rank-list',
  data () {
    return {
      benefit: 1, // 순수익
      filterType: 'all', // 배당표시타입 all, mine
      targetYear: '2019',
      // uid: this.$store.state.userVo.uid,
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
    // 순수익 변경시 예상배당 계산
    calcDividend () {
      let benefit = this.benefit * 100000000 // 억단위
      for (let i = 0; i < this.rankList.length; i++) {
        const item = this.rankList[i]
        // 배당 = 순수익 * 보유율 * 0.01 * 0.1(순수익의 10%)
        item.coin = Math.floor(benefit * item.possession_rate * 0.001)
      }
    },
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
          if (this.filterType === 'all') { // 전체 랭킹
            this.selectDividendRankList(index, done, '')
          } else { // 나의 랭킹
            this.selectDividendRankList(index, done, this.$store.state.userVo.uid)
            this.$refs.infiniteScrollRank.stop()
          }
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
    // 보상 랭킹 리스트 마지막 페이지 조회
    selectRankListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/rank/selectDividendRankListLastPageNum',
        {params: {pageSize: this.pageSizeRank}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumRank = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 배당 랭킹 리스트 조회
    selectDividendRankList (idx, done, uid) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/rank/selectDividendRankList',
        {params: {pageNum: idx, pageSize: this.pageSizeRank, uid: uid, targetYear: this.targetYear}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.rankList = [] // 리스트 초기화
          }
          this.rankList = this.rankList.concat(result.data)

          // 예상배당 계산
          this.calcDividend()

          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
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
