<template>
  <q-page class="flex justify-center">

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>핫딜 상세</q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <br>

    <div :style="`width: ${widthRate}%`">

      <!-- 핫딜 기간 -->
      <table align="center" border="0" width="95%">
        <tr>
          <td width="120"><font size="3">핫딜 기간</font></td>
          <td align="left">
            <font size="3" color="black">{{ hotdealVo.start_date }} ~ {{ hotdealVo.end_date }}</font>
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

      <!-- 입금정보 -->
      <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">
        <tr>
          <td colspan="2">&nbsp;</td>
        </tr>
        <tr>
          <td><q-btn color="black" size="xs" style="width:120px;"><font size="3">입금 정보</font></q-btn></td>
          <td align="right"><font size="2" color="grey">&nbsp;&nbsp;</font></td>
        </tr>
        <tr>
          <td colspan="2"><q-card-separator /></td>
        </tr>
      </table>
      <table align="center" border="0" style="width:95%" cellpadding="3">
        <tr>
          <td align="left" width="120"><font size="3">입금은행</font></td>
          <td align="left"><font size="3">{{ hotdealVo.bank_nm }}</font></td>
        </tr>
        <tr>
          <td align="left"><font size="3">계좌번호</font></td>
          <td align="left"><font size="3">{{ hotdealVo.bank_acct_no }}</font></td>
        </tr>
        <tr>
          <td align="left"><font size="3">예금주명</font></td>
          <td align="left"><font size="3" color="black">{{ hotdealVo.bank_acct_nm }}</font></td>
        </tr>
        <tr>
          <td colspan="2"><q-card-separator /></td>
        </tr>
        <tr>
          <td align="left"><font size="3"><b>입금자명</b></font></td>
          <td align="left"><font size="3" color="black"><b>{{ hotdealVo.seller_name }}</b></font></td>
        </tr>
        <tr>
          <td align="left"><font size="3"><b>총입금액</b></font></td>
          <td align="left"><font size="3" color="black"><b>{{ hotdealVo.total_price }}</b>&nbsp;만원</font></td>
        </tr>
        <tr>
          <td align="left"><font size="3"><b>상태</b></font></td>
          <td v-if="hotdealVo.del_id == null && hotdealVo.deposit_time == null">
            <font size="3" color="red">입금대기</font>
            &nbsp;&nbsp;&nbsp;
            <q-btn dense color="red" @click="cancelHotdeal(hotdealVo.seq)" size="sm" style="width:40px">
              <font size="2">취소</font>
            </q-btn>
          </td>
          <td v-else-if="hotdealVo.del_id == null && hotdealVo.deposit_time != null"><font size="3" color="green">정상완료</font></td>
          <td v-else-if="hotdealVo.del_id != null"><font size="3" color="grey">신청취소</font></td>
          <td v-else></td>
        </tr>
        <tr>
          <td colspan="2"><q-card-separator /></td>
        </tr>
      </table>
      <br>

      <!-- 핫딜 상품 리스트 -->
      <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">
        <tr>
          <td colspan="2">&nbsp;</td>
        </tr>
        <tr>
          <td><q-btn color="black" size="xs" style="width:120px;"><font size="3">핫딜 상품</font></q-btn></td>
          <td align="right"><font size="2" color="grey">&nbsp;&nbsp;</font></td>
        </tr>
      </table>
      <q-card-separator />
      <div style="padding:0px 0px 0px 0px" v-for="item in hotdealVo.hotdealProductList" :key="item.seq">
        <q-item style="padding:0px 0px 0px 0px">
          <table border="0" style="width: 95%; padding:5px 0px 5px 0px;" cellpadding="0" cellspacing="0" align="center">
            <thead>
              <th width="5" />
              <th width="50" />
              <th width="" />
              <th width="90" />
            </thead>
            <tr>
              <td rowspan="2"></td>
              <td rowspan="2"><img :src="item.image_url" style="width:60px; height:60px; object-fit:cover; border-radius: 3px; display: block;"></td>
              <td colspan="2">&nbsp;<font size="2" color="black">{{ item.title }}</font></td>
            </tr>
            <tr>
              <td align="right"><font size="2" color="black">입금액 : &nbsp;</font></td>
              <td align="right">
                <font size="3" color="black">{{ addComma(item.bid_price) }}</font>
                &nbsp;<font size="2" color="black">만원</font>&nbsp;&nbsp;&nbsp;
              </td>
            </tr>
          </table>
        </q-item>
        <q-card-separator />
      </div>
      <div>
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
    </div>

  </q-page>
</template>

<style>
</style>

<script>
import Vue from 'vue'

export default {
  name: 'hotdeal-detail',
  data () {
    return {
      pageSize: 15,
      lastPageNum: 1, // 마지막 페이지
      widthRate: 100, // 레이아웃 너비 % - PC화면 대응
      percentage: 0,
      hotdealVo: {} // 핫딜 정보
    }
  },
  components: {
  },
  created: function () {
    if (this.$store.state.device === 'P') { // PC인 경우
      this.widthRate = 50 // 화면 너비 50%
    }

    // 핫딜 조회
    this.selectHotdeal()
  },
  methods: {
    // 핫딜 조회
    selectHotdeal () {
      this.$q.loading.show() // 로딩표시 시작
      this.$axios.get(this.$store.state.apiServerIp + '/api/hotdeal/selectHotdeal',
        {params: {seq: this.$route.query.seq}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.hotdealVo = result.data
          this.$q.loading.hide() // 로딩표시 종료
        })
        .catch((err) => {
          console.log(err)
          this.$q.loading.hide() // 로딩표시 종료
        })
    },
    // 핫딜 신청 취소
    cancelHotdeal (seq) {
      // 취소 확인
      this.$q.dialog({
        title: '핫딜 신청 취소',
        message: '정말 취소하시겠습니까?',
        ok: '예',
        cancel: '아니오',
        preventClose: true
      }).then(() => {
        this.$q.loading.show() // 로딩 표시 시작

        let hotdealVo = {}
        hotdealVo.seq = seq

        this.$axios.post(this.$store.state.apiServerIp + '/api/hotdeal/deleteHotdeal', hotdealVo)
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.$q.loading.hide() // 로딩 표시 종료
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: '취소되었습니다.',
              icon: 'notifications_active'
            })
            this.$router.push('/menu/hotdealList')
          })
          .catch((err) => {
            console.log(err)
            this.$q.loading.hide() // 로딩 표시 종료
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: '네트워크 오류. 다시 시도해주세요.',
              icon: 'notifications_active'
            })
          })
      }).catch(() => {
        // this.$q.notify(`You didn't agree`)
      })
    },
    // 상품 상세 화면으로 이동
    goProductDetail (seqProduct) {
      this.$router.push('/productDetail?seq=' + seqProduct)
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
