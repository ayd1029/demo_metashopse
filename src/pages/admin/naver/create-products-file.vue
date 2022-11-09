<template>
  <q-page class="flex flex-center">

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>관리자 - 상품데이터 파일 생성</q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <div style="width: 100%;">
      <table align="center" border="0" width="85%">
        <tr>
          <td align="center" colspan="2">
            <q-btn @click="createProductsFile" size="md" color="black" outline :style="`width:${btnWidth}%; height:48px;`">
              <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="vertical-align:middle"><font size="3" color="black">products.txt 생성</font></td>
                </tr>
              </table>
            </q-btn>
          </td>
        </tr>
      </table>
    </div>
  </q-page>
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
      btnWidth: 100
    }
  },
  created: function () {
    if (this.$store.state.device === 'P') {
      this.btnWidth = 50 // PC버전 버튼 너비 50%
    }
  },
  methods: {
    // 상품데이터 파일 생성
    createProductsFile () {
      this.$q.loading.show() // 로딩 표시 시작
      this.$axios.get(this.$store.state.apiServerIp + '/api/naver/createNaverShoppingProductsFile')
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료

          // 처리 결과 메세지 표시
          if (result.data === 'SUCCESS') {
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: '짝짝짝. 상품데이터 파일 생성 완료',
              icon: 'notifications_active'
            })
          } else {
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: '파일 생성 실패 : ' + result.data,
              icon: 'notifications_active'
            })
          }
        })
        .catch((err) => {
          console.log(err)
          this.$q.loading.hide() // 로딩 표시 종료
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '파일 생성 오류 catch',
            icon: 'notifications_active'
          })
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
