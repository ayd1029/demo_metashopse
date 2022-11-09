<template>
  <q-page class="">
    <q-layout-header>
      <q-toolbar
        color="black"
        inverted
      >
        <q-btn flat round dense icon="accessibility_new" />
        <q-toolbar-title>주문 완료</q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <div>
      <br>
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
      <br>
      <font size="3" color="black"><b>주문이 완료되었습니다.</b></font>
      <br>
      <!-- <font size="2" color="grey">(심사 통과한 흥미로운 광고 표시)</font> -->
      <br>
      <br>
      <q-btn color="primary" style="width:90%;" @click="goOrdersList">주문 확인하기</q-btn>
      <br>
      <br>
      <q-btn color="primary" outline style="width:90%;" @click="goMenu">메뉴로 돌아가기</q-btn>
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
export default {
  name: 'order-completed',
  data () {
    return {
    }
  },
  components: {
  },
  created: function () {
    console.log('■■■■■ order-completed.vue created! ■■■■■')
    /*
    ★ 주문화면에서 콜백으로 바로 저장하는 방식으로 변경
    // 주문정보 저장
    if (this.$store.state.ordersVo !== '') {
      this.$axios.post(this.$store.state.apiServerIp + '/api/orders/insertOrders', this.$store.state.ordersVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          console.log('■■■■■ order-completed.vue /api/orders/insertOrders done! ■■■■■')

          // 컨텐츠 작성을 위해 주문정보 이동
          this.$store.state.lastOrdersVo = JSON.parse(JSON.stringify(this.$store.state.ordersVo))
          this.$store.state.ordersVo = '' // 주문정보 제거
        })
        .catch((err) => {
          console.log(err)
        })
    }
    */
  },
  mounted: function () {
    console.log('■■■■■ order-completed.vue mounted! ■■■■■')
  },
  methods: {
    // 주문/배송조회 화면으로 이동
    goOrdersList () {
      this.$store.state.doNotBack = true // 뒤로가기시 메인으로 이동하게 함
      this.$router.push('/menu/ordersList') // replace 안먹히는데?
    },
    goMenu () {
      this.$router.push('/menu')
    }
  }
}
</script>
