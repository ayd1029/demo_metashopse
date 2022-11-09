<template>
  <q-page class="">

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>공지사항</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
      </q-toolbar>
    </q-layout-header>

    <!-- 공지사항 리스트 -->
    <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" >
      <q-infinite-scroll :handler="loadMore" ref="infiniteScroll">

        <q-list v-for="item in noticeList" :key="item.seq">
          <q-collapsible :header-class="item.header_class" :opened="item.opened" >
            <!-- 제목 -->
            <template slot="header">
              <q-chip :color="item.chip_color" small class="q-mr-sm">{{ item.chip_label }}</q-chip>
              <q-item-main :label="item.title" />
              <q-item-side right>
                <q-icon :name="item.side_icon" :color="item.side_icon_color" :size="item.side_icon_size" />
              </q-item-side>
            </template>
            <!-- 내용 -->
            <q-card>
              <q-card-media>
                <!-- <img :src="item.image_url" :style="item.image_style"> -->
              </q-card-media>
              <q-card-main>
                {{ item.display_date }}<br><br>
                <div v-html="item.contents"></div>
              </q-card-main>
            </q-card>
          </q-collapsible>
        </q-list>

        <br>
        <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
      </q-infinite-scroll>
    </q-pull-to-refresh>
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
  name: 'notice-list',
  data () {
    return {
      refresherDone: '',
      pageSize: 30,
      lastPageNum: 1, // 마지막 페이지
      noticeList: []
    }
  },
  components: {
  },
  created: function () {
    this.selectListMax()
  },
  methods: {
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()

      this.refresherDone = done // load가 끝나면 로딩공지사항 종료
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

          // refresher 로딩공지사항 처리
          if (this.refresherDone != null && this.refresherDone !== '') {
            this.refresherDone() // 로딩공지사항 종료
            this.refresherDone = '' // 로딩공지사항 초기화
          }
        }
      }, 500)
    },
    // 공지사항 리스트 마지막 페이지 조회
    selectListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/notice/selectNoticeListLastPageNum',
        {params: {pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 공지사항 리스트 조회
    selectList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/notice/selectNoticeList',
        {params: {pageNum: idx, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.noticeList = [] // 리스트 초기화
          }
          this.noticeList = this.noticeList.concat(result.data)
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
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
