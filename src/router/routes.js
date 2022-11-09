import LayoutMain from 'layouts/layout-main'
import LayoutNothing from 'layouts/layout-nothing'
// import LayoutSeller from 'layouts/layout-seller'
// import LayoutPc from 'layouts/layout-pc'

// var VueCookie = require('vue-cookie')
// const requireAuth = () => (from, to, next) => {
// }

const routes = [
  {
    path: '/',
    component: LayoutNothing,
    children: [
      {path: '', component: () => import('pages/index')}, // 시작페이지
      {path: 'mission', component: () => import('pages/1on/mission')}, // 서비스 소개
      {path: 'join', component: () => import('pages/join/join')}, // 회원가입
      {path: 'sellerInfo', component: () => import('pages/join/join')}, // 판매자 정보 등록
      {path: 'addProduct', component: () => import('pages/join/join')} // 상품등록 - 새제품 & 중고
    ]
  },
  {
    path: '/',
    component: LayoutMain,
    children: [
      // ■■■■■■■■■■ 판매자용 ■■■■■■■■■■
      {path: 'p/seller/main', component: () => import('pages/pc/seller/seller-main')},
      {path: 'p/seller/ordersList', component: () => import('pages/pc/seller/seller-orders-list')},
      {path: 'seller/main', component: () => import('pages/seller/seller-main')}, // 주문조회
      {path: 'seller/searchOrdersList', component: () => import('pages/seller/seller-search-orders-list')},
      {path: 'seller/ordersList', component: () => import('pages/seller/seller-orders-list')}, // 판매관리
      // {path: 'seller/order/sellerReturnedOrdersList', component: () => import('pages/seller/seller-returned-orders-list')},
      {path: 'seller/product', component: () => import('pages/product/product-list')},
      {path: 'seller/product/productRegister', component: () => import('pages/product/product-register')},
      {path: 'seller/product/productModify', component: () => import('pages/product/product-modify')},
      {path: 'seller/product/productDetail', component: () => import('pages/product/product-detail')},
      {path: 'seller/menu/settle', component: () => import('pages/seller/seller-settle-list')}, // 정산내역
      {path: 'seller/message', component: () => import('pages/message/message-list')},
      {path: 'seller/menu/sellerQnaList', component: () => import('pages/qna/seller-qna-list')},
      {path: 'seller/menu/sellerReviewList', component: () => import('pages/review/seller-review-list')}, // 판매자 리뷰 관리
      {path: 'seller/menu/sellerInfo', component: () => import('pages/seller/seller-info')},
      {path: 'seller/menu/myinfo', component: () => import('pages/myinfo/myinfo')},
      {path: 'seller/menu/notice', component: () => import('pages/notice/notice-list')}, // 공지사항
      {path: 'seller/menu', component: () => import('pages/seller/seller-menu')},
      {path: 'seller/menu/siteQnaRegister', component: () => import('pages/qna/site-qna-register')},
      {path: 'seller/menu/hotdealList', component: () => import('pages/hotdeal/hotdeal-list')}, // 핫딜관리

      // ■■■■■■■■■■ 구매자용 ■■■■■■■■■■
      {path: 'main', component: () => import('pages/main/main')}, // 메인
      {path: 'terms', component: () => import('pages/term/terms')}, // 이용약관
      {path: 'main/followList', component: () => import('pages/follow/follow-list')},
      {path: 'rankingProductDetail', component: () => import('pages/new/new-product-detail')},
      {path: 'add', component: () => import('pages/add/contents-register')}, // 컨텐츠 등록
      {path: 'add/video', component: () => import('pages/add/video-register')}, // 동영상 링크 등록
      {path: 'message', component: () => import('pages/message/message-list')},
      {path: 'productDetail', component: () => import('pages/new/new-product-detail')},
      {path: 'productDetail/qna', component: () => import('pages/qna/product-qna')},
      {path: 'productDetail/qnaRegister', component: () => import('pages/qna/product-qna-register')},
      {path: 'productDetail/review', component: () => import('pages/review/product-review')},
      {path: 'circle', component: () => import('pages/circle/circle-main')},
      {path: 'circle/circleRegister', component: () => import('pages/circle/circle-register')},
      {path: 'circle/circleModify', component: () => import('pages/circle/circle-modify')},
      {path: 'circle/circleInfo', component: () => import('pages/circle/circle-info')},
      {path: 'menu', component: () => import('pages/menu/menu')},
      {path: 'menu/newContentsList', component: () => import('pages/new/new-contents-list')},
      {path: 'menu/newProductList', component: () => import('pages/new/new-product-list')},
      {path: 'menu/hotdeal', component: () => import('pages/hotdeal/hotdeal')}, // 핫딜
      {path: 'menu/hotdealRegister', component: () => import('pages/hotdeal/hotdeal-register')}, // 핫딜신청
      {path: 'menu/hotdealDetail', component: () => import('pages/hotdeal/hotdeal-detail')}, // 핫딜신청 상세
      {path: 'menu/newCircleList', component: () => import('pages/new/new-circle-list')}, // 모임
      {path: 'menu/rewardRankList', component: () => import('pages/rank/reward-rank-list')}, // 원더랭킹
      {path: 'menu/dividendRankList', component: () => import('pages/rank/dividend-rank-list')}, // 원더배당
      {path: 'menu/event', component: () => import('pages/event/event-open')}, // 이벤트 랭킹
      {path: 'menu/introduce', component: () => import('pages/introduce/introduce')}, // 원더학개론
      {path: 'menu/creatorList', component: () => import('pages/creator/creator-list')},
      {path: 'menu/youtuberList', component: () => import('pages/youtuber/youtuber-list')}, // 유튜버스 리스트
      {path: 'menu/youtuberContentsList', component: () => import('pages/youtuber/youtuber-contents-list')}, // 유튜버스 컨텐츠 리스트
      {path: 'menu/favoriteProductList', component: () => import('pages/favorite/favorite-product-list')},
      {path: 'menu/cartProductList', component: () => import('pages/cart/cart-product-list')},
      {path: 'menu/orderCompleted', component: () => import('pages/payment/order-completed')},
      {path: 'menu/vbankDepositInfo', component: () => import('pages/payment/vbank-deposit-info')},
      {path: 'menu/bankDepositInfo', component: () => import('pages/payment/bank-deposit-info')},
      {path: 'payment/popupPayPc', component: () => import('pages/payment/popup-pay-pc')}, // PC결제 팝업
      {path: 'payment/callbackAppNext', component: () => import('pages/payment/callback-app-next')}, // APP결제 콜백처리 nextUrl
      {path: 'payment/callbackAppReturn', component: () => import('pages/payment/callback-app-return')}, // APP결제 콜백처리 returnUrl
      {path: 'payment/callbackNpay', component: () => import('pages/payment/callback-npay')}, // 네이버페이 결제 콜백처리
      {path: 'menu/ordersList', component: () => import('pages/orders/orders-list')},
      {path: 'menu/returnedOrdersList', component: () => import('pages/orders/returned-orders-list')},
      {path: 'menu/myQnaList', component: () => import('pages/qna/my-qna-list')}, // 나의문의
      {path: 'menu/myReviewList', component: () => import('pages/review/my-review-list')}, // 구매후기
      {path: 'menu/myproductList', component: () => import('pages/advertise/myproduct-list')}, // 광고상품 목록
      {path: 'menu/rewardList', component: () => import('pages/advertise/reward-list')}, // 광고보상내역
      {path: 'menu/rewardWithdraw', component: () => import('pages/advertise/reward-withdraw')}, // 광고보상출금
      {path: 'menu/myinfo', component: () => import('pages/myinfo/myinfo')},
      {path: 'menu/siteQnaRegister', component: () => import('pages/qna/site-qna-register')},
      {path: 'menu/tutorial', component: () => import('pages/tutorial/tutorial')}, // 무작정 따라하기
      {path: 'menu/notice', component: () => import('pages/notice/notice-list')}, // 공지사항
      {path: 'search', component: () => import('pages/search/search')},
      {path: 'contents/contentsDetail', component: () => import('pages/contents/contents-detail')},
      {path: 'link/member', component: () => import('pages/mystore/mystore')},
      {path: 'menu/electronicFinance', component: () => import('pages/term/electronic-finance')}, // 전자금융거래 이용약관
      {path: 'menu/serviceTerm', component: () => import('pages/term/service-term')}, // 메타샵스 이용약관
      {path: 'menu/sellerServiceTerm', component: () => import('pages/term/seller-service-term')}, // 메타샵스 판매자 이용약관
      {path: 'admin/hotdealList', component: () => import('pages/admin/hotdeal/hotdeal-list')}, // 관리자 핫딜관리
      {path: 'admin/hotdealDetail', component: () => import('pages/admin/hotdeal/hotdeal-detail')}, // 관리자 핫딜상세
      {path: 'admin/createProductsFile', component: () => import('pages/admin/naver/create-products-file')}, // 관리자 네이버쇼핑 상품데이터 파일 생성
      {path: 'admin/createSitemapFile', component: () => import('pages/admin/sitemap/create-sitemap-file')}, // 관리자 사이트맵 파일 생성
      {path: 'admin/ordersList', component: () => import('pages/admin/orders/orders-list')}, // 관리자 주문현황
      {path: 'admin/createUser', component: () => import('pages/admin/etc/create-user')}, // 관리자 유저등록
      {path: 'mystore', component: () => import('pages/mystore/mystore')},
      {path: 'link/contents', component: () => import('pages/link/link-contents')},
      {path: 'link/product', component: () => import('pages/link/link-product-detail')},
      {path: 'link/circle', component: () => import('pages/circle/circle-info')},
      {path: 'add/productEasyRegister', component: () => import('pages/add/product-easy-register')} // 상품 간편 등록 테스트
      // {path: '', component: () => import('pages/menu/menu')},
      // {path: '', component: () => import('pages/login/start')}, // 푸쉬 토큰 취득을 위해 거치는 브릿지 페이지
      // {path: 'login', component: () => import('pages/login/login')}, // 로그인
      // {path: 'loginApp', component: () => import('pages/login/login-app')}, // 로그인 - APP용
      // {path: 'loginSellerz', component: () => import('pages/login/login-sellerz')}, // 메타샵스 계정으로 로그인
      // {path: 'loginSellerzApp', component: () => import('pages/login/login-sellerz-app')}, // 메타샵스 계정으로 로그인 - APP용
      // {path: 'welcome', component: () => import('pages/hotdeal/hotdeal')}, // PC 메인
      // {path: 'findIdPwd', component: () => import('pages/login/find-id-pwd')},
      // {path: 'join', component: () => import('pages/join/join')},
      // {path: 'main', component: () => import('pages/main/main')},
      // {path: 'kakaoLoginCallback', component: () => import('pages/login/kakao-login-callback')}, // 카카오 로그인 콜백
    ]
  }
  /*
  {
    path: '/seller',
    component: LayoutSeller,
    children: [
      {path: 'seller/main', component: () => import('pages/seller/seller-main')},
      {path: 'seller/order', component: () => import('pages/seller/seller-orders-list')},
      {path: 'seller/order/sellerReturnedOrdersList', component: () => import('pages/seller/seller-returned-orders-list')},
      {path: 'seller/settle', component: () => import('pages/seller/seller-settle-list')},
      {path: 'seller/product', component: () => import('pages/product/product-list')},
      {path: 'seller/product/productRegister', component: () => import('pages/product/product-register')},
      {path: 'seller/product/globalProductRegister', component: () => import('pages/product/global-product-register')},
      {path: 'seller/product/productModify', component: () => import('pages/product/product-modify')},
      {path: 'seller/product/productDetail', component: () => import('pages/product/product-detail')},
      {path: 'seller/message', component: () => import('pages/message/message-list')},
      {path: 'seller/sellerQnaList', component: () => import('pages/qna/seller-qna-list')},
      {path: 'seller/seller/menu/sellerInfo', component: () => import('pages/seller/seller-info')},
      {path: 'seller/menu', component: () => import('pages/seller/seller-menu')}
    ]
  },
  {
    path: '/mainPc',
    component: LayoutPc,
    children: [
      {path: '', component: () => import('pages/pc/main-pc')} // PC메인
    ]
  },
  {
    path: '/pc',
    component: LayoutNothing,
    children: [
      {path: 'left', component: () => import('pages/pc/pc-left')}, // PC LEFT FRAME
      {path: 'center', component: () => import('pages/pc/pc-center')}, // PC CENTER FRAME
      {path: 'right', component: () => import('pages/pc/pc-right')} // PC LEFT FRAME
    ]
  }
  {
    path: '/join',
    component: LayoutNothing,
    children: [
      {path: '', component: () => import('pages/join/join')}
    ]
  },
  {
    path: '/link',
    component: LayoutNothing,
    children: [
      {path: 'contents', component: () => import('pages/link/link-contents')},
      {path: 'product', component: () => import('pages/link/link-product-detail')},
      {path: 'circle', component: () => import('pages/circle/circle-info')},
      {path: 'member', component: () => import('pages/mystore/mystore')}
    ]
  },
  */
  /*
  {
    path: '/mystore',
    component: LayoutNothing,
    children: [
      {path: '', component: () => import('pages/mystore/mystore')}
    ]
  },
  { // 컨텐츠 타임라인
    path: '/circle',
    component: LayoutMain,
    children: [
      {path: 'circleInfo', component: () => import('pages/circle/circle-info')}
    ]
  },
  */
  // { // 컨텐츠 타임라인
  //   path: '/contents',
  //   component: LayoutMystore,
  //   children: [
  //     {path: '', component: () => import('pages/mystore/contents/contents-list')},
  //     {path: 'productDetail', component: () => import('pages/new/new-product-detail')}
  //     // {path: 'contents/contentsDetail', component: () => import('pages/mystore/contents/contentsDetail')}
  //   ]
  // },

  // {
  //   path: '/add',
  //   component: LayoutMystore,
  //   children: [
  //     {path: '', component: () => import('pages/mystore/add/contents-register')}
  //   ]
  // },
  /*
  { // 상품등록 (입력도중 메뉴탭을 잘못 터치하면 데이터가 날아가버려서..)
    path: '/menu/sellerProductRegister',
    component: LayoutNothing,
    children: [
      {path: '', component: () => import('pages/product/product-register')}
    ]
  },
  */
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
