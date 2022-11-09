<template>
  <q-page class="">
    <orderReturnSellerModal ref="orderReturnSellerModal" />
    <orderDeliveryModal ref="orderDeliveryModal" @callback-order-delivery="callbackOrderDelivery" />
    <!-- <redirectModal ref="redirectModal" /> -->
    <traceDeliveryModal ref="traceDeliveryModal" />

    <q-toolbar color="black" inverted>
      <q-btn flat round dense :icon="headerIcon" />
      <!-- <q-btn flat round dense icon="local_shipping" /> -->
      <q-toolbar-title>{{ headerTitle }}</q-toolbar-title>
      <!-- <img src="statics/images/btn/123.png" style="width:20px; display:block;"> -->
      <q-btn flat round dense icon="forward" @click="$store.state.rightDrawerOpen = !$store.state.rightDrawerOpen" />
    </q-toolbar>

    <!-- 1. 조회 조건 -->
    <div class="bg-grey-2" style="width:100%; heigh:500px;">
      <!-- 1.1 조회기간 -->
      <q-card inline class="no-shadow" style="margin: 10px 0px 0px 0px;">
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td width="80" style="vertical-align:top;">
              <!-- 1.1.1 조회기간 헤더 -->
              <q-card inline class="q-ma-sm no-shadow" style="height:30px;">
                <table width="80" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <font size="2">조회기간</font>
                    </td>
                  </tr>
                </table>
              </q-card>
            </td>
            <td style="vertical-align:top;">

              <!-- 1.1.2 간편 조회기간 -->
              <q-card inline class="no-shadow" style="height:30px; margin: 0px 0px 15px 0px;">
                <table width="270" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left">
                      <q-btn-toggle
                        v-model="searchPeriod"
                        @input="searchPeriodInputHandler"
                        toggle-color="info"
                        text-color="black"
                        color="white"
                        :options="$store.state.searchPeriodOptions"
                      />
                    </td>
                  </tr>
                </table>
              </q-card>

              &nbsp;

              <!-- 1.1.3 조회 날짜 FROM / TO -->
              <q-card inline class="no-shadow" style="height:30px; margin: 0px 0px 15px 0px;">
                <table width="250" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <q-datetime
                        v-model="searchOrdersVo.searchDateFrom"
                        format="YYYY.MM.DD"
                        ok-label="입력"
                        cancel-label="취소"
                        color="white"
                        inverted-light
                        style="width:125px; height:36px;"
                      />
                    </td>
                    <td align="center">
                      &nbsp;&nbsp;~&nbsp;&nbsp;
                    </td>
                    <td align="center">
                      <q-datetime
                        v-model="searchOrdersVo.searchDateTo"
                        format="YYYY.MM.DD"
                        ok-label="입력"
                        cancel-label="취소"
                        color="white"
                        inverted-light
                        style="width:125px; height:36px;"
                      />
                    </td>
                  </tr>
                </table>
              </q-card>

            </td>
          </tr>
        </table>
      </q-card>

      <!-- 1.2 상세조건 -->
      <q-card inline class="no-shadow" style="margin: 10px 0px 0px 0px;">
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td width="80" style="vertical-align:top;">
              <!-- 1.2.1 상세조건 문구 -->
              <q-card inline class="q-ma-sm no-shadow" style="height:30px;">
                <table width="80" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <font size="2">상세조건</font>
                    </td>
                  </tr>
                </table>
              </q-card>
            </td>
            <td style="vertical-align:top;">

              <!-- 1.2.2 상세조건 항목 -->
              <q-card inline class="no-shadow" style="height:30px; margin: 0px 0px 15px 0px;">
                <table border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left">
                      <q-select
                        v-model="searchOrdersVo.searchField"
                        :options="$store.state.orderSearchFieldOptions"
                        inverted-light
                        color="white"
                        style="width:141px"
                        hide-underline
                      />
                    </td>
                  </tr>
                </table>
              </q-card>

              &nbsp;&nbsp;

              <!-- 1.2.3 상세조건 값 -->
              <q-card inline class="no-shadow" style="height:30px; margin: 0px 0px 15px 0px;">
                <table border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left">
                      <q-input
                        v-model.trim="searchOrdersVo.searchValue"
                        inverted-light
                        color="white"
                        style="width:265px;"
                        clearable
                      />
                    </td>
                  </tr>
                </table>
              </q-card>

            </td>
          </tr>
        </table>
      </q-card>

      <!-- 1.3 주문상태 -->
      <q-card v-if="$route.query.status === ''" inline class="no-shadow" style="margin: 10px 0px 0px 0px;">
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td width="80" style="vertical-align:top;">
              <!-- 1.3.1 주문상태 문구 -->
              <q-card inline class="q-ma-sm no-shadow" style="height:30px;">
                <table width="80" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <font size="2">주문상태</font>
                    </td>
                  </tr>
                </table>
              </q-card>
            </td>
            <td style="vertical-align:top;">

              <!-- 1.3.2 주문상태 항목 -->
              <q-card inline class="no-shadow" style="height:30px; margin: 0px 0px 15px 0px;">
                <table border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left">
                      <q-select
                        v-model="searchOrdersVo.status"
                        :options="$store.state.orderStatusOptions"
                        inverted-light
                        color="white"
                        style="width:141px"
                        hide-underline
                      />
                    </td>
                  </tr>
                </table>
              </q-card>

            </td>
          </tr>
        </table>
      </q-card>

      <!-- 1.4 검색 버튼 -->
      <q-card inline class="no-shadow" style="margin: 10px 0px 0px 0px;">
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td width="80" style="vertical-align:top;">
              <!-- 1.4.1 검색 문구 없음 -->
              <q-card inline class="q-ma-sm no-shadow" style="height:30px;">
                <table width="80" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <font size="2"></font>
                    </td>
                  </tr>
                </table>
              </q-card>
            </td>
            <td style="vertical-align:top;">

              <!-- 1.4.2 검색 버튼 -->
              <q-card inline class="no-shadow" style="height:30px; margin: 0px 0px 15px 0px;">
                <table border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left">
                      <q-btn
                        @click="search"
                        label="검색"
                        color="info"
                        icon="search"
                        style="width:141px"
                        no-ripple
                        :loading="loading"
                        :percentage="percentage"
                      >
                        <span slot="loading">
                          <q-spinner-oval class="on-left" />
                          검색중...
                        </span>
                      </q-btn>
                    </td>
                  </tr>
                </table>
              </q-card>

            </td>
          </tr>
        </table>
      </q-card>

      <!-- 1.5 엑셀 다운로드 버튼 -->
      <!-- TODO: 일단 비표시, 개발 필요 -->
      <q-card v-if="ordersList.length === 777" inline class="no-shadow" style="margin: 10px 0px 0px 0px;">
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td width="80" style="vertical-align:top;">
              <!-- 1.5.1 엑셀 다운로드 문구 없음 -->
              <q-card inline class="q-ma-sm no-shadow" style="height:30px;">
                <table width="80" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <font size="2"></font>
                    </td>
                  </tr>
                </table>
              </q-card>
            </td>
            <td style="vertical-align:top;">

              <!-- 1.5.2 엑셀 다운로드 버튼 -->
              <q-card inline class="no-shadow" style="height:30px; margin: 0px 0px 15px 0px;">
                <table border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left">
                      <q-btn
                        color="positive"
                        icon="format_list_bulleted"
                        style="width:141px"
                        label="엑셀다운"
                      />
                    </td>
                  </tr>
                </table>
              </q-card>

            </td>
          </tr>
        </table>
      </q-card>

    </div>

    <!-- 주문 리스트 -->
    <q-infinite-scroll :handler="loadMore" ref="infiniteScroll">
      <q-list v-for="(orders, index) in ordersList" :key="orders.seq">
        <div style="width: 100%">

          <!-- 주문일시 -->
          <q-card inline class="q-ma-sm no-shadow bg-white" style="height:30px;">
            <table width="110" border="0" cellspacing="0">
              <tr>
                <td width="" align="left"><font size="2" color="grey">주문일시</font></td>
              </tr>
              <tr>
                <td width="" align="left"><font size="2" color="black">{{ orders.reg_time.substring(0, 16) }}</font></td>
              </tr>
            </table>
          </q-card>

          <!-- 주문번호 -->
          <q-card inline class="q-ma-sm no-shadow bg-white" style="height:30px;">
            <table width="180" border="0" cellspacing="0">
              <tr>
                <td width="" align="left"><font size="2" color="grey">주문번호</font></td>
              </tr>
              <tr>
                <td width="" align="left"><font size="2" color="black">{{ orders.order_no }}</font></td>
              </tr>
            </table>
          </q-card>

          <!-- 주문상태 -->
          <q-card inline class="q-ma-sm no-shadow bg-white" style="height:30px;">
            <table width="70" border="0" cellspacing="0">
              <tr>
                <td width="" align="left"><font size="2" color="grey">주문상태</font></td>
              </tr>
              <tr>
                <td width="" align="left"><q-select hide-underline v-model="orders.status" :options="$store.state.orderStatusOptions" readonly /></td>
              </tr>
            </table>
          </q-card>

          <!-- 주문상품 리스트 -->
          <q-card inline class="q-ma-sm no-shadow bg-white">
            <div v-for="item in orderProductList" :key="item.seq">
              <div v-if="orders.order_no === item.order_no">
                <table width="500" border="0" cellpadding="1" cellspacing="0">
                  <tr>
                    <td width="60" rowspan="3" align="left" style="vertical-align:top;">
                      <a @click="goProductDetail(item.seq_product)" class="cursor-pointer">
                        <img :src="item.image_url" style="width:50px; height:50px; object-fit:cover; border-radius: 3px; display:block;">
                      </a>
                    </td>
                    <td align="left">
                      <font size="2" color="black">{{ item.title }}</font>&nbsp;&nbsp;&nbsp;
                      <font v-if="item.status_return === '40'" size="2" color="red" @click="showOrderReturnSellerModal(orders.order_no)"> 교환신청</font>
                      <font v-if="item.status_return === '45'" size="2" color="red" @click="showOrderReturnSellerModal(orders.order_no)"> 교환완료</font>
                      <font v-if="item.status_return === '62'" size="2" color="red" @click="showOrderReturnSellerModal(orders.order_no)"> 반품신청</font>
                      <font v-if="item.status_return === '64'" size="2" color="red" @click="showOrderReturnSellerModal(orders.order_no)"> 반품완료</font>
                    </td>
                  </tr>
                  <tr>
                    <td align="left">
                      <font size="2" color="black">{{ addComma(item.order_price) }}원 / {{ item.order_quantity }}개</font>
                      <font size="2" color="grey">&nbsp;&nbsp;&nbsp;{{ item.select_option1 }}&nbsp;{{ item.select_option2 }}&nbsp;{{ item.select_option3 }}</font>
                    </td>
                  </tr>
                  <tr v-if="item.seller_product_cd != null">
                    <td align="left"><font size="2" color="green">{{ item.seller_product_cd }}</font></td>
                  </tr>
                </table>
              </div>
            </div>
          </q-card>

          <!-- 배송지 정보 -->
          <q-card inline class="q-ma-sm no-shadow bg-white">
            <table width="390" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td width="" colspan="2" align="left"><q-btn color="info" outline size="xs" style="width:110px"><font size="2">배송지 정보</font></q-btn></td>
              </tr>
              <tr>
                <td colspan="2"><q-card-separator /></td>
              </tr>
              <tr>
                <td width="70" align="left"><font size="2" color="black">받는사람</font></td>
                <td align="left" colspan="2">
                  <font size="2">
                    {{ orders.to_name }}
                    &nbsp;/&nbsp; {{ orders.to_mobile_no }}
                    <span v-if="orders.to_tel_no != null">&nbsp;/&nbsp; {{ orders.to_tel_no }}</span>
                  </font>
                </td>
              </tr>
              <tr>
                <td align="left"><font size="2" color="black">주소</font></td>
                <td align="left" colspan="2"><font size="2">{{ orders.to_post_no }} &nbsp;/&nbsp; {{ orders.to_address1 }}</font></td>
              </tr>
              <tr>
                <td align="left"><font size="2" color="black">요청사항</font></td>
                <td align="left" colspan="2"><font size="2">{{ orders.to_message }}</font></td>
              </tr>
            </table>
          </q-card>

          <!-- 구매자 정보 -->
          <q-card inline class="q-ma-sm no-shadow bg-white">
            <table width="220" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td width="140" colspan="2" align="left"><q-btn color="positive" outline size="xs" style="width:110px"><font size="2">구매자 정보</font></q-btn></td>
              </tr>
              <tr>
                <td colspan="2"><q-card-separator /></td>
              </tr>
              <tr>
                <td width="60" align="left"><font size="2" color="black">구매자</font></td>
                <td align="left" colspan="2"><font size="2">{{ orders.from_name }}</font></td>
              </tr>
              <tr>
                <td align="left"><font size="2" color="black">연락처</font></td>
                <td align="left" colspan="2"><font size="2">{{ orders.from_mobile_no }}</font></td>
              </tr>
              <tr>
                <td align="left"><font size="2" color="black">이메일</font></td>
                <td align="left" colspan="2"><font size="2">{{ orders.from_email }}</font></td>
              </tr>
            </table>
          </q-card>

          <!-- 배송상태 -->
          <q-card inline class="q-ma-sm no-shadow bg-white" style="height:30px;" v-if="orders.delivery_end_date != null">
            <table width="72" border="0" cellspacing="0">
              <tr>
                <td width="" align="left"><font size="2" color="grey">배송완료</font></td>
              </tr>
              <tr>
                <td width="" align="left"><font size="2" color="black">{{ deliveryFormatDate(orders.delivery_end_date) }}</font></td>
              </tr>
            </table>
          </q-card>

        </div>

        <!-- 주문관리 버튼 -->
        <div v-if="orders.status !== $store.state.ORDER_STATUS_CANCEL &&
                   orders.status !== $store.state.ORDER_STATUS_CANCEL_SELLER">
          <table border="0" style="width: 98%">
            <thead>
              <th width="10%"></th>
              <th width="10%"></th>
              <th width="10%"></th>
              <th width="10%"></th>
              <th width="10%"></th>
              <th width="10%"></th>
              <th width="10%"></th>
              <th width="10%"></th>
              <th width="10%"></th>
              <th width="10%"></th>
            </thead>
            <tr>
              <td colspan="1" align="right">
                <q-btn
                  label="주문취소"
                  v-if="orders.status === $store.state.ORDER_STATUS_PAYMENT_COMPLETED"
                  @click="sellerCancelOrders(index)"
                  dense
                  color="primary"
                  style="width:120px"
                />
              </td>
              <td colspan="1" align="right">
                <q-btn
                  label="주문확인"
                  v-if="orders.status === $store.state.ORDER_STATUS_PAYMENT_COMPLETED"
                  @click="prepareDelivery(index)"
                  dense
                  color="positive"
                  style="width:120px"
                />
              </td>
              <td colspan="1" align="right">
                <q-btn
                  label="송장번호등록"
                  v-if="orders.status === $store.state.ORDER_STATUS_DELIVERY_WAIT"
                  @click="showOrderDeliveryModal(index, 'insert')"
                  dense
                  color="info"
                  style="width:120px"
                />
              </td>
              <td colspan="1" align="right">
                <q-btn
                  label="배송정보관리"
                  v-if="orders.status === $store.state.ORDER_STATUS_DELIVERY_STARTED ||
                        orders.status === $store.state.ORDER_STATUS_DELIVERY_COMPLETED"
                  @click="showOrderDeliveryModal(index, 'update')"
                  dense
                  color="info"
                  style="width:120px"
                />
              </td>
              <td colspan="1" align="right">
                <q-btn
                  label="배송조회"
                  v-if="orders.delivery_no != null"
                  @click="showDeliveryTracking(index)"
                  dense
                  color="info"
                  style="width:120px"
                />
              </td>
              <td colspan="5"></td>
            </tr>
          </table>
        </div>
      </q-list>
      <br>
      <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
    </q-infinite-scroll>
    <br>
    <br>
    <br>
    <br>
  </q-page>
</template>

<style>
</style>

<script>
import Vue from 'vue'

export default {
  name: 'orders-list',
  data () {
    return {
      headerIcon: '', // 헤더 아이콘
      headerTitle: '', // 헤더 타이틀
      searchOrdersVo: { // ■ 주문검색 vo
        status: '', // 주문상태
        searchDateFrom: '', // 조회기간 FROM
        searchDateTo: '', // 조회기간 TO
        searchField: '', // 상세조건 항목
        searchValue: '' // 상세조건 값
      },
      searchPeriod: 'WEEK', // 간편조회기간 코드
      loading: false,
      percentage: 0,
      pageSize: 15,
      lastPageNum: 1, // 마지막 페이지
      orderProductList: [], // 주문상품 리스트 - 작은루프
      ordersList: [] // 주문 리스트 - DB에서 조회한 주문상품 리스트에서 추출 - 큰루프
    }
  },
  // 파라미터가 변경되면 감지
  watch: {
    '$route.query.status': function (status) {
      // 헤더 타이틀 설정
      this.setHeaderTitle(status)

      this.searchOrdersVo.status = status
      // 주문 조회인 경우 리스트 초기화
      if (status === '') { // 주문 조회인 경우
        this.ordersList = [] // 리스트 초기화
      } else { // 판매 관리인 경우 - 리스트 자동 조회
        this.search() // 주문 검색
      }
    }
  },
  components: {
  },
  created: function () {
    // 사용자 역할 타입 설정 S:SELLER(판매자) B:BUYER(구매자)
    this.$store.state.USER_ROLL_TYPE = 'S'

    // 판매자 메인 화면에서 이동시 status 파라미터를 설정
    if (this.$route.query.status != null) {
      this.searchOrdersVo.status = this.$route.query.status
    }

    // 헤더 타이클 설정
    this.setHeaderTitle(this.$route.query.status)

    // 조회기간 시작일 종료일 -> '1주일'로 설정
    this.searchPeriodInputHandler('WEEK')

    // 페이지 맥스 조회
    this.selectListMax()
  },
  methods: {
    // 간편 조회기간 이벤트 핸들러
    searchPeriodInputHandler (param) {
      // alert(param)
      if (param === 'TODAY') {
        let today = this.getToday()
        this.searchOrdersVo.searchDateFrom = today
        this.searchOrdersVo.searchDateTo = today
      } else if (param === 'WEEK') {
        let today = this.getToday()
        let targetDate = this.getWeekBeforeDate()
        this.searchOrdersVo.searchDateFrom = targetDate
        this.searchOrdersVo.searchDateTo = today
      } else if (param === 'MONTH') {
        let today = this.getToday()
        let targetDate = this.getMonthBeforeDate()
        this.searchOrdersVo.searchDateFrom = targetDate
        this.searchOrdersVo.searchDateTo = today
      } else if (param === 'QUARTER') {
        let today = this.getToday()
        let targetDate = this.getQuarterBeforeDate()
        this.searchOrdersVo.searchDateFrom = targetDate
        this.searchOrdersVo.searchDateTo = today
      }
    },
    // 오늘 날짜 반환
    getToday () {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1 // 0부터 시작하므로 1더함 더함
      let day = date.getDate()
      if (('' + month).length === 1) {
        month = '0' + month
      }
      if (('' + day).length === 1) {
        day = '0' + day
      }
      let targetDate = year + '-' + month + '-' + day + ''
      return targetDate
    },
    // 1주일전 날짜 반환
    getWeekBeforeDate () {
      let date = new Date()
      date.setDate(date.getDate() - 7)
      let year = date.getFullYear()
      let month = date.getMonth() + 1 // 0부터 시작하므로 1더함 더함
      let day = date.getDate()
      if (('' + month).length === 1) {
        month = '0' + month
      }
      if (('' + day).length === 1) {
        day = '0' + day
      }
      let targetDate = year + '-' + month + '-' + day + ''
      return targetDate
    },
    // 1개월전 날짜 반환
    getMonthBeforeDate () {
      let date = new Date()
      date.setDate(date.getDate() - 31)
      let year = date.getFullYear()
      let month = date.getMonth() + 1 // 0부터 시작하므로 1더함 더함
      let day = date.getDate()
      if (('' + month).length === 1) {
        month = '0' + month
      }
      if (('' + day).length === 1) {
        day = '0' + day
      }
      let targetDate = year + '-' + month + '-' + day + ''
      return targetDate
    },
    // 3개월전 날짜 반환
    getQuarterBeforeDate () {
      let date = new Date()
      date.setDate(date.getDate() - 92)
      let year = date.getFullYear()
      let month = date.getMonth() + 1 // 0부터 시작하므로 1더함 더함
      let day = date.getDate()
      if (('' + month).length === 1) {
        month = '0' + month
      }
      if (('' + day).length === 1) {
        day = '0' + day
      }
      let targetDate = year + '-' + month + '-' + day + ''
      return targetDate
    },
    setHeaderTitle (status) {
      // 헤더 타이틀 설정
      if (status === '01') {
        this.headerTitle = '신규 주문'
        this.headerIcon = 'check'
      } else if (status === '11') {
        this.headerTitle = '배송 준비'
        this.headerIcon = 'shop_two'
      } else if (status === '12') {
        this.headerTitle = '배송 관리'
        this.headerIcon = 'local_shipping'
      } else if (status === '21') {
        this.headerTitle = '배송 완료'
        this.headerIcon = 'done_outline'
      } else if (status === '030405') {
        this.headerTitle = '취소 관리'
        this.headerIcon = 'cancel'
      } else if (status === '626466') {
        this.headerTitle = '반품 관리'
        this.headerIcon = 'settings_backup_restore'
      } else if (status === '4045') {
        this.headerTitle = '교환 관리'
        this.headerIcon = 'loop'
      } else if (status === '90') {
        this.headerTitle = '구매 확정'
        this.headerIcon = 'sentiment_satisfied_alt'
      } else {
        this.headerTitle = '주문 조회'
        this.headerIcon = 'search'
      }
    },
    // ■■■ 검색 ■■■
    search () {
      this.loading = true // 검색버튼 로딩중 표시 시작
      // this.orderProductList = [] // 리스트 초기화
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
      console.log('index: ' + index)
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
        }
      }, 500)
    },
    // 주문 리스트 마지막 페이지 조회
    selectListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/orderseller/searchOrderSellerListLastPageNum',
        {params: {
          pageSize: this.pageSize,
          status: this.searchOrdersVo.status,
          searchDateFrom: this.searchOrdersVo.searchDateFrom,
          searchDateTo: this.searchOrdersVo.searchDateTo,
          searchField: this.searchOrdersVo.searchField,
          searchValue: this.searchOrdersVo.searchValue
        }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 주문 리스트 조회
    selectList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/orderseller/searchOrderSellerList',
        {params: {
          pageNum: idx,
          pageSize: this.pageSize,
          status: this.searchOrdersVo.status,
          searchDateFrom: this.searchOrdersVo.searchDateFrom,
          searchDateTo: this.searchOrdersVo.searchDateTo,
          searchField: this.searchOrdersVo.searchField,
          searchValue: this.searchOrdersVo.searchValue
        }})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.orderProductList = [] // 주문상품 리스트 초기화
          }
          this.orderProductList = this.orderProductList.concat(result.data)

          // 주문 리스트 추출
          this.ordersList = [] // 주문 리스트 초기화
          let oldOrderNo = ''
          for (let i = 0; i < this.orderProductList.length; i++) {
            let orderProductRow = this.orderProductList[i]
            if (oldOrderNo !== orderProductRow.order_no) { // 주문번호가 같지 않으면 주문 정보 추가
              this.ordersList.push(orderProductRow)
              oldOrderNo = orderProductRow.order_no
            }
          }
          this.loading = false // 검색버튼 로딩중 표시 종료
          done()
        })
        .catch((err) => {
          console.log(err)
          this.loading = false // 검색버튼 로딩중 표시 종료
          done()
        })
    },
    // 판매자 주문취소
    sellerCancelOrders (index) {
      this.$q.dialog({
        title: '주문취소',
        message: '주문취소 사유를 입력해주세요.',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: '닫기',
        ok: '주문취소',
        color: 'primary'
      }).then(data => {
        let cancelReason = `${data}`
        if (cancelReason.trim() === '') {
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '취소 사유를 적어주세요.',
            icon: 'notifications_active'
          })
          return
        }
        // 주문취소 선택시 처리
        this.$q.loading.show() // 로딩중 표시 시작
        this.ordersList[index].cancel_reason = cancelReason
        // this.$q.notify(this.ordersList[index].cancel_reason)
        this.$axios.post(this.$store.state.apiServerIp + '/api/orderseller/sellerCancelOrderSeller', this.ordersList[index])
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.$q.loading.hide() // 로딩중 표시 종료
            if (result.data === 'SUCCESS') { // 취소 성공시
              this.$q.notify({
                color: 'primary',
                position: 'top',
                message: '주문이 취소되었습니다.',
                icon: 'notifications_active'
              })

              // 주문 및 주문상품 리스트 수정
              let orderNo = this.ordersList[index].order_no
              this.modifyListTo(orderNo, 'cancel')
            } else { // 취소 실패시
              this.$q.notify({
                color: 'primary',
                position: 'top',
                message: result.data,
                icon: 'notifications_active'
              })
            }
          })
          .catch((err) => {
            this.$q.loading.hide() // 로딩중 표시 종료
            console.log(err)
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: err,
              icon: 'notifications_active'
            })
          })
      }).catch(() => {
        // 닫기 선택시 처리
      })
    },
    // 주문확인 -> 배송준비
    prepareDelivery (index) {
      this.$axios.post(this.$store.state.apiServerIp + '/api/orderseller/prepareDelivery', this.ordersList[index])
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data > 0) { // 주문확인 성공시
            this.$q.notify({
              color: 'blue',
              position: 'top',
              message: '배송 후 송장번호를 입력해주세요.',
              icon: 'notifications_active'
            })

            // 주문 및 주문상품 리스트 수정
            let orderNo = this.ordersList[index].order_no
            this.modifyListTo(orderNo, 'prepareDelivery')
          } else { // 주문확인 실패시
            this.$q.notify({
              color: 'blue',
              position: 'top',
              message: '주문상태를 새로고침 후 확인해주세요.',
              icon: 'notifications_active'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    modifyListTo (orderNo, type) {
      let status = ''
      if (type === 'cancel') { // 주문 취소일 경우
        status = this.$store.state.ORDER_STATUS_CANCEL_SELLER
      } else if (type === 'prepareDelivery') { // 주문확인일 경우
        status = this.$store.state.ORDER_STATUS_DELIVERY_WAIT
      } else if (type === 'return') { // 반품일 경우
        status = this.$store.state.ORDER_STATUS_REQUEST_RETURN_COMPLETED
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
    // 상품 상세 화면으로 이동
    goProductDetail (seqProduct) {
      this.$router.push('/productDetail?seq=' + seqProduct)
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
    // 배송관리
    showOrderDeliveryModal (index, type) {
      this.$refs.orderDeliveryModal.orderProductVo = this.ordersList[index]
      this.$refs.orderDeliveryModal.type = type // insert: 등록, update: 수정
      // this.$refs.orderDeliveryModal.index = index
      this.$refs.orderDeliveryModal.show() // 배송관리 모달 열기
    },
    callbackOrderDelivery () {
      this.refresher() // 화면 갱신
      // 주문번호가 같은 데이터를 찾아서 상태를 '21'(배송완료)로 변경
      // 다시 조회되기 전까지 상태 임시 반영
      /*
      if (orderProductVo.status_order_product === '12') { // '12':배송중
        for (let i = 0; i < this.ordersList.length; i++) {
          let orders = this.ordersList[i]
          let ordersOrderNo = orders.order_no
          if (ordersOrderNo === orderProductVo.order_no) {
            orders.status = '12'
          }
        }
      } else if (orderProductVo.status_order_product === '21') { // '12':배송중
      }
      */

      // alert(orderNo)
      // let index = this.$refs.orderDeliveryModal.index
      // alert(index)
      // this.ordersList[index] = this.$refs.orderDeliveryModal.orderProductVo
    },
    // 배송조회
    showDeliveryTracking (index) {
      /*
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
      */
      this.$refs.traceDeliveryModal.deliveryCorpCd = this.ordersList[index].delivery_corp_cd
      this.$refs.traceDeliveryModal.deliveryNo = this.ordersList[index].delivery_no
      this.$refs.traceDeliveryModal.comment = this.ordersList[index].comment
      this.$refs.traceDeliveryModal.show()
    },
    deliveryFormatDate (date) {
      if (date == null || date === '') {
        return ''
      } else {
        return date.substr(0, 4) + '-' + date.substr(5, 2) + '-' + date.substr(8, 2)
      }
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
