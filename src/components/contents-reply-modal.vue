<template>
  <q-modal v-model="contentsReplyModal" :content-css="{minWidth: '30vw', minHeight: '50vh'}">

    <loginModal ref="loginModal" />
    <contentsReplyModifyModal ref="contentsReplyModifyModal" />

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense icon="chat" readonly />
        <!-- <img src="statics/icons/logo.png" style="width: 30px; height: 30px;"> -->
        <q-toolbar-title>댓글</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <table v-for="item in contentsReplyList" :key="item.seq" border="0" style="width: 100%;" cellpadding="0" cellspace="0">
        <tr v-if="item.target_seq === ''"><td colspan="6"><q-card-separator /></td></tr>
        <tr><td colspan="6"></td></tr>
        <tr><td colspan="6"></td></tr>
        <tr><td colspan="6"></td></tr>
        <tr>
          <td rowspan="2" width="1"></td>
          <td rowspan="2" width="50" align="right" v-if="item.target_seq === ''" style="vertical-align:top;">
            <a @click="showUserHome(item.reg_id)"><div class="round-countents-reply"><img :src="item.profile_image" style="width: 45px"></div></a>
          </td>
          <td rowspan="2" width="50" align="right" v-else style="vertical-align:top;">
            <a @click="showUserHome(item.reg_id)"><div class="round-countents-reply2"><img :src="item.profile_image" style="width: 30px"></div></a>
          </td>
          <td rowspan="2" width="5">&nbsp;</td>
          <td colspan="1" width=""><a @click="setReplyTarget(item)"><font size="2" color="grey">{{ item.name }}</font></a></td>
          <td colspan="1" align="right"><font size="1" color="grey">{{ item.reg_time }}</font></td>
          <td colspan="1" width="35" align="left">
            <q-btn v-if="item.reg_id === $store.state.userVo.uid && item.del_id == null" flat round dense color="grey" icon="more_vert" size="sm">
              <q-popover>
                <q-list link class="scroll" style="width:100px;">
                  <q-item key="1" v-close-overlay @click.native="modifyReply(item)"><q-item-main label="수정하기" /></q-item>
                  <q-item key="2" v-close-overlay @click.native="deleteReply(item)"><q-item-main label="삭제하기" /></q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="word-break:break-all;">
            <div v-if="item.del_id == null">
              <a @click="setReplyTarget(item)"><font size="2" color="black">{{ item.reply }}&nbsp;</font></a>
            </div>
            <div v-else>
              <font size="1" color="grey">{{ item.reply }}&nbsp;</font>
            </div>
          </td>
          <td colspan="1" align="left">
            <a @click="setReplyTarget(item)"><font size="2" color="red">답글</font></a>
          </td>
        </tr>
        <tr><td colspan="6"></td></tr>
        <tr><td colspan="6"></td></tr>
      </table>
      <br>
      <br>
      <br>
      <br>
      <br>&nbsp;

      <q-toolbar slot="footer" color="white" class="no-shadow">
        <!-- 댓글 입력창 -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td width="95%"><q-input ref="inputReply" v-model.trim="reply" @input="onChangeReply" color="white" style="width:97%;" class="no-shadow" type="textarea" inverted-light clearable /></td>
            <td width="5%"><q-btn dense icon="send" color="primary" @click="insertContentsReply" style="height:35px; width:35px;" /></td>
          </tr>
        </table>
      </q-toolbar>

    </q-modal-layout>
  </q-modal>
</template>

<style>
.round-countents-reply {
  border-radius: 50%;
  overflow: hidden;
  width: 45px;
  height: 45px;
}
.round-countents-reply img {
  display: block;
  min-width: 100%;
  min-height: 100%;
}
.round-countents-reply2 {
  border-radius: 50%;
  overflow: hidden;
  width: 30px;
  height: 30px;
}
.round-countents-reply2 img {
  display: block;
  min-width: 100%;
  min-height: 100%;
}
</style>

<script>
import Vue from 'vue'

export default {
  name: 'contents-reply-modal',
  data () {
    return {
      // seq_contents: '',
      contentsVo: {},
      contentsReplyVo: {
        seq: '',
        seq_contents: '',
        target_seq: '',
        target_uid: '',
        reply: '',
        reg_id: '',
        mod_id: '',
        contentsOwnerUid: '' // 알림용 컨텐츠 등록자 아이디
      },
      reply: '', // 입력 전용
      // targetName: '', // 댓들 대상 이름
      // targetIsExist: false, // 댓글 대상 유무
      loading: false,
      percentage: 0,
      contentsReplyList: [], // 댓글 리스트
      contentsReplyModal: false
    }
  },
  /*
  created: function () {
  },
  mount: function () {
  },
  */
  methods: {
    show () {
      this.contentsReplyList = []
      // 댓글 리스트 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/contents/selectContentsReplyList',
        {params: {seq_contents: this.contentsVo.seq}})
        .then((result) => {
          this.$q.loading.hide() // 로딩 표시 종료
          // console.log(JSON.stringify(result.data))
          this.contentsReplyList = result.data
          // this.$emit('callback-login', this.$store.state.userVo.uid)
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
        })
      this.contentsReplyModal = true
      this.$q.loading.show() // 로딩 표시 시작
    },
    // 댓글 수정
    modifyReply (item) {
      this.$refs.contentsReplyModifyModal.contentsReplyVoOriginal = item // 수정완료 후 표시를 위해 설정
      this.$refs.contentsReplyModifyModal.contentsReplyVo = JSON.parse(JSON.stringify(item))
      this.$refs.contentsReplyModifyModal.show()
    },
    // 댓글 삭제
    deleteReply (item) {
      // 삭제 확인
      this.$q.dialog({
        title: '댓글 삭제',
        message: '정말 삭제하시겠습니까?',
        ok: '예',
        cancel: '아니오',
        preventClose: true
      }).then(() => {
        // 댓글 삭제 - 내용을 '삭제되었습니다'로 수정
        this.$q.loading.show() // 로딩 표시 시작
        this.$axios.post(this.$store.state.apiServerIp + '/api/contents/deleteContentsReply', item)
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            item.reply = '작성자에 의해 삭제되었습니다.'
            item.del_id = this.$store.state.userVo.uid
            this.$q.loading.hide() // 로딩 표시 종료
            this.$q.notify({
              color: 'primary',
              position: 'left',
              message: '삭제되었습니다.',
              icon: 'notifications_active'
            })
          })
          .catch((err) => {
            console.log(err)
            this.$q.loading.hide() // 로딩 표시 종료
            this.$q.notify({
              color: 'primary',
              position: 'left',
              message: '네트워크 오류. 다시 시도해주세요.',
              icon: 'notifications_active'
            })
          })
      }).catch(() => {
        // this.$q.notify(`You didn't agree`)
      })
    },
    onChangeReply () {
      if (this.reply === '') {
        // 댓글 대상 해제
        this.contentsReplyVo.target_seq = ''
        this.contentsReplyVo.target_uid = ''
      }
    },
    // 댓글 대상 설정
    setReplyTarget (item) {
      this.contentsReplyVo.target_seq = item.seq
      this.contentsReplyVo.target_uid = item.reg_id
      this.reply = '@' + item.name + ' '

      // 입력창에 포커스
      this.$refs.inputReply.focus()
    },
    // 댓글 등록
    insertContentsReply () {
      // 로그인 체크
      if (!this.checkLogin()) {
        this.$refs.loginModal.show()
        return
      }
      // 댓글 입력 체크
      if (this.reply === '') {
        this.$q.notify({
          color: 'blue',
          position: 'left',
          message: '댓글을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      console.log(this.contentsReplyVo)
      this.contentsReplyVo.seq_contents = this.contentsVo.seq
      this.contentsReplyVo.contentsOwnerUid = this.contentsVo.reg_id
      // this.contentsReplyVo.reg_id = this.$store.state.userVo.uid
      this.contentsReplyVo.reply = this.reply

      this.reply = '' // 입력창 초기화

      // 댓글 등록
      this.$axios.post(this.$store.state.apiServerIp + '/api/contents/insertContentsReply', this.contentsReplyVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.contentsReplyList = result.data // 댓글 조회결과 재설정
          this.contentsVo.reply_count = result.data.length
          // this.scrollDownToBottom() // 스크롤 맨아래로 이동

          // 댓글 대상 초기화
          this.contentsReplyVo.target_seq = ''
          this.contentsReplyVo.target_uid = ''
        })
        .catch((err) => {
          console.log(err)
        })
    },
    checkLogin () {
      return Vue.prototype.$checkLogin(this.$store.state.userVo)
    },
    // 유저홈 팝업
    showUserHome (uid) {
      Vue.prototype.$showUserHome(uid)
    },
    close () {
      this.contentsReplyModal = false
    }
  }
}
</script>
