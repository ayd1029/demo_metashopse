<template>
  <q-modal v-model="contentsReplyModal" :content-css="{minWidth: '20vw', minHeight: '20vh'}">

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense icon="play_circle_filled" readonly />
        <!-- <img src="statics/icons/logo.png" style="width: 30px; height: 30px;"> -->
        <q-toolbar-title>게시글 수정</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <!-- 게시글 입력창 -->
      <table width="90%" border="0" align="center">
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td><q-input ref="inputReply" v-model.trim="contentsVo.title" stack-label="제목" rows="3" color="white" type="textarea" inverted-light /></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td><q-input ref="inputReply" v-model.trim="contentsVo.contents" stack-label="내용" rows="7" color="white" type="textarea" inverted-light /></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <!--
        <tr>
          <td><q-checkbox v-model="contentsVo.open_yn" color="grey" true-value="Y" false-value="N"><font size="2" color="grey">&nbsp;&nbsp;공개</font></q-checkbox></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        -->
        <tr>
          <td>
            <q-btn dense color="primary" @click="updateContents" label="저장" style="height:50px; width:100%;" :loading="loading" :percentage="percentage">
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
  name: 'contents-modify-modal',
  data () {
    return {
      contentsVoOriginal: {}, // 오리지날 데이터
      contentsVo: {}, // 호출하는 화면에서 JSON.parse(JSON.stringify(item))
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
      this.contentsReplyModal = true
      // 입력창에 포커스 - 안먹히노..
      // this.$refs.inputReply.focus()
    },
    // 게시글 수정
    updateContents () {
      // 게시글 수정
      this.loading = true
      this.$axios.post(this.$store.state.apiServerIp + '/api/contents/updateContents', this.contentsVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.contentsVoOriginal.title = this.contentsVo.title // 원래 화면에 제목 설정
          this.contentsVoOriginal.contents = this.contentsVo.contents // 원래 화면에 내용 설정
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
