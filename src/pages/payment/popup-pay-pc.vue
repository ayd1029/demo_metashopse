<template>
  <q-page class="">
    <!-- 이 페이지는 결제 연동 스크립트를 로드하는 역할만 함. -->
    <!--
    <q-layout-header>
      <q-toolbar
        color="black"
        inverted
      >
        <q-btn flat round dense icon="accessibility_new" />
        <q-toolbar-title>결제팝업</q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    -->
  </q-page>
</template>

<style>
</style>

<script>
// import Vue from 'vue'

export default {
  name: 'popup-pay-pc',
  data () {
    return {

    }
  },
  components: {
  },
  created: function () {
    this.$loadScript('https://stdpay.inicis.com/stdjs/INIStdPay_popup.js')
      .then(() => {
        // Script is loaded, do something
        window.vm = this // callback.js 의 vm 변수에 this 를 설정, 결제 완료 후 콜백에서 사용
      })
      .catch(() => {
        // Failed to fetch script
      })
  },
  mounted: function () {
  },
  methods: {
    goBack () {
      this.$router.push('/menu')
    }
  }
}
</script>
