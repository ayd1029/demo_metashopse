<template>
  <q-page class="">
    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar
        color="black"
        inverted
      >
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>유튜버스</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
        <q-btn flat round dense icon="search" @click="goSearch" />
      </q-toolbar>
    </q-layout-header>

    <!-- 순위 설명 -->
    <table width="94%" align="center">
      <tr>
        <td align="center">
          <font size="2" color="grey">
            YouTube 인기 채널
          </font>
        </td>
      </tr>
      <tr>
        <td align="center">&nbsp;</td>
      </tr>
    </table>
    <q-card-separator />

    <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" >
      <!-- 유튜버스 리스트 -->
      <div id="divYoutuberList" style="width:100%;">
        <q-infinite-scroll :handler="loadMoreYoutuber" ref="infiniteScrollYoutuber">
          <div style="padding:0px 0px 0px 0px" v-for="item in youtuberRankingList" :key="item.seq">
            <q-item link @click.native="goYoutuberContentsList(item)" style="padding:0px 0px 0px 0px">

              <table border="0" style="width: 100%; padding:10px 0px 10px 0px;" align="center" cellpadding="0" cellspacing="0">
                <thead>
                  <th width="5"></th>
                  <th width="60"></th>
                  <th width="10"></th>
                  <th width="20%"></th>
                  <th width="12%"></th>
                  <th width="12%"></th>
                  <th width="12%"></th>
                  <th width="9%"></th>
                  <th width="21%"></th>
                </thead>
                <tr>
                  <td rowspan="4">&nbsp;</td>
                  <td rowspan="4" align="left"><div class="round-youtuber-list"><img :src="item.image_url" style="width: 60px"></div></td>
                  <td rowspan="4">&nbsp;&nbsp;</td>
                  <td colspan="4" align="left"><font size="2" color="black">{{ item.name_ko }}</font></td>
                  <td colspan="1" align="left"><font size="2" color="black">국가</font></td>
                  <td colspan="1" align="right">&nbsp;<font size="2" color="red">{{ addComma(item.rank_nation) }}</font><font size="2" color="black">&nbsp;위&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                </tr>
                <tr>
                  <td colspan="4" align="left"><font size="2" color="black">{{ item.name }}</font></td>
                  <td colspan="1" align="left"><font size="2" color="grey">세계</font></td>
                  <td colspan="1" align="right">&nbsp;<font size="2" color="grey">{{ addComma(item.rank_world) }}</font><font size="2" color="grey">&nbsp;위&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                </tr>
                <tr>
                  <td colspan="4" align="left"><font size="2" color="grey">구독자수</font></td>
                  <td colspan="2" align="right">&nbsp;<font size="2" color="grey">{{ addComma(item.subs_cnt_kor) }}</font>&nbsp;&nbsp;&nbsp;</td>
                </tr>
                <tr>
                  <td colspan="4" align="left"><font size="2" color="grey">평균조회수</font></td>
                  <td colspan="2" align="right">&nbsp;<font size="2" color="grey">{{ addComma(item.view_rate) }}</font>&nbsp;&nbsp;&nbsp;</td>
                </tr>
                <!--
                <tr>
                  <td colspan="4" align="left"><font size="2" color="grey">구독자 참여율</font></td>
                  <td colspan="2" align="right">&nbsp;<font size="2" color="grey">{{ addComma(item.parti_rate) }}%</font>&nbsp;&nbsp;&nbsp;</td>
                </tr>
                <tr>
                  <td colspan="6">&nbsp;</td>
                </tr>
                <tr>
                  <td colspan="2" align="center"><font size="2" color="grey">좋아요</font></td>
                  <td colspan="2" align="center"><font size="2" color="grey">싫어요</font></td>
                  <td colspan="2" align="center"><font size="2" color="grey">댓글</font></td>
                </tr>
                <tr>
                  <td colspan="2" align="center"><font size="2" color="grey">{{ addComma(item.cnt_like) }}</font></td>
                  <td colspan="2" align="center"><font size="2" color="grey">{{ addComma(item.cnt_hate) }}</font></td>
                  <td colspan="2" align="center"><font size="2" color="grey">{{ addComma(item.cnt_reply) }}</font></td>
                </tr>
                -->
              </table>
<!--
              <table border="1" style="width: 98%">
                <tr>
                  <td rowspan="2" width="5">&nbsp;</td>
                  <td rowspan="2" width="50" align="right"><div class="round-youtuber-list"><img :src="item.image_url" style="width: 45px"></div></td>
                  <td rowspan="2" width="5">&nbsp;</td>
                  <td colspan="1" width="55%"><font size="2" color="black">{{ item.name }}</font></td>
                  <td colspan="1" align="right"><font size="1" color="black"></font>&nbsp;<font size="2" color="red">{{ addComma(item.rownum) }}</font><font size="1" color="black">위&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                </tr>
                <tr>
                  <td colspan="2"><font size="1" color="grey">{{ item.introduce }}&nbsp;</font></td>
                </tr>
              </table>
              <q-card-separator />
-->
            </q-item>
            <q-card-separator />
          </div>
          <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
        </q-infinite-scroll>
      </div>

    </q-pull-to-refresh>
    <br>
    <br>
    <br>
    <br>
  </q-page>
</template>

<style>
.round-youtuber-list {
  border-radius: 50%;
  overflow: hidden;
  width: 60px;
  height: 60px;
}
.round-youtuber-list img {
  display: block;
  min-width: 100%;
  min-height: 100%;
}
</style>

<script>
import Vue from 'vue'

export default {
  name: 'youtuber-list',
  data () {
    return {
      uid: this.$store.state.userVo.uid,
      refresherDone: '',
      pageSize: 30,
      lastPageNumYoutuber: 1, // 팔로잉 마지막 페이지
      youtuberRankingList: []
    }
  },
  components: {
  },
  created: function () {
    this.selectYoutuberListMax() // 팔로워 마지막페이지 조회
  },
  mounted: function () {
  },
  methods: {
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      setTimeout(() => { // 3초 후에 로딩메세지 비표시
        done()
      }, 3000)
      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScrollYoutuber.reset() // index 초기화
      this.$refs.infiniteScrollYoutuber.resume() // stop에서 다시 재생
      this.$refs.infiniteScrollYoutuber.loadMore() // loadMore로 검색
    },
    loadMoreYoutuber: function (index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        console.log('loadMoreYoutuber called index: ' + index + ' this.lastPageNumYoutuber: ' + this.lastPageNumYoutuber)
        if (index <= this.lastPageNumYoutuber) {
          this.selectYoutuberList(index, done)
        } else {
          this.$refs.infiniteScrollYoutuber.stop()
        }
        // refresher 로딩메세지 처리
        if (this.refresherDone != null && this.refresherDone !== '') {
          this.refresherDone() // 로딩메세지 종료
          this.refresherDone = '' // 로딩메세지 초기화
        }
      }, 100)
    },
    // 유튜버스 리스트 마지막 페이지 조회
    selectYoutuberListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/youtuber/selectYoutuberListLastPageNum',
        {params: {pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumYoutuber = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 유튜버스 리스트 조회
    selectYoutuberList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/youtuber/selectYoutuberList',
        {params: {pageNum: idx, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.youtuberRankingList = [] // 리스트 초기화
          }
          this.youtuberRankingList = this.youtuberRankingList.concat(result.data)
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    },
    // 유튜버 컨텐츠 리스트로 이동
    goYoutuberContentsList (item) {
      // alert(item.keyword1 + ' ' + item.keyword2 + ' ' + item.keyword3)
      this.$store.state.youtubeChannelUrl = item.channel_url // 유튜브 채널 URL 설정
      let kwd1 = ''
      let kwd2 = ''
      let kwd3 = ''
      let kwd4 = ''
      let kwd5 = ''
      let name = encodeURI(item.name) // 콘텐츠 리스트 타이틀 표시용
      if (item.keyword1 != null) {
        kwd1 = encodeURI(item.keyword1)
      }
      if (item.keyword2 != null) {
        kwd2 = encodeURI(item.keyword2)
      }
      if (item.keyword3 != null) {
        kwd3 = encodeURI(item.keyword3)
      }
      if (item.keyword4 != null) {
        kwd4 = encodeURI(item.keyword4)
      }
      if (item.keyword5 != null) {
        kwd5 = encodeURI(item.keyword5)
      }
      let queryString = '?' + 'kwd1=' + kwd1 + '&kwd2=' + kwd2 + '&kwd3=' + kwd3 + '&kwd4=' + kwd4 + '&kwd5=' + kwd5 + '&name=' + name
      // alert('/menu/youtuberContentsList' + queryString)
      this.$router.push('/menu/youtuberContentsList' + queryString)
    },
    // 검색
    goSearch () {
      this.$router.push('/search')
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
