<template>
  <q-page class="">

    <q-layout-header>
      <q-toolbar color="black" inverted align="center">
        <q-btn @click="goBack" flat round dense icon="fast_rewind" />
        <q-toolbar-title><b>상품 간편 등록 테스트</b></q-toolbar-title>
        <!-- <img @click="goBack" src="statics/images/logo/widelogo.png" style="width: 80px;">&nbsp;&nbsp; -->
        <!-- <q-btn @click="goBack" flat round dense icon="home" /> -->
      </q-toolbar>
    </q-layout-header>

    <div class="no_refresh" style="width: 100%" >

      <table width="90%" border="0" align="center">
        <tr>
          <td colspan="2">
            <q-input id="videoUrlOriginal" v-model.trim="requestVo.keyword" stack-label="검색어" color="white" inverted-light clearable />
            <br>
          </td>
        </tr>
        <tr>
          <td colspan="2" align="center">
            <q-btn icon="done" :loading="loading" :percentage="percentage" color="primary" @click="getResponse" style="width:200px;" outline rounded>
              &nbsp;&nbsp;&nbsp;&nbsp;get response
              <span slot="loading">
                <q-spinner-oval class="on-left" />
                처리중...&nbsp;&nbsp;&nbsp;
              </span>
            </q-btn>
            <br>
          </td>
        </tr>
      </table>
      <br>
      <br>
    </div>

  </q-page>
</template>

<style>
</style>

<script>
// import Vue from 'vue'

export default {
  name: 'contents-register',
  data () {
    return {
      loading: false,
      percentage: 0,
      requestVo: {
        url: 'https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=',
        keyword: ''
      }
    }
  },
  created: function () {
  },
  methods: {
    getResponse () {
      this.loading = true

      // 티더라 -> %ED%8B%B0%EB%8D%94%EB%9D%BC
      let requestUrl = this.requestVo.url + encodeURI(this.requestVo.keyword + ' 중고')
      console.log(requestUrl)
      // response
      this.$axios({
        url: requestUrl,
        method: 'GET'})
        .then((result) => {
          this.loading = false // 등록 버튼 액션 중단

          let resultList = this.extractData(result.data)

          console.log(resultList)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 검색결과에서 상품가격 정보 추출
    extractData (response) {
      // 1. 최저가 분석
      // 2.
    },
    goBack () {
      try {
        // 라우터 백 패스 설정
        let path = this.$store.state.ROUTER_FROM_PATH[this.$store.state.ROUTER_FROM_PATH.length - 1]
        // 라우터 백 패스 1개 삭제
        this.$store.state.ROUTER_FROM_PATH.splice(this.$store.state.ROUTER_FROM_PATH.length - 1, 1)
        // 뒤로가기 여부 - true일 경우 라우터 패스를 저장 안함, goBack() 함수 내에서 true로 설정, 라우터에서 false로 초기화
        this.$store.state.ROUTER_IS_MOVE_BACK = true
        // 라우터 백 패스로 이동
        this.$router.push(path)
      } catch (e) {
        this.$router.push('/menu')
      }
    }
  }
}
</script>
<style>
</style>
