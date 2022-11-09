<template>
  <q-modal v-model="contentsReplyModal" position="bottom" :content-css="{minWidth: '20vw', minHeight: '23vh'}">

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense icon="chat" readonly />
        <!-- <img src="statics/icons/logo.png" style="width: 30px; height: 30px;"> -->
        <q-toolbar-title>댓글 수정</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <!-- 댓글 입력창 -->
      <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">
        <tr>
          <td width=""><q-input ref="inputReply" v-model.trim="reply" rows="3" color="white" style="width:97%;" class="no-shadow" type="textarea" inverted-light /></td>
          <td width="40" align="right" style="vertical-align:bottom;">
            <q-btn dense icon="send" color="primary" @click="updateContentsReply" style="height:35px; width:35px;" :loading="loading" :percentage="percentage">
              <span slot="loading">
                <q-spinner-oval class="on-left" />
              </span>
            </q-btn>
          </td>
        </tr>
      </table>

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
// import Vue from 'vue'

export default {
  name: 'contents-reply-modify-modal',
  data () {
    return {
      contentsReplyVoOriginal: {}, // 오리지날 데이터
      contentsReplyVo: {
      },
      reply: '', // 입력 전용
      loading: false,
      percentage: 0,
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
      this.reply = this.contentsReplyVo.reply
      this.contentsReplyModal = true
      // 입력창에 포커스 - 안먹히노..
      // this.$refs.inputReply.focus()
    },
    // 댓글 수정
    updateContentsReply () {
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
      // 수정 이전 내용과 같은 경우
      if (this.reply === this.contentsReplyVo.reply) {
        this.contentsReplyModal = false
        return
      }

      this.contentsReplyVo.reply = this.reply // 입력한 내용으로 설정
      this.reply = '' // 입력창 초기화

      // 댓글 수정
      this.loading = true
      this.$axios.post(this.$store.state.apiServerIp + '/api/contents/updateContentsReply', this.contentsReplyVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.contentsReplyVoOriginal.reply = this.contentsReplyVo.reply // 원래 화면에 값 설정
          this.loading = false
          this.close() // 화면 닫기
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
          this.$q.notify({
            color: 'primary',
            position: 'left',
            message: '네트워크 오류. 다시 시도해주세요.',
            icon: 'notifications_active'
          })
        })
    },
    close () {
      this.contentsReplyModal = false
    }
  }
}
</script>
