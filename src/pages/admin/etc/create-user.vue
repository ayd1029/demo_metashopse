<template>
  <q-page class="">
    <q-layout-header v-if="$store.state.device !== 'android'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="how_to_reg" />
        <q-toolbar-title>관리자 회원가입</q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <div class="no_refresh" style="width: 100%" >
      <input type="hidden" v-model="userVo.ucode" value="2" />
      <table width="85%" align="center">
        <tr>
          <td>
            <q-toolbar v-if="$store.state.device === 'android'" color="black" inverted>
              <q-btn flat round dense icon="how_to_reg" />
              <q-toolbar-title>관리자 회원가입</q-toolbar-title>
            </q-toolbar>
            <q-btn color="primary" @click="insertUser" icon="done" label="가입" style="width: 100%; height:50px" :loading="loading" :percentage="percentage">
              <span slot="loading">
                <q-spinner-oval class="on-left" />
                가입중...
              </span>
            </q-btn>
            <br>
            <q-input v-model.trim="userVo.name" ref="name" float-label="성명" placeholder="" maxlength="6" @keyup="keyup" />
            <br>
            <q-input v-model.trim="userVo.uid" float-label="아이디" placeholder="" maxlength="20" clearable />
            <br>
            <q-input v-model.trim="userVo.pwd" float-label="비밀번호" type="password" placeholder="" no-pass-toggle />
            <br>
            <q-input v-model.trim="userVo.pwd2" float-label="비밀번호 확인" type="password" placeholder="" no-pass-toggle />
            <br>
            <q-input v-model.trim="userVo.mobile_no" float-label="휴대폰번호" type="number" placeholder="예) 01012345678" />
            <br>
            <q-input v-model.trim="userVo.email" float-label="이메일" maxlength="100" />
            <br>
            <br>
            <q-btn outline color="grey" @click="goBack" icon="fast_rewind" label="돌아가기" style="width: 100%; height:50px" />
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
      </table>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  // name: 'Product',
  components: {
  },
  data () {
    return {
      userVo: {
        uid: '',
        pwd: '1',
        pwd2: '1',
        name: '',
        ucode: '2',
        mobile_no: '01093941941',
        email: 'ayd1029@gmail.com',
        push_agree_yn: 'Y'
      },
      loading: false,
      percentage: 0
    }
  },
  created: function () {
    // 등록할 사용자 아이디 조회
    this.selectNewUid()
  },
  mounted: function () {
    // 성명 포커싱
    this.$refs.name.focus()
  },
  methods: {
    keyup (event) {
      // console.log(event.key)
      if (event.key === 'Enter') {
        this.insertUser()
      }
    },
    // MAX(uid) + 1 조회 - ID가 숫자 9자리인거 중에서만.
    selectNewUid () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/admin/etc/selectNewUid')
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.userVo.uid = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    insertUser () {
      // 정합성 체크
      if (this.userVo.uid === '') { // 아이디 입력
        this.$q.notify({
          color: 'primary',
          position: 'bottom',
          message: '아이디를 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.userVo.pwd === '') { // 비밀번호 입력
        this.$q.notify({
          color: 'primary',
          position: 'bottom',
          message: '비밀번호를 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.userVo.pwd2 === '') { // 비밀번호 확인 입력
        this.$q.notify({
          color: 'primary',
          position: 'bottom',
          message: '비밀번호 확인을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.userVo.name === '') { // 성명 입력
        this.$q.notify({
          color: 'primary',
          position: 'bottom',
          message: '성명을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.userVo.mobile_no === '') { // 휴대폰번호 입력
        this.$q.notify({
          color: 'primary',
          position: 'bottom',
          message: '휴대폰번호를 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.userVo.email === '') { // 이메일 입력
        this.$q.notify({
          color: 'primary',
          position: 'bottom',
          message: '이메일을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.userVo.email.indexOf('@') < 0 || this.userVo.email.indexOf('.') < 0) { // 이메일 형식
        this.$q.notify({
          color: 'primary',
          position: 'bottom',
          message: '이메일을 정확히 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.userVo.pwd !== this.userVo.pwd2) { // 비밀번호 !== 비밀번호 확인
        this.$q.notify({
          color: 'primary',
          position: 'bottom',
          message: '비밀번호를 확인해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      // 회원가입
      this.loading = true
      this.$axios.post(this.$store.state.apiServerIp + '/api/user/insertUser', this.userVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))

          if (result.data.resultCd === 'SUCCESS') { // 회원가입 성공
            this.$q.notify({
              color: 'blue',
              position: 'bottom',
              message: '회원가입 완료! 축하합니다!',
              icon: 'notifications_active'
            })
            // 등록할 사용자 아이디 조회
            this.selectNewUid()
            // 성명 초기화
            this.userVo.name = ''
            // 성명 포커싱
            this.$refs.name.focus()
          } else { // 회원가입 실패
            this.$q.notify({
              color: 'blue',
              position: 'bottom',
              message: result.data.resultMsg,
              icon: 'notifications_active'
            })
          }
          // 로딩효과 중지
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
