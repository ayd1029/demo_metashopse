<template>
  <q-modal v-model="reviewRegisterModal" :content-css="{minWidth: '50vw'}">

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense icon="create" />
        <q-toolbar-title>구매후기 작성</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <!-- 주문 정보 -->
      <table align="center" border="0" width="95%">
        <tr>
          <td align="left" colspan="2"><q-input v-model.trim="contentsVo.title" stack-label="제목" color="white" inverted-light /></td>
        </tr>
        <tr>
          <td align="left" width="70"><img :src="contentsVo.product_image_url" style="width: 60px;"></td>
          <td align="center">
            <div v-if="contentsVo.rating == null || contentsVo.rating == 0"><q-rating v-model="contentsVo.rating" icon="sentiment_satisfied" :max="5" size="50px" color="primary" /> 선택</div>
            <div v-if="contentsVo.rating == 1"><q-rating v-model="contentsVo.rating" icon="sentiment_very_dissatisfied" :max="5" size="50px" color="red" /> 나쁨</div>
            <div v-if="contentsVo.rating == 2"><q-rating v-model="contentsVo.rating" icon="sentiment_dissatisfied" :max="5" size="50px" color="orange" /> 별로</div>
            <div v-if="contentsVo.rating == 3"><q-rating v-model="contentsVo.rating" icon="sentiment_satisfied" :max="5" size="50px" color="green" /> 보통</div>
            <div v-if="contentsVo.rating == 4"><q-rating v-model="contentsVo.rating" icon="sentiment_satisfied_alt" :max="5" size="50px" color="cyan" /> 좋음</div>
            <div v-if="contentsVo.rating == 5"><q-rating v-model="contentsVo.rating" icon="sentiment_very_satisfied" :max="5" size="50px" color="blue" /> 최고</div>
          </td>
        </tr>
        <tr>
          <td align="left" colspan="2"><q-input v-model.trim="contentsVo.contents" stack-label="내용" color="white" inverted-light type="textarea" rows="3" /></td>
        </tr>
        <tr>
          <td align="left" colspan="2">
            <q-uploader
              v-if="this.contentsVo.seq == null"
              float-label="사진"
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
              :style="`width:${widthOneOne - 27}px`"
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <div v-if="contentsVo.imageList != null && contentsVo.imageList.length > 0" align="center" style="width: 100%; margin: 5px 0px 0px 0px;">
              <q-carousel color="white" arrows :quick-nav="contentsVo.imageList.length > 1" quick-nav-icon="favorite" :height="`${widthOneOne}px`">
                <q-carousel-slide v-for="images in contentsVo.imageList" :key="images.seq" :img-src="images.url_path" />
              </q-carousel>
            </div>
            <div v-if="contentsVo.seq != null && contentsVo.image_url != null && (contentsVo.imageList == null || contentsVo.imageList.length < 1)" align="center" style="width: 100%; margin: 5px 0px 0px 0px;">
              <q-carousel color="white" :height="`${widthOneOne}px`">
                <q-carousel-slide  :img-src="contentsVo.image_url" />
              </q-carousel>
            </div>
          </td>
        </tr>
      </table>
      <br>

      <q-toolbar color="white" >
        <q-btn :loading="loading" :percentage="percentage" :disabled="disabled" color="primary" @click="checkForm" icon="done" style="width:100%; height:40px;">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;저장하기
          <span slot="loading">
            <q-spinner-oval class="on-left" />
            저장중...
          </span>
        </q-btn>
      </q-toolbar>
      <br>
    </q-modal-layout>
  </q-modal>
</template>

<style>
</style>

<script>
import Vue from 'vue'
// import { close } from 'fs';

export default {
  // name: 'mystore',
  data () {
    return {
      type: '', // insert: 등록, update: 수정
      // index: '', // 배송관리 팝업 콜백처리시 주문정보 갱신에 사용
      loading: false,
      disabled: true, // 파일 마스터 시컨스 취득시 활성화
      percentage: 0,
      orderProductVo: {}, // 등록시 설정되는 주문상품 정보
      contentsVo: { // 상품리뷰 vo -> 컨텐츠 테이블에 등록
        seq: '',
        order_no: '',
        // seq_product_review: '', // 주문내역에서 호출시 상품리뷰 시컨스
        seq_product: '',
        seq_order_product: '',
        sid: '',
        rating: '',
        // seq_circle: '',
        title: '',
        contents: '',
        image_url: '',
        // product_image_url: '', // 상품 이미지
        seq_file_mst: '',
        // video_cd: '',
        // video_url_original: '',
        // video_url: '',
        // open_yn: '',
        targetFilesNewName: [] // 등록시 사용할 파일 리스트
      },
      targetFiles: [],
      targetFilesNewName: [],
      numOfTargetFiles: 0,
      seqFileMst: '', // 파일 마스터 SEQ
      widthOneOne: 0, // 화면너비를 1로 나눈 값
      reviewRegisterModal: false
    }
  },
  created: function () {
    this.widthOneOne = window.innerWidth
    if (this.$store.state.device === 'P') {
      this.widthOneOne = this.widthOneOne / 2
    }
  },
  mounted: function () {
  },
  methods: {
    show () {
      if (this.$refs.uploaderObj != null) {
        this.$refs.uploaderObj.reset() // 이미지업로더 초기화
      }

      this.targetFiles = [] // 첨부파일 배열 초기화
      this.targetFilesNewName = [] // 첨부파일명 배열 초기화
      this.seqFileMst = '' // 파일마스터 시컨스 초기화
      this.disabled = true // 파일 마스터 시컨스 취득까지 비활성화

      // 작성된 리뷰 정보 조회
      if (this.contentsVo.seq != null && this.contentsVo.seq !== '') { // 기존 작성된 리뷰가 존재할 경우
        this.disabled = false // 저장버튼 활성화
        this.$q.loading.show() // 로딩 표시 시작
        this.$axios.get(this.$store.state.apiServerIp + '/api/review/selectProductReview', {params: {seq: this.contentsVo.seq}})
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.contentsVo = result.data
            this.seqFileMst = this.contentsVo.seq_file_mst // 파일 마스터 SEQ 설정
            this.$q.loading.hide() // 로딩 표시 종료
          })
          .catch((err) => {
            this.$q.loading.hide() // 로딩 표시 종료
            console.log(err)
          })
      } else {
        // 파일 마스터 seq 취득
        this.$axios({
          url: this.$store.state.apiServerIp + '/api/common/insertFileMst',
          method: 'GET' })
          .then((result) => {
            this.seqFileMst = result.data // 파일 마스터 SEQ 설정
            this.disabled = false // 저장버튼 활성화
            console.log('this.seqFileMst: ' + this.seqFileMst)
          })
          .catch((err) => {
            console.log(err)
            this.$q.notify({
              color: 'blue',
              position: 'left',
              message: '처리 오류. 창을 닫고 다시 열어주세요.',
              icon: 'notifications_active'
            })
          })

        // ★★★ 신규 등록일 경우 vo 설정 ★★★
        // 상품 이미지를 리뷰 이미지와 겹치지 않게 설정
        this.contentsVo.product_image_url = this.contentsVo.image_url

        // 상품리뷰 vo
        // this.contentsVo.seq = this.orderProductVo.order_no
        this.contentsVo.order_no = this.orderProductVo.order_no
        this.contentsVo.seq_product = this.orderProductVo.seq_product
        this.contentsVo.seq_order_product = this.orderProductVo.seq_order_product
        this.contentsVo.sid = this.orderProductVo.sid
        // this.contentsVo.rating = this.orderProductVo.order_no
        // this.contentsVo.seq_circle = this.orderProductVo.order_no

        // 제목 생성
        this.contentsVo.title = this.orderProductVo.title
        if (this.orderProductVo.select_option1 != null && this.orderProductVo.select_option1 !== '') {
          this.contentsVo.title += ' [' + this.orderProductVo.select_option1
          if (this.orderProductVo.select_option2 != null && this.orderProductVo.select_option2 !== '') {
            this.contentsVo.title += '|' + this.orderProductVo.select_option2
            if (this.orderProductVo.select_option3 != null && this.orderProductVo.select_option3 !== '') {
              this.contentsVo.title += '|' + this.orderProductVo.select_option3
            }
          }
          this.contentsVo.title += ']'
        }
        this.contentsVo.title += ' ' + this.orderProductVo.order_quantity + '개'

        // this.contentsVo.contents = this.orderProductVo.order_no
        // this.contentsVo.image_url = this.orderProductVo.order_no
        this.contentsVo.product_image_url = this.orderProductVo.image_url // 상품 이미지
        // this.contentsVo.seq_file_mst = this.orderProductVo.order_no
        // this.contentsVo.video_cd = this.orderProductVo.order_no
        // this.contentsVo.video_url_original = this.orderProductVo.order_no
        // this.contentsVo.video_url = this.orderProductVo.order_no
        this.contentsVo.open_yn = this.orderProductVo.open_yn

        // 등록되지 않는 항목들
        this.contentsVo.order_price = this.orderProductVo.order_price
        this.contentsVo.order_quantity = this.orderProductVo.order_quantity
        this.contentsVo.select_option1 = this.orderProductVo.select_option1
        this.contentsVo.select_option2 = this.orderProductVo.select_option2
        this.contentsVo.select_option3 = this.orderProductVo.select_option3

        console.log('this.contentsVo.product_image_url: ' + this.contentsVo.product_image_url)
      }
      this.reviewRegisterModal = true
    },
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
    checkForm () { // 상품리뷰 등록 전 정합성 체크
      if (this.contentsVo.rating == null || this.contentsVo.rating === 0) { // 평점 입력 체크
        this.$q.notify({
          color: 'blue',
          position: 'left',
          message: '평점을 선택해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      // 등록 처리 시작
      if (this.targetFiles.length < 1) { // 첨부사진이 없는 경우
        this.updateProductReview()
      } else { // 첨부사진이 있는 경우
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
        // 업로드 전체 완료시 상품리뷰 등록
        this.updateProductReview()
      }
    },
    // 상품리뷰 등록
    updateProductReview () {
      this.loading = true

      // 파일 마스터 시컨스 설정 (기존 데이터 수정인 경우는 파일 마스터 시컨스가 없는 경우만 새로 설정)
      console.log('this.targetFilesNewName.length: ' + this.targetFilesNewName.length)
      if (this.contentsVo.seq == null || this.contentsVo.seq === '') { // 신규 작성인 경우
        if (this.targetFilesNewName != null && this.targetFilesNewName !== '' && this.targetFilesNewName.length > 0) {
          // 첨부파일이 있는 경우
          this.contentsVo.seq_file_mst = this.seqFileMst
        } else {
          // 첨부파일이 없는 경우
          this.contentsVo.seq_file_mst = null
        }
      } else {
        // 기존에 파일 마스터 시컨스가 없는 경우에만 새 시컨스 설정
        if (this.contentsVo.seq_file_mst == null) {
          this.contentsVo.seq_file_mst = this.seqFileMst
        }
      }

      this.contentsVo.image_url = this.targetFilesNewName[0] // 대표 이미지 설정
      this.contentsVo.targetFilesNewName = this.targetFilesNewName // 백엔드에서 이미지 정렬을 위해 넘기는 배열
      if (this.contentsVo.image_url == null || this.contentsVo.image_url === '') {
        this.contentsVo.image_url = this.contentsVo.product_image_url // 첨부파일이 없을 경우 상품 이미지로 대체
      }

      if (this.contentsVo.seq != null && this.contentsVo.seq !== '') { // 기존 데이터 수정인 경우
        // 리뷰 수정
        this.$axios.post(this.$store.state.apiServerIp + '/api/review/updateProductReview', this.contentsVo)
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.loading = false
            // 부모창의 콜백함수 호출
            this.$emit('callback-review-register', result.data) // result.data : 저장한 상품리뷰
            this.close() // 창 닫기
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
          })
      } else {
        // 리뷰 신규 작성
        console.log('등록하러 가는 VO: ' + JSON.stringify(this.contentsVo))
        this.$axios.post(this.$store.state.apiServerIp + '/api/review/insertProductReview', this.contentsVo)
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.loading = false
            // 부모창의 콜백함수 호출
            this.$emit('callback-review-register', result.data) // result.data : 저장한 상품리뷰
            this.close() // 창 닫기
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
          })
      }
    },
    addComma (num) {
      return Vue.prototype.$addComma(num)
    },
    close () {
      this.reviewRegisterModal = false
    }
  }
}
</script>
