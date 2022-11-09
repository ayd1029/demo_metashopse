<template>
  <q-modal v-model="shareModal" position="bottom" :content-css="{minWidth: '30%', minHeight: '10%'}">
    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <!-- <img src="statics/icons/logo.png" style="width: 30px; height: 30px;"> -->
        <q-btn flat round dense icon="share" readonly />
        <q-toolbar-title>
          공유하기
        </q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>
      <table align="center" border="0" width="90%">
        <tr>
          <td align="left"><q-input class="no-shadow" inverted-light color="white" v-model="linkUrl" readonly /></td>
          <td align="right"><q-btn id="copyBtn" outline :color="color" @click="copyUrl" icon="file_copy" label="링크 복사" :disable="copyBtnDisabled" style="width:130px; height: 40px" /></td>
        </tr>
        <tr>
        </tr>
        <!--
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="2">
            <a @click="shareSns(`${linkUrl}`)"><img src="statics/images/logo/kakaotalk.png" style="width: 30px"></a>
            &nbsp;&nbsp;&nbsp;
            <a @click="shareSns(`${linkUrl}`)"><img src="statics/images/logo/kakaostory.png" style="width: 30px"></a>
            &nbsp;&nbsp;
            <a @click="shareSns(`${linkUrl}`)"><img src="statics/images/logo/facebook.png" style="width: 30px"></a>
            &nbsp;&nbsp;&nbsp;
            <a @click="shareSns(`${linkUrl}`)"><img src="statics/images/logo/instagram.png" style="width: 30px"></a>
            &nbsp;&nbsp;
            <a @click="shareSns(`${linkUrl}`)"><img src="statics/images/logo/naverblog.png" style="width: 30px"></a>
            &nbsp;&nbsp;
            <a @click="shareSns(`${linkUrl}`)"><img src="statics/images/logo/twitter.png" style="width: 30px"></a>
            &nbsp;&nbsp;
            <a @click="shareSns(`${linkUrl}`)"><img src="statics/images/logo/googleplus.png" style="width: 30px"></a>
            &nbsp;&nbsp;
          </td>
        </tr>
         -->
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
      </table>
    </q-modal-layout>
  </q-modal>
</template>

<style>
</style>

<script>
// import { domain, bitlyUrl, bitlyLogin, bitlyApiKey } from '../global/constants.js'
// import Clipboard from clipboard

export default {
  // name: 'mystore',
  data () {
    return {
      linkVo: {
        seq_og: '', // 상품/컨텐츠/모임/멤버 시컨스
        link_cd: '', // PRODUCT/CONTENTS/CIRCLE/MEMBER
        url_path: '', // 이동할 URL
        reg_id: '' // 등록자 아이디
      },
      linkUrl: '', // 공유할 URL
      color: 'primary',
      copyBtnDisabled: true,
      shareModal: false
    }
  },
  created: function () {
    /*
    this.$loadScript('statics/js/clipboard.js')
      .then(() => {
        // Script is loaded, do something
      })
      .catch(() => {
        // Failed to fetch script
      })
    */
  },
  methods: {
    show () {
      this.linkUrl = '' // 링크주소 초기화
      this.copyBtnDisabled = true // 복사하기 버튼 비활성화

      this.shareModal = true

      // 내부URL 생성
      if (this.linkVo.link_cd === 'PRODUCT') { // 상품
        this.linkVo.url_path = 'link/product?seq=' + this.linkVo.seq_og + '&uid=' + this.$store.state.userVo.uid
      } else if (this.linkVo.link_cd === 'CONTENTS') { // 컨텐츠
        this.linkVo.url_path = 'link/contents?seq=' + this.linkVo.seq_og
      } else if (this.linkVo.link_cd === 'CIRCLE') { // 모임
        this.linkVo.url_path = 'link/circle?seq=' + this.linkVo.seq_og
      } else if (this.linkVo.link_cd === 'MEMBER') { // 유저
        this.linkVo.url_path = 'link/member?uid=' + this.linkVo.seq_og
      }
      this.linkVo.reg_id = this.$store.state.userVo.uid
      // 공유URL 조회
      this.$axios.post(this.$store.state.apiServerIp + '/api/link/getLinkUrl', this.linkVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.linkUrl = result.data // 링크URL 설정
          // 복사하기 버튼 활성화
          this.copyBtnDisabled = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    copyUrl () {
      console.log('copyUrl function called!')
      // 클립아트로 복사하기
      // window.clipboard(this.linkUrl)

      this.$copyText(this.linkUrl).then(function (e) {
        console.log(e)
        // alert('링크를 클립보드에 복사했습니다.')
      }, function (e) {
        console.log(e)
        alert('링크 복사 실패')
      })
      this.$q.notify({
        color: 'blue',
        position: 'left',
        message: '링크를 클립보드에 복사했습니다.',
        icon: 'notifications_active'
      })
      this.shareModal = false
    },
    // 화면표시 없이 공유링크 복사
    copyUrlAuto () {
      this.shareModal = true
      this.linkUrl = '' // 링크주소 초기화

      // 내부URL 생성
      if (this.linkVo.link_cd === 'PRODUCT') { // 상품
        this.linkVo.url_path = 'link/product?seq=' + this.linkVo.seq_og
      } else if (this.linkVo.link_cd === 'CONTENTS') { // 컨텐츠
        this.linkVo.url_path = 'link/contents?seq=' + this.linkVo.seq_og
      } else if (this.linkVo.link_cd === 'CIRCLE') { // 모임
        this.linkVo.url_path = 'link/circle?seq=' + this.linkVo.seq_og
      } else if (this.linkVo.link_cd === 'MEMBER') { // 유저
        this.linkVo.url_path = 'link/member?uid=' + this.linkVo.seq_og
      }
      this.linkVo.reg_id = this.$store.state.userVo.uid
      // 공유URL 조회
      this.$axios.post(this.$store.state.apiServerIp + '/api/link/getLinkUrl', this.linkVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.linkUrl = result.data // 링크URL 설정
          // 클립아트로 복사하기
          // window.clipboard(this.linkUrl)
          // alert(result.data)
          this.$q.loading.hide() // 로딩 중지
          this.copyUrl()

          /*
          let linkElement = document.getElementById('copyBtn')
          // alert(linkElement)
          let event = document.createEvent('MouseEvents')
          event.initEvent('click', false, true)
          linkElement.dispatchEvent(event)
          */
          /*
          this.$q.notify({
            color: 'blue',
            position: 'left',
            message: '링크를 클립보드에 복사했습니다.',
            icon: 'notifications_active'
          })
          */
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 중지
          console.log(err)
        })

      // 뭔가 getLinkUrl 안에서 안먹혀서 걍 모니터링함
      /*
      let interval = setInterval(() => {
        if (this.linkUrl !== '') { // 채팅창 벗어나면 실행 안함
          this.$q.loading.hide() // 로딩 중지
          let url = '123'
          this.$copyText(url).then(function (e) {
            console.log(e)
            alert('링크를 클립보드에 복사했습니다.')
            clearInterval(interval)
          }, function (e) {
            console.log(e)
            // alert('링크 복사 실패: ' + JSON.stringify(e))
          })
        }
      }, 500)
      */
    },
    close () {
      this.shareModal = false
    }
  }
}
</script>
