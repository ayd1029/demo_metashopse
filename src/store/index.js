import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    /*
    modules: {
       example
    },
    */
    state: {
      /*
      firebaseConfig: { // FCM 푸쉬알림용
        apiKey: 'AIzaSyAtd-MIagGycm6Xp5y_t5CHcVh-kj3uFJ0',
        authDomain: 'firebaseapp.com',
        databaseURL: 'https://firebaseio.com',
        projectId: 'shop1the',
        storageBucket: 'appspot.com',
        messagingSenderId: '529446367576',
        appId: '1:529446367576:web:989c00a638eaa185'
      },
      webPushAuthKey: 'BLX3MsuH-vdMaaXb9tsreOHS-3aIhw-_nWy4tHMhgxkbBG2pY69pFYZy3rlcKSFwxsb8fCTFwgMxix9fUszgjpw', // 웹앱푸시 인증키
      */
      Kakao: null, // 카카오 오브젝트
      KAKAO_API_JS_KEY: '0a6389ac6f025e9ef9a6a1f8089b4bcf', // 카카오 API 자바스크립트 키

      // apiServerIp: 'https://metashopse.com', // ★★★ APP 배포용 ★★★
      apiServerIp: '', // ★★★ 웹 배포용 ★★★
      // apiServerIp: 'http://172.30.1.52', // ================ TEST
      // apiServerIp: 'http://172.30.1.52:8889', // ================ TEST

      DOMAIN: 'https://metashopse.com', // ★★★ 웹 / APP 배포용 ★★★
      // DOMAIN: 'http://172.30.1.52:8080', // ================ TEST
      // DOMAIN: 'http://172.30.1.52', // ================ TEST

      KAKAO_HOST: 'https://kauth.kakao.com',
      KAKAO_API_REST_KEY: '9627081d1f28fe0a7ca2e56312a07bde',
      KAKAO_REDIRECT_URI: 'https://metashopse.com/api/login/loginKakao', // ★★★ 웹 / APP 배포용 ★★★
      // KAKAO_REDIRECT_URI: 'http://172.30.1.52/api/login/loginKakao', // ================ TEST
      // KAKAO_REDIRECT_URI: 'http://localhost:8889/api/login/loginKakao', // ================ TEST

      PAGE_LOGIN: '/',

      BUSINESS_SITE_INFO: 'http://www.ftc.go.kr/bizCommPop.do?wrkr_no=1398702383', // 사업자정보확인

      rightDrawerOpen: false, // PC 우측 플레이리스트 표시 여부
      rightPlayerClass: '', // 우측 플레이어 클래스 - 판매자가 아닌 경우에만 우상단 fix - IE 버그 때문에..

      USER_ROLL_TYPE: 'B', // 사용자 역할 타입 설정 S:SELLER(판매자) B:BUYER(구매자)

      USE_CIRCLE: true, // 모임기능 활성화 여부

      ROUTER_IS_MOVE_BACK: false, // 뒤로가기 여부 - true일 경우 라우터 패스를 저장 안함, goBack() 함수 내에서 true로 설정, 라우터에서 false로 초기화
      ROUTER_FROM_PATH: [], // 이동 전 화면
      ROUTER_TO_PATH: [], // 이동 후 화면(현재 화면)

      UPLOAD_FILE_SIZE_LIMIT: 4, // 파일 사이즈 리미트
      drawerState: true,
      doNotBack: false, // 뒤로가기시 메인으로 이동하게 함
      widthRate: 100, // 화면 너비 - PC인 경우 50으로 변경됨 - App.vue
      pageMeta: {},
      device: '', // 접속 디바이스
      redirectTo: '', // 로그인 후 이동할 화면
      currentProductSeq: '', // 결제시 상품 상세화면 URL을 파라미터로 설정, 되돌아오기에 사용 - url=productDetail&seq=
      player: null,
      playerWidth: 0,
      playerHeight: 0,
      playerOffsetHori: 5,
      playerOffsetVert: 5,
      isInitPlayer: true, // 생성시 사용할 초기화 여부
      playerIsPlaying: false, // 플레이어가 현재 플레이 중이면 true
      playerisMute: false, // 플레이어가 음소거 상태이면 true
      playerIsShowing: false, // 플레이어가 현재 표시되고 있으면 true
      playerSizeIsBig: false, // 플레이어가 현재 빅사이즈면 true
      playerStatusIcon: 'play_circle_outline', // play_circle_outline <-> pause_circle_outline
      playerIsPlayingIcon: 'play_arrow', // play_arrow <-> pause
      playerIsMuteIcon: 'volume_off', // volume_up / volume_off
      playerIsShowingIcon: 'personal_video', // personal_video <-> hearing
      playerSizeIcon: 'featured_video', // featured_video(big) <-> branding_watermark(small)
      videoUrlParameter: 'enablejsapi=1&rel=0&playsinline=1', // 동영상 재생 플레이시 필요한 URL에 추가할 파라미터 playsinline=1(iOS에서 인라인으로 플레이 - 디폴트가 전체화면으로 되어 있기 때문에)
      // playVideoUrl: 'https://www.youtube.com/embed/d3Spnn6KFVY?list=RDxRbPAVnqtcs&rel=0&enablejsapi=1&playsinline=1',
      playVideoUrl: 'https://www.youtube.com/embed/VtY1ChbSWjw?rel=0&enablejsapi=1&playsinline=1',
      playlistHistoryList: [], // 플레이 히스토리 리스트

      findVo: { // 아이디/비밀번호 찾기
        findTarget: 'ID', // 'ID' or 'PWD'
        email: ''
      },

      layoutTabVisible: true, // 하단탭 표시 여부
      displayMenuBuy: false, // 구매메뉴 표시여부
      displayMenuAd: false, // 광고메뉴 표시여부
      displayMenuSell: false, // 판매메뉴 표시여부
      displayMenuEtc: false, // 기타메뉴 표시여부
      creatorRankingList: '', // 인기순위 리스트
      tutorialStep: 'step1', // 튜토리얼 스텝
      ordersVo: '', // 결제 콜백시 insert할 주문정보
      lastOrdersVo: '', // 컨텐츠 작성을 위해 ordersVo 정보 복제 (ordersVo가 남아 있으면 주문완료화면 되돌아가면 다시 insert 시도하니까 여기에 옮김)
      nextActionAfterLogin: '', // 로그인 후 실행할 액션
      nextPathAfterLogin: '', // 로그인 후 이동할 패스
      selectedHomeTab: 'CONTENTS', // 홈 화면 표시할 디폴트 탭
      // homeContentsList: [], // 메인 컨텐츠 리스트
      // homeProductList: [], // 메인 나의상품 리스트
      // homeCircleList: [], // 메인 나의모임 리스트
      // homeLastIndexContents: -1,
      // homeLastIndexProduct: -1,
      // homeLastIndexCircle: -1,
      unreadMessageCount: 0, // 미확인 메세지 건수
      searchKeyword: '',
      searchResultKeyword: '', // 검색결과 없음 표시용 검색어
      encodedSearchKeyword: '',
      searchLogList: '', // 최근 검색어 리스트
      searchContentsList: [], // 1. 게시물 리스트
      searchProductList: [], // 2. 상품 리스트
      searchMemberList: [], // 3. 인물 리스트
      searchCircleList: [], // 4. 모임 리스트
      recommendProductList: [], // 추천 상품 리스트 - 검색결과 없을시 표시됨
      selectedSearchDiv: 'product',
      colorContents: 'black',
      colorProduct: 'primary',
      colorMember: 'black',
      colorCircle: 'black',
      totalCountContents: 0,
      totalCountProduct: 0,
      totalCountMember: 0,
      totalCountCircle: 0,
      youtubeChannelUrl: '', // 유튜브 채널 URL - 채널 리스트에서 설정
      // searchTarget: 'product',
      userVo: { // 사용자 정보
        uid: '',
        name: '',
        auth_key: ''
      },
      sellerVo: {}, // 판매자 정보
      coinVo: { // 사용자 코인 정보
        coin: 0,
        ranking: 0
      },
      searchPeriodOptions: [ // 주문조회 - 간편조회기간 옵션
        {label: '오늘', value: 'TODAY'},
        {label: '1주일', value: 'WEEK'},
        {label: '1개월', value: 'MONTH'},
        {label: '3개월', value: 'QUARTER'}
      ],
      orderSearchFieldOptions: [ // 주문조회 - 상세조회 항목
        {label: '상세조회 전체', value: ''},
        {label: '주문번호', value: 'ORDER_NO'},
        {label: '수취인명', value: 'TO_NAME'},
        {label: '수취인연락처', value: 'TO_MOBILE_NO'},
        {label: '구매자명', value: 'FROM_NAME'},
        {label: '구매자연락처', value: 'FROM_MOBILE_NO'},
        {label: '상품번호', value: 'SEQ_PRODUCT'},
        {label: '송장번호', value: 'DELIVERY_NO'}
      ],
      addressList: [], // 주소록
      cartCount: '', // 카트 상품 수
      favoriteCount: '', // 찜 상품 수
      rewardRankingTypeOptions: [ // 원더랭킹 정렬순
        {label: '현재', value: 'now'},
        {label: '누적', value: 'total'}
      ],
      dividendrankingTypeOptions: [ // 원더배당 정렬순
        {label: '전체', value: 'all'},
        {label: '나의', value: 'mine'}
      ],
      payCdProduct: 'PRODUCT', // 결제코드 상품구매
      payCdSlot: 'SLOT', // 결제코드 슬롯구매 - 정기결제
      payCdCoin: 'COIN', // 결제코드 슬롯구매 - 정기결제
      qnaTypeOptions: [ // 리뷰 정렬순
        {label: '선택', value: '00'},
        {label: '크기/색상/용량', value: '01'},
        {label: '상품구성', value: '02'},
        {label: '상품정보', value: '03'},
        {label: '구매', value: '04'},
        {label: '사용방법', value: '05'},
        {label: '기타', value: '99'}
      ],
      sellerQnaStatusOptions: [ // 판매자 문의사항 필터링
        {label: '전체', value: ''},
        {label: '답변 대기', value: 'NOT_DONE'},
        {label: '답변 완료', value: 'DONE'}
      ],
      orderStatusOptions: [ // 주문 상태
        {label: '전체상태', value: ''},
        {label: '입금대기', value: '00'},
        {label: '결제완료', value: '01'},
        {label: '취소요청', value: '03'},
        {label: '구매취소', value: '04'},
        {label: '판매취소', value: '05'},
        {label: '배송준비', value: '11'},
        {label: '배송중', value: '12'},
        {label: '배송완료', value: '21'},
        {label: '교환신청', value: '40'},
        {label: '교환완료', value: '45'},
        {label: '반품신청', value: '62'},
        {label: '반품완료', value: '64'},
        {label: '환불완료', value: '66'},
        {label: '구매확정', value: '90'}
        // {label: '정산완료', value: '91'},
        // {label: '리뷰작성완료', value: '92'}
      ],
      returnedStatusOptions: [ // 주문 상태
        {label: '전체상태', value: ''},
        {label: '구매취소', value: '04'},
        {label: '판매취소', value: '05'},
        {label: '교환신청', value: '40'},
        {label: '교환완료', value: '45'},
        {label: '반품신청', value: '62'},
        {label: '반품완료', value: '64'},
        {label: '환불완료', value: '66'},
        {label: '구매확정', value: '90'}
        // {label: '정산완료', value: '91'},
        // {label: '리뷰작성완료', value: '92'}
      ],
      reviewOrderbyOptions: [ // 리뷰 정렬순
        {label: '전체', value: ''},
        {label: '최신순', value: '01'},
        {label: '사진순', value: '02'},
        {label: '평점 ↑', value: '04'},
        {label: '평점 ↓', value: '05'}
      ],
      ORDER_STATUS_PAYMENT_WAIT: '00', // 입금대기
      ORDER_STATUS_PAYMENT_COMPLETED: '01', // 결제완료(주문확인대기)
      ORDER_STATUS_CANCEL: '04', // 구매취소
      ORDER_STATUS_CANCEL_SELLER: '05', // 판매취소
      ORDER_STATUS_DELIVERY_WAIT: '11', // 배송대기(주문확인완료)
      ORDER_STATUS_DELIVERY_STARTED: '12', // 배송중
      ORDER_STATUS_DELIVERY_COMPLETED: '21', // 배송완료
      ORDER_STATUS_REQUEST_EXCHANGE: '40', // 교환신청
      ORDER_STATUS_REQUEST_EXCHANGE_COMPLETED: '45', // 교환완료
      ORDER_STATUS_REQUEST_RETURN: '62', // 반품신청
      ORDER_STATUS_REQUEST_RETURN_COMPLETED: '64', // 반품완료
      ORDER_STATUS_REQUEST_RETURN_REFUNDED: '66', // 환불완료
      ORDER_STATUS_PURCHASE_CONFIRMED: '90', // 구매확정
      bankCdOptions: [
        {label: '경남은행', value: '39'},
        {label: '광주은행', value: '34'},
        {label: '교보증권', value: 'DI'},
        {label: '국민은행', value: '04'},
        {label: '기업은행', value: '03'},
        {label: '농협은행', value: '11'},
        {label: '대구은행', value: '31'},
        {label: '대신증권', value: 'D9'},
        {label: '도이치은행', value: '55'},
        {label: '동부증권', value: 'DC'},
        {label: '메리츠종금증권', value: 'DE'},
        {label: '모간스탠리은행', value: 'DS'},
        {label: '미래에셋대우', value: 'D3'},
        {label: '뱅크오브아메리카', value: '60'},
        {label: '부국증권', value: 'DO'},
        {label: '부산은행', value: '32'},
        {label: '산림조합', value: '64'},
        {label: '산업은행', value: '02'},
        {label: '삼성증권', value: 'DH'},
        {label: '새마을금고', value: '45'},
        {label: '수협은행', value: '07'},
        {label: '신영증권', value: 'DF'},
        {label: '신한금융투자', value: 'DB'},
        {label: '신한은행', value: '88'},
        {label: '신협', value: '48'},
        {label: '에스케이증권', value: 'D8'},
        {label: '우리은행', value: '20'},
        {label: '우체국', value: '71'},
        {label: '유안타증권', value: 'D1'},
        {label: '유진투자증권', value: 'DD'},
        {label: '이베스트투자증권', value: 'DK'},
        {label: '저축은행', value: '50'},
        {label: '전북은행', value: '37'},
        {label: '제이피모간', value: '57'},
        {label: 'SC제일은행', value: '23'},
        {label: '제주은행', value: '35'},
        {label: '카카오뱅크', value: '90'},
        {label: '케이뱅크', value: '89'},
        {label: '케이프투자증권', value: 'DP'},
        {label: '키움증권', value: 'DJ'},
        {label: '하나금융투자', value: 'DA'},
        {label: '하나은행', value: '81'},
        {label: '하이투자증권', value: 'D6'},
        {label: '한국씨티은행', value: '27'},
        {label: '한국투자증권', value: 'D4'},
        {label: '한화투자증권', value: 'DM'},
        {label: '현대차증권', value: 'D2'},
        {label: 'HSBC은행', value: '54'},
        {label: 'NH투자증권', value: 'DN'}
      ],
      addressMessageCdOptions: [
        {label: '부재시 경비실에 맡겨주세요.', value: '11'},
        {label: '부재시 휴대폰으로 연락바랍니다.', value: '21'},
        {label: '집 앞에 놓아주세요.', value: '31'},
        {label: '택배함에 넣어주세요.', value: '41'},
        {label: '직접 입력', value: '0'}
      ],
      sellerManagerRollCdOptions: [
        {label: '오너', value: '1'},
        {label: '총괄', value: '2'},
        {label: '직원', value: '3'}
      ],
      // https://tracking.sweettracker.co.kr/templates/app.html#/apikey/list
      // 이용권등급:프리 이용권번호:244-1144 제공량:1000건/월 시작일:2019-04-06 종료일:2019-05-06
      // deliveryApiKey: 'jiRDSPZ5PAMHg2yZE6hGwQ', // 택배 연동 스윗트래커 API KEY
      // 이용권등급:프리 이용권번호:504-0237 제공량:1000건/월 시작일:2019-05-06 종료일:2019-06-06
      // deliveryApiKey: 'HWYgUN87dzNQBEbZ3JZs9w', // 택배 연동 스윗트래커 API KEY
      // 이용권등급:프리 이용권번호:303-0308 제공량:1000건/월 시작일:2019-06-05 종료일:2019-07-05
      // deliveryApiKey: 'HyKYb4cUHGFBfW7IASFhOw', // 택배 연동 스윗트래커 API KEY
      // 이용권등급:프리 이용권번호:174-0257 제공량:1000건/월 시작일:2019-07-06 종료일:2019-08-06
      // deliveryApiKey: 'dG6DFPddpWOuw8UJ4qd30Q', // 택배 연동 스윗트래커 API KEY
      // 이용권등급:프리 이용권번호:922-2311 제공량:1000건/월 시작일:2019-08-07 종료일:2019-09-07
      deliveryApiKey: 'o5lm1wpwGWP2lOy2FqHBpA', // 택배 연동 스윗트래커 API KEY
      deliveryCorpCdOptions: [
        {label: '건영택배', value: '18'},
        {label: '경동택배', value: '23'},
        {label: '굿투럭', value: '40'},
        {label: '농협택배', value: '53'},
        {label: '대신택배', value: '22'},
        {label: '로젠택배', value: '06'},
        {label: '롯데택배', value: '08'},
        {label: '세방', value: '52'},
        {label: '애니트랙', value: '43'},
        {label: '우체국택배', value: '01'},
        {label: '일양로지스', value: '11'},
        {label: '천일택배', value: '17'},
        {label: '하이택배', value: '58'},
        {label: '한덱스', value: '20'},
        {label: '한의사랑택배', value: '16'},
        {label: '한진택배', value: '05'},
        {label: '합동택배', value: '32'},
        {label: '호남택배', value: '45'},
        {label: '홈픽택배', value: '54'},
        {label: 'CJ대한통운', value: '04'},
        {label: 'CU편의점택배', value: '46'},
        {label: 'CVSnet 편의점택배', value: '24'},
        {label: 'KGB택배', value: '56'},
        {label: 'KGL네트웍스', value: '30'},
        {label: 'SLX', value: '44'},
        {label: '★쿠폰★', value: '99'}
      ],
      circleCate1CdOptions: [ // 모임 분류1
        {label: '아웃도어/여행', value: '01'},
        {label: '운동/스포츠', value: '02'},
        {label: '인문학/책/글', value: '03'},
        {label: '업종/직무', value: '04'},
        {label: '외국/언어', value: '05'},
        {label: '문화/공연/축제', value: '06'},
        {label: '음악/악기', value: '07'},
        {label: '공예/만들기', value: '08'},
        {label: '댄스/무용', value: '09'},
        {label: '봉사활동', value: '10'},
        {label: '사교/인맥', value: '11'},
        {label: '차/오토바이', value: '12'},
        {label: '사진/영상', value: '13'},
        {label: '야구관람', value: '14'},
        {label: '게임/오락', value: '15'},
        {label: '요리/제조', value: '16'},
        {label: '반려동물', value: '17'},
        {label: '가족/결혼', value: '18'},
        {label: '자유주제', value: '19'}
      ],
      // 카카오 로그인 정보
      kakaoLoginVO: {
        access_token: '',
        token_type: '',
        refresh_token: '',
        expires_in: '',
        scope: '',
        refresh_token_expires_in: '',
        id: '',
        nickname: '',
        profile_image: '',
        thumbnail_image: '',
        has_email: '',
        is_email_valid: '',
        is_email_verified: '',
        email: '',
        has_age_range: '',
        age_range: '',
        has_birthday: '',
        birthday: '',
        has_gender: '',
        gender: ''
      }
    },
    getters: {
      getCartCount: function (state) {
        return state.cartCount
      },
      getAccessToken: function (state) {
        return state.kakaoLoginVO.access_token
      },
      getId: function (state) {
        return state.kakaoLoginVO.id
      },
      getNickname: function (state) {
        return state.kakaoLoginVO.nickname
      },
      getProfileImage: function (state) {
        return state.kakaoLoginVO.profile_image
      },
      getThumbnailImage: function (state) {
        return state.kakaoLoginVO.thumbnail_image
      },
      getEmail: function (state) {
        return state.kakaoLoginVO.email
      }
    },
    mutations: {
      updateDrawerState (state, opened) {
        state.drawerState = opened
      },
      updatePageMeta (state, meta) {
        state.pageMeta = {
          title: '',
          hash: '',
          icon: '',
          iframeTabs: false,
          backRoute: '/main',
          tabs: [],
          ...meta
        }
      },
      setKakaoLoginVO: function (state, payload) {
        state.kakaoLoginVO = payload
        /*
        state.kakaoLoginVO.access_token = payload.access_token
        state.kakaoLoginVO.token_type = payload.token_type
        state.kakaoLoginVO.refresh_token = payload.refresh_token
        state.kakaoLoginVO.expires_in = payload.expires_in
        state.kakaoLoginVO.scope = payload.scope
        state.kakaoLoginVO.refresh_token_expires_in = payload.refresh_token_expires_in
        state.kakaoLoginVO.id = payload.id
        state.kakaoLoginVO.nickname = payload.nickname
        state.kakaoLoginVO.profile_image = payload.profile_image
        state.kakaoLoginVO.thumbnail_image = payload.thumbnail_image
        state.kakaoLoginVO.has_email = payload.has_email
        state.kakaoLoginVO.is_email_valid = payload.is_email_valid
        state.kakaoLoginVO.is_email_verified = payload.is_email_verified
        state.kakaoLoginVO.email = payload.email
        state.kakaoLoginVO.has_age_range = payload.has_age_range
        state.kakaoLoginVO.age_range = payload.age_range
        state.kakaoLoginVO.has_birthday = payload.has_birthday
        state.kakaoLoginVO.birthday = payload.birthday
        state.kakaoLoginVO.has_gender = payload.has_gender
        state.kakaoLoginVO.gender = payload.gender
        */
      }
    },
    actions: {
      SET_USER_KAKAO: function (context, payload) {
        // commit 의 대상인 addCounter 는 mutations 의 메서드를 의미한다.
        return context.commit('setKakaoLoginVO', payload)
      }
    }
  })

  return Store
}
