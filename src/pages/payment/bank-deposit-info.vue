<template>
  <q-page class="">
    <q-layout-header>
      <q-toolbar
        color="black"
        inverted
      >
        <q-btn flat round dense icon="accessibility_new" />
        <q-toolbar-title>무통장입금정보</q-toolbar-title>
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
          <td align="left"><font size="3" color="black"><b>국민은행</b></font></td>
        </tr>
        <tr>
          <td align="left"><font size="3" color="black"><b>계좌번호</b></font></td>
          <td align="left"><font size="3" color="black"><b>055201-04-230453</b></font></td>
        </tr>
        <tr>
          <td align="left"><font size="3" color="black"><b>예금주명</b></font></td>
          <td align="left"><font size="3" color="black"><b>주식회사 클레이스타</b></font></td>
        </tr>
        <tr>
          <td align="left"><font size="3" color="black"><b>주문금액</b></font></td>
          <td align="left"><font size="3" color="red"><b>{{ addComma(bankVo.p_amt) }} 원</b></font></td>
        </tr>
        <tr>
          <td align="left"><font size="3" color="black"><b>입금자명</b></font></td>
          <td align="left"><font size="3" color="black"><b>{{ bankVo.p_uname }}</b></font></td>
        </tr>
        <tr>
          <td align="left"><font size="3" color="black"><b>입금기한</b></font></td>
          <td align="left"><font size="3" color="black"><b>{{ bankVo.p_exp_dt }} 까지</b></font></td>
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
      tid: '',
      bankVo: { // 계좌정보
        p_vacct_no: '', // 계좌번호
        p_exp_dt: '' // 입금기한
      },
      ordersVo: []
    }
  },
  components: {
  },
  created: function () {
    console.log('■■■■■ bank-deposit-info.vue created! ■■■■■')
    // this.bankVo = {} // 계좌정보 초기화

    // let totalPrice = this.$route.query.totalPrice
    let fromCartFlag = this.$route.query.fromCartFlag

    this.$axios.get(this.$store.state.apiServerIp + '/api/payment/getOrdersInfoFromSession')
      .then((result) => {
        // console.log(JSON.stringify(result.data))
        this.ordersVo = result.data // 세션에 저장된 주문 정보
        this.ordersVo.tid = this.ordersVo.order_no // 주문번호 설정

        this.tid = this.ordersVo.order_no // 주문번호 설정

        // 장바구니에서 주문한 경우 - 장바구니에서 해당 상품 리스트 삭제
        if (fromCartFlag) {
          // 장바구니에서 주문상품 리스트 삭제 처리
          this.$axios.post(this.$store.state.apiServerIp + '/api/cart/deleteCartProductList', this.ordersVo.orderProductList)
            .then((result) => {
              // console.log(JSON.stringify(result.data))
            })
            .catch((err) => {
              console.log(err)
            })
        }

        // 계좌정보 등록
        this.$axios.post(this.$store.state.apiServerIp + '/api/payment/insertBankInfo', this.ordersVo)
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            // ■ 주문정보 등록
            this.ordersVo.status = this.$store.state.ORDER_STATUS_PAYMENT_WAIT // 입금대기(00)
            this.$axios.post(this.$store.state.apiServerIp + '/api/orders/insertOrders', this.ordersVo)
              .then((result) => {
                // console.log(JSON.stringify(result.data))
              })
              .catch((err) => {
                console.log(err)
                this.$q.notify({
                  color: 'grey',
                  position: 'left',
                  message: '주문에 실패했습니다. 다시 주문해주세요.(E03)',
                  icon: 'notifications_active'
                })
              })
          })
          .catch((err) => {
            console.log(err)
            this.$q.notify({
              color: 'grey',
              position: 'left',
              message: '계좌정보 등록 실패',
              icon: 'notifications_active'
            })
          })
      })
      .catch((err) => {
        console.log(err)
        this.$q.notify({
          color: 'grey',
          position: 'left',
          message: '주문에 실패했습니다. 다시 주문해주세요.(E06)',
          icon: 'notifications_active'
        })
      })
  },
  mounted: function () {
    this.$q.loading.show() // 로딩 표시 시작
    // 계좌정보를 수신할때까지 반복
    // 추가 : 10초가 경과하면 강제종료
    let stopCount = 0
    this.selectVbankInfoInterval = setInterval(() => {
      // 계좌정보가 수신 되었을 경우 반복 종료
      if (this.bankVo !== '' && this.bankVo.p_vacct_no !== '') {
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
      // 계좌 정보 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/payment/selectVbankInfo', {params: {tid: this.tid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.bankVo = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    }, 300)
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
