<template>
  <q-modal v-model="hotdealRegisterModal" :content-css="{minWidth: '30%', minHeight: '85%'}">

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <!-- <q-btn flat round dense icon="grade" /> -->
        <q-toolbar-title>🔥 핫딜 등록</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <!-- 상품 정보 -->
      <div align="center" style="width: 100%">
        <q-list style="width: 90%; padding:5px 10px 5px 10px">
          <q-item style="padding:0px 0px 0px 0px">
            <table border="0" style="width: 100%">
              <tr>
                <td width="20%" align="left"><img :src="productVo.image_url" style="width:50px; height:50px; object-fit:cover; border-radius: 3px;"></td>
                <td width="80%"><font size="2" color="black">{{ productVo.title }}<br>{{ productVo.subtitle }}</font></td>
              </tr>
              <tr>
                <td align="left"></td>
                <td align="right">
                  <font size="2" color="black">판매가 : </font>
                  &nbsp;&nbsp;&nbsp;
                  <font size="2" color="black">{{ addComma(productVo.price) }}&nbsp;원</font>
                </td>
              </tr>
            </table>
          </q-item>
        </q-list>
      </div>
      <br>

      <!-- 등록 정보 -->
      <div>
        <table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td><q-btn color="black" size="xs" style="width:120px;"><font size="3">신청 정보</font></q-btn></td>
            <td><font size="2"></font></td>
          </tr>
        </table>
      </div>
      <table align="center" border="0" width="90%">
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
        <tr>
          <td width="35%"><font size="3">핫딜 시작일</font></td>
          <td align="left">
            <q-select v-model="hotdealVo.start_date" :options="startDateOptions" @input="startDateChangedHandler" />
          </td>
        </tr>
        <tr>
          <td colspan="3"></td>
        </tr>
        <tr>
          <td colspan="3"></td>
        </tr>
        <tr>
          <td><font size="3">핫딜 종료일</font></td>
          <td align="left">
            <q-select v-model="hotdealVo.end_date" :options="endDateOptions" style="width:180px;" hide-underline readonly="" />
          </td>
        </tr>
        <tr>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td><font size="3" color="">입금액</font></td>
          <td align="left">
            <q-input v-model.trim="hotdealVo.total_price" type="number" align="right" suffix="0000" inverted style="width:150px;" clearable />
          </td>
        </tr>
        <tr>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td colspan="2">
            <font size="1" color="grey">
              ※ 사업자는 세금계산서 발행을 위해 '판매자 정보' 메뉴에서<br>사업자등록번호, 상호, 대표자명, 사업장주소, 업태, 종목, 이메일을 꼭 등록해주세요.
            </font>
          </td>
        </tr>
      </table>
      <br>

      <!-- 입금 정보 -->
      <div>
        <table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td><q-btn color="black" size="xs" style="width:120px;"><font size="3">입금 정보</font></q-btn></td>
            <td align="right"><font size="2" color="grey">※ 입금자명 확인&nbsp;&nbsp;</font></td>
          </tr>
        </table>
      </div>
      <table align="center" border="0" style="width:90%">
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
        <tr>
          <td align="left" width="35%"><font size="3">은행</font></td>
          <td align="left" colspan="2"><font size="3">{{ hotdealVo.bank_nm }}</font></td>
        </tr>
        <tr>
          <td align="left"><font size="3">계좌번호</font></td>
          <td align="left" colspan="2"><font size="3">{{ hotdealVo.bank_acct_no }}</font></td>
        </tr>
        <tr>
          <td align="left"><font size="3">예금주명</font></td>
          <td align="left" colspan="2"><font size="3" color="black">{{ hotdealVo.bank_acct_nm }}</font></td>
        </tr>
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
        <tr>
          <td align="left"><font size="3"><b>입금자명</b></font></td>
          <td align="left" colspan="2"><font size="3" color="black"><b>{{ hotdealVo.seller_name }}</b></font></td>
        </tr>
      </table>
      <br>

      <!-- 핫딜 정보 -->
      <div>
        <table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td><q-btn color="black" size="xs" style="width:120px;"><font size="3">핫딜 정보</font></q-btn></td>
            <td align="right"><font size="2" color="grey">&nbsp;&nbsp;</font></td>
          </tr>
        </table>
      </div>
      <table align="center" border="0" style="width:90%">
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
        <!--
        <tr>
          <td align="left" width="35%"><font size="2">구좌수</font></td>
          <td align="left" colspan="2"><font size="2">무제한</font></td>
        </tr>
        <tr>
          <td align="left"><font size="2">구매방식</font></td>
          <td align="left" colspan="2"><font size="2">비딩</font></td>
        </tr>
        -->
        <tr>
          <td align="left"><font size="2">광고비(시작가)</font></td>
          <td align="left" colspan="2"><font size="2" color="black"><b>10,000원</b> (VAT포함)</font></td>
        </tr>
        <!--
        <tr>
          <td align="left"><font size="2">입찰금액 단위</font></td>
          <td align="left" colspan="2"><font size="2" color="black"><b>10,000원</b></font></td>
        </tr>
        -->
        <tr>
          <td align="left"><font size="2">서비스기간</font></td>
          <td align="left" colspan="2"><font size="2" color="black"><b>1주</b> (매주 월요일 ~ 일요일)</font></td>
        </tr>
        <tr>
          <td align="left"><font size="2">노출방식</font></td>
          <td align="left" colspan="2"><font size="2" color="black"><b>가격순 정렬</b> (최고가 최상단)</font></td>
        </tr>
        <tr>
          <td align="left"><font size="2"></font></td>
          <td align="left" colspan="2"><font size="2" color="black">동순위는 <b>신청순 정렬</b></font></td>
        </tr>
        <tr>
          <td align="left"><font size="2">입금기한</font></td>
          <td align="left" colspan="2"><font size="2" color="black">핫딜 시작일 2일전</font></td>
        </tr>
      </table>
      <br>

      <!-- 기타 정보 -->
      <!--
      <div class="row justify-left">
        <table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td><q-btn color="black" size="xs" style="width:120px;"><font size="2">기타</font></q-btn></td>
            <td align="right"><font size="2" color="grey">입찰금 반환&nbsp;&nbsp;</font></td>
          </tr>
        </table>
      </div>
      <table align="center" border="0" style="width:90%">
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
        <tr>
          <td align="left" colspan="3">
            <font size="2">
              낙찰자 외 입찰자의 입찰금은 원더로 자동 충전되며<br>
              <b>출금</b> 메뉴에서 언제든지 출금 신청 가능합니다.<br><br>
              <q-breadcrumbs color="black" active-color="black">
                <q-breadcrumbs-el label="메뉴" icon="menu" />
                <q-breadcrumbs-el label="광고메뉴" icon="share" />
                <q-breadcrumbs-el label="출금" icon="save_alt" />
              </q-breadcrumbs>
            </font>
            <q-stepper-navigation>
              <q-btn class="q-ml-sm" color="primary" @click="goRewardWithdraw()" size="sm" outline>바로가기</q-btn>
            </q-stepper-navigation>
          </td>
        </tr>
      </table>
      <br>
      -->

      <q-toolbar color="white" >
        <q-btn :loading="loading" :percentage="percentage" color="primary" @click="requestHotdeal" icon="done" style="width:100%; height:45px;">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;핫딜 신청
          <span slot="loading">
            <q-spinner-oval class="on-left" />
            신청중...
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

export default {
  // name: 'mystore',
  data () {
    return {
      type: '', // insert: 등록, update: 수정
      // index: '', // 배송관리 팝업 콜백처리시 주문정보 갱신에 사용
      loading: false,
      percentage: 0,
      readonlyFlag: false,
      productVo: {}, // 상품 정보
      hotdealVo: {
        total_price: null,
        bank_nm: 'KB국민은행',
        bank_acct_no: '055201-04-230453',
        bank_acct_nm: '주식회사 클레이스타',
        seller_name: this.$store.state.sellerVo.seller_name
      }, // 핫딜 정보
      startDateOptions: [], // 핫딜 시작일 배열 - 콤보박스
      endDateOptions: [], // 핫딜 시작일 배열 - 콤보박스
      hotdealRegisterModal: false
    }
  },
  created: function () {
  },
  mounted: function () {
  },
  methods: {
    show () {
      // 일주일 후 월요일 날짜 구하기
      this.startDateOptions = [] // 핫딜 시작일 옵션 리스트 초기화
      this.endDateOptions = [] // 핫딜 종료일 옵션 리스트 초기화
      let now = new Date()
      /*
      let nextMonday1 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (8 - now.getDay()))
      let nextMonday2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (15 - now.getDay()))
      let nextMonday3 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (22 - now.getDay()))
      let nextMonday4 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (29 - now.getDay()))
      */
      for (let w = 1; w < 5; w++) { // 4주치 정보(1개월) 설정
        let nextStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + ((1 + (7 * w)) - now.getDay()))
        let nextEndtDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + ((7 + (7 * w)) - now.getDay()))

        let startDateOption = {}
        let endDateOption = {}

        // 레이블 - 화면 표시 날짜
        startDateOption.label = nextStartDate.getFullYear() + '년 ' + (nextStartDate.getMonth() + 1) + '월 ' + nextStartDate.getDate() + '일 '
        endDateOption.label = nextEndtDate.getFullYear() + '년 ' + (nextEndtDate.getMonth() + 1) + '월 ' + nextEndtDate.getDate() + '일 '

        // 날짜 DATA - DB 저장용
        startDateOption.value = this.getYYYYMMDD(nextStartDate)
        endDateOption.value = this.getYYYYMMDD(nextEndtDate)

        this.startDateOptions.push(startDateOption)
        this.endDateOptions.push(endDateOption)
      }

      this.hotdealRegisterModal = true
    },
    // yyyyMMdd 포맷으로 반환
    getYYYYMMDD (date) {
      let year = date.getFullYear() // yyyy
      let month = (1 + date.getMonth()) // M
      month = month >= 10 ? month : '0' + month // MM
      let day = date.getDate() // d
      day = day >= 10 ? day : '0' + day // dd
      return year + '' + month + '' + day
    },
    // 핫딜시작일 변경 이벤트 처리
    startDateChangedHandler () {
      // alert(this.hotdealVo.start_date)
      if (this.hotdealVo.start_date != null && this.hotdealVo.start_date !== '') {
        // 선택된 인덱스 찾아서 핫딜 종료일 설정
        for (let i = 0; i < this.startDateOptions.length; i++) { // 핫딜 시작일 갯수만큼 반복
          if (this.startDateOptions[i].value === this.hotdealVo.start_date) { // 선택된 날짜와 같으면
            // 핫딜 종료일도 해당 인덱스로 설정 -> 처음부처 종료일은 시작일 + 6일 로 맞춰놨기 때문에 인덱스만 같으면 됨
            this.hotdealVo.end_date = this.endDateOptions[i].value
            break
          }
        }
      }
    },
    // 핫딜 신청
    requestHotdeal () {
      // 정합성 체크
      if (this.hotdealVo.start_date == null || this.hotdealVo.start_date === '' || // 핫딜 시작일
          this.hotdealVo.end_date == null || this.hotdealVo.end_date === '') { // 핫딜 종료일
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '핫딜 시작일을 선택해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.hotdealVo.total_price == null || this.hotdealVo.total_price === '') { // 입금액
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '입금액을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }

      // 상품시컨스 설정
      this.hotdealVo.seq_product = this.productVo.seq

      this.loading = true
      // 핫딜 등록
      this.$axios.post(this.$store.state.apiServerIp + '/api/hotdeal/insertHotdeal', this.hotdealVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.loading = false
          if (result.data > 0) {
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: '핫딜이 신청되었습니다.',
              icon: 'notifications_active'
            })
          } else {
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: '신청에 실패했습니다. 항목을 확인해주세요.',
              icon: 'notifications_active'
            })
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '신청에 실패했습니다. 다시 신청해주세요.',
            icon: 'notifications_active'
          })
        })
    },
    addComma (num) {
      return Vue.prototype.$addComma(num)
    },
    // 출금 화면으로 이동
    goRewardWithdraw () {
      this.$router.push('/menu/rewardWithdraw')
    },
    close () {
      this.hotdealRegisterModal = false
    }
  }
}
</script>
