<template>
  <q-page class="">
    <orderReturnSellerModal ref="orderReturnSellerModal" />
    <traceDeliveryModal ref="traceDeliveryModal" />
    <orderReturnModal ref="orderReturnModal" @callback-order-return="callbackOrderReturn" />

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <!-- <q-btn flat round dense icon="local_shipping" /> -->
        <q-toolbar-title>취소/반품/교환/환불</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
      </q-toolbar>
    </q-layout-header>

    <!-- 주문 리스트 -->
    <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" >
      <q-infinite-scroll :handler="loadMore" ref="infiniteScroll">
        <q-list v-for="(orders, index) in ordersList" :key="orders.seq">
          <table border="0" align="center" style="width: 95%">
            <thead>
              <th width="20%"></th>
              <th width="20%"></th>
              <th width="20%"></th>
              <th width="20%"></th>
              <th width="20%"></th>
            </thead>
            <tr>
              <td colspan="3" align="left"><font size="2" color="grey">{{ orders.reg_time.substring(0, 16) }}</font></td>
              <td colspan="2" align="right"><!--<q-btn dense color="blue" label="주문상세보기" @click="132" outline size="md" flat />--></td>
            </tr>
            <tr>
              <td colspan="1" align="left">
                <q-select hide-underline v-model="orders.status" :options="$store.state.orderStatusOptions" readonly />
              </td>
              <td colspan="4" align="right"><font size="2" color="grey">{{ deliveryFormatDate(orders.delivery_end_date) }}</font></td>
            </tr>
            <tr>
              <td colspan="5"></td>
            </tr>
          </table>
          <div v-for="item in orderProductList" :key="item.seq">
            <!-- 주문번호가 같은 주문상품만 표시 -->
            <div v-if="orders.order_no === item.order_no">
              <table border="0" align="center" style="width: 95%">
                <thead>
                  <th width="20%"></th>
                  <th width="20%"></th>
                  <th width="20%"></th>
                  <th width="20%"></th>
                  <th width="20%"></th>
                </thead>
                <tr>
                  <td colspan="1" rowspan="2" align="center"><a @click="goProductDetail(item.seq_product)"><img :src="item.image_url" style="width:50px; height:50px; object-fit:cover; border-radius: 3px;"></a></td>
                  <td colspan="4" align="left">
                    <a @click="goProductDetail(item.seq_product)"><font size="2" color="black">{{ item.title }}</font></a>
                    <font v-if="item.status_return === '40'" size="2" color="red" @click="showOrderReturnSellerModal(orders.order_no)"> 교환신청</font>
                    <font v-if="item.status_return === '45'" size="2" color="red" @click="showOrderReturnSellerModal(orders.order_no)"> 교환완료</font>
                    <font v-if="item.status_return === '62'" size="2" color="red" @click="showOrderReturnSellerModal(orders.order_no)"> 반품신청</font>
                    <font v-if="item.status_return === '64'" size="2" color="red" @click="showOrderReturnSellerModal(orders.order_no)"> 반품완료</font>
                  </td>
                </tr>
                <tr>
                  <td colspan="3" align="left">
                    <font size="2" color="black">{{ addComma(item.order_price) }}원 / {{ item.order_quantity }}개</font>
                    <font size="2" color="grey">&nbsp;&nbsp;&nbsp;{{ item.select_option1 }}&nbsp;{{ item.select_option2 }}&nbsp;{{ item.select_option3 }}</font>
                  </td>
                  <td colspan="1" align="right"><q-btn dense color="orange" label="장바구니" @click="addToCart(item)" outline size="md" style="width:70px" /></td>
                </tr>
              </table>
              <!-- 취소완료 상태가 아니고 판매자가 다른 경우 버튼 표시 -->
              <table v-if="orders.status !== $store.state.ORDER_STATUS_CANCEL && orders.status !== $store.state.ORDER_STATUS_CANCEL_SELLER && item.showButtonYn === 'Y'" border="0" align="center" style="width: 95%">
                <thead>
                  <th width="20%"></th>
                  <th width="20%"></th>
                  <th width="20%"></th>
                  <th width="20%"></th>
                  <th width="20%"></th>
                </thead>
                <tr>
                  <td colspan="1" align="center"><q-btn v-if="orders.status < $store.state.ORDER_STATUS_DELIVERY_WAIT && orders.status !== $store.state.ORDER_STATUS_CANCEL && orders.status !== $store.state.ORDER_STATUS_CANCEL_SELLER" dense color="primary" label="주문취소" @click="cancelOrders(index)" size="md" style="width:70px" /></td>
                  <td colspan="1" align="right"><q-btn v-if="orders.status >= $store.state.ORDER_STATUS_DELIVERY_WAIT && orders.status !== $store.state.ORDER_STATUS_PURCHASE_CONFIRMED" label="구매확정" @click="completeOrders(index)" size="md" dense color="green" style="width:70px" /></td>
                  <td colspan="2" align="right"><q-btn v-if="orders.status >= $store.state.ORDER_STATUS_DELIVERY_WAIT && orders.status !== $store.state.ORDER_STATUS_PURCHASE_CONFIRMED && orders.request_return_yn !== 'Y'" label="반품교환" @click="requestReturn(index)" size="md" dense color="primary" style="width:70px" /></td>
                  <td colspan="1" align="right"><q-btn v-if="orders.delivery_no != null" dense color="blue" label="배송조회" @click="showDeliveryTracking(index)" size="md" style="width:70px" /></td>
                </tr>
              </table>
              <br>
            </div>
          </div>
        </q-list>
        <br>
        <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
      </q-infinite-scroll>
    </q-pull-to-refresh>
    <br>
    <br>
    <br>&nbsp;
  </q-page>
</template>

<style>
</style>

<script>
import Vue from 'vue'

export default {
  name: 'order-list',
  data () {
    return {
      refresherDone: '',
      pageSize: 15,
      lastPageNum: 1, // 마지막 페이지
      orderProductList: [], // 주문상품 리스트
      ordersList: [] // 주문 리스트 - DB에서 조회한 주문상품 리스트에서 추출
    }
  },
  components: {
  },
  created: function () {
    // 로그인 체크
    if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
      this.$router.push(this.$store.state.PAGE_LOGIN)
      return
    }
    // this.selectList(0)
    this.selectListMax()
  },
  methods: {
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()

      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScroll.reset() // index 초기화
      this.$refs.infiniteScroll.resume() // stop에서 다시 재생
      this.$refs.infiniteScroll.loadMore() // loadMore로 검색
    },
    loadMore: function (index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // console.log('index: ' + index)
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        // alert(index)
        console.log('loadMore called index: ' + index)
        if (index <= this.lastPageNum) {
          this.selectList(index, done)
          if (index === this.lastPageNum) {
            this.$refs.infiniteScroll.stop()
          }

          // refresher 로딩메세지 처리
          if (this.refresherDone != null && this.refresherDone !== '') {
            this.refresherDone() // 로딩메세지 종료
            this.refresherDone = '' // 로딩메세지 초기화
          }
        }
      }, 500)
    },
    // 상품 리스트 마지막 페이지 조회
    selectListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/orders/selectReturnedOrdersListLastPageNum',
        {params: {pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 상품 리스트 조회
    selectList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/orders/selectReturnedOrdersList',
        {params: {pageNum: idx, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.orderProductList = [] // 주문상품 리스트 초기화
          }
          this.orderProductList = this.orderProductList.concat(result.data)

          // 1. 처리버튼 표시 플래그 설정
          let oldOrderNo = ''
          let oldSid = '' // 판매자아이디
          for (let i = this.orderProductList.length - 1; i >= 0; i--) {
            let orderProductRow = this.orderProductList[i]
            // 판매자아이디가 같지 않으면 판매자 플래그 추가 (배송조회 등 처리 버튼을 판매자별로 표시하기 위해서)
            if (oldOrderNo !== orderProductRow.order_no || oldSid !== orderProductRow.sid) {
              orderProductRow.showButtonYn = 'Y'
            } else {
              orderProductRow.showButtonYn = 'N'
            }
            // console.log(i + ' ' + orderProductRow.sid + ' ' + orderProductRow.showButtonYn)
            oldOrderNo = orderProductRow.order_no
            oldSid = orderProductRow.sid
          }
          // 2. 주문 리스트 추출
          this.ordersList = [] // 주문 리스트 초기화
          oldOrderNo = ''
          for (let i = 0; i < this.orderProductList.length; i++) {
            let orderProductRow = this.orderProductList[i]
            // 주문번호가 같지 않으면 주문 정보 추가
            if (oldOrderNo !== orderProductRow.order_no) {
              this.ordersList.push(orderProductRow)
              oldOrderNo = orderProductRow.order_no
            }
          }
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    },
    // 상품 상세 화면으로 이동
    goProductDetail (seqProduct) {
      this.$router.push('/productDetail?seq=' + seqProduct)
    },
    cancelOrders (index) { // 주문취소
      this.$q.dialog({
        title: '주문 취소',
        message: '주문을 취소하시겠습니까?',
        ok: '예',
        cancel: '아니오',
        preventClose: true
      }).then(() => {
        // 주문 취소 처리
        // this.$axios.post(this.$store.state.apiServerIp + '/api/orders/cancelOrders', {params: {ordersVo: this.ordersList[index]}})
        this.$axios.post(this.$store.state.apiServerIp + '/api/orders/cancelOrders', this.ordersList[index])
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            if (result.data > 0) { // 취소 성공시
              this.$q.notify({
                color: 'primary',
                position: 'right',
                message: '주문이 취소되었습니다.',
                icon: 'notifications_active'
              })

              // 주문 및 주문상품 리스트 수정
              let orderNo = this.ordersList[index].order_no
              this.modifyListTo(orderNo, 'cancel')
            } else { // 취소 실패시
              this.$q.notify({
                color: 'primary',
                position: 'right',
                message: '취소할 수 없는 상태입니다.',
                icon: 'notifications_active'
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }).catch(() => {
        // 아무 처리 안함
      })
    },
    // 구매확정
    completeOrders (index) {
      this.$q.dialog({
        title: '구매확정',
        message: '구매를 확정하시겠습니까?',
        ok: '예',
        cancel: '아니오',
        preventClose: true
      }).then(() => {
        // 구매확정 처리
        this.$axios.post(this.$store.state.apiServerIp + '/api/orders/completeOrderSeller', this.ordersList[index])
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.$q.notify({
              color: 'primary',
              position: 'right',
              message: '구매 확정되었습니다.',
              icon: 'notifications_active'
            })

            // 주문 및 주문상품 리스트 수정
            let orderNo = this.ordersList[index].order_no
            this.modifyListTo(orderNo, 'completed')
          })
          .catch((err) => {
            console.log(err)
          })
      }).catch(() => {
        // 아무 처리 안함
      })
    },
    // 반품교환
    requestReturn (index) {
      let productList = [] // 반품교환 모달화면에 표시할 주문상품 리스트
      let selectedOrderNo = this.ordersList[index].order_no // 선택된 주문번호
      for (let i = 0; i < this.orderProductList.length; i++) {
        if (selectedOrderNo === this.orderProductList[i].order_no) {
          productList.push(JSON.parse(JSON.stringify(this.orderProductList[i])))
        }
      }
      this.$refs.orderReturnModal.orderProductList = productList
      this.$refs.orderReturnModal.show() // 배송관리 모달 열기
    },
    // 반품교환 콜백
    callbackOrderReturn (returnProductList) {
      let targetOrderNo = ''
      for (let i = 0; i < returnProductList.length; i++) {
        let returnProductRow = returnProductList[i]
        if (returnProductRow.status_return !== '00') { // 반품교환이 존재할 경우
          let targetOrderNo = returnProductRow.order_no
          for (let i = 0; i < this.orderProductList.length; i++) {
            let orderProductRow = this.orderProductList[i]
            if (targetOrderNo === orderProductRow.order_no) {
              // 반품교환 상태 설정
              orderProductRow.status_return = returnProductRow.status_return
            }
          }
        }
      }
      // 변경사항이 있을 경우
      if (targetOrderNo !== '') {
        for (let i = 0; i < this.ordersList.length; i++) {
          let ordersRow = this.ordersList[i]
          if (targetOrderNo === ordersRow.order_no) {
            // 반품교환요청여부 설정 후 종료
            ordersRow.request_return_yn = 'Y'
            return
          }
        }
      }
    },
    // 반품교환 정보
    showOrderReturnSellerModal (orderNo) {
      let orderProductList = []
      for (let i = 0; i < this.orderProductList.length; i++) {
        let orderProductRow = this.orderProductList[i]
        if (orderNo === orderProductRow.order_no) { // 주문번호가 같으면 제거
          orderProductList.push(orderProductRow)
        }
      }
      this.$refs.orderReturnSellerModal.orderProductList = orderProductList
      this.$refs.orderReturnSellerModal.show()
    },
    modifyListTo (orderNo, type) {
      let status = ''
      if (type === 'cancel') { // 주문 취소일 경우
        status = this.$store.state.ORDER_STATUS_CANCEL
      } else if (type === 'completed') {
        status = this.$store.state.ORDER_STATUS_PURCHASE_CONFIRMED
      } else if (type === 'return') {
        status = this.$store.state.ORDER_STATUS_REQUEST_RETURN
      }

      // 1. 주문상품 리스트 상태 수정
      for (let i = 0; i < this.orderProductList.length; i++) {
        let orderProductRow = this.orderProductList[i]
        if (orderNo === orderProductRow.order_no) { // 주문번호가 같으면 제거
          orderProductRow.status = status
        }
      }
      // 2. 주문 리스트 상태 수정
      for (let i = 0; i < this.ordersList.length; i++) {
        let ordersRow = this.ordersList[i]
        if (orderNo === ordersRow.order_no) { // 주문번호가 같으면 제거
          ordersRow.status = status
        }
      }
    },
    // 배송조회
    showDeliveryTracking (index) {
      let url = ''
      let deliveryCorpCd = this.ordersList[index].delivery_corp_cd
      if (deliveryCorpCd === 'epost') { // 우체국택배
        url = 'http://service.epost.go.kr/trace.RetrieveRegiPrclDeliv.postal?sid1='
      } else if (deliveryCorpCd === 'cj') { // CJ대한통운택배
        url = 'https://www.doortodoor.co.kr/parcel/doortodoor.do?fsp_action=PARC_ACT_002&fsp_cmd=retrieveInvNoACT&invc_no='
      } else if (deliveryCorpCd === 'hlc') { // 현대택배
        url = 'http://www.hlc.co.kr/hydex/jsp/tracking/trackingViewCus.jsp?InvNo='
      } else if (deliveryCorpCd === 'hanjin') { // 한진택배
        url = 'http://www.hanjin.co.kr/Delivery_html/inquiry/result_waybill.jsp?wbl_num='
      } else if (deliveryCorpCd === 'ilogen') { // 로젠택배
        url = 'http://d2d.ilogen.com/d2d/delivery/invoice_tracesearch_quick.jsp?slipno='
      } else if (deliveryCorpCd === 'dongbups') { // 동부익스프레스
        url = 'http://www.dongbups.com/newHtml/delivery/dvsearch.jsp?mode=SEARCH&search_type=1&sellNum=Y&search_item_no='
      } else if (deliveryCorpCd === 'yellowcap') { // 옐로우캡
        url = 'http://www.yellowcap.co.kr/custom/inquiry_result.asp?invoice_no='
      } else if (deliveryCorpCd === 'kdexp') { // 경동택배
        url = 'http://kdexp.com/basicNewDelivery.kd?barcode='
      } else if (deliveryCorpCd === 'daesinlogistics') { // 대신택배
        url = 'http://home.daesinlogistics.co.kr/daesin/jsp/d_freight_chase/d_general_process2.jsp?billno1='
      } else if (deliveryCorpCd === 'innogis') { // 이노지스택배
        url = 'http://www.innogis.net/trace02.asp?invoice='
      } else if (deliveryCorpCd === 'doortodoor') { // 편의점택배
        url = 'http://www.doortodoor.co.kr/jsp/cmn/TrackingCVS.jsp?pTdNo='
      } else if (deliveryCorpCd === 'kgbls') { // KGB택배
        url = 'http://www.kgbls.co.kr//sub5/trace.asp?f_slipno='
      } else if (deliveryCorpCd === 'hdexp') { // 합동택배
        url = 'http://www.hdexp.co.kr/parcel/order_result_t.asp?stype=1&p_item='
      } else if (deliveryCorpCd === 'ilyanglogis') { // 합동택배
        url = 'http://www.ilyanglogis.com/functionality/card_form_waybill.asp?hawb_no='
      } else if (deliveryCorpCd === 'cyber1001') { // 천일택배
        url = 'http://www.cyber1001.co.kr/kor/taekbae/HTrace.jsp?transNo='
      } else if (deliveryCorpCd === 'yongmalogis') { // 용마로지스
        url = 'http://yeis.yongmalogis.co.kr/trace/etrace_yongma.asp?OrdCode='
      } else if (deliveryCorpCd === 'gtxlogis') { // GTX로지스
        url = 'http://www.gtxlogis.co.kr/tracking/default.asp?awblno='
      } else if (deliveryCorpCd === 'klogis') { // 고려택배
        url = 'http://www.klogis.kr/03_business/01_tracking_detail_bcno.asp?bcno='
      } else if (deliveryCorpCd === 'quickquick') { // 퀵퀵닷컴
        url = 'http://www.quickquick.com/q/MTrack.php?hawb='
      } else if (deliveryCorpCd === 'kglogis') { // KG로지스
        url = 'http://www.kglogis.co.kr/delivery/delivery_result.jsp?item_no='
      } else if (deliveryCorpCd === 'cupost') { // CU편의점택배
        url = 'https://www.cupost.co.kr/postbox/delivery/localResult.cupost?invoice_no='
      } else if (deliveryCorpCd === 'lotteglogis') { // 롯데택배
        url = 'https://www.lotteglogis.com/open/tracking?invno='
      }

      if (deliveryCorpCd === 'epost') {
        url += '1111111111111'
      } else {
        url += this.ordersList[index].delivery_no
      }
      this.$refs.traceDeliveryModal.url = url
      this.$refs.traceDeliveryModal.deliveryCorpCd = this.ordersList[index].delivery_corp_cd
      this.$refs.traceDeliveryModal.deliveryNo = this.ordersList[index].delivery_no
      this.$refs.traceDeliveryModal.show()
    },
    deliveryFormatDate (date) {
      if (date == null || date === '') {
        return ''
      } else {
        return date.substr(0, 4) + '-' + date.substr(5, 2) + '-' + date.substr(8, 2) + ' 배송완료'
      }
    },
    // 장바구니 담기
    addToCart (item) {
      this.$q.loading.show() // 로딩중 표시 시작

      let orderProductList = [] // 임시로 리스트 생성
      let targetItem = JSON.parse(JSON.stringify(item)) // value 복사 - 원래의 객체는 변하지 않게 하기 위해서
      targetItem.seq = targetItem.seq_product // 이건 주문때 부터 잘못되었는데 영향범위.. 어쨌는 통일하기 위해서는 이렇게 해야함
      orderProductList.push(targetItem) // 해당 주문건 1건 추가

      console.log(JSON.stringify(targetItem))

      this.$axios.post(this.$store.state.apiServerIp + '/api/cart/addToCart', orderProductList)
        .then((result) => {
          this.$q.loading.hide() // 로딩중 표시 종료
          let resultCd = result.data.resultCd
          if (resultCd === '0') {
            /*
            this.$q.notify({
              color: 'blue',
              position: 'left',
              message: '장바구니에 담았습니다.',
              icon: 'notifications_active'
            })
            */
            this.$q.dialog({
              title: '장바구니',
              message: '상품을 담았습니다.',
              ok: '장바구니로 이동',
              cancel: '닫기'
            }).then(() => {
              this.$router.push('/menu/cartProductList')
            }).catch(() => {
              // this.$q.notify('닫기')
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
    addComma (num) {
      return Vue.prototype.$addComma(num)
    },
    goBack () {
      // 라우터 백 패스 설정
      let path = this.$store.state.ROUTER_FROM_PATH[this.$store.state.ROUTER_FROM_PATH.length - 1]
      // 라우터 백 패스 1개 삭제
      this.$store.state.ROUTER_FROM_PATH.splice(this.$store.state.ROUTER_FROM_PATH.length - 1, 1)
      // 뒤로가기 여부 - true일 경우 라우터 패스를 저장 안함, goBack() 함수 내에서 true로 설정, 라우터에서 false로 초기화
      this.$store.state.ROUTER_IS_MOVE_BACK = true
      // 라우터 백 패스로 이동
      this.$router.push(path)
    }
  }
}
</script>
