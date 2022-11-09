<template>
  <q-modal v-model="reviewTargetModal" position="" :content-css="{minWidth: '50vw'}">

    <reviewRegisterModal ref="reviewRegisterModal" @callback-review-register="callbackReviewRegister" />

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense icon="create" />
        <q-toolbar-title>구매후기</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <!-- 주문 정보 -->
      <q-list v-for="orderProductVo in orderProductList" :key="orderProductVo.seq">
        <table align="center" border="0" width="95%">
          <tr>
            <td align="left" width="70" rowspan="3"><img :src="orderProductVo.image_url" style="width: 60px;"></td>
            <td align="left"><font size="2" color="black">{{ orderProductVo.title }}</font></td>
          </tr>
          <tr>
            <td align="left">
              <font size="2" color="black">{{ addComma(orderProductVo.order_price) }}원 / {{ orderProductVo.order_quantity }}개</font>
              <font size="2" color="grey">&nbsp;&nbsp;&nbsp;{{ orderProductVo.select_option1 }}&nbsp;{{ orderProductVo.select_option2 }}&nbsp;{{ orderProductVo.select_option3 }}</font>
            </td>
          </tr>
          <tr>
            <td align="center">
              <a @click="showReviewRegisterModal(orderProductVo)">
                <div v-if="orderProductVo.rating == null || orderProductVo.rating == 0"><q-rating v-model="orderProductVo.rating" icon="sentiment_satisfied" :max="5" size="50px" color="primary" readonly /> 선택</div>
                <div v-if="orderProductVo.rating == 1"><q-rating v-model="orderProductVo.rating" icon="sentiment_very_dissatisfied" :max="5" size="50px" color="red" readonly /> 나쁨</div>
                <div v-if="orderProductVo.rating == 2"><q-rating v-model="orderProductVo.rating" icon="sentiment_dissatisfied" :max="5" size="50px" color="orange" readonly /> 별로</div>
                <div v-if="orderProductVo.rating == 3"><q-rating v-model="orderProductVo.rating" icon="sentiment_satisfied" :max="5" size="50px" color="green" readonly /> 보통</div>
                <div v-if="orderProductVo.rating == 4"><q-rating v-model="orderProductVo.rating" icon="sentiment_satisfied_alt" :max="5" size="50px" color="cyan" readonly /> 좋음</div>
                <div v-if="orderProductVo.rating == 5"><q-rating v-model="orderProductVo.rating" icon="sentiment_very_satisfied" :max="5" size="50px" color="blue" readonly /> 최고</div>
              </a>
            </td>
          </tr>
        </table>
      </q-list>
      <br>

      <q-toolbar color="white" >
        <q-btn color="primary" @click="close" style="width:100%; height:40px;">닫기</q-btn>
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
      orderProductList: [],
      reviewTargetModal: false
    }
  },
  created: function () {
  },
  mounted: function () {
  },
  methods: {
    show () {
      this.reviewTargetModal = true
    },
    // 상품리뷰 작성 모달 표시
    showReviewRegisterModal (item) {
      this.$refs.reviewRegisterModal.orderProductVo = JSON.parse(JSON.stringify(item))
      this.$refs.reviewRegisterModal.contentsVo = {} // 이전 상품리뷰 초기화
      this.$refs.reviewRegisterModal.contentsVo.seq = item.seq_product_review // 리뷰 시컨스 설정 -> 수정모드
      this.$refs.reviewRegisterModal.show()
    },
    // 반품요청 후처리
    callbackReviewRegister (contentsVo) {
      // 정보 갱신
      for (let i = 0; i < this.orderProductList.length; i++) {
        let orderProductRow = this.orderProductList[i]
        if (orderProductRow.seq_order_product === contentsVo.seq_order_product) { // 수정대상과 키가 같은 데이터인 경우
          orderProductRow.seq_product_review = contentsVo.seq // 상품리뷰 시컨스 설정
          orderProductRow.rating = contentsVo.rating // 평점 설정
        }
      }
      // 2. 메세지 표시
      this.$q.notify({
        color: 'blue',
        position: 'left',
        message: '저장되었습니다.',
        icon: 'notifications_active'
      })
    },
    addComma (num) {
      return Vue.prototype.$addComma(num)
    },
    close () {
      this.reviewTargetModal = false
    }
  }
}
</script>
