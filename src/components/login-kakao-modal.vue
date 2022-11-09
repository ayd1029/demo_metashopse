<template>
  <q-modal v-model="loginKakaoModal" :content-css="{minWidth: '50vw', minHeight: '50vh'}">
    <q-modal-layout>
      <iframe :src="redirectUrl" style="width:100%; height:100%" frameborder="0"></iframe>
    </q-modal-layout>
  </q-modal>
</template>

<style>
</style>

<script>

export default {
  // name: 'mystore',
  data () {
    return {
      // responseData: '',
      redirectUrl: '', // 카카오에 로그인을 위해 인증URL을 설정함
      loginKakaoModal: false
    }
  },
  methods: {
    show () {
      /*
      // 콜백 스크립트 로드 - 스크립트 변수에 토큰 담아놓고 함수 호출, 토큰 DB에 저장
      this.$loadScript('statics/js/callback.js')
        .then(() => {
          // Script is loaded, do something
          window.vm = this // callback.js 의 vm 변수에 this 를 설정, 콜백에서 사용
        })
        .catch(() => {
          // Failed to fetch script
        })
      */
      this.loginKakaoModal = true
      /*
      let kakaoHostUrl = this.$store.state.KAKAO_HOST + '/oauth/authorize'
      kakaoHostUrl += '?client_id=' + this.$store.state.KAKAO_API_REST_KEY
      kakaoHostUrl += '&redirect_uri=' + this.$store.state.KAKAO_REDIRECT_URI
      kakaoHostUrl += '&response_type=code'
      console.log(kakaoHostUrl)
      this.$axios.get(kakaoHostUrl)
        .then((result) => {
          console.log(JSON.stringify(result.data))
          // 카카오에서 로그인 화면 소스를 보내거나 아니면 REST 서버에서 처리결과가 온다.
          this.responseData = result.data
        })
        .catch((err) => {
          console.log(err)
        })
      */
    },
    /*
    // 카카오 로그인 콜백(callback.js에서 호출)
    kakaoLoginCallback (uid, authKey) {
      // 쿠키에 사용자 정보 저장
      this.$cookie.set('autoLoginCheck', this.autoLoginCheck, 365)
      this.$cookie.set('autoLoginRun', this.autoLoginCheck, 365)

      // 로그인
      let userVo = {}
      userVo.uid = uid
      userVo.pwd = authKey
      this.$axios.post(this.$store.state.apiServerIp + '/api/login/doLogin', userVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // 사용자 정보 설정
          this.$store.state.userVo = result.data // 사용자 정보 설정

          // 부모창의 콜백함수 호출
          this.$emit('callback-login', this.$store.state.userVo.uid)

          // 쿠키에 사용자 정보 저장
          this.$cookie.set('uid', this.$store.state.userVo.uid, 365)
          this.$cookie.set('auth_key', result.data.auth_key, 365)

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
              // this.$store.state.sellerVo.from_post_no = result.data.from_post_no
              // this.$store.state.sellerVo.deposit_account_no = result.data.deposit_account_no
            })
            .catch((err) => {
              console.log('★★4 ' + err)
            })

          // 로그인 창 닫기
          this.loginModal = false
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log('★★5 ' + err)
        })

      // this.$q.loading.hide() // 로딩중 표시 종료
      this.$router.push('/menu') // 메인으로 이동

      // 카카오 모달 닫기
      this.$refs.loginKakaoModal = false
    },
    */
    close () {
      this.loginKakaoModal = false
    }
  }
}
</script>
