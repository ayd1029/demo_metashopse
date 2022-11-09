<template>
  <q-modal v-model="orderDeliveryModal" position="" :content-css="{minWidth: '30vw'}">

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense icon="local_shipping" />
        <q-toolbar-title>배송정보 관리</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>
      <!-- 주문 정보 -->
      <!--
      <table align="center" border="0" width="95%">
        <tr>
        </tr>
        <tr>
          <td align="left" width="60" rowspan="3"><img :src="orderProductVo.image_url" style="width: 50px;"></td>
          <td align="left"><font size="1" color="grey">{{ orderProductVo.title }}</font></td>
        </tr>
        <tr>
          <td align="left"><font size="2" color="red">
            <font size="2" color="black">{{ addComma(orderProductVo.order_price) }}원 / {{ orderProductVo.order_quantity }}개</font>
            <font size="2" color="grey">&nbsp;&nbsp;&nbsp;{{ orderProductVo.select_option1 }}&nbsp;{{ orderProductVo.select_option2 }}&nbsp;{{ orderProductVo.select_option3 }}</font>
          </td>
        </tr>
        <tr>
          <td align="left" colspan="2">&nbsp;</td>
        </tr>
      </table>
      -->

      <!-- 배송지 정보 -->
      <div class="row justify-left">
        <table width="95%" border="0" align="center" >
          <tr>
            <td><q-btn color="black" size="xs" style="width:120px;"><font size="2">받는사람 정보</font></q-btn></td>
            <td align="right"><font size="2">주문번호&nbsp;:&nbsp;{{ orderProductVo.order_no }}&nbsp;</font></td>
          </tr>
        </table>
      </div>
      <table align="center" border="0" style="width:95%">
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
        <tr>
          <td align="left" width="20%"><font size="2" color="black">받으실 분</font></td>
          <td align="left" colspan="2"><font size="2">{{ orderProductVo.to_name }}</font></td>
        </tr>
        <tr>
          <td align="left"><font size="2" color="black">휴대폰</font></td>
          <td align="left" colspan="2"><font size="2">{{ orderProductVo.to_mobile_no }}</font></td>
        </tr>
        <tr>
          <td align="left" rowspan="1"><font size="2" color="black">우편번호</font></td>
          <td align="left" colspan="2"><font size="2" color="black">{{ orderProductVo.to_post_no }}</font></td>
        </tr>
        <tr>
          <td align="left"><font size="2" color="black">주소</font></td>
          <td align="left" colspan="2"><font size="2" color="black">{{ orderProductVo.to_address1 }} {{ orderProductVo.to_address2 }}</font></td>
        </tr>
        <tr>
          <td align="left"><font size="2" color="black">요청사항</font></td>
          <td align="left" colspan="2"><font size="2" color="black">{{ orderProductVo.to_message }}</font></td>
        </tr>
      </table>
      <br>
      <!-- 배송 정보 -->
      <div class="row justify-left">
        <table width="95%" border="0" align="center" >
          <tr>
            <td><q-btn color="black" size="xs" style="width:120px;"><font size="2">배송 정보</font></q-btn></td>
            <td><font size="2"></font></td>
          </tr>
        </table>
      </div>
      <table align="center" border="0" width="95%">
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
        <tr>
          <td colspan="1" align="left" width="40%"><font size="2" color="black">택배사</font></td>
          <td colspan="1" align="left" width="60%"><q-select inverted-light color="white" v-model="orderProductVo.delivery_corp_cd" :options="$store.state.deliveryCorpCdOptions" @input="deliveryCorpCdInputHandler" hide-underline :readonly="readOnlyFlag" /></td>
        </tr>
        <tr>
          <td colspan="1" align="left" width="40%"><font size="2" color="black">송장번호</font></td>
          <td colspan="1" align="left" width="60%"><q-input inverted-light color="white" v-model.trim="orderProductVo.delivery_no" style="width: 100%;" hide-underline :readonly="readOnlyFlag" /></td>
        </tr>
        <tr>
          <td colspan="1" align="left" width="40%"><font size="2" color="black">배송시작일</font></td>
          <td colspan="1" align="left" width="60%"><q-datetime inverted color="primary" v-model="orderProductVo.delivery_start_date" @input="changeStatus" type="date" format="YYYY-MM-DD" ok-label="입력" cancel-label="취소" clearable :readonly="readOnlyFlag" /></td>
        </tr>
        <tr>
          <td colspan="1" align="left" width="40%"><font size="2" color="black">배송완료일</font></td>
          <td colspan="1" align="left" width="60%"><q-datetime inverted color="blue" v-model="orderProductVo.delivery_end_date" @input="changeStatus" type="date" format="YYYY-MM-DD" ok-label="입력" cancel-label="취소" clearable :readonly="readOnlyFlag" /></td>
        </tr>
        <tr>
          <td colspan="2"><q-card-separator /></td>
        </tr>
        <tr>
          <td colspan="1" align="left" width="40%"><font size="2" color="black">배송상태</font></td>
          <td colspan="1" align="left" width="60%"><q-select v-model="orderProductVo.status_order_product" :options="statusOptions" class="no-shadow" hide-underline readonly /></td>
        </tr>
        <tr>
          <td colspan="2"><q-card-separator /></td>
        </tr>
        <tr>
          <td colspan="1" align="left" width="40%"><font size="2" color="black">비고 (판매자내부용)</font></td>
          <td colspan="1" align="left" width="60%"><q-input inverted-light color="white" v-model.trim="orderProductVo.bigo" style="width: 100%;" hide-underline /></td>
        </tr>
        <tr>
          <td colspan="1" align="left" width="40%"><font size="2" color="black">쿠폰번호 (구매자에게)</font></td>
          <td colspan="1" align="left" width="60%"><q-input inverted-light color="white" v-model.trim="orderProductVo.comment" style="width: 100%;" hide-underline :readonly="readOnlyFlag" /></td>
        </tr>
        <tr>
          <td colspan="2" align="left" width="40%"><font size="2" color="black">쿠폰인 경우 택배사는 [★쿠폰★]으로 선택, 송장번호는 '쿠폰' 입력,<br>배송시작일 및 배송완료일은 같이 입력해주세요.</font></td>
        </tr>
      </table>

      <br>
      <q-toolbar color="white" >
        <q-btn :loading="loading" :percentage="percentage" color="primary" @click="saveDeliveryInfo" icon="done" style="width:100%; height:50px;">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;저장
          <span slot="loading">
            <q-spinner-oval class="on-left" />
            저장중...
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
// import { close } from 'fs';

export default {
  // name: 'mystore',
  data () {
    return {
      type: '', // insert: 등록, update: 수정
      // index: '', // 배송관리 팝업 콜백처리시 주문정보 갱신에 사용
      loading: false,
      percentage: 0,
      orderProductVo: {},
      statusOptions: [], // 주문 상태 옵션
      readOnlyFlag: false,
      orderDeliveryModal: false
    }
  },
  created: function () {
    // 주문 상태 옵션 리스트 설정
    this.statusOptions = []

    let statusRow1 = {}
    statusRow1.label = '배송대기'
    statusRow1.value = this.$store.state.ORDER_STATUS_DELIVERY_WAIT // 11:배송대기
    this.statusOptions.push(statusRow1)

    let statusRow2 = {}
    statusRow2.label = '배송중'
    statusRow2.value = this.$store.state.ORDER_STATUS_DELIVERY_STARTED // 12:배송중
    this.statusOptions.push(statusRow2)

    let statusRow3 = {}
    statusRow3.label = '배송완료'
    statusRow3.value = this.$store.state.ORDER_STATUS_DELIVERY_COMPLETED // 21:배송완료
    this.statusOptions.push(statusRow3)
  },
  mounted: function () {
  },
  methods: {
    show () {
      // 배송사 디폴트 설정
      if (this.orderProductVo.delivery_corp_cd === null) {
        this.orderProductVo.delivery_corp_cd = ''
      }

      // 주문상태가 배송완료인 경우 readOnlyFlag = true
      if (this.orderProductVo.status_order_product === this.$store.state.ORDER_STATUS_DELIVERY_COMPLETED) {
        this.readOnlyFlag = true
      }

      this.orderDeliveryModal = true
    },
    // 택배사 선택 이벤트
    deliveryCorpCdInputHandler () {
      if (this.orderProductVo.delivery_corp_cd === '99') { // 쿠폰인 경우
        this.orderProductVo.delivery_no = '쿠폰'
      }
    },
    // 배송시작일 또는 배송완료일 변경 이벤트 처리
    changeStatus () {
      // 주문 상태 설정
      if ((this.orderProductVo.delivery_start_date != null && this.orderProductVo.delivery_start_date !== '') &&
       (this.orderProductVo.delivery_end_date == null || this.orderProductVo.delivery_end_date === '')) {
        this.orderProductVo.status_order_product = this.$store.state.ORDER_STATUS_DELIVERY_STARTED // 12:배송중
      } else if (this.orderProductVo.delivery_end_date != null && this.orderProductVo.delivery_end_date !== '') {
        this.orderProductVo.status_order_product = this.$store.state.ORDER_STATUS_DELIVERY_COMPLETED // 21:배송완료
      } else {
        this.orderProductVo.status_order_product = this.$store.state.ORDER_STATUS_DELIVERY_WAIT // 11:배송대기(주문확인완료)
      }
    },
    saveDeliveryInfo () {
      // 정합성 체크
      if (this.orderProductVo.delivery_corp_cd === '') { // 택배사
        this.$q.notify({
          color: 'blue',
          position: 'left',
          message: '택배사를 선택해주세요. 쿠폰인 경우 택배사를 [★쿠폰★]으로 선택해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.orderProductVo.delivery_no == null || this.orderProductVo.delivery_no === '') { // 송장번호
        this.$q.notify({
          color: 'blue',
          position: 'left',
          message: '송장번호를 입력해주세요. 쿠폰인 경우 송장번호는 \'쿠폰\'으로 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if ((this.orderProductVo.delivery_no != null && this.orderProductVo.delivery_no !== '') &&
       (this.orderProductVo.delivery_start_date == null || this.orderProductVo.delivery_start_date === '')) { // 배송시작일
        this.$q.notify({
          color: 'blue',
          position: 'left',
          message: '배송시작일을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if ((this.orderProductVo.delivery_start_date == null || this.orderProductVo.delivery_start_date === '') && // 배송시작일 값이 없고
       (this.orderProductVo.delivery_end_date != null && this.orderProductVo.delivery_end_date !== '')) { // 배송완료일 값이 있을때
        this.$q.notify({
          color: 'blue',
          position: 'left',
          message: '배송완료일을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }

      // 배송시작일, 배송완료일 날짜만 추출
      if (this.orderProductVo.delivery_start_date != null && this.orderProductVo.delivery_start_date !== '') {
        this.orderProductVo.delivery_start_date = this.orderProductVo.delivery_start_date.substring(0, 10)
      }
      if (this.orderProductVo.delivery_end_date != null && this.orderProductVo.delivery_end_date !== '') {
        this.orderProductVo.delivery_end_date = this.orderProductVo.delivery_end_date.substring(0, 10)
      }

      this.loading = true
      if (this.type === 'insert') {
        // 배송정보 등록
        this.$axios.post(this.$store.state.apiServerIp + '/api/orderseller/insertOrderSellerDeliveryInfo', this.orderProductVo)
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            if (this.orderProductVo.delivery_corp_cd === '99') { // ★쿠폰★인 경우
              // 배송완료처리
              this.orderProductVo.delivery_end_date = this.orderProductVo.delivery_start_date // 배송완료일을 배송시작일로 설정
              this.$axios.post(this.$store.state.apiServerIp + '/api/orderseller/updateOrderSellerDeliveryInfo', this.orderProductVo)
                .then((result) => {
                  // console.log(JSON.stringify(result.data))
                  this.saveDeliveryInfoCallback(result.data)
                })
                .catch((err) => {
                  this.loading = false
                  console.log(err)
                })
            } else {
              this.saveDeliveryInfoCallback(result.data)
            }
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
          })
      } else {
        // 배송정보 수정
        this.$axios.post(this.$store.state.apiServerIp + '/api/orderseller/updateOrderSellerDeliveryInfo', this.orderProductVo)
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.saveDeliveryInfoCallback(result.data)
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
          })
      }
    },
    // 등록/수정 후처리
    saveDeliveryInfoCallback (data) {
      // 1. 부모창 정보 갱신
      // 부모창의 콜백함수 호출
      this.$emit('callback-order-delivery')
      // 2. 메세지 표시
      this.$q.notify({
        color: 'blue',
        position: 'left',
        message: '저장되었습니다.',
        icon: 'notifications_active'
      })
      // 3. 창닫기
      this.orderDeliveryModal = false
      // 4. 로딩표시 종료
      this.loading = false
    },
    addComma (num) {
      return Vue.prototype.$addComma(num)
    },
    close () {
      this.orderDeliveryModal = false
    }
  }
}
</script>
