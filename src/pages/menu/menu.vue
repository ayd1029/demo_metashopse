<template>
  <q-page class="">

    <loginModal ref="loginModal" />
    <personalInfoPolicyModal ref="personalInfoPolicyModal" />
    <termOfServiceModal ref="termOfServiceModal" />
    <redirectModal ref="redirectModal" />
    <wiseSayingRegisterModal ref="wiseSayingRegisterModal" />

    <q-layout-header>
      <q-toolbar color="black" inverted style="text-align:center;">
        <!-- <img src="statics/icons/logo.png" style="width: 30px; height: 30px;"> -->
        <q-btn v-if="$store.state.device !== 'P'" flat round dense icon="accessibility_new" @click="showWiseSaying" />
        <!-- <img src="statics/icons/logo.png" style="width: 30px; height: 30px;"> -->
        <q-toolbar-title><img src="statics/images/logo/widelogo.png" style="width: 150px;"></q-toolbar-title>
        <q-btn v-if="$store.state.device !== 'P'" flat round dense icon="search" @click="goSearch" />
        <!-- <q-btn flat round dense icon="search" @click="goSearch" /> -->
      </q-toolbar>
    </q-layout-header>

    <div style="width: 100%;">

      <!-- 관리자 메뉴 -->
      <table v-if="$store.state.userVo != null && $store.state.userVo.uid === 'ayd1029'" style="width: 100%" border="0" align="center">
        <thead>
          <th width="33%"></th>
          <th width="33%"></th>
          <th width="33%"></th>
        </thead>
        <tr>
          <td colspan="3" align="center">
            <q-chip style="width:90%; height:20px; text-align:left; margin-top:10px;" color="primary" tag dense pointing="down">
              &nbsp;관리자 메뉴
            </q-chip>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item @click.native="doPreAction('/admin/hotdealList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="important_devices" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">핫딜관리</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/admin/ordersList')">
              <table width="100%" align="center">
                <!-- <q-icon name="monetization_on" color="black" size="2em" /> -->
                <tr><td align="center"><q-icon name="list" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">주문현황</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/admin/rewardWithdraw')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="record_voice_over" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">문의사항</font></td></tr>
              </table>
            </q-item>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item @click.native="doPreAction('/admin/myproductList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="call_split" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">정산출금</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/admin/rewardList')">
              <table width="100%" align="center">
                <!-- <q-icon name="monetization_on" color="black" size="2em" /> -->
                <tr><td align="center"><q-icon name="cancel_presentation" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">취소출금</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/admin/rewardWithdraw')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="save_alt" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">원더출금</font></td></tr>
              </table>
            </q-item>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item @click.native="doPreAction('/admin/myproductList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="done_all" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">구매확정</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/admin/createProductsFile')">
              <table width="100%" align="center">
                <!-- <q-icon name="monetization_on" color="black" size="2em" /> -->
                <tr><td align="center"><q-icon name="cloud_upload" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">products.txt</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/admin/createSitemapFile')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="local_library" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">sitemap.xml</font></td></tr>
              </table>
            </q-item>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item @click.native="doPreAction('/admin/createUser')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="android" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">유저등록</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
          </td>
          <td align="center">
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <q-card-separator />
            <q-card-separator />
            <q-card-separator />
            <q-card-separator />
            <q-card-separator />
          </td>
        </tr>
      </table>

      <!-- 최신메뉴 -->
      <table style="width: 100%;" border="0" align="center">
        <thead>
          <th width="33%"></th>
          <th width="33%"></th>
          <th width="33%"></th>
        </thead>
        <tr>
          <td colspan="3" align="center">
            <q-chip style="width:90%; height:20px; text-align:left; margin-top:10px;" color="primary" tag dense pointing="down">
              &nbsp;{{ $store.state.userVo.name }}님 환영합니다.
            </q-chip>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/newContentsList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-btn push round color="black" icon="play_circle_filled" /></td></tr>
                <tr><td align="center"><font size="2" color="black">동영상</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/event')">
              <table width="100%" align="center">
                <tr><td align="center"><q-btn push round color="black" icon="cake" /></td></tr>
                <tr><td align="center"><font size="2" color="black">이벤트</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/youtuberList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-btn plat push round color="black" icon="play_arrow" /></td></tr>
                <tr><td align="center"><font size="2" color="black">유튜버스</font></td></tr>
              </table>
            </q-item>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/newProductList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-btn push round color="black" icon="widgets" /></td></tr>
                <tr><td align="center"><font size="2" color="black">상품</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/hotdeal')">
              <table width="100%" align="center">
                <tr><td align="center"><q-btn push round color="black" icon="grade" /></td></tr>
                <tr><td align="center"><font size="2" color="black">🔥핫딜🔥</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item v-if="$store.state.USE_CIRCLE" @click.native="doPreAction('/menu/newCircleList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-btn push round color="black" icon="group" /></td></tr>
                <tr><td align="center"><font size="2" color="black">모임</font></td></tr>
                <!--
                <tr><td align="center"><q-icon name="group" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">모임</font></td></tr>
                -->
              </table>
            </q-item>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/introduce')">
              <table width="100%" align="center">
                <tr><td align="center"><q-btn push round color="black" icon="contact_support" /></td></tr>
                <tr><td align="center"><font size="2" color="black">원더학개론</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/rewardRankList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-btn push round color="black" icon="monetization_on" /></td></tr>
                <tr><td align="center"><font size="2" color="black">원더랭킹</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/dividendRankList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-btn push round color="black" icon="favorite" /></td></tr>
                <tr><td align="center"><font size="2" color="black">원더배당</font></td></tr>
              </table>
            </q-item>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item @click.native="setDisplayMenu('BUY')">
              <table width="100%" align="center">
                <tr><td align="center"><q-btn push round color="black" icon="shopping_cart" /></td></tr>
                <tr><td align="center"><font size="2" color="black">구매메뉴</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="setDisplayMenu('AD')">
              <table width="100%" align="center">
                <tr><td align="center"><q-btn push round color="black" icon="share" /></td></tr>
                <tr><td align="center"><font size="2" color="black">광고메뉴</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="setDisplayMenu('ETC')">
              <table width="100%" align="center">
                <tr><td align="center"><q-btn push round color="black" icon="settings" /></td></tr>
                <tr><td align="center"><font size="2" color="black">기타</font></td></tr>
              </table>
            </q-item>
          </td>
        </tr>
      </table>

<!--
          <td align="center">
            <q-item @click.native="doPreAction('/menu/creatorList')">
                <table width="100%" align="center">
                <tr><td align="center"><q-btn round color="primary" icon="monetization_on" /></td></tr>
                <tr><td align="center"><font size="2" color="black">인기순위</font></td></tr>
              </table>
            </q-item>
          </td>
-->

<!--
      <table style="width: 100%" border="0">
          <td width="50%"><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="ibighit" /></q-item></td>
          <td width="50%"><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="BLACKPINK" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="SMTOWN" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="BANGTANTV" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="1theK" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="1MILLION Dance Studio" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="officialpsy" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="jypentertainment" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="JFlaMusic" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="BIGBANG" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="Mnet K-POP" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="MBCkpop" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="Stone Music" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="Mnet Official" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="Sungha Jung" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="YG" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="TWICE" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="2NE1" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="ALL THE K-POP" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="sentiment_satisfied_alt" /><q-item-main label="M2" /></q-item></td>
          <td colspan="2"><q-card-separator /></td>
      </table>
-->
      <!-- 구매메뉴 -->
      <table v-if="$store.state.displayMenuBuy" style="width: 100%" border="0" align="center">
        <thead>
          <th width="33%"></th>
          <th width="33%"></th>
          <th width="33%"></th>
        </thead>
        <tr>
          <td colspan="3" align="center">
            <q-chip style="width:90%; height:20px; text-align:left; margin-top:10px;" color="primary" tag dense pointing="down">
              &nbsp;구매
            </q-chip>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/favoriteProductList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="favorite_border" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">찜한상품</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/cartProductList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="shopping_cart" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">장바구니</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/ordersList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="local_shipping" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">주문/배송</font></td></tr>
              </table>
            </q-item>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/returnedOrdersList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="loop" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">취소/반품</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/myQnaList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="help" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">문의사항</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/myReviewList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="create" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">구매후기</font></td></tr>
              </table>
            </q-item>
          </td>
        </tr>
      </table>

      <!-- 광고메뉴 -->
      <table v-if="$store.state.displayMenuAd" style="width: 100%" border="0" align="center">
        <thead>
          <th width="33%"></th>
          <th width="33%"></th>
          <th width="33%"></th>
        </thead>
        <tr>
          <td colspan="3" align="center">
            <q-chip style="width:90%; height:20px; text-align:left; margin-top:10px;" color="primary" tag dense pointing="down">
              &nbsp;광고
            </q-chip>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/myproductList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="widgets" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">광고상품</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/rewardList')">
              <table width="100%" align="center">
                <!-- <q-icon name="monetization_on" color="black" size="2em" /> -->
                <tr><td align="center"><img src="statics/images/logo/logocoin.png" style="width: 27px"></td></tr>
                <tr><td align="center"><font size="2" color="black">원더내역</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/rewardWithdraw')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="save_alt" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">출금</font></td></tr>
              </table>
            </q-item>
          </td>
        </tr>
      </table>

      <!-- 기타 -->
      <table v-if="$store.state.displayMenuEtc" style="width: 100%" border="0" align="center">
        <thead>
          <th width="33%"></th>
          <th width="33%"></th>
          <th width="33%"></th>
        </thead>
        <tr>
          <td colspan="3" align="center">
            <q-chip style="width:90%; height:20px; text-align:left; margin-top:10px;" color="primary" tag dense pointing="down">
              &nbsp;기타
            </q-chip>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/notice')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="info" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">공지사항</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/siteQnaRegister')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="record_voice_over" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">고객센터</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/tutorial')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="assignment_turned_in" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">첫방문?</font></td></tr>
              </table>
            </q-item>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/myinfo')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="account_circle" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">나의정보</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="registerWiseSaying">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="nature_people" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">랜덤메세지</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/creatorList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="thumb_up" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">인기순위</font></td></tr>
              </table>
            </q-item>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item v-if="$store.state.USE_CIRCLE" @click.native="doPreAction('/menu/newCircleList')">
              <table width="100%" align="center">
                <!--
                <tr><td align="center"><q-btn push round color="black" icon="group" /></td></tr>
                <tr><td align="center"><font size="2" color="black">모임</font></td></tr>
                -->
                <tr><td align="center"><q-icon name="group" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">모임</font></td></tr>
              </table>
            </q-item>
          </td>
          <td v-if="$store.state.userVo != '' && $store.state.userVo.uid !== ''" align="center">
            <q-item @click.native="doLogout">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="pause_circle_outline" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">로그아웃</font></td></tr>
              </table>
            </q-item>
          </td>
          <td v-else align="center">
            <q-item @click.native="showLogin">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="play_circle_outline" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">로그인</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
          </td>
        </tr>
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
      </table>

      <!-- 판매자 메뉴로 -->
      <table style="width: 100%" border="0" align="center">
        <thead>
          <th width="33%"></th>
          <th width="33%"></th>
          <th width="33%"></th>
        </thead>
        <tr>
          <td align="center">
          </td>
          <td align="center">
            <q-item to="/seller/menu">
              <table width="100%" align="center">
                <tr><td align="center"><q-btn push round color="info" icon="local_shipping" /></td></tr>
                <tr><td align="center"><font size="2" color="black">판매자 메뉴</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
          </td>
        </tr>
      </table>

      <!-- 판매메뉴 -->
      <!--
      <table v-if="$store.state.displayMenuSell" style="width: 100%" border="0" align="center">
        <thead>
          <th width="33%"></th>
          <th width="33%"></th>
          <th width="33%"></th>
        </thead>
        <tr>
          <td colspan="3" align="center">
            <q-chip style="width:90%; height:20px; text-align:left; margin-top:10px;" color="primary" tag dense pointing="down">
              &nbsp;판매
            </q-chip>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/sellerProductList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="ballot" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">상품관리</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/sellerOrdersList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="local_shipping" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">주문/배송</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/sellerReturnedOrdersList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="loop" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">취소/반품</font></td></tr>
              </table>
            </q-item>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item @click.native="doPreAction('/seller/menu/sellerInfo')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="account_box" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">판매자정보</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/sellerCalculateList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="settle" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">정산내역</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/sellerQnaList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="help" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">상품문의</font></td></tr>
              </table>
            </q-item>
          </td>
        </tr>
        <tr>
          <td align="center">
            <q-item @click.native="doPreAction('/menu/hotdealList')">
              <table width="100%" align="center">
                <tr><td align="center"><q-icon name="grade" color="black" size="2em" /></td></tr>
                <tr><td align="center"><font size="2" color="black">핫딜관리</font></td></tr>
              </table>
            </q-item>
          </td>
          <td align="center">
          </td>
          <td align="center">
          </td>
        </tr>
      </table>
      -->

<!--
      <div class="row justify-left">
        &nbsp;<q-chip style="width:120px; text-align:center; margin-top:10px;" color="purple" square icon="category" pointing="down">카테고리</q-chip>
      </div>
      <table style="width: 100%" border="0">
          <td width="50%"><q-item @click.native="doPreAction('/main')"><q-item-side icon="language" /><q-item-main label="패션의류/잡화" /></q-item></td>
          <td width="50%"><q-item @click.native="doPreAction('/main')"><q-item-side icon="motorcycle" /><q-item-main label="뷰티" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="child_friendly" /><q-item-main label="출산/유아동" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="print" /><q-item-main label="식품" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="settings_cell" /><q-item-main label="주방용품" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="stars" /><q-item-main label="생활용품" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="work_outline" /><q-item-main label="홈인테리어" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="desktop_windows" /><q-item-main label="가전디지털" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="mouse" /><q-item-main label="스포츠/레저" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="speaker" /><q-item-main label="자동차용품" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="audiotrack" /><q-item-main label="도서/음반/DVD" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="color_lens" /><q-item-main label="완구/취미" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="headset" /><q-item-main label="문구/오피스" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="pets" /><q-item-main label="반려동물용품" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="work_outline" /><q-item-main label="유기농/친환경" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="music_video" /><q-item-main label="헬스/건강식품" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="flight_takeoff" /><q-item-main label="여행" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="vpn_key" /><q-item-main label="기프트카드" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="star" /><q-item-main label="초특가야사자" /></q-item></td>
          <td><q-item @click.native="doPreAction('/main')"><q-item-side icon="airline_seat_recline_extra" /><q-item-main label="사장님이미쳤" /></q-item></td>
      </table>
-->

      <!-- 인기순위 리스트 -->
<!--
      <div v-if="displayCreatorRankingList">
        <table style="width: 100%" border="0">
          <thead>
            <th width="33%"></th>
            <th width="33%"></th>
            <th width="33%"></th>
          </thead>
          <tr>
            <td colspan="3" align="center">
              <q-chip style="width:90%; height:20px; text-align:left; margin-top:0px;" color="primary" tag dense pointing="down">
                &nbsp;인기순위
              </q-chip>
            </td>
          </tr>
        </table>

        <div style="padding:0px 0px 10px 0px" v-for="item in $store.state.creatorRankingList" :key="item.seq">
          <a @click="showUserHome(item.uid)">
            <table border="0" style="width: 78%" align="center">
              <tr>
                <td rowspan="2" width="40" align="left"><div class="round-creator-top-list"><img :src="item.profile_image" style="width: 35px"></div></td>
                <td rowspan="2" width="5">&nbsp;</td>
                <td colspan="1" width="55%"><font size="2" color="black">{{ item.name }}</font></td>
                <td colspan="1" align="right"><font size="2" color="black"></font>&nbsp;<font size="2" color="red">{{ item.rownum }}</font><font size="2" color="black"> 위</font></td>
              </tr>
              <tr>
                <td colspan="2"><font size="1" color="grey">{{ item.introduce }}&nbsp;</font></td>
              </tr>
            </table>
          </a>
        </div>
        <table style="width: 90%" border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td colspan="2" align="right"><q-btn dense color="red" rounded @click="doPreAction('/menu/creatorList')" outline size="md">&nbsp;&nbsp;인기순위 더보기&nbsp;&nbsp;</q-btn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          </tr>
        </table>
      </div>
-->

      <!-- 로고 -->
      <!--
      <table width="100%" align="center">
        <tr>
          <td align="center" colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" colspan="3">
            <img v-if="$store.state.playerIsPlaying" src="statics/images/logo/logolp.gif" style="width:160px;">
            <img v-else src="statics/images/logo/logolp2.png" style="width:160px;">
          </td>
        </tr>
      </table>
      <br>
      <br>
      <br>
      <br>
      -->
      <!-- <q-card-separator /> -->

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
                <a @click="goTerms"><b>약관 및 정책</b></a>
              </font>
            </td>
          </tr>
          <tr>
            <td colspan="5" align="left">
              <font size="1" color="grey">
                (주)클레이스타는 통신판매중개자로서 오픈마켓 metashopse.com의 거래당사자가 아니며, 판매자가 등록한 상품정보 및 거래에 대해 일체 책임을 지지 않습니다.
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

    </div>

<!--
    <q-page-sticky expand position="bottom" style="background:white; height:66px;">
      플레이어 알림창
      <table border="0" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td width="20"></td>
          <td>
            <a @click="doPreAction('/menu/tutorial')">
              <q-btn color="primary" icon="assignment_turned_in" round /><font size="2" color="red"><b>&nbsp;&nbsp;← &nbsp;무작정 따라하기</b></font>
            </a>
          </td>
          <td align="right"><font size="2" color="black"><b>DJ →</b></font></td>
          <td width="75"></td>
        </tr>
      </table>
    </q-page-sticky>
-->
  </q-page>
</template>

<style>
.layout-header {
  box-shadow: none;
}
.round-creator-top-list {
  border-radius: 50%;
  overflow: hidden;
  width: 35px;
  height: 35px;
}
.round-creator-top-list img {
  display: block;
  min-width: 100%;
  min-height: 100%;
}
</style>

<script>
import Vue from 'vue'

export default {
  // name: 'mystore',
  data () {
    return {
      // displayCreatorRankingList: false // 인기순위 표시여부
      // creatorRankingList: [] // 인기순위 리스트
    }
  },
  created: function () {
    // 사용자 역할 타입 설정 S:SELLER(판매자) B:BUYER(구매자)
    this.$store.state.USER_ROLL_TYPE = 'B'

    /*
    this.$loadScript('statics/js/callback.js')
      .then(() => {
        // Script is loaded, do something
        window.vm = this // callback.js 의 vm 변수에 this 를 설정, 결제 완료 후 콜백에서 사용
      })
      .catch(() => {
        // Failed to fetch script
      })
    */
    /*
    this.$loadScript('https://www.gstatic.com/firebasejs/6.0.2/firebase-app.js')
      .then(() => {
        // Script is loaded, do something
        console.log('firebase-app.js loaded.')
        window.firebase.initializeApp(this.$store.state.firebaseConfig)
      })
      .catch(() => {
        // Failed to fetch script
      })
    */
    // alert('token start1')
    /*
    try {
      alert(this.$FCMPlugin)
      this.FCMPlugin.getToken(
        function (token) {
          // console.log('token :' + token)
          alert('token : ' + token)
        },
        function (err) {
          alert('error : ' + err)
          // console.log('error retrieving token: ' + err)
        }
      )
    } catch (e) {
      // alert(e)
    }
    */
    // alert('token end')

    // 미확인 메세지 건수 조회
    this.selectMessageCount()

    // APP에서 이동한 경우 파라미터에 uid, auth_key가 붙어서 옴 -> 로그인 처리
    if (this.$route.query.uid != null && this.$route.query.auth_key != null &&
        (this.$store.state.device === 'android' || this.$store.state.device === 'ios')) { // APP
      this.loginFromApp(this.$route.query.uid, this.$route.query.auth_key)
    }

    // 인기순위 리스트 조회
    /*
    if (this.$store.state.creatorRankingList == null || this.$store.state.creatorRankingList === '') {
      this.$axios.get(this.$store.state.apiServerIp + '/api/creator/selectCreatorTopRankingList')
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$store.state.creatorRankingList = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
    */

    /*
    // 네이버 쇼핑 검색 테스트
    let headers = {
      'X-Naver-Client-Id': 'JtKmw0zwOZQ9C9q9uBcB',
      'X-Naver-Client-Secret': 'D5j12ffoa_'
    }
    this.$axios.get('https://openapi.naver.com/v1/search/shop.xml?query=%EC%A3%BC%EC%8B%9D&display=10&start=1&sort=sim', {
      headers: headers
    })
      .then((result) => {
        console.log(JSON.stringify(result.data))
      })
      .catch((err) => {
        console.log(err)
      })
    */
  },
  mounted: function () {
    // TODO: 테스트중
    // this.$refs.loginModal.show()
  },
  methods: {
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
    // 미확인 메세지 건수 조회
    selectMessageCount () {
      // 미확인 메세지 건수 조회
      if (this.$store.state.userVo != null && this.$store.state.userVo.uid != null && this.$store.state.userVo.uid !== '') {
        // alert(this.$store.state.userVo.uid)
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
    // 메뉴표시 제어
    setDisplayMenu (code) {
      // 표시되는 메뉴 이외의 것은 비표시
      if (code === 'BUY') {
        if (this.$store.state.displayMenuBuy) {
          this.$store.state.displayMenuBuy = false
        } else {
          this.$store.state.displayMenuBuy = true
        }
        this.$store.state.displayMenuAd = false
        this.$store.state.displayMenuSell = false
        this.$store.state.displayMenuEtc = false
      } else if (code === 'AD') {
        if (this.$store.state.displayMenuAd) {
          this.$store.state.displayMenuAd = false
        } else {
          this.$store.state.displayMenuAd = true
        }
        this.$store.state.displayMenuBuy = false
        this.$store.state.displayMenuSell = false
        this.$store.state.displayMenuEtc = false
      } else if (code === 'SELL') {
        if (this.$store.state.displayMenuSell) {
          this.$store.state.displayMenuSell = false
        } else {
          this.$store.state.displayMenuSell = true
        }
        this.$store.state.displayMenuBuy = false
        this.$store.state.displayMenuAd = false
        this.$store.state.displayMenuEtc = false
      } else if (code === 'ETC') {
        if (this.$store.state.displayMenuEtc) {
          this.$store.state.displayMenuEtc = false
        } else {
          this.$store.state.displayMenuEtc = true
        }
        this.$store.state.displayMenuBuy = false
        this.$store.state.displayMenuAd = false
        this.$store.state.displayMenuSell = false
      }
    },
    doPreAction (path) { // 화면 이동 전처리
      // 로그인이 필요한 메뉴
      // alert(path)
      if (path === '/menu/favoriteProductList' || // 찜한상품
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
          this.$refs.loginModal.show()
        } else {
          this.$router.push(path)
        }
      } else {
        this.$router.push(path)
      }
    },
    // 검색
    goSearch () {
      this.$router.push('/search')
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
        this.$cookie.set('LOGIN_REDIRECT_URL', '', 0, 0) // 리다이렉트 URL 삭제
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
            // this.$store.state.searchProductList = [] // 검색결과 상품
            // this.$store.state.searchMemberList = [] // 검색결과 인물
            this.$store.state.addressList = [] // 주소록
            // this.$cookie.set('autoLoginRun', '', 14)

            this.$q.notify({
              color: 'grey',
              position: 'top',
              message: '로그아웃 되었습니다.',
              icon: 'notifications_active'
            })

            // 제일 첫 페이지로 이동
            if (this.$store.state.device === 'P' || this.$store.state.device === 'M') {
              this.$router.push('/')
            } else {
              history.go(-history.length + 1)
            }
          })
          .catch((err) => {
            alert(err)
            console.log(err)
          })
      }).catch(() => {
        // this.$q.notify(`You didn't agree`)
      })
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
    // 약관 및 정책
    goTerms () {
      this.$router.push('/terms')
    },
    // 유저홈 팝업
    showUserHome (uid) {
      Vue.prototype.$showUserHome(uid)
    },
    // 명언 보기
    showWiseSaying () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/etc/selectWiseSaying')
        .then((result) => {
          this.$q.dialog({
            title: result.data.by_who,
            message: result.data.contents,
            ok: '그입닫기',
            preventClose: true,
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
