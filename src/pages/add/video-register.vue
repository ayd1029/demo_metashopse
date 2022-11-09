<template>
  <q-page class="">

    <loginModal ref="loginModal" @callback-login="callbackLogin" />
    <personalInfoPolicyModal ref="personalInfoPolicyModal" />
    <termOfServiceModal ref="termOfServiceModal" />
    <redirectModal ref="redirectModal" />

    <q-layout-header>
      <q-toolbar color="black" inverted align="center">
        <q-btn @click="goBack" flat round dense icon="fast_rewind" />
        <q-toolbar-title><b>🔥 OPEN EVENT 🔥</b></q-toolbar-title>
        <!-- <img @click="goBack" src="statics/images/logo/widelogo.png" style="width: 80px;">&nbsp;&nbsp; -->
        <q-btn @click="goBack" flat round dense icon="home" />
      </q-toolbar>
    </q-layout-header>

    <div class="no_refresh" style="width: 100%" >

      <!--
      <q-card-separator />
      <br>
      <div align="center">
        <br>
        <div class="q-display-1 q-mb-md text-grey">굳어버린 쇼핑 문화</div>
        <p class="caption">
          <br>
          인터넷 쇼핑 문화가 너무 딱딱하다.<br>
          가장 싼 제품을 빠르게 배송받는게 전부인..<br>
          <br>
          쇼핑문화를 바꿔보려한다.<br>
          <br>
          나의 쇼핑이 아닌<br>
          우리의 쇼핑이 될 수 있도록.<br>
          <br>
        </p>
      </div>
      <q-card-separator />

      <br>
      <div align="center">
        <br>
        <div class="q-display-1 q-mb-md text-grey">효율?</div>
        <p class="caption">
          <br>
          유통 단계를 줄여 단가를 낮추는 것이<br>
          과연 최상책일까?<br>
          <br>
          싸다고 무조건 사는 것도 아니고<br>
          비싸다고 무조건 안사는 것 또한 아니다.<br>
          <br>
          나의 쇼핑이 아닌<br>
          우리의 쇼핑이 될 수 있도록.<br>
          <br>
        </p>
        <br>
      </div>
      -->
      <table width="95%" border="0" align="center">
        <tr>
          <td align="center">
            <q-chip style="width:100%; height:20px; text-align:left; margin-top:0px;" color="black" tag dense pointing="down">
              &nbsp;유튜브 동영상 등록
            </q-chip>
          </td>
        </tr>
      </table>

      <table width="90%" border="0" align="center">
        <tr>
          <td colspan="2">
            <q-input id="videoUrlOriginal" v-model.trim="contentsVo.video_url_original" stack-label="유튜브 동영상 주소" color="white" inverted-light clearable />
            <input type="hidden" v-model="contentsVo.video_cd">
            <input type="hidden" v-model="contentsVo.video_url">
            <br>
          </td>
        </tr>
        <tr>
          <td colspan="2" align="center">
            <q-btn icon="done" :loading="loading" :percentage="percentage" color="primary" @click="checkForm" style="width:50%;" outline rounded>
              &nbsp;&nbsp;&nbsp;&nbsp;등록하기
              <span slot="loading">
                <q-spinner-oval class="on-left" />
                등록중...&nbsp;&nbsp;&nbsp;
              </span>
            </q-btn>
            <br>
          </td>
        </tr>
      </table>
      <br>

      <table width="95%" border="0" align="center">
        <tr>
          <td align="center">
            <q-chip style="width:100%; height:20px; text-align:left; margin-top:0px;" color="black" tag dense pointing="down">
              &nbsp;이벤트 내용
            </q-chip>
          </td>
        </tr>
      </table>

      <table width="90%" border="0" align="center">
        <tr>
          <td>
            일명, '<b>백원더</b>' 이벤트!<br><br>
            유튜브 동영상 링크를 등록만 하면<br><br>
            <font color="red">링크 1개당 💯원더씩 보상이! 👍</font><br>
            <br>
          </td>
        </tr>
      </table>

      <table width="95%" border="0" align="center">
        <tr>
          <td align="center">
            <q-chip style="width:100%; height:20px; text-align:left; margin-top:0px;" color="black" tag dense pointing="down">
              &nbsp;참여 방법
            </q-chip>
          </td>
        </tr>
      </table>

      <table width="90%" border="0" align="center">
        <tr>
          <td>
            ① 유튜브에서 동영상의 '<font color="red">공유</font>'를 누르고<br>
            <br>② '<font color="red">주소 복사</font>'를 선택한 후<br>
            <br>③ 위 '유튜브 동영상 주소'에 <font color="red">붙여넣기</font>.<br>
            <br>④ <font color="red">등록하기</font>. 끝! &nbsp; 💯원더 겟!!!<br><br>
          </td>
        </tr>
      </table>

      <table width="95%" border="0" align="center">
        <tr>
          <td align="center">
            <q-chip style="width:100%; height:20px; text-align:left; margin-top:0px;" color="black" tag dense pointing="down">
              &nbsp;기타
            </q-chip>
          </td>
        </tr>
      </table>

      <table width="90%" border="0" align="center">
        <tr>
          <td>
            음악과 보상이 있는<br>
            쇼핑의 뉴패러다임 메타샵스.<br>
            이제는 쇼핑도 스토리닷!<br>
            <br>
            <q-btn color="primary" @click="goIntroduce" style="width:120px;" size="sm" rounded><font size="3">원더학개론</font></q-btn>
            <br>
            <br>
            <font size="2" color="grey">※ 원더는 메타샵스의 캐시로, 100원더는 100원과 같습니다.</font><br>
            <font size="2" color="grey">※ 목표 보상금액 소진 시 조기종료될 수 있습니다.</font><br><br>
          </td>
        </tr>
      </table>

      <table width="90%" border="0" align="center">
        <tr>
          <td align="center" width="50%">
            <q-btn color="primary" icon="play_arrow" @click="showYoutube" outline style="width:100%;">&nbsp;&nbsp;&nbsp;유튜브 방문</q-btn>
          </td>
          <td align="center" width="50%">
            <q-btn color="primary" icon="share" @click="copyUrl" outline style="width:100%;">&nbsp;&nbsp;&nbsp;공유하기</q-btn>
          </td>
        </tr>
        <tr>
          <td colspan="2" align="left">&nbsp;</td>
        </tr>
      </table>

      <!--
      <table width="90%" border="0" align="center">
        <tr>
          <td colspan="2" align="left">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2" align="center"><a @click="getApp('android')"><img src="statics/images/btn/bt_googleplay.png"></a></td>
        </tr>
        <tr>
          <td colspan="2" align="left"></td>
        </tr>
        <tr>
          <td colspan="2" align="center"><a @click="getApp('ios')"><img src="statics/images/btn/bt_appstore.png"></a></td>
        </tr>
      </table>
      -->
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>

      <!-- 사업자정보 -->
      <q-collapsible>
        <!-- 제목 -->
        <template slot="header">
          <q-chip color="black" small class="q-mr-sm"><font size="1">사업자정보</font></q-chip>
          <q-item-main label="" />
          <q-item-side right>
            <!-- <font size="1">보기</font> -->
          </q-item-side>
        </template>
        <!-- 내용 -->
        <table width="100%" align="center" border="0">
          <!--
          <tr>
            <td align="left" colspan="5" width="60"><img src="statics/images/oneon/oneonlogo.png" style="width:40px;"></td>
          </tr>
          -->
          <tr>
            <td align="left" colspan="5">
              <font size="1" color="black"><b>주식회사 클레이스타</b></font><br>
              <font size="1" color="grey">
                (04206) 서울특별시 마포구 마포대로 196 1707호<br>
                대표이사 : 안영대 | metashopse@gmail.com<br>
                통신판매업신고 :2022-서울마포-1213<br>
                사업자등록번호 : 139-87-02383 &nbsp;<a @click="goBusinessInfo"><b>사업자정보확인</b></a><br>
                고객센터 :010-9394-1941 | 이메일 : metashopse@gmail.com<br>
                <a @click="showTermOfService"><b>이용약관</b></a>&nbsp;
                <a @click="showPersonalInfoPolicy"><b>개인정보처리방침</b></a>&nbsp;
                <!-- <a @click="goTerms"><b>약관 및 정책</b></a> -->
              </font>
            </td>
          </tr>
          <tr>
            <td colspan="5" align="left">
              <font size="1" color="grey">
                <!-- (주)클레이스타는 통신판매중개자로서 오픈마켓 metashopse.com의 거래당사자가 아니며, 판매자가 등록한 상품정보 및 거래에 대해 일체 책임을 지지 않습니다. -->
              </font>
            </td>
          </tr>
          <tr>
            <td colspan="5">&nbsp;</td>
          </tr>
          <tr>
            <td align="center" colspan="5" width="60">
              <!-- KB에스크로 이체 인증마크 -->
              <img src="http://img1.kbstar.com/img/escrow/escrowcmark.gif" @click="onPopKBAuthMark" style="width:30px;" />
              &nbsp;
              <!-- 이니시스 인증마크 -->
              <img src="statics/images/logo/ini_pay.png" style="width:30px;" />
            </td>
          </tr>
        </table>
      </q-collapsible>
      <!-- <q-card-separator /> -->
      <br>
      <!-- 저작권 -->
      <table width="100%" align="center" border="0">
        <tr>
          <td align="center">
            <font size="1" color="grey">
              Copyright © OneOn Inc. All Rights Reserved.
            </font>
          </td>
        </tr>
      </table>
      <br>
    </div>

  </q-page>
</template>

<style>
</style>

<script>
import Vue from 'vue'

export default {
  name: 'contents-register',
  data () {
    return {
      loading: false,
      percentage: 0,
      contentsVo: {
        seq: '',
        video_cd: 'youtube',
        video_url_original: '',
        video_url: '',
        reg_id: ''
      }
    }
  },
  created: function () {
  },
  methods: {
    checkForm () { // 등록 전 정합성 체크
      if (this.contentsVo.video_url_original === '') {
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '유튜브 동영상 주소를 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }

      // 동영상 링크 설정
      let originalVideoUrl = this.contentsVo.video_url_original
      if (originalVideoUrl !== '') {
        originalVideoUrl = originalVideoUrl.toString()
        if (originalVideoUrl.indexOf('youtube') > 0 || originalVideoUrl.indexOf('youtu.be') > 0) { // youtube인 경우
          let arrUrl = originalVideoUrl.split('/')
          this.contentsVo.video_url = 'https://www.youtube.com/embed/' + arrUrl[arrUrl.length - 1]
          this.contentsVo.video_cd = 'youtube'
        } else {
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '유튜브 동영상 주소만 등록해주세요.',
            icon: 'notifications_active'
          })
          return
        }
      }

      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        // 쿠키에 돌아올 패스 저장
        this.$cookie.set('LOGIN_REDIRECT_URL', '/add/video', 1)
        this.$refs.loginModal.show()
        return
      }

      // 등록 처리 시작
      this.insertContents()
    },
    insertContents () {
      this.loading = true

      // 컨텐츠 등록
      this.$axios({
        url: this.$store.state.apiServerIp + '/api/contents/insertContents',
        method: 'POST',
        data: this.contentsVo })
        .then((result) => {
          this.loading = false // 등록 버튼 액션 중단
          this.$q.notify({
            color: 'blue',
            position: 'top',
            message: '등록되었습니다.',
            icon: 'notifications_active'
          })
          this.$router.push('/menu/event') // 이벤트 리스트로 이동
        })
        .catch((err) => {
          console.log(err)
          // this.$q.notify(err)
          this.loading = false // 등록 버튼 액션 중단
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '등록에 실패했습니다. 다시 시도해주세요.',
            icon: 'notifications_active'
          })
        })
    },
    // ■ 로그인 콜백
    callbackLogin () {
      // 로그인 후 액션
      // 등록 처리 시작
      this.insertContents()
    },
    // 유튜브 링크
    showYoutube () {
      if (this.$store.state.device === 'android') {
        window.open('intent://m.youtube.com#Intent;scheme=http;package=com.google.android.youtube;end', '_blank')
      } else if (this.$store.state.device === 'ios') {
        try {
          window.open('youtube://m.youtube.com', '_blank')
        } catch (e) {
          window.open('https://m.youtube.com', '_blank')
        }
      } else {
        window.open('https://m.youtube.com', '_system', 'location=yes,footer=yes')
      }
    },
    getApp (os) {
      if (os === 'android') {
        window.open('https://play.google.com/store/apps/details?id=kr.oneon.sellerz')
      } else {
        window.open('https://apps.apple.com/kr/app/ec-9b-90-eb-8d-94-ec-83-b5/id1462604983')
      }
    },
    goIntroduce () {
      this.$router.push('/menu/introduce')
    },
    // 클립아트로 복사하기
    copyUrl () {
      this.$copyText('https://metashopse.com/event1').then(function (e) {
        console.log(e)
        // alert('링크를 클립보드에 복사했습니다.')
      }, function (e) {
        console.log(e)
        alert('복사 실패')
      })
      this.$q.notify({
        color: 'blue',
        position: 'top',
        message: '주소를 클립보드에 복사했습니다.',
        icon: 'notifications_active'
      })
    },
    // 개인정보처리방침
    showPersonalInfoPolicy () {
      this.$refs.personalInfoPolicyModal.show()
    },
    // 서비스 이용 약관
    showTermOfService () {
      this.$refs.termOfServiceModal.show()
    },
    // 사업자정보확인
    goBusinessInfo () {
      /*
      this.$refs.redirectModal.title = '사업자정보'
      this.$refs.redirectModal.url = this.$store.state.BUSINESS_SITE_INFO
      this.$refs.redirectModal.icon = 'play_arrow'
      this.$refs.redirectModal.show()
      */
      window.open(this.$store.state.BUSINESS_SITE_INFO, '_system')
    },
    // KB국민은행 에스크로 확인
    onPopKBAuthMark () {
      this.$refs.redirectModal.title = '에스크로'
      this.$refs.redirectModal.url = 'http://escrow1.kbstar.com/quics?page=B009111&cc=b010807:b008491&mHValue=ad1485447ff247d7f537f7db37de7148201905261237657'
      this.$refs.redirectModal.icon = 'play_arrow'
      this.$refs.redirectModal.show()
    },
    // 약관 및 정책
    goTerms () {
      // this.$router.push('/terms')
    },
    goBack () {
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        // 쿠키에 돌아올 패스 저장
        this.$cookie.set('LOGIN_REDIRECT_URL', '/add/video', 1)
        this.$refs.loginModal.show()
        return
      }

      try {
        // 라우터 백 패스 설정
        let path = this.$store.state.ROUTER_FROM_PATH[this.$store.state.ROUTER_FROM_PATH.length - 1]
        // 라우터 백 패스 1개 삭제
        this.$store.state.ROUTER_FROM_PATH.splice(this.$store.state.ROUTER_FROM_PATH.length - 1, 1)
        // 뒤로가기 여부 - true일 경우 라우터 패스를 저장 안함, goBack() 함수 내에서 true로 설정, 라우터에서 false로 초기화
        this.$store.state.ROUTER_IS_MOVE_BACK = true
        // 라우터 백 패스로 이동
        this.$router.push(path)
      } catch (e) {
        this.$router.push('/menu/event')
      }
    }
  }
}
</script>
<style>
</style>
