<template>
  <q-page>
  </q-page>
</template>

<style>
</style>

<script>
// import Vue from 'vue'

export default {
  name: 'callback-app-next',
  data () {
    return {
      ordersVo: '' // 세션에 저장된 주문정보 - 결제 성공시 서버에서 조회
    }
  },
  components: {
  },
  created: function () {
    let resultCd = this.$route.query.resultCode // resultCd가 아니라 resultCode임!
    let resultMsg = this.$route.query.resultMsg
    let tid = this.$route.query.tid
    let payType = this.$route.query.payType
    let device = this.$route.query.device
    let seq = this.$route.query.seq
    let fromCartFlag = this.$route.query.fromCartFlag
    // let pVacctNo = this.$route.query.pVacctNo
    // let pExpDt = this.$route.query.pExpDt
    // let pNoti = this.$route.query.pNoti // 결제 시작시 설정한 결제상품상세화면 주소 - 다시 되돌아 가기 위해서
    // 결제 콜백 처리
    this.callbackPayment(resultCd, resultMsg, tid, payType, device, seq, fromCartFlag)
  },
  mounted: function () {
  },
  methods: {
    // 결제 콜백
    callbackPayment (resultCd, resultMsg, tid, payType, device, seq, fromCartFlag) {
      console.log('resultCd: ' + resultCd + ' , resultMsg: ' + resultMsg + ' , tid: ' + tid + ' , payType: ' + payType + ' , device: ' + device)

      if ((resultCd === '00' || resultCd === '0000') && tid !== '' && payType !== '') { // 결제 성공시 처리
        // 결제승인결과 확인
        this.$q.loading.show() // 로딩 표시 시작

        this.$axios.get(this.$store.state.apiServerIp + '/api/payment/getOrdersInfoFromSession')
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.ordersVo = result.data // 세션에 저장된 주문 정보
            this.$axios.get(this.$store.state.apiServerIp + '/api/payment/checkPayIsCompleted', {params: {tid: tid}})
              .then((result) => {
                // console.log('checkPayIsCompleted result.data: ' + JSON.stringify(result.data))
                if (result.data === 0) { // tid에 해당하는 결제성공 건수가 0건이면 이상처리
                  this.$q.loading.hide() // 로딩 표시 종료
                  this.$q.notify({
                    color: 'grey',
                    position: 'left',
                    message: '결제에 실패했습니다. 다시 결제를 진행해주세요.(E02)',
                    icon: 'notifications_active'
                  })
                  // 상품 상세 화면으로 이동
                  this.$router.push('/productDetail?seq=' + seq)
                } else { // 결제 정상처리
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

                  // 가상계좌결제 또는 실시간계좌이체인 경우
                  // 입금정보 화면으로 이동(노티로 수신)
                  if (payType === 'VBANK' || payType === 'VBank') { // 가상계좌결제 - VBANK(Mobile), VBank(PC)
                    // payType === 'DirectBank' || payType === 'iDirectBank') { // 실시간계좌이체(PC) - 바로 처리되는데?
                    this.ordersVo.status = this.$store.state.ORDER_STATUS_PAYMENT_WAIT // 입금대기(00)
                    // ■ 주문정보 등록
                    this.ordersVo.tid = tid // 주문정보에서 가상계좌 입금정보를 조회하기 위해서 거래ID(tid)를 저장
                    this.$axios.post(this.$store.state.apiServerIp + '/api/orders/insertOrders', this.ordersVo)
                      .then((result) => {
                        // console.log(JSON.stringify(result.data))
                        this.$q.loading.hide() // 로딩 표시 종료
                        // 입금정보 화면으로 이동
                        this.$router.push({path: '/menu/vbankDepositInfo', query: {tid: tid}})
                        // return null // 가상계좌 채번의 경우 처리 종료
                      })
                      .catch((err) => {
                        console.log(err)
                        this.$q.loading.hide() // 로딩 표시 종료
                        this.$q.notify({
                          color: 'grey',
                          position: 'left',
                          message: '주문에 실패했습니다. 다시 주문해주세요.(E03)',
                          icon: 'notifications_active'
                        })
                        // return null // 가상계좌 채번의 경우 처리 종료
                      })
                    // return null // 가상계좌 채번의 경우 처리 종료
                  } else { // 가상계좌가 아닌 경우
                    this.ordersVo.status = this.$store.state.ORDER_STATUS_PAYMENT_COMPLETED // 결제완료(01)
                    // ■ 주문정보 등록
                    this.$axios.post(this.$store.state.apiServerIp + '/api/orders/insertOrders', this.ordersVo)
                      .then((result) => {
                        // console.log(JSON.stringify(result.data))
                        this.$q.loading.hide() // 로딩 표시 종료
                        // 주문 완료 화면으로 이동
                        this.$router.push('/menu/orderCompleted')
                      })
                      .catch((err) => {
                        console.log(err)
                        this.$q.loading.hide() // 로딩 표시 종료
                        this.$q.notify({
                          color: 'grey',
                          position: 'left',
                          message: '주문에 실패했습니다. 다시 주문해주세요.(E04)',
                          icon: 'notifications_active'
                        })
                        // 상품 상세 화면으로 이동
                        this.$router.push('/productDetail?seq=' + seq)
                      })
                  }
                }
              })
              .catch((err) => {
                console.log(err)
                this.$q.loading.hide() // 로딩 표시 종료
                this.$q.notify({
                  color: 'grey',
                  position: 'left',
                  message: '주문에 실패했습니다. 다시 주문해주세요.(E05)',
                  icon: 'notifications_active'
                })
                // 상품 상세 화면으로 이동
                this.$router.push('/productDetail?seq=' + seq)
              })
          })
          .catch((err) => {
            console.log(err)
            this.$q.loading.hide() // 로딩 표시 종료
            this.$q.notify({
              color: 'grey',
              position: 'left',
              message: '주문에 실패했습니다. 다시 주문해주세요.(E06)',
              icon: 'notifications_active'
            })
            // 상품 상세 화면으로 이동
            this.$router.push('/productDetail?seq=' + seq)
          })
      } else if (resultCd === '90' || resultCd === '91') { // 결제 실패 90:인증실패 91:승인실패
        this.$q.notify({
          color: 'grey',
          position: 'left',
          message: resultMsg,
          icon: 'notifications_active'
        })
        // 상품 상세 화면으로 이동
        this.$router.push('/productDetail?seq=' + seq)
      } else { // 기타 결제 실패
        this.$q.notify({
          color: 'grey',
          position: 'left',
          message: '결제에 실패했습니다. 다시 결제를 진행해주세요.',
          icon: 'notifications_active'
        })
        // 상품 상세 화면으로 이동
        this.$router.push('/productDetail?seq=' + seq)
      }
    }
  }
}
</script>
