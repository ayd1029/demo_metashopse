<template>
  <q-page class="flex flex-center">

    <q-layout-header>
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>모임 등록</q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <div class="no_refresh" style="width: 90%" >
      <br>
      <q-select v-model="circleVo.cate1_cd" inverted-light color="white" stack-label="모임 분류" :options="$store.state.circleCate1CdOptions" />
      <br>
      <q-input v-model.trim="circleVo.circle_name" stack-label="모임명" color="white" inverted-light />
      <br>
      <q-uploader
        stack-label="대표 이미지 *"
        ref="uploaderObj"
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
      <q-input v-model.trim="circleVo.introduce" stack-label="모임 소개" color="white" inverted-light type="textarea" rows="3" />
      <br>
      <q-input v-model.trim="circleVo.chat_url" stack-label="오픈채팅방/홈페이지 URL" color="white" inverted-light />
      <br>
      <br>
      <div class="flex flex-center">
        <!-- <q-btn glossy color="deep-orange" icon="fast_rewind" label="돌아가기" to='/product/productList' /> -->
        <q-btn icon="done" :loading="loading" :percentage="percentage" color="primary" @click="checkForm" style="width: 100%; height:50px;">
          &nbsp;&nbsp;&nbsp;&nbsp;등록하기
          <span slot="loading">
            <q-spinner-oval class="on-left" />
            등록중...&nbsp;&nbsp;&nbsp;
          </span>
        </q-btn>
        <br>
      </div>
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
      <br>
      <br>
    </div>

  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'circle-register',
  data () {
    return {
      uid: this.$store.state.userVo.uid,
      loading: false,
      percentage: 0,
      circleVo: {
        seq: '',
        circle_name: '',
        introduce: '',
        seq_file_mst: '', // 파일(이미지) 마스터 시컨스
        image_url: '', // 상품이미지URL
        reg_id: '',
        targetFilesNewName: [] // 등록시 사용할 파일 리스트
      },
      firstFileName: '',
      targetFiles: [],
      targetFilesNewName: [],
      numOfTargetFiles: 0,
      seqFileMst: '' // 파일 마스터 SEQ
    }
  },
  created: function () {
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
            message: '이미지 사이즈는 4MB 까지!',
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
    checkForm () { // 상품 등록 전 정합성 체크
      // console.log('업로드 대상 파일 갯수: ' + this.targetFiles.length)
      if (this.targetFiles.length < 1) {
        // 파일 1개 이상인지 체크
        this.$q.notify({
          color: 'blue',
          position: 'left',
          message: '대표 이미지를 등록해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      /*
      if (this.circleVo.title === '') {
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

      // 등록 처리 시작
      this.uploadFiles()
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
        // 업로드 전체 완료시 상품 등록
        this.insertCircle()
      }
    },
    insertCircle () {
      this.circleVo.seq_file_mst = this.seqFileMst
      this.circleVo.circle_profile_image = this.targetFilesNewName[0]
      this.circleVo.targetFilesNewName = this.targetFilesNewName
      // 줄바꿈 설정
      // this.circleVo.introduce = this.circleVo.introduce.replace('\n', '<br>')

      this.$axios({
        url: this.$store.state.apiServerIp + '/api/circle/insertCircle',
        method: 'POST',
        data: this.circleVo })
        .then((result) => {
          this.loading = false // 등록 버튼 액션 중단
          this.$q.notify({
            color: 'blue',
            position: 'top',
            message: '모임이 등록되었습니다.',
            icon: 'notifications_active'
          })
          this.$router.push('/circle')
        })
        .catch((err) => {
          console.log(err)
          // this.$q.notify(err)
          this.loading = false // 등록 버튼 액션 중단
        })
    },
    goBack () {
      if (this.circleVo.circle_name !== '' || this.circleVo.introduce !== '') {
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
