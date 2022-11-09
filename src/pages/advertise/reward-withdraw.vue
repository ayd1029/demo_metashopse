<template>
  <q-page class="">

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>출금</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
        <!-- <q-select inverted-light color="white" v-model="selectedOrderBy" :options="selectedOrderByOptions" style="width:120px" /> -->
      </q-toolbar>
    </q-layout-header>

    <div style="width: 100%;">
      <table align="center" border="0" width="90%">
        <thead>
          <th width="120"></th>
          <th width=""></th>
          <th width=""></th>
        </thead>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="left" colspan="1"><font size="3" color="black">보유 원더</font></td>
          <td align="right" colspan="2"><font size="3" color="black">{{ addComma($store.state.coinVo.coin) }}&nbsp;&nbsp;<img src="statics/images/logo/logocoin.png" style="width: 12px"></font></td>
        </tr>
        <tr>
          <td align="left" colspan="1"><font size="3" color="black">가능 원더</font></td>
          <td align="right" colspan="2"><font size="3" color="red">{{ addComma($store.state.coinVo.coin) }}&nbsp;&nbsp;<img src="statics/images/logo/logocoin.png" style="width: 12px"></font></td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="left" colspan="1"><font size="3" color="black">출금신청</font></td>
          <td align="right" colspan="2"><q-input color="black" v-model.trim="amount" type="number" align="right" suffix="000" inverted style="width:160px;" clearable /></td>
        </tr>
        <tr>
          <td align="right" colspan="3"><font size="1" color="grey">1,000 단위로 출금할 수 있습니다.</font></td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="left" colspan="3"><q-card-separator /></td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="left" colspan="1"><font size="3" color="black">입금은행</font></td>
          <td align="right" colspan="2">
            <q-select v-model="sellerVo.deposit_bank_cd" style="width:150px" color="green" :options="$store.state.bankCdOptions" readonly hide-underline />
          </td>
        </tr>
        <tr>
          <td align="left" colspan="1"><font size="3" color="black">계좌번호</font></td>
          <td align="right" colspan="2"><font size="3" color="black">{{ sellerVo.deposit_account_no }}</font></td>
        </tr>
        <tr>
          <td align="left" colspan="1"><font size="3" color="black">예금주명</font></td>
          <td align="right" colspan="2"><font size="3" color="black">{{ sellerVo.deposit_account_nm }}</font></td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr v-if="sellerVo.deposit_account_no == null">
          <td align="left" colspan="3">
            <font size="2" color="red">
              입금계좌 정보 등록이 필요합니다.<br>
              아래 '판매자정보' 메뉴를 눌러주세요.
            </font>
          </td>
        </tr>
        <tr v-if="sellerVo.deposit_account_no == null">
          <td align="left" colspan="3">
            <br>
            <q-breadcrumbs color="primary" active-color="black">
              <q-breadcrumbs-el label="메뉴" icon="menu" />
              <q-breadcrumbs-el label="판매메뉴" icon="local_shipping" />
              <q-breadcrumbs-el label="판매자정보" icon="account_box" @click.native="goSellerInfo" />
            </q-breadcrumbs>
            <br>
          </td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="left" colspan="3" v-if="sellerVo.deposit_account_no != null">
            <q-btn :loading="loading" :percentage="percentage" color="primary" :disable="btnDisabled" @click="withdrawReward" icon="sentiment_satisfied_alt" style="width:100%; height: 40px" rounded>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;출금신청
              <span slot="loading">
                <q-spinner-oval class="on-left" />
                신청중...
              </span>
            </q-btn>
          </td>
          <td align="left" colspan="3" v-else>
            <q-btn :loading="loading" :percentage="percentage" color="grey" disable icon="sentiment_satisfied_alt" style="width:100%; height: 50px">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;출금신청
            </q-btn>
          </td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
      </table>
      <!-- 출금신청내역 -->
      <q-card-separator />
      <q-infinite-scroll :handler="loadMoreCoinWithdraw" ref="infiniteScrollCoinWithdraw">
        <q-item link style="padding:0px 0px 0px 0px">
          <table border="0" style="width: 100%; padding:5px 0px 5px 0px;">
            <thead>
              <th width="20%"><font size="2" color="grey">신청일시</font></th>
              <th width="30%"><font size="2" color="grey">입금은행명</font></th>
              <!-- <th><font size="2" color="grey">계좌번호</font></th> -->
              <!-- <th><font size="2" color="grey">예금주명</font></th> -->
              <th width="30%" align="right"><font size="2" color="grey">금액</font></th>
              <th width="20%"><font size="2" color="grey">상태</font></th>
            </thead>
            <tr>
              <td colspan="4"><q-card-separator /></td>
            </tr>
            <tr v-for="item in coinWithdrawList" :key="item.seq">
              <td align="center"><font size="2" color="grey">{{ item.reg_time }}</font></td>
              <td align="center"><font size="2" color="grey">{{ item.bank_nm }}</font></td>
              <!-- <td align="center"><font size="2" color="grey">{{ item.account_no }}</font></td> -->
              <!-- <td align="center"><font size="2" color="grey">{{ item.account_nm }}</font></td> -->
              <td align="right"><font size="2" color="grey">{{ addComma(item.amount) }} 원</font></td>
              <td v-if="item.done_yn === 'N'" align="center"><font size="2" color="grey">대기</font></td>
              <td v-else align="center"><font size="2" color="grey">완료</font></td>
            </tr>
          </table>
        </q-item>
        <!-- <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div> -->
      </q-infinite-scroll>
      <q-card-separator />
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
  </q-page>
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
      amount: null,
      sellerVo: this.$store.state.sellerVo, // 판매자정보
      coinWithdrawList: [],
      pageSizeCoinWithdraw: 15,
      lastPageNumCoinWithdraw: 1, // 목록 마지막 페이지
      loading: false,
      btnDisabled: true, // 최신 코인정보 조회 완료시 활성화
      percentage: 0
    }
  },
  created: function () {
    // 로그인 체크
    if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
      this.$router.push(this.$store.state.PAGE_LOGIN)
      return
    }
    // 사용자 코인 조회
    this.$axios.get(this.$store.state.apiServerIp + '/api/coin/selectCoinRanking',
      {params: {uid: this.$store.state.userVo.uid}})
      .then((result) => {
        // console.log(JSON.stringify(result.data))
        // 코인 정보 설정
        this.$store.state.coinVo = result.data
        this.btnDisabled = false // 출금신청 버튼 활성화
      })
      .catch((err) => {
        console.log(err)
      })
    this.selectCoinWithdrawListMax() // 출금신청내역 마지막페이지 조회
  },
  methods: {
    loadMoreCoinWithdraw: function (index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        console.log('loadMoreCoinWithdraw called index: ' + index + ' this.lastPageNumCoinWithdraw: ' + this.lastPageNumCoinWithdraw)
        if (index <= this.lastPageNumCoinWithdraw) {
          this.selectCoinWithdrawList(index, done)
        } else {
          this.$refs.infiniteScrollCoinWithdraw.stop()
        }
        // refresher 로딩메세지 처리
        /*
        if (this.refresherDone != null && this.refresherDone !== '') {
          this.refresherDone() // 로딩메세지 종료
          this.refresherDone = '' // 로딩메세지 초기화
        }
        */
      }, 100)
    },
    // 출금신청내역 리스트 마지막 페이지 조회
    selectCoinWithdrawListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/inout/selectCoinWithdrawListLastPageNum',
        {params: {pageSize: this.pageSizeCoinWithdraw}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumCoinWithdraw = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 출금신청내역 리스트 조회
    selectCoinWithdrawList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/inout/selectCoinWithdrawList',
        {params: {pageNum: idx, pageSize: this.pageSizeCoinWithdraw}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.coinWithdrawList = [] // 리스트 초기화
          }
          this.coinWithdrawList = this.coinWithdrawList.concat(result.data)
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    },
    // 출금신청
    withdrawReward () {
      // 출금신청금액 입력 체크
      if (this.amount == null || this.amount === '') {
        this.$q.notify({
          color: 'blue',
          position: 'top',
          message: '출금신청 원더를 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }

      // 출금신청금액이 보유코인보다 많은지 체크
      if (this.amount * 1000 > this.$store.state.coinVo.coin) {
        this.$q.notify({
          color: 'blue',
          position: 'top',
          message: '출금신청 원더가 보유 원더보다 많습니다.',
          icon: 'notifications_active'
        })
        return
      }

      // 출금정보 설정
      let rewardVo = {}
      rewardVo.amount = this.amount * 1000
      rewardVo.inout_cd = 'W_COIN' // withdraw의 'W'
      rewardVo.bank_cd = this.sellerVo.deposit_bank_cd
      rewardVo.bank_nm = this.sellerVo.deposit_bank_nm
      rewardVo.account_no = this.sellerVo.deposit_account_no
      rewardVo.account_nm = this.sellerVo.deposit_account_nm

      this.$q.dialog({
        title: '원더 출금',
        message: '출금을 신청하시겠습니까?',
        ok: '예',
        cancel: '아니오',
        preventClose: true
      }).then(() => {
        // 보상출금
        this.loading = true
        this.$axios.post(this.$store.state.apiServerIp + '/api/inout/withdrawCoin', rewardVo)
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.loading = false
            // 메인으로 이동
            if (result.data != null) { // 정상 처리
              this.$store.state.coinVo = result.data // 코인정보 재설정
              this.amount = null // 출금신청액 초기화

              // 출금신청내역 리스트 조회
              this.$refs.infiniteScrollCoinWithdraw.reset() // index 초기화
              this.$refs.infiniteScrollCoinWithdraw.resume() // stop에서 다시 재생
              this.$refs.infiniteScrollCoinWithdraw.loadMore() // loadMore로 검색

              this.$q.notify({
                color: 'green',
                position: 'top',
                message: '출금신청이 등록되었습니다.',
                icon: 'notifications_active'
              })
            } else { // 이상 처리
              this.$q.notify({
                color: 'grey',
                position: 'top',
                message: '출금신청 처리 실패. 관리자에게 문의바랍니다.',
                icon: 'notifications_active'
              })
            }
          })
          .catch((err) => {
            console.log(err)
            this.loading = false
            this.$q.notify({
              color: 'grey',
              position: 'top',
              message: '출금신청 처리 실패. 관리자에게 문의바랍니다.',
              icon: 'notifications_active'
            })
          })
      }).catch(() => {
        // this.$q.notify(`You didn't agree`)
      })
    },
    // 판매자정보 화면으로 이동 - 계좌정보 등록
    goSellerInfo () {
      this.$router.push('/seller/menu/sellerInfo')
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
