<template>
  <q-page class="flex flex-center">

    <q-layout-header>
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>모임 수정</q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <div class="no_refresh" style="width: 90%" >
      <br>
      <q-select v-model="circleVo.cate1_cd" inverted-light color="white" stack-label="모임 분류" :options="$store.state.circleCate1CdOptions" />
      <br>
      <q-input v-model.trim="circleVo.circle_name" stack-label="모임명" color="white" inverted-light />
      <br>
      <img :src="circleVo.circle_profile_image" style="width: 130px">
      <br>
      <q-uploader
        stack-label="대표 이미지 변경"
        ref="uploaderObj"
        url="/api/common/uploadImage"
        hide-upload-button
        :filter="filterFiles"
        @add="fileAdded"
        @uploaded="fileUploaded"
        :additional-fields="[{name: 'seqFileMst', value: 0}]"
      />
      <br>
      <q-input v-model.trim="circleVo.introduce" stack-label="모임 소개" color="white" inverted-light type="textarea" rows="3" />
      <br>
      <q-input v-model.trim="circleVo.chat_url" stack-label="오픈채팅방/홈페이지 URL" color="white" inverted-light />
      <br>
      <br>
      <div class="flex flex-center">
        <!-- <q-btn glossy color="deep-orange" icon="fast_rewind" label="돌아가기" to='/product/productList' /> -->
        <q-btn icon="done" :loading="loading" :percentage="percentage" color="primary" @click="updateCircle" style="width: 100%; height:50px;">
          &nbsp;&nbsp;&nbsp;&nbsp;수정하기
          <span slot="loading">
            <q-spinner-oval class="on-left" />
            수정중...&nbsp;&nbsp;&nbsp;
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
  name: 'circle-modify',
  data () {
    return {
      uid: this.$store.state.userVo.uid,
      loading: false,
      percentage: 0,
      circleVo: {}
    }
  },
  created: function () {
    this.$q.loading.show() // 로딩 표시 시작
    this.$axios.get(this.$store.state.apiServerIp + '/api/circle/selectCircle', {params: {seq: this.$route.query.seq}})
      .then((result) => {
        // console.log(JSON.stringify(result.data))
        this.circleVo = result.data
        this.$q.loading.hide() // 로딩 표시 종료
      })
      .catch((err) => {
        this.$q.loading.hide() // 로딩 표시 종료
        console.log(err)
      })
  },
  methods: {
    filterFiles (files) {
      const MAX_FILE_SIZE = this.$store.state.UPLOAD_FILE_SIZE_LIMIT * 1024 * 1024 // = 4M
      // returns an Array containing allowed files
      return files.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          this.$q.notify('이미지 사이즈는 4MB 까지!')
        }
        return file.size <= MAX_FILE_SIZE
      })
    },
    fileAdded (files) { // 프로필 이미지 변경
      this.$refs.uploaderObj.upload()
    },
    fileUploaded (file, xhr) {
      // 이미지 업로드가 완료되면 호출되는 메소드
      let fileNameNew = file.xhr.responseText
      this.circleVo.circle_profile_image = fileNameNew // 프로필 이미지 설정
      this.$refs.uploaderObj.reset()
      // 프로필 이미지 수정
      this.$axios.post(this.$store.state.apiServerIp + '/api/circle/updateCircleProfileImage', this.circleVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateCircle () {
      this.$axios({
        url: this.$store.state.apiServerIp + '/api/circle/updateCircle',
        method: 'POST',
        data: this.circleVo })
        .then((result) => {
          this.loading = false // 등록 버튼 액션 중단
          this.$q.notify({
            color: 'blue',
            position: 'top',
            message: '수정되었습니다.',
            icon: 'notifications_active'
          })
          this.$router.push('/circle/circleInfo?seq=' + this.circleVo.seq)
        })
        .catch((err) => {
          console.log(err)
          // this.$q.notify(err)
          this.loading = false // 등록 버튼 액션 중단
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
<style>
</style>
