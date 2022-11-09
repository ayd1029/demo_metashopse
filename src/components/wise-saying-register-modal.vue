<template>
  <q-modal v-model="wiseSayingRegisterModal" :content-css="{minWidth: '20vw'}">

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense icon="nature_people" />
        <q-toolbar-title>랜덤메세지 작성</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <!-- 핫딜 정보 -->
      <table width="80%" border="0" align="center" cellpadding="0" cellspacing="0">
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td><font size="3">■ 누구의 말인가</font></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td><q-input v-model.trim="wiseSayingVo.by_who" color="white" inverted-light clearable maxlength="20" /></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td><font size="3">■ 어떤 내용인가</font></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left" colspan="2"><q-input v-model.trim="wiseSayingVo.contents" color="white" inverted-light type="textarea" rows="3" maxlength="500" /></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>
            <q-btn :loading="loading" :percentage="percentage" color="primary" @click="registerWiseSaying" icon="done" style="width:100%; height:40px;">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;등록하기
              <span slot="loading">
                <q-spinner-oval class="on-left" />
                등록중...
              </span>
            </q-btn>
          </td>
        </tr>
      </table>
      <br>
    </q-modal-layout>
  </q-modal>
</template>

<style>
</style>

<script>
// import Vue from 'vue'

export default {
  name: 'wise-saying-register-modal',
  data () {
    return {
      loading: false,
      percentage: 0,
      wiseSayingVo: { // 명언 vo
        contents: '', // 명언
        by_who: '' // 출처
      },
      wiseSayingRegisterModal: false
    }
  },
  created: function () {
  },
  mounted: function () {
  },
  methods: {
    show () {
      this.wiseSayingVo.by_who = this.$store.state.userVo.name
      this.wiseSayingVo.contents = ''
      this.wiseSayingRegisterModal = true
    },
    // 명언 등록
    registerWiseSaying () {
      // 정합성 체크
      if (this.wiseSayingVo.by_who === '') { // 출처가 없을 경우
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '누구의 말인지 작성해주세요.',
          icon: 'notifications_active'
        })
        return
      }

      if (this.wiseSayingVo.contents === '') { // 내용이 없을 경우
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '내용을 작성해주세요.',
          icon: 'notifications_active'
        })
        return
      }

      // 명언 등록
      this.loading = true
      this.$axios.post(this.$store.state.apiServerIp + '/api/etc/insertWiseSaying', this.wiseSayingVo)
        .then((result) => {
          this.loading = false
          // console.log(JSON.stringify(result.data))
          this.$q.notify({
            color: 'blue',
            position: 'top',
            message: '좋은말일세허허',
            icon: 'notifications_active'
          })
          this.close() // 창 닫기
        })
        .catch((err) => {
          this.loading = false
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '등록에 실패했어요 ㅠ_ㅠ..',
            icon: 'notifications_active'
          })
          console.log(err)
        })
    },
    close () {
      this.wiseSayingRegisterModal = false
    }
  }
}
</script>
