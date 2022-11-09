<template>
  <q-modal v-model="orderReturnModal" position="" :content-css="{minWidth: '20vw'}">

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense icon="loop" />
        <q-toolbar-title>반품교환 관리</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <!-- 반품/교환지 -->
      <div class="row justify-left">
        <table width="95%" border="0" align="center" >
          <tr>
            <td><q-btn color="black" size="xs" style="width:120px;"><font size="2">반품/교환지</font></q-btn></td>
          </tr>
        </table>
      </div>
      <table align="center" border="0" style="width:95%">
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
        <tr>
          <td align="left" width="20%"><font size="2" color="black">받는사람</font></td>
          <td align="left" colspan="2"><font size="2">{{ sellerVo.seller_name }}</font></td>
        </tr>
        <tr>
          <td align="left" width="20%"><font size="2" color="black">휴대폰</font></td>
          <td align="left" colspan="2"><font size="2">{{ sellerVo.mobile_no }}</font></td>
        </tr>
        <tr>
          <td align="left" width="20%"><font size="2" color="black">연락처</font></td>
          <td align="left" colspan="2"><font size="2">{{ sellerVo.tel_no }}</font></td>
        </tr>
        <tr>
          <td align="left" width="20%" rowspan="1"><font size="2" color="black">우편번호</font></td>
          <td align="left" colspan="2"><font size="2" color="black">{{ sellerVo.to_post_no }}</font></td>
        </tr>
        <tr>
          <td align="left" width="20%" rowspan="1"><font size="2" color="black">주소</font></td>
          <td align="left" colspan="2"><font size="2" color="black">{{ sellerVo.to_address1 }} {{ sellerVo.to_address2 }}</font></td>
        </tr>
      </table>
      <br>

      <!-- 주문 정보 -->
      <q-list v-for="orderProductVo in orderProductList" :key="orderProductVo.seq">
        <table align="center" border="0" width="95%">
          <tr>
            <td align="left" width="60" rowspan="3"><img :src="orderProductVo.image_url" style="width: 50px;"></td>
            <td align="left"><font size="2" color="black">{{ orderProductVo.title }}</font></td>
          </tr>
          <tr>
            <td align="left">
              <font size="2" color="black">{{ addComma(orderProductVo.order_price) }}원 / {{ orderProductVo.order_quantity }}개</font>
              <font size="2" color="grey">&nbsp;&nbsp;&nbsp;{{ orderProductVo.select_option1 }}&nbsp;{{ orderProductVo.select_option2 }}&nbsp;{{ orderProductVo.select_option3 }}</font>
            </td>
          </tr>
          <tr>
            <td align="right"><q-select inverted color="primary" v-model="orderProductVo.status_return" :options="statusOptions" style="width:120px; height:30px;" dense /></td>
          </tr>
          <tr v-if="orderProductVo.status_return === $store.state.ORDER_STATUS_REQUEST_EXCHANGE || orderProductVo.status_return === $store.state.ORDER_STATUS_REQUEST_RETURN"></tr>
          <tr v-if="orderProductVo.status_return === $store.state.ORDER_STATUS_REQUEST_EXCHANGE || orderProductVo.status_return === $store.state.ORDER_STATUS_REQUEST_RETURN"></tr>
          <tr v-if="orderProductVo.status_return === $store.state.ORDER_STATUS_REQUEST_EXCHANGE || orderProductVo.status_return === $store.state.ORDER_STATUS_REQUEST_RETURN"></tr>
          <tr v-if="orderProductVo.status_return === $store.state.ORDER_STATUS_REQUEST_EXCHANGE || orderProductVo.status_return === $store.state.ORDER_STATUS_REQUEST_RETURN">
            <td align="left" colspan="2"><q-input v-model.trim="orderProductVo.comment_return" stack-label="요청사항" color="white" inverted-light type="textarea" rows="2" /></td>
          </tr>
        </table>
      </q-list>
      <br>

      <br>
      <q-toolbar color="white" >
        <q-btn :loading="loading" :percentage="percentage" color="primary" @click="requestReturn" icon="done" style="width:100%; height:40px;">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;신청하기
          <span slot="loading">
            <q-spinner-oval class="on-left" />
            신청중...
          </span>
        </q-btn>

      </q-toolbar>
    </q-modal-layout>
  </q-modal>
</template>

<style>
</style>

<script>
import Vue from 'vue'
// import { close } from 'fs';

export default {
  // name: 'mystore',
  data () {
    return {
      type: '', // insert: 등록, update: 수정
      // index: '', // 배송관리 팝업 콜백처리시 주문정보 갱신에 사용
      loading: false,
      percentage: 0,
      orderProductList: [],
      sellerVo: {}, // 판매자 정보
      statusOptions: [], // 주문 상태 옵션
      orderReturnModal: false
    }
  },
  created: function () {
    // 주문 상태 옵션 리스트 설정
    this.statusOptions = []

    let statusRow1 = {}
    statusRow1.label = '요청없음'
    statusRow1.value = '00'
    this.statusOptions.push(statusRow1)

    let statusRow2 = {}
    statusRow2.label = '교환신청'
    statusRow2.value = this.$store.state.ORDER_STATUS_REQUEST_EXCHANGE // 40:교환신청
    // statusRow2.icon = 'loop'
    this.statusOptions.push(statusRow2)

    let statusRow3 = {}
    statusRow3.label = '반품신청'
    statusRow3.value = this.$store.state.ORDER_STATUS_REQUEST_RETURN // 62:반품신청
    // statusRow3.icon = 'redo'
    this.statusOptions.push(statusRow3)
  },
  mounted: function () {
  },
  methods: {
    show () {
      // 신청구분 초기화
      /*
      for (let i = 0; i < this.orderProductList.length; i++) {
        let status = this.orderProductList[i].status_return
        if (status !== this.$store.state.ORDER_STATUS_REQUEST_EXCHANGE && status !== this.$store.state.ORDER_STATUS_REQUEST_RETURN) {
          // 반품신청, 교환신청이 아닌 status는 디폴트 설정 '요청없음'
          status = ''
        }
      }
      */

      // 판매자 정보 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/seller/selectSellerReturn', {params: {sid: this.orderProductList[0].sid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.sellerVo = result.data
          // this.saveDeliveryInfoCallback(result.data)
        })
        .catch((err) => {
          console.log(err)
        })

      this.orderReturnModal = true
    },
    requestReturn () {
      this.loading = true

      let updateOrderProductList = []
      for (let i = 0; i < this.orderProductList.length; i++) {
        let statusReturn = this.orderProductList[i].status_return
        if (statusReturn === this.$store.state.ORDER_STATUS_REQUEST_EXCHANGE || statusReturn === this.$store.state.ORDER_STATUS_REQUEST_RETURN) {
          // 반품신청 또는 교환신청인 주문상품만 DB UPDATE 대상으로 추가
          updateOrderProductList.push(this.orderProductList[i])
        }
      }

      // 반품교환 정보 저장
      this.$axios.post(this.$store.state.apiServerIp + '/api/orders/returnOrderProduct', updateOrderProductList)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.requestReturnCallback(result.data)
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    // 반품요청 후처리
    requestReturnCallback (data) {
      // 1. 부모창 정보 갱신
      // 부모창의 콜백함수 호출
      this.$emit('callback-order-return', this.orderProductList)
      // 2. 메세지 표시
      this.$q.notify({
        color: 'blue',
        position: 'left',
        message: '저장되었습니다.',
        icon: 'notifications_active'
      })
      // 3. 창닫기
      this.orderReturnModal = false
      // 4. 로딩표시 종료
      this.loading = false
    },
    addComma (num) {
      return Vue.prototype.$addComma(num)
    },
    close () {
      this.orderReturnModal = false
    }
  }
}
</script>
