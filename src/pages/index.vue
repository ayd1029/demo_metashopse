<template>
  <q-page class="">

    <loginModal ref="loginModal" @callback-login="callbackLogin" />
    <personalInfoPolicyModal ref="personalInfoPolicyModal" />
    <termOfServiceModal ref="termOfServiceModal" />
    <redirectModal ref="redirectModal" />

    <div class="index-page bg-grey-2 window-height window-width column items-center no-wrap">
      <div class="banner bg-info flex flex-center">
        Driving-based MetaCommerce
      </div>
      <div class="text-center">
        <div class="card bg-white shadow-4 column no-wrap flex-center">
          <br>
          <table border="0" align="center" cellspacing="0" cellpadding="0" style="margin:0px 0px 10px 0px;">
            <tr>
              <td>
                <img src="statics/images/logo/logo.gif" width="55px">
                <!-- <img src="statics/images/logo/widelogo.png" width="200px"> -->
              </td>
            </tr>
            <tr>
              <td>
                <b>
                  <font size="4" color="black">MetaShopse</font>
                </b>
              </td>
            </tr>
          </table>

          <table border="0" align="center" width="100%" cellspacing="10">
            <tr>
              <td>
                <q-btn
                  color="warning"
                  @click="goMission"
                  size="xl"
                  style="width:100%; height:100px;"
                >
                  <table border="0" width="100%">
                    <tr>
                      <td><q-icon name="widgets" size="30px" /></td>
                    </tr>
                    <tr>
                      <td><font size="4">소개</font></td>
                    </tr>
                  </table>
                </q-btn>
              </td>
              <td>
                <q-btn
                  color="negative"
                  @click="doPreAction('BUY')"
                  size="xl"
                  style="width:100%; height:100px;"
                >
                  <table border="0" width="100%">
                    <tr>
                      <td><q-icon name="shopping_cart" size="30px" /></td>
                    </tr>
                    <tr>
                      <td><font size="4">구매</font></td>
                    </tr>
                  </table>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td>
                <q-btn
                  color="positive"
                  @click="doPreAction('ADD')"
                  size="xl"
                  style="width:100%; height:100px;"
                >
                  <table border="0" width="100%">
                    <tr>
                      <td><q-icon name="library_add" size="30px" /></td>
                    </tr>
                    <tr>
                      <td><font size="4">등록</font></td>
                    </tr>
                  </table>
                </q-btn>
              </td>
              <td>
                <q-btn
                  color="info"
                  @click="doPreAction('SELL')"
                  size="xl"
                  style="width:100%; height:100px;"
                >
                  <table border="0" width="100%">
                    <tr>
                      <td><q-icon name="local_shipping" size="30px" /></td>
                    </tr>
                    <tr>
                      <td><font size="4">판매</font></td>
                    </tr>
                  </table>
                </q-btn>
              </td>
            </tr>
          </table>

          <q-btn
            @click="openApiSellerzShop"
            color="black"
            icon="launch"
            flat
            no-caps
            no-ripple
            label="API"
            style="width:170px;"
          />
        </div>

        <!-- 사업자정보 -->
        <br>
        <q-collapsible>
          <!-- 제목 -->
          <template slot="header">
            <q-chip color="grey-2" square><font size="1" color="grey">사업자정보</font></q-chip>
            <q-item-main label="" />
            <q-item-side right>
              <!-- <font size="1">보기</font> -->
            </q-item-side>
          </template>
          <!-- 내용 -->
          <table width="100%" align="center" border="0">
            <!--
            <tr>
              <td align="left" colspan="5" width="60"><img src="statics/images/oneon/oneonlogo.png" style="width:40px;"></td>
            </tr>
            -->
            <tr>
              <td align="left" colspan="5">
                <font size="1" color="grey"><b>주식회사 클레이스타</b></font><br>
                <font size="1" color="grey">
                  (04206) 서울특별시 마포구 마포대로 196 1707호<br>
                  대표이사 : 안영대 | metashopse@gmail.com<br>
                  통신판매업신고 :2022-서울마포-1213<br>
                  사업자등록번호 : 139-87-02383 &nbsp;<a @click="goBusinessInfo"><b>사업자정보확인</b></a><br>
                  고객센터 :010-9394-1941<br>
                  <a @click="showTermOfService"><b>이용약관</b></a>&nbsp;
                  <a @click="showPersonalInfoPolicy"><b>개인정보처리방침</b></a>&nbsp;
                  <a @click="goTerms"><b>약관 및 정책</b></a>
                </font>
              </td>
            </tr>
          </table>
        </q-collapsible>
        <!-- <q-card-separator /> -->
        <!-- 저작권 -->
        <table width="100%" align="center" border="0">
          <tr>
            <td align="center">
              <font size="1" color="grey">
                Copyright © OneOn Inc. All Rights Reserved.
              </font>
            </td>
          </tr>
        </table>

      </div>
      <a class="ribbon" title="쇼핑 플랫폼의 혁명">&nbsp;</a>
    </div>

  </q-page>
</template>

<style lang="stylus">
.index-page
  .banner
    height 40vh
    width 100%
    font-size 70px
    color rgba(255, 255, 255, 0.5)
    overflow hidden
  .card
    width 85vw
    max-width 400px
    padding 10px 25px
    margin-top -90px
    border-radius 2px

.ribbon
  width 14.1em
  height 14.1em
  position absolute
  overflow hidden
  top 0
  right 0
  z-index 39
  pointer-events none
  font-size 15px
  text-decoration none
  text-indent -999999px
  opacity 0.7
  &.fixed
    position fixed
  &:before
    content ''
    padding .38em 0
    background-color white
    background-image linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .15))
    box-shadow 0 .15em .23em 0 rgba(0, 0, 0, .5)
    pointer-events auto
  &:after
    content attr(title)
    color #027be3
    line-height 1.54em
    text-decoration none
    text-align center
    text-indent 0
    padding .15em 0
    margin .15em 0

  &:before, &:after
    position absolute
    display block
    width 23.38em
    height 1.74em
    top 4.8em
    right -5.8em
    transform rotate(45deg)
</style>

<script>
// import Vue from 'vue'

// outside of the default export,
// we need to listen to the event for ourselves:
/*
document.addEventListener('deviceready', () => {
  // it's only now that we are sure
  // the event has triggered
  alert('deviceready')
}, false)
*/

export default {
  // name: 'mystore',
  data () {
    return {
      btnWidth: '365px',
      layoutWidth: '85%',
      // showFlag: false,
      token: ''
    }
  },
  created: function () {
    if (this.$store.state.device === 'P') {
      this.layoutWidth = '365px'
    }
  },
  mounted: function () {
    // this.showFlag = true
    if (this.$store.state.device === 'android' || this.$store.state.device === 'ios') {
      try {
        navigator.splashscreen.hide()
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    // 서비스 소개 화면으로 이동
    goMission () {
      let path = '/mission'

      // TODO: test
      // path = '/menu/introduce'

      this.$router.push(path)
    },
    // Open api.metashopse.com
    openApiSellerzShop () {
      // window.open('https://api.metashopse.com', '_system')
      // window.open('https://metashopse.com/apis', '_system')
      window.open(this.$store.state.DOMAIN + '/apis', '_system')
      /*
      this.$refs.redirectModal.title = '메타샵스 API'
      this.$refs.redirectModal.url = 'http://api.metashopse.com'
      this.$refs.redirectModal.icon = 'widgets'
      this.$refs.redirectModal.show()
      */
    },
    // 타겟 화면으로 이동
    doPreAction (pathCd) {
      // pathCd ADD:상품등록 BUY:구매자 홈 SELL:판매자 홈
      let path = ''
      if (pathCd === 'BUY') {
        if (this.$store.state.device === 'P') {
          path = '/main'
        } else {
          path = '/menu'
        }
      } else if (pathCd === 'SELL') {
        if (this.$store.state.device === 'P') {
          path = '/p/seller/main'
        } else {
          path = '/seller/main'
        }
      } else if (pathCd === 'ADD') {
        if (this.$store.state.device === 'P') {
          path = '/p/seller/product/productRegister'
        } else {
          path = '/seller/product/productRegister'
        }
      }

      // 로그인 정보 체크
      let loginInfo = this.checkLoginInfo()

      if (loginInfo == null) {
        this.$cookie.set('LOGIN_REDIRECT_URL', path, 1) // 현재 페이지 쿠키에 저장
        this.$refs.loginModal.show()
      } else {
        if (this.$store.state.device === 'android' || this.$store.state.device === 'ios') {
          // metashopse.com으로 이동
          this.moveToWeb(loginInfo.uid, loginInfo.authKey)
        } else {
          // 푸시로 이동
          this.$router.push(path)
        }
      }
    },
    // 로그인 정보 유무 체크
    checkLoginInfo () {
      let loginInfo = {} // 반환용 로그인 정보

      // 1. 쿠키 조회
      let uidCookie = this.$cookie.get('uid')
      let authKeyCookie = this.$cookie.get('auth_key')
      if (uidCookie != null && uidCookie !== '' && authKeyCookie != null && authKeyCookie !== '') {
        loginInfo.uid = uidCookie
        loginInfo.authKey = authKeyCookie
        return loginInfo
      }

      // 2. localStorage 조회
      let uidLocalStorage = localStorage.getItem('uid')
      let authKeyLocalStorage = localStorage.getItem('auth_key')
      if (uidLocalStorage != null && uidLocalStorage !== '' && authKeyLocalStorage != null && authKeyLocalStorage !== '') {
        loginInfo.uid = uidLocalStorage
        loginInfo.authKey = authKeyLocalStorage
        return loginInfo
      }

      // 3. store 조회
      let userVo = this.$store.state.userVo
      let uidStore = this.$store.state.userVo.uid
      let authKeyStore = this.$store.state.userVo.auth_key
      if (userVo != null && userVo !== '' && uidStore != null && uidStore !== '' && authKeyStore != null && authKeyStore !== '') {
        loginInfo.uid = uidStore
        loginInfo.authKey = authKeyStore
        return loginInfo
      }

      // 아무 정보도 없으면 null 반환값
      return null
    },
    // 로그인 콜백
    callbackLogin (uid, authKey) {
      // 로그인 쿠키가 있으면 APP에서 WEB으로 이동
      // uid, auth_key가 있으면 메인으로, 없으면 로그인으로 이동
      // APP은 둘 다 null임
      if (uid != null && uid !== '' && authKey != null && authKey !== '') {
        // 1. 푸시 토큰 저장
        if (this.$store.state.device === 'android' || this.$store.state.device === 'ios') { // APP인 경우 - 푸시 토큰 저장
          try {
            // APP인 경우 푸쉬알림용(FCM) 토큰 저장 - 기기별 토큰 취득 및 저장
            FCMPlugin.getToken(this.saveToken) // 토큰 처리 후 WEB으로 이동
          } catch (e) {
            // APP에서 WEB으로 이동
            this.moveToWeb(uid, authKey)
          }
        } else { // WEB인 경우 - 바로 이동
          this.moveToWeb(uid, authKey)
        }
      } else {
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '로그인 실패',
          icon: 'notifications_active'
        })
      }
    },
    // WEB으로 이동
    moveToWeb (uid, authKey) {
      let targetPath = this.$cookie.get('LOGIN_REDIRECT_URL')

      // test
      // targetPath = '/menu?a=1'

      // APP이면 WEB으로 이동, WEB이면 Push
      if (this.$store.state.device === 'android' || this.$store.state.device === 'ios') { // APP인 경우 - 푸시 토큰 저장
        // alert(this.$store.state.DOMAIN + '/#' + targetPath + '?uid=' + uid + '&auth_key=' + authKey)
        location.href = this.$store.state.DOMAIN + '/#' + targetPath + '?uid=' + uid + '&auth_key=' + authKey
      } else {
        this.$router.push(targetPath)
      }
    },
    // 사용자 토큰 DB에 저장
    saveToken (token) {
      // 알림 서비스
      /*
      FCMPlugin.onNotification(
        function (data) {
          if (data.wasTapped) {
            console.log('Push Notification tapped', data)
          } else {
            // this will be the state when app is already opened.
            console.log('Push Notification', data)
          }
        },
        function (msg) {
          console.log('onNotification callback successfully registered: ' + msg)
        },
        function (err) {
          console.log('Error registering onNotification callback: ' + err)
        }
      )
      */
      // 토큰 저장
      if (token != null && token !== '') { // 토큰이 있는 경우
        var pushVo = {}
        pushVo.token = token
        pushVo.reg_id = localStorage.getItem('uid')
        this.$axios.post(this.$store.state.apiServerIp + '/api/push/insertPushToken', pushVo)
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            // WEB으로 이동
            this.moveToWeb(localStorage.getItem('uid'), localStorage.getItem('auth_key'))
          })
          .catch((err) => {
            console.log(err)
            // WEB으로 이동
            this.moveToWeb(localStorage.getItem('uid'), localStorage.getItem('auth_key'))
          })
      } else {
        // WEB으로 이동
        this.moveToWeb(localStorage.getItem('uid'), localStorage.getItem('auth_key'))
      }
    },
    // 개인정보처리방침
    showPersonalInfoPolicy () {
      this.$refs.personalInfoPolicyModal.show()
    },
    // 서비스 이용 약관
    showTermOfService () {
      this.$refs.termOfServiceModal.show()
    },
    // 사업자정보확인
    goBusinessInfo () {
      /*
      this.$refs.redirectModal.title = '사업자정보'
      this.$refs.redirectModal.url = this.$store.state.BUSINESS_SITE_INFO
      this.$refs.redirectModal.icon = 'play_arrow'
      this.$refs.redirectModal.show()
      */
      window.open(this.$store.state.BUSINESS_SITE_INFO, '_system')
    },
    // 약관 및 정책
    goTerms () {
      this.$router.push('/terms')
    }
  }
}
</script>
