<template>
  <q-page class="">

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <!-- <img src="statics/icons/logo.png" style="width: 20px; height: 20px;">&nbsp; -->
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>최신 모임</q-toolbar-title>
        <q-btn flat round dense icon="search" @click="goSearch" />
        <!-- <q-btn flat round dense icon="close" @click="close" /> -->
      </q-toolbar>

    </q-layout-header>

    <div style="width: 100%; margin: 0px 0px 0px 0px;">
      <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" >
        <!-- 모임 -->
        <q-infinite-scroll :handler="loadMoreCircle" ref="infiniteScrollCircle">
          <div style="padding:0px 0px 0px 0px" v-for="item in circleList" :key="item.seq">
              <q-item link :to="`/circle/circleInfo?seq=${item.seq}`" style="padding:0px 0px 0px 0px">
                <table border="0" style="width: 100%; padding:5px 0px 5px 0px;">
                  <tr>
                    <td rowspan="3" width="120"><img :src="item.circle_profile_image" class='image-circle-list'></td>
                    <td rowspan="3" width="10">&nbsp;</td>
                    <td colspan="3">{{ item.circle_name }}</td>
                  </tr>
                  <tr>
                    <td colspan="2"><q-select v-model="item.cate1_cd" color="white" :options="$store.state.circleCate1CdOptions" hide-underline readonly /></td>
                    <td colspan="1" align="right"><font size="1" color="grey">멤버 : {{ item.member_count }} 명&nbsp;&nbsp;&nbsp;</font></td>
                  </tr>
                  <tr>
                    <td colspan="3"><font size="2" color="grey">{{ item.introduce }}</font></td>
                  </tr>
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
  name: 'circle-list',
  data () {
    return {
      uid: this.$store.state.userVo.uid,
      refresherDone: '',
      // offset: 500,
      pageSizeCircle: 30,
      lastPageNumCircle: 1, // 모임 마지막 페이지
      widthOneOne: 0, // 화면너비를 1로 나눈 값 : 이미지형 리스트 정사각형으로 만들어야 되는데..시간점..
      circleList: [] // 모임 리스트
    }
  },
  components: {
  },
  created: function () {
    this.selectCircleListMax() // 모임 마지막페이지 조회
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
      this.$refs.infiniteScrollCircle.reset() // index 초기화
      this.$refs.infiniteScrollCircle.resume() // stop에서 다시 재생
      this.$refs.infiniteScrollCircle.loadMore() // loadMore로 검색
    },
    loadMoreCircle: function (index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        console.log('loadMoreCircle called index: ' + index + ' this.lastPageNumCircle: ' + this.lastPageNumCircle)
        if (index <= this.lastPageNumCircle) {
          this.selectCircleList(index, done)
        } else {
          this.$refs.infiniteScrollCircle.stop()
        }
        // refresher 로딩메세지 처리
        if (this.refresherDone != null && this.refresherDone !== '') {
          this.refresherDone() // 로딩메세지 종료
          this.refresherDone = '' // 로딩메세지 초기화
        }
      }, 100)
    },
    // 모임 리스트 마지막 페이지 조회
    selectCircleListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/circle/selectCircleListAllLastPageNum',
        {params: {pageSize: this.pageSizeCircle}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumCircle = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 모임 리스트 조회
    selectCircleList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/circle/selectCircleListAll',
        {params: {pageNum: idx, pageSize: this.pageSizeCircle}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.circleList = [] // 리스트 초기화
          }
          this.circleList = this.circleList.concat(result.data)
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    },
    goCircleDetail (seqCircle) {
      this.$router.push('/circle/circleDetail?seq=' + seqCircle)
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
