<template>
  <q-page class="flex flex-center">

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>나의 정보</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
      </q-toolbar>
    </q-layout-header>

    <div class="no_refresh" style="width: 90%" >
      <br>
      <!-- 기본 정보 -->
      <q-chip color="primary" square icon="account_circle" style="width:130px">기본 정보</q-chip>
      <br>
      <br>
      <q-input v-model.trim="$store.state.userVo.uid" stack-label="아이디" placeholder="" maxlength="20" readonly hide-underline />
      <br>
      <q-input v-model.trim="$store.state.userVo.pwd" stack-label="비밀번호" type="password" placeholder="" no-pass-toggle />
      <br>
      <q-input v-model.trim="pwd2" stack-label="비밀번호 확인" type="password" placeholder="" no-pass-toggle />
      <br>
      <q-input v-model.trim="$store.state.userVo.name" stack-label="성명" placeholder="" maxlength="6" />
      <br>
      <q-input v-model.trim="$store.state.userVo.mobile_no" stack-label="휴대폰번호" type="number" placeholder="예) 01012345678" />
      <br>
      <q-input v-model.trim="$store.state.userVo.email" stack-label="이메일" maxlength="100" />
      <br>
      <q-input v-model.trim="$store.state.userVo.nickname" stack-label="닉네임" />
      <br>
      <q-input v-model.trim="$store.state.userVo.birth" stack-label="생년월일" type="number" placeholder="예) 19801029" maxlength="8" />
      <br>
      <font size="2" color="grey">성별 :&nbsp;&nbsp;&nbsp;</font>
      <q-radio v-model="$store.state.userVo.gender" val="1"><font size="3">&nbsp;&nbsp;&nbsp;남</font></q-radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <q-radio v-model="$store.state.userVo.gender" val="2"><font size="3">&nbsp;&nbsp;&nbsp;여</font></q-radio>
      <br>
      <br>
      <br>
      <br>
      <!-- 마이스토어 정보 -->
      <q-chip color="primary" square icon="store" style="width:130px">마이홈 정보</q-chip>
      <br>
      <br>
      <q-input v-model="storeUrl" stack-label="마이홈 주소" readonly hide-underline />
      <br>
      <font size="2" color="grey">프로필 이미지</font>
      <br>
      <q-card-separator />
      <br>
      <!-- &nbsp;&nbsp;&nbsp;<q-btn color="primary" dense @click="updateProfileImage" label="변경" style="width: 50px; height:10px" /> -->
      <img :src="$store.state.userVo.profile_image" style="width: 130px">
      <br>
      <q-uploader
        stack-label="프로필 이미지 변경"
        ref="uploaderObj"
        url="/api/common/uploadImage"
        hide-upload-button
        :filter="filterFiles"
        @add="fileAdded"
        @uploaded="fileUploaded"
        :additional-fields="[{name: 'seqFileMst', value: 0}]"
      />
      <br>
      <br>
      <q-input v-model.trim="$store.state.userVo.introduce" stack-label="소개" color="white" inverted-light type="textarea" rows="3" />
      <br>
      <q-input v-model.trim="$store.state.userVo.homepage" stack-label="홈페이지" />
      <br>
      <q-input v-model.trim="$store.state.userVo.facebook" stack-label="페이스북" />
      <br>
      <q-input v-model.trim="$store.state.userVo.instagram" stack-label="인스타그램" />
      <br>
      <q-input v-model.trim="$store.state.userVo.twitter" stack-label="트위터" />
      <br>
      <q-checkbox v-model="$store.state.userVo.push_agree_yn" color="grey" true-value="Y" false-value="N"><font size="2" color="grey">&nbsp;&nbsp;광고성 푸시알림 수신동의 (선택)</font></q-checkbox>
      <br>
      <br>
      <br>
      <q-btn color="primary" @click="updateUser" icon="done" label="수정하기" style="width: 100%; height:50px" />
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
    <br>
    <br>
    <br>
  </q-page>
</template>

<style>
</style>

<script>
// import { domain, kakaotalkJsClientId } from '../../global/constants.js'
// import { VueEditor } from 'vue2-editor'
import Vue from 'vue'

export default {
  name: 'Product',
  components: {
    // VueEditor
  },
  data () {
    return {
      uid: '',
      storeUrl: this.$store.state.DOMAIN + '/home/' + this.$store.state.userVo.uid,
      pwd2: ''
    }
  },
  created: function () {
    // 이용약관 숨김
    // document.getElementById('termsDiv').style.display = 'none'
    // 로그인 체크
    if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
      this.$router.push(this.$store.state.PAGE_LOGIN)
    }
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
      let fileName = file.name
      let fileSize = file.size
      let fileType = file.type
      let fileNameNew = file.xhr.responseText
      console.log('fileName: ' + fileName)
      console.log('fileSize: ' + fileSize)
      console.log('fileType: ' + fileType)
      console.log('fileNameNew: ' + fileNameNew)
      this.$store.state.userVo.profile_image = fileNameNew // 프로필 이미지 설정
      this.$refs.uploaderObj.reset()
      // 프로필 이미지 수정
      this.$axios.post(this.$store.state.apiServerIp + '/api/user/updateUserProfileImage', this.$store.state.userVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateUser () { // 회원정보 수정
      // 정합성 체크
      if (this.$store.state.userVo.pwd !== this.pwd2) { // 비밀번호 !== 비밀번호 확인
        this.$q.notify({
          color: 'primary',
          position: 'left',
          message: '비밀번호를 확인해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      // 회원정보 수정
      this.$axios.post(this.$store.state.apiServerIp + '/api/user/updateUser', this.$store.state.userVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.notify({
            color: 'blue',
            position: 'left',
            message: result.data.resultMsg,
            icon: 'notifications_active'
          })
        })
        .catch((err) => {
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
