<template>
  <q-page>
  </q-page>
</template>

<style>
</style>

<script>
// import Vue from 'vue'

export default {
  name: 'callback-app-return',
  data () {
    return {
    }
  },
  components: {
  },
  created: function () {
    this.$q.loading.show() // 로딩 표시 시작

    this.$axios.get(this.$store.state.apiServerIp + '/api/payment/getOrdersInfoFromSession')
      .then((result) => {
        // console.log(JSON.stringify(result.data))
        this.ordersVo = result.data // 세션에 저장된 주문 정보

        // 결제승인 완료 콜백 - 계좌이체 동기방식 등 모든 처리가 성공하면 호출되는 함수
        this.ordersVo.status = this.$store.state.ORDER_STATUS_PAYMENT_COMPLETED // 결제완료(01)
        // ■ 주문정보 등록
        this.$axios.post(this.$store.state.apiServerIp + '/api/orders/insertOrders', this.ordersVo)
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            // 장바구니에서 주문한 경우 - 장바구니에서 해당 상품 리스트 삭제
            if (this.ordersVo.savedFromCartFlag || this.ordersVo.savedFromCartFlag === 'true') {
              // 장바구니에서 주문상품 리스트 삭제 처리
              this.$axios.post(this.$store.state.apiServerIp + '/api/cart/deleteCartProductList', this.ordersVo.orderProductList)
                .then((result) => {
                  // console.log(JSON.stringify(result.data))
                  this.$q.loading.hide() // 로딩 표시 종료
                  // 주문 완료 화면으로 이동
                  this.$router.push('/menu/orderCompleted')
                })
                .catch((err) => {
                  console.log(err)
                  this.$q.loading.hide() // 로딩 표시 종료
                  // 주문 완료 화면으로 이동
                  this.$router.push('/menu/orderCompleted')
                })
            } else {
              this.$q.loading.hide() // 로딩 표시 종료
              // 주문 완료 화면으로 이동
              this.$router.push('/menu/orderCompleted')
            }
          })
          .catch((err) => {
            console.log(err)
            this.$q.loading.hide() // 로딩 표시 종료
            this.$q.notify({
              color: 'grey',
              position: 'left',
              message: '주문 실패. 다시 주문해주세요.(E05)',
              icon: 'notifications_active'
            })
            // 상품 상세 화면으로 이동
            this.$router.push('/productDetail?seq=' + this.ordersVo.savedSeq)
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
        if (this.ordersVo.savedSeq != null && this.ordersVo.savedSeq !== '') {
          this.$router.push('/productDetail?seq=' + this.ordersVo.savedSeq)
        } else {
          this.$router.push('/menu/newProductList')
        }
      })
  },
  mounted: function () {
  },
  methods: {
  }
}
</script>
