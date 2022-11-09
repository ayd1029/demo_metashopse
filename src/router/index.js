import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import LoadScript from 'vue-plugin-load-script'
import routes from './routes'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueClipboard from 'vue-clipboard2'
import playlistHistoryModal from '../components/playlist-history-modal'
import loginModal from '../components/login-modal'
import loginKakaoModal from '../components/login-kakao-modal'
import shareModal from '../components/share-modal'
import buyOptionModal from '../components/buy-option-modal'
import buyOrderModal from '../components/buy-order-modal'
import orderDeliveryModal from '../components/order-delivery-modal'
import orderReturnModal from '../components/order-return-modal'
import orderReturnSellerModal from '../components/order-return-seller-modal'
import reviewTargetModal from '../components/review-target-modal'
import reviewRegisterModal from '../components/review-register-modal'
import redirectModal from '../components/redirect-modal'
import traceDeliveryModal from '../components/trace-delivery-modal'
import addressBookModal from '../components/address-book-modal'
import addressRegisterModal from '../components/address-register-modal'
import addressModifyModal from '../components/address-modify-modal'
import addressSearchModal from '../components/address-search-modal'
import sellerManagerModal from '../components/seller-manager-modal'
import contentsModifyModal from '../components/contents-modify-modal'
import contentsReplyModal from '../components/contents-reply-modal'
import contentsReplyModifyModal from '../components/contents-reply-modify-modal'
import appDownloadModal from '../components/app-download-modal'
import vbankDepositInfoModal from '../components/vbank-deposit-info-modal'
import personalInfoPolicyModal from '../components/personal-info-policy-modal'
import eventInfoModal from '../components/event-info-modal'
import termOfServiceModal from '../components/term-of-service-modal'
import termsOfService from '../components/terms-of-service'
import termsOfElectronicFinance from '../components/terms-of-electronic-finance'
import termsOfSeller from '../components/terms-of-seller'
import termsOfPrivacy from '../components/terms-of-privacy'
import termsOfPrivacyOffering from '../components/terms-of-privacy-offering'
import termsOfPrivacyPolicy from '../components/terms-of-privacy-policy'
import termsOfMarketing from '../components/terms-of-marketing'
import hotdealRegisterModal from '../components/hotdeal-register-modal'
import wiseSayingRegisterModal from '../components/wise-saying-register-modal'

var VueCookie = require('vue-cookie')
Vue.use(VueRouter)
Vue.use(LoadScript)
Vue.use(VueCookie)
Vue.use(VueAwesomeSwiper)
Vue.use(VueClipboard)

// 전역 컴포넌트
Vue.component('loginModal', loginModal) // 로그인
Vue.component('loginKakaoModal', loginKakaoModal) // 카카오 로그인
Vue.component('playlistHistoryModal', playlistHistoryModal) // 플레이 히스토리 리스트
Vue.component('redirectModal', redirectModal) // 리다이렉트 - 사업자정보 등
Vue.component('shareModal', shareModal) // 공유하기
Vue.component('buyOptionModal', buyOptionModal) // 구매 옵션
Vue.component('buyOrderModal', buyOrderModal) // 구매 주문
Vue.component('orderDeliveryModal', orderDeliveryModal) // 배송관리
Vue.component('orderReturnModal', orderReturnModal) // 반품교환신청
Vue.component('orderReturnSellerModal', orderReturnSellerModal) // 판매자 반품교환관리
Vue.component('reviewTargetModal', reviewTargetModal) // 구매후기 작성대상
Vue.component('reviewRegisterModal', reviewRegisterModal) // 구매후기 등록수정
Vue.component('traceDeliveryModal', traceDeliveryModal) // 배송조회
Vue.component('addressBookModal', addressBookModal) // 주소록
Vue.component('addressRegisterModal', addressRegisterModal) // 주소 등록
Vue.component('addressModifyModal', addressModifyModal) // 주소 수정
Vue.component('addressSearchModal', addressSearchModal) // 주소 검색
Vue.component('sellerManagerModal', sellerManagerModal) // 담당자 관리
Vue.component('contentsModifyModal', contentsModifyModal) // 게시글 수정
Vue.component('contentsReplyModal', contentsReplyModal) // 댓글 등록
Vue.component('contentsReplyModifyModal', contentsReplyModifyModal) // 댓글 수정
Vue.component('appDownloadModal', appDownloadModal) // 앱 다운로드
Vue.component('vbankDepositInfoModal', vbankDepositInfoModal) // 가상계좌 정보
Vue.component('personalInfoPolicyModal', personalInfoPolicyModal) // 개인정보처리방침
Vue.component('eventInfoModal', eventInfoModal) // 이벤트 정보
Vue.component('termOfServiceModal', termOfServiceModal) // 서비스 이용 약관
Vue.component('termsOfService', termsOfService) // 이용약관
Vue.component('termsOfElectronicFinance', termsOfElectronicFinance) // 전자금융거래이용약관
Vue.component('termsOfSeller', termsOfSeller) // 판매자 이용약관
Vue.component('termsOfPrivacy', termsOfPrivacy) // 개인정보 수집 및 이용
Vue.component('termsOfPrivacyOffering', termsOfPrivacyOffering) // 개인정보 제공
Vue.component('termsOfPrivacyPolicy', termsOfPrivacyPolicy) // 개인정보처리방침
Vue.component('termsOfMarketing', termsOfMarketing) // 마케팅 활용 및 광고성 정보 수신 동의
Vue.component('hotdealRegisterModal', hotdealRegisterModal) // 핫딜 등록
Vue.component('wiseSayingRegisterModal', wiseSayingRegisterModal) // 명언 등록

// 전역 함수
// 로그인 체크
Vue.prototype.$checkLogin = function (userVo) {
  if (userVo != null && userVo !== '' && userVo.uid != null && userVo.uid !== '' &&
      ((this.$cookie.get('auth_key') != null && this.$cookie.get('auth_key') !== '') ||
       (localStorage.getItem('auth_key') != null && localStorage.getItem('auth_key') !== ''))) {
    return true
  } else {
    return false
  }
}
// 동영상 주소에 파라미터 추가
Vue.prototype.$setVideoParams = function (videoUrl) {
  if (videoUrl == null || videoUrl === '') {
    return ''
  }
  let prefix = '?' // '?'가 있으면 &로 파라미터 추가, '?'가 없으면 '?'로 파라미터 추가
  if (videoUrl.toString().indexOf('?') !== -1) { // '?'가 있는 경우
    prefix = '&'
  }
  videoUrl += prefix + 'playsinline=1&rel=0&showinfo=0'
  return videoUrl
}

Vue.prototype.$test = function (options) {
  alert('this is test options: ' + options)
}
Vue.prototype.$checkDevice = function () {
  /*
  let pcDevice = 'win16|win32|win64|mac|macintel'
  // 접속한 디바이스 환경
  let thisDevice = navigator.platform
  if (thisDevice) {
    if (pcDevice.indexOf(navigator.platform.toLowerCase()) < 0) {
      return 'MOBILE'
    } else {
      return 'PC'
    }
  }
  */
  // console.log('navigator.userAgent: ' + navigator.userAgent)
  // console.log(JSON.stringify(this.$q.platform))
  // alert(JSON.stringify(this.$q.platform))
  // this.$q.platform.is.cordova // true이면 APP
  // this.$q.platform.is.mobile // true이면 모바일

  // 1. APP android: is.mobile === true && is.android === true && is.cordova === true
  // 2. APP iOS: is.mobile === true && is.ios === true && is.name === 'webkit'
  // 3. Mobile android: is.mobile === true && is.android === true && is.cordova == null
  // 4. Mobile iOS: is.mobile === true && is.ios === true
  // 5. PC: is.desktop === true
  if (this.$q.platform.is.desktop) { // PC인 경우
    // alert('플랫폼 PC')
    return 'P'
  } else { // Mobile 또는 APP
    if (this.$q.platform.is.android && this.$q.platform.is.cordova) { // android APP인 경우
      // alert('안드로이드 앱')
      return 'android'
    } else if (this.$q.platform.is.ios === true && this.$q.platform.is.name === 'webkit') { // iOS APP인 경우
      // alert('아이폰 앱')
      return 'ios'
    } else { // Mobile Web인 경우
      // alert('모바일 웹')
      return 'M'
    }
  }
  /*
  if (navigator.userAgent.indexOf('Mobile') !== -1) {
    return 'M'
  } else {
    return 'P'
  }
  */
}
Vue.prototype.$addComma = function (num) {
  if (num == null || num === undefined || num === '') {
    return ''
  }
  var regexp = /\B(?=(\d{3})+(?!\d))/g
  return num.toString().replace(regexp, ',')
}
Vue.prototype.$formatDate = function (date) {
  if (date == null || date === undefined || date === '') {
    return ''
  } else {
    return date.toString().substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2)
  }
}
Vue.prototype.$showUserHome = function (uid) {
  if (uid == null || uid === undefined || uid === '') {
    console.log('UID IS NULL..')
  } else {
    let serverIp = location.host
    if (this.$q.platform.is.desktop) { // PC인 경우
      window.open('http://' + serverIp + '/#/mystore?uid=' + uid, '_system', 'location=no,width=800,height=900,left=200,top=50,scrollbars=yes,resizable=yes')
    } else {
      window.open('http://' + serverIp + '/#/mystore?uid=' + uid, '_system', 'location=yes,footer=yes')
    }
  }
}
Vue.prototype.$setHtml = function (str) {
  if (str == null || str === undefined || str === '') {
    return ''
  }
  return str.toString().replace(/(?:\r\n|\r|\n)/g, '<br>')
}

/*
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  console.log(response)
  // console.log(response.data)
  if (response.data === 'NO_SESSION') {
    // alert('NO_SESSION')
    routes.push('/') // 로그인 화면으로 이동
  }
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})
*/

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store }/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    // 이동 패스 저장
    if ((store.state.userVo.uid == null || store.state.userVo.uid === '') &&
        to.fullPath !== '/' &&
        to.fullPath !== '/join' &&
        to.fullPath !== '/joinNoLayout' &&
        to.fullPath !== '/findIdPwd' &&
        to.fullPath !== '/findIdPwdNoLayout' &&
        to.fullPath !== '/login' &&
        to.fullPath !== '/loginSellerz' &&
        to.fullPath !== '/loginSellerzNoLayout' &&
        to.path !== '/kakaoLoginCallback' &&
        to.fullPath !== '/mission') {
      VueCookie.set('LOGIN_REDIRECT_URL', to.fullPath, 1)
    }
    if (store.state.ROUTER_IS_MOVE_BACK) {
      store.state.ROUTER_IS_MOVE_BACK = false
    } else {
      store.state.ROUTER_FROM_PATH.push(from.fullPath)
      store.state.ROUTER_TO_PATH.push(to.fullPath)
    }

    /*
    if (from.path !== '/' &&
        from.path !== '/login' &&
        from.path !== '/menu' &&
        from.path !== '') {
      store.state.redirectTo = to.fullPath // 이동할 화면 저장
      // alert(from.path)
    }
    */

    // ■ 자동로그인 처리
    // alert(VueCookie.get('autoLoginRun'))
    // 쿠키 체크
    if (VueCookie.get('uid') != null && // 쿠키에 아이디가 있고
        VueCookie.get('auth_key') != null && // 쿠키에 인증키가 있는데
        (store.state.userVo == null || store.state.userVo.uid == null || store.state.userVo.uid === '')) { // 사용자 정보가 없는 경우
      store.state.userVo.uid = VueCookie.get('uid')
      store.state.userVo.pwd = VueCookie.get('auth_key')
      axios.post(store.state.apiServerIp + '/api/login/doLogin', store.state.userVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // 사용자 정보 설정
          if (result.data.resultCd === 'SUCCESS') {
            store.state.userVo = result.data // 사용자 정보 설정
            // 쿠키에 사용자 정보 저장
            VueCookie.set('uid', store.state.userVo.uid, 14)
            VueCookie.set('auth_key', result.data.auth_key, 14)

            // 판매자 정보 조회
            axios.get(store.state.apiServerIp + '/api/seller/selectSeller')
              .then((result) => {
                // console.log(JSON.stringify(result.data))
                // 판매자 정보 설정
                // 상품 등록시 계좌정보가 없으면 등록필요 알림
                store.state.sellerVo = result.data
                // this.$store.state.sellerVo.from_post_no = result.data.from_post_no
                // this.$store.state.sellerVo.deposit_account_no = result.data.deposit_account_no
              })
              .catch((err) => {
                console.log(err)
              })

            // 리다이렉트 화면이 있으면 이동, 없으면 메인으로 이동
            // console.log('this.$store.state.redirectTo: ' + this.$store.state.redirectTo)
            if (store.state.redirectTo !== '') {
              // router.push(this.$store.state.redirectTo)
              let redirectPath = store.state.redirectTo
              store.state.redirectTo = '' // 리다이렉트 화면 초기화
              return next(redirectPath)
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    /*
    // 로그인 정보가 없을 경우 로그인 화면으로 이동
    if (to.path !== '/' && // 메인 화면 (현재는 메뉴 화면)
        to.path !== '/login' && // 로그인 화면
        to.path !== '/mystore' && // 마이스토어
        to.path !== '/join' && // 회원가입
        to.path !== '/findIdPwd' && // 아이디/비밀번호 찾기
        to.path !== '/payment/popupPayPc' && // PC팝업결제
        // to.path !== '/productDetail' && // 상품상세 (현재 APP에서 구매하기 버튼 클릭시 www.metashopse.com으로 이동중) -> /link/product?seq= 으로 변경
        to.path.indexOf('/link/') === -1) { // 공유(컨텐츠, 상품, 모임, 멤버) 화면
      // console.log('■■■■■■■■■■ route to: ' + to.fullPath)
      // console.log('■■■■■■■■■■ store.state.userVo: ' + JSON.stringify(store.state.userVo))
      // console.log('■■■■■■■■■■ store.state.userVo.uid: ' + store.state.userVo.uid)
      // console.log('■■■■■■■■■■ from.path: ' + from.path)
      if (store.state.userVo == null || store.state.userVo === '' || store.state.userVo.uid == null || store.state.userVo.uid === '') {
        if (from.path !== '/') {
          store.state.redirectTo = to.fullPath // 이동할 화면 저장
        }
        // console.log('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ route to: ' + to.path)
        // console.log('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ route to: ' + JSON.stringify(to))
        return next(this.$store.state.PAGE_LOGIN) // 로그인 화면으로 이동
      }
    }
    */

    /*
    console.log('to.fullPath: ' + to.fullPath)
    console.log('to.name: ' + to.name)
    console.log('to.path: ' + to.path)
    console.log('to.params: ' + to.params)
    */
    // 하단 탭 비표시 하는 화면들
    // 컨텐츠 상세 화면
    // 모임 정보 화면
    if (to.path === '/contents/contentsDetail' || // 컨텐츠 상세
        to.path === '/link/contents' || // 링크 컨텐츠 상세
        to.path === '/link/product' || // 링크 상품상세
        to.path === '/productDetail' || // 상품 상세
        to.path === '/seller/product/productDetail' || // 판매자 상품 상세
        to.path === '/menu/hotdealRegister' || // 핫딜 신청
        to.path === '/menu/cartProductList' || // 장바구니 상품 리스트
        to.path === '/menu/sellerProductDetail') { // 판매자 상품 상세
      store.state.layoutTabVisible = false
      store.state.playerOffsetVert = 53
    } else if (to.path === '/seller/product/productRegister' || // 상품 등록
        to.path === '/seller/product/productModify') { // 상품 수정
      store.state.layoutTabVisible = false
      store.state.playerOffsetVert = 5
    } else {
      store.state.layoutTabVisible = true
      store.state.playerOffsetVert = 5
    }
    /*
    if (to.meta) {
      store.commit('updatePageMeta', to.meta)
    }
    */

    next()
  })
  // Router.beforeEach((to, from, next) => {
  //   // let cookieId = VueCookie.get('id')
  //   // console.log('requireAuth from: ' + from)
  //   // console.log('requireAuth to: ' + to)
  //   // console.log('requireAuth next: ' + next)
  //   // if (cookieId === null || cookieId === '') {
  //   //   return next('/') // 로그인 화면으로 이동
  //   // } else {
  //   //   next() // 페이지 이동
  //   // }
  //   alert(from.link)
  //   VueCookie.set('REDIRECT_TARGET_URI', '')
  //   // return next('/') // 로그인 화면으로 이동
  // })

  return Router
}
