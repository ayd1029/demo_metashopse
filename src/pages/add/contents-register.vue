<template>
  <q-page class="flex flex-center">

    <q-layout-header>
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="add_circle_outline" />
        <q-toolbar-title>스토리 등록</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
      </q-toolbar>
    </q-layout-header>

    <div class="no_refresh" style="width: 100%" >
      <br>
      <table width="90%" align="center">
        <tr>
          <td>
            <q-uploader
              stack-label="사진"
              ref="uploaderObj"
              multiple
              url="/api/common/uploadFile"
              auto-expand
              hide-upload-button
              :filter="filterFiles"
              @add="fileAdded"
              @remove:cancel="fileCanceled"
              @uploaded="fileUploaded"
              :additional-fields="[{name: 'seqFileMst', value: this.seqFileMst}]"
            />
            <br>
            <q-input id="videoUrlOriginal" v-model.trim="contentsVo.video_url_original" stack-label="유튜브 동영상 주소" color="white" inverted-light />
            <input type="hidden" v-model="contentsVo.video_cd">
            <input type="hidden" v-model="contentsVo.video_url">
            <!-- <font size="1" color="grey">※ </font><font size="1" color="red">YouTube</font><font size="1" color="grey"> 링크만 등록해주세요.</font><br> -->
            <font size="1" color="grey">※ 링크만 입력하면 </font><font size="1" color="black">제목과 내용은 자동으로 등록됩니다.</font>
            <!-- <q-btn dense icon="send" color="primary" @click="pasteClipboard" style="height:35px; width:35px;" /> -->
            <br>
            <br>
            <q-input v-model.trim="contentsVo.title" stack-label="제목" color="primary" />
            <br>
            <q-input v-model.trim="contentsVo.contents" stack-label="내용" color="primary" type="textarea" rows="2" />
            <br>
            <!--
              이용약관에 콘텐츠 정책 포함시켜야 함.
            <font size="1" color="grey">메타샵스(metashopse.com)의 <a @click="showTerms(1)" style="text-decoration: underline">콘텐츠 정책</a> 내용을 확인 하였으며, 동의합니다.</font>
            <br>
            <div id="termsDiv" v-html="terms" style="width: 100%; height: 150px; overflow-y: scroll; display:none;"></div>
            -->
            <br>
            <div class="flex flex-center">
              <!-- <q-btn glossy color="deep-orange" icon="fast_rewind" label="돌아가기" to='/product/productList' /> -->
              <q-btn icon="done" :loading="loading" :percentage="percentage" color="primary" @click="checkForm" style="width:100%; height:50px;">
                &nbsp;&nbsp;&nbsp;&nbsp;등록하기
                <span slot="loading">
                  <q-spinner-oval class="on-left" />
                  등록중...&nbsp;&nbsp;&nbsp;
                </span>
              </q-btn>
              <br>
            </div>
            <font size="1" color="red">※ 사진 또는 동영상 주소만 입력해도 등록할 수 있어요~</font>
          </td>
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
      <br>&nbsp;
    </div>

  </q-page>
</template>

<style>
</style>

<script>
import Vue from 'vue'

export default {
  name: 'contents-register',
  data () {
    return {
      uid: this.$route.query.uid,
      loading: false,
      percentage: 0,
      contentsVo: {
        seq: '',
        title: '',
        contents: '',
        seq_file_mst: '', // 파일(사진) 마스터 시컨스
        image_url: '', // 사진URL
        video_cd: 'youtube',
        video_url_original: '',
        video_url: '',
        reg_id: '',
        targetFilesNewName: [] // 등록시 사용할 파일 리스트
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
    // 파일 마스터 seq 취득
    this.$axios({
      url: this.$store.state.apiServerIp + '/api/common/insertFileMst',
      method: 'GET' })
      .then((result) => {
        this.seqFileMst = result.data // 파일 마스터 SEQ 설정
        console.log('this.seqFileMst: ' + this.seqFileMst)
      })
      .catch((err) => {
        console.log(err)
        // this.$q.notify(err)
      })
  },
  methods: {
    /*
    showTerms (cd) { // 이용약관 표시
      let selectedTerm = ''
      if (cd === 1) {
        selectedTerm = this.term1
      } else if (cd === 2) {
        selectedTerm = this.term2
      } else if (cd === 3) {
        selectedTerm = this.term3
      }
      this.terms = '<font size="1" color="grey">' + selectedTerm + '</font>'

      // 보이기/감추기
      if (this.selectedTerm === cd) {
        if (this.termShow) {
          document.getElementById('termsDiv').style.display = 'none'
          this.termShow = false
        } else {
          document.getElementById('termsDiv').style.display = 'block'
          this.termShow = true
        }
      } else {
        document.getElementById('termsDiv').style.display = 'block'
        this.termShow = true
      }
      this.selectedTerm = cd
    },
    */
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData()
      formData.append('file', file)

      this.$axios({
        url: this.$store.state.apiServerIp + '/api/common/uploadImage',
        method: 'POST',
        data: formData
      })
        .then((result) => {
          let url = result.data // Get url from response
          console.log('ImageURL : ' + url)
          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    filterFiles (files) {
      const MAX_FILE_SIZE = this.$store.state.UPLOAD_FILE_SIZE_LIMIT * 1024 * 1024 // = 4M
      // returns an Array containing allowed files
      return files.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          this.$q.notify({
            color: 'blue',
            position: 'left',
            message: '사이즈는 5MB 까지!',
            icon: 'notifications_active'
          })
        }
        return file.size <= MAX_FILE_SIZE
      })
    },
    fileAdded (files) {
      // 파일이 추가되었을 때
      for (let i = 0; i < files.length; i++) {
        // console.log(files[0].size)
        let file = files[i]
        this.targetFiles.push(file.name)
      }
      console.log(this.targetFiles)
    },
    fileCanceled (file) {
      // 파일이 취소되었을 때
      console.log(file.name)
      this.targetFiles = this.arrayRemove(this.targetFiles, file.name)
      console.log(this.targetFiles)
    },
    arrayRemove (arr, value) {
      // 배열에서 value를 삭제한다
      return arr.filter(function (ele) {
        return ele !== value
      })
    },
    checkForm () { // 컨텐츠 등록 전 정합성 체크
      // console.log('업로드 대상 파일 갯수: ' + this.targetFiles.length)
      if (this.targetFiles.length < 1 && this.contentsVo.video_url_original === '') {
        // 파일 1개 이상인지 체크
        this.$q.notify({
          color: 'blue',
          position: 'left',
          message: '사진 또는 동영상 주소를 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      /*
      if (this.contentsVo.title === '') {
        // 제목 입력 체크
        this.$q.notify({
          color: 'blue',
          position: 'left',
          message: '제목을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      */

      // 동영상 링크 설정
      let originalVideoUrl = this.contentsVo.video_url_original
      if (originalVideoUrl !== '') {
        originalVideoUrl = originalVideoUrl.toString()
        if (originalVideoUrl.indexOf('youtube') > 0 || originalVideoUrl.indexOf('youtu.be') > 0) { // youtube인 경우
          // 'watch?v=' 제거
          originalVideoUrl = originalVideoUrl.replace('watch?v=', '')

          let arrUrl = originalVideoUrl.split('/')
          this.contentsVo.video_url = 'https://www.youtube.com/embed/' + arrUrl[arrUrl.length - 1]
          this.contentsVo.video_cd = 'youtube'
        /* 유튜브 외 링크는 일단 제외함.
        } else if (originalVideoUrl.indexOf('buzzvideo') > 0) { // buzzvideo인 경우
          let arrUrl = originalVideoUrl.split(' http://')
          this.contentsVo.video_url = 'https://' + arrUrl[arrUrl.length - 1]
          this.contentsVo.video_cd = 'buzzvideo'
          // 제목을 컨텐츠 하단에 포함
          if (this.contentsVo.title === '') {
            this.contentsVo.title = arrUrl[0]
          }
        } else if (originalVideoUrl.indexOf('tiktok') > 0) { // tiktok인 경우
          this.contentsVo.video_url = originalVideoUrl
          this.contentsVo.video_cd = 'tiktok'
        */
        } else {
          // this.contentsVo.video_url = originalVideoUrl
          // this.contentsVo.video_cd = 'etc'
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '유튜브 동영상 주소를 등록해주세요.',
            icon: 'notifications_active'
          })
          return
        }
      } else {
        this.contentsVo.video_url = null
        this.contentsVo.video_cd = null
      }

      // 등록 처리 시작
      if (this.targetFiles.length < 1 && this.contentsVo.video_url_original !== '') { // 동영상 URL만 등록하는 경우
        this.insertContents()
      } else {
        this.uploadFiles()
      }
    },
    uploadFiles () {
      // 등록 시작
      this.loading = true
      this.percentage = 0
      // 파일 업로드 시작
      // 업로드 완료시 화면 이동 (fileUploaded에서)
      this.$refs.uploaderObj.upload()
    },
    fileUploaded (file, xhr) {
      // 이미지 업로드가 완료되면 이미지별로 각각 호출되는 메소드
      // let fileName = file.name
      // let fileSize = file.size
      // let fileType = file.type
      let fileNameNew = file.xhr.responseText
      for (let i = 0; i < this.targetFiles.length; i++) {
        if (this.targetFiles[i] === file.name) {
          this.targetFilesNewName[i] = fileNameNew
          break
        }
      }
      this.numOfTargetFiles++
      if (this.numOfTargetFiles === this.targetFiles.length) {
        // 업로드 전체 완료시 컨텐츠 등록
        this.insertContents()
      }
    },
    insertContents () {
      this.loading = true

      // 파일 마스터 시컨스 설정
      if (this.targetFilesNewName != null && this.targetFilesNewName !== '' && this.targetFilesNewName.length > 0) {
        this.contentsVo.seq_file_mst = this.seqFileMst
      } else {
        this.contentsVo.seq_file_mst = null
      }
      this.contentsVo.image_url = this.targetFilesNewName[0] // 대표 이미지 설정
      this.contentsVo.targetFilesNewName = this.targetFilesNewName // 백엔드에서 이미지 정렬을 위해 넘기는 배열

      // 컨텐츠 등록
      this.$axios({
        url: this.$store.state.apiServerIp + '/api/contents/insertContents',
        method: 'POST',
        data: this.contentsVo })
        .then((result) => {
          this.loading = false // 등록 버튼 액션 중단
          this.$q.notify({
            color: 'blue',
            position: 'top',
            message: '스토리가 등록되었습니다.',
            icon: 'notifications_active'
          })
          this.$router.push('/main')
        })
        .catch((err) => {
          console.log(err)
          // this.$q.notify(err)
          this.loading = false // 등록 버튼 액션 중단
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '유튜브 동영상 주소만 등록해주세요.',
            icon: 'notifications_active'
          })
        })
    },
    // 클립보드 복사내용 붙여넣기
    pasteClipboard () {
      /*
      // alert(document.execCommand('Paste'))
      let obj = document.getElementById('videoUrl')
      let selectedRange = ''
      console.log(obj)
      if (window.getSelection) {
        selectedRange = window.getSelection()
        selectedRange.selectAllChildren(obj)
        console.log('selectedRange.toString(): ' + selectedRange.toString())
      } else if (document.body.createTextRange) {
        selectedRange = document.body.createTextRange()
        selectedRange.moveToElementText(obj)
        selectedRange.select()
        console.log('selectedRange.htmlText: ' + selectedRange.htmlText)
      }
      alert(selectedRange)
      selectedRange.moveToElementText()
      selectedRange.execCommand('Paste')
      let textRange = document.body.createTextRange()
      textRange.moveToElementText()
      textRange.execCommand('Paste')
      */
      // PastedText.execCommand('Paste')
      // alert(window.clipboardData.getData('Text'))
    },
    goBack () {
      if (this.contentsVo.title !== '' || this.contentsVo.contents !== '') {
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
    }
  }
}
</script>
<style>
</style>
