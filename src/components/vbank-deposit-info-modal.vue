
<template>
  <q-modal v-model="vbankDepositInfoModal" position="" :content-css="{minWidth: '40vw', minHeight: '55vh'}">
    <q-modal-layout>

      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense icon="widgets" readonly />
        <q-toolbar-title>입금정보</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <br>
      <table align="center" border="0" width="100%">
        <tr>
          <td align="center">
            <img src="statics/images/logo/logo.png" style="width:150px;">
          </td>
        </tr>
      </table>
      <br>
      <table width="100%" border="0" align="center">
        <thead>
          <th width="10%"></th>
          <th width="100"></th>
          <th></th>
        </thead>
        <tr>
          <td colspan="3" align="center"><font size="3" color="green"><b>아래 정보로 입금하시면 주문이 완료됩니다.</b></font></td>
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
          <td v-if="vbankVo.p_vacct_no === '05520104230453'" align="left"><font size="3" color="black"><b>055201-04-230453</b></font></td>
          <td v-else align="left"><font size="3" color="black"><b>{{ vbankVo.p_vacct_no }}</b></font></td>
        </tr>
        <tr>
          <td align="left"><font size="3" color="black"><b>예금주명</b></font></td>
          <td v-if="vbankVo.p_vacct_no === '05520104230453'" align="left"><font size="3" color="black"><b>주식회사 클레이스타</b></font></td>
          <td v-else align="left"><font size="3" color="black"><b>(주)클레이스타</b></font></td>
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
        <tr>
          <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
        <tr>
          <td colspan="3" align="center"><font size="2" color="grey"><b>입금이 늦어질 경우 상품이 품절될 수 있습니다.</b></font></td>
        </tr>
      </table>
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
      vbankDepositInfoModal: false,
      tid: '', // 거래ID - 주문/배송목록에서 설정 후 호출됨
      vbankVo: { // 가상계좌정보
        p_vacct_no: '', // 가상계좌번호
        p_exp_dt: '' // 입금기한
      }
    }
  },
  created: function () {
  },
  methods: {
    show () {
      this.vbankDepositInfoModal = true

      this.vbankVo = {} // 가상계좌정보 초기화
      this.$q.loading.show() // 로딩 표시 시작

      // tid가 없는 경우 메세지 처리
      if (this.tid == null || this.tid === '') {
        this.$q.notify({
          color: 'primary',
          position: 'left',
          message: '거래ID가 없습니다.',
          icon: 'notifications_active'
        })
      }
      // 가상계좌 정보 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/payment/selectVbankInfo', {params: {tid: this.tid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩 표시 종료
          this.vbankVo = result.data
        })
        .catch((err) => {
          console.log(err)
          this.$q.loading.hide() // 로딩 표시 종료
        })
    },
    addComma (num) {
      return Vue.prototype.$addComma(num)
    },
    close () {
      this.vbankDepositInfoModal = false
    }
  }
}
</script>
