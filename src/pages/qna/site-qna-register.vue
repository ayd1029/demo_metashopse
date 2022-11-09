<template>
  <q-page class="">

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>고객센터</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
      </q-toolbar>
    </q-layout-header>

    <div class="no_refresh" style="width: 100%" >
      <br>
      <table width="95%" align="center" border="0">
        <tr>
          <td>
            <q-input v-model.trim="qnaVo.question" stack-label="문의/제안 내용" color="white" inverted-light type="textarea" rows="5" :readonly="updateMode" />
            <br>
            <div v-if="qnaVo.uid_to !== '' && $store.state.userVo.uid === siteQnaManagerId">
              <q-input v-model.trim="qnaVo.answer" stack-label="답변내용" color="white" inverted-light type="textarea" rows="5" />
              <br>
            </div>
            <br>
            <div class="flex flex-center">
              <q-btn icon="send" :loading="loading" :percentage="percentage" color="primary" @click="checkForm" style="width:100%; height:50px;">
                &nbsp;&nbsp;&nbsp;&nbsp;등록하기
                <span slot="loading">
                  <q-spinner-oval class="on-left" />
                  등록중...&nbsp;&nbsp;&nbsp;
                </span>
              </q-btn>
              <br>
            </div>
            <!-- <font size="1" color="grey">※ 주민번호, 전화번호, 이메일 등 개인정보를 남기면 타인에 의해 도용될 수 있습니다. 개인정보는 상품문의에 남기지 말아주세요.</font> -->
          </td>
        </tr>
      </table>

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
import Vue from 'vue'

export default {
  name: 'qna-register',
  data () {
    return {
      uid: '',
      siteQnaManagerId: 'dcoqna', // 사이트 문의 담당자 아이디
      updateMode: false, // true:답변모드, false:질문모드
      loading: false,
      percentage: 0,
      qnaVo: {
        seq: '',
        qna_cd: 'SITE',
        qna_type: null,
        uid_to: this.siteQnaManagerId,
        seq_product: null,
        product_option: '',
        question: '',
        answer: '',
        image_url: null, // 사진URL
        seq_file_mst: null, // 파일(사진) 마스터 시컨스
        question_name: this.$store.state.userVo.name,
        reg_id: this.$store.state.userVo.uid
      },
      targetFiles: [],
      targetFilesNewName: [],
      numOfTargetFiles: 0,
      seqFileMst: '' // 파일 마스터 SEQ
    }
  },
  created: function () {
    // 로그인 체크
    if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
      this.$router.push(this.$store.state.PAGE_LOGIN)
      return
    }
    if (this.$route.query.seq_qna != null) {
      // 답변모드 설정
      this.updateMode = true

      // Q&A 조회
      this.$q.loading.show() // 로딩 표시 시작
      this.$axios.get(this.$store.state.apiServerIp + '/api/qna/selectQna', {params: {seq: this.$route.query.seq_qna, uid_to: this.siteQnaManagerId}})
        .then((result) => {
          this.$q.loading.hide() // 로딩 표시 종료
          // console.log(JSON.stringify(result.data))
          // Q&A 설정
          this.qnaVo = result.data
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
        })
    }
  },
  methods: {
    checkForm () { // 상품 등록 전 정합성 체크
      if (!this.updateMode) { // 질문모드일 경우
        if (this.qnaVo.question === '') {
          this.$q.notify({
            color: 'blue',
            position: 'left',
            message: '문의내용을 입력해주세요.',
            icon: 'notifications_active'
          })
          return
        }
      } else { // 답변모드일 경우
        if (this.qnaVo.answer === '') {
          this.$q.notify({
            color: 'blue',
            position: 'left',
            message: '답변내용을 입력해주세요.',
            icon: 'notifications_active'
          })
          return
        }
      }
      // 처리 시작
      this.saveQna()
    },
    // 등록 또는 수정
    saveQna () {
      this.loading = true

      if (!this.updateMode) { // 등록모드
        // Q&A 등록
        this.$axios.post(this.$store.state.apiServerIp + '/api/qna/insertSiteQna', this.qnaVo)
          .then((result) => {
            this.loading = false // 등록 버튼 액션 중단
            this.$q.notify({
              color: 'blue',
              position: 'left',
              message: '등록되었습니다.',
              icon: 'notifications_active'
            })
            this.$router.push('/menu/myQnaList') // 나의문의사항
          })
          .catch((err) => {
            console.log(err)
            // this.$q.notify(err)
            this.loading = false // 등록 버튼 액션 중단
            this.$q.notify({
              color: 'blue',
              position: 'left',
              message: '등록에 실패했습니다. 다시 등록해주세요.',
              icon: 'notifications_active'
            })
          })
      } else { // 수정모드
        // Q&A 수정
        this.qnaVo.answer_name = this.$store.state.userVo.name
        this.$axios.post(this.$store.state.apiServerIp + '/api/qna/updateSiteQna', this.qnaVo)
          .then((result) => {
            this.loading = false // 등록 버튼 액션 중단
            this.$q.notify({
              color: 'blue',
              position: 'left',
              message: '저장되었습니다.',
              icon: 'notifications_active'
            })
            this.$router.push('/menu/siteQnaList') // 사이트 문의사항 리스트
          })
          .catch((err) => {
            console.log(err)
            // this.$q.notify(err)
            this.loading = false // 등록 버튼 액션 중단
            this.$q.notify({
              color: 'blue',
              position: 'left',
              message: '등록에 실패했습니다. 다시 등록해주세요.',
              icon: 'notifications_active'
            })
          })
      }
    },
    goBack () {
      if (!this.updateMode) { // 등록모드
        if (this.qnaVo.question !== '' || this.qnaVo.question !== '') {
          this.$q.dialog({
            title: '돌아가기',
            message: '입력 항목이 초기화됩니다.',
            ok: true,
            cancel: true
          }).then(() => {
            // 라우터 백 패스 설정
            let path = this.$store.state.ROUTER_FROM_PATH[this.$store.state.ROUTER_FROM_PATH.length - 1]
            // 라우터 백 패스 1개 삭제
            this.$store.state.ROUTER_FROM_PATH.splice(this.$store.state.ROUTER_FROM_PATH.length - 1, 1)
            // 뒤로가기 여부 - true일 경우 라우터 패스를 저장 안함, goBack() 함수 내에서 true로 설정, 라우터에서 false로 초기화
            this.$store.state.ROUTER_IS_MOVE_BACK = true
            // 라우터 백 패스로 이동
            this.$router.push(path)
          }).catch(() => {
            // this.$router.go(-1)
            // this.$q.notify(`조심해라..`)
          })
        } else {
          // 라우터 백 패스 설정
          let path = this.$store.state.ROUTER_FROM_PATH[this.$store.state.ROUTER_FROM_PATH.length - 1]
          // 라우터 백 패스 1개 삭제
          this.$store.state.ROUTER_FROM_PATH.splice(this.$store.state.ROUTER_FROM_PATH.length - 1, 1)
          // 뒤로가기 여부 - true일 경우 라우터 패스를 저장 안함, goBack() 함수 내에서 true로 설정, 라우터에서 false로 초기화
          this.$store.state.ROUTER_IS_MOVE_BACK = true
          // 라우터 백 패스로 이동
          this.$router.push(path)
        }
      } else { // 수정모드
        if (this.qnaVo.answer !== '' || this.qnaVo.answer !== '') {
          this.$q.dialog({
            title: '돌아가기',
            message: '이전화면으로 돌아갈까요?',
            ok: true,
            cancel: true
          }).then(() => {
            // 라우터 백 패스 설정
            let path = this.$store.state.ROUTER_FROM_PATH[this.$store.state.ROUTER_FROM_PATH.length - 1]
            // 라우터 백 패스 1개 삭제
            this.$store.state.ROUTER_FROM_PATH.splice(this.$store.state.ROUTER_FROM_PATH.length - 1, 1)
            // 뒤로가기 여부 - true일 경우 라우터 패스를 저장 안함, goBack() 함수 내에서 true로 설정, 라우터에서 false로 초기화
            this.$store.state.ROUTER_IS_MOVE_BACK = true
            // 라우터 백 패스로 이동
            this.$router.push(path)
          }).catch(() => {
            // this.$router.go(-1)
            // this.$q.notify(`조심해라..`)
          })
        } else {
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
  }
}
</script>
<style>
</style>
