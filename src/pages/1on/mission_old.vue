<template>
  <q-page class="">

    <loginModal ref="loginModal" />
    <personalInfoPolicyModal ref="personalInfoPolicyModal" />
    <termOfServiceModal ref="termOfServiceModal" />
    <redirectModal ref="redirectModal" />

    <!-- 홈으로 돌아가기 -->
    <q-page-sticky position="top-left" :offset="[20, 10]" style="z-index:9999;">
      <q-btn flat round dense icon="home" color="blue-7" @click="goHome" />
    </q-page-sticky>

    <!-- 공유하기 -->
    <q-page-sticky position="top-right" :offset="[30, 10]" style="z-index:9999;">
      <q-btn flat round dense icon="share" color="red-7" @click="shareMission" />
    </q-page-sticky>

    <!-- 타이틀 -->
    <q-toolbar color="black" inverted align="center">
      <q-toolbar-title>
        <b>
        <font color="#027be3">쇼핑</font>&nbsp;
        <font color="#34A853">플랫폼</font>
        <font color="#FBBC05">의</font>&nbsp;
        <font color="#EA4335">혁명</font>
        </b>
      </q-toolbar-title>
    </q-toolbar>

    <!-- ◆ 컨텐츠 영역 -->
    <div style="background-color: white">

      <!-- 인트로 -->
      <table border="0" width="330" align="center" cellpadding="0" cellspacing="0">
        <tr>
          <td align="left">
            <br>
            <!--
            <img src="statics/images/mission/workflow1.png" width="100%" style="object-fit:cover; display: block;">
            -->
<br>뭔가 좀 이쁘게 꾸며야 겠지만
<br>일단 빠르게 뼈대만 먼저 만들어 봅니다.
<br>
<br>2019년 4월, 클레이스타라는 회사를 설립하고
<br>메타샵스(metashopse.com)을 만들고 있습니다.
<br>
<br>거두 앤 절미
<br>빠르게 넘어가겠습니다.
<br>
<br>취지는 이렇습니다.
<br>'판매자를 위한 플랫폼을 만들겠다!'
<br>
<br>
<br>■ 시대적 상황 - 판매자는 봉인가!
<br>
<br>일단 A마켓에 입점심사 받고
<br>마켓이 정해놓은 수수료 다 주면서
<br>울며 겨자먹기로 판매할 수 밖에 없습니다.
<br>
<br>물론 A마켓 뿐만 아니라
<br>입점심사, 상품/문의/판매/정산/리뷰 등등
<br>이 모든 것들을 마켓별로 각각 관리해야 함은
<br>당연지사로 여겨집니다.
<br>
<br>왜 그럴까요?
<br>의문을 가져본 적 있나요?
<br>그냥 그렇게 해왔기 때문에?
<br>
<br>이러한 방식이 얼마나 지속되고 있습니까?
<br>인터넷이 나오고 몇 년이나 되었습니까?
<br>뭐가 달라졌습니까?
<br>배송 좀 빨라진 것 빼고 달라진게 있나요?
<br>판매자의 권리? 대우? 좀 나아졌나요?
<br>제가 봤을 때는 또옥 같습니다.
<br>
<br>왜? 도대체 왜요?
<br>저는 '현 플랫폼의 한계'라고 생각합니다.
<br>
<br>뭐 어떻게 할 수가 없어요.
<br>그래서 다들 가격과 배송시간에만 몰두하지요.
<br>때문에 거기로 가는 길에 걸림돌이 되면
<br>낙동강 오리알 되는거 아닙니까?
<br>
<br>실제로 제 지인이 마켓에서
<br>판매하던 상품이 1등이었는데
<br>마켓의 영업제안 거절했더니
<br>검색에도 안나오게 없애버렸답니다.
<br>그런분 또 계시지요?
<br>그래서 어떻게 합니까?
<br>
<br>뭐 뾰족한 수가 없습니다.
<br>그냥 열심히 팔아야죠..
<br>
<br>일명, '마켓강점기' 입니다.
<br>Sellers under Market's rule.
<br>
<br>생각해봅시다.
<br>극단적인 설정으로 갑니다.
<br>전체 판매자가
<br>마켓에 더이상 상품을 올리지 않는다. 면?
<br>과연 어떻게 될까요?
<br>그건 저도 궁금하네요 ㅡ,.ㅡa
<br>
<br>요즘 한창이죠 일제 불매운동.
<br>왜? 어떻게?
<br>힘이 있다 이거죠.
<br>일제 안써도 먹고 살 수 있다 이겁니다.
<br>그게 힘이죠.
<br>
<br>판매자 여러분은 힘이 있습니까?
<br>있죠. 몇몇은.
<br>하지만 대부분의 판매자는 힘? 없습니다.
<br>오히려 마켓이 힘이 있겠죠.
<br>수많은 판매자들 중에 한 두 업체 없어져도
<br>마켓은 흔들리지 않을 힘이 있다 이겁니다.
<br>
<br>그게 바로 지금의 플랫폼 구조 자체가
<br>애초부터 그렇게 설계되어 있기 때문입니다.
<br>
<br>사상 자체를 갈아 엎어야 합니다.
<br>아주 완전히.
<br>지금까지의 낡은 사고방식은 싸악 잊는 것이
<br>오히려 더 나을지도 모르겠습니다.
<br>
<br>이제 독립운동을 시작할겁니다.
<br>상인독립운동이죠.
<br>
<br>단어 소개입니다.
            <br>
          </td>
        </tr>
      </table>
      <br>
    </div>

    <div style="height: 500px;">
      <!-- 혁명 -->
      <q-parallax src="statics/images/mission/bg.jpg" :height="500">
        <table border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table border="0" height="650">
                <tr>
                  <td align="center" style="vertical-align: bottom;">
                    <font size="6" style="color:white;">
                      혁명
                    </font>
                    <br>
                    <br>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="vertical-align: top;">
                    <br>
                    <font size="5" style="color:white;">
                      이전의 관습이나 제도, 방식 따위를 단번에 깨뜨리고 질적으로 새로운 것을 급격하게 세우는 일
                    </font>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </q-parallax>
    </div>

    <!-- ◆ 컨텐츠 영역 -->
    <div style="background-color: white">
      <!-- 인트로 -->
      <table border="0" width="330" align="center" cellpadding="0" cellspacing="0">
        <tr>
          <td align="lfet">
            <!-- <img src="statics/images/mission/bg1.jpg" width="100%" height="500" style="object-fit:cover; display: block;"> -->
<br>서론 끝.
<br>본론 들어갑니다.
<br>
<br>이제 제가 생각하는 플랫폼을 그려보겠습니다.
<br>
<br>1. The seller is the seller
<br>2. Only OneOn. Only metashopse.com
<br>3. With Contents
<br>
<br>응?
<br>벌써..잘 시간..?
<br>으음 이제부터 재미가 있는디..
<br>
<br>잠은 자야져. 내일 다시ㅋ
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
            <br>
            <br>
            <br>
            <!--
            <img src="statics/images/mission/workflow2.png" width="100%" style="object-fit:cover; display: block;">
            -->
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
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
          </td>
        </tr>
      </table>
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
export default {
  // name: 'mystore',
  data () {
    return {
    }
  },
  created: function () {
  },
  methods: {
    // 홈으로
    goHome () {
      this.$router.push('/')
      // this.$router.go(-1)
    },
    // 공유
    shareMission () {
      this.copyUrl(this.$store.state.DOMAIN + '/#/mission')
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
    }
  }
}
</script>
