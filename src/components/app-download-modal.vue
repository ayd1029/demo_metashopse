
<template>
  <q-modal v-model="appDownloadModal" position="" :content-css="{minWidth: '30vw', minHeight: '60vh'}">
    <q-modal-layout>

      <q-toolbar slot="header" color="black" inverted>
        <!-- <q-btn flat round dense icon="accessibility_new" readonly /> -->
        <!-- <img src="statics/icons/logo.png" style="width: 30px; height: 30px;"> -->
        <q-btn flat round dense icon="get_app" />
        <q-toolbar-title>앱 다운로드</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <table align="center" border="0" width="90%">
        <tr>
          <td align="center">&nbsp;</td>
        </tr>
        <!--
        <tr>
          <td align="center"><img src="statics/images/logo/widelogo.png" style="width:220px;"></td>
        </tr>
        <tr>
          <td align="left">&nbsp;</td>
        </tr>
        -->
        <tr>
          <td align="left">&nbsp;</td>
        </tr>
        <tr>
          <td align="center">
            <img src="statics/images/logo/logo.png" style="width:181px;">
          </td>
        </tr>
        <tr>
          <td align="left">&nbsp;</td>
        </tr>
        <tr>
          <td align="left">&nbsp;</td>
        </tr>
        <tr>
          <td align="center"><a @click="getApp('android')"><img src="statics/images/btn/bt_googleplay.png"></a></td>
        </tr>
        <tr>
          <td align="left">&nbsp;</td>
        </tr>
        <tr>
          <td align="center"><a @click="getApp('ios')"><img src="statics/images/btn/bt_appstore.png"></a></td>
        </tr>
        <tr>
          <td align="left"></td>
        </tr>
        <tr>
          <td align="left"></td>
        </tr>
      </table>
    </q-modal-layout>
  </q-modal>
</template>

<style>
</style>

<script>

export default {
  // name: 'mystore',
  data () {
    return {
      uid: '',
      appDownloadModal: false
    }
  },
  created: function () {
  },
  methods: {
    show () {
      this.appDownloadModal = true
    },
    getApp (os) {
      if (os === 'android') {
        window.open('https://play.google.com/store/apps/details?id=kr.oneon.sellerz')
      } else {
        // https://itunes.apple.com/us/app/%EC%9B%90%EB%8D%94%EC%83%B5/id1462604983?l=ko&ls=1&mt=8
        /*
        this.$q.dialog({
          title: '앱 심사중..',
          message: '계속 심사-거절-심사-거절-심사중ㅋ',
          ok: '사과닫기'
        })
        */
        // window.open('https://metashopse.com/app/discoin.ipa')
        // window.open('https://itunes.apple.com/us/app/%EC%9B%90%EB%8D%94%EC%83%B5/id1462604983?l=ko&ls=1&mt=8')
        window.open('https://apps.apple.com/kr/app/ec-9b-90-eb-8d-94-ec-83-b5/id1462604983')
      }
    },
    close () {
      this.appDownloadModal = false
    }
  }
}
</script>
