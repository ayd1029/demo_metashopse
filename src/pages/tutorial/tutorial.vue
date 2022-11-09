<template>
  <q-page class="">

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>무작정 따라하기</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
        <!-- <q-select inverted-light color="white" v-model="selectedOrderBy" :options="selectedOrderByOptions" style="width:120px" /> -->
      </q-toolbar>
    </q-layout-header>

    <q-stepper ref="stepper" color="black" v-model="$store.state.tutorialStep" vertical class="no-shadow">
      <q-step name="step1" title="기본정보 등록" subtitle="화면에 보여질 나의 기본정보 설정">
        <p>
          <br>
          추가적으로 작성해야 할 필수정보는 없습니다.<br><br>
          이미 회원가입시 <font color="red">휴대폰번호</font> 및 <font color="red">이메일주소</font>를 등록했으니까요.<br><br>
          프로필 이미지 및 간단한 소개를 작성해보세요.<br><br>
          <q-breadcrumbs color="primary" active-color="primary">
            <q-breadcrumbs-el label="메뉴" icon="menu" />
            <q-breadcrumbs-el label="기타" icon="settings" />
            <q-breadcrumbs-el label="나의정보" icon="account_circle" />
          </q-breadcrumbs>
        </p>
        <q-stepper-navigation>
          <!-- <q-btn color="primary" @click="$refs.stepper.goToStep('disabled_step')">I want to pay</q-btn> -->
          <!-- <q-btn class="q-ml-sm" color="black" flat @click="$refs.stepper.previous()">Back</q-btn> -->
          <q-btn class="q-ml-sm" color="primary" @click="doPreAction('/menu/myinfo')" outline>바로가기</q-btn>
          <q-btn class="q-ml-sm" color="primary" @click="$refs.stepper.next()">다음으로</q-btn>
        </q-stepper-navigation>
      </q-step>

      <q-step name="step2" title="정산정보 등록" subtitle="보상을 입금 받을 계좌정보 등록">
        <p>
          <br>
          아래 필수정보를 등록해주세요.<br><br>
          ※ <font color="red">은행명</font>, <font color="red">계좌번호</font>, <font color="red">예금주명</font><br><br>
          <b>필수정보 등록시 다음으로 진행할 수 있습니다.</b><br><br>
          <q-breadcrumbs color="primary" active-color="primary">
            <q-breadcrumbs-el label="메뉴" icon="menu" />
            <q-breadcrumbs-el label="판매메뉴" icon="local_shipping" />
            <q-breadcrumbs-el label="판매자정보" icon="account_box" />
          </q-breadcrumbs>
        </p>
        <q-stepper-navigation>
          <q-btn class="q-ml-sm" color="primary" @click="doPreAction('/seller/menu/sellerInfo')" outline>바로가기</q-btn>
          <q-btn v-if="$store.state.sellerVo.deposit_account_no != null &&
            $store.state.sellerVo.deposit_account_nm != null &&
            $store.state.sellerVo.deposit_bank_cd != null" class="q-ml-sm" color="primary" @click="$refs.stepper.next()">다음으로</q-btn>
        </q-stepper-navigation>
      </q-step>

      <q-step name="step3" title="광고상품 등록" subtitle="보상을 얻기 위한 광고상품 등록">
        <p>
          <br>
          보상을 얻기 위해서 판매자의 상품을 광고해볼까요<br><br>
          ① <font color="red">최신상품</font> 메뉴에서 마음에 드는 상품을 선택<br><br>
          ② '<font color="red">내 홈에 등록</font>' 버튼을 눌러 상품을 등록<br><br>
          <q-breadcrumbs color="primary" active-color="primary">
            <q-breadcrumbs-el label="메뉴" icon="menu" />
            <q-breadcrumbs-el label="최신상품" icon="widgets" />
          </q-breadcrumbs>
        </p>
        <q-stepper-navigation>
          <q-btn class="q-ml-sm" color="primary" @click="doPreAction('/menu/newProductList')" outline>바로가기</q-btn>
          <q-btn class="q-ml-sm" :loading="loading" color="primary" @click="checkMyproductExist">
            다음으로
            <span slot="loading">
              <q-spinner-oval />
            </span>
          </q-btn>
        </q-stepper-navigation>
      </q-step>

      <q-step name="step4" title="완료">
        <p>
          <br>
          짝짝짝~ 모든 준비가 끝났습니다.<br><br>
          이제 내 광고를 통해 상품 구매가 이루어지면
          판매자가 등록한 <font color="red">원더(<img src="statics/images/logo/logocoin.png" style="width: 12px">)</font>가 나에게 주어집니다.<br><br>
          그리고 한가지 더!<br>
          <font color="red">원더(<img src="statics/images/logo/logocoin.png" style="width: 12px">)를 얻을 수 있는 방법</font>이 있습니다.<br><br>
          이벤트 정보를 확인해보세요.<br><br>
        </p>
        <q-stepper-navigation>
          <!-- <q-btn color="black" @click="$refs.stepper.goToStep('campaign')">Restart</q-btn> -->
          <q-btn class="q-ml-sm" color="primary" @click="$refs.stepper.next()">이벤트 정보</q-btn>
          <!-- <q-btn class="q-ml-sm" color="black" flat @click="$refs.stepper.previous()">Back</q-btn> -->
        </q-stepper-navigation>
      </q-step>

      <q-step name="step5" title="이벤트 정보" subtitle="metashopse.com 오픈 이벤트!">
        <p>
          <br>
          <b>🔥 2019년 메타샵스 오픈 이벤트 🔥</b><br><br>
          <br>
          일명, '<b>백원더(<img src="statics/images/logo/logocoin.png" style="width: 12px">)</b>' 이벤트<br><br>
          YouTube 컨텐츠의 링크를 등록만 하면<br><br>
          <font color="red">1건당 💯원더(<img src="statics/images/logo/logocoin.png" style="width: 12px">)씩 보상이! 👍</font><br><br>
          <br>
          ■ 참여 방법<br>
          ① YouTube에서 동영상의 '<font color="red">공유</font>'를 누르고<br>
          ② '<font color="red">링크 복사</font>'를 선택한 후<br>
          ③ metashopse.com의 스토리 등록 화면에 <font color="red">붙여넣기</font>.<br>
          ④ <font color="red">등록하기</font>. 끝. 💯원더(<img src="statics/images/logo/logocoin.png" style="width: 12px">) 벌었지요~<br><br>
          땅 파도 나오지 않는 머니,<br>
          <b>링크 등록하면 나온다!</b><br><br>
          지금 바로 시작하세요.<br><br>
          <font size="1" color="grey">※ 상기 이벤트는 목표 보상금액에 의해 조기종료될 수 있습니다. 서두르세요~</font><br><br>
        </p>
          <q-btn color="primary" @click="showYoutube" icon="play_arrow" >&nbsp;&nbsp;&nbsp;&nbsp;유튜브 방문</q-btn>
          <br>
          <br>
          <q-btn color="primary" @click="doPreAction('/add')" icon="add_circle_outline">&nbsp;&nbsp;&nbsp;&nbsp;스토리 등록</q-btn>
          <!-- <q-btn color="black" @click="$refs.stepper.goToStep('campaign')">Restart</q-btn> -->
          <!-- <q-btn class="q-ml-sm" color="black" flat @click="$refs.stepper.previous()">Back</q-btn> -->
        <br><br><br>
          <!-- <img src="statics/icons/logo.png" style="width:320px;"> -->
      </q-step>

      <!-- <q-inner-loading :visible="progress" /> -->
    </q-stepper>

    <br>
    <br>
    <br>
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
  name: 'tutorial',
  data () {
    return {
      // uid: this.$store.state.userVo.uid,
      // options: ['global_navigation', 'contractable', 'disable_payment', 'step_error'],
      loading: false,
      refresherDone: ''
    }
  },
  components: {
  },
  computed: {
    /*
    alt () {
      return this.options.includes('alt')
    },
    contractable () {
      return this.options.includes('contractable')
    },
    globalNavigation () {
      return this.options.includes('global_navigation')
    },
    stepError () {
      return this.options.includes('step_error')
    },
    disabledStep () {
      return this.options.includes('disable_payment')
    },
    progress () {
      return this.options.includes('progress')
    }
    */
  },
  created: function () {
    // 로그인 체크
    if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
      this.$router.push(this.$store.state.PAGE_LOGIN)
    }
  },
  mounted: function () {
  },
  methods: {
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      setTimeout(() => { // 3초 후에 로딩메세지 비표시
        done()
      }, 3000)
      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScrollCreator.reset() // index 초기화
      this.$refs.infiniteScrollCreator.resume() // stop에서 다시 재생
      this.$refs.infiniteScrollCreator.loadMore() // loadMore로 검색
    },
    doPreAction (path) { // 화면 이동 전처리
      this.$router.push(path)
    },
    // 광고상품 유무 체크
    checkMyproductExist () {
      // 광고상품 갯수 조회
      this.loading = true // 등록 버튼 액션 시작
      this.$axios.get(this.$store.state.apiServerIp + '/api/myproduct/selectMyproductCount')
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.loading = false // 등록 버튼 액션 중단
          if (result.data > 0) {
            // 다음단계로 이동
            this.$refs.stepper.next()
          } else {
            // 광고상품 갯수 0개, 메세지 표시
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: '광고상품을 등록해주세요. 상품 상세화면의 "내 홈에 등록" 버튼으로 등록할 수 있습니다.',
              icon: 'notifications_active'
            })
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false // 등록 버튼 액션 중단
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '광고상품 갯수 조회중 에러. 관리자에게 문의해주세요. metashopse@gmail.com',
            icon: 'notifications_active'
          })
        })
    },
    // 유튜브 링크
    showYoutube () {
      if (this.$store.state.device === 'android') {
        window.open('intent://m.youtube.com#Intent;scheme=http;package=com.google.android.youtube;end', '_blank')
      } else if (this.$store.state.device === 'ios') {
        window.open('youtube://m.youtube.com', '_blank')
      } else {
        window.open('https://m.youtube.com', '_system', 'location=yes,footer=yes')
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
