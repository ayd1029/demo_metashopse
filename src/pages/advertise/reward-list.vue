<template>
  <q-page class="">

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>원더내역</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
        <!-- <q-select inverted-light color="white" v-model="selectedOrderBy" :options="selectedOrderByOptions" style="width:120px" /> -->
      </q-toolbar>
    </q-layout-header>

    <!-- 보상 리스트 -->
    <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" >
      <q-infinite-scroll :handler="loadMore" ref="infiniteScroll">
        <div style="padding:0px 0px 0px 0px" v-for="item in rewardList" :key="item.seq">
          <q-item link style="padding:0px 0px 0px 0px">
            <table border="0" style="width: 100%; padding:5px 0px 5px 0px;">
              <thead>
                <th width="12%"></th>
                <th width="10%"></th>
                <th width="50%"></th>
                <th width="28%"></th>
              </thead>
              <tbody>
                <tr>
                  <td colspan="3" align="left">&nbsp;<font size="2" color="grey">{{ item.reg_time }}</font></td>
                  <td align="right"><font size="2" color="red">누적 <b>{{ addComma(item.coin) }}</b>&nbsp;&nbsp;<img src="statics/images/logo/logocoin.png" style="width: 9px"></font>&nbsp;&nbsp;&nbsp;</td>
                </tr>
                <tr>
                  <td align="center"><font size="2" color="grey">상품</font></td>
                  <td align="center"><img :src="item.image_url" style="width:30px;"></td>
                  <td><font size="2" color="grey">{{ item.title }}</font></td>
                  <td align="right"><font size="2" color="grey">가격 {{ addComma(item.price) }} 원</font>&nbsp;&nbsp;&nbsp;</td>
                </tr>
                <tr>
                  <td align="center"><font size="2" color="grey">구매자</font></td>
                  <td align="center"><img :src="item.profile_image" class="round-reward"></td>
                  <td><font size="2" color="grey">{{ item.reg_name }}</font></td>
                  <td align="right"><font size="2" color="black"><b>{{ addComma(item.calc_coin) }}</b>&nbsp;&nbsp;<img src="statics/images/logo/logocoin.png" style="width: 9px"></font>&nbsp;&nbsp;&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </q-item>
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
.round-reward {
  border-radius: 50%;
  overflow: hidden;
  width: 30px;
  height: 30px;
}
.round-reward img {
  display: block;
  min-width: 100%;
  min-height: 100%;
}
</style>

<script>
import Vue from 'vue'

export default {
  name: 'my-reward-list',
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
      rewardList: []
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
    // 보상내역 마지막 페이지 조회
    selectListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/coin/selectMyRewardListLastPageNum',
        {params: {pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 보상내역 조회
    selectList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/coin/selectMyRewardList',
        {params: {pageNum: idx, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.rewardList = [] // 리스트 초기화
          }
          this.rewardList = this.rewardList.concat(result.data)
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
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
