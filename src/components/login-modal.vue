<template>
  <q-modal v-model="loginModal" :content-css="{minWidth: '365px', minHeight: '365px'}">
    <q-modal-layout>

      <q-toolbar slot="header" color="secondary" inverted>
        <q-toolbar-title></q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <!-- ■■■■■■■■■■ 1. 로그인 ■■■■■■■■■■ -->
      <table v-if="loginCd === 1" align="center" border="0" :width="layoutWidth">
        <tr>
          <td align="center">
            <br>
            <img src="statics/images/logo/widelogo.png" style="width: 250px;">
          </td>
        </tr>
        <tr>
          <td align="center">Driving-based MetaCommerce</td>
        </tr>
        <tr>
          <td align="center">&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="center">
            <!-- <q-icon name="widgets" color="secondary" size="7em" /><br> -->
            <img src="statics/images/logo/logo.png" style="width: 55px;">
          </td>
        </tr>
        <tr>
          <td align="center"><font size="4"><b>메타샵스</b></font></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="center">&nbsp;</td>
        </tr>
        <tr>
          <td align="center">
            <q-btn @click="doLoginKakaoStart" :loading="loading" :percentage="percentage" size="md" color="kakao" style="width:100%; height:50px;">
              <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="30" align="center"><img src="statics/images/logo/kakao_logo.png" style="width:30px; vertical-align:middle;"></td>
                  <td align="center"><font size="3" color="#3c1e1e">카카오 계정으로 로그인</font></td>
                </tr>
              </table>
              <span slot="loading">
                <q-spinner-oval color="black" />
                &nbsp;&nbsp;&nbsp;<font size="3" color="black">로그인중</font>
              </span>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td></td>
        </tr>
        <tr>
          <td></td>
        </tr>
        <tr>
          <td align="center">
            <q-btn @click="setLoginCode(2)" size="md" color="secondary" outline style="width:100%; height:50px;">
              <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="30" align="center"><img src="statics/images/logo/logo.png" style="width:26px; vertical-align:middle;"></td>
                  <td align="center" style="vertical-align:middle"><font size="3" color="black">메타샵스 아이디로 로그인</font></td>
                </tr>
              </table>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
      </table>

      <!-- ■■■■■■■■■■ 2. 메타샵스 로그인 ■■■■■■■■■■ -->
      <table v-if="loginCd === 2" align="center" border="0" :width="layoutWidth">
        <tr>
          <td align="center" colspan="3">
            <br>
            <img src="statics/images/logo/widelogo.png" style="width: 250px;">
          </td>
        </tr>
        <tr>
          <td align="center" colspan="3">Driving-based MetaCommerce</td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="left" colspan="3"><q-input inverted-light color="white" v-model.trim="userVo.uid" float-label="아이디" clearable /></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3"><q-input @keyup="keyup" inverted-light color="white" v-model.trim="userVo.pwd" float-label="비밀번호" type="password" no-pass-toggle clearable /></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3">
            <q-btn :loading="loading" :percentage="percentage" color="tertiary"
                @click="doLoginSellerz" icon="accessibility_new" style="width:100%; height: 50px">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;로 그 인
              <span slot="loading">
                <q-spinner-oval class="on-left" />
                로그인중...
              </span>
            </q-btn>
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
        <tr style="height:25px">
          <td width="110" align="left"><q-checkbox v-model="autoLoginCheck" color="tertiary"><font size="2" color="grey">&nbsp;&nbsp;자동로그인</font></q-checkbox></td>
          <td ><!--<q-checkbox v-model="businessMode" keep-color><font size="2" color="grey">&nbsp;&nbsp;사업자모드</font></q-checkbox>--></td>
          <td align="right"><a @click="setLoginCode(3)"><font size="2" color="grey">아이디/비밀번호 찾기</font></a></td>
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
          <td align="left" colspan="3">
            <q-btn outline color="green" @click="goJoin" icon="how_to_reg" label="회원가입" style="width:100%; height: 50px" />
          </td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="left" colspan="3">
            <q-btn outline color="grey" @click="setLoginCode(1)" icon="fast_rewind" label="돌아가기" style="width:100%; height: 50px" />
          </td>
        </tr>
        <tr>
          <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="3">&nbsp;</td>
        </tr>
      </table>

      <!-- ■■■■■■■■■■ 3. ID/PWD 찾기 ■■■■■■■■■■ -->
      <table v-if="loginCd === 3" align="center" border="0" :width="layoutWidth">
        <tr>
          <td align="center" colspan="3">
            <br>
            <img src="statics/images/logo/widelogo.png" style="width: 250px;">
          </td>
        </tr>
        <tr>
          <td align="center" colspan="3">Driving-based MetaCommerce</td>
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
              <q-tabs v-model="$store.state.findVo.findTarget" inverted align="justify" color="tertiary">
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
          <td align="left" colspan="3"><q-input v-model.trim="$store.state.findVo.email" float-label="회원가입시 등록한 이메일" clearable color="secondary" /></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3"></td>
        </tr>
        <tr>
          <td align="left" colspan="3">
            <q-btn v-if="$store.state.findVo.findTarget === 'ID'" :loading="loading" :percentage="percentage" color="tertiary"
                @click="sendMail" icon="send" style="width:100%; height: 50px">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;아이디를 메일로 보내기
              <span slot="loading">
                <q-spinner-oval class="on-left" />
                전송중...
              </span>
            </q-btn>
            <q-btn v-else :loading="loading" :percentage="percentage" color="tertiary"
                @click="sendMail" icon="send" style="width:100%; height: 50px">
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
          <td align="left" colspan="3">
            <q-btn outline color="grey" @click="setLoginCode(2)" icon="fast_rewind" label="돌아가기" style="width: 100%; height:50px" />
          </td>
        </tr>
        <tr>
          <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="3">&nbsp;</td>
        </tr>
      </table>

    </q-modal-layout>
  </q-modal>
</template>

<style>
.text-kakao {
  color: #ffffff;
}
.bg-kakao {
  background: #ffeb00;
}
</style>

<script>

export default {
  // name: 'mystore',
  data () {
    return {
      loginCd: 1, // 1:로그인 2:메타샵스 로그인 3:ID/PWD 찾기
      autoLoginCheck: true,
      layoutWidth: '85%',
      loading: false,
      percentage: 0,
      loginModal: false,

      businessMode: false, // 사업자모드
      userVo: {
        seq: '',
        uid: '',
        pwd: ''
      }
    }
  },
  created: function () {
    if (this.$store.state.device === 'P') {
      this.layoutWidth = '280px'
    }
  },
  methods: {
    show () {
      // 쿠키값 화면에 설정
      this.userVo.uid = this.$cookie.get('uid')
      this.userVo.pwd = this.$cookie.get('auth_key')
      if (this.$cookie.get('uid') == null) {
        this.userVo.uid = ''
      }
      if (this.$cookie.get('auth_key') == null) {
        this.userVo.pwd = ''
      }

      // TODO: 테스트용
      this.userVo.uid = 'ayd1029'
      this.userVo.pwd = '1'

      // 콜백 스크립트 로드
      this.$loadScript('statics/js/callback.js')
        .then(() => {
          // Script is loaded, do something
          window.vm = this // callback.js 의 vm 변수에 this 를 설정, 콜백에서 사용
        })
        .catch(() => {
          // Failed to fetch script
          console.log('callback.js loadScript failed.')
        })
      this.loginModal = true
    },
    // 1. 카카오 로그인
    doLoginKakaoStart () {
      if (this.$store.state.device === 'android' || this.$store.state.device === 'ios') { // APP인 경우
        // APP인 경우
        this.doLoginKakaoStartApp()
      } else { // PC WEB or Mobile WEB인 경우
        // WEB인 경우
        this.doLoginKakaoStartWeb()
      }
    },
    // 카카오 로그인 앱버전
    doLoginKakaoStartApp () {
      this.loading = true // 로딩표시 시작
      let loginOptions = {}
      /*
      KAKAO_TALK 0 kakaotalk으로 login을 하고 싶을때 지정.
      KAKAO_STORY 1 kakaostory으로 login을 하고 싶을때 지정.
      KAKAO_ACCOUNT 2 웹뷰 Dialog를 통해 카카오 계정연결을 제공하고 싶을경우 지정.
      KAKAO_TALK_EXCLUDE_NATIVE_LOGIN 3 카카오톡으로만 로그인을 유도하고 싶으면서 계정이 없을때 계정생성을 위한 버튼도 같이 제공을 하고 싶다면 지정.
      KAKAO_TALK과 중복 지정불가.
      KAKAO_LOGIN_ALL 4 모든 로그인방식을 사용하고 싶을때 지정.

      ★ 플러그인은 하기와 같이 정의되어 있음!!! ★
      AuthTypeTalk: 1,
      AuthTypeStory: 2,
      AuthTypeAccount: 3
      */
      loginOptions['authTypes'] = [1] // 카카오톡 계정으로 로그인 - 카카오스토리, 카카오계정은 뺐음. 테스트 시간이 있으면 추후 추가.
      KakaoCordovaSDK.login(loginOptions, this.successCallbackApp, this.errorCallbackApp)
    },
    // [APP] 카카오 로그인 성공시
    successCallbackApp (authObj) {
      // console.log(JSON.stringify(authObj))
      this.doLoginKakaoApp(authObj)
    },
    // [APP] 카카오 로그인 실패시
    errorCallbackApp (error) {
      this.loading = false // 로딩표시 종료
      this.$q.notify({
        color: 'primary',
        position: 'top',
        message: error.errorMessage,
        icon: 'notifications_active'
      })
      console.log(JSON.stringify(error))
    },
    // [APP] 2. 카카오 토큰으로 회원가입 or 로그인
    doLoginKakaoApp (authObj) {
      this.$axios.post(this.$store.state.apiServerIp + '/api/login/doLoginKakaoApp', authObj)
      // this.$axios.post('http://1.232.77.251' + '/api/login/doLoginKakaoApp', authObj)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data.resultCd !== 'SUCCESS') { // 카카오 로그인 실패시
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: result.data.resultMsg,
              icon: 'notifications_active'
            })
          } else {
            // localStorage에 사용자 정보 저장
            localStorage.setItem('uid', result.data.uid, 365)
            localStorage.setItem('auth_key', result.data.auth_key, 365)

            // 부모창의 콜백함수 호출
            this.$emit('callback-login', result.data.uid, result.data.auth_key)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // [WEB] 1. 카카오 WEB 로그인
    doLoginKakaoStartWeb () {
      // 카카오 JS 로그인
      this.$store.state.Kakao.Auth.login({
        success: function (authObj) {
          // alert(JSON.stringify(authObj))
          // doLoginKakaoStart() -> callback.js의 doLoginKakaoJs() -> 여기 뷰의 doLoginKakao() 순서로 실행됨
          window.doLoginKakaoJs(authObj)
        },
        fail: function (err) {
          console.log(JSON.stringify(err))
        }
      })
    },
    // [WEB] 2. 카카오 토큰으로 회원가입 or 로그인
    doLoginKakao (authObj) {
      this.$axios.post(this.$store.state.apiServerIp + '/api/login/doLoginKakao', authObj)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data.resultCd !== 'SUCCESS') { // 카카오 로그인 실패시
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: result.data.resultMsg,
              icon: 'notifications_active'
            })
          } else {
            // 로그인 처리
            this.doLogin(result.data)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // [WEB] 3. 로그인
    doLogin (userVo) {
      // 쿠키에 사용자 정보 저장
      this.$cookie.set('uid', userVo.uid, 365)
      this.$cookie.set('auth_key', userVo.auth_key, 365)

      this.$store.state.userVo = userVo // 사용자 정보 설정
      this.$store.state.userVo.auth_key = userVo.auth_key // 인증키 설정

      // 부모창의 콜백함수 호출
      this.$emit('callback-login', userVo.uid, userVo.auth_key)

      // 사용자 코인 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/coin/selectCoinRanking',
        {params: {uid: this.$store.state.userVo.uid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // 코인 정보 설정
          this.$store.state.coinVo = result.data
        })
        .catch((err) => {
          console.log('★★3 ' + err)
        })
      // 판매자 정보 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/seller/selectSeller')
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // 판매자 정보 설정
          // 상품 등록시 계좌정보가 없으면 등록필요 알림
          this.$store.state.sellerVo = result.data

          // 로그인 창 닫기
          this.close()
        })
        .catch((err) => {
          console.log('★★4 ' + err)
        })

      // 환영 메세지
      /*
      this.$q.notify({
        color: 'green',
        position: 'top',
        message: userVo.name + '님 환영합니다.',
        icon: 'accessibility_new'
      })
      */
    },
    // 로그인 코드 설정
    setLoginCode (code) {
      this.loginCd = code
    },
    // 비밀번호 입력창 키업 이벤트
    keyup (event) {
      if (event.key === 'Enter') { // 엔터일 경우 로그인
        this.doLoginSellerz()
      }
    },
    // 로그인
    doLoginSellerz () {
      if (this.userVo.uid == null || this.userVo.uid === '') { // 아이디 입력 체크
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '아이디를 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }

      if (this.userVo.pwd == null || this.userVo.pwd === '') { // 비밀번호 입력 체크
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '비밀번호를 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }

      this.$cookie.set('autoLoginCheck', this.autoLoginCheck, 365)
      this.$cookie.set('autoLoginRun', this.autoLoginCheck, 365)

      this.loading = true
      // 로그인
      this.$axios.post(this.$store.state.apiServerIp + '/api/login/doLogin', this.userVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // 사용자 정보 설정
          if (result.data.resultCd === 'SUCCESS') {
            this.$store.state.userVo = result.data // 사용자 정보 설정
            // 쿠키에 사용자 정보 저장
            this.$cookie.set('uid', result.data.uid, 365)
            this.$cookie.set('auth_key', result.data.auth_key, 365)

            if (this.$store.state.device === 'android' || this.$store.state.device === 'ios') {
              // localStorage에 사용자 정보 저장
              localStorage.setItem('uid', this.userVo.uid, 365)
              localStorage.setItem('auth_key', result.data.auth_key, 365)
            }

            // 사용자 코인 조회
            this.$axios.get(this.$store.state.apiServerIp + '/api/coin/selectCoinRanking',
              {params: {uid: this.$store.state.userVo.uid}})
              .then((result) => {
                // console.log(JSON.stringify(result.data))
                // 코인 정보 설정
                this.$store.state.coinVo = result.data
              })
              .catch((err) => {
                console.log(err)
              })

            // 판매자 정보 조회
            this.$axios.get(this.$store.state.apiServerIp + '/api/seller/selectSeller')
              .then((result) => {
                // console.log(JSON.stringify(result.data))
                // 판매자 정보 설정
                // 상품 등록시 계좌정보가 없으면 등록필요 알림
                this.$store.state.sellerVo = result.data
                // this.$store.state.sellerVo.from_post_no = result.data.from_post_no
                // this.$store.state.sellerVo.deposit_account_no = result.data.deposit_account_no
              })
              .catch((err) => {
                console.log(err)
              })

            // 부모창의 콜백함수 호출
            this.$emit('callback-login', result.data.uid, result.data.auth_key)

            this.close() // 로그인창 닫기
          } else {
            let errorMessage = ''
            if (result.data.resultCd === 'NO_ID') {
              errorMessage = '그런 아이디는 없어요..'
            } else if (result.data.resultCd === 'WRONG_PASSWORD') {
              errorMessage = '비밀번호가 틀렸어요..'
            } else {
              errorMessage = '로그인 실패'
            }
            // 로그인 실패 메세지
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
      // this.loginModal = false
    },
    goJoin () {
      // this.loginModal = false
      // this.$refs.joinModal.show()
      // let serverName = location.hostname
      // let serverIp = location.host
      // window.open('http://' + serverIp + '/#/join')
      this.$router.push('/join')
    },
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
            // 메타샵스 로그인 화면으로 설정
            this.loginCd = 2
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
    close () {
      this.loginModal = false
      this.loginCd = 1 // 로그인 코드 초기화
    }
  }
}
</script>
