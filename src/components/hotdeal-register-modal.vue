<template>
  <q-modal v-model="hotdealRegisterModal" :content-css="{minWidth: '30%', minHeight: '85%'}">

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <!-- <q-btn flat round dense icon="grade" /> -->
        <q-toolbar-title>๐ฅ ํซ๋ ๋ฑ๋ก</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <!-- ์ํ ์ ๋ณด -->
      <div align="center" style="width: 100%">
        <q-list style="width: 90%; padding:5px 10px 5px 10px">
          <q-item style="padding:0px 0px 0px 0px">
            <table border="0" style="width: 100%">
              <tr>
                <td width="20%" align="left"><img :src="productVo.image_url" style="width:50px; height:50px; object-fit:cover; border-radius: 3px;"></td>
                <td width="80%"><font size="2" color="black">{{ productVo.title }}<br>{{ productVo.subtitle }}</font></td>
              </tr>
              <tr>
                <td align="left"></td>
                <td align="right">
                  <font size="2" color="black">ํ๋งค๊ฐ : </font>
                  &nbsp;&nbsp;&nbsp;
                  <font size="2" color="black">{{ addComma(productVo.price) }}&nbsp;์</font>
                </td>
              </tr>
            </table>
          </q-item>
        </q-list>
      </div>
      <br>

      <!-- ๋ฑ๋ก ์ ๋ณด -->
      <div>
        <table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td><q-btn color="black" size="xs" style="width:120px;"><font size="3">์ ์ฒญ ์ ๋ณด</font></q-btn></td>
            <td><font size="2"></font></td>
          </tr>
        </table>
      </div>
      <table align="center" border="0" width="90%">
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
        <tr>
          <td width="35%"><font size="3">ํซ๋ ์์์ผ</font></td>
          <td align="left">
            <q-select v-model="hotdealVo.start_date" :options="startDateOptions" @input="startDateChangedHandler" />
          </td>
        </tr>
        <tr>
          <td colspan="3"></td>
        </tr>
        <tr>
          <td colspan="3"></td>
        </tr>
        <tr>
          <td><font size="3">ํซ๋ ์ข๋ฃ์ผ</font></td>
          <td align="left">
            <q-select v-model="hotdealVo.end_date" :options="endDateOptions" style="width:180px;" hide-underline readonly="" />
          </td>
        </tr>
        <tr>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td><font size="3" color="">์๊ธ์ก</font></td>
          <td align="left">
            <q-input v-model.trim="hotdealVo.total_price" type="number" align="right" suffix="0000" inverted style="width:150px;" clearable />
          </td>
        </tr>
        <tr>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td colspan="2">
            <font size="1" color="grey">
              โป ์ฌ์์๋ ์ธ๊ธ๊ณ์ฐ์ ๋ฐํ์ ์ํด 'ํ๋งค์ ์ ๋ณด' ๋ฉ๋ด์์<br>์ฌ์์๋ฑ๋ก๋ฒํธ, ์ํธ, ๋ํ์๋ช, ์ฌ์์ฅ์ฃผ์, ์ํ, ์ข๋ชฉ, ์ด๋ฉ์ผ์ ๊ผญ ๋ฑ๋กํด์ฃผ์ธ์.
            </font>
          </td>
        </tr>
      </table>
      <br>

      <!-- ์๊ธ ์ ๋ณด -->
      <div>
        <table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td><q-btn color="black" size="xs" style="width:120px;"><font size="3">์๊ธ ์ ๋ณด</font></q-btn></td>
            <td align="right"><font size="2" color="grey">โป ์๊ธ์๋ช ํ์ธ&nbsp;&nbsp;</font></td>
          </tr>
        </table>
      </div>
      <table align="center" border="0" style="width:90%">
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
        <tr>
          <td align="left" width="35%"><font size="3">์ํ</font></td>
          <td align="left" colspan="2"><font size="3">{{ hotdealVo.bank_nm }}</font></td>
        </tr>
        <tr>
          <td align="left"><font size="3">๊ณ์ข๋ฒํธ</font></td>
          <td align="left" colspan="2"><font size="3">{{ hotdealVo.bank_acct_no }}</font></td>
        </tr>
        <tr>
          <td align="left"><font size="3">์๊ธ์ฃผ๋ช</font></td>
          <td align="left" colspan="2"><font size="3" color="black">{{ hotdealVo.bank_acct_nm }}</font></td>
        </tr>
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
        <tr>
          <td align="left"><font size="3"><b>์๊ธ์๋ช</b></font></td>
          <td align="left" colspan="2"><font size="3" color="black"><b>{{ hotdealVo.seller_name }}</b></font></td>
        </tr>
      </table>
      <br>

      <!-- ํซ๋ ์ ๋ณด -->
      <div>
        <table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td><q-btn color="black" size="xs" style="width:120px;"><font size="3">ํซ๋ ์ ๋ณด</font></q-btn></td>
            <td align="right"><font size="2" color="grey">&nbsp;&nbsp;</font></td>
          </tr>
        </table>
      </div>
      <table align="center" border="0" style="width:90%">
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
        <!--
        <tr>
          <td align="left" width="35%"><font size="2">๊ตฌ์ข์</font></td>
          <td align="left" colspan="2"><font size="2">๋ฌด์ ํ</font></td>
        </tr>
        <tr>
          <td align="left"><font size="2">๊ตฌ๋งค๋ฐฉ์</font></td>
          <td align="left" colspan="2"><font size="2">๋น๋ฉ</font></td>
        </tr>
        -->
        <tr>
          <td align="left"><font size="2">๊ด๊ณ ๋น(์์๊ฐ)</font></td>
          <td align="left" colspan="2"><font size="2" color="black"><b>10,000์</b> (VATํฌํจ)</font></td>
        </tr>
        <!--
        <tr>
          <td align="left"><font size="2">์์ฐฐ๊ธ์ก ๋จ์</font></td>
          <td align="left" colspan="2"><font size="2" color="black"><b>10,000์</b></font></td>
        </tr>
        -->
        <tr>
          <td align="left"><font size="2">์๋น์ค๊ธฐ๊ฐ</font></td>
          <td align="left" colspan="2"><font size="2" color="black"><b>1์ฃผ</b> (๋งค์ฃผ ์์์ผ ~ ์ผ์์ผ)</font></td>
        </tr>
        <tr>
          <td align="left"><font size="2">๋ธ์ถ๋ฐฉ์</font></td>
          <td align="left" colspan="2"><font size="2" color="black"><b>๊ฐ๊ฒฉ์ ์ ๋ ฌ</b> (์ต๊ณ ๊ฐ ์ต์๋จ)</font></td>
        </tr>
        <tr>
          <td align="left"><font size="2"></font></td>
          <td align="left" colspan="2"><font size="2" color="black">๋์์๋ <b>์ ์ฒญ์ ์ ๋ ฌ</b></font></td>
        </tr>
        <tr>
          <td align="left"><font size="2">์๊ธ๊ธฐํ</font></td>
          <td align="left" colspan="2"><font size="2" color="black">ํซ๋ ์์์ผ 2์ผ์ </font></td>
        </tr>
      </table>
      <br>

      <!-- ๊ธฐํ ์ ๋ณด -->
      <!--
      <div class="row justify-left">
        <table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td><q-btn color="black" size="xs" style="width:120px;"><font size="2">๊ธฐํ</font></q-btn></td>
            <td align="right"><font size="2" color="grey">์์ฐฐ๊ธ ๋ฐํ&nbsp;&nbsp;</font></td>
          </tr>
        </table>
      </div>
      <table align="center" border="0" style="width:90%">
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
        <tr>
          <td align="left" colspan="3">
            <font size="2">
              ๋์ฐฐ์ ์ธ ์์ฐฐ์์ ์์ฐฐ๊ธ์ ์๋๋ก ์๋ ์ถฉ์ ๋๋ฉฐ<br>
              <b>์ถ๊ธ</b> ๋ฉ๋ด์์ ์ธ์ ๋ ์ง ์ถ๊ธ ์ ์ฒญ ๊ฐ๋ฅํฉ๋๋ค.<br><br>
              <q-breadcrumbs color="black" active-color="black">
                <q-breadcrumbs-el label="๋ฉ๋ด" icon="menu" />
                <q-breadcrumbs-el label="๊ด๊ณ ๋ฉ๋ด" icon="share" />
                <q-breadcrumbs-el label="์ถ๊ธ" icon="save_alt" />
              </q-breadcrumbs>
            </font>
            <q-stepper-navigation>
              <q-btn class="q-ml-sm" color="primary" @click="goRewardWithdraw()" size="sm" outline>๋ฐ๋ก๊ฐ๊ธฐ</q-btn>
            </q-stepper-navigation>
          </td>
        </tr>
      </table>
      <br>
      -->

      <q-toolbar color="white" >
        <q-btn :loading="loading" :percentage="percentage" color="primary" @click="requestHotdeal" icon="done" style="width:100%; height:45px;">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ํซ๋ ์ ์ฒญ
          <span slot="loading">
            <q-spinner-oval class="on-left" />
            ์ ์ฒญ์ค...
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

export default {
  // name: 'mystore',
  data () {
    return {
      type: '', // insert: ๋ฑ๋ก, update: ์์ 
      // index: '', // ๋ฐฐ์ก๊ด๋ฆฌ ํ์ ์ฝ๋ฐฑ์ฒ๋ฆฌ์ ์ฃผ๋ฌธ์ ๋ณด ๊ฐฑ์ ์ ์ฌ์ฉ
      loading: false,
      percentage: 0,
      readonlyFlag: false,
      productVo: {}, // ์ํ ์ ๋ณด
      hotdealVo: {
        total_price: null,
        bank_nm: 'KB๊ตญ๋ฏผ์ํ',
        bank_acct_no: '055201-04-230453',
        bank_acct_nm: '์ฃผ์ํ์ฌ ํด๋ ์ด์คํ',
        seller_name: this.$store.state.sellerVo.seller_name
      }, // ํซ๋ ์ ๋ณด
      startDateOptions: [], // ํซ๋ ์์์ผ ๋ฐฐ์ด - ์ฝค๋ณด๋ฐ์ค
      endDateOptions: [], // ํซ๋ ์์์ผ ๋ฐฐ์ด - ์ฝค๋ณด๋ฐ์ค
      hotdealRegisterModal: false
    }
  },
  created: function () {
  },
  mounted: function () {
  },
  methods: {
    show () {
      // ์ผ์ฃผ์ผ ํ ์์์ผ ๋ ์ง ๊ตฌํ๊ธฐ
      this.startDateOptions = [] // ํซ๋ ์์์ผ ์ต์ ๋ฆฌ์คํธ ์ด๊ธฐํ
      this.endDateOptions = [] // ํซ๋ ์ข๋ฃ์ผ ์ต์ ๋ฆฌ์คํธ ์ด๊ธฐํ
      let now = new Date()
      /*
      let nextMonday1 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (8 - now.getDay()))
      let nextMonday2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (15 - now.getDay()))
      let nextMonday3 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (22 - now.getDay()))
      let nextMonday4 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (29 - now.getDay()))
      */
      for (let w = 1; w < 5; w++) { // 4์ฃผ์น ์ ๋ณด(1๊ฐ์) ์ค์ 
        let nextStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + ((1 + (7 * w)) - now.getDay()))
        let nextEndtDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + ((7 + (7 * w)) - now.getDay()))

        let startDateOption = {}
        let endDateOption = {}

        // ๋ ์ด๋ธ - ํ๋ฉด ํ์ ๋ ์ง
        startDateOption.label = nextStartDate.getFullYear() + '๋ ' + (nextStartDate.getMonth() + 1) + '์ ' + nextStartDate.getDate() + '์ผ '
        endDateOption.label = nextEndtDate.getFullYear() + '๋ ' + (nextEndtDate.getMonth() + 1) + '์ ' + nextEndtDate.getDate() + '์ผ '

        // ๋ ์ง DATA - DB ์ ์ฅ์ฉ
        startDateOption.value = this.getYYYYMMDD(nextStartDate)
        endDateOption.value = this.getYYYYMMDD(nextEndtDate)

        this.startDateOptions.push(startDateOption)
        this.endDateOptions.push(endDateOption)
      }

      this.hotdealRegisterModal = true
    },
    // yyyyMMdd ํฌ๋งท์ผ๋ก ๋ฐํ
    getYYYYMMDD (date) {
      let year = date.getFullYear() // yyyy
      let month = (1 + date.getMonth()) // M
      month = month >= 10 ? month : '0' + month // MM
      let day = date.getDate() // d
      day = day >= 10 ? day : '0' + day // dd
      return year + '' + month + '' + day
    },
    // ํซ๋์์์ผ ๋ณ๊ฒฝ ์ด๋ฒคํธ ์ฒ๋ฆฌ
    startDateChangedHandler () {
      // alert(this.hotdealVo.start_date)
      if (this.hotdealVo.start_date != null && this.hotdealVo.start_date !== '') {
        // ์ ํ๋ ์ธ๋ฑ์ค ์ฐพ์์ ํซ๋ ์ข๋ฃ์ผ ์ค์ 
        for (let i = 0; i < this.startDateOptions.length; i++) { // ํซ๋ ์์์ผ ๊ฐฏ์๋งํผ ๋ฐ๋ณต
          if (this.startDateOptions[i].value === this.hotdealVo.start_date) { // ์ ํ๋ ๋ ์ง์ ๊ฐ์ผ๋ฉด
            // ํซ๋ ์ข๋ฃ์ผ๋ ํด๋น ์ธ๋ฑ์ค๋ก ์ค์  -> ์ฒ์๋ถ์ฒ ์ข๋ฃ์ผ์ ์์์ผ + 6์ผ ๋ก ๋ง์ถฐ๋จ๊ธฐ ๋๋ฌธ์ ์ธ๋ฑ์ค๋ง ๊ฐ์ผ๋ฉด ๋จ
            this.hotdealVo.end_date = this.endDateOptions[i].value
            break
          }
        }
      }
    },
    // ํซ๋ ์ ์ฒญ
    requestHotdeal () {
      // ์ ํฉ์ฑ ์ฒดํฌ
      if (this.hotdealVo.start_date == null || this.hotdealVo.start_date === '' || // ํซ๋ ์์์ผ
          this.hotdealVo.end_date == null || this.hotdealVo.end_date === '') { // ํซ๋ ์ข๋ฃ์ผ
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: 'ํซ๋ ์์์ผ์ ์ ํํด์ฃผ์ธ์.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.hotdealVo.total_price == null || this.hotdealVo.total_price === '') { // ์๊ธ์ก
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '์๊ธ์ก์ ์๋ ฅํด์ฃผ์ธ์.',
          icon: 'notifications_active'
        })
        return
      }

      // ์ํ์์ปจ์ค ์ค์ 
      this.hotdealVo.seq_product = this.productVo.seq

      this.loading = true
      // ํซ๋ ๋ฑ๋ก
      this.$axios.post(this.$store.state.apiServerIp + '/api/hotdeal/insertHotdeal', this.hotdealVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.loading = false
          if (result.data > 0) {
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: 'ํซ๋์ด ์ ์ฒญ๋์์ต๋๋ค.',
              icon: 'notifications_active'
            })
          } else {
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: '์ ์ฒญ์ ์คํจํ์ต๋๋ค. ํญ๋ชฉ์ ํ์ธํด์ฃผ์ธ์.',
              icon: 'notifications_active'
            })
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '์ ์ฒญ์ ์คํจํ์ต๋๋ค. ๋ค์ ์ ์ฒญํด์ฃผ์ธ์.',
            icon: 'notifications_active'
          })
        })
    },
    addComma (num) {
      return Vue.prototype.$addComma(num)
    },
    // ์ถ๊ธ ํ๋ฉด์ผ๋ก ์ด๋
    goRewardWithdraw () {
      this.$router.push('/menu/rewardWithdraw')
    },
    close () {
      this.hotdealRegisterModal = false
    }
  }
}
</script>
