<template>
  <q-page class="">

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="group" />
        <q-toolbar-title>모임</q-toolbar-title>
        <q-btn flat round dense icon="search" @click="goSearch" />
      </q-toolbar>
    </q-layout-header>

    <div>
      &nbsp;<q-chip color="black" square icon="account_circle" style="width:110px;">내모임</q-chip>
    </div>
    <q-card-separator />

    <!-- 1. 내모임 리스트 -->
    <div style="padding:0px 0px 0px 0px" v-for="item in circleList" :key="item.seq">
      <q-item :to="`/circle/circleInfo?seq=${item.seq}`" style="padding:0px 0px 0px 0px">
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
    <br>
    <div class="">
      &nbsp;<q-chip color="black" square icon="group" style="width:110px;">추천모임</q-chip>
    </div>
    <q-card-separator />
    <!-- 2. 추천모임 리스트 -->
    <div style="padding:0px 0px 0px 0px" v-for="item in recommendCircleList" :key="item.seq">
      <q-item :to="`/circle/circleInfo?seq=${item.seq}`" style="padding:0px 0px 0px 0px">
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

    <q-page-sticky position="bottom-left" :offset="[18, 18]" style="z-index:1;">
      <q-btn round color="primary" @click="goCircleRegister" style="width: 60px; height: 60px">개설</q-btn>
    </q-page-sticky>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>&nbsp;
  </q-page>
</template>

<style>
</style>

<script>
import Vue from 'vue'

export default {
  // name: 'new-product-list',
  data () {
    return {
      circleList: [], // 내모임
      recommendCircleList: [] // 추천모임 10건
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
    // this.$q.loading.show() // 로딩 표시 종료
    // 내모임 리스트 조회
    this.$axios.get(this.$store.state.apiServerIp + '/api/circle/selectUserCircleList', {params: {uid: this.$store.state.userVo.uid}})
      .then((result) => {
        // console.log(JSON.stringify(result.data))
        this.circleList = result.data
      })
      .catch((err) => {
        console.log(err)
      })

    // 추천모임 리스트 조회
    this.$axios.get(this.$store.state.apiServerIp + '/api/circle/selectRecommendCircleList', {params: {uid: this.$store.state.userVo.uid}})
      .then((result) => {
        // console.log(JSON.stringify(result.data))
        this.recommendCircleList = result.data
        // this.$q.loading.hide() // 로딩 표시 종료
      })
      .catch((err) => {
        console.log(err)
        // this.$q.loading.hide() // 로딩 표시 종료
      })
  },
  methods: {
    goSearch () {
      this.$router.push('/search')
    },
    goCircleRegister () {
      this.$router.push('/circle/circleRegister')
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
