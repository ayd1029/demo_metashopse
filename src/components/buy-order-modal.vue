<template>
  <q-modal v-model="buyOrderModal" :content-css="{minWidth: '50vw', minHeight: '95vh'}">

    <addressBookModal ref="addressBookModal" @callback-address-book="callbackAddressBook" />

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <!-- <img src="statics/icons/logo.png" style="width: 30px; height: 30px;"> -->
        <q-btn flat round dense icon="assignment" />
        <!-- <i class="material-icons">payment</i> -->
        <q-toolbar-title>주문하기</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <div align="center" style="width: 100%">
        <!-- 주문 정보 -->
        <q-list style="width: 90%; padding:5px 10px 5px 10px" v-for="item in orderProductList" :key="item.seq">
          <q-item style="padding:0px 0px 0px 0px">
            <table border="0" style="width: 100%">
              <tr>
                <td width="20%" align="left"><img :src="item.image_url" style="width:50px; height:50px; object-fit:cover; border-radius: 3px;"></td>
                <td width="80%"><font size="2" color="grey">{{ item.title }}<br>{{ item.subtitle }}</font></td>
              </tr>
              <tr>
                <td v-if="item.select_option3 != null && item.select_option3 !== ''" colspan="2" width="" align="right"><font size="2" color="grey">{{ item.select_option1 + '/' + item.select_option2 + '/' + item.select_option3 }}</font><font size="2" color="grey">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.order_quantity }}&nbsp;개</font></td>
                <td v-else-if="item.select_option2 != null && item.select_option2 !== ''" colspan="2" width="" align="right"><font size="2" color="grey">{{ item.select_option1 + '/' + item.select_option2 }}<font size="2" color="grey">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.order_quantity }}&nbsp;개</font></font></td>
                <td v-else-if="item.select_option1 != null && item.select_option1 !== ''" colspan="2" width="" align="right"><font size="2" color="grey">{{ item.select_option1 }}<font size="2" color="grey">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.order_quantity }}&nbsp;개</font></font></td>
                <td v-else colspan="2" width="" align="left"><font size="3" color="grey"></font></td>
              </tr>
              <tr>
                <td align="left"><font size="2" color="red">결제금액</font></td>
                <td align="right"><font size="2" color="red">{{ addComma(item.order_price) }}&nbsp;원</font></td>
              </tr>
            </table>
          </q-item>
        </q-list>
      </div>

      <!-- 결제 정보 -->
      <div align="center" style="width: 100%">
        <br>
        <div class="row justify-left">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<q-btn color="black" size="xs" style="width:120px;"><font size="2">결제 정보</font></q-btn>
        </div>
        <table border="0" style="width: 90%">
          <tr><td colspan="2"><q-card-separator /></td></tr>
          <tr>
            <td align="left"><font size="2" color="black">주문금액</font></td>
            <td align="right"><font size="2" color="black">{{ addComma(totalPrice) }}&nbsp;원</font></td>
          </tr>
          <tr>
            <td align="left"><font size="2" color="black">보유 원더</font></td>
            <td align="right"><font size="2" color="black">{{ addComma($store.state.coinVo.coin) }}&nbsp;&nbsp;<img src="statics/images/logo/logocoin.png" style="width: 9px"></font></td>
          </tr>
          <tr>
            <td align="left"><font size="2" color="black">사용 원더</font>&nbsp;<font size="2" color="grey">(7/1 부터)</font></td>
            <td align="right"><font size="2" color="black">0&nbsp;&nbsp;<img src="statics/images/logo/logocoin.png" style="width: 9px"></font></td>
          </tr>
          <tr>
            <td align="left"><font size="2" color="red">총 결제금액</font></td>
            <td align="right"><font size="2" color="red">{{ addComma(totalPrice) }}&nbsp;원</font></td>
          </tr>
        </table>
      </div>

      <!-- 구매자 정보 -->
      <div align="center" style="width: 100%">
        <br>
        <div class="row justify-left">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<q-btn color="black" size="xs" style="width:120px;"><font size="2">구매자 정보</font></q-btn>
        </div>
        <table border="0" style="width: 90%">
          <tr><td colspan="3"><q-card-separator /></td></tr>
          <tr>
            <td align="left" width="20%"><font size="2" color="black">성명</font></td>
            <td align="left" colspan="2"><font size="2" color="black">{{ $store.state.userVo.name }}</font></td>
          </tr>
          <tr>
            <td align="left"><font size="2" color="black">휴대폰</font></td>
            <td align="left" colspan="2"><font size="2" color="black">{{ $store.state.userVo.mobile_no }}</font></td>
          </tr>
          <tr>
            <td align="left"><font size="2" color="black">이메일</font></td>
            <td align="left" colspan="2"><font size="2" color="black">{{ $store.state.userVo.email }}</font></td>
          </tr>
        </table>
      </div>

      <!-- 배송지 정보 -->
      <div align="center" style="width: 100%">
        <br>
        <div class="row justify-left">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<q-btn color="black" size="xs" style="width:120px;"><font size="2">받는사람 정보</font></q-btn>
        </div>
        <table border="0" style="width: 90%">
          <tr><td colspan="3"><q-card-separator /></td></tr>
          <tr>
            <td width="22%" align="left"><font size="2" color="black">성명</font></td>
            <td width="58%" align="left"><font size="2" color="black">{{ addressVo.to_name }}</font></td>
            <td width="20%" align="right" rowspan="2"><q-btn dense color="primary" label="주소록" @click="showAddressBookModal" style="width: 60px" /></td>
          </tr>
          <tr>
            <td align="left"><font size="2" color="black">휴대폰</font></td>
            <td align="left"><font size="2" color="black">{{ addressVo.mobile_no }}</font></td>
          </tr>
          <tr>
            <td align="left"><font size="2" color="black">기타연락처</font></td>
            <td align="left" colspan="2"><font size="2" color="black">{{ addressVo.tel_no }}</font></td>
          </tr>
          <tr>
            <td align="left"><font size="2" color="black">우편번호</font></td>
            <td align="left"><font size="2" color="black">{{ addressVo.post_no }}</font></td>
            <td align="right"></td>
          </tr>
          <tr>
            <td align="left"><font size="2" color="black">주소</font></td>
            <td align="left" colspan="2"><font size="2" color="black">{{ addressVo.address1 }} {{ addressVo.address2 }}</font></td>
          </tr>
          <tr>
            <td align="left"><font size="2" color="black">요청사항</font></td>
            <td align="left" colspan="2"><font size="2" color="black">{{ addressVo.message }}</font></td>
          </tr>
        </table>
      </div>

      <!-- 결제 방법 -->
      <div align="center" style="width: 100%">
        <br>
        <div class="row justify-left">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<q-btn color="black" size="xs" style="width:120px;"><font size="2">결제 방법</font></q-btn>
        </div>
        <table border="0" style="width: 90%">
          <tr><td><q-card-separator /></td></tr>
          <tr>
            <td v-if="$store.state.device === 'P'">
              <q-select inverted-light color="white" v-model="displayPayTypePc" @input="payTypeInputHandler" :options="selectPayTypePcOptions" hide-underline />
            </td>
            <td v-else>
              <q-select inverted-light color="white" v-model="displayPayType" @input="payTypeInputHandler" :options="selectPayTypeOptions" hide-underline />
            </td>
          </tr>
          <tr>
            <td><font size="1" color="red">※ 실시간 계좌이체는 이체처리 완료까지 시간이 다소 걸릴 수 있습니다.</font></td>
          </tr>
        </table>
      </div>
      <!--
      <div align="center" style="width: 100%">
        <br>
        <div class="row justify-left">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<q-chip color="black" icon="" style="width: 120px;">결제 방법</q-chip>
        </div>
        <table border="0" style="width: 90%">
          <tr><td colspan="3"><q-card-separator /></td></tr>
          <tr>
            <td width="33%"><q-radio v-model="selectPayType" val="CA"><font size="2">신용카드</font></q-radio></td>
            <td width="33%"><q-radio v-model="selectPayType" val="MU"><font size="2">무통장입금</font></q-radio></td>
            <td width="34%"><q-radio v-model="selectPayType" val="MO"><font size="2">휴대폰</font></q-radio></td>
          </tr>
        </table>
      </div>
      <div v-if="selectPayType === 'CA'" align="center" style="width: 100%">
        <br>
        <table border="0" style="width: 90%">
          <tr>
            <td align="left" width="33%"><font size="2" color="black">카드선택</font></td>
            <td align="left" width="67%" colspan="2"><q-select inverted-light color="white" v-model="selectPayCardCd" :options="selectPayCardCdOptions" hide-underline /></td>
          </tr>
          <tr>
            <td align="left"><font size="2" color="black">할부개월</font></td>
            <td align="left" colspan="2"><q-select inverted-light color="white" v-model="selectCardInstallment" :options="selectCardInstallmentOptions" hide-underline /></td>
          </tr>
        </table>
      </div>
      <div v-if="selectPayType === 'MU'" align="center" style="width: 100%">
        <br>
        <table border="0" style="width: 90%">
          <tr>
            <td align="left" width="33%"><font size="2" color="black">입금은행</font></td>
            <td align="left" width="67%" colspan="2"><q-select inverted-light color="white" v-model="selectPayBankCd" :options="selectPayBankCdOptions" hide-underline /></td>
          </tr>
          <tr>
            <td align="left"><font size="2" color="black">입금기한</font></td>
            <td align="left" colspan="2"><font size="2" color="black">{{ bankDeadlineDisplay }}</font></td>
          </tr>
          <tr>
            <td align="left" colspan="3">&nbsp;</td>
          </tr>
          <tr>
            <td align="left" colspan="3"><font size="2" color="black">현금영수증</font></td>
          </tr>
          <tr>
            <td align="left" width="33%"><q-radio v-model="radioCashReceiptType" val="PE"><font size="2">개인소득공제용</font></q-radio></td>
            <td align="left" width="33%"><q-radio v-model="radioCashReceiptType" val="BU"><font size="2">사업자증빙용</font></q-radio></td>
            <td align="left" width="34%"><q-radio v-model="radioCashReceiptType" val="NO"><font size="2">신청안함</font></q-radio></td>
          </tr>
          <tr><td colspan="3"><q-card-separator /></td></tr>
        </table>
        <div v-if="radioCashReceiptType === 'PE'" align="center" style="width: 100%">
          <br>
          <table border="0" style="width: 90%">
            <tr>
              <td align="left" width="33%"><q-radio v-model="radioDeductionType" val="MO"><font size="2">휴대폰번호</font></q-radio></td>
              <td align="left" width="67%"><q-radio v-model="radioDeductionType" val="CA"><font size="2">현금영수증 카드번호</font></q-radio></td>
            </tr>
            <tr><td colspan="2"><q-card-separator /></td></tr>
          </table>
          <div v-if="radioDeductionType === 'MO'" align="center" style="width: 100%">
            <table border="0" style="width: 90%">
              <tr>
                <td align="left" width="33%"><font size="2" color="black">휴대폰번호</font></td>
                <td align="left" width="67%" colspan="2"><q-input type="number" inverted-light color="white" v-model.trim="ordersVo.deduction_mobile_no" style="width: 100%;"/></td>
              </tr>
            </table>
          </div>
          <div v-if="radioDeductionType === 'CA'" align="center" style="width: 100%">
            <table border="0" style="width: 90%">
              <tr>
                <td align="left" width="33%"><font size="2" color="black">현금영수증 카드번호</font></td>
                <td align="left" width="67%" colspan="2"><q-input type="number" inverted-light color="white" v-model.trim="ordersVo.deduction_card_no" style="width: 100%;"/></td>
              </tr>
            </table>
          </div>
        </div>
        <div v-if="radioCashReceiptType === 'BU'" align="center" style="width: 100%">
          <br>
          <table border="0" style="width: 90%">
            <tr>
              <td align="left" width="33%"><font size="2" color="black">사업자등록번호</font></td>
              <td align="left" width="67%" colspan="2"><q-input type="number" inverted-light color="white" v-model.trim="ordersVo.business_no" style="width: 100%;"/></td>
            </tr>
          </table>
        </div>
      </div>
      <div v-if="selectPayType === 'MO'" align="center" style="width: 100%">
        <br>
        <table border="0" style="width: 90%">
          <tr>
            <td align="left" colspan="3"><font size="2" color="black">이동통신사</font></td>
          </tr>
          <tr>
            <td align="left" colspan="3">
              <q-radio v-model="radioPayMobileCd" val="SKT"><font size="2">SKT</font></q-radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <q-radio v-model="radioPayMobileCd" val="KT"><font size="2">KT</font></q-radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <q-radio v-model="radioPayMobileCd" val="LG U+"><font size="2">LG U+</font></q-radio>&nbsp;&nbsp;&nbsp;
              <q-radio v-model="radioPayMobileCd" val="KCT"><font size="2">KCT</font></q-radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <q-radio v-model="radioPayMobileCd" val="CJH"><font size="2">CJH</font></q-radio>
            </td>
          </tr>
        </table>
      </div>
      -->
      <div align="center" style="width: 100%">
        <br>
        <table border="0" style="width: 90%">
          <!--
          <tr>
            <td align="left" width="80%"><font size="2" color="grey">구매조건 확인 및 결제대행 서비스 약관 동의</font></td>
            <td align="right" width="20%"><font size="2" color="grey">보기</font></td>
          </tr>
          -->
          <tr>
            <td align="left" width="80%"><q-checkbox v-model="openYn" color="grey"><font size="2" color="grey">&nbsp;&nbsp;구매소식 등록</font></q-checkbox></td>
            <td align="right" width="20%"></td>
          </tr>
        </table>
        <br>
        <!--
        <table border="0" style="width: 90%">
          <tr>
            <td align="center" width="100%"><font size="2" color="black">위 주문 내용을 확인하였으며, 결제에 동의합니다.</font></td>
          </tr>
        </table>
        <br>
        -->
      </div>
      <q-toolbar color="white">
        <q-btn color="primary" icon="payment" label="결제하기" @click="goPay" style="width: 100%; height: 50px;" />
      </q-toolbar>
      <div align="center" style="width: 100%">
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
      </div>
    </q-modal-layout>
    <!-- <iframe :src="iframeUrl" style="width:100%" height="800" frameborder="0"></iframe> -->

    <!-- PC용 결제폼 -->
    <div style="border:2px #dddddd double;padding:10px;background-color:#f3f3f3; display:none;">
      <form id="SendPayForm_id">
        <br/><b>version</b> :
        <br/><input name="version" v-model="paymentVo.version">
        <br/><b>mid</b> :
        <br/><input v-if="displayPayTypePc === 'KAKAOPAY'" name="mid" v-model="paymentVo.midKakao">
        <br/><input v-if="displayPayTypePc !== 'KAKAOPAY'" name="mid" v-model="paymentVo.mid">
        <br/><b>goodname</b> :
        <br/><input name="goodname" v-model="paymentVo.goodname">
        <br/><b>oid</b> :
        <br/><input name="oid" v-model="paymentVo.oid">
        <br/><b>price</b> :
        <br/><input name="price" v-model="paymentVo.price">
        <br/><b>currency</b> :
        <br/><input name="currency" v-model="paymentVo.currency">
        <br/><b>buyername</b> :
        <br/><input name="buyername" v-model="paymentVo.buyername">
        <br/><b>buyertel</b> :
        <br/><input name="buyertel" v-model="paymentVo.buyertel">
        <br/><b>buyeremail</b> :
        <br/><input name="buyeremail" v-model="paymentVo.buyeremail">
        <br/><b>timestamp</b> :
        <input type="text" name="timestamp" v-model="paymentVo.timestamp">
        <br/><b>signature</b> :
        <input type="text" name="signature" v-model="paymentVo.signature">
        <br/><b>returnUrl</b> :
        <br/><input name="returnUrl" v-model="paymentVo.returnUrl">
        <!--
        payViewType이 popup일 경우 crossDomain이슈로 우회처리
        <input name="returnUrl" value="<%=siteDomain%>/INIStdPayRelay.jsp" >
        -->
        <br/><b>mKey</b> :
        <br/><input v-if="displayPayTypePc === 'KAKAOPAY'" name="mKey" v-model="paymentVo.mkeyKakao">
        <br/><input v-if="displayPayTypePc !== 'KAKAOPAY'" name="mKey" v-model="paymentVo.mkey">
        <br/><b>gopaymethod</b> :
        <input name="gopaymethod" v-model="selectPayTypePc" >
        <br/>
        <b>offerPeriod</b> : 제공기간
        <br/>ex)20151001-20151231, [Y2:년단위결제, M2:월단위결제, yyyyMMdd-yyyyMMdd : 시작일-종료일]
        <br/><input name="offerPeriod" value="" >
        <br/><br/>
        <br/><b>acceptmethod</b> : acceptmethod
        <br/>acceptmethod  ex) CARDPOINT:SLIMQUOTA(코드-개월:개월):no_receipt:va_receipt:vbanknoreg(0):vbank(20150425):va_ckprice:vbanknoreg:
        <br/>KWPY_TYPE(0):KWPY_VAT(10|0) 기타 옵션 정보 및 설명은 연동정의보 참조 구분자 ":"
        <br/><input name="acceptmethod" value="CARDPOINT:HPP(1):no_receipt:va_receipt:vbanknoreg(0):below1000" >
        <br/><br/>
        <b>***** 표시 옵션 *****</b>
        <br/><b>languageView</b> : 초기 표시 언어
        <br/>[ko|en] (default:ko)
        <br/><input name="languageView" value="" >
        <br/><b>charset</b> : 리턴 인코딩
        <br/>[UTF-8|EUC-KR] (default:UTF-8)
        <br/><input name="charset" value="" >
        <br/><b>payViewType</b> : 결제창 표시방법
        <br/>[overlay] (default:overlay)
        <br/><input name="payViewType" value="popup" >
        <br/><b>closeUrl</b> : payViewType='overlay','popup'시 취소버튼 클릭시 창닫기 처리 URL(가맹점에 맞게 설정)
        <br/>close.jsp 샘플사용(생략가능, 미설정시 사용자에 의해 취소 버튼 클릭시 인증결과 페이지로 취소 결과를 보냅니다.)
        <br/><input name="closeUrl" v-model="paymentVo.closeUrl" >
        <br/><b>popupUrl</b> : payViewType='popup'시 팝업을 띄울수 있도록 처리해주는 URL(가맹점에 맞게 설정)
        <br/>popup.jsp 샘플사용(생략가능,payViewType='popup'으로 사용시에는 반드시 설정)
        <!-- <br/><input name="popupUrl" value="<%=siteDomain%>/popup.jsp" > -->
        <br/><input name="popupUrl" value="/#/payment/popupPayPc" >
        <b>***** 결제 수단별 옵션 *****</b>
        <br/>
        <b>-- 카드(간편결제도 사용) --</b>
        <br/><b>quotabase</b> : 할부 개월 설정
        <br/>ex) 2:3:4
        <br/><input name="quotabase" v-model="paymentVo.cardQuotaBase" >
        <br/><b>ini_onlycardcode</b> : 중복 카드 코드
        <br/>ex) 01:03:04:11
        <br/><input name="ini_onlycardcode" value="" >
        <br/><b>ini_cardcode</b> : 카드 코드
        <br/>ex) 2:3:4
        <br/><input name="ini_cardcode" value="" >
        <br/><b>ansim_quota</b> : 할부 선택
        <br/>ex) 2:3:4
        <br/><input name="ansim_quota" value="" >
        <b>-- 가상계좌 --</b>
        <br/><b>INIregno</b> : 주민번호 설정 기능
        <br/>13자리(주민번호),10자리(사업자번호),미입력시(화면에서입력가능)
        <!-- <br/><input name="vbankRegNo" value="" > -->
        <br/><br/>
        <b>***** 추가 옵션 *****</b>
        <br/><b>merchantData</b> : 가맹점 관리데이터(2000byte)
        <br/>인증결과 리턴시 함께 전달됨(한글 지원 안됨, 개인정보 암호화(권장))
        <br/><input name="merchantData" value="" >
        <input type="hidden" name="merchantData" v-model="customData"><!-- 상점 자유 데이터 -->
      </form>
    </div>

    <!-- 모바일용 결제폼 -->
    <div style="border:2px #dddddd double;padding:10px;background-color:#f3f3f3; display:none;">
      <form id="form1" name="ini" method="post" action="" accept-charset="EUC-KR">
        <table width="320" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td height="69" align="center" style="color:#ffffff; font-size:16px; font-weight:bold;">INIpay Mobile 결제요청</td>
          </tr>
          <tr>
            <td height="347" align="center" valign="top">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="298" height="296" align="center">
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="95" height="25" align="left" >방식</td>
                        <td align="left">
                          <select name="inipaymobile_type">
                            <option value="web">INIpayMobile Web</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td height="25" align="left" >주문번호</td>
                        <td align="left"><input v-model="paymentVo.oid" type="text" name="P_OID" id="textfield2" style="height:15px;"/></td>
                      </tr>
                      <tr>
                        <td height="25" align="left" >문자셋</td>
                        <td align="left"><input type="text" name="P_CHARSET" value="EUC-KR"/></td>
                      </tr>
                      <tr>
                        <td height="25" align="left" >상품명</td>
                        <td align="left"><input v-model="paymentVo.goodname" type="text" name="P_GOODS" id="textfield3" style="height:15px;"/></td>
                      </tr>
                      <tr>
                        <td height="25" align="left" >가격 </td>
                        <td align="left"><input v-model="paymentVo.price" type="text" name="P_AMT" id="textfield4" style="height:15px;"/></td>
                      </tr>
                      <tr>
                        <td height="25" align="left" >구매자이름</td>
                        <td align="left"><input v-model="paymentVo.buyername" type="text" name="P_UNAME" id="textfield5" style="height:15px;"/></td>
                      </tr>
                      <tr>
                        <td height="25" align="left" >상점이름 </td>
                        <td align="left"><input type="text" name="P_MNAME" value="메타샵스" id="textfield6" style="height:15px;"/></td>
                      </tr>
                      <tr>
                        <td height="25" align="left" >휴대폰번호</td>
                        <td align="left"><input v-model="paymentVo.buyertel" type="text" name="P_MOBILE" id="textfield7" style="height:15px;"/></td>
                      </tr>
                      <tr>
                        <td height="25" align="left" >이메일</td>
                        <td align="left"><input v-model="paymentVo.buyeremail" type="text" name="P_EMAIL" id="textfield8" style="height:15px;"/></td>
                      </tr>
                      <tr>
                        <td height="25" align="left" >결제방법 </td>
                        <td align="left"><input v-model="selectPayType" type="text" name="paymethod" style="height:15px;"/></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <input v-if="displayPayType === 'KAKAOPAY'" type="hidden" name="P_MID" v-model="paymentVo.midKakao">
          <input v-if="displayPayType !== 'KAKAOPAY'" type="hidden" name="P_MID" v-model="paymentVo.mid">
          <input v-if="$store.state.device === 'M'" type="hidden" name="P_NEXT_URL" v-model="paymentVo.mobileNextUrl">
          <input v-if="$store.state.device === 'M'" type="hidden" name="P_RETURN_URL" v-model="paymentVo.mobileReturnUrl">
          <input v-if="$store.state.device === 'android'" type="hidden" name="P_NEXT_URL" v-model="paymentVo.androidNextUrl">
          <input v-if="$store.state.device === 'android'" type="hidden" name="P_RETURN_URL" v-model="paymentVo.androidReturnUrl">
          <input v-if="$store.state.device === 'ios'" type="hidden" name="P_NEXT_URL" v-model="paymentVo.iosNextUrl">
          <input v-if="$store.state.device === 'ios'" type="hidden" name="P_RETURN_URL" v-model="paymentVo.iosReturnUrl">
          <input type="hidden" name="P_NOTI_URL" v-model="paymentVo.notiUrl">
          <input type="hidden" name="P_NOTI" v-model="customData"><!-- 상점 자유 데이터 -->

          <!--
          // ★ 복합필드 P_RESERVED 설정 ★
          // 신용카드일 경우: twotrs_isp=Y&block_isp=Y&twotrs_isp_noti=N
          // 계좌이체일 경우 동기방식 처리: twotrs_bank=Y&apprun_check=Y
          // 가상계좌일 경우 현금영수증 사용여부: vbank_receipt=Y
          -->
          <!-- vue data로 제어하면 타이밍이 늦어서 두번째 팝업에서 인식되는 문제가 있어서 미리 기술함 -->
          <input v-if="selectPayType === 'wcard'" type="hidden" name="P_RESERVED" value="twotrs_isp=Y&block_isp=Y&twotrs_isp_noti=N&apprun_check=Y&app_scheme=sellerz://">
          <input v-if="selectPayType === 'bank'" type="hidden" name="P_RESERVED" value="twotrs_bank=Y&apprun_check=Y&app_scheme=sellerz://">
          <input v-if="selectPayType === 'vbank'" type="hidden" name="P_RESERVED" value="vbank_receipt=Y&app_scheme=sellerz://">

          <!-- 실물여부 구분 : 컨텐츠 일 경우 : 1 실물일 경우 : 2  -->
          <input type="hidden" name="P_HPP_METHOD" value="2">
        </table>
      </form>
    </div>

  </q-modal>
</template>

<style>
</style>

<script>
// import LoadScript from 'vue-plugin-load-script'
import Vue from 'vue'
// import { domain } from '../global/constants.js'

export default {
  // name: 'mystore',
  data () {
    return {
      customData: '', // 상품 상세화면 URL을 파라미터로 설정, 되돌아오기에 사용
      buyOrderModal: false,
      orderProductList: [], // 주문상품 리스트 - 모달 호출전에 설정하고 호출됨
      fromCartFlag: false, // true: 장바구니에서 주문할 경우임. 결제완료시 장바구니에서 삭제처리 해야함.
      totalPrice: 0,
      totalRewardCoin: 0,
      // radioAddress: 'Default',
      addressVo: { // 배송지 정보
        uid: '',
        title: '',
        to_name: '',
        address1: '',
        address2: '',
        post_no: '',
        mobile_no: '',
        tel_no: '',
        message_cd: '',
        message: '',
        door_pwd: '',
        default_yn: ''
      },
      displayPayTypePc: 'Card', // 결제방법 PC - 콤보박스 표시용
      selectPayTypePc: 'Card', // 결제방법 PC
      selectPayTypePcOptions: [
        {label: '신용카드 PAYCO SSGPAY samsungPay L.pay KPAY', value: 'Card'},
        {label: '카카오페이', value: 'KAKAOPAY'},
        // {label: '네이버페이', value: 'NPAY'},
        {label: '계좌이체', value: 'DirectBank'},
        {label: '가상계좌', value: 'VBank'},
        {label: '무통장입금 (국민은행 055201-04-230453)', value: 'BANK'}
      ],
      displayPayType: 'wcard', // 결제방법 MOBILE - 콤보박스 표시용
      selectPayType: 'wcard', // 결제방법 MOBILE
      selectPayTypeOptions: [
        {label: '신용카드 PAYCO SSGPAY 삼성페이 L.pay', value: 'wcard'},
        {label: '카카오페이', value: 'KAKAOPAY'},
        // {label: '네이버페이', value: 'NPAY'},
        {label: '계좌이체', value: 'bank'},
        {label: '가상계좌', value: 'vbank'},
        {label: '무통장입금 (국민은행 055201-04-230453)', value: 'BANK'}
      ],
      // selectPayCardCd: '', // 카드사
      // selectCardInstallment: '', // 할부개월
      /*
      selectPayCardCdOptions: [
        {label: '현대카드', value: 'hyundai'},
        {label: '신한카드', value: 'shinhan'},
        {label: 'BC카드', value: 'bc'},
        {label: 'KB국민카드', value: 'kb'},
        {label: '삼성카드', value: 'samsung'},
        {label: '하나카드', value: 'hana'}
      ],
      selectCardInstallmentOptions: [
        {label: '2개월(무)', value: '2'},
        {label: '3개월(무)', value: '3'},
        {label: '4개월(무)', value: '4'},
        {label: '5개월(무)', value: '5'},
        {label: '6개월', value: '6'},
        {label: '7개월', value: '7'},
        {label: '8개월', value: '8'},
        {label: '9개월', value: '9'},
        {label: '10개월', value: '10'},
        {label: '11개월', value: '11'},
        {label: '12개월', value: '12'},
        {label: '24개월', value: '24'}
      ],
      */
      // selectPayBankCd: '',
      // bankDeadline: '', // 무통장입금 입금기한 DB저장용
      // bankDeadlineDisplay: '', // 무통장입금 입금기한 화면표시용
      // radioCashReceiptType: 'PE', // 현금영수증 코드
      // radioDeductionType: 'MO', // 현금영수증 개인소득공제 코드
      // radioPayMobileCd: 'SKT', // 통신사 코드
      ordersVo: { // 주문정보
        order_no: '',
        status: '',
        from_name: '',
        from_mobile_no: '',
        from_email: '',
        to_name: '',
        to_address1: '',
        to_address2: '',
        to_post_no: '',
        to_mobile_no: '',
        to_tel_no: '',
        to_message_cd: '',
        to_message: '',
        to_door_pwd: '',
        pay_cd: '',
        pay_type: '',
        pay_card_cd: '',
        pay_card_nm: '',
        card_installment: '',
        pay_bank_cd: '',
        pay_bank_nm: '',
        bank_deadline: '',
        cash_receipt_type: '',
        deduction_type: '',
        deduction_mobile_no: '',
        deduction_card_no: '',
        business_no: '',
        pay_mobile_cd: '',
        pay_mobile_nm: '',
        total_price: '',
        total_reward_coin: '',
        order_product_cnt: '',
        orderProductList: []
      },
      paymentVo: { // 결제관련정보
        orderProductList: [], // 주문상품 리스트
        pay_cd: this.$store.state.payCdProduct, // PRODUCT:상품구매 SLOT:진열슬롯구매(정기구매) COIN:보상코인구매(스토어주소변경 등)
        device: this.$store.state.device, // 디바이스 P:PC M:Mobile A:APP
        order_no: '',
        status: '',
        total_price: ''
      },
      // ★ 복합필드 ★
      // 신용카드일 경우 twotrs_isp=Y&block_isp=Y&twotrs_isp_noti=N
      // 계좌이체일 경우 twotrs_bank=Y&apprun_check=Y
      // 가상계좌일 경우 vbank_receipt=Y
      pReserved: '',
      // oPay: '', // 네이버페이 오브젝트
      openYn: true // 구매소식 컨텐츠 등록 여부
    }
  },
  created: function () {
    // 콜백용 스크립트 로드
    this.$loadScript('statics/js/callback.js')
      .then(() => {
        // Script is loaded, do something
        window.vm = this // callback.js 의 vm 변수에 this 를 설정, 결제 완료 후 콜백에서 사용
      })
      .catch(() => {
        // Failed to fetch script
      })

    // KG이니시스 결제 스크립트 로드
    // this.$loadScript('https://stgstdpay.inicis.com/stdjs/INIStdPay.js', 'UTF-8') // stg로 시작하는 테스트 주소
    this.$loadScript('https://stdpay.inicis.com/stdjs/INIStdPay.js', 'UTF-8') // 상용
      .then(() => {
        // Script is loaded, do something
        console.log('INIStdPay.js loaded!')
      })
      .catch(() => {
        // Failed to fetch script
      })

    /*
    // 네이버페이 간편결제 스크립트 로드 - 매출 10억 이상 중대형몰만 가입된단다..한 1년 뒤면 가입 되긋지머 ㅋㅋ..
    this.$loadScript('https://nsp.pay.naver.com/sdk/js/naverpay.min.js', 'UTF-8')
      .then(() => {
        // TODO: 테스트
        this.selectPayTypePc = 'NPAY'
        this.selectPayType = 'NPAY'

        // 네이버페이 오브젝트 생성
        this.oPay = window.Naver.Pay.create({
          'mode': 'sandbox', // sandbox or production
          'clientId': 'u86j4ripEt8LRfPGzQ8' // clientId
          // 'clientId': 'np_shgki939797' // clientId
          // 'clientId': '78649C99-9A3A-41F2-97DE-D04BCEDD3888' // clientId
        })
        console.log(this.oPay)
      })
      .catch(() => {
        // Failed to fetch script
      })
    */

    // 입금기한 설정
    /*
    let today = new Date()
    today.setDate(today.getDate() + 1) // 익일까지 입금
    let yyyy = today.getFullYear()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    this.bankDeadlineDisplay = yyyy + '년 ' + mm + '월 ' + dd + '일 23시 59분 까지' // 화면표시용
    this.bankDeadline = yyyy + mm + dd // DB 저장용
    */

    // 결제 iframeUrl 설정
    /*
    let paymentUrl = '/payment/test'
    if (domain === 'http://localhost' || domain === 'http://192.168.0.7' || domain === 'http://127.0.0.1') {
      // 로컬 도메인
      this.iframeUrl = 'http://192.168.0.7' + paymentUrl
    } else {
      this.iframeUrl = domain + paymentUrl
    }
    */
  },
  mounted: function () {
  },
  methods: {
    show () {
      // 상품 상세화면 URL을 파라미터로 설정, 되돌아오기에 사용
      this.customData = this.$store.state.currentProductSeq + '_' + this.fromCartFlag
      this.ordersVo.savedSeq = this.$store.state.currentProductSeq
      this.ordersVo.savedFromCartFlag = this.fromCartFlag

      // 기본배송지 정보 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/address/selectDefaultAddress')
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.addressVo = result.data
        })
        .catch((err) => {
          console.log(err)
        })

      // 결제금액 계산
      for (let i = 0; i < this.orderProductList.length; i++) {
        this.totalPrice += Number(this.orderProductList[i].order_price) // 주문 금액
        this.totalRewardCoin += Number(this.orderProductList[i].order_reward_coin) // 보상 코인
      }

      // 결제 전처리
      // 받는 항목 : 결제관련정보
      this.paymentVo.total_price = this.totalPrice // 결제금액 설정 (연동시 금액 설정 필수)
      this.paymentVo.orderProductList = this.orderProductList // 상품 리스트 (상품명 설정을 위해서)
      this.$axios.post(this.$store.state.apiServerIp + '/api/payment/getPayInfo', this.paymentVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.paymentVo = result.data
        })
        .catch((err) => {
          console.log(err)
        })

      // 모달 화면 표시
      this.buyOrderModal = true
    },
    // 결제수단 선택시 핸들러
    payTypeInputHandler (pDisplayPayType) {
      if (this.$store.state.device === 'P') { // PC일 경우
        if (pDisplayPayType === 'KAKAOPAY') {
          this.selectPayTypePc = 'Card' // 카카오페이 결제수단은 카드로 설정
        } else {
          this.selectPayTypePc = pDisplayPayType
        }
      } else { // Mobile Web or APP일 경우
        if (pDisplayPayType === 'KAKAOPAY') {
          this.selectPayType = 'wcard' // 카카오페이 결제수단은 카드로 설정
        } else {
          this.selectPayType = pDisplayPayType
        }
      }
    },
    // 주소록 호출
    showAddressBookModal (type) {
      this.$refs.addressBookModal.show()
    },
    // 주소록 콜백
    callbackAddressBook (selectedAddressVo) {
      this.addressVo = selectedAddressVo
    },
    goPay () {
      // 주소 입력 체크
      if (this.addressVo == null || this.addressVo.post_no == null || this.addressVo.post_no === '') {
        this.$q.notify({
          color: 'blue',
          position: 'left',
          message: '주소를 선택해주세요.',
          icon: 'notifications_active'
        })
        return
      }

      // ◆◆◆◆◆◆◆ 주문정보 설정 시작 ◆◆◆◆◆◆◆
      this.ordersVo.order_no = this.paymentVo.order_no // 주문번호
      this.ordersVo.from_name = this.$store.state.userVo.name
      this.ordersVo.from_mobile_no = this.$store.state.userVo.mobile_no
      this.ordersVo.from_email = this.$store.state.userVo.email
      this.ordersVo.to_name = this.addressVo.to_name
      this.ordersVo.to_address1 = this.addressVo.address1
      this.ordersVo.to_address2 = this.addressVo.address2
      this.ordersVo.to_post_no = this.addressVo.post_no
      this.ordersVo.to_mobile_no = this.addressVo.mobile_no
      this.ordersVo.to_tel_no = this.addressVo.tel_no
      this.ordersVo.to_message_cd = this.addressVo.message_cd
      this.ordersVo.to_message = this.addressVo.message
      this.ordersVo.to_door_pwd = this.addressVo.door_pwd
      this.ordersVo.pay_cd = this.paymentVo.pay_cd
      if (this.$store.state.device === 'P') { // PC 결제인 경우
        this.ordersVo.pay_type = this.selectPayTypePc
      } else { // 모바일 결제인 경우
        this.ordersVo.pay_type = this.selectPayType
      }
      // this.ordersVo.pay_card_cd = this.selectPayCardCd
      // this.ordersVo.pay_card_nm = this.orderNo
      // this.ordersVo.card_installment = this.selectCardInstallment
      // this.ordersVo.pay_bank_cd = this.selectPayBankCd
      // this.ordersVo.pay_bank_nm = this.orderNo
      // this.ordersVo.bank_deadline = this.bankDeadline
      // this.ordersVo.cash_receipt_type = this.radioCashReceiptType
      // this.ordersVo.deduction_type = this.radioDeductionType
      // this.ordersVo.deduction_mobile_no = this.orderNo
      // this.ordersVo.deduction_card_no = this.orderNo
      // this.ordersVo.business_no = this.orderNo
      this.ordersVo.pay_mobile_cd = this.radioPayMobileCd
      // this.ordersVo.pay_mobile_nm = this.orderNo
      this.ordersVo.total_price = this.totalPrice
      this.ordersVo.total_reward_coin = this.totalRewardCoin
      this.ordersVo.order_product_cnt = this.orderProductList.length // 주문상품종류수
      // 구매소식 등록 여부 설정
      for (let i = 0; i < this.orderProductList.length; i++) {
        this.orderProductList[i].open_yn = this.openYn
      }
      this.ordersVo.orderProductList = this.orderProductList // ■ 주문상품 리스트
      // 스토어에 주문정보 설정
      // this.$store.state.ordersVo = this.ordersVo
      // this.$store.state.fromCartFlag = this.fromCartFlag

      // 휴대폰번호 설정 - 카카오 로그인으로 변경되면서 전화번호가 없음
      if (this.paymentVo.buyertel == null || this.paymentVo.buyertel === '') {
        this.paymentVo.buyertel = this.ordersVo.to_mobile_no // 받는사람 정보로 설정
      }

      // 주문정보 세션에 저장
      this.$axios.post(this.$store.state.apiServerIp + '/api/payment/saveOrdersInfoToSession', this.ordersVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
        })
        .catch((err) => {
          console.log(err)
        })
      // ◆◆◆◆◆◆◆ 주문정보 설정 종료 ◆◆◆◆◆◆◆

      /*
      // 네이버페이 간편결제 - 매출 10억 이상 중대형몰만 가입된단다..한 1년 뒤면 가입 되긋지머 ㅋㅋ..
      if ((this.$store.state.device === 'P' && this.selectPayTypePc === 'NPAY') ||
          (this.$store.state.device !== 'P' && this.selectPayType === 'NPAY')) { // 결제방법이 '네이버페이'일 경우
        // 쿠키에 돌아올 페이지 저장
        let path = this.$store.state.ROUTER_TO_PATH[this.$store.state.ROUTER_TO_PATH.length - 1]
        this.$cookie.set('PAYMENT_REDIRECT_URL', path, 1) // 현재 페이지 쿠키에 저장

        // 네이버페이 결제창 호출
        this.oPay.open({
          'merchantUserKey': '78649C99-9A3A-41F2-97DE-D04BCEDD3888',
          'merchantPayKey': this.paymentVo.order_no,
          'productName': '상품1',
          'totalPayAmount': this.totalPrice,
          'taxScopeAmount': this.totalPrice,
          'taxExScopeAmount': '0',
          'returnUrl': this.paymentVo.npayReturnUrl
        })
        return
      }
      */

      // ///////////////////////////////////////////////////////////////////////////////// 무통장입금 시작
      if ((this.$store.state.device === 'P' && this.selectPayTypePc === 'BANK') || (this.$store.state.device !== 'P' && this.selectPayType === 'BANK')) {
        this.$router.push('menu/bankDepositInfo?fromCartFlag=' + this.fromCartFlag)
        return
      }
      // ///////////////////////////////////////////////////////////////////////////////// 무통장입금 종료

      // 디바이스 체크
      if (this.$store.state.device === 'P') { // PC일 경우
        window.INIStdPay.pay('SendPayForm_id')
      } else { // 모바일인 경우
        /*
        window.name = 'BTPG_CLIENT'
        let width = 330
        let height = 480
        let xpos = (screen.width - width) / 2
        let ypos = (screen.width - height) / 2
        let position = 'top=' + ypos + ',left=' + xpos
        // let features = position + ', width=320, height=440'
        let features = position + ', width=740, height=880' // 테스트용으로 두배로 설정
        console.log(features)
        */
        let orderForm = document.ini
        let paymethod = orderForm.paymethod.value
        // let wallet = window.open('', 'BTPG_WALLET', features)
        // let wallet = window.open('', '_self', features)
        let wallet = window.open('', '_self') // CORDOVA PLUGIN 사용하기 때문에 영향 받음

        if (wallet == null) {
          if ((navigator.userAgent.indexOf('Windows NT 5.1') !== -1) && (navigator.userAgent.indexOf('SV1') !== -1)) { // Windows XP Service Pack 2
            alert('팝업이 차단되었습니다. 브라우저의 상단 노란색 [알림 표시줄]을 클릭하신 후 팝업창 허용을 선택하여 주세요.')
          } else {
            alert('팝업이 차단되었습니다.')
          }
          return false
        }

        // orderForm.target = 'BTPG_WALLET'
        orderForm.target = wallet
        orderForm.action = 'https://mobile.inicis.com/smart/' + paymethod + '/'
        orderForm.submit()
      }
    },
    // 결제 콜백
    callbackPayment (resultCd, resultMsg, tid, payType, device) {
      console.log('resultCd: ' + resultCd + ' , resultMsg: ' + resultMsg + ' , tid: ' + tid + ' , payType: ' + payType + ' , device: ' + device)

      if ((resultCd === '00' || resultCd === '0000') && tid !== '' && payType !== '') { // 결제 성공시 처리
        // 결제승인결과 확인
        this.$q.loading.show() // 로딩 표시 시작
        this.$axios.get(this.$store.state.apiServerIp + '/api/payment/checkPayIsCompleted', {params: {tid: tid}})
          .then((result) => {
            // console.log('checkPayIsCompleted result.data: ' + JSON.stringify(result.data))
            if (result.data === 0) { // tid에 해당하는 결제성공 건수가 0건이면 이상처리
              this.$q.loading.hide() // 로딩 표시 종료
              this.$q.notify({
                color: 'grey',
                position: 'left',
                message: '결제에 실패했습니다. 다시 결제를 진행해주세요.(E02)',
                icon: 'notifications_active'
              })
            } else { // 결제 정상처리
              // 장바구니에서 주문한 경우 - 장바구니에서 해당 상품 리스트 삭제
              if (this.fromCartFlag) {
                // 장바구니에서 주문상품 리스트 삭제 처리
                this.$axios.post(this.$store.state.apiServerIp + '/api/cart/deleteCartProductList', this.orderProductList)
                  .then((result) => {
                    // console.log(JSON.stringify(result.data))
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }

              // 가상계좌결제 또는 실시간계좌이체인 경우
              // 입금정보 화면으로 이동(노티로 수신)
              if (payType === 'VBANK' || payType === 'VBank') { // 가상계좌결제 - VBANK(Mobile), VBank(PC)
                // payType === 'DirectBank' || payType === 'iDirectBank') { // 실시간계좌이체(PC) - 바로 처리되는데?
                this.ordersVo.status = this.$store.state.ORDER_STATUS_PAYMENT_WAIT // 입금대기(00)
                // ■ 주문정보 등록
                this.ordersVo.tid = tid // 주문정보에서 가상계좌 입금정보를 조회하기 위해서 거래ID(tid)를 저장
                this.$axios.post(this.$store.state.apiServerIp + '/api/orders/insertOrders', this.ordersVo)
                  .then((result) => {
                    // console.log(JSON.stringify(result.data))
                    this.$q.loading.hide() // 로딩 표시 종료
                    // 입금정보 화면으로 이동
                    this.$router.push({path: '/menu/vbankDepositInfo', query: {tid: tid}})
                    // return null // 가상계좌 채번의 경우 처리 종료
                  })
                  .catch((err) => {
                    console.log(err)
                    this.$q.loading.hide() // 로딩 표시 종료
                    this.$q.notify({
                      color: 'grey',
                      position: 'left',
                      message: '결제에 실패했습니다. 다시 결제를 진행해주세요.(E03)',
                      icon: 'notifications_active'
                    })
                    // return null // 가상계좌 채번의 경우 처리 종료
                  })
                // return null // 가상계좌 채번의 경우 처리 종료
              } else { // 가상계좌가 아닌 경우
                this.ordersVo.status = this.$store.state.ORDER_STATUS_PAYMENT_COMPLETED // 결제완료(01)
                // ■ 주문정보 등록
                this.$axios.post(this.$store.state.apiServerIp + '/api/orders/insertOrders', this.ordersVo)
                  .then((result) => {
                    // console.log(JSON.stringify(result.data))
                    this.$q.loading.hide() // 로딩 표시 종료
                    // 주문 완료 화면으로 이동
                    this.$router.push('/menu/orderCompleted')
                  })
                  .catch((err) => {
                    console.log(err)
                    this.$q.loading.hide() // 로딩 표시 종료
                    this.$q.notify({
                      color: 'grey',
                      position: 'left',
                      message: '결제에 실패했습니다. 다시 결제를 진행해주세요.(E04)',
                      icon: 'notifications_active'
                    })
                  })
              }
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (resultCd === '90' || resultCd === '91') { // 결제 실패 90:인증실패 91:승인실패
        this.$q.notify({
          color: 'grey',
          position: 'left',
          message: resultMsg,
          icon: 'notifications_active'
        })
      } else { // 기타 결제 실패
        this.$q.notify({
          color: 'grey',
          position: 'left',
          message: '결제에 실패했습니다. 다시 결제를 진행해주세요.(E01)',
          icon: 'notifications_active'
        })
      }
    },
    // 결제승인 완료 콜백 - 계좌이체 동기방식 등 모든 처리가 성공하면 호출되는 함수
    callbackPaymentMobileReturnUrl () {
      this.$q.loading.show() // 로딩 표시 시작
      // 결제승인 완료 콜백 - 계좌이체 동기방식 등 모든 처리가 성공하면 호출되는 함수
      this.ordersVo.status = this.$store.state.ORDER_STATUS_PAYMENT_COMPLETED // 결제완료(01)
      // ■ 주문정보 등록
      this.$axios.post(this.$store.state.apiServerIp + '/api/orders/insertOrders', this.ordersVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // 장바구니에서 주문한 경우 - 장바구니에서 해당 상품 리스트 삭제
          if (this.fromCartFlag) {
            // 장바구니에서 주문상품 리스트 삭제 처리
            this.$axios.post(this.$store.state.apiServerIp + '/api/cart/deleteCartProductList', this.orderProductList)
              .then((result) => {
                // console.log(JSON.stringify(result.data))
                this.$q.loading.hide() // 로딩 표시 종료
                // 주문 완료 화면으로 이동
                this.$router.push('/menu/orderCompleted')
              })
              .catch((err) => {
                console.log(err)
                this.$q.loading.hide() // 로딩 표시 종료
                // 주문 완료 화면으로 이동
                this.$router.push('/menu/orderCompleted')
              })
          } else {
            this.$q.loading.hide() // 로딩 표시 종료
            // 주문 완료 화면으로 이동
            this.$router.push('/menu/orderCompleted')
          }
        })
        .catch((err) => {
          console.log(err)
          this.$q.loading.hide() // 로딩 표시 종료
          this.$q.notify({
            color: 'grey',
            position: 'left',
            message: '주문 실패. 다시 주문해주세요.',
            icon: 'notifications_active'
          })
        })
    },
    addComma (num) {
      return Vue.prototype.$addComma(num)
    },
    close () {
      this.buyOrderModal = false
      this.totalPrice = 0 // 총 결제금액 초기화
      this.totalRewardCoin = 0 // 총 결제금액 초기화
    }
  }
}
</script>
