<template>
  <q-page class="flex justify-center">

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>관리자 - 핫딜 관리</q-toolbar-title>
        <!-- <q-btn flat round dense icon="search" @click="goSearch" /> -->
        <!-- <q-select inverted-light color="white" v-model="selectedOrderBy" :options="selectedOrderByOptions" style="width:120px" /> -->
      </q-toolbar>
    </q-layout-header>

    <div :style="`width: ${widthRate}%`">
      <!-- 핫딜 리스트 -->
      <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td><q-btn color="black" size="xs" style="width:120px;"><font size="3">핫딜 내역</font></q-btn></td>
        </tr>
        <tr>
          <td><q-card-separator /></td>
        </tr>
      </table>
      <q-infinite-scroll :handler="loadMore" ref="infiniteScroll">
        <div style="padding:0px 0px 0px 0px" v-for="item in hotdealList" :key="item.seq">
          <q-item link @click.native="goHotdealDetail(item.seq)" style="padding:0px 0px 0px 0px">
            <table border="0" style="width: 95%" align="center">
              <tr>
                <td width="80"><font size="2" color="black">핫딜기간</font></td>
                <td><font size="2" color="black">{{ item.start_date }} ~ {{ item.end_date }}</font></td>
                <td width="80" rowspan="3" align="center">
                  <q-btn dense color="red" label="상세정보" @click="goHotdealDetail(item.seq)" size="md" outline style="width:70px" />
                </td>
              </tr>
              <tr>
                <td><font size="2" color="black">총입금액</font></td>
                <td><font size="2" color="black">{{ item.total_price }} 만원</font></td>
              </tr>
              <tr>
                <td><font size="2" color="black">상태</font></td>
                <td v-if="item.del_id == null && item.deposit_time == null"><font size="2" color="red">입금대기</font></td>
                <td v-else-if="item.del_id == null && item.deposit_time != null"><font size="2" color="green">정상완료</font></td>
                <td v-else-if="item.del_id != null"><font size="2" color="grey">신청취소</font></td>
                <td v-else></td>
              </tr>
            </table>
          </q-item>
          <table width="95%" align="center">
            <tr>
              <td><q-card-separator /></td>
            </tr>
          </table>
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
  name: 'hotdeal-list',
  data () {
    return {
      widthRate: 100, // 레이아웃 너비 % - PC화면 대응
      pageSize: 15,
      lastPageNum: 1, // 마지막 페이지
      hotdealList: []
    }
  },
  components: {
  },
  created: function () {
    this.selectListMax() // 마지막페이지 조회
  },
  methods: {
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
        }
      }, 500)
    },
    // 핫딜 리스트 마지막 페이지 조회
    selectListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/hotdeal/selectHotdealListLastPageNum',
        {params: {pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 핫딜 리스트 조회
    selectList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/hotdeal/selectHotdealList',
        {params: {pageNum: idx, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.hotdealList = [] // 리스트 초기화
          }
          this.hotdealList = this.hotdealList.concat(result.data)
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    },
    // 핫딜 신청 화면으로 이동
    goHotdealRegister (seqProduct) {
      this.$router.push('/menu/hotdealRegister')
    },
    // 핫딜 상세 화면으로 이동
    goHotdealDetail (seqHotdeal) {
      this.$router.push('/menu/hotdealDetail?seq=' + seqHotdeal)
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
