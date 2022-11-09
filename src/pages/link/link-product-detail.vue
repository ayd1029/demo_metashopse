<template>
  <q-page class="flex justify-center">

    <loginModal ref="loginModal" @callback-login="callbackLogin" />
    <shareModal ref="shareModal" />
    <buyOptionModal ref="buyOptionModal" @callback-buy-option="callbackBuyOption" />

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn v-if="checkLogin()" flat round dense icon="fast_rewind" @click="goHome" />
        <q-btn v-else flat round dense icon="home" @click="goHome" />
        <!-- <img v-else @click="goHome" src="statics/icons/logo.png" style="width: 30px; height: 30px;"> -->
        &nbsp;&nbsp;&nbsp;
        <img @click="goHome" src="statics/images/logo/widelogo.png" style="width: 100px;">
        <!-- <q-btn flat round dense icon="home" /> -->
        <q-toolbar-title></q-toolbar-title>
        <q-btn flat round dense icon="search" @click="goSearch" />
        <!-- <q-btn flat round dense icon="close" @click="close" /> -->
      </q-toolbar>
    </q-layout-header>

    <div :style="`width: ${widthRate}%`">
      <img v-if="$store.state.device === 'P'" :src="productVo.image_url" width="100%" style="display: block" />
      <!-- <q-parallax v-else :src="productVo.image_url" :height="widthOneOne" /> -->
      <img v-else :src="productVo.image_url" width="100%" style="display: block" />
      <!-- <q-parallax :src="productVo.image_url" :height="widthOneOne" /> -->

      <q-list link>
        <table width="100%" border="0">
          <tr>
            <td colspan="2">
              <font size="2" color="grey">&nbsp;&nbsp;{{ productVo.subtitle }}</font>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <font size="4" color="black">&nbsp;{{ productVo.title }}</font>
            </td>
          </tr>
          <tr>
            <td colspan="2" align="right">
              <div v-if="productVo.avg_rating == null"><font size="3" color="orange">☆☆☆☆☆</font><font size="2" color="grey"> ({{ productVo.cnt_review }})&nbsp;&nbsp;&nbsp;&nbsp;</font></div>
              <div v-if="productVo.avg_rating === '1'"><a @click="goProductReview($route.query.seq)"><font size="3" color="orange">★</font><font size="3" color="grey">☆☆☆☆</font><font size="2" color="grey"> ({{ productVo.cnt_review }})&nbsp;&nbsp;&nbsp;&nbsp;</font></a></div>
              <div v-if="productVo.avg_rating === '2'"><a @click="goProductReview($route.query.seq)"><font size="3" color="orange">★★</font><font size="3" color="grey">☆☆☆</font><font size="2" color="grey"> ({{ productVo.cnt_review }})&nbsp;&nbsp;&nbsp;&nbsp;</font></a></div>
              <div v-if="productVo.avg_rating === '3'"><a @click="goProductReview($route.query.seq)"><font size="3" color="orange">★★★</font><font size="3" color="grey">☆☆</font><font size="2" color="grey"> ({{ productVo.cnt_review }})&nbsp;&nbsp;&nbsp;&nbsp;</font></a></div>
              <div v-if="productVo.avg_rating === '4'"><a @click="goProductReview($route.query.seq)"><font size="3" color="orange">★★★★</font><font size="3" color="grey">☆</font><font size="2" color="grey"> ({{ productVo.cnt_review }})&nbsp;&nbsp;&nbsp;&nbsp;</font></a></div>
              <div v-if="productVo.avg_rating === '5'"><a @click="goProductReview($route.query.seq)"><font size="3" color="orange">★★★★★</font><font size="2" color="blue"> ({{ addComma(productVo.cnt_review) }})&nbsp;&nbsp;&nbsp;&nbsp;</font></a></div>
            </td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td>&nbsp;판매가격</td>
            <td align="right">{{ addComma(productVo.price) }}&nbsp;원&nbsp;&nbsp;&nbsp;</td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td>&nbsp;원더</td>
            <td align="right">{{ addComma(productVo.reward_coin) }}&nbsp;&nbsp;<img src="statics/images/logo/logocoin.png" style="width: 12px">&nbsp;&nbsp;&nbsp;</td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td>&nbsp;판매자</td>
            <td align="right">{{productVo.seller_name}}&nbsp;&nbsp;&nbsp;</td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td align="center" width="50%"><q-btn color="primary" icon="share" label="공유하기" @click="copyUrlAuto('PRODUCT', productVo.seq)" style="width: 100%" /></td>
            <td align="center"><q-btn color="primary" icon="add_to_queue" label="내 홈에 등록" @click="addProductToMystore" style="width: 100%" /></td>
          </tr>
        </table>
      </q-list>

      <!-- 상세정보 -->
      <div id="productDetail">
        <div v-for="item in productVo.imageList" :key="item.seq">
          <img :src="item.url_path" style="width: 100%;"><br>
        </div>
        <br>
        <div v-html="productVo.content" />
      </div>
      <br>

      <!-- 상품정보 제공공시 -->
      <table width="95%" border="0" align="center">
        <tr>
          <td colspan="2">
            <font size="2" color="grey">&nbsp;상품정보 제공공시</font>
          </td>
        </tr>
        <tr>
          <td colspan="2"><q-card-separator /></td>
        </tr>
        <tr>
          <td width="50%">&nbsp;<font size="2" color="grey">종류</font></td>
          <td width="50%" align="right"><font size="2" color="grey">상품상세 참조</font>&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2"><q-card-separator /></td>
        </tr>
        <tr>
          <td>&nbsp;<font size="2" color="grey">소재</font></td>
          <td align="right"><font size="2" color="grey">상품상세 참조</font>&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2"><q-card-separator /></td>
        </tr>
        <tr>
          <td>&nbsp;<font size="2" color="grey">제조자</font></td>
          <td align="right"><font size="2" color="grey">상품상세 참조</font>&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2"><q-card-separator /></td>
        </tr>
        <tr>
          <td>&nbsp;<font size="2" color="grey">제조국</font></td>
          <td align="right"><font size="2" color="grey">상품상세 참조</font>&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2"><q-card-separator /></td>
        </tr>
        <tr>
          <td>&nbsp;<font size="2" color="grey">치수</font></td>
          <td align="right"><font size="2" color="grey">상품상세 참조</font>&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2"><q-card-separator /></td>
        </tr>
        <tr>
          <td>&nbsp;<font size="2" color="grey">취급시 주의사항</font></td>
          <td align="right"><font size="2" color="grey">상품상세 참조</font>&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2"><q-card-separator /></td>
        </tr>
        <tr>
          <td>&nbsp;<font size="2" color="grey">품질보증기준</font></td>
          <td align="right"><font size="2" color="grey">상품상세 참조</font>&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2"><q-card-separator /></td>
        </tr>
        <tr>
          <td>&nbsp;<font size="2" color="grey">A/S 책임자와 전화번호</font></td>
          <td align="right">
            <font size="2" color="grey">{{productVo.seller_name}}&nbsp;</font>
            <font size="2" color="grey" v-if="productVo.business_tel_no != null">{{productVo.business_tel_no}}&nbsp;</font>
            <font size="2" color="grey" v-else>{{productVo.tel_no}}&nbsp;</font>
          </td>
        </tr>
        <tr>
          <td colspan="2"><q-card-separator /></td>
        </tr>
      </table>
      <br>

      <!-- 거래조건에 관한 정보 -->
      <q-collapsible>
        <!-- 제목 -->
        <template slot="header">
          <q-chip color="grey-6" small square class="q-mr-sm" style="width:150px; text-align:center;"><font size="2">거래조건에 관한 정보</font></q-chip>
          <q-item-main label="" />
          <q-item-side right>
            <font size="2">보기</font>
          </q-item-side>
        </template>
        <table width="100%" border="0" cellpadding="1" cellspacing="0">
          <tr>
            <td width="44%"><font size="1" color="grey">재화등의 배송방법에 관한 정보</font></td>
            <td width="56%" align="left"><font size="1" color="grey">택배</font></td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td width="44%"><font size="1" color="grey">주문이후 예상되는 배송기간</font></td>
            <td width="56%" align="left"><font size="1" color="grey">대금 지급일로부터 3일 이내에 발송</font></td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td><font size="1" color="grey">제품하자·오배송 등에 따른 청약철회 등의 경우 청약철회 등을 할 수 있는 기간 및 통신판매업자가 부담하는 반품비용 등에 관한 정보</font></td>
            <td align="left"><font size="1" color="grey">전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.</font></td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td><font size="1" color="grey">제품하자가 아닌 소비자의 단순변심, 착오구매에 따른 청약철회 시 소비자가 부담하는 반품비용 등에 관한 정보</font></td>
            <td align="left">
              <font size="1" color="grey">
                6,000원 (왕복)
                <br>- 단, 고객 변심의 경우에만 발생
                <br>- 도서산간 및 일부 지역 추가비용 발생
              </font>
            </td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td><font size="1" color="grey">제품하자가 아닌 소비자의 단순변심, 착오구매에 따른 청약철회등이 불가능한 경우 그 구체적 사유와 근거</font></td>
            <td align="left"><font size="1" color="grey">전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.</font></td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td><font size="1" color="grey">재화등의 교환·반품·보증 조건 및 품질보증기준</font></td>
            <td align="left"><font size="1" color="grey">소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.</font></td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td><font size="1" color="grey">재화등의 A/S 관련 전화번호</font></td>
            <td align="left">
              <font size="1" color="grey" v-if="productVo.business_tel_no != null">{{productVo.business_tel_no}}</font>
              <font size="1" color="grey" v-else>{{productVo.tel_no}}</font>
            </td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td><font size="1" color="grey">대금을 환불받기 위한 방법과 환불이 지연될 경우 지연에 따른 배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적 조건 및 절차</font></td>
            <td align="left"><font size="1" color="grey">주문취소 및 대금의 환불은 주문/배송 페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 20%의 지연배상금을 판매자에게 청구할 수 있습니다.</font></td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td><font size="1" color="grey">소비자피해보상의 처리, 재화등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁처리에 관한 사항</font></td>
            <td align="left"><font size="1" color="grey">소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.</font></td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td><font size="1" color="grey">거래에 관한 약관의 내용 또는 확인할 수 있는 방법</font></td>
            <td align="left"><font size="1" color="grey">상품상세 페이지 및 이용약관 링크를 통해 확인할 수 있습니다.</font></td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
        </table>
      </q-collapsible>

      <!-- 판매자 정보 -->
      <q-collapsible>
        <!-- 제목 -->
        <template slot="header">
          <q-chip color="grey-6" small square class="q-mr-sm" style="width:150px; text-align:center;"><font size="2">판매자 정보</font></q-chip>
          <q-item-main label="" />
          <q-item-side right>
            <font size="2">보기</font>
          </q-item-side>
        </template>
        <!-- 내용 -->
        <!-- 판매자 정보(개인) -->
        <table v-if="productVo.business_no == null || productVo.business_no === ''" width="100%" border="0">
          <tr>
            <td width="115">&nbsp;<font size="2" color="grey">판매자명</font></td>
            <td align="left"><font size="2" color="grey">{{productVo.seller_name}}</font>&nbsp;</td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td>&nbsp;<font size="2" color="grey">연락처</font></td>
            <td align="left"><font size="2" color="grey">{{productVo.tel_no}}</font>&nbsp;</td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td>&nbsp;<font size="2" color="grey">이메일</font></td>
            <td align="left"><font size="2" color="grey">{{productVo.email}}</font>&nbsp;</td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
        </table>

        <!-- 판매자 정보(사업자) -->
        <table v-else width="100%" border="0">
          <tr>
            <td width="115">&nbsp;<font size="2" color="grey">상호 / 대표자</font></td>
            <td align="left"><font size="2" color="grey">{{productVo.business_nm}} / {{productVo.business_ceo_nm}}</font></td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td>&nbsp;<font size="2" color="grey">고객센터</font></td>
            <td align="left"><font size="2" color="grey">{{productVo.business_tel_no}}</font></td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td>&nbsp;<font size="2" color="grey">이메일</font></td>
            <td align="left"><font size="2" color="grey">{{productVo.email}}</font></td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td>&nbsp;<font size="2" color="grey">주소</font></td>
            <td align="left"><font size="2" color="grey">{{productVo.business_address1}}</font></td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td>&nbsp;<font size="2" color="grey">통신판매신고번호</font></td>
            <td align="left"><font size="2" color="grey">{{productVo.business_sell_no}}</font></td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td>&nbsp;<font size="2" color="grey">사업자번호</font></td>
            <td align="left"><font size="2" color="grey">{{productVo.business_no}}</font></td>
          </tr>
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
        </table>
      </q-collapsible>

      <table width="95%" border="0" align="center">
        <tr>
          <td align="left">
            <font size="1" color="grey">
              개별 판매자가 등록한 마켓플레이스(오픈마켓) 상품에 대한 광고, 상품주문, 배송 및 환불의 의무와 책임은 각 판매자에게 있고, 이에 대하여 (주)클레이스타는 통신판매중개자로서 통신판매의 당사자가 아니므로 일체 책임을 지지 않습니다.
            </font>
          </td>
        </tr>
      </table>
      <br>
      <br>

      <q-list separator style="padding: 0 0 0 0">
        <q-item link v-ripple.mat @click.native="goProductQna($route.query.seq)">
          <q-item-side icon="help" />
          <q-item-main>상품문의 (<font color="blue">{{addComma(productVo.cnt_qna)}}</font>)</q-item-main>
          <q-item-side right icon="keyboard_arrow_right" />
        </q-item>
        <q-item link v-ripple.mat @click.native="goProductReview($route.query.seq)">
          <q-item-side icon="create" />
          <q-item-main>구매후기 (<font color="blue">{{addComma(productVo.cnt_review)}}</font>)</q-item-main>
          <q-item-side right icon="keyboard_arrow_right" />
        </q-item>
      </q-list>
      <br>
      <br>
      <br>

    </div>

    <!-- 추천상품 -->
    <table border="0" cellpadding="0" cellspacing="0" style="width: 100%">
      <tr>
        <td align="center">
          <font size="3" color="black">이런 상품은 어떠세요?</font>
        </td>
      </tr>
      <tr>
        <td align="center">
          <font size="2" color="grey">좌우로 밀어보세요</font>
        </td>
      </tr>
      <tr>
        <td align="center">&nbsp;</td>
      </tr>
    </table>
    <swiper :options="swiperOption" style="z-index:1;">
      <swiper-slide v-for="item in this.$store.state.recommendProductList" :key="item.seq" style="height:205px;">
        <a @click="goProductDetail(item.seq)">
          <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
            <tr>
              <td align="center"><img :src="item.image_url" width="100px;" style="border-radius: 3px;" /></td>
            </tr>
            <tr>
              <td align="center"><font size="3" color="black" style="font-weight:bold;">&nbsp;{{ addComma(item.price) }}&nbsp;원</font></td>
            </tr>
            <tr>
              <td align="center" style="word-break:keep-all; word-wrap:break-word;"><font size="2" color="black">&nbsp;{{ item.title }}&nbsp;</font></td>
            </tr>
          </table>
        </a>
      </swiper-slide>
    </swiper>
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
    <br>&nbsp;
    <q-page-sticky expand position="bottom">
      <q-toolbar color="white" >
        <q-btn color="primary" icon="favorite_border" @click="addToFavorite" style="width: 50px" :disable="soldOutFlag" />
        &nbsp;&nbsp;&nbsp;
        <q-btn color="primary" :label="buyButtonLabel" @click="goBuy" style="width: 100%" :disable="soldOutFlag" />
        &nbsp;&nbsp;&nbsp;
      </q-toolbar>
    </q-page-sticky>
  </q-page>
</template>

<style>
</style>

<script>
// import { domain, kakaotalkJsClientId } from '../../global/constants.js'
// import Mystore from '../../components/mystore'
import Vue from 'vue'

export default {
  name: 'new-product-detail',
  components: {
    // Mystore,
    // VueEditor
  },
  data () {
    return {
      soldOutFlag: false, // 품절시 true
      buyButtonLabel: '구매하기', // 품절시 '품절'
      widthRate: 100, // 레이아웃 너비 % - PC화면 대응
      uid: '',
      productVo: {
        seq: '',
        title: '',
        subtitle: '',
        content: '',
        price: '',
        reward_coin: '',
        image_url: '',
        thumbnail_image: '',
        nickname: '',
        reg_id: '',
        reg_time: '',
        rating: 3
      },
      imageList: [], // 상품 이미지 리스트
      myproductVo: {
        seq_product: '',
        uid: ''
      },
      swiperOption: { // 추천상품 표시 옵션
        slidesPerView: 3,
        slidesPerGroup: 3,
        slidesPerColumn: 2,
        // loop: true, // 버그 있는듯. 클릭 인식이 됐다안됐다 함 ㅋ
        // centeredSlides: true,
        spaceBetween: 10
      }
    }
  },
  // 파라미터가 변경되면 감지해서 상품 조회
  watch: {
    '$route.query.seq': function (seqProduct) {
      this.selectProduct(seqProduct)
    }
  },
  created: function () {
    if (this.$store.state.device === 'P') { // PC인 경우
      this.widthRate = 50 // 화면 너비 50%
    }
    this.widthOneOne = window.innerWidth

    this.productVo.seq = this.$route.query.seq

    // ★ 리다이렉트 페이지를 현재 페이지로 설정
    // 로그인 후 또는 결제 실패시 돌아오기 위함
    this.$store.state.redirectTo = '/productDetail?seq=' + this.$route.query.seq

    // 상품정보 조회
    this.selectProduct(this.$route.query.seq)

    // ■ 처음으로 상품 조회시 보상 대상을 테이블에 등록한다.
    // 구매자: 로그인 유저(세션의 로그인 유저 uid)
    // 보상대상자: 파라미터의 uid
    console.log('광고자(this.$route.query.uid): ' + this.$route.query.uid)
    console.log('로그인유저(this.$store.state.userVo.uid): ' + this.$store.state.userVo.uid)
    if (this.$store.state.userVo != null && this.$store.state.userVo.uid != null && // 로그인 체크
      this.$route.query.uid != null && this.$route.query.uid !== '' && // 광고자가 있는 경우
        this.$route.query.uid !== this.$store.state.userVo.uid) { // 광고자가 로그인 유저가 아닌 경우
      // SELECT UID_REWARD_TO
      // FROM REWARD_RELATION
      // WHERE SEQ_PRODUCT = this.productVo.seq
      // AND REG_ID = this.$store.state.userVo.uid
      // 1. 결과 not null : 등록된 광고자가 있으므로 아무 처리 안함
      // 2. 결과 null : REWARD_RELATION 테이블에 INSERT
      let rewardRelationVo = {}
      rewardRelationVo.seq_product = this.productVo.seq
      rewardRelationVo.uid_reward_to = this.$route.query.uid
      this.$axios.post(this.$store.state.apiServerIp + '/api/reward/insertRewardRelation', rewardRelationVo)
        .then((result) => {
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted: function () {
    // 추천 상품 리스트 - 검색결과 없을시 표시됨
    this.$axios(this.$store.state.apiServerIp + '/api/search/selectRecommendProductList')
      .then((result) => {
        // console.log(JSON.stringify(result.data))
        this.$store.state.recommendProductList = result.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    // 상품 정보 조회
    selectProduct (seqProduct) {
      // 상품 정보 조회
      this.$q.loading.show() // 로딩 표시 시작
      this.$axios.get(this.$store.state.apiServerIp + '/api/product/selectProduct', {params: {seq: seqProduct}})
        .then((result) => {
          this.$q.loading.hide() // 로딩 표시 종료
          // console.log(JSON.stringify(result.data))
          this.productVo = result.data

          /*
          // 품절 체크
          if (this.productVo.quantity === '0') {
            this.buyButtonLabel = '품절'
            this.soldOutFlag = true // 찜, 구매하기 비활성화
          }
          */

          // 스크롤 탑으로 이동
          window.scrollTo({
            top: 0
          })
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
        })
    },
    checkLogin () {
      // console.log(JSON.stringify(this.$store.state.userVo))
      return Vue.prototype.$checkLogin(this.$store.state.userVo)
    },
    goHome () {
      if (!this.checkLogin()) {
        this.$refs.loginModal.show()
      } else {
        this.$router.push('/menu')
      }
    },
    // 마이스토어에 진열하기
    addProductToMystore () {
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        this.$refs.loginModal.show()
        return
      }
      // 마이스토어에 이미 등록된 상품인지 확인
      this.$axios.get(this.$store.state.apiServerIp + '/api/myproduct/selectMyproduct',
        {params: {seq_product: this.productVo.seq}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data !== '') {
            this.$q.notify({
              color: 'blue',
              position: 'left',
              message: '이미 등록된 상품입니다.',
              icon: 'notifications_active'
            })
          } else {
            // this.myproductVo.uid = this.$store.state.userVo.uid
            this.myproductVo.seq_product = this.productVo.seq
            this.$axios.post(this.$store.state.apiServerIp + '/api/myproduct/insertMyproduct', this.myproductVo)
              .then((result) => {
                // console.log(JSON.stringify(result.data))
                // this.$refs.mystore.show()
                this.$q.notify({
                  color: 'blue',
                  position: 'left',
                  message: '상품이 등록되었습니다.',
                  icon: 'notifications_active'
                })
                /*
                this.$q.dialog({
                  icon: 'reply',
                  title: '상품 진열 완료',
                  message: '지금 진열대를 확인 하시겠습니까?',
                  ok: '지금 확인',
                  cancel: '나중에'
                }).then(() => {
                  // 마이스토어 오픈
                  let serverIp = location.host
                  let serverName = location.hostname
                  console.log('serverName: ' + serverName)
                  // window.open('http://' + serverIp + '/#/mystore?uid=' + this.$store.state.userVo.uid)
                  window.open('http://' + serverIp + '/store/' + this.$store.state.userVo.uid)
                }).catch(() => {
                  // this.$q.notify(`You didn't agree`)
                })
                */
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addToFavorite () {
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        this.$refs.loginModal.show()
        return
      }

      // 품절 체크
      if (this.productVo.quantity === '0') {
        this.buyButtonLabel = '품절'
        this.soldOutFlag = true // 찜, 구매하기 비활성화
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '매진되었습니다. 조금 기다려주세요.',
          icon: 'notifications_active'
        })
        return
      }

      this.productVo.uid = this.$store.state.userVo.uid
      this.$axios.post(this.$store.state.apiServerIp + '/api/favorite/addToFavorite', this.productVo)
        .then((result) => {
          let resultCd = result.data.resultCd
          if (resultCd === '0') {
            this.$store.state.favoriteCount = result.data.count // 탭 카트 건수 설정
            this.$q.notify({
              color: 'blue',
              position: 'left',
              message: '상품을 찜목록에 담았습니다.',
              icon: 'notifications_active'
            })
          } else {
            this.$q.notify({
              color: 'blue',
              position: 'left',
              message: result.data.resultMsg,
              icon: 'notifications_active'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // ■ 로그인 콜백, 결제하기
    callbackLogin () {
      // 로그인 후 액션
      let nextActionAfterLogin = this.$store.state.nextActionAfterLogin
      if (nextActionAfterLogin === 'addToFavorite') {
        this.addToFavorite()
      } else if (nextActionAfterLogin === 'addProductToMystore') {
        this.addProductToMystore()
      }
    },
    // 상품문의 화면으로 이동
    goProductQna (seq) {
      this.$router.push('/productDetail/qna?seq=' + seq)
    },
    // 구매후기 화면으로 이동
    goProductReview (seq) {
      this.$router.push('/productDetail/review?seq=' + seq)
    },
    callbackBuyOption () {
    },
    goBuy () {
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        let path = this.$store.state.ROUTER_TO_PATH[this.$store.state.ROUTER_TO_PATH.length - 1]
        this.$cookie.set('LOGIN_REDIRECT_URL', path, 1) // 현재 페이지 쿠키에 저장

        this.$refs.loginModal.redirectTo = '/new/newProductDetail?seq=' + this.$route.query.seq
        this.$refs.loginModal.show()
        return
      }

      // 품절 체크
      if (this.productVo.quantity === '0') {
        this.buyButtonLabel = '품절'
        this.soldOutFlag = true // 찜, 구매하기 비활성화
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '매진되었습니다. 조금 기다려주세요.',
          icon: 'notifications_active'
        })
        return
      }

      // 구매 옵션 모달 설정
      this.$store.state.currentProductSeq = this.$route.query.seq // 결제 콜백에 사용할 상품시컨스
      this.$refs.buyOptionModal.productVo = JSON.parse(JSON.stringify(this.productVo))
      this.$refs.buyOptionModal.show()
    },
    goSearch () {
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        this.$refs.loginModal.show()
        return
      }
      this.$router.push('/search')
    },
    // 상품 상세 화면으로 이동
    goProductDetail (seqProduct) {
      this.$router.push('/productDetail?seq=' + seqProduct)
    },
    // 공유링크 복사
    copyUrlAuto (linkCd, seqOg) {
      // linkCd -> PRODUCT:상품 CONTENTS:컨텐츠 CIRCLE:모임 MEMBER:회원
      this.$refs.shareModal.linkVo.seq_og = seqOg
      this.$refs.shareModal.linkVo.link_cd = linkCd
      this.$refs.shareModal.show()

      // this.$q.loading.show()
      // this.$refs.shareModal.copyUrlAuto() // 링크 자동 복사
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
