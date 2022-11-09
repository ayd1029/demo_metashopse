<template>
  <q-page class="">

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <!-- <img src="statics/icons/logo.png" style="width: 20px; height: 20px;">&nbsp; -->
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>최신 동영상</q-toolbar-title>
        <q-btn flat round dense icon="search" @click="goSearch" />
        <!-- <q-btn flat round dense icon="search" @click="goSearch" /> -->
        <!-- <q-btn flat round dense icon="close" @click="close" /> -->
      </q-toolbar>
    </q-layout-header>

    <div style="width: 100%; margin: 0px 0px 0px 0px;">
      <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" >
        <!-- 컨텐츠 -->
        <q-infinite-scroll :handler="loadMoreContents" ref="infiniteScrollContents">
          <div style="padding:0px 0px 0px 0px" v-for="item in contentsList" :key="item.seq">
            <q-item link @click.native="goContentsDetail(item.seq)" style="padding:0px 0px 0px 0px">
              <table border="0" style="width: 100%; padding:5px 0px 5px 0px;">
                <tr>
                  <td rowspan="1" width="5">&nbsp;</td>
                  <td rowspan="2" width="160">
                    <div v-if="item.image_url != null"><img :src="item.image_url" class='image-contents-list'></div>
                    <div v-else><img :src="item.og_image_url" class='image-contents-list'></div>
                  </td>
                  <td rowspan="2" width="5px">&nbsp;</td>
                  <td colspan="1"><font size="2" color="black"><div v-html="item.title" style="text-align:left; word-break:keep-all; word-wrap:break-word;" /></font></td>
                  <td colspan="1" align="right">
                    <!-- <q-btn flat round dense color="grey" icon="more_vert" @click="123" size="xs" /> -->
                  </td>
                </tr>
                <!--
                <tr>
                  <td colspan="2"><font size="2" color="black"><div v-html="item.contents" style="word-break:break-all;" /></font></td>
                </tr>
                -->
              </table>
            </q-item>
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
</style>

<script>
// import Vue from 'vue'

export default {
  name: 'contents-list',
  data () {
    return {
      uid: this.$store.state.userVo.uid,
      refresherDone: '',
      // offset: 500,
      pageSizeContents: 30,
      lastPageNumContents: 1, // 컨텐츠 마지막 페이지
      widthOneOne: 0, // 화면너비를 1로 나눈 값 : 이미지형 리스트 정사각형으로 만들어야 되는데..시간점..
      contentsList: [] // 컨텐츠 리스트
    }
  },
  components: {
  },
  created: function () {
    this.selectContentsListMax() // 컨텐츠 마지막페이지 조회
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
      this.$refs.infiniteScrollContents.reset() // index 초기화
      this.$refs.infiniteScrollContents.resume() // stop에서 다시 재생
      this.$refs.infiniteScrollContents.loadMore() // loadMore로 검색
    },
    loadMoreContents: function (index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        console.log('loadMoreContents called index: ' + index + ' this.lastPageNumContents: ' + this.lastPageNumContents)
        if (index <= this.lastPageNumContents) {
          this.selectContentsList(index, done)
        } else {
          this.$refs.infiniteScrollContents.stop()
        }
        // refresher 로딩메세지 처리
        if (this.refresherDone != null && this.refresherDone !== '') {
          this.refresherDone() // 로딩메세지 종료
          this.refresherDone = '' // 로딩메세지 초기화
        }
      }, 100)
    },
    // 컨텐츠 리스트 마지막 페이지 조회
    selectContentsListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/contents/selectContentsListAllLastPageNum',
        {params: {pageSize: this.pageSizeContents}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumContents = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 컨텐츠 리스트 조회
    selectContentsList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/contents/selectContentsListAll',
        {params: {pageNum: idx, pageSize: this.pageSizeContents}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.contentsList = [] // 리스트 초기화
          }
          this.contentsList = this.contentsList.concat(result.data)
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    },
    // 컨텐츠 상세 화면으로 이동
    goContentsDetail (seqContents) {
      this.$router.push('/contents/contentsDetail?seq=' + seqContents)
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
