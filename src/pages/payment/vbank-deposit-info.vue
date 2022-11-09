<template>
  <q-page class="">
    <q-layout-header>
      <q-toolbar
        color="black"
        inverted
      >
        <q-btn flat round dense icon="accessibility_new" />
        <q-toolbar-title>입금정보</q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <div>
      <br>
      <br>
      <table align="center" border="0" width="100%">
        <tr>
          <td align="center">
            <img src="statics/images/logo/logolp.gif" style="width:250px;">
          </td>
        </tr>
      </table>
    </div>
    <div class="text-center" style="width: 100%;">
      <!--
      <p>
        <img src="statics/images/ad/ad2.gif" style="width:90%;">
      </p>
       -->
      <br>
      <table width="100%" border="0" align="center">
        <thead>
          <th width="10%"></th>
          <th width="100"></th>
          <th></th>
        </thead>
        <tr>
          <td colspan="3"><font size="3" color="green"><b>아래 정보로 입금하시면 주문이 완료됩니다.</b></font></td>
        </tr>
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
        <tr>
          <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td rowspan="6"></td>
          <td align="left"><font size="3" color="black"><b>입금은행</b></font></td>
          <td align="left"><font size="3" color="black"><b>{{ vbankVo.bank_nm }}</b></font></td>
        </tr>
        <tr>
          <td align="left"><font size="3" color="black"><b>계좌번호</b></font></td>
          <td align="left"><font size="3" color="black"><b>{{ vbankVo.p_vacct_no }}</b></font></td>
        </tr>
        <tr>
          <td align="left"><font size="3" color="black"><b>예금주명</b></font></td>
          <td align="left"><font size="3" color="black"><b>(주)클레이스타</b></font></td>
        </tr>
        <tr>
          <td align="left"><font size="3" color="black"><b>주문금액</b></font></td>
          <td align="left"><font size="3" color="red"><b>{{ addComma(vbankVo.p_amt) }} 원</b></font></td>
        </tr>
        <tr>
          <td align="left"><font size="3" color="black"><b>입금자명</b></font></td>
          <td align="left"><font size="3" color="black"><b>{{ vbankVo.p_uname }}</b></font></td>
        </tr>
        <tr>
          <td align="left"><font size="3" color="black"><b>입금기한</b></font></td>
          <td align="left"><font size="3" color="black"><b>{{ vbankVo.p_exp_dt }} 까지</b></font></td>
        </tr>
      </table>
      <br>
      <q-btn color="primary" style="width:90%;" @click="goOrdersList">주문 확인하기</q-btn>
      <br>
      <br>
      <q-btn color="primary" outline style="width:90%;" @click="goBack">메뉴로 돌아가기</q-btn>
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
  </q-page>
</template>

<style>
</style>

<script>
import Vue from 'vue'

export default {
  name: 'vbank-deposit-info',
  data () {
    return {
      selectVbankInfoInterval: '',
      tid: this.$route.query.tid,
      vbankVo: { // 가상계좌정보
        p_vacct_no: '', // 가상계좌번호
        p_exp_dt: '' // 입금기한
      }
    }
  },
  components: {
  },
  created: function () {
    console.log('■■■■■ vbank-deposit-info.vue created! ■■■■■')
    // this.vbankVo = {} // 가상계좌정보 초기화
  },
  mounted: function () {
    this.$q.loading.show() // 로딩 표시 시작
    // 가상계좌정보를 수신할때까지 반복
    // 추가 : 10초가 경과하면 강제종료
    let stopCount = 0
    this.selectVbankInfoInterval = setInterval(() => {
      // 가상계좌정보가 수신 되었을 경우 반복 종료
      if (this.vbankVo !== '' && this.vbankVo.p_vacct_no !== '') {
        this.$q.loading.hide() // 로딩 표시 종료
        clearInterval(this.selectVbankInfoInterval)
        return
      }
      if (stopCount > 10) { // 10초 이상 조회 불가시 반복 종료
        this.$q.loading.hide() // 로딩 표시 종료
        clearInterval(this.selectVbankInfoInterval)
        this.$q.notify({
          color: 'blue',
          position: 'left',
          message: '네트워크 이상. 다시 시도해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      stopCount++ // 10초 이상 조회 불가시 반복 종료
      // 가상계좌 정보 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/payment/selectVbankInfo', {params: {tid: this.tid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.vbankVo = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    }, 500)
  },
  beforeDestroy () {
    clearInterval(this.selectVbankInfoInterval)
  },
  methods: {
    addComma (num) {
      return Vue.prototype.$addComma(num)
    },
    goOrdersList () {
      this.$store.state.doNotBack = true // 뒤로가기시 메인으로 이동하게 함
      this.$router.push('/menu/ordersList') // replace 안먹히는데?
    },
    goBack () {
      this.$router.push('/menu')
    }
  }
}
</script>
