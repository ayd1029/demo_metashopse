
<template>
  <q-modal v-model="personalInfoPolicyModal" position="" :content-css="{minWidth: '30%', minHeight: '50%'}">
    <q-modal-layout>

      <loginModal ref="loginModal" @callback-login="callbackLogin" />

      <q-toolbar slot="header" color="black" inverted>
        <!-- <img src="statics/icons/logo.png" style="width: 30px; height: 30px;"> -->
        <q-btn flat round dense icon="cake" />
        <q-toolbar-title>2019년 메타샵스 오픈 이벤트</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <br>
      <table align="center" border="0" width="100%">
        <tr>
          <td align="center">
            <img src="statics/images/logo/logolp.gif" style="width:150px;">
          </td>
        </tr>
      </table>

      <table width="100%" border="0" align="center">
        <thead>
          <th width="10%"></th>
          <th width="100"></th>
          <th></th>
        </thead>
        <tr>
          <td colspan="3" align="left">

            <table width="90%" border="0" align="center">
              <tr>
                <td align="center">
                  <br>
                  <b>🔥 2019년 메타샵스 오픈 이벤트 🔥</b>
                  <br>
                  <br>
                </td>
              </tr>
              <tr>
                <td>
                  <br>
                  일명, '<b>백원더(<img src="statics/images/logo/logocoin.png" style="width: 12px">)</b>' 이벤트<br><br>
                  유튜브 동영상 링크를 등록만 하면<br><br>
                  <font color="red">링크 1개당 💯원더(<img src="statics/images/logo/logocoin.png" style="width: 12px">)씩 보상이! 👍</font><br><br>
                  <br>
                  ■ 참여 방법<br>
                  <br>① 유튜브에서 동영상의 '<font color="red">공유</font>'를 누르고<br>
                  <br>② '<font color="red">주소 복사</font>'를 선택한 후<br>
                  <br>③ <b>메타샵스</b>의 스토리 등록 화면에 <font color="red">붙여넣기</font>.<br>
                  <br>④ <font color="red">등록하기</font>. 끝. 💯원더(<img src="statics/images/logo/logocoin.png" style="width: 12px">) 벌었지요~<br><br>
                  땅 파도 나오지 않는 머니,<br>
                  <b>링크 등록하면 나온다!</b><br><br>
                  지금 바로 시작하세요.<br><br>
                  <font size="1" color="grey">※ 상기 이벤트는 목표 보상금액에 의해 조기종료될 수 있습니다.</font><br><br>
                </td>
              </tr>
            </table>

          </td>
        </tr>
        <tr>
          <td colspan="3" align="center">
            <q-btn color="primary" @click="showYoutube" icon="play_arrow" style="width:45%">&nbsp;&nbsp;&nbsp;&nbsp;유튜브 방문</q-btn>
            &nbsp;
            <q-btn color="primary" @click="doPreAction('/add')" icon="add_circle_outline" style="width:45%">&nbsp;&nbsp;&nbsp;&nbsp;스토리 등록</q-btn>
          </td>
        </tr>
        <tr>
          <td colspan="3" align="center">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="3" align="center">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="3" align="center">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="3" align="center">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="3" align="center">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="3" align="center">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="3" align="center">&nbsp;</td>
        </tr>
      </table>
    </q-modal-layout>
  </q-modal>
</template>

<style>
</style>

<script>
import Vue from 'vue'

export default {
  // name: 'mystore',
  data () {
    return {
      personalInfoPolicyModal: false
    }
  },
  created: function () {
  },
  methods: {
    show () {
      this.personalInfoPolicyModal = true
    },
    // 유튜브 링크
    showYoutube () {
      if (this.$store.state.device === 'android') {
        window.open('intent://m.youtube.com#Intent;scheme=http;package=com.google.android.youtube;end', '_blank')
      } else if (this.$store.state.device === 'ios') {
        window.open('youtube://m.youtube.com', '_blank')
      } else {
        window.open('https://m.youtube.com', '_system', 'location=yes,footer=yes')
      }
    },
    doPreAction (path) { // 화면 이동 전처리
      // 로그인 체크
      if (!this.checkLogin()) {
        this.$refs.loginModal.show()
        return
      }
      this.$router.push(path)
    },
    // 로그인 체크
    checkLogin () {
      return Vue.prototype.$checkLogin(this.$store.state.userVo)
    },
    // ■ 로그인 콜백
    callbackLogin () {
      // 로그인 후 액션
      this.$router.push('/add')
    },
    close () {
      this.personalInfoPolicyModal = false
    }
  }
}
</script>
