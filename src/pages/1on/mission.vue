<template>
  <q-page class="">

    <loginModal ref="loginModal" />
    <personalInfoPolicyModal ref="personalInfoPolicyModal" />
    <termOfServiceModal ref="termOfServiceModal" />
    <redirectModal ref="redirectModal" />

    <!-- 홈으로 돌아가기 -->
    <q-page-sticky position="top-left" :offset="[20, 10]" style="z-index:9999;">
      <q-btn flat round dense icon="home" color="blue-7" @click="goHome" />
    </q-page-sticky>

    <!-- 공유하기 -->
    <q-page-sticky position="top-right" :offset="[30, 10]" style="z-index:9999;">
      <q-btn flat round dense icon="share" color="red-7" @click="shareMission" />
    </q-page-sticky>

    <!-- 타이틀 -->
    <q-toolbar color="black" inverted align="center">
      <q-toolbar-title>
        <b>
        <font color="#027be3">쇼핑</font>&nbsp;
        <font color="#34A853">플랫폼</font>
        <font color="#FBBC05">의</font>&nbsp;
        <font color="#EA4335">혁명</font>
        </b>
      </q-toolbar-title>
    </q-toolbar>

    <!-- ◆ 컨텐츠 영역 -->
    <iframe src="https://metashopse.com/statics/mission.html" style="width:100%;" :height="iframeHeight" frameborder="0"></iframe>
    <!-- <iframe src="http://localhost:8080/statics/mission.html" style="width:100%;" :height="iframeHeight" frameborder="0"></iframe> -->

  </q-page>
</template>

<style>
</style>

<script>
export default {
  // name: 'mystore',
  data () {
    return {
      iframeHeight: 550
    }
  },
  created: function () {
    // iframe 높이 설정
    this.iframeHeight = window.innerHeight - 55
  },
  methods: {
    // 홈으로
    goHome () {
      this.$router.push('/')
      // this.$router.go(-1)
    },
    // 공유하기
    shareMission () {
      this.copyUrl(this.$store.state.DOMAIN + '/#/mission')
      // this.copyUrl('localhost' + '/mission.html')
    },
    // 클립아트로 복사하기
    copyUrl (text) {
      this.$copyText(text).then(function (e) {
        console.log(e)
        // alert('링크를 클립보드에 복사했습니다.')
      }, function (e) {
        console.log(e)
        alert('복사 실패')
      })
      this.$q.notify({
        color: 'blue',
        position: 'top',
        message: '클립보드에 복사했습니다.',
        icon: 'notifications_active'
      })
    }
  }
}
</script>
