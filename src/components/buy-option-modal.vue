<template>
  <q-modal v-model="buyOptionModal" position="bottom" :content-css="{minWidth: '30%'}">

    <loginModal ref="loginModal" @callback-login="showBuyOrderModal" />
    <buyOrderModal ref="buyOrderModal" />

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense icon="check_circle" />
        <q-toolbar-title>구매 옵션</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>
      <table align="center" border="0" width="90%">
        <tr>
          <td align="center" width="60" rowspan="3"><img :src="productVo.image_url" style="width:50px; height:50px; object-fit:cover; border-radius: 3px;"></td>
          <td align="left"><font size="1" color="grey">{{ productVo.title }}</font></td>
        </tr>
        <tr>
          <td align="left"><font size="1" color="grey">{{ productVo.subtitle }}</font></td>
        </tr>
        <tr>
          <td align="left"><font size="1" color="black">{{ addComma(originalPrice) }} 원</font></td>
        </tr>
        <tr>
          <td align="left" colspan="2">&nbsp;</td>
        </tr>
      </table>
      <table v-if="productVo.select_option_name1 != ''" align="center" border="0" width="90%">
        <tr v-if="productVo.select_option_name1 != ''">
          <td align="left" width="30%"><font size="2" color="grey">{{ productVo.select_option_name1 }}</font></td>
          <td align="left"><q-select v-model="productVo.select_option1" inverted-light color="white" :options="selectOption1Options" @input="selectNextOptionList(1)" /></td>
        </tr>
        <tr v-if="productVo.select_option_name2 != ''">
          <td align="left"><font size="2" color="grey">{{ productVo.select_option_name2 }}</font></td>
          <td align="left"><q-select v-model="productVo.select_option2" inverted-light color="white" :options="selectOption2Options" @input="selectNextOptionList(2)" /></td>
        </tr>
        <tr v-if="productVo.select_option_name3 != ''">
          <td align="left"><font size="2" color="grey">{{ productVo.select_option_name3 }}</font></td>
          <td align="left"><q-select v-model="productVo.select_option3" inverted-light color="white" :options="selectOption3Options" @input="selectNextOptionList(3)" /></td>
        </tr>
      </table>

      <div v-for="(item, index) in orderProductList" :key="item.seq">
        <q-card-separator />
        <br>
        <table align="center" border="0" width="90%">
          <tr>
            <td v-if="item.select_option_name3 != ''" width="" align="left"><font size="3" color="grey">{{ item.select_option1 + '/' + item.select_option2 + '/' + item.select_option3 }}</font></td>
            <td v-else-if="item.select_option_name2 != ''" width="" align="left"><font size="3" color="grey">{{ item.select_option1 + '/' + item.select_option2 }}</font></td>
            <td v-else-if="item.select_option_name1 != ''" width="" align="left"><font size="3" color="grey">{{ item.select_option1 }}</font></td>
            <td v-else width="" align="left"></td>

            <td width="30" align="right"><q-btn color="black" icon="remove" @click="minusOrderQuantity(index)" style="width: 30px; height: 30px;" dense size="sm" /></td>
            <td width="30" align="center"><q-input inverted-light color="white" v-model="item.order_quantity" @input="onChangeQuantity(index)" type="number" align="left" style="width: 43px; height: 30px;" /></td>
            <td width="30" align="left"><q-btn color="black" icon="add" @click="plusOrderQuantity(index)" style="width: 30px; height: 30px;" dense size="sm" /></td>
            <td width="" align="right"><font size="3" color="grey">{{ addComma(item.order_price) }}</font><font size="2">원&nbsp;</font></td>
            <td v-if="item.select_option_name1 != ''" width="30" align="right"><q-btn icon="close" @click="deleteOrderProductRow(index)" color="primary" style="width: 30px; height: 30px;" dense size="sm" /></td>
          </tr>
        </table>
        <table v-if="item.direct_option_name1 != ''" align="center" border="0" width="90%">
          <tr v-if="item.direct_option_name1 != ''">
            <td align="right" width="50%"><font size="2" color="black">{{ item.direct_option_name1 }}</font></td>
            <td align="left" width="50%"><q-input v-model="item.direct_option1" color="primary" style="width: 100%; height: 30px;" /></td>
          </tr>
          <tr v-if="item.direct_option_name2 != ''">
            <td align="right" width="50%"><font size="2" color="grey">{{ item.direct_option_name2 }}</font></td>
            <td align="left" width="50%"><q-input v-model="item.direct_option2" color="primary" style="width: 100%; height: 30px;" /></td>
          </tr>
          <tr v-if="item.direct_option_name3 != ''">
            <td align="right" width="50%"><font size="2" color="grey">{{ item.direct_option_name3 }}</font></td>
            <td align="left" width="50%"><q-input v-model="item.direct_option3" color="primary" style="width: 100%; height: 30px;" /></td>
          </tr>
          <tr v-if="item.direct_option_name4 != ''">
            <td align="right" width="50%"><font size="2" color="grey">{{ item.direct_option_name4 }}</font></td>
            <td align="left" width="50%"><q-input v-model="item.direct_option4" color="primary" style="width: 100%; height: 30px;" /></td>
          </tr>
          <tr v-if="item.direct_option_name5 != ''">
            <td align="right" width="50%"><font size="2" color="grey">{{ item.direct_option_name5 }}</font></td>
            <td align="left" width="50%"><q-input v-model="item.direct_option5" color="primary" style="width: 100%; height: 30px;" /></td>
          </tr>
        </table>
      </div>

      <br>
      <q-toolbar color="white" >
        <q-btn color="orange" icon="shopping_cart" label="장바구니" @click="addToCart" style="width: 50%" />
        &nbsp;&nbsp;&nbsp;
        <q-btn color="primary" icon="accessibility_new" label="바로구매" @click="goBuy" style="width: 50%" />
      </q-toolbar>
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
      uid: '',
      productVo: {
        seq: '',
        seq_product: '', // seq로 설정 (orderProduct로 사용시 키 필요)
        title: '',
        subtitle: '',
        price: '',
        reward_coin: '',
        image_url: '',
        select_option_name1: '', // 옵션 선택형
        select_option_name2: '',
        select_option_name3: '',
        select_option_value1: '',
        select_option_value2: '',
        select_option_value3: '',
        direct_option_name1: '',
        direct_option_name2: '',
        direct_option_name3: '',
        direct_option_name4: '',
        direct_option_name5: '',
        direct_option_value1: '',
        direct_option_value2: '',
        direct_option_value3: '',
        direct_option_value4: '',
        direct_option_value5: '',
        rating: 3,
        order_quantity: '', // 주문 수량
        order_price: '', // 주문 금액
        reg_id: '', // 판매자 아이디
        productOptionList: [] // 옵션 선택형 리스트
      },
      // orderQuantity: 1, // 주문 수량
      // orderPrice: 0, // 주문금액
      originalPrice: 0, // 원래 상품 가격
      orderRewardCoin: 0, // 주문보상코인
      selectOption1Options: [],
      selectOption2Options: [],
      selectOption3Options: [],
      orderProductList: [], // 주문상품 리스트 - buyOrderModal에 설정할 리스트
      buyOptionModal: false
    }
  },
  created: function () {
  },
  mounted: function () {
  },
  methods: {
    show () {
      this.buyOptionModal = true

      // 초기화
      this.orderProductList = [] // 주문상품 리스트 초기화
      this.productVo.seq_product = this.productVo.seq // 상품seq 설정
      this.productVo.order_price = this.productVo.price // 주문 금액 초기화
      this.productVo.order_quantity = 1 // 주문 수량 초기화
      this.originalPrice = Number(this.productVo.price) // 원래 상품값 복사
      this.selectOption1Options = [] // 옵션 선택형 리스트 1 초기화
      this.selectOption2Options = [] // 옵션 선택형 리스트 2 초기화
      this.selectOption3Options = [] // 옵션 선택형 리스트 3 초기화
      this.productVo.select_option1 = '' // 옵션 선택형 1값 초기화
      this.productVo.select_option2 = '' // 옵션 선택형 1값 초기화
      this.productVo.select_option3 = '' // 옵션 선택형 1값 초기화

      // 옵션 설정
      if (this.productVo.select_option_name1 !== '') {
        // ■ 옵션 선택형 1 설정
        this.selectOption1Options = [] // 옵션 리스트 1 초기화
        let oldValue = ''
        for (let i = 0; i < this.productVo.productOptionList.length; i++) {
          let dbRow = this.productVo.productOptionList[i]
          if (dbRow.option_value1 !== oldValue) { // 중복 배제
            let selectOption1Row = {} // row
            if (this.productVo.select_option_name2 !== '') {
              selectOption1Row.label = dbRow.option_value1
            } else { // 마지막 옵션이면 옵션가격 표시
              if (dbRow.option_price == null || dbRow.option_price === '0') { // 옵션가격이 0일 경우 옵션가 비표시
                selectOption1Row.label = dbRow.option_value1
              } else {
                selectOption1Row.label = dbRow.option_value1 + ' (' + dbRow.option_price_type + ' ' + this.addComma(dbRow.option_price) + '원 )'
              }
            }
            selectOption1Row.value = dbRow.option_value1
            this.selectOption1Options.push(selectOption1Row)
            oldValue = dbRow.option_value1 // 올드값 수정
          }
        }
      } else {
        // 주문상품 추가
        this.addOrderProduct()
      }
    },
    onChangeQuantity (index) {
      let orderProduct = this.orderProductList[index]
      // 주문금액 설정
      orderProduct.order_price = orderProduct.price * orderProduct.order_quantity
      // 주문보상코인 설정
      orderProduct.order_reward_coin = this.productVo.reward_coin * orderProduct.order_quantity
    },
    deleteOrderProductRow (index) { // row 삭제
      this.orderProductList.splice(index, 1)
    },
    // 옵션 선택형 다음 리스트 설정
    selectNextOptionList (currentListIndex) {
      if (currentListIndex === 1) {
        if (this.productVo.select_option_name2 !== '') {
          // ■ 옵션 선택형 2 설정
          this.productVo.select_option2 = ''
          this.productVo.select_option3 = ''
          this.selectOption2Options = [] // 옵션 리스트 2 초기화
          this.selectOption3Options = [] // 옵션 리스트 3 초기화
          let oldValue = ''
          for (let i = 0; i < this.productVo.productOptionList.length; i++) {
            let dbRow = this.productVo.productOptionList[i]
            if (dbRow.option_value2 !== oldValue &&
                dbRow.option_value1 === this.productVo.select_option1) { // 중복 배제
              let selectOption2Row = {} // row
              if (this.productVo.select_option_name3 !== '') {
                selectOption2Row.label = dbRow.option_value2
              } else { // 마지막 옵션이면 옵션가격 표시
                if (dbRow.option_price == null || dbRow.option_price === '0') { // 옵션가격이 0일 경우 옵션가 비표시
                  selectOption2Row.label = dbRow.option_value2
                } else {
                  selectOption2Row.label = dbRow.option_value2 + ' (' + dbRow.option_price_type + ' ' + this.addComma(dbRow.option_price) + '원 )'
                }
              }
              selectOption2Row.value = dbRow.option_value2
              this.selectOption2Options.push(selectOption2Row)
              oldValue = dbRow.option_value2 // 올드값 수정
            }
          }
        } else {
          // 옵션 선택형 개수가 1개일 경우
          // 주문 금액 설정 (상품가격에서 옵션금액 더하기 또는 빼기)
          for (let i = 0; i < this.productVo.productOptionList.length; i++) {
            let dbRow = this.productVo.productOptionList[i]
            if (dbRow.option_value1 === this.productVo.select_option1) {
              let orderPrice = 0
              if (dbRow.option_price_type === '-') {
                orderPrice = this.originalPrice - Number(dbRow.option_price)
              } else {
                orderPrice = this.originalPrice + Number(dbRow.option_price)
              }
              this.productVo.order_price = orderPrice
              this.productVo.price = orderPrice
              break
            }
          }
          // 주문상품 추가
          this.addOrderProduct()
        }
      } else if (currentListIndex === 2) { // 옵션 리스트 3 설정
        if (this.productVo.select_option_name3 !== '') {
          // ■ 옵션 선택형 3 설정
          this.productVo.select_option3 = ''
          this.selectOption3Options = [] // 옵션 리스트 3 초기화
          let oldValue = ''
          for (let i = 0; i < this.productVo.productOptionList.length; i++) {
            let dbRow = this.productVo.productOptionList[i]
            if (dbRow.option_value3 !== oldValue &&
                dbRow.option_value1 === this.productVo.select_option1 &&
                dbRow.option_value2 === this.productVo.select_option2) { // 중복 배제
              let selectOption3Row = {} // row
              if (dbRow.option_price == null || dbRow.option_price === '0') { // 옵션가격이 0일 경우 옵션가 비표시
                selectOption3Row.label = dbRow.option_value3
              } else {
                selectOption3Row.label = dbRow.option_value3 + ' (' + dbRow.option_price_type + ' ' + this.addComma(dbRow.option_price) + '원 )'
              }
              selectOption3Row.value = dbRow.option_value3
              this.selectOption3Options.push(selectOption3Row)
              oldValue = dbRow.option_value3 // 올드값 수정
            }
          }
        } else {
          // 옵션 선택형 개수가 2개일 경우
          // 주문 금액 설정 (상품가격에서 옵션금액 더하기 또는 빼기)
          for (let i = 0; i < this.productVo.productOptionList.length; i++) {
            let dbRow = this.productVo.productOptionList[i]
            if (dbRow.option_value1 === this.productVo.select_option1 &&
                dbRow.option_value2 === this.productVo.select_option2) {
              let orderPrice = 0
              if (dbRow.option_price_type === '-') {
                orderPrice = this.originalPrice - Number(dbRow.option_price)
              } else {
                orderPrice = this.originalPrice + Number(dbRow.option_price)
              }
              this.productVo.order_price = orderPrice
              this.productVo.price = orderPrice
              break
            }
          }
          // 주문상품 추가
          this.addOrderProduct()
        }
      } else {
        // 옵션 선택형 개수가 3개일 경우
        // 주문 금액 설정 (상품가격에서 옵션금액 더하기 또는 빼기)
        for (let i = 0; i < this.productVo.productOptionList.length; i++) {
          let dbRow = this.productVo.productOptionList[i]
          if (dbRow.option_value1 === this.productVo.select_option1 &&
              dbRow.option_value2 === this.productVo.select_option2 &&
              dbRow.option_value3 === this.productVo.select_option3) {
            let orderPrice = 0
            if (dbRow.option_price_type === '-') {
              orderPrice = this.originalPrice - Number(dbRow.option_price)
            } else {
              orderPrice = this.originalPrice + Number(dbRow.option_price)
            }
            this.productVo.order_price = orderPrice
            this.productVo.price = orderPrice
            break
          }
        }
        // 주문상품 추가
        this.addOrderProduct()
      }
    },
    addOrderProduct () { // 옵션 선택 완료시 주문상품 추가
      // 선택한 옵션이 이미 추가되어 있는 경우
      // 메세지 표시만 함
      let existFlag = false // 선택 유무 (true:이미 등록, false:없음)
      if (this.productVo.select_option_name1 !== '' ||
          this.productVo.select_option_name2 !== '' ||
          this.productVo.select_option_name3 !== '') { // 옵션 선택형이 1개 이상일 경우
        console.log(1)
        for (let i = 0; i < this.orderProductList.length; i++) {
          let orderProduct = this.orderProductList[i]
          if (this.productVo.select_option_name2 === '' &&
              this.productVo.select_option_name3 === '') { // 옵션 선택형이 1개일 경우
            if (orderProduct.select_option1 === this.productVo.select_option1) { // 옵션 선택형 1만 같으면 존재
              existFlag = true
            }
          } else if (this.productVo.select_option_name3 === '') { // 옵션 선택형이 2개일 경우
            if (orderProduct.select_option1 === this.productVo.select_option1 &&
                orderProduct.select_option2 === this.productVo.select_option2) {
              existFlag = true
            }
          } else { // 옵션 선택형이 3개일 경우
            if (orderProduct.select_option1 === this.productVo.select_option1 &&
                orderProduct.select_option2 === this.productVo.select_option2 &&
                orderProduct.select_option3 === this.productVo.select_option3) {
              existFlag = true
            }
          }
        }
      }
      if (existFlag) { // 이미 추가한 상품
        this.$q.notify({
          color: 'blue',
          position: 'left',
          message: '이미 추가한 상품입니다.',
          icon: 'notifications_active'
        })
      } else {
        // 주문상품 추가
        let orderProduct = JSON.parse(JSON.stringify(this.productVo))
        orderProduct.order_reward_coin = this.productVo.reward_coin * 1 // 보상코인 설정
        this.orderProductList.push(orderProduct)
      }
    },
    // ■ 로그인 콜백, 주문 모달 표시
    showBuyOrderModal () {
      if (this.orderProductList.length < 1) { // 선택 상품이 없는 경우
        this.$q.notify({
          color: 'blue',
          position: 'left',
          message: '상품을 선택해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      // 구매 결제 화면 표시
      this.$refs.buyOrderModal.orderProductList = this.orderProductList // 주문상품 리스트 설정
      // this.buyOptionModal = false // 주문옵션 모달 닫기
      this.$refs.buyOrderModal.show() // 주문결제 모달 열기
    },
    // 주문상품 수량 감소
    minusOrderQuantity (index) {
      let orderProduct = this.orderProductList[index]
      if (orderProduct.order_quantity > 1) {
        orderProduct.order_quantity--
      }
      console.log(orderProduct.order_quantity)
      // 주문금액 설정
      orderProduct.order_price = orderProduct.price * orderProduct.order_quantity
      // 주문보상코인 설정
      orderProduct.order_reward_coin = this.productVo.reward_coin * orderProduct.order_quantity
    },
    // 주문상품 수량 증가
    plusOrderQuantity (index) {
      let orderProduct = this.orderProductList[index]
      orderProduct.order_quantity++
      console.log(orderProduct.order_quantity)
      // 주문금액 설정
      orderProduct.order_price = orderProduct.price * orderProduct.order_quantity
      // 주문보상코인 설정
      orderProduct.order_reward_coin = this.productVo.reward_coin * orderProduct.order_quantity
    },
    addComma (num) {
      return Vue.prototype.$addComma(num)
    },
    goBuy () {
      // 로그인 체크
      let uid = this.$store.state.userVo.uid
      if (this.$store.state.userVo === '' || uid === null || uid === '') {
        // 로그인 화면 표시
        this.$refs.loginModal.show()
        // alert('로그인해라')
      } else {
        // 구매 결제 화면 표시
        // this.buyOptionModal = false
        // this.$refs.buyOrderModal.show()
        this.showBuyOrderModal()
        // this.$router.push('/payment')
      }
    },
    // 장바구니 담기
    addToCart () {
      // console.log(JSON.stringify(this.orderProductList))
      if (this.orderProductList.length < 1) { // 선택 상품이 없는 경우
        this.$q.notify({
          color: 'blue',
          position: 'left',
          message: '상품을 선택해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      // this.productVo.uid = this.$store.state.userVo.uid
      this.$q.loading.show() // 로딩중 표시 시작
      this.$axios.post(this.$store.state.apiServerIp + '/api/cart/addToCart', this.orderProductList)
        .then((result) => {
          this.$q.loading.hide() // 로딩중 표시 종료
          let resultCd = result.data.resultCd
          if (resultCd === '0') {
            this.$q.notify({
              color: 'blue',
              position: 'left',
              message: '상품을 장바구니에 담았습니다.',
              icon: 'notifications_active'
            })
          } else {
            this.$q.notify({
              color: 'blue',
              position: 'left',
              message: result.data.resultMsg,
              icon: 'notifications_active'
            })
          }
        })
        .catch((err) => {
          console.log(err)
          this.$q.loading.hide() // 로딩중 표시 종료
        })
    },
    close () {
      this.buyOptionModal = false
    }
  }
}
</script>
