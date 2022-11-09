<template>
  <q-page class="">
    <!--
    <q-layout-header>
      <q-toolbar
        color="black"
        inverted
      >
        <img src="statics/icons/logo.png" style="width: 30px; height: 30px;">
        &nbsp;&nbsp;&nbsp;
        <img src="statics/images/logo/widelogo.png" style="width: 80px;">
        <q-toolbar-title></q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    -->

    <div style="width: 100%;">
      <table align="center" border="0" :width="`${layoutWidth}`">
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="3">
            <img src="statics/images/logo/widelogo.png" style="width: 250px;">
          </td>
        </tr>
        <tr>
          <td align="center" colspan="3">쇼핑 플랫폼의 혁명</td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="left" colspan="3">
            <div style="width:100%">
              <q-tabs v-model="$store.state.findVo.findTarget" inverted align="justify" color="black">
                <q-tab name="ID" slot="title">아이디 찾기</q-tab>
                <q-tab name="PWD" slot="title">비밀번호 찾기</q-tab>
              </q-tabs>
            </div>
          </td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3"><q-input v-model.trim="$store.state.findVo.email" float-label="회원가입시 등록한 이메일" clearable /></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3">
            <q-btn v-if="$store.state.findVo.findTarget === 'ID'" :loading="loading" :percentage="percentage" color="primary" outline @click="sendMail" icon="send" style="width:100%; height: 50px">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;아이디를 메일로 보내기
              <span slot="loading">
                <q-spinner-oval class="on-left" />
                전송중...
              </span>
            </q-btn>
            <q-btn v-else :loading="loading" :percentage="percentage" color="primary" outline @click="sendMail" icon="send" style="width:100%; height: 50px">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;임시 비밀번호를 메일로 보내기
              <span slot="loading">
                <q-spinner-oval class="on-left" />
                전송중...
              </span>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3"><q-card-separator /></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3"><q-btn outline color="grey" @click="goBack" icon="fast_rewind" label="돌아가기" style="width: 100%; height:50px" /></td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
      </table>
      <br>
    </div>
    <!--
    <q-page-sticky expand position="bottom" style="background:red;height:66px;">
      플레이어 알림창
      <table border="0" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td width="20"></td>
          <td><font size="2" color="white"><b>우리의 노력에 대한 가장 값진 보상은<br>그 과정에서 만들어지는 우리 자신의 모습이다.</b></font></td>
          <td align="right"><font size="2" color="white"><b>DJ →</b></font></td>
          <td width="75"></td>
        </tr>
      </table>
    </q-page-sticky>
    -->
  </q-page>
</template>

<style>
</style>

<script>

export default {
  // name: 'mystore',
  data () {
    return {
      layoutWidth: '85%',
      loading: false,
      percentage: 0
    }
  },
  created: function () {
    if (this.$store.state.device === 'P') {
      this.layoutWidth = '365px'
    }
  },
  methods: {
    // 메일 보내기
    sendMail () {
      if (this.$store.state.findVo.email === '') { // 이메일 입력 체크
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '이메일을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      // ID/PWD 찾아서 메일 보내기
      this.loading = true
      this.$axios.post(this.$store.state.apiServerIp + '/api/login/sendMailUserInfo', this.$store.state.findVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data.resultCd === 'SUCCESS') {
            // 메일전송 성공 메세지
            this.$q.notify({
              color: 'blue',
              position: 'top',
              message: '메일이 전송되었습니다.',
              icon: 'notifications_active'
            })
            // 로그인 화면으로 이동
            this.$router.push(this.$store.state.PAGE_LOGIN)
          } else {
            let errorMessage = result.data.resultMsg
            // 메일전송 실패 메세지
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: errorMessage,
              icon: 'notifications_active'
            })
          }
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
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
