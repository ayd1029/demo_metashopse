<template>
  <q-page class="">

    <loginModal ref="loginModal" @callback-login="callbackLogin" />
    <personalInfoPolicyModal ref="personalInfoPolicyModal" />
    <termOfServiceModal ref="termOfServiceModal" />
    <redirectModal ref="redirectModal" />

    <q-layout-header>
      <q-toolbar color="black" inverted align="center">
        <q-btn @click="goBack" flat round dense icon="fast_rewind" />
        <q-toolbar-title><b>๐ฅ OPEN EVENT ๐ฅ</b></q-toolbar-title>
        <!-- <img @click="goBack" src="statics/images/logo/widelogo.png" style="width: 80px;">&nbsp;&nbsp; -->
        <q-btn @click="goBack" flat round dense icon="home" />
      </q-toolbar>
    </q-layout-header>

    <div class="no_refresh" style="width: 100%" >

      <!--
      <q-card-separator />
      <br>
      <div align="center">
        <br>
        <div class="q-display-1 q-mb-md text-grey">๊ตณ์ด๋ฒ๋ฆฐ ์ผํ ๋ฌธํ</div>
        <p class="caption">
          <br>
          ์ธํฐ๋ท ์ผํ ๋ฌธํ๊ฐ ๋๋ฌด ๋ฑ๋ฑํ๋ค.<br>
          ๊ฐ์ฅ ์ผ ์ ํ์ ๋น ๋ฅด๊ฒ ๋ฐฐ์ก๋ฐ๋๊ฒ ์ ๋ถ์ธ..<br>
          <br>
          ์ผํ๋ฌธํ๋ฅผ ๋ฐ๊ฟ๋ณด๋ คํ๋ค.<br>
          <br>
          ๋์ ์ผํ์ด ์๋<br>
          ์ฐ๋ฆฌ์ ์ผํ์ด ๋  ์ ์๋๋ก.<br>
          <br>
        </p>
      </div>
      <q-card-separator />

      <br>
      <div align="center">
        <br>
        <div class="q-display-1 q-mb-md text-grey">ํจ์จ?</div>
        <p class="caption">
          <br>
          ์ ํต ๋จ๊ณ๋ฅผ ์ค์ฌ ๋จ๊ฐ๋ฅผ ๋ฎ์ถ๋ ๊ฒ์ด<br>
          ๊ณผ์ฐ ์ต์์ฑ์ผ๊น?<br>
          <br>
          ์ธ๋ค๊ณ  ๋ฌด์กฐ๊ฑด ์ฌ๋ ๊ฒ๋ ์๋๊ณ <br>
          ๋น์ธ๋ค๊ณ  ๋ฌด์กฐ๊ฑด ์์ฌ๋ ๊ฒ ๋ํ ์๋๋ค.<br>
          <br>
          ๋์ ์ผํ์ด ์๋<br>
          ์ฐ๋ฆฌ์ ์ผํ์ด ๋  ์ ์๋๋ก.<br>
          <br>
        </p>
        <br>
      </div>
      -->
      <table width="95%" border="0" align="center">
        <tr>
          <td align="center">
            <q-chip style="width:100%; height:20px; text-align:left; margin-top:0px;" color="black" tag dense pointing="down">
              &nbsp;์ ํ๋ธ ๋์์ ๋ฑ๋ก
            </q-chip>
          </td>
        </tr>
      </table>

      <table width="90%" border="0" align="center">
        <tr>
          <td colspan="2">
            <q-input id="videoUrlOriginal" v-model.trim="contentsVo.video_url_original" stack-label="์ ํ๋ธ ๋์์ ์ฃผ์" color="white" inverted-light clearable />
            <input type="hidden" v-model="contentsVo.video_cd">
            <input type="hidden" v-model="contentsVo.video_url">
            <br>
          </td>
        </tr>
        <tr>
          <td colspan="2" align="center">
            <q-btn icon="done" :loading="loading" :percentage="percentage" color="primary" @click="checkForm" style="width:50%;" outline rounded>
              &nbsp;&nbsp;&nbsp;&nbsp;๋ฑ๋กํ๊ธฐ
              <span slot="loading">
                <q-spinner-oval class="on-left" />
                ๋ฑ๋ก์ค...&nbsp;&nbsp;&nbsp;
              </span>
            </q-btn>
            <br>
          </td>
        </tr>
      </table>
      <br>

      <table width="95%" border="0" align="center">
        <tr>
          <td align="center">
            <q-chip style="width:100%; height:20px; text-align:left; margin-top:0px;" color="black" tag dense pointing="down">
              &nbsp;์ด๋ฒคํธ ๋ด์ฉ
            </q-chip>
          </td>
        </tr>
      </table>

      <table width="90%" border="0" align="center">
        <tr>
          <td>
            ์ผ๋ช, '<b>๋ฐฑ์๋</b>' ์ด๋ฒคํธ!<br><br>
            ์ ํ๋ธ ๋์์ ๋งํฌ๋ฅผ ๋ฑ๋ก๋ง ํ๋ฉด<br><br>
            <font color="red">๋งํฌ 1๊ฐ๋น ๐ฏ์๋์ฉ ๋ณด์์ด! ๐</font><br>
            <br>
          </td>
        </tr>
      </table>

      <table width="95%" border="0" align="center">
        <tr>
          <td align="center">
            <q-chip style="width:100%; height:20px; text-align:left; margin-top:0px;" color="black" tag dense pointing="down">
              &nbsp;์ฐธ์ฌ ๋ฐฉ๋ฒ
            </q-chip>
          </td>
        </tr>
      </table>

      <table width="90%" border="0" align="center">
        <tr>
          <td>
            โ  ์ ํ๋ธ์์ ๋์์์ '<font color="red">๊ณต์ </font>'๋ฅผ ๋๋ฅด๊ณ <br>
            <br>โก '<font color="red">์ฃผ์ ๋ณต์ฌ</font>'๋ฅผ ์ ํํ ํ<br>
            <br>โข ์ '์ ํ๋ธ ๋์์ ์ฃผ์'์ <font color="red">๋ถ์ฌ๋ฃ๊ธฐ</font>.<br>
            <br>โฃ <font color="red">๋ฑ๋กํ๊ธฐ</font>. ๋! &nbsp; ๐ฏ์๋ ๊ฒ!!!<br><br>
          </td>
        </tr>
      </table>

      <table width="95%" border="0" align="center">
        <tr>
          <td align="center">
            <q-chip style="width:100%; height:20px; text-align:left; margin-top:0px;" color="black" tag dense pointing="down">
              &nbsp;๊ธฐํ
            </q-chip>
          </td>
        </tr>
      </table>

      <table width="90%" border="0" align="center">
        <tr>
          <td>
            ์์๊ณผ ๋ณด์์ด ์๋<br>
            ์ผํ์ ๋ดํจ๋ฌ๋ค์ ๋ฉํ์ต์ค.<br>
            ์ด์ ๋ ์ผํ๋ ์คํ ๋ฆฌ๋ท!<br>
            <br>
            <q-btn color="primary" @click="goIntroduce" style="width:120px;" size="sm" rounded><font size="3">์๋ํ๊ฐ๋ก </font></q-btn>
            <br>
            <br>
            <font size="2" color="grey">โป ์๋๋ ๋ฉํ์ต์ค์ ์บ์๋ก, 100์๋๋ 100์๊ณผ ๊ฐ์ต๋๋ค.</font><br>
            <font size="2" color="grey">โป ๋ชฉํ ๋ณด์๊ธ์ก ์์ง ์ ์กฐ๊ธฐ์ข๋ฃ๋  ์ ์์ต๋๋ค.</font><br><br>
          </td>
        </tr>
      </table>

      <table width="90%" border="0" align="center">
        <tr>
          <td align="center" width="50%">
            <q-btn color="primary" icon="play_arrow" @click="showYoutube" outline style="width:100%;">&nbsp;&nbsp;&nbsp;์ ํ๋ธ ๋ฐฉ๋ฌธ</q-btn>
          </td>
          <td align="center" width="50%">
            <q-btn color="primary" icon="share" @click="copyUrl" outline style="width:100%;">&nbsp;&nbsp;&nbsp;๊ณต์ ํ๊ธฐ</q-btn>
          </td>
        </tr>
        <tr>
          <td colspan="2" align="left">&nbsp;</td>
        </tr>
      </table>

      <!--
      <table width="90%" border="0" align="center">
        <tr>
          <td colspan="2" align="left">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2" align="center"><a @click="getApp('android')"><img src="statics/images/btn/bt_googleplay.png"></a></td>
        </tr>
        <tr>
          <td colspan="2" align="left"></td>
        </tr>
        <tr>
          <td colspan="2" align="center"><a @click="getApp('ios')"><img src="statics/images/btn/bt_appstore.png"></a></td>
        </tr>
      </table>
      -->
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>

      <!-- ์ฌ์์์ ๋ณด -->
      <q-collapsible>
        <!-- ์ ๋ชฉ -->
        <template slot="header">
          <q-chip color="black" small class="q-mr-sm"><font size="1">์ฌ์์์ ๋ณด</font></q-chip>
          <q-item-main label="" />
          <q-item-side right>
            <!-- <font size="1">๋ณด๊ธฐ</font> -->
          </q-item-side>
        </template>
        <!-- ๋ด์ฉ -->
        <table width="100%" align="center" border="0">
          <!--
          <tr>
            <td align="left" colspan="5" width="60"><img src="statics/images/oneon/oneonlogo.png" style="width:40px;"></td>
          </tr>
          -->
          <tr>
            <td align="left" colspan="5">
              <font size="1" color="black"><b>์ฃผ์ํ์ฌ ํด๋ ์ด์คํ</b></font><br>
              <font size="1" color="grey">
                (04206) ์์ธํน๋ณ์ ๋งํฌ๊ตฌ ๋งํฌ๋๋ก 196 1707ํธ<br>
                ๋ํ์ด์ฌ : ์์๋ | metashopse@gmail.com<br>
                ํต์ ํ๋งค์์ ๊ณ  :2022-์์ธ๋งํฌ-1213<br>
                ์ฌ์์๋ฑ๋ก๋ฒํธ : 139-87-02383 &nbsp;<a @click="goBusinessInfo"><b>์ฌ์์์ ๋ณดํ์ธ</b></a><br>
                ๊ณ ๊ฐ์ผํฐ :010-9394-1941 | ์ด๋ฉ์ผ : metashopse@gmail.com<br>
                <a @click="showTermOfService"><b>์ด์ฉ์ฝ๊ด</b></a>&nbsp;
                <a @click="showPersonalInfoPolicy"><b>๊ฐ์ธ์ ๋ณด์ฒ๋ฆฌ๋ฐฉ์นจ</b></a>&nbsp;
                <!-- <a @click="goTerms"><b>์ฝ๊ด ๋ฐ ์ ์ฑ</b></a> -->
              </font>
            </td>
          </tr>
          <tr>
            <td colspan="5" align="left">
              <font size="1" color="grey">
                <!-- (์ฃผ)ํด๋ ์ด์คํ๋ ํต์ ํ๋งค์ค๊ฐ์๋ก์ ์คํ๋ง์ผ metashopse.com์ ๊ฑฐ๋๋น์ฌ์๊ฐ ์๋๋ฉฐ, ํ๋งค์๊ฐ ๋ฑ๋กํ ์ํ์ ๋ณด ๋ฐ ๊ฑฐ๋์ ๋ํด ์ผ์ฒด ์ฑ์์ ์ง์ง ์์ต๋๋ค. -->
              </font>
            </td>
          </tr>
          <tr>
            <td colspan="5">&nbsp;</td>
          </tr>
          <tr>
            <td align="center" colspan="5" width="60">
              <!-- KB์์คํฌ๋ก ์ด์ฒด ์ธ์ฆ๋งํฌ -->
              <img src="http://img1.kbstar.com/img/escrow/escrowcmark.gif" @click="onPopKBAuthMark" style="width:30px;" />
              &nbsp;
              <!-- ์ด๋์์ค ์ธ์ฆ๋งํฌ -->
              <img src="statics/images/logo/ini_pay.png" style="width:30px;" />
            </td>
          </tr>
        </table>
      </q-collapsible>
      <!-- <q-card-separator /> -->
      <br>
      <!-- ์ ์๊ถ -->
      <table width="100%" align="center" border="0">
        <tr>
          <td align="center">
            <font size="1" color="grey">
              Copyright ยฉ OneOn Inc. All Rights Reserved.
            </font>
          </td>
        </tr>
      </table>
      <br>
    </div>

  </q-page>
</template>

<style>
</style>

<script>
import Vue from 'vue'

export default {
  name: 'contents-register',
  data () {
    return {
      loading: false,
      percentage: 0,
      contentsVo: {
        seq: '',
        video_cd: 'youtube',
        video_url_original: '',
        video_url: '',
        reg_id: ''
      }
    }
  },
  created: function () {
  },
  methods: {
    checkForm () { // ๋ฑ๋ก ์  ์ ํฉ์ฑ ์ฒดํฌ
      if (this.contentsVo.video_url_original === '') {
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '์ ํ๋ธ ๋์์ ์ฃผ์๋ฅผ ์๋ ฅํด์ฃผ์ธ์.',
          icon: 'notifications_active'
        })
        return
      }

      // ๋์์ ๋งํฌ ์ค์ 
      let originalVideoUrl = this.contentsVo.video_url_original
      if (originalVideoUrl !== '') {
        originalVideoUrl = originalVideoUrl.toString()
        if (originalVideoUrl.indexOf('youtube') > 0 || originalVideoUrl.indexOf('youtu.be') > 0) { // youtube์ธ ๊ฒฝ์ฐ
          let arrUrl = originalVideoUrl.split('/')
          this.contentsVo.video_url = 'https://www.youtube.com/embed/' + arrUrl[arrUrl.length - 1]
          this.contentsVo.video_cd = 'youtube'
        } else {
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '์ ํ๋ธ ๋์์ ์ฃผ์๋ง ๋ฑ๋กํด์ฃผ์ธ์.',
            icon: 'notifications_active'
          })
          return
        }
      }

      // ๋ก๊ทธ์ธ ์ฒดํฌ
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        // ์ฟ ํค์ ๋์์ฌ ํจ์ค ์ ์ฅ
        this.$cookie.set('LOGIN_REDIRECT_URL', '/add/video', 1)
        this.$refs.loginModal.show()
        return
      }

      // ๋ฑ๋ก ์ฒ๋ฆฌ ์์
      this.insertContents()
    },
    insertContents () {
      this.loading = true

      // ์ปจํ์ธ  ๋ฑ๋ก
      this.$axios({
        url: this.$store.state.apiServerIp + '/api/contents/insertContents',
        method: 'POST',
        data: this.contentsVo })
        .then((result) => {
          this.loading = false // ๋ฑ๋ก ๋ฒํผ ์ก์ ์ค๋จ
          this.$q.notify({
            color: 'blue',
            position: 'top',
            message: '๋ฑ๋ก๋์์ต๋๋ค.',
            icon: 'notifications_active'
          })
          this.$router.push('/menu/event') // ์ด๋ฒคํธ ๋ฆฌ์คํธ๋ก ์ด๋
        })
        .catch((err) => {
          console.log(err)
          // this.$q.notify(err)
          this.loading = false // ๋ฑ๋ก ๋ฒํผ ์ก์ ์ค๋จ
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '๋ฑ๋ก์ ์คํจํ์ต๋๋ค. ๋ค์ ์๋ํด์ฃผ์ธ์.',
            icon: 'notifications_active'
          })
        })
    },
    // โ  ๋ก๊ทธ์ธ ์ฝ๋ฐฑ
    callbackLogin () {
      // ๋ก๊ทธ์ธ ํ ์ก์
      // ๋ฑ๋ก ์ฒ๋ฆฌ ์์
      this.insertContents()
    },
    // ์ ํ๋ธ ๋งํฌ
    showYoutube () {
      if (this.$store.state.device === 'android') {
        window.open('intent://m.youtube.com#Intent;scheme=http;package=com.google.android.youtube;end', '_blank')
      } else if (this.$store.state.device === 'ios') {
        try {
          window.open('youtube://m.youtube.com', '_blank')
        } catch (e) {
          window.open('https://m.youtube.com', '_blank')
        }
      } else {
        window.open('https://m.youtube.com', '_system', 'location=yes,footer=yes')
      }
    },
    getApp (os) {
      if (os === 'android') {
        window.open('https://play.google.com/store/apps/details?id=kr.oneon.sellerz')
      } else {
        window.open('https://apps.apple.com/kr/app/ec-9b-90-eb-8d-94-ec-83-b5/id1462604983')
      }
    },
    goIntroduce () {
      this.$router.push('/menu/introduce')
    },
    // ํด๋ฆฝ์ํธ๋ก ๋ณต์ฌํ๊ธฐ
    copyUrl () {
      this.$copyText('https://metashopse.com/event1').then(function (e) {
        console.log(e)
        // alert('๋งํฌ๋ฅผ ํด๋ฆฝ๋ณด๋์ ๋ณต์ฌํ์ต๋๋ค.')
      }, function (e) {
        console.log(e)
        alert('๋ณต์ฌ ์คํจ')
      })
      this.$q.notify({
        color: 'blue',
        position: 'top',
        message: '์ฃผ์๋ฅผ ํด๋ฆฝ๋ณด๋์ ๋ณต์ฌํ์ต๋๋ค.',
        icon: 'notifications_active'
      })
    },
    // ๊ฐ์ธ์ ๋ณด์ฒ๋ฆฌ๋ฐฉ์นจ
    showPersonalInfoPolicy () {
      this.$refs.personalInfoPolicyModal.show()
    },
    // ์๋น์ค ์ด์ฉ ์ฝ๊ด
    showTermOfService () {
      this.$refs.termOfServiceModal.show()
    },
    // ์ฌ์์์ ๋ณดํ์ธ
    goBusinessInfo () {
      /*
      this.$refs.redirectModal.title = '์ฌ์์์ ๋ณด'
      this.$refs.redirectModal.url = this.$store.state.BUSINESS_SITE_INFO
      this.$refs.redirectModal.icon = 'play_arrow'
      this.$refs.redirectModal.show()
      */
      window.open(this.$store.state.BUSINESS_SITE_INFO, '_system')
    },
    // KB๊ตญ๋ฏผ์ํ ์์คํฌ๋ก ํ์ธ
    onPopKBAuthMark () {
      this.$refs.redirectModal.title = '์์คํฌ๋ก'
      this.$refs.redirectModal.url = 'http://escrow1.kbstar.com/quics?page=B009111&cc=b010807:b008491&mHValue=ad1485447ff247d7f537f7db37de7148201905261237657'
      this.$refs.redirectModal.icon = 'play_arrow'
      this.$refs.redirectModal.show()
    },
    // ์ฝ๊ด ๋ฐ ์ ์ฑ
    goTerms () {
      // this.$router.push('/terms')
    },
    goBack () {
      // ๋ก๊ทธ์ธ ์ฒดํฌ
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        // ์ฟ ํค์ ๋์์ฌ ํจ์ค ์ ์ฅ
        this.$cookie.set('LOGIN_REDIRECT_URL', '/add/video', 1)
        this.$refs.loginModal.show()
        return
      }

      try {
        // ๋ผ์ฐํฐ ๋ฐฑ ํจ์ค ์ค์ 
        let path = this.$store.state.ROUTER_FROM_PATH[this.$store.state.ROUTER_FROM_PATH.length - 1]
        // ๋ผ์ฐํฐ ๋ฐฑ ํจ์ค 1๊ฐ ์ญ์ 
        this.$store.state.ROUTER_FROM_PATH.splice(this.$store.state.ROUTER_FROM_PATH.length - 1, 1)
        // ๋ค๋ก๊ฐ๊ธฐ ์ฌ๋ถ - true์ผ ๊ฒฝ์ฐ ๋ผ์ฐํฐ ํจ์ค๋ฅผ ์ ์ฅ ์ํจ, goBack() ํจ์ ๋ด์์ true๋ก ์ค์ , ๋ผ์ฐํฐ์์ false๋ก ์ด๊ธฐํ
        this.$store.state.ROUTER_IS_MOVE_BACK = true
        // ๋ผ์ฐํฐ ๋ฐฑ ํจ์ค๋ก ์ด๋
        this.$router.push(path)
      } catch (e) {
        this.$router.push('/menu/event')
      }
    }
  }
}
</script>
<style>
</style>
