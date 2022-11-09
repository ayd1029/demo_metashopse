/*eslint-disable */
var vm;
// 결제 콜백 처리
function callbackPaymentJs (resultCd, resultMsg, tid, payType, device) {
    vm.callbackPayment(resultCd, resultMsg, tid, payType, device);
}
// 결제완료 콜백 처리 - 계좌이체 동기방식 등 모든 처리가 성공하면 호출되는 함수
function callbackPaymentJsMobileReturnUrl () {
    // vm.callbackPaymentResult();
    vm.callbackPaymentMobileReturnUrl();
}

// 앱 푸시 토큰 저장
function saveTokenJs (token) {
    vm.saveToken(token); // vue 함수 콜
}

// 카카오 로그인 콜백 JS
function doLoginKakaoJs (authObj) {
    vm.doLoginKakao(authObj); // vue 함수 콜
}

/*eslint-disable */