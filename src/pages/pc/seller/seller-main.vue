<template>
  <q-page class="bg-grey-2">

    <q-toolbar color="black" inverted>
      <q-btn flat round dense icon="store" />
      <q-toolbar-title>{{ $store.state.userVo.name }}</q-toolbar-title>
      <q-btn flat round dense icon="library_add" color="positive" to="/seller/product/productRegister" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <q-btn flat round dense icon="shopping_cart" color="negative" to="/main" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <!-- <q-btn flat round dense icon="refresh" color="grey" />&nbsp;&nbsp;&nbsp; -->
      <q-btn flat round dense icon="forward" @click="$store.state.rightDrawerOpen = !$store.state.rightDrawerOpen" />
    </q-toolbar>

    <div style="width: 100%; margin: 0px 0px 0px 0px;">

      <!-- 1. 신규주문 -->
      <q-card inline class="q-ma-sm shadow-1 bg-white" style="height:110px;">
        <table width="405" border="0" cellspacing="10">
          <tr>
            <td width="50" align="center" rowspan="2">
              <q-icon name="check" size="30px" />
            </td>
            <td width="155" align="left" class="cursor-pointer">
              <a @click="doPreAction('/p/seller/ordersList?status=01')">
                <font size="3" color="black">신규주문</font>
              </a>
            </td>
            <td width="200" align="right" class="cursor-pointer">
              <a @click="doPreAction('/p/seller/ordersList?status=01')">
                <font size="3" color="red">{{ sellerMainVo.cnt_new_orders }}</font>
                <font size="3" color="black">&nbsp;&nbsp;건</font>
              </a>
            </td>
          </tr>
          <!--
          <tr>
            <td align="left" class="cursor-pointer">
              <a @click="doPreAction('/p/seller/saf')">
                <font size="3" color="black">입금대기</font>
              </a>
            </td>
            <td align="right" class="cursor-pointer">
              <font size="3" color="red">1</font>
              <font size="3" color="black">&nbsp;&nbsp;건</font>
            </td>
          </tr>
          -->
          <tr>
            <td colspan="3"></td>
          </tr>
        </table>
      </q-card>

      <!-- 2. 배송관리 -->
      <q-card inline class="q-ma-sm shadow-1 bg-white" style="height:110px;">
        <table width="405" border="0" cellspacing="10">
          <tr>
            <td width="50" align="center" rowspan="2">
              <q-icon name="local_shipping" size="30px" />
            </td>
            <td width="155" align="left" class="cursor-pointer">
              <a @click="doPreAction('/p/seller/ordersList?status=11')">
                <font size="3" color="black">배송준비</font>
              </a>
            </td>
            <td width="200" align="right" class="cursor-pointer">
              <a @click="doPreAction('/p/seller/ordersList?status=11')">
                <font size="3" color="red">{{ sellerMainVo.cnt_prepare_delivery }}</font>
                <font size="3" color="black">&nbsp;&nbsp;건</font>
              </a>
            </td>
          </tr>
          <tr>
            <td align="left" class="cursor-pointer">
              <a @click="doPreAction('/p/seller/ordersList?status=12')">
                <font size="3" color="black">배송중</font>
              </a>
            </td>
            <td align="right" class="cursor-pointer">
              <a @click="doPreAction('/p/seller/ordersList?status=12')">
                <font size="3" color="red">{{ sellerMainVo.cnt_process_delivery }}</font>
                <font size="3" color="black">&nbsp;&nbsp;건</font>
              </a>
            </td>
          </tr>
          <tr>
            <td></td>
            <td align="left" class="cursor-pointer">
              <a @click="doPreAction('/p/seller/ordersList?status=21')">
                <font size="3" color="black">배송완료</font>
              </a>
            </td>
            <td align="right" class="cursor-pointer">
              <a @click="doPreAction('/p/seller/ordersList?status=21')">
                <font size="3" color="red">{{ sellerMainVo.cnt_completed_delivery }}</font>
                <font size="3" color="black">&nbsp;&nbsp;건</font>
              </a>
            </td>
          </tr>
        </table>
      </q-card>

      <!-- 3. 취소/반품/교환 -->
      <q-card inline class="q-ma-sm shadow-1 bg-white" style="height:110px;">
        <table width="405" border="0" cellspacing="10">
          <tr>
            <td width="50" align="center" rowspan="2">
              <q-icon name="settings_backup_restore" size="30px" />
            </td>
            <td width="155" align="left" class="cursor-pointer">
              <a @click="doPreAction('/p/seller/ordersList?status=030405')">
                <font size="3" color="black">취소요청</font>
              </a>
            </td>
            <td width="200" align="right" class="cursor-pointer">
              <a @click="doPreAction('/p/seller/ordersList?status=030405')">
                <font size="3" color="red">{{ sellerMainVo.cnt_request_cancel }}</font>
                <font size="3" color="black">&nbsp;&nbsp;건</font>
              </a>
            </td>
          </tr>
          <tr>
            <td align="left" class="cursor-pointer">
              <a @click="doPreAction('/p/seller/ordersList?status=626466')">
                <font size="3" color="black">반품요청</font>
              </a>
            </td>
            <td align="right" class="cursor-pointer">
              <a @click="doPreAction('/p/seller/ordersList?status=626466')">
                <font size="3" color="red">{{ sellerMainVo.cnt_request_return }}</font>
                <font size="3" color="black">&nbsp;&nbsp;건</font>
              </a>
            </td>
          </tr>
          <tr>
            <td></td>
            <td align="left" class="cursor-pointer">
              <a @click="doPreAction('/p/seller/ordersList?status=4045')">
                <font size="3" color="black">교환요청</font>
              </a>
            </td>
            <td align="right" class="cursor-pointer">
              <a @click="doPreAction('/p/seller/ordersList?status=4045')">
                <font size="3" color="red">{{ sellerMainVo.cnt_request_exchange }}</font>
                <font size="3" color="black">&nbsp;&nbsp;건</font>
              </a>
            </td>
          </tr>
        </table>
      </q-card>

      <!-- 4. 정산 -->
      <q-card inline class="q-ma-sm shadow-1 bg-white" style="height:110px;">
        <table width="405" border="0" cellspacing="10">
          <tr>
            <td width="50" align="center" rowspan="2">
              <q-icon name="monetization_on" size="30px" />
            </td>
            <td width="155" align="left" class="cursor-pointer">
              <a @click="doPreAction('/seller/menu/settle')">
                <font size="3" color="black">오늘정산</font>
              </a>
            </td>
            <td width="200" align="right" class="cursor-pointer">
              <a @click="doPreAction('/seller/menu/settle')">
                <font size="3" color="red">{{ addComma(sellerMainVo.settle_today) }}</font>
                <font size="3" color="black">&nbsp;&nbsp;원</font>
              </a>
            </td>
          </tr>
          <tr>
            <td align="left" class="cursor-pointer">
              <a @click="doPreAction('/seller/menu/settle')">
                <font size="3" color="black">정산예정</font>
              </a>
            </td>
            <td align="right" class="cursor-pointer">
              <a @click="doPreAction('/seller/menu/settle')">
                <font size="3" color="red">{{ addComma(sellerMainVo.settle_future) }}</font>
                <font size="3" color="black">&nbsp;&nbsp;원</font>
              </a>
            </td>
          </tr>
          <tr>
            <td colspan="3"></td>
          </tr>
        </table>
      </q-card>

      <!-- 5. 문의사항 -->
      <q-card inline class="q-ma-sm shadow-1 bg-white" style="height:110px;">
        <table width="405" border="0" cellspacing="10">
          <tr>
            <td width="50" align="center" rowspan="2">
              <q-icon name="help" size="30px" />
            </td>
            <td width="155" align="left" class="cursor-pointer">
              <a @click="doPreAction('/seller/menu/sellerQnaList')">
                <font size="3" color="black">상품문의</font>
              </a>
            </td>
            <td width="200" align="right" class="cursor-pointer">
              <a @click="doPreAction('/seller/menu/sellerQnaList')">
                <font size="3" color="red">{{ sellerMainVo.cnt_qna_product }}</font>
                <font size="3" color="black">&nbsp;&nbsp;건</font>
              </a>
            </td>
          </tr>
          <tr>
            <td align="left" class="cursor-pointer">
              <a @click="doPreAction('/seller/menu/sellerQnaList')">
                <font size="3" color="black">고객문의</font>
              </a>
            </td>
            <td align="right" class="cursor-pointer">
              <a @click="doPreAction('/seller/menu/sellerQnaList')">
                <font size="3" color="red">{{ sellerMainVo.cnt_qna_seller }}</font>
                <font size="3" color="black">&nbsp;&nbsp;건</font>
              </a>
            </td>
          </tr>
          <tr>
            <td colspan="3"></td>
          </tr>
        </table>
      </q-card>

      <!-- 6. 상품관리 -->
      <q-card inline class="q-ma-sm shadow-1 bg-white" style="height:110px;">
        <table width="405" border="0" cellspacing="10">
          <tr>
            <td width="50" align="center" rowspan="2">
              <q-icon name="widgets" size="30px" />
            </td>
            <td width="155" align="left" class="cursor-pointer">
              <a @click="doPreAction('/seller/product')">
                <font size="3" color="black">판매중인 상품</font>
              </a>
            </td>
            <td width="200" align="right" class="cursor-pointer">
              <a @click="doPreAction('/seller/product')">
                <font size="3" color="red">{{ sellerMainVo.cnt_product_use_y }}</font>
                <font size="3" color="black">&nbsp;&nbsp;건</font>
              </a>
            </td>
          </tr>
          <tr>
            <td align="left" class="cursor-pointer">
              <a @click="doPreAction('/seller/product')">
                <font size="3" color="black">판매대기 상품</font>
              </a>
            </td>
            <td align="right" class="cursor-pointer">
              <a @click="doPreAction('/seller/product')">
                <font size="3" color="red">{{ sellerMainVo.cnt_product_use_n }}</font>
                <font size="3" color="black">&nbsp;&nbsp;건</font>
              </a>
            </td>
          </tr>
          <tr>
            <td colspan="3"></td>
          </tr>
        </table>
      </q-card>

      <!-- 하단 테이블 -->
      <table border="0" align="center" :style="bottomTableStyle">
        <tr>
          <td align="center" style="vertical-align:middle;">
            <img src="statics/images/logo/logo.png" width="100px" style="display: block;">
            <b>
            <font size="6" color="black">meta</font>
            <font size="6" color="#027be3">s</font>
            <font size="6" color="#34A853">h</font>
            <font size="6" color="#FBBC05">o</font>
            <font size="6" color="#EA4335">p</font>
            <font size="6" color="black">se</font>
            </b>
          </td>
        </tr>
      </table>

    </div>
    <br>
    <br>&nbsp;
  </q-page>
</template>

<style>
</style>

<script>
import Vue from 'vue'
// import { mapState } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      sellerMainVo: {}, // 판매자 메인 vo
      processTableWidth: '300px' // 판매 요약 테이블 너비 - created에서 재계산
    }
  },
  components: {
  },
  /*
  computed: mapState([
    'pageMeta'
  ]),
  */
  created: function () {
    // 사용자 역할 타입 설정 S:SELLER(판매자) B:BUYER(구매자)
    this.$store.state.USER_ROLL_TYPE = 'S'
    // 우측 플레이어 클래스 설정 - IE에서 플레이어가 사라지지 않는 버그?가 있어서..
    this.$store.state.rightPlayerClass = ''

    // 화면 너비 4등분 300:좌측 메뉴 너비
    // this.processTableWidth = (window.innerWidth - 300) / 4

    // 하단 테이블 스타일
    this.bottomTableStyle = 'height:' + (window.innerHeight - 360) + 'px'

    // APP에서 이동한 경우 파라미터에 uid, auth_key가 붙어서 옴 -> 로그인 처리
    if (this.$route.query.uid != null && this.$route.query.auth_key != null &&
        (this.$store.state.device === 'android' || this.$store.state.device === 'ios')) { // APP
      this.loginFromApp(this.$route.query.uid, this.$route.query.auth_key)
    } else {
      this.initPage() // 화면 초기화
    }

    // 미확인 메세지 건수 조회
    if (this.$store.state.userVo != null && this.$store.state.userVo.uid != null && this.$store.state.userVo.uid !== '') {
      this.$axios.get(this.$store.state.apiServerIp + '/api/message/selectUnreadMessageCount',
        {params: {uid: this.$store.state.userVo.uid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$store.state.unreadMessageCount = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted: function () {
  },
  methods: {
    initPage () {
      // 사용자 정보 조회
      // this.$q.loading.show() // 로딩 표시 시작
      this.$axios.get(this.$store.state.apiServerIp + '/api/seller/selectSellerMain')
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // this.$q.loading.hide() // 로딩 표시 종료
          this.sellerMainVo = result.data
        })
        .catch((err) => {
          console.log(err)
          // this.$q.loading.hide() // 로딩 표시 종료
        })
    },
    // APP에서 왔을때 로그인 처리
    loginFromApp (uid, authKey) {
      // APP에서 이동한 경우 파라미터에 uid, auth_key가 붙어서 옴 -> 로그인 처리

      // 쿠키에 사용자 정보 저장
      this.$cookie.set('uid', uid, 365)
      this.$cookie.set('auth_key', authKey, 365)

      // 로그인
      let userVo = {}
      userVo.uid = uid
      userVo.pwd = authKey
      this.$axios.post(this.$store.state.apiServerIp + '/api/login/doLogin', userVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // 사용자 정보 설정
          this.$store.state.userVo = result.data // 사용자 정보 설정

          this.initPage() // 화면 초기화

          // 사용자 코인 조회
          this.$axios.get(this.$store.state.apiServerIp + '/api/coin/selectCoinRanking',
            {params: {uid: this.$store.state.userVo.uid}})
            .then((result) => {
              // console.log(JSON.stringify(result.data))
              // 코인 정보 설정
              this.$store.state.coinVo = result.data
            })
            .catch((err) => {
              console.log('★★3 ' + err)
            })

          // 판매자 정보 조회
          this.$axios.get(this.$store.state.apiServerIp + '/api/seller/selectSeller')
            .then((result) => {
              // console.log(JSON.stringify(result.data))
              // 판매자 정보 설정
              // 상품 등록시 계좌정보가 없으면 등록필요 알림
              this.$store.state.sellerVo = result.data
              // this.$store.state.sellerVo.from_post_no = result.data.from_post_no
              // this.$store.state.sellerVo.deposit_account_no = result.data.deposit_account_no
            })
            .catch((err) => {
              console.log('★★4 ' + err)
            })

          // 로그인 창 닫기
          this.loginModal = false

          // 미확인 메세지 건수 조회
          this.selectMessageCount()
        })
        .catch((err) => {
          this.loading = false
          console.log('★★5 ' + err)
        })
    },
    // 클립아트로 복사하기
    copyUrl (text) {
      this.$copyText(text).then(function (e) {
        console.log(e)
        // alert('링크를 클립보드에 복사했습니다.')
      }, function (e) {
        console.log(e)
        alert('복사 실패')
      })
      this.$q.notify({
        color: 'blue',
        position: 'top',
        message: '클립보드에 복사했습니다.',
        icon: 'notifications_active'
      })
    },
    doPreAction (path) { // 화면 이동 전처리
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        // 쿠키에 돌아올 패스 저장
        this.$cookie.set('LOGIN_REDIRECT_URL', path, 1) // 현재 페이지 쿠키에 저장
        this.$refs.loginModal.show()
      } else {
        this.$router.push(path)
      }
    },
    addComma (num) {
      return Vue.prototype.$addComma(num)
    }
  }
}
</script>
