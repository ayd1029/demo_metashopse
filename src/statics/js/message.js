/*eslint-disable */

// 뷰 객체
var vm;

// 매니저에게 초대 알림 - 매니저 초대 허락
function allowInvite (sid) {
    vm.allowInvite(sid);
}

// 판매자에게 주문 알림 - [판매자] 주문리스트로 이동
function goSellerOrderList () {
    vm.goSellerOrderList();
}

// 구매자에게 판매취소 알림 - [구매자] 주문리스트로 이동
function goOrderList () {
    vm.goOrderList();
}

/*eslint-disable */