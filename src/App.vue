<template>
  <div id="q-app">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
      :duration="500"
      @leave="resetScroll"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'App',
  created: function () {
    // this.$q.addressbarColor.set()
    /*
    if (this.$store.state.device === 'P' || this.$store.state.device === 'M') {
      this.$store.state.apiServerIp = ''
    }
    */
    // 카카오 API 스트립트 로드
    this.$loadScript('//developers.kakao.com/sdk/js/kakao.min.js')
      .then(() => {
        // Script is loaded, do something
        // 사용할 앱의 JavaScript 키를 설정해 주세요.
        window.Kakao.init(this.$store.state.KAKAO_API_JS_KEY)
        this.$store.state.Kakao = window.Kakao
      })
      .catch(() => {
        // Failed to fetch script
        console.log('kakao loadScript failed.')
      })
    /*
    this.$loadScript('//developers.kakao.com/sdk/js/kakao.min.js')
      .then(() => {
        // Script is loaded, do something
        // 사용할 앱의 JavaScript 키를 설정해 주세요.
        window.Kakao.init(this.$store.state.KAKAO_API_JS_KEY)
      })
      .catch(() => {
        // Failed to fetch script
      })
    */
    // 새로고침(F5) 리로드 처리
    // ■ 디바이스 체크 (P:PC M:Mobile)
    this.$store.state.device = Vue.prototype.$checkDevice()
    console.log('■■■■■■■ This device: ' + this.$store.state.device)
    /*
    if (this.$store.state.device === 'P') {
      this.$store.state.widthRate = 50
    } else {
      this.$store.state.widthRate = 100
    }
    */
    /*
    // ■ 자동로그인 처리
    if (this.$cookie.get('autoLoginRun') === 'true' && this.$cookie.get('uid') != null && this.$cookie.get('auth_key') != null) {
      this.$store.state.userVo.uid = this.$cookie.get('uid')
      this.$store.state.userVo.pwd = this.$cookie.get('auth_key')
      this.$axios.post(this.$store.state.apiServerIp + '/api/login/doLogin', this.$store.state.userVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // 사용자 정보 설정
          if (result.data.resultCd === 'SUCCESS') {
            this.$store.state.userVo = result.data // 사용자 정보 설정
            // 쿠키에 사용자 정보 저장
            this.$cookie.set('uid', this.$store.state.userVo.uid, 14)
            this.$cookie.set('auth_key', result.data.auth_key, 14)

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

            // 리다이렉트 화면이 있으면 이동, 없으면 메인으로 이동
            // console.log('this.$store.state.redirectTo: ' + this.$store.state.redirectTo)
            if (this.$store.state.redirectTo !== ''
            // this.$store.state.redirectTo !== '/' &&
            // this.$store.state.redirectTo !== '/login'
            ) {
              // alert('리다이렉트URL: ' + this.$store.state.redirectTo)
              // this.$router.push(this.$store.state.redirectTo) // 이거 먼가 동작이 이상함
              this.$router.push('/menu')
              this.$store.state.redirectTo = '' // 리다이렉트 화면 초기화
            }
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    }
    */

    if (this.$store.state.userVo != null && this.$store.state.userVo.uid != null && this.$store.state.userVo.uid !== '') {
      // ■ 사용자 정보 재조회 (새로고침시 스토어 내용이 모두 초기화 되기 때문에)
      this.$axios.post(this.$store.state.apiServerIp + '/api/user/reload', this.$store.state.userVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // 사용자 정보 설정
          if (result.data.resultCd === 'SUCCESS') {
            this.$store.state.userVo = result.data // 사용자 정보 설정

            /*
            // 카트 상품 수 조회
            this.$axios.get(this.$store.state.apiServerIp + '/api/cart/selectCartCount')
              .then((result) => {
                // console.log(JSON.stringify(result.data))
                // 카트 상품 수 설정
                this.$store.state.cartCount = result.data
              })
              .catch((err) => {
                console.log(err)
              })
            */

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

            /*
            // 찜 상품 수 조회
            this.$axios.get(this.$store.state.apiServerIp + '/api/favorite/selectFavoriteCount')
              .then((result) => {
                // console.log(JSON.stringify(result.data))
                // 찜 상품 수 설정
                this.$store.state.favoriteCount = result.data
              })
              .catch((err) => {
                console.log(err)
              })
            */
          }
        })
        .catch((err) => {
          console.log(err)
        })

      /* 해외배송이랑 섞여있어서 일단 보류. 고정치로 사용(store index.js)
      // 택배사 리스트 조회 - sweettracker API
      this.$axios.get('http://info.sweettracker.co.kr/api/v1/companylist',
        {params: {t_key: this.$store.state.deliveryApiKey}})
        .then((result) => {
          console.log(JSON.stringify(result.data))
          let deliveryList = [] // 택배사 옵션 리스트
          if (result.data.Company != null && result.data.Company !== '') {
            // 택배사 옵션 리스트 내용 설정
            for (let i = 0; i < result.data.Company.length; i++) {
              const deliveryCorp = result.data.Company[i]
              let deliveryCorpInfo = {} // 택배사 정보
              deliveryCorpInfo.label = deliveryCorp.Name // 택배사 명
              deliveryCorpInfo.value = deliveryCorp.Code // 택배사 코드(숫자)
              deliveryList.push(deliveryCorpInfo) // 택배사 추가

              // let deliveryCorpCd = deliveryCorp.Code
              // let deliveryCorpName = deliveryCorp.Name
              // console.log('deliveryCorpCd: ' + deliveryCorpCd + ' deliveryCorpName: ' + deliveryCorpName)
            }
          }
          // 택배사 리스트 설정
          if (deliveryList.length > 0) {
            this.$store.state.deliveryCorpCdOptions = deliveryList
          }
        })
        .catch((err) => {
          console.log(err)
        })
      */
    }
  },
  methods: {
    resetScroll (el, done) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      done()
    }
  }
}
</script>

<style>
body {
  overscroll-behavior: contain
}
</style>
