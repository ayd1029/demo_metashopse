<template>
  <q-layout view="LHR LpR LFR">

    <playlistHistoryModal ref="playlistHistoryModal" />
    <appDownloadModal ref="appDownloadModal" />
    <contentsReplyModal ref="contentsReplyModal" /><!-- 우상단 플레이어 댓글 -->
    <shareModal ref="shareModal" /><!-- 공유하기 -->
    <loginModal ref="loginModal" />
    <personalInfoPolicyModal ref="personalInfoPolicyModal" />
    <termOfServiceModal ref="termOfServiceModal" />
    <redirectModal ref="redirectModal" />
    <wiseSayingRegisterModal ref="wiseSayingRegisterModal" />
    <!-- <joinModal ref="joinModal" /> -->
<!--
    <q-layout-header class="no-shadow" :style="`width:100%; margin: 50px 0px 0px 0px`" reveal>
      <q-toolbar color="" :inverted="$q.theme === 'ios'">
      </q-toolbar>
    </q-layout-header>
    <q-layout-header reveal>
      <q-toolbar
        color="black"
        inverted
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <img src="statics/icons/logo.png" style="width: 30px; height: 30px;">
        <q-toolbar-title>metashopse.com</q-toolbar-title>
        <q-search inverted color="white" icon="search" placeholder="뭘찾고있는데염? 검색해드림?" style="height: 30px" value="" />
      </q-toolbar>

    </q-layout-header>
-->

    <!-- ■■■■■■■ 1. 판매자용 메뉴 ■■■■■■■ -->
    <q-layout-drawer
      v-if="$store.state.device === 'P' && $store.state.USER_ROLL_TYPE === 'S'"
      side="left"
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-0 no-shadow' : null"
      behavior="desktop"
      :width="230"
    >
      <q-scroll-area style="width: 100%; height: 100%;">
        <q-list no-border link inset-delimiter>

          <br>
          <!-- 좌상단 로고 -->
          <table border="0" width="100%" align="center" cellspacing="3" cellpadding="0" style="height:40px;">
            <tr>
              <td width="50%" align="center" class="cursor-pointer">
                <a @click="doPreAction('/')">
                  <img src="statics/images/logo/logo.png" width="50px" style="display: block;">
                </a>
              </td>
              <td rowspan="2" width="20" align="center">
                <font color="black" size="5">&</font>
              </td>
              <td width="50%" align="center" class="cursor-pointer">
                <!-- <a @click="doPreAction('/seller/menu/sellerInfo')"> -->
                <a @click="showMetashopse">
                  <img :src="$store.state.userVo.profile_image" style="width: 50px; display: block;">
                </a>
              </td>
            </tr>
            <tr>
              <td align="center" class="cursor-pointer">
                <a @click="doPreAction('/')">
                  <b>
                  <font size="2" color="black">meta</font>
                  <font size="2" color="#027be3">s</font>
                  <font size="2" color="#34A853">h</font>
                  <font size="2" color="#FBBC05">o</font>
                  <font size="2" color="#EA4335">p</font>
                  <font size="2" color="black">se</font>
                  </b>
                </a>
              </td>
              <td align="center" class="cursor-pointer">
                <a @click="doPreAction('/seller/menu/sellerInfo')">
                  <font size="2" color="black">{{ $store.state.userVo.name }}</font>
                </a>
              </td>
            </tr>
          </table>
          <br>

          <!-- 환영 메세지 -->
          <!--
          <q-item link @click.native="showWiseSaying" v-if="$store.state.userVo != null && $store.state.userVo != '' && $store.state.userVo.name != null && $store.state.userVo.name !== ''">
            <q-item-main><font size="2" color="grey"><b>{{ $store.state.userVo.name }}</b>님 환영합니다.</font></q-item-main>
          </q-item>
          -->

          <!-- ★ 관리자용 메뉴 -->
          <q-collapsible v-if="$store.state.userVo.admin_yn === 'Y'" link icon="android" label="관리자메뉴" opened>
            <q-item link @click.native="doPreAction('/admin/hotdealList')">
              <q-item-side icon="grade" />
              <q-item-main label="핫딜관리🔥" />
            </q-item>
            <q-item link @click.native="doPreAction('/admin/createProductsFile')">
              <q-item-side icon="cloud_upload" />
              <q-item-main label="상품데이터 생성" />
            </q-item>
            <q-item link @click.native="doPreAction('/admin/createSitemapFile')">
              <q-item-side icon="local_library" />
              <q-item-main label="사이트맵 생성" />
            </q-item>
            <q-item link @click.native="doPreAction('/admin/ordersList')">
              <q-item-side icon="local_shipping" />
              <q-item-main label="주문현황" />
            </q-item>
            <q-item link @click.native="doPreAction('/admin/createUser')">
              <q-item-side icon="android" />
              <q-item-main label="유저등록" />
            </q-item>
          </q-collapsible>

          <!-- 판매자용 메뉴 시작 -->
          <q-item @click.native="doPreAction('/p/seller/main')">
            <q-item-side icon="store" />
            <q-item-main label="판매자 홈" />
          </q-item>

          <q-card-separator />

          <q-collapsible link icon="widgets" label="상품 관리">
            <q-item link @click.native="doPreAction('/seller/product/productRegister')">
              <q-item-side icon="library_add" />
              <q-item-main label="상품 등록" />
            </q-item>
            <q-item link @click.native="doPreAction('/seller/product')">
              <q-item-side icon="ballot" />
              <q-item-main label="상품 관리" />
            </q-item>
            <!--
            <q-item link @click.native="doPreAction('/seller/product')">
              <q-item-side icon="ballot" />
              <q-item-main label="상품 일괄 등록" />
            </q-item>
            -->
          </q-collapsible>

          <q-card-separator />

          <q-item link @click.native="doPreAction('/p/seller/ordersList?status=')">
            <q-item-side icon="search" />
            <q-item-main label="주문 조회" />
          </q-item>

          <q-card-separator />

          <q-collapsible link icon="local_shipping" label="판매 관리" opened>
            <!--
            <q-item link @click.native="doPreAction('/p/seller/ordersList?status=')">
              <q-item-side icon="pause_circle_filled" />
              <q-item-main label="입금 대기" />
            </q-item>
            -->
            <q-item link @click.native="doPreAction('/p/seller/ordersList?status=01')">
              <q-item-side icon="check" />
              <q-item-main label="신규 주문" />
            </q-item>
            <q-item link @click.native="doPreAction('/p/seller/ordersList?status=11')">
              <q-item-side icon="shop_two" />
              <q-item-main label="배송 준비" />
            </q-item>
            <q-item link @click.native="doPreAction('/p/seller/ordersList?status=12')">
              <q-item-side icon="local_shipping" />
              <q-item-main label="배송 관리" />
            </q-item>
            <q-item link @click.native="doPreAction('/p/seller/ordersList?status=21')">
              <q-item-side icon="done_outline" />
              <q-item-main label="배송 완료" />
            </q-item>
            <q-item link @click.native="doPreAction('/p/seller/ordersList?status=030405')">
              <q-item-side icon="cancel" />
              <q-item-main label="취소 관리" />
            </q-item>
            <q-item link @click.native="doPreAction('/p/seller/ordersList?status=626466')">
              <q-item-side icon="settings_backup_restore" />
              <q-item-main label="반품 관리" />
            </q-item>
            <q-item link @click.native="doPreAction('/p/seller/ordersList?status=4045')">
              <q-item-side icon="loop" />
              <q-item-main label="교환 관리" />
            </q-item>
            <q-item link @click.native="doPreAction('/p/seller/ordersList?status=90')">
              <q-item-side icon="sentiment_satisfied_alt" />
              <q-item-main label="구매 확정" />
            </q-item>
          </q-collapsible>

          <q-card-separator />

          <q-collapsible link icon="monetization_on" label="정산 관리">
            <q-item link @click.native="doPreAction('/seller/menu/settle')">
              <q-item-side icon="local_atm" />
              <q-item-main label="정산 내역" />
            </q-item>
            <!--
            <q-item link @click.native="doPreAction('/p/seller/menu/settle')">
              <q-item-side icon="assignment" />
              <q-item-main label="정산 상세" />
            </q-item>
            <q-item link @click.native="doPreAction('/p/seller/menu/settle')">
              <q-item-side icon="money" />
              <q-item-main label="세금계산서" />
            </q-item>
            -->
          </q-collapsible>

          <q-card-separator />

          <q-item link @click.native="doPreAction('/message')">
            <q-item-side icon="notifications_active" />
            <q-item-main label="알림" />
          </q-item>
          <q-item link @click.native="doPreAction('/seller/menu/sellerQnaList')">
            <q-item-side icon="help" />
            <q-item-main label="상품 문의" />
          </q-item>
          <q-item link @click.native="doPreAction('/seller/menu/sellerReviewList')">
            <q-item-side icon="create" />
            <q-item-main label="리뷰 관리" />
          </q-item>
          <q-item link @click.native="doPreAction('/seller/menu/sellerInfo')">
            <q-item-side icon="account_box" />
            <q-item-main label="판매자 정보" />
          </q-item>
          <q-item link @click.native="doPreAction('/seller/menu/myinfo')">
            <q-item-side icon="account_circle" />
            <q-item-main label="나의 정보" />
          </q-item>

          <q-card-separator />

          <q-collapsible link icon="settings" label="기타">
            <q-item link @click.native="doPreAction('/seller/menu/notice')">
              <q-item-side icon="info" />
              <q-item-main label="공지사항" />
            </q-item>
            <q-item link @click.native="doPreAction('/seller/menu/siteQnaRegister')">
              <q-item-side icon="record_voice_over" />
              <q-item-main label="고객센터" />
            </q-item>
            <q-item link @click.native="doPreAction('/seller/menu/hotdealList')">
              <q-item-side icon="grade" />
              <q-item-main label="핫딜관리" />
            </q-item>
          </q-collapsible>

          <q-item link @click.native="doPreAction('/main')">
            <q-item-side icon="shopping_cart" color="negative" />
            <q-item-main label="구매자 홈" />
          </q-item>

          <q-item link @click.native="doLogout" v-if="$store.state.userVo != '' && $store.state.userVo.uid !== ''">
            <q-item-side icon="pause_circle_outline" />
            <q-item-main label="로그아웃" />
          </q-item>
          <q-item link @click.native="showLogin" v-else>
            <q-item-side icon="play_circle_outline" />
            <q-item-main label="로그인" />
          </q-item>

          <q-card-separator />

        </q-list>
        <br>
        <br>

        <!-- 사업자정보 -->
        <q-collapsible>
          <!-- 제목 -->
          <template slot="header">
            <q-chip color="grey-7" small square class="q-mr-sm"><font size="1">사업자정보</font></q-chip>
            <q-item-main label="" />
            <q-item-side right>
              <!-- <font size="1">보기</font> -->
            </q-item-side>
          </template>
          <!-- 내용 -->
          <table width="100%" align="center" border="0">
            <tr>
              <td align="left" colspan="5">
                <font size="1" color="grey"><b>주식회사 클레이스타</b></font>
                <font size="1" color="grey">
                  <br>대표이사 : 안영대
                  <br>(04206) 서울특별시 마포구 마포대로 196 1707
                  <br>통신판매업신고 :2022-서울마포-1213
                  <br>사업자등록번호 : 139-87-02383
                  <br>고객센터 :010-9394-1941
                  <br>메일 : metashopse@gmail.com
                  <br><a @click="showPersonalInfoPolicy"><b>개인정보처리방침</b></a>
                  <br><a @click="goBusinessInfo"><b>사업자정보확인</b></a>
                  <br><a @click="showTermOfService"><b>이용약관</b></a>
                  <br><a @click="goTerms"><b>약관 및 정책</b></a>
                  <br>투자·제휴문의 : metashopse@gmail.com<br>
                </font>
              </td>
            </tr>
            <tr>
              <td colspan="5" align="left">
                <font size="1" color="grey">
                  개별 판매자가 등록한 마켓플레이스(오픈마켓) 상품에 대한 광고, 상품주문, 배송 및 환불의 의무와 책임은 각 판매자에게 있고, 이에 대하여 (주)클레이스타는 통신판매중개자로서 통신판매의 당사자가 아니므로 일체 책임을 지지 않습니다.
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
      </q-scroll-area>

    </q-layout-drawer>

    <!-- ■■■■■■■ 2. 구매자용 메뉴 ■■■■■■■ -->
    <q-layout-drawer
      v-if="$store.state.device === 'P' && $store.state.USER_ROLL_TYPE === 'B'"
      side="left"
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-0 no-shadow' : null"
      behavior="desktop"
      :width="230"
    >
      <q-scroll-area style="width: 100%; height: 100%;">
        <q-list no-border link inset-delimiter>
          <q-list-header align="center">
            <a @click="doPreAction('/')">
              <img src="statics/images/logo/logo.png" style="width: 40px;">
              <br>
              <font color="black">쇼핑 플랫폼의 혁명</font>
            </a>
            <br>
            <br>
            <q-btn @click="addPlusFriend" size="md" color="kakao" style="width:120px;">
              <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="30" align="left"><img src="statics/images/logo/kakao_logo_25.png" style="vertical-align:middle;"></td>
                  <td align="center"><font size="2" color="#3c1e1e" style="vertical-align:middle;"><b>메타샵스</b></font></td>
                </tr>
              </table>
            </q-btn>
          </q-list-header>

          <!-- 환영 메세지 -->
          <q-item link @click.native="showWiseSaying" v-if="$store.state.userVo != null && $store.state.userVo != '' && $store.state.userVo.name != null && $store.state.userVo.name !== ''">
            <q-item-main><font size="2" color="grey"><b>{{ $store.state.userVo.name }}</b>님 환영합니다.</font></q-item-main>
          </q-item>

          <q-collapsible v-if="$store.state.userVo.admin_yn === 'Y'" link icon="android" label="관리자메뉴" opened>
            <q-item link @click.native="doPreAction('/admin/hotdealList')">
              <q-item-side icon="grade" />
              <q-item-main label="핫딜관리🔥" />
            </q-item>
            <q-item link @click.native="doPreAction('/admin/createProductsFile')">
              <q-item-side icon="cloud_upload" />
              <q-item-main label="상품데이터 생성" />
            </q-item>
            <q-item link @click.native="doPreAction('/admin/createSitemapFile')">
              <q-item-side icon="local_library" />
              <q-item-main label="사이트맵 생성" />
            </q-item>
            <q-item link @click.native="doPreAction('/admin/ordersList')">
              <q-item-side icon="local_shipping" />
              <q-item-main label="주문현황" />
            </q-item>
            <q-item link @click.native="doPreAction('/admin/createUser')">
              <q-item-side icon="android" />
              <q-item-main label="유저등록" />
            </q-item>
          </q-collapsible>

          <q-item @click.native="doPreAction('/menu/hotdeal')">
            <q-item-side icon="grade" />
            <q-item-main label="🔥핫딜🔥" />
          </q-item>
          <q-item @click.native="doPreAction('/menu/newProductList')">
            <q-item-side icon="widgets" />
            <q-item-main label="상품" />
          </q-item>
          <q-item link @click.native="doPreAction('/search')">
            <q-item-side icon="search" />
            <q-item-main label="검색" />
          </q-item>
          <q-item @click.native="doPreAction('/menu/event')">
            <q-item-side icon="cake" />
            <q-item-main label="이벤트" />
          </q-item>
          <q-item @click.native="doPreAction('/menu/newContentsList')">
            <q-item-side icon="play_circle_filled" />
            <q-item-main label="동영상" />
          </q-item>
          <q-item @click.native="doPreAction('/menu/youtuberList')">
            <q-item-side icon="play_arrow" />
            <q-item-main label="유튜버스" />
          </q-item>
          <q-item link @click.native="doPreAction('/menu/introduce')">
            <q-item-side icon="contact_support" />
            <q-item-main label="원더학개론" />
          </q-item>
          <q-item @click.native="doPreAction('/menu/rewardRankList')">
            <q-item-side icon="monetization_on" />
            <q-item-main label="원더랭킹" />
          </q-item>
          <q-item @click.native="doPreAction('/menu/dividendRankList')">
            <q-item-side icon="favorite" />
            <q-item-main label="원더배당" />
          </q-item>
          <q-item v-if="$store.state.USE_CIRCLE" @click.native="doPreAction('/menu/newCircleList')">
            <q-item-side icon="group" />
            <q-item-main label="모임" />
          </q-item>

          <q-card-separator />

          <q-collapsible link icon="shopping_cart" label="구매메뉴">
            <q-item link @click.native="doPreAction('/menu/favoriteProductList')">
              <q-item-side icon="favorite_border" />
              <q-item-main label="찜한상품" />
            </q-item>
            <q-item link @click.native="doPreAction('/menu/cartProductList')">
              <q-item-side icon="shopping_cart" />
              <q-item-main label="장바구니" />
            </q-item>
            <q-item link @click.native="doPreAction('/menu/ordersList')">
              <q-item-side icon="local_shipping" />
              <q-item-main label="주문/배송" />
            </q-item>
            <q-item link @click.native="doPreAction('/menu/returnedOrdersList')">
              <q-item-side icon="loop" />
              <q-item-main label="취소/반품" />
            </q-item>
            <q-item link @click.native="doPreAction('/menu/myQnaList')">
              <q-item-side icon="help" />
              <q-item-main label="문의사항" />
            </q-item>
            <q-item link @click.native="doPreAction('/menu/myReviewList')">
              <q-item-side icon="create" />
              <q-item-main label="구매후기" />
            </q-item>
          </q-collapsible>

          <q-card-separator />

          <q-collapsible link icon="share" label="광고메뉴">
            <q-item link @click.native="doPreAction('/menu/myproductList')">
              <q-item-side icon="widgets" />
              <q-item-main label="광고상품" />
            </q-item>
            <q-item link @click.native="doPreAction('/menu/rewardList')">
              <q-item-side><img src="statics/images/logo/logocoin.png" style="width: 22px"></q-item-side>
              <q-item-main label="원더내역" />
            </q-item>
            <q-item link @click.native="doPreAction('/menu/rewardWithdraw')">
              <q-item-side icon="save_alt" />
              <q-item-main label="출금" />
            </q-item>
          </q-collapsible>

          <q-card-separator />

          <!--
          <q-collapsible link icon="local_shipping" label="판매메뉴">
            <q-item link @click.native="doPreAction('/menu/sellerProductList')">
              <q-item-side icon="ballot" />
              <q-item-main label="상품관리" />
            </q-item>
            <q-item link @click.native="doPreAction('/menu/sellerOrdersList')">
              <q-item-side icon="local_shipping" />
              <q-item-main label="주문/배송" />
            </q-item>
            <q-item link @click.native="doPreAction('/menu/sellerReturnedOrdersList')">
              <q-item-side icon="loop" />
              <q-item-main label="취소/반품" />
            </q-item>
            <q-item link @click.native="doPreAction('/seller/menu/sellerInfo')">
              <q-item-side icon="account_box" />
              <q-item-main label="판매자정보" />
            </q-item>
            <q-item link @click.native="doPreAction('/menu/sellerCalculateList')">
              <q-item-side icon="settle" />
              <q-item-main label="정산내역" />
            </q-item>
            <q-item link @click.native="doPreAction('/menu/sellerQnaList')">
              <q-item-side icon="help" />
              <q-item-main label="상품문의" />
            </q-item>
            <q-item link @click.native="doPreAction('/menu/hotdealList')">
              <q-item-side icon="grade" />
              <q-item-main label="핫딜관리🔥" />
            </q-item>
          </q-collapsible>
          -->

          <q-card-separator />

          <q-collapsible link icon="settings" label="기타">
            <q-item link @click.native="doPreAction('/menu/notice')">
              <q-item-side icon="info" />
              <q-item-main label="공지사항" />
            </q-item>
            <q-item link @click.native="doPreAction('/menu/siteQnaRegister')">
              <q-item-side icon="record_voice_over" />
              <q-item-main label="고객센터" />
            </q-item>
            <q-item link @click.native="doPreAction('/menu/tutorial')">
              <q-item-side icon="assignment_turned_in" />
              <q-item-main label="첫방문?" />
            </q-item>
            <q-item link @click.native="doPreAction('/menu/myinfo')">
              <q-item-side icon="account_circle" />
              <q-item-main label="나의정보" />
            </q-item>
            <q-item link @click.native="registerWiseSaying">
              <q-item-side icon="nature_people" />
              <q-item-main label="랜덤메세지" />
            </q-item>
            <q-item link @click.native="doPreAction('/menu/creatorList')">
              <q-item-side icon="thumb_up" />
              <q-item-main label="인기순위" />
            </q-item>
          </q-collapsible>

          <q-card-separator />

          <!-- 판매자 홈 -->
          <q-item link @click.native="doPreAction('/p/seller/main')">
            <q-item-side icon="local_shipping" color="info" />
            <q-item-main label="판매자 홈" />
          </q-item>

          <q-item link @click.native="doPreAction('/main')">
            <q-item-side icon="home" />
            <q-item-main label="피드" />
          </q-item>
          <q-item link @click.native="doPreAction('/message')">
            <q-item-side icon="notifications_active" />
            <q-item-main label="알림" />
          </q-item>
          <q-item link @click.native="doPreAction('/add')">
            <q-item-side icon="add_circle_outline" />
            <q-item-main label="등록" />
          </q-item>
          <q-item v-if="$store.state.USE_CIRCLE" link @click.native="doPreAction('/circle')">
            <q-item-side icon="group" />
            <q-item-main label="내모임" />
          </q-item>
          <q-item link @click.native="doLogout" v-if="$store.state.userVo != '' && $store.state.userVo.uid !== ''">
            <q-item-side icon="pause_circle_outline" />
            <q-item-main label="로그아웃" />
          </q-item>
          <q-item link @click.native="showLogin" v-else>
            <q-item-side icon="play_circle_outline" />
            <q-item-main label="로그인" />
          </q-item>
        </q-list>
        <br>
        <br>

        <!-- 사업자정보 -->
        <q-collapsible>
          <!-- 제목 -->
          <template slot="header">
            <q-chip color="grey-7" small square class="q-mr-sm"><font size="1">사업자정보</font></q-chip>
            <q-item-main label="" />
            <q-item-side right>
              <!-- <font size="1">보기</font> -->
            </q-item-side>
          </template>
          <!-- 내용 -->
          <table width="100%" align="center" border="0">
            <tr>
              <td align="left" colspan="5">
                <font size="1" color="grey"><b>주식회사 클레이스타</b></font>
                <font size="1" color="grey">
                  <br>대표이사 : 안영대
                  <br>(04206) 서울특별시 마포구 마포대로 196 1707호
                  <br>통신판매업신고 :2022-서울마포-1213
                  <br>사업자등록번호 : 139-87-02383
                  <br>고객센터 :010-9394-1941
                  <br>메일 : metashopse@gmail.com
                  <br><a @click="showPersonalInfoPolicy"><b>개인정보처리방침</b></a>
                  <br><a @click="goBusinessInfo"><b>사업자정보확인</b></a>
                  <br><a @click="showTermOfService"><b>이용약관</b></a>
                  <br><a @click="goTerms"><b>약관 및 정책</b></a>
                  <br>투자·제휴문의 : metashopse@gmail.com<br>
                </font>
              </td>
            </tr>
            <tr>
              <td colspan="5" align="left">
                <font size="1" color="grey">
                  개별 판매자가 등록한 마켓플레이스(오픈마켓) 상품에 대한 광고, 상품주문, 배송 및 환불의 의무와 책임은 각 판매자에게 있고, 이에 대하여 (주)클레이스타는 통신판매중개자로서 통신판매의 당사자가 아니므로 일체 책임을 지지 않습니다.
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
      </q-scroll-area>

    </q-layout-drawer>

    <q-layout-drawer
      v-if="$store.state.device === 'P'"
      side="right"
      v-model="$store.state.rightDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-0 no-shadow' : null"
      :width="386"
    >
      <q-scroll-area style="width: 100%; height: 100%;">
        <!--
        <q-list-header align="left">
          Play the shopping ! &nbsp;&nbsp;
          <q-icon name="refresh" color="black" size="18px" @click.native="refreshContents" />
        </q-list-header>
        -->

        <!-- 우상단 플레이어 -->
        <div id="divNormalContents" style="width: 100%; margin: 0px 0px 0px 0px;">
          <div style="width: 387px; margin: 0px 0px 0px 0px; background-color:white; z-index:1;" :class="$store.state.rightPlayerClass">
            <table border="0" cellpadding="0" cellspacing="0" style="width: 97%; margin: 5px 0px 0px 0px;" align="right">
              <tr>
                <td>
                  <q-carousel color="white" height="211px">
                    <q-carousel-slide><q-video class="absolute-full" :src="setVideoParams(contentsVo.video_url)" playsinline webkit-playsinline /></q-carousel-slide>
                  </q-carousel>
                  <!--
                  <iframe id="sidePlayer" width="100%" height="214px" :src="setVideoParams(contentsVo.video_url)" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  -->
                </td>
              </tr>
            </table>
            <table border="0" style="width: 97%;">
              <tr>
                <td></td>
              </tr>
            </table>
          </div>
          <!-- 공백 맞추기용 -->
          <div v-if="$store.state.rightPlayerClass !== ''" style="height:220px; margin: 0px 0px 0px 0px;">
          </div>
          <div style="width: 100%; margin: 0px 0px 0px 0px;">
            <table border="0" cellpadding="0" cellspacing="0" style="width: 100%">
              <tr>
                <td width="50" rowspan="2" align="center">
                  <div class="round-main">
                    <a @click="showUserHome(contentsVo.reg_id)"><img :src="contentsVo.profile_image" style="width: 30px"></a>
                  </div>
                </td>
                <td><a @click="showUserHome(contentsVo.reg_id)"><font size="2" color="grey">{{ contentsVo.name }}</font></a></td>
                <!--
                <td width="50" rowspan="2" align="center">
                  기능버튼
                  <q-btn flat round dense color="grey" icon="more_vert">
                    <q-popover>
                      <q-list link class="scroll" style="min-width: 100px">
                        <q-item key="1" v-close-overlay @click.native="copyUrlAuto('CONTENTS', contentsVo.seq)"><q-item-main label="링크복사" /></q-item>
                        <q-item key="4" v-close-overlay @click.native="reportContents(contentsVo)"><q-item-main label="신고하기" /></q-item>
                      </q-list>
                    </q-popover>
                  </q-btn>
                </td>
                -->
              </tr>
              <tr>
                <td>
                  <font size="2" color="black"><div v-html="contentsVo.title" /></font>
                </td>
              </tr>
            </table>
            <table style="width: 97%; border-collapse:collapse; border-spacing:0px; margin: 10px 0px 0px 0px;" border="0" cellpadding="0" cellspacing="0" align="right">
              <tr>
                <!-- <td width="10" align="left"></td> -->
                <td width="60" align="left">
                  <!-- 센터 플레이 -->
                  &nbsp;
                  <q-btn size="xs" round color="primary" icon="arrow_back" @click="goContentsDetail(contentsVo.seq)">
                    <q-tooltip>크게보기</q-tooltip>
                  </q-btn>
                </td>
                <td width="60" align="left">
                  <!-- 댓글 -->
                  <q-btn dense flat round color="black" icon="chat" @click="showContentsReplyModal(contentsVo)" />
                  <font size="1" color="black">{{contentsVo.reply_count}}</font>
                </td>
                <td width="60" align="left">
                  <!-- 좋아요 -->
                  <q-btn dense v-if="contentsVo.like_cd === 'Y'" flat round color="primary" icon="thumb_up_alt" @click="likeIt(contentsVo, 'YES')" />
                  <q-btn dense v-else flat round color="black" icon="thumb_up_alt" @click="likeIt(contentsVo, 'YES')" />
                  <font size="1" color="black">{{contentsVo.like_yes_count}}</font>
                </td>
                <td width="60" align="left">
                  <!-- 싫어요 -->
                  <q-btn dense v-if="contentsVo.like_cd === 'N'" flat round color="primary" icon="thumb_down_alt" @click="likeIt(contentsVo, 'NO')" />
                  <q-btn dense v-else flat round color="black" icon="thumb_down_alt" @click="likeIt(contentsVo, 'NO')" />
                  <font size="1" color="black">{{contentsVo.like_no_count}}</font>
                </td>
                <td width="60" align="left">
                  <!-- 공유 -->
                  <q-btn dense flat round color="black" icon="share" @click="copyUrlAuto('CONTENTS', contentsVo.seq)" />
                </td>
                <td width="50" align="left">
                  <!-- 저장 -->
                  <q-btn dense v-if="contentsVo.save_yn === 'Y'" flat round color="primary" icon="beenhere" @click="saveIt(contentsVo, 'N')" />
                  <q-btn dense v-else flat round color="black" icon="beenhere" @click="saveIt(contentsVo, 'Y')">
                    <q-tooltip>저장하기</q-tooltip>
                  </q-btn>
                </td>
              </tr>
            </table>
          </div>
          <div style="width: 100%; margin: 50px 0px 0px 0px;">
            <table style="width: 95%; border-collapse:collapse;" border="0" align="center">
              <tr>
                <td align="left">
                  <font size="2">
                    <div v-html="setHtml(contentsVo.contents)" style="word-break: break-all;"></div>
                  </font>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td><q-card-separator /></td>
              </tr>
            </table>
          </div>
        </div>

        <div style="width: 100%; margin: 10px 0px 0px 0px;">
          <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" >
            <!-- 컨텐츠 리스트 -->
            <q-infinite-scroll :handler="loadMoreContents" ref="infiniteScrollContents">
              <div style="padding:0px 0px 0px 0px" v-for="item in contentsList" :key="item.seq">
                <q-item link @click.native="setSidePlayer(item)" style="padding:0px 0px 0px 0px">
                  <table border="0" style="width: 100%; padding:5px 0px 5px 0px;">
                    <tr>
                      <td rowspan="1" width="5">&nbsp;</td>
                      <td rowspan="2" width="160">
                        <div v-if="item.image_url != null"><img :src="item.image_url" class='image-contents-list'></div>
                        <div v-else><img :src="item.og_image_url" class='image-contents-list'></div>
                      </td>
                      <td rowspan="2" width="5px">&nbsp;</td>
                      <td colspan="1"><font size="2" color="black"><div v-html="item.title" style="text-align:left; word-break:keep-all; word-wrap:break-word;" /></font></td>
                      <td colspan="1" align="right">
                        <!-- <q-btn flat round dense color="grey" icon="more_vert" @click="123" size="xs" /> -->
                      </td>
                    </tr>
                    <!--
                    <tr>
                      <td colspan="2"><font size="2" color="black"><div v-html="item.contents" style="word-break:break-all;" /></font></td>
                    </tr>
                    -->
                  </table>
                </q-item>
              </div>
              <br>
              <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
            </q-infinite-scroll>
          </q-pull-to-refresh>
        </div>
        <br>
        <br>
      </q-scroll-area>
    </q-layout-drawer>

    <!-- 쥬크박스(DJ) -->
    <q-page-sticky
      expand
      position="bottom-right"
      :offset="[$store.state.playerOffsetHori, $store.state.playerOffsetVert]"
      style="z-index:10;"
    >
      <table width="100%" border="0" align="right" cellpadding="0" cellspacing="0">
        <tr>
          <td align="left">
            <div>
              <iframe id="player"
                :width="$store.state.playerWidth"
                :height="$store.state.playerHeight"
                :src="$store.state.playVideoUrl"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                style="vertical-align:bottom;"
                allowfullscreen>
              </iframe>
              &nbsp;
            </div>
          </td>
          <td style="vertical-align:bottom;">
            <q-fab :icon="$store.state.playerStatusIcon" direction="up" color="black">
              <q-fab-action v-if="$store.state.playerIsPlaying" icon="pause" @click="playerPause" color="primary" />
              <q-fab-action v-else icon="play_arrow" @click="playerPlay" color="primary" />
              <q-fab-action :icon="$store.state.playerIsMuteIcon" @click="playerMute" color="black" />
              <q-fab-action icon="storage" @click="showPlayList" color="black" />
              <q-fab-action :icon="$store.state.playerSizeIcon" @click="playerSize" color="black" />
              <q-fab-action :icon="$store.state.playerIsShowingIcon" @click="playerShow" color="black" />
              <q-fab-action v-if="$store.state.device !== 'ios' && $store.state.device !== 'android'" icon="get_app" @click="showAppDownload" color="black" />
            </q-fab>
          </td>
        </tr>
      </table>
    </q-page-sticky>

<!--
    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        :duration="1"
        @leave="resetScroll"
      >
        <router-view />
      </transition>
    </q-page-container>
-->

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <!-- ■■■■■■■■■■ 판매자용 푸터 ■■■■■■■■■■ -->
    <q-layout-footer v-if="$store.state.device !== 'P' && $store.state.USER_ROLL_TYPE === 'S'" class="shadow-0">
      <q-tabs
        v-if="$store.state.userVo != null && $store.state.userVo != '' && $store.state.userVo.uid !== '' && $store.state.layoutTabVisible"
        align="justify"
        position="bottom"
        class="no-shadow"
        color="black"
        underline-color="primary"
        inverted
      >
        <q-route-tab slot="title" icon="store" to="/seller/main" /><!-- 판매자 메인 -->
        <q-route-tab slot="title" icon="widgets" to="/seller/product" /><!-- 상품관리 -->
        <q-route-tab slot="title" icon="search" to="/seller/searchOrdersList" /><!-- 주문 조회 -->
        <q-route-tab slot="title" icon="local_shipping" to="/seller/ordersList" /><!-- 주문/배송 -->
        <!-- <q-route-tab slot="title" icon="loop" to="/seller/order/sellerReturnedOrdersList" />취소/반품 -->
        <!-- <q-route-tab slot="title" icon="attach_money" to="/seller/settle" />정산내역 -->
        <q-route-tab v-if="$store.state.unreadMessageCount === 0" slot="title" icon="notifications_active" to="/seller/message" /><!-- 미확인 메세지 없을 경우 -->
        <q-route-tab v-else slot="title" icon="notifications_active" to="/seller/message" :count="$store.state.unreadMessageCount" /><!-- 미확인 메세지 있을 경우 -->
        <!-- <q-route-tab slot="title" icon="shopping_cart" to="/menu?t=B" color="primary" />구매자 홈으로 전환 -->
        <q-route-tab slot="title" icon="menu" to="/seller/menu" /><!-- 메뉴 -->
      </q-tabs>
    </q-layout-footer>

    <!-- ■■■■■■■■■■ 구매자용 푸터 ■■■■■■■■■■ -->
    <q-layout-footer v-if="$store.state.device !== 'P' && $store.state.USER_ROLL_TYPE === 'B'" class="shadow-0">
      <q-tabs
        v-if="$store.state.userVo != null && $store.state.userVo != '' && $store.state.userVo.uid !== '' && $store.state.layoutTabVisible"
        align="justify"
        position="bottom"
        class="no-shadow"
        color="black"
        underline-color="primary"
        inverted
      >
        <q-route-tab slot="title" icon="home" to="/main" /><!-- 메인 -->
        <q-route-tab slot="title" icon="search" to="/search" /><!-- 검색 -->
        <q-route-tab slot="title" icon="add_circle_outline" to="/add" /><!-- 콘텐츠 등록 -->
        <q-route-tab v-if="$store.state.unreadMessageCount === 0" slot="title" icon="notifications_active" to="/message" /><!-- 미확인 메세지 없을 경우 -->
        <q-route-tab v-else slot="title" icon="notifications_active" to="/message" :count="$store.state.unreadMessageCount" /><!-- 미확인 메세지 있을 경우 -->
        <!-- <q-route-tab slot="title" icon="local_shipping" to="/seller/main" color="info" />판매자 홈으로 전환 -->
        <q-route-tab v-if="$store.state.USE_CIRCLE" slot="title" icon="group" to="/circle" /><!-- 모임 -->
        <q-route-tab slot="title" icon="menu" to="/menu" /><!-- 메뉴 -->
      </q-tabs>
    </q-layout-footer>
  </q-layout>
</template>

<script>
// import { openURL } from 'quasar'
// import { mapState } from 'vuex'
import Vue from 'vue'

export default {
  name: 'layout-main',
  components: {
  },
  computed: {
    /*
    swiper () {
      return this.$refs.mySwiper.swiper
    }
    ...mapState([
      'pageMeta'
    ])
    */
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      // rightDrawerOpen: this.$q.platform.is.desktop,
      // player: '',
      // videoUrl: 'https://www.youtube.com/embed/xRbPAVnqtcs?rel=0&enablejsapi=1&list=RDxRbPAVnqtcs',
      createPlayerInterval: '',
      // playerIsOnIcon: 'not_interested', // branding_watermark / not_interested
      /*
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 350,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
      */
      contentsVo: {}, // 우측 상단 플레이어
      refresherDone: '',
      // offset: 500,
      pageSizeContents: 30,
      lastPageNumContents: 1, // 컨텐츠 마지막 페이지
      contentsList: [] // 컨텐츠 리스트
    }
  },
  created: function () {
    this.selectContentsListMax() // 사이드 컨텐츠 마지막페이지 조회

    // 플레이어 스크립트 로드
    this.$loadScript('https://www.youtube.com/iframe_api')
      .then((result) => {
        // Script is loaded, do something
        // console.log('loadscript completed!')
      })
      .catch((e) => {
        console.log('catched: ' + e)
      })
    // 플레이 리스트 조회
    // PLAY_LIST 테이블에서 REG_ID가 '1theDJ'인 데이터 조회
    // 플레이 히스토리 리스트 조회
    this.$axios.get(this.$store.state.apiServerIp + '/api/playlist/selectPlaylistHistoryListNoPaging', {params: {uid: this.$store.state.userVo.uid}})
      .then((result) => {
        // console.log(JSON.stringify(result.data))
        this.$store.state.playlistHistoryList = result.data
        // 디폴트 영상 설정
        if (this.$store.state.playlistHistoryList != null && this.$store.state.playlistHistoryList.length > 0) {
          this.changePlayVideoUrl(this.$store.state.playlistHistoryList[0].video_url)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    /*
    // 카트 상품 수 조회
    this.$axios.get(this.$store.state.apiServerIp + '/api/cart/selectCartCount')
      .then((result) => {
        // console.log(JSON.stringify(result.data))
        // 카트 상품 수 설정
        this.$store.state.myCartCount = result.data
      })
      .catch((err) => {
        console.log(err)
      })
    */
  },
  mounted: function () {
    // 플레이어가 생성될때까지 반복
    this.createPlayerInterval = setInterval(() => {
      // 플레이어가 생성 되었을 경우 반복 종료
      console.log('player 생성중..')
      if (this.$store.state.player != null) {
        clearInterval(this.createPlayerInterval)
        return
      }
      // 플레이어 생성
      this.$store.state.player = new window.YT.Player('player', {
        events: {
          'onReady': this.onPlayerReady, // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
          'onStateChange': this.onPlayerStateChange // 플레이어의 상태가 변경될 때마다 실행
        }
      })
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.createPlayerInterval)
  },
  methods: {
    resetScroll (el, done) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      done()
    },
    // 플러스친구 추가
    addPlusFriend () {
      if (this.$store.state.Kakao != null) {
        this.$store.state.Kakao.PlusFriend.addFriend({
          plusFriendId: '_eQzxbT' // 플러스친구 홈 URL에 명시된 id로 설정합니다.
        })
      }
    },
    // 이용약관
    goTerms () {
      this.$router.push('/terms')
    },
    showAppDownload () {
      this.$refs.appDownloadModal.show()
    },
    // 플레이리스트 모달 표시
    showPlayList () {
      this.$refs.playlistHistoryModal.show()
    },
    // 4. The API will call this function when the video player is ready.
    onPlayerReady (event) {
      if (this.$store.state.isInitPlayer) {
        this.$store.state.isInitPlayer = false
      } else {
        event.target.playVideo()
      }
    },
    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    // 플레이어 상태변화 이벤트
    onPlayerStateChange (event) {
      console.log('event.data: ' + event.data)
      if (event.data === window.YT.PlayerState.PLAYING) {
        this.$store.state.playerIsPlaying = true
        this.$store.state.playerStatusIcon = 'pause_circle_outline'
      } else {
        this.$store.state.playerIsPlaying = false
        this.$store.state.playerStatusIcon = 'play_circle_outline'
      }
      if (event.data === window.YT.PlayerState.ENDED) {
        event.target.playVideo() // 다시 재생
        this.$store.state.playerIsPlaying = true
        console.log('■■■ playerIsPlaying: ' + this.$store.state.playerIsPlaying)
      }
    },
    playerPlay () {
      if (this.$store.state.player == null) {
        console.log('플레이어 is null in playerPlay')
        /*
        this.$store.state.player = new window.YT.Player('player', {
          events: {
            'onReady': this.onPlayerReady, // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
            'onStateChange': this.onPlayerStateChange // 플레이어의 상태가 변경될 때마다 실행
          }
        })
        */
      } else {
        this.$store.state.playerIsPlaying = true
        this.$store.state.playerStatusIcon = 'pause_circle_outline'
        this.$store.state.player.playVideo()
        // console.log('플레이어 플레이 result:' + JSON.stringify(result))

        // 플레이어가 생성될때까지 반복
        let playPlayerInterval = setInterval(() => {
          // 플레이어가 생성 되었을 경우 반복 종료
          console.log('player 재생중..')
          if (this.$store.state.player.getPlayerState() === window.YT.PlayerState.PLAYING) { // 1:재생중 일때까지 반복
            clearInterval(playPlayerInterval)
            return
          }
          this.$store.state.player.playVideo()
        }, 1000)
      }
    },
    playerPause () {
      this.$store.state.player.pauseVideo()
      this.$store.state.playerIsPlaying = false
      this.$store.state.playerStatusIcon = 'play_circle_outline'
    },
    playerMute () { // 플레이어 음소거 on/off
      if (this.$store.state.player === null) {
        return // 플레이어 생성 전이면 리턴
      }
      if (this.$store.state.player.isMuted()) {
        // 플레이어 음소거 on/off
        this.$store.state.player.unMute()
        this.$store.state.playerIsMute = false
        this.$store.state.playerIsMuteIcon = 'volume_off'
      } else {
        // 플레이어 음소거 on
        this.$store.state.player.mute()
        this.$store.state.playerIsMute = true
        this.$store.state.playerIsMuteIcon = 'volume_up'
      }
    },
    playerShow () { // 플레이어 보이기/감추기
      if (this.$store.state.player == null) {
        console.log('플레이어 is null in playerShow')
        /*
        this.$store.state.player = new window.YT.Player('player', {
          events: {
            'onReady': this.onPlayerReady, // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
            'onStateChange': this.onPlayerStateChange // 플레이어의 상태가 변경될 때마다 실행
          }
        })
        */
      }
      if (this.$store.state.playerIsShowing) { // 표시중일 경우 비표시로 전환
        this.$store.state.playerWidth = 0
        this.$store.state.playerHeight = 0
        this.$store.state.playerIsShowing = false
        this.$store.state.playerIsShowingIcon = 'personal_video'
      } else { // 비표시중일 경우 표시중으로 전환하고 동영상 재생
        if (this.$store.state.playerSizeIsBig) { // 빅사이즈 였으면
          this.$store.state.playerWidth = 304
          this.$store.state.playerHeight = 171
        } else {
          this.$store.state.playerWidth = 160
          this.$store.state.playerHeight = 90
        }
        this.$store.state.playerIsShowing = true
        this.$store.state.playerIsShowingIcon = 'hearing'
      }
    },
    playerSize () {
      if (this.$store.state.player == null) {
        console.log('플레이어 is null in playerPlay')
        /*
        this.$store.state.player = new window.YT.Player('player', {
          events: {
            'onReady': this.onPlayerReady, // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
            'onStateChange': this.onPlayerStateChange // 플레이어의 상태가 변경될 때마다 실행
          }
        })
        */
      }
      if (this.$store.state.playerSizeIsBig) { // 빅사이즈 -> 스몰사이즈
        this.$store.state.playerWidth = 160
        this.$store.state.playerHeight = 90
        this.$store.state.playerSizeIsBig = false
        this.$store.state.playerSizeIcon = 'featured_video'
      } else {
        this.$store.state.playerWidth = 304
        this.$store.state.playerHeight = 171
        this.$store.state.playerSizeIsBig = true
        this.$store.state.playerSizeIcon = 'branding_watermark'
      }
      // 플레이어 보이기/감추기 -> 보였으니 감추기로 수정
      this.$store.state.playerIsShowing = true
      this.$store.state.playerIsShowingIcon = 'hearing'
    },
    /*
    playerOnOff () { // 플레이어 on/off
      if (this.playerIsOn) {
        this.playerIsOn = false
        this.playerIsOnIcon = 'branding_watermark'
        this.playerIsPlaying = false // 플레이 중지, 리플레이 표시로 변경
      } else {
        this.playerIsOn = true
        this.playerIsOnIcon = 'not_interested'
      }
    },
    */
    changePlayVideoUrl (videoUrl) {
      // 스토어의 동영상 주소 변경
      // iframe의 src가 하기 변수로 지정되어 있으므로 하기 변수 값이 변경되면 동영상도 바뀜
      // this.$store.state.playVideoUrl = videoUrl

      // 동영상 주소 설정
      let prefix = '' // '?'가 있으면 &로 파라미터 추가, '?'가 없으면 '?'로 파라미터 추가
      let playUrl = '' // 파라미터 붙인 동영상 URL
      if (videoUrl.toString().indexOf('?') < 0) { // '?'가 있는 경우
        prefix = '?'
      } else { // '?'가 없는 경우
        prefix = '&'
      }
      playUrl = videoUrl + prefix + this.$store.state.videoUrlParameter // 'rel=0&enablejsapi=1&playsinline=1'
      // 1. 플레이어 플레이
      this.$store.state.playVideoUrl = playUrl
    },
    // //////////////////////////////////////////////////////////////// 우측 컨텐츠 리스트
    refreshContents () {
      this.contentsList = [] // 컨텐츠 리스트 초기화
      this.$refs.infiniteScrollContents.reset() // index 초기화
      this.$refs.infiniteScrollContents.resume() // stop에서 다시 재생
      this.$refs.infiniteScrollContents.loadMore() // loadMore로 검색
    },
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      setTimeout(() => { // 3초 후에 로딩메세지 비표시
        done()
      }, 3000)

      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScrollContents.reset() // index 초기화
      this.$refs.infiniteScrollContents.resume() // stop에서 다시 재생
      this.$refs.infiniteScrollContents.loadMore() // loadMore로 검색
    },
    loadMoreContents: function (index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        console.log('loadMoreContents called index: ' + index + ' this.lastPageNumContents: ' + this.lastPageNumContents)
        if (index <= this.lastPageNumContents) {
          this.selectContentsList(index, done)
        } else {
          this.$refs.infiniteScrollContents.stop()
        }
        // refresher 로딩메세지 처리
        if (this.refresherDone != null && this.refresherDone !== '') {
          this.refresherDone() // 로딩메세지 종료
          this.refresherDone = '' // 로딩메세지 초기화
        }
      }, 100)
    },
    // 컨텐츠 리스트 마지막 페이지 조회
    selectContentsListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/contents/selectContentsListAllPcLastPageNum',
        {params: {pageSize: this.pageSizeContents}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumContents = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 컨텐츠 리스트 조회
    selectContentsList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/contents/selectContentsListAllPc',
        {params: {pageNum: idx, pageSize: this.pageSizeContents}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.contentsList = [] // 리스트 초기화
          }
          this.contentsList = this.contentsList.concat(result.data)
          done()

          // 현재 우상단 플레이어에 표시되는 컨텐츠가 없으면 설정1
          // console.log(this.contentsVo)
          if (this.contentsVo.seq == null) {
            this.contentsVo = this.contentsList[0]
          }
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    },
    // 컨텐츠 더보기
    doLoadMore () {
      this.$refs.infiniteScrollContents.loadMore() // loadMore로 검색
    },
    // 컨텐츠 상세 화면으로 이동
    goContentsDetail (seqContents) {
      // this.$router.push({ path: 'home' })
      // this.$router.push('/contents/contentsDetail?seq=' + seqContents)
      this.$router.push({ path: '/contents/contentsDetail', query: {seq: seqContents} })
    },
    // 유저홈 팝업
    showUserHome (uid) {
      Vue.prototype.$showUserHome(uid)
    },
    checkLogin () {
      return Vue.prototype.$checkLogin(this.$store.state.userVo)
    },
    // 좋아요/싫어요
    likeIt (item, likeCd) {
      // 로그인 체크
      if (!this.checkLogin()) {
        // this.$refs.loginModal.redirectTo = '/contentsDetail?seq=' + this.contentsVo.seq
        let path = this.$store.state.ROUTER_TO_PATH[this.$store.state.ROUTER_TO_PATH.length - 1]
        this.$cookie.set('LOGIN_REDIRECT_URL', path, 1) // 현재 페이지 쿠키에 저장
        this.$refs.loginModal.show()
        return
      }
      // like_cd Y:좋아요 N:싫어요 null:중립
      // 1. 화면 조작
      if (likeCd === 'YES') { // 좋아요인 경우
        if (item.like_cd === 'Y') { // 이전상태 좋아요일 경우
          item.like_cd = null // 중립으로 설정
          item.like_yes_count = Number(item.like_yes_count) - 1
        } else {
          if (item.like_cd === 'N') { // 이전상태 싫어요일 경우
            item.like_no_count = Number(item.like_no_count) - 1
          }
          item.like_cd = 'Y' // 좋아요로 설정
          item.like_yes_count = Number(item.like_yes_count) + 1
        }
      } else { // 싫어요인 경우
        if (item.like_cd === 'N') { // 이전상태 싫어요일 경우
          item.like_cd = null // 중립으로 설정
          item.like_no_count = Number(item.like_no_count) - 1
        } else {
          if (item.like_cd === 'Y') { // 이전상태 좋아요일 경우
            item.like_yes_count = Number(item.like_yes_count) - 1
          }
          item.like_cd = 'N' // 싫어요로 설정
          item.like_no_count = Number(item.like_no_count) + 1
        }
      }
      // 2. 좋아요 테이블 저장
      let contentsLikeVo = {}
      contentsLikeVo.seq_contents = item.seq
      // contentsLikeVo.uid_from = this.$store.state.userVo.uid
      // contentsLikeVo.from_name = this.$store.state.userVo.name
      contentsLikeVo.uid_to = item.reg_id
      contentsLikeVo.like_cd = item.like_cd

      this.$axios.post(this.$store.state.apiServerIp + '/api/contents/updateContentsLike', contentsLikeVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 컨텐츠 저장하기
    saveIt (item, saveYn) {
      // 로그인 체크
      if (!this.checkLogin()) {
        // this.$refs.loginModal.redirectTo = '/contentsDetail?seq=' + this.contentsVo.seq
        let path = this.$store.state.ROUTER_TO_PATH[this.$store.state.ROUTER_TO_PATH.length - 1]
        this.$cookie.set('LOGIN_REDIRECT_URL', path, 1) // 현재 페이지 쿠키에 저장
        this.$refs.loginModal.show()
        return
      }
      console.log('saveYn: ' + saveYn)
      // 1. 화면 조작
      item.save_yn = saveYn

      // 2. 컨텐츠 저장 테이블에 저장
      let contentsSaveVo = {}
      contentsSaveVo.seq_contents = item.seq
      contentsSaveVo.save_yn = saveYn
      contentsSaveVo.uid = this.$store.state.userVo.uid

      if (saveYn === 'Y') { // 저장인 경우
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '저장되었습니다.',
          icon: 'notifications_active'
        })
      }
      this.$axios.post(this.$store.state.apiServerIp + '/api/contents/updateContentsSave', contentsSaveVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 공유링크 복사
    copyUrlAuto (linkCd, seqOg) {
      // linkCd -> PRODUCT:상품 CONTENTS:컨텐츠 CIRCLE:모임 MEMBER:회원
      this.$refs.shareModal.linkVo.seq_og = seqOg
      this.$refs.shareModal.linkVo.link_cd = linkCd
      this.$refs.shareModal.show()
    },
    // 신고하기
    reportContents (item) {
      // 확인 메세지
      this.$q.dialog({
        title: '게시물 신고',
        message: '정말 신고할까요?',
        ok: '예',
        cancel: '아니오',
        color: 'primary'
      }).then(() => {
        this.$q.notify({
          color: 'primary',
          position: 'left',
          message: '해당 게시물 신고 완료',
          icon: 'notifications_active'
        })
        let contentsVo = {}
        contentsVo.seq = item.seq
        contentsVo.mod_id = this.$store.state.userVo.uid
        this.$axios.post(this.$store.state.apiServerIp + '/api/contents/reportContents', contentsVo)
          .then((result) => {
            /*
            this.$q.notify({
              color: 'primary',
              position: 'left',
              message: '해당 게시물 신고 완료',
              icon: 'notifications_active'
            })
            */
          })
          .catch((err) => {
            console.log(err)
          })
      }).catch(() => {
      })
    },
    // 컨텐츠 댓글 모달
    showContentsReplyModal (item) {
      this.$refs.contentsReplyModal.contentsVo = item
      this.$refs.contentsReplyModal.show()
    },
    // 동영상 URL에 파라미터 추가 (playsinline=1)
    setVideoParams (videoUrl) {
      if (videoUrl == null) {
        // 화면 첫 로딩시 데이터 조회되기 전에 videoUrl이 null인 상태로 되어 있을 때, 서버단에서 에러로 처리되는 것 방지
        return 'https://www.youtube.com/embed/NuF8lYngcK8'
      } else {
        return Vue.prototype.$setVideoParams(videoUrl) + '&autoplay=1'
      }
    },
    // 사이드 컨텐츠 클릭시 사이드 플레이어에 컨텐츠 설정
    setSidePlayer (item) {
      this.contentsVo = item
    },
    setHtml (str) {
      return Vue.prototype.$setHtml(str)
    },
    doPreAction (path) { // 화면 이동 전처리
      // 로그인이 필요한 메뉴
      // alert(path)
      if (path === '/main' || // 메인
          path === '/add' || // 등록
          path === '/message' || // 알림
          path === '/circle' || // 모임
          path === '/menu/hotdealList' || // 핫딜관리
          path === '/menu/favoriteProductList' || // 찜한상품
          path === '/menu/cartProductList' || // 장바구니
          path === '/menu/ordersList' || // 주문/배송조회
          path === '/menu/returnedOrdersList' || // 취소/반품/교환
          path === '/menu/myQnaList' || // 나의문의사항
          path === '/menu/myReviewList' || // 구매후기
          path === '/menu/myproductList' || // 광고상품관리
          path === '/menu/rewardList' || // 광고보상내역
          path === '/menu/dividendRankList' || // 원더배당
          path === '/menu/rewardWithdraw' || // 보상출금
          path === '/menu/sellerProductList' || // 판매상품관리
          path === '/menu/sellerQnaList' || // 판매문의사항
          path === '/menu/sellerOrdersList' || // 주문/배송관리
          path === '/menu/sellerReturnedOrdersList' || // 판매자 취소/반품/교환
          path === '/seller/menu/sellerInfo' || // 판매자정보
          path === '/menu/sellerCalculateList' || // 정산내역
          path === '/menu/myinfo' || // 나의정보
          path === '/menu/tutorial') { // 무작정따라하기
        // 로그인 체크
        if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
          // 쿠키에 돌아올 패스 저장
          this.$cookie.set('LOGIN_REDIRECT_URL', path, 1) // 현재 페이지 쿠키에 저장
          // this.$router.push(this.$store.state.PAGE_LOGIN)
          this.$refs.loginModal.show()
        } else {
          this.$router.push(path)
        }
      } else {
        this.$router.push(path)
      }
    },
    // 명언 등록
    registerWiseSaying () {
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        // 쿠키에 돌아올 패스 저장
        this.$cookie.set('LOGIN_REDIRECT_URL', '/menu', 1) // 현재 페이지 쿠키에 저장
        // this.$router.push(this.$store.state.PAGE_LOGIN)
        this.$refs.loginModal.show()
        return
      }
      this.$refs.wiseSayingRegisterModal.show()
    },
    // 로그인
    showLogin () {
      this.$refs.loginModal.show()
    },
    // 로그아웃
    doLogout () {
      // 로그아웃 하시겠습니까?
      this.$q.dialog({
        title: '로그아웃',
        message: '로그아웃 하시겠습니까?',
        ok: '예',
        cancel: '아니오'
      }).then(() => {
        // 로그아웃
        this.$cookie.set('autoLoginRun', '', 0, 0) // 자동로그인 해제
        this.$cookie.set('auth_key', '', 0, 0) // 인증키 해제
        this.$axios.post(this.$store.state.apiServerIp + '/api/login/doLogout')
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            if (result.data !== 1) {
              this.$q.notify({
                color: 'grey',
                position: 'left',
                message: '로그아웃 실패',
                icon: 'notifications_active'
              })
            }
            this.$store.state.userVo = ''
            this.$store.state.searchProductList = [] // 검색결과 상품
            this.$store.state.searchMemberList = [] // 검색결과 인물
            this.$store.state.addressList = [] // 주소록
            this.$cookie.set('autoLoginRun', '', 14)

            this.$q.notify({
              color: 'grey',
              position: 'top',
              message: '로그아웃 되었습니다.',
              icon: 'notifications_active'
            })
            /*
            history.pushState(null, null, location.href);
            window.onpopstate = function(event) {
                history.go(1);
            };
            */
            this.$router.push('/')
          })
          .catch((err) => {
            alert(err)
            console.log(err)
          })
      }).catch(() => {
        // this.$q.notify(`You didn't agree`)
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
      /*
      window.open('', 'KB_AUTHMARK', 'height=604, width=648, status=yes, toolbar=no, menubar=no, location=no')
      document.KB_AUTHMARK_FORM.action = 'http://escrow1.kbstar.com/quics'
      document.KB_AUTHMARK_FORM.target = 'KB_AUTHMARK'
      document.KB_AUTHMARK_FORM.submit()
      */
      this.$refs.redirectModal.title = '에스크로'
      this.$refs.redirectModal.url = 'http://escrow1.kbstar.com/quics?page=B009111&cc=b010807:b008491&mHValue=ad1485447ff247d7f537f7db37de7148201905261237657'
      this.$refs.redirectModal.icon = 'play_arrow'
      this.$refs.redirectModal.show()
    },
    showMetashopse () {
      window.open('https://metashopse.com/meta/index.html', '_system')
    },
    // 명언 보기
    showWiseSaying () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/etc/selectWiseSaying')
        .then((result) => {
          this.$q.dialog({
            title: result.data.by_who,
            message: result.data.contents,
            ok: '그입닫기',
            // preventClose: true,
            color: 'black'
          })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.round-main {
  border-radius: 50%;
  overflow: hidden;
  width: 30px;
  height: 30px;
}
.round-main img {
  display: block;
  min-width: 100%;
  min-height: 100%;
}
</style>
