<template>
  <q-page class="">

    <q-toolbar color="black" inverted>
      <q-btn flat round dense icon="fast_rewind" @click="goBack" />
      <q-toolbar-title>상품 등록</q-toolbar-title>
    </q-toolbar>

    <table style="width:90%;" align="center">
      <tr>
        <td>
          <q-select v-model="productVo.cate1_cd" inverted-light color="white" stack-label="상품 대분류 *" :options="cate1CdOptions" @input="selectCategory2List" />
          <br>
          <q-select v-model="productVo.cate2_cd" inverted-light color="white" stack-label="상품 중분류 *" :options="cate2CdOptions" @input="selectCategory3List" />
          <br>
          <q-select v-model="productVo.cate3_cd" inverted-light color="white" stack-label="상품 소분류 *" :options="cate3CdOptions" />
          <br>
          <q-input v-model.trim="productVo.title" stack-label="상품명 *" maxlength="50" />
          <br>
          <q-input v-model.trim="productVo.subtitle" stack-label="어필 포인트 * (강조하고 싶은 점)" maxlength="20" />
          <br>
          <q-input v-model.trim="productVo.price" type="number" align="right" suffix="원" stack-label="판매가격 * (배송비 포함 가격)" />
          <br>
          <q-input v-model.trim="productVo.reward_coin" type="number" align="right" suffix=" 원더" stack-label="보상원더 * (광고자에게 주는 보상금액)" />
          <br>
          <q-input v-model.trim="productVo.quantity" type="number" align="right" suffix=" 개" stack-label="수량 * (조합형 옵션 선택시 재고수량 자동계산)" />
          <br>
          <q-uploader
            stack-label="상품 이미지 *"
            ref="uploaderObj"
            multiple
            url="/api/common/uploadFile"
            auto-expand
            hide-upload-button
            :filter="filterFiles"
            @add="fileAdded"
            @remove:cancel="fileCanceled"
            @uploaded="fileUploaded"
            :additional-fields="[{name: 'seqFileMst', value: this.seqFileMst}]"
            :style="`width:${widthOneOne - 27}px`"
          />
          <br>
          <q-input v-model.trim="productVo.search_tag" stack-label="검색 태그 (띄어쓰기로 구분), 색상 필수!" maxlength="100" />
          <br>
          <font size="2" color="grey">상세내용</font>
          <br>
          <!-- <q-input v-model.trim="productVo.content" rows="1" type="textarea" float-label="내용" /> -->
          <vue-editor id="editor"
            useCustomImageHandler
            @imageAdded="handleImageAdded" v-model="productVo.content"
            style="width: 100%">
          </vue-editor>
          <!-- <div v-html="productVo.content"></div> -->
          <!--
            Show an icon button (with 'warning' as icon)
          -->
          <br>
          <q-toggle v-model="divProductOption">&nbsp;&nbsp;&nbsp;옵션 설정</q-toggle>
          <div v-if="divProductOption">
            <br>
            &nbsp;&nbsp;&nbsp;<q-toggle v-model="divSelectOption" color="orange">&nbsp;&nbsp;&nbsp;선택형&nbsp;&nbsp;<font size="1" color="grey">(사이즈, 색상 등 상세 조건을 판매자가 설정)</font></q-toggle>
            <div v-if="divSelectOption" style="margin: 0px 0px 0px 0px;">
              <br>
              <q-card-separator />
              <br>
              <table border="0" style="width: 100%">
                <tr>
                  <td width="50%"><q-radio v-model="selectOptionType" val="1" @input="changeSelectOptionType"><font size="3">&nbsp;단독형 (가격동일)</font></q-radio></td>
                  <td width="50%"><q-radio v-model="selectOptionType" val="2" @input="changeSelectOptionType"><font size="3">&nbsp;조합형 (가격상이)</font></q-radio></td>
                </tr>
              </table>
              <br>
              <q-select v-model="selectOptionCount" inverted-light color="white" stack-label="옵션명 개수" :options="selectOptionCountOptions" />
              <br>
              <table border="0" style="width: 100%">
                <tr>
                  <td width="105px" align="left">옵션명</td>
                  <td align="left">옵션값</td>
                </tr>
              </table>
              <div>
                <table border="0" style="width: 100%">
                  <tr>
                    <td width="105px"><q-input v-model.trim="selectOptionName1" placeholder="예시:컬러" style="width: 100px;" color="white" inverted-light /></td>
                    <td><q-input v-model.trim="selectOptionValue1" placeholder="예시:빨강,노랑(,로 구분)" color="white" style="width: 95%;" inverted-light /></td>
                  </tr>
                </table>
              </div>
              <div v-if="selectOptionCount > 1">
                <table border="0" style="width: 100%">
                  <tr>
                    <td width="105px"><q-input v-model.trim="selectOptionName2" placeholder="예시:컬러" style="width: 100px;" color="white" inverted-light /></td>
                    <td><q-input v-model.trim="selectOptionValue2" placeholder="예시:빨강,노랑(,로 구분)" color="white" style="width: 95%;" inverted-light /></td>
                  </tr>
                </table>
              </div>
              <div v-if="selectOptionCount > 2">
                <table border="0" style="width: 100%">
                  <tr>
                    <td width="105px"><q-input v-model.trim="selectOptionName3" placeholder="예시:컬러" style="width: 100px;" color="white" inverted-light /></td>
                    <td><q-input v-model.trim="selectOptionValue3" placeholder="예시:빨강,노랑(,로 구분)" color="white" style="width: 95%;" inverted-light /></td>
                  </tr>
                </table>
              </div>
              <br>
              <q-btn icon="arrow_downward" color="orange" @click="applySelectOption" style="width: 100px;" size="sm"><font size="3">&nbsp;&nbsp;&nbsp;적용</font></q-btn>
              <br>
              <br>
              <q-card-separator />
              <br>
              <table id="option-table" border="0" style="width: 100%;">
                <thead>
                  <tr>
                    <th width="50%" v-if="selectOptionCount === '1'"><font size="2">{{ selectOptionName1 }}</font></th>

                    <th width="25%" v-if="selectOptionCount === '2'"><font size="2">{{ selectOptionName1 }}</font></th>
                    <th width="25%" v-if="selectOptionCount === '2'"><font size="2">{{ selectOptionName2 }}</font></th>

                    <th width="17%" v-if="selectOptionCount === '3'"><font size="2">{{ selectOptionName1 }}</font></th>
                    <th width="17%" v-if="selectOptionCount === '3'"><font size="2">{{ selectOptionName2 }}</font></th>
                    <th width="17%" v-if="selectOptionCount === '3'"><font size="2">{{ selectOptionName3 }}</font></th>

                    <th width="5%" v-if="selectOptionType === '2'"><font size="2">+/-</font></th>
                    <th width="20%" v-if="selectOptionType === '2'"><font size="2">옵션가</font></th>
                    <th width="15%" v-if="selectOptionType === '2'"><font size="2">재고수량</font></th>
                    <th width="10%"><font size="2">삭제</font></th>
                  </tr>
                </thead>
                <tbody id="option-tbody" style="text-align: center;">
                  <tr v-for="(item, idx) in selectOptionList" :key="item.seq">
                    <td><font size="2" color="grey">{{ item.option_value1 }}</font></td>
                    <td v-if="selectOptionCount > 1"><font size="2" color="grey">{{ item.option_value2 }}</font></td>
                    <td v-if="selectOptionCount > 2"><font size="2" color="grey">{{ item.option_value3 }}</font></td>
                    <td v-if="selectOptionType === '2'"><input type="text" v-model="item.option_price_type" style="width:100%; border:0;" maxlength="1" value="+"></td>
                    <td v-if="selectOptionType === '2'"><q-input type="number" v-model="item.option_price" style="width:70px; border:0;" hide-underline /></td>
                    <td v-if="selectOptionType === '2'"><q-input type="number" v-model="item.option_quantity" @keyup="sumQuantity" style="width:50px; border:0;" hide-underline /></td>
                    <td><q-btn icon="close" @click="deleteSelectOptionRow(idx)" color="primary" style="width: 32px;" size="sm" /></td>
                  </tr>
                </tbody>
              </table>

              <br>
              <q-card-separator />
            </div>
            <br>
            <br>
            &nbsp;&nbsp;&nbsp;<q-toggle v-model="divDirectOption" color="orange">&nbsp;&nbsp;&nbsp;직접입력형&nbsp;&nbsp;<font size="1" color="grey">(구매자가 직접 정보를 입력)</font></q-toggle>
            <div v-if="divDirectOption">
              <br>
              <q-card-separator />
              <br>
              <q-select v-model="directOptionCount" inverted-light color="white" stack-label="옵션명 개수" :options="directOptionCountOptions" />
              <br>
              <div>
                <table border="0" style="width: 100%">
                  <tr>
                    <td width="105px"><q-input v-model.trim="directOptionName1" placeholder="예시:컬러" style="width: 100%;" stack-label="옵션명 1" color="white" inverted-light /></td>
                  </tr>
                  <tr></tr>
                  <tr></tr>
                </table>
              </div>
              <div v-if="directOptionCount > 1">
                <table border="0" style="width: 100%">
                  <tr>
                    <td width="105px"><q-input v-model.trim="directOptionName2" placeholder="예시:컬러" style="width: 100%;" stack-label="옵션명 2" color="white" inverted-light /></td>
                  </tr>
                  <tr></tr>
                  <tr></tr>
                </table>
              </div>
              <div v-if="directOptionCount > 2">
                <table border="0" style="width: 100%">
                  <tr>
                    <td width="105px"><q-input v-model.trim="directOptionName3" placeholder="예시:컬러" style="width: 100%;" stack-label="옵션명 3" color="white" inverted-light /></td>
                  </tr>
                </table>
              </div>
              <div v-if="directOptionCount > 3">
                <table border="0" style="width: 100%">
                  <tr>
                    <td width="105px"><q-input v-model.trim="directOptionName4" placeholder="예시:컬러" style="width: 100%;" stack-label="옵션명 4" color="white" inverted-light /></td>
                  </tr>
                </table>
              </div>
              <div v-if="directOptionCount > 4">
                <table border="0" style="width: 100%">
                  <tr>
                    <td width="105px"><q-input v-model.trim="directOptionName5" placeholder="예시:컬러" style="width: 100%;" stack-label="옵션명 5" color="white" inverted-light /></td>
                  </tr>
                </table>
              </div>
              <br>
              <q-card-separator />
            </div>
          </div>
          <br>
          <br>
          <q-toggle v-model="divSellerCode">&nbsp;&nbsp;&nbsp;판매자코드 설정</q-toggle>
          <br>
          <div v-if="divSellerCode">
            <br>
            <q-input v-model.trim="productVo.seller_product_cd" stack-label="판매자 상품코드" maxlength="100" />
            <br>
            <q-input v-model.trim="productVo.seller_barcode" stack-label="판매자 바코드" maxlength="100" />
            <br>
            <q-input v-model.trim="productVo.seller_inner_cd1" stack-label="판매자 내부코드1" maxlength="100" />
            <br>
            <q-input v-model.trim="productVo.seller_inner_cd2" stack-label="판매자 내부코드2" maxlength="100" />
          </div>
          <br>
          <q-toggle v-model="productVo.free_delivery_yn" readonly>&nbsp;&nbsp;&nbsp;무료배송 (기본설정)</q-toggle>
          <br>
          <br>
          <q-toggle v-model="productVo.dawn_delivery_yn">&nbsp;&nbsp;&nbsp;새벽배송</q-toggle>
          <br>
          <br>
          <q-checkbox v-model="productVo.used_yn" true-value="Y" false-value="N"><font size="3">&nbsp;&nbsp;중고여부 (중고제품인 경우 체크 필수)</font></q-checkbox>
          <br>
          <br>
          <div style="width: 100%; text-align: center;">
            <font size="1" color="grey">
              하기 내용을 확인 하였습니다.
              <br>
              <a @click="showTerms(1)" style="text-decoration: underline">상품주요정보</a>
              , <a @click="showTerms(2)" style="text-decoration: underline">상품정보제공고시</a>
              , <a @click="showTerms(3)" style="text-decoration: underline">배송</a>
              , <a @click="showTerms(4)" style="text-decoration: underline">반품교환</a>
              , <a @click="showTerms(5)" style="text-decoration: underline">A/S 및 특이사항</a>
            </font>
          </div>
          <br>
          <div id="termsDiv" v-html="terms" style="width: 100%; height: 150px; overflow-y: scroll; display:none;">
          </div>
          <div class="flex flex-center">
            <q-btn icon="done" :loading="loading" :percentage="percentage" color="primary" @click="checkForm" style="width: 100%; height:50px;">
              &nbsp;&nbsp;&nbsp;&nbsp;등록하기
              <span slot="loading">
                <q-spinner-oval class="on-left" />
                등록중...&nbsp;&nbsp;&nbsp;
              </span>
            </q-btn>
            <br>
            <br>
            <br>
            <!-- <q-btn color="grey" icon="fast_rewind" label="돌아가기" @click="goBack" style="width: 100%" /> -->
            <br>
            <br>
          </div>
          <br>
        </td>
      </tr>
    </table>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </q-page>
</template>

<style>
</style>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'product-register',
  components: {
    VueEditor
  },
  data () {
    return {
      loading: false,
      widthOneOne: 0, // 화면너비를 1로 나눈 값
      percentage: 0,
      cate1CdOptions: [], // 카테고리1 옵션
      cate2CdOptions: [], // 카테고리2 옵션
      cate3CdOptions: [], // 카테고리3 옵션
      // htmlForEditor: '<h1>Some initial content</h1>',
      productVo: {
        seq: '',
        cate1_cd: '', // 카테고리1 코드
        cate2_cd: '', // 카테고리2 코드
        cate3_cd: '', // 카테고리3 코드
        title: '', // 상품명
        subtitle: '', // 어필포인트
        price: '', // 가격
        reward_coin: '', // 보상코인
        quantity: '', // 수량
        content: '', // 상세내용
        search_tag: '', // 검색태그
        select_option_type: '', // 옵션 선택형 타입 (1:단독형, 2:조합형)
        select_option_count: '', // 옵션 선택형 갯수
        select_option_name1: '', // 옵션 선택형 옵션명1
        select_option_value1: '', // 옵션 선택형 옵션값1
        select_option_name2: '', // 옵션 선택형 옵션명2
        select_option_value2: '', // 옵션 선택형 옵션값2
        select_option_name3: '', // 옵션 선택형 옵션명3
        select_option_value3: '', // 옵션 선택형 옵션값3
        direct_option_count: '', // 옵션 직접입력형 갯수
        direct_option_name1: '', // 옵션 직접입력형 옵션명1
        direct_option_name2: '', // 옵션 직접입력형 옵션명2
        direct_option_name3: '', // 옵션 직접입력형 옵션명3
        direct_option_name4: '', // 옵션 직접입력형 옵션명4
        direct_option_name5: '', // 옵션 직접입력형 옵션명5
        seller_product_cd: '', // 판매자 상품코드
        seller_barcode: '', // 판매자 바코드
        seller_inner_cd1: '', // 판매자 내부코드1
        seller_inner_cd2: '', // 판매자 내부코드2
        seq_file_mst: '', // 파일(이미지) 마스터 시컨스
        free_delivery_yn: true, // 무료배송
        dawn_delivery_yn: false, // 새벽배송
        image_url: '', // 상품이미지URL
        used_yn: 'N', // 중고여부
        reg_id: '',
        productOptionList: [], // 옵션 선택형 vo
        targetFilesNewName: [] // 등록시 사용할 파일 리스트
      },
      divProductOption: false, // 옵션 div 제어
      divSelectOption: false, // 옵션 선택형
      selectOptionType: '2', // 옵션 선택형 타입 (1:단독형 2:조합형)
      selectOptionCount: '1', // 옵션 선택형 개수
      selectOptionCountOptions: [
        {label: '1개', value: '1'},
        {label: '2개', value: '2'},
        {label: '3개', value: '3'}
      ],
      selectOptionName1: '',
      selectOptionValue1: '',
      selectOptionName2: '',
      selectOptionValue2: '',
      selectOptionName3: '',
      selectOptionValue3: '',
      // selectoption_price_type: '+', // 옵션 선택형 옵션가 타입 + or -
      // selectoption_price_typeOptions: [
      //   {label: '+', value: '1'},
      //   {label: '-', value: '2'}
      // ],
      selectOptionList: [], // 옵션 선택형 리스트
      divDirectOption: false, // 옵션 직접입력형
      directOptionCount: '1', // 옵션 직접입력형 개수
      directOptionCountOptions: [
        {label: '1개', value: '1'},
        {label: '2개', value: '2'},
        {label: '3개', value: '3'},
        {label: '4개', value: '4'},
        {label: '5개', value: '5'}
      ],
      directOptionName1: '',
      directOptionName2: '',
      directOptionName3: '',
      directOptionName4: '',
      directOptionName5: '',
      divSellerCode: false, // 판매자코드 div 제어
      terms: '',
      term1: '[ 상품주요정보 ]<br><br>상품주요정보는 상품 상세내용에 작성합니다.<br><br>',
      term2: '[ 상품정보제공고시 ]<br><br>온라인에서는 "전자상거래 등에서의 소비자보호에 관한 법률"에 따라 상품에 대한 정보를 소비자에게 제공(표시)하도록 되어 있습니다. metashopse.com의 상품정보제공고시 역시 필수정보로, 상품 상세정보에 자세한 내용을 작성합니다.<br><br>',
      term3: '[ 배송 ]<br><br>배송 관련 내용은 상품 상세내용에 작성합니다. 반드시 상품가격에 배송비를 포함하여 작성합니다.<br><br>',
      term4: '[ 반품교환 ]<br><br>전자상거래 등에서의 소비자보호에 관한 법률에 따라 청약철회(반품/교환) 방해 행위 적발 시, 이용정지 또는 관련 법에 의거하여 제재될 수 있습니다. 또한, 법에서 규정하는 청약철회 사유를 제외한 판매자의 임의적인 안내는 법에 따라서 인정되지 않을 수 있습니다. 반품/교환에 대한 내용은 상품 상세내용에 작성합니다.<br><br>',
      term5: '[ A/S 및 특이사항 ]<br><br><br>A/S 전화번호는 각 상품 상세페이지에 작성합니다.<br><br>■ 청약철회(교환/반품/환불) 관련 판매자 준수사항<br>metashopse.com 판매자는 전자상거래법 상 청약철회 기준을 숙지하고 준수하여 판매활동을 해야 합니다.<br>1. 청약철회 가능 기간<br> · 단순/변심의 경우 상품을 수령한 날로부터 7일 이내<br> · 표시광고내용 또는 계약내용과 다르게 이행된 경우 상품을 수령한 날로부터 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내<br>2. 구매자의 청약철회가 제한되는 경우<br> · 구매자에게 책임 있는 사유로 재화등이 멸실 또는 훼손된 경우. 다만, 재화등의 내용을 확인하기 위하여 포장 등을 훼손한 경우를 제외<br> · 구매자의 사용 또는 일부 소비에 의하여 재화등의 가치가 현저히 감소한 경우<br> · 시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의 가치가 현저히 감소한 경우<br> · 복제가 가능한 재화등의 포장을 훼손한 경우<br> · 개별 주문 생산되는 재화 등 청약철회시 판매자에게 회복할 수 없는 피해가 예상되어 소비자의 사전 동의를 얻은 경우<br>3. 카테고리 상품별 청약철회 주의사항<br><br>■ 패션의류 & 패션잡화 청약철회(교환/반품/환불) 판매자 준수사항<br>패션의류<br>가. 결제대금 환급을 충전금(포인트 등)으로만 전환하는 행위<br> · 반품 시, 환불 불가능하며 충전금(포인트 등)으로 처리<br> · 원칙상 환불은 불가하며 상품 교환이나 충전금(포인트 등)으로 처리<br>나. 특정품에 대해 교환/환불이 불가하다고 규정하는 행위<br> · 흰옷, 가방, 액세서리는 교환/반품 불가<br> · 니트류, 화이트/아이보리 색상 제품은 교환/반품 불가<br> · 1:1 오더 제품이기에 교환/반품 불가 (실제 기성품으로 재판매 가능)<br> · 쉬폰/실크 등 손상이 쉬운 질감의 제품은 교환/반품 불가<br> · 가죽제품 등은 교환/반품 불가<br> · 세일상품은 교환/반품 불가<br> · 모니터 해상도 차이로 색상, 재질이 다르게 보여진 경우 이에 대한 이유로 교환/반품 불가<br>다. 반품/교환을 1회(횟수 제한)에 한정한다고 규정하는 행위<br> · 반품/교환은 1회에 한해 가능<br>라. 청약철회 기한을 임의로 규정하는 행위<br> · 상품을 받은 후 2일 이내에 신청하지 않을 경우 교환/반품 불가<br> · 교환/반품은 상품수령 후 2일 내 전화로 접수하고 5일 내 상품이 도착해야 함<br> · 사전에 판매자와 협의하지 않을 경우 반품 불가<br> · 환불은 불가하며 교환만 가능<br>※ 참고. 청약철회 위반 시 처벌 규정<br> · 시정조치 명령, 1천만원 이하의 과태료<br>(전자상거리 등에서의 소비자보호에 관한 법률 제21조 제1항 제1호 위반)<br><br>',
      selectedTerm: '',
      termShow: false,
      firstFileName: '',
      targetFiles: [],
      targetFilesNewName: [],
      numOfTargetFiles: 0,
      seqFileMst: '' // 파일 마스터 SEQ
    }
  },
  created: function () {
    // 사용자 역할 타입 설정 S:SELLER(판매자) B:BUYER(구매자)
    this.$store.state.USER_ROLL_TYPE = 'S'

    this.widthOneOne = window.innerWidth
    if (this.$store.state.device === 'P') {
      this.widthOneOne = window.innerWidth - 800
    }
    // 파일 마스터 seq 취득
    this.$axios({
      url: this.$store.state.apiServerIp + '/api/common/insertFileMst',
      method: 'GET' })
      .then((result) => {
        this.seqFileMst = result.data // 파일 마스터 SEQ 설정
        console.log('this.seqFileMst: ' + this.seqFileMst)
      })
      .catch((err) => {
        console.log(err)
        // this.$q.notify(err)
      })

    // 카테고리1 리스트 조회
    this.$axios.get(this.$store.state.apiServerIp + '/api/category/selectCategory1OptionList')
      .then((result) => {
        // console.log(JSON.stringify(result.data))
        // 카테고리1 리스트 설정
        this.cate1CdOptions = result.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    sumQuantity () { // 옵션 선택형 조합형 재고수량 변경시 총 수량 계산 후 설정
      let sumQuantity = 0
      for (let i = 0; i < this.selectOptionList.length; i++) {
        sumQuantity += this.selectOptionList[i].option_quantity
      }
      this.productVo.quantity = sumQuantity
    },
    changeSelectOptionType () { // 옵션 선택형 타입(단독형 조합형) 변경 이벤트 처리
      this.selectOptionList = []
      this.applySelectOption()
    },
    deleteSelectOptionRow (index) { // row 삭제
      this.selectOptionList.splice(index, 1)
    },
    applySelectOption () { // 옵션 선택형 적용 버튼 클릭
      // 옵션명, 옵션값 입력 체크
      if (!this.checkSelectOptionField()) {
        return
      }

      let optionValue1Array = []
      let optionValue2Array = []
      let optionValue3Array = []

      optionValue1Array = this.selectOptionValue1.split(',')
      if (this.selectOptionCount > '1') {
        optionValue2Array = this.selectOptionValue2.split(',')
      }
      if (this.selectOptionCount > '2') {
        optionValue3Array = this.selectOptionValue3.split(',')
      }

      this.selectOptionList = [] // 옵션 선택형 리스트 초기화

      // 옵션 선택형 row 생성
      if (this.selectOptionCount === '1') {
        for (let i = 0; i < optionValue1Array.length; i++) {
          let optionValue1 = optionValue1Array[i]
          let selectOptionInfo = {} // row
          selectOptionInfo.option_name1 = this.selectOptionName1
          selectOptionInfo.option_value1 = optionValue1
          selectOptionInfo.option_status = '1'
          selectOptionInfo.use_yn = 'Y'
          if (this.selectOptionType === '2') { // 조합형
            selectOptionInfo.option_price_type = '+'
            selectOptionInfo.option_price = 0
            selectOptionInfo.option_quantity = 0
          }
          this.selectOptionList.push(selectOptionInfo)
        }
      } else if (this.selectOptionCount === '2') {
        for (let i = 0; i < optionValue1Array.length; i++) {
          let optionValue1 = optionValue1Array[i]
          for (let j = 0; j < optionValue2Array.length; j++) {
            let optionValue2 = optionValue2Array[j]
            let selectOptionInfo = {} // row
            selectOptionInfo.option_name1 = this.selectOptionName1
            selectOptionInfo.option_name2 = this.selectOptionName2
            selectOptionInfo.option_value1 = optionValue1
            selectOptionInfo.option_value2 = optionValue2
            selectOptionInfo.option_status = '1'
            selectOptionInfo.use_yn = 'Y'
            if (this.selectOptionType === '2') { // 조합형
              selectOptionInfo.option_price_type = '+'
              selectOptionInfo.option_price = 0
              selectOptionInfo.option_quantity = 0
            }
            this.selectOptionList.push(selectOptionInfo)
          }
        }
      } else if (this.selectOptionCount === '3') {
        for (let i = 0; i < optionValue1Array.length; i++) {
          let optionValue1 = optionValue1Array[i]
          for (let j = 0; j < optionValue2Array.length; j++) {
            let optionValue2 = optionValue2Array[j]
            for (let k = 0; k < optionValue3Array.length; k++) {
              let optionValue3 = optionValue3Array[k]
              let selectOptionInfo = {} // row
              selectOptionInfo.option_name1 = this.selectOptionName1
              selectOptionInfo.option_name2 = this.selectOptionName2
              selectOptionInfo.option_name3 = this.selectOptionName3
              selectOptionInfo.option_value1 = optionValue1
              selectOptionInfo.option_value2 = optionValue2
              selectOptionInfo.option_value3 = optionValue3
              selectOptionInfo.option_status = '1'
              selectOptionInfo.use_yn = 'Y'
              if (this.selectOptionType === '2') { // 조합형
                selectOptionInfo.option_price_type = '+'
                selectOptionInfo.option_price = 0
                selectOptionInfo.option_quantity = 0
              }
              this.selectOptionList.push(selectOptionInfo)
            }
          }
        }
      }
    },
    showTerms (cd) { // 이용약관 표시
      let selectedTerm = ''
      if (cd === 1) {
        selectedTerm = this.term1
      } else if (cd === 2) {
        selectedTerm = this.term2
      } else if (cd === 3) {
        selectedTerm = this.term3
      } else if (cd === 4) {
        selectedTerm = this.term4
      } else if (cd === 5) {
        selectedTerm = this.term5
      }
      this.terms = '<font size="1" color="grey">' + selectedTerm + '</font>'

      // 보이기/감추기
      if (this.selectedTerm === cd) {
        if (this.termShow) {
          document.getElementById('termsDiv').style.display = 'none'
          this.termShow = false
        } else {
          document.getElementById('termsDiv').style.display = 'block'
          this.termShow = true
        }
      } else {
        document.getElementById('termsDiv').style.display = 'block'
        this.termShow = true
      }
      this.selectedTerm = cd
    },
    selectCategory2List () {
      this.productVo.cate2_cd = '' // 검색전 카테고리2 선택코드 초기화
      this.cate2CdOptions = [] // 검색전 카테고리2 옵션리스트 초기화
      this.productVo.cate3_cd = '' // 검색전 카테고리3 선택코드 초기화
      this.cate3CdOptions = [] // 검색전 카테고리3 옵션리스트 초기화
      this.$axios.get(this.$store.state.apiServerIp + '/api/category/selectCategory2OptionList',
        {params: {cate1_cd: this.productVo.cate1_cd}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // 카테고리2 리스트 설정
          this.cate2CdOptions = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    selectCategory3List () {
      this.productVo.cate3_cd = '' // 검색전 카테고리3 선택코드 초기화
      this.cate3CdOptions = [] // 검색전 카테고리3 옵션리스트 초기화
      this.$axios.get(this.$store.state.apiServerIp + '/api/category/selectCategory3OptionList',
        {params: {cate1_cd: this.productVo.cate1_cd, cate2_cd: this.productVo.cate2_cd}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // 카테고리3 리스트 설정
          this.cate3CdOptions = result.data
          if (result.data.length === 1) { // 소분류가 1개밖에 없으면 선택으로 설정
            this.productVo.cate3_cd = '01'
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData()
      formData.append('file', file)

      this.$axios({
        url: this.$store.state.apiServerIp + '/api/common/uploadImage',
        method: 'POST',
        data: formData
      })
        .then((result) => {
          let url = result.data // Get url from response
          console.log('ImageURL : ' + url)
          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    filterFiles (files) {
      const MAX_FILE_SIZE = this.$store.state.UPLOAD_FILE_SIZE_LIMIT * 1024 * 1024 // = 4M
      // returns an Array containing allowed files
      return files.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '이미지 사이즈는 4MB 까지!',
            icon: 'notifications_active'
          })
        }
        return file.size <= MAX_FILE_SIZE
      })
    },
    fileAdded (files) {
      // 파일이 추가되었을 때
      for (let i = 0; i < files.length; i++) {
        // console.log(files[0].size)
        let file = files[i]
        this.targetFiles.push(file.name)
      }
      console.log(this.targetFiles)
    },
    fileCanceled (file) {
      // 파일이 취소되었을 때
      console.log(file.name)
      this.targetFiles = this.arrayRemove(this.targetFiles, file.name)
      console.log(this.targetFiles)
    },
    arrayRemove (arr, value) {
      // 배열에서 value를 삭제한다
      return arr.filter(function (ele) {
        return ele !== value
      })
    },
    checkForm () { // 상품 등록 전 정합성 체크
      // console.log('업로드 대상 파일 갯수: ' + this.targetFiles.length)
      if (this.productVo.cate1_cd === '') {
        // 상품 대분류 입력 체크
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '상품 대분류를 선택해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.productVo.cate2_cd === '') {
        // 상품 중분류 입력 체크
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '상품 중분류를 선택해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.productVo.cate3_cd === '') {
        // 상품 소분류 입력 체크
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '상품 소분류를 선택해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.productVo.title === '') {
        // 제목 입력 체크
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '제목을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.productVo.subtitle === '') {
        // 어필 포인트 입력 체크
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '어필 포인트를 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.productVo.price === '' || this.productVo.price < 1) {
        // 판매가격 체크
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '판매가격을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.productVo.reward_coin === '' || this.productVo.reward_coin < 1) {
        // 보상원더 체크
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '보상원더를 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.productVo.quantity === '' || this.productVo.quantity < 1) {
        // 수량 체크
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '수량을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.targetFiles.length < 1) {
        // 파일 1개 이상인지 체크
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '상품 대표사진을 등록해주세요.',
          icon: 'notifications_active'
        })
        return
      }

      // 옵션 체크
      if (this.divProductOption) { // 옵션 true인 경우
        if (this.divSelectOption) { // 선택형 true인 경우
          // 선택형 옵션명1, 선택형 옵션값1 체크
          if (this.selectOptionName1 === '') {
            // 선택형 옵션명1 입력 체크
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: '선택형 옵션명1을 입력해주세요.',
              icon: 'notifications_active'
            })
            return
          }
          if (this.selectOptionValue1 === '') {
            // 선택형 옵션값1 입력 체크
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: '선택형 옵션값1을 입력해주세요.',
              icon: 'notifications_active'
            })
            return
          }
          if (this.selectOptionCount > 1) { // 선택형 옵션명 개수가 1보다 크면
            // 선택형 옵션명2, 선택형 옵션값2 체크
            if (this.selectOptionName2 === '') {
              // 선택형 옵션명2 입력 체크
              this.$q.notify({
                color: 'primary',
                position: 'top',
                message: '선택형 옵션명2을 입력해주세요.',
                icon: 'notifications_active'
              })
              return
            }
            if (this.selectOptionValue2 === '') {
              // 선택형 옵션값2 입력 체크
              this.$q.notify({
                color: 'primary',
                position: 'top',
                message: '선택형 옵션값2을 입력해주세요.',
                icon: 'notifications_active'
              })
              return
            }
          }
          if (this.selectOptionCount > 2) { // 선택형 옵션명 개수가 2보다 크면
            // 선택형 옵션명3, 선택형 옵션값3 체크
            if (this.selectOptionName3 === '') {
              // 선택형 옵션명3 입력 체크
              this.$q.notify({
                color: 'primary',
                position: 'top',
                message: '선택형 옵션명3을 입력해주세요.',
                icon: 'notifications_active'
              })
              return
            }
            if (this.selectOptionValue3 === '') {
              // 선택형 옵션값3 입력 체크
              this.$q.notify({
                color: 'primary',
                position: 'top',
                message: '선택형 옵션값3을 입력해주세요.',
                icon: 'notifications_active'
              })
              return
            }
          }

          // 선택형 옵션 리스트 정합성 체크
          if (this.selectOptionList == null || this.selectOptionList.length < 1) {
            // 선택형 옵션 리스트 체크
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: '선택형 옵션을 확인해주세요.',
              icon: 'notifications_active'
            })
            return
          }
          /*
          for (let i = 0; i < this.selectOptionList.length; i++) {
            let quantity = this.selectOptionList[i].option_quantity;
          }
          */
          this.productVo.productOptionList = this.selectOptionList // 옵션 선택형 리스트 설정
        }
        if (this.divDirectOption) { // 직접입력형 true인 경우
          if (this.directOptionName1 === '') {
            // 직접입력형 옵션명1 입력 체크
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: '직접입력형 옵션명1을 입력해주세요.',
              icon: 'notifications_active'
            })
            return
          }
          if (this.directOptionCount > 1) { // 직접입력형 옵션명 개수가 1보다 크면
            if (this.directOptionName2 === '') {
              // 직접입력형 옵션명2 입력 체크
              this.$q.notify({
                color: 'primary',
                position: 'top',
                message: '직접입력형 옵션명2를 입력해주세요.',
                icon: 'notifications_active'
              })
              return
            }
          }
          if (this.directOptionCount > 2) { // 직접입력형 옵션명 개수가 2보다 크면
            if (this.directOptionName3 === '') {
              // 직접입력형 옵션명3 입력 체크
              this.$q.notify({
                color: 'primary',
                position: 'top',
                message: '직접입력형 옵션명3을 입력해주세요.',
                icon: 'notifications_active'
              })
              return
            }
          }
          if (this.directOptionCount > 3) { // 직접입력형 옵션명 개수가 3보다 크면
            if (this.directOptionName4 === '') {
              // 직접입력형 옵션명4 입력 체크
              this.$q.notify({
                color: 'primary',
                position: 'top',
                message: '직접입력형 옵션명4를 입력해주세요.',
                icon: 'notifications_active'
              })
              return
            }
          }
          if (this.directOptionCount > 4) { // 직접입력형 옵션명 개수가 4보다 크면
            if (this.directOptionName5 === '') {
              // 직접입력형 옵션명5 입력 체크
              this.$q.notify({
                color: 'primary',
                position: 'top',
                message: '직접입력형 옵션명5를 입력해주세요.',
                icon: 'notifications_active'
              })
              return
            }
          }
        }
      }

      // 옵션 정보 상품vo에 설정
      if (this.divProductOption) { // 옵션 true인 경우
        if (this.divSelectOption) { // 선택형 true인 경우
          this.productVo.select_option_name1 = this.selectOptionName1 // 옵션 선택형 옵션명1
          this.productVo.select_option_value1 = this.selectOptionValue1 // 옵션 선택형 옵션값1
          if (this.selectOptionCount > 1) { // 선택형 옵션명 개수가 1보다 크면
            this.productVo.select_option_name2 = this.selectOptionName2 // 옵션 선택형 옵션명2
            this.productVo.select_option_value2 = this.selectOptionValue2 // 옵션 선택형 옵션값2
          }
          if (this.selectOptionCount > 2) { // 선택형 옵션명 개수가 2보다 크면
            this.productVo.select_option_name3 = this.selectOptionName3 // 옵션 선택형 옵션명3
            this.productVo.select_option_value3 = this.selectOptionValue3 // 옵션 선택형 옵션값3
          }
        }
        if (this.divDirectOption) { // 직접입력형 true인 경우
          this.productVo.direct_option_name1 = this.directOptionName1 // 옵션 직접입력형 옵션명1
          if (this.directOptionCount > 1) { // 직접입력형 옵션명 개수가 1보다 크면
            this.productVo.direct_option_name2 = this.directOptionName2 // 옵션 직접입력형 옵션명2
          }
          if (this.directOptionCount > 2) { // 직접입력형 옵션명 개수가 2보다 크면
            this.productVo.direct_option_name3 = this.directOptionName3 // 옵션 직접입력형 옵션명3
          }
          if (this.directOptionCount > 3) { // 직접입력형 옵션명 개수가 3보다 크면
            this.productVo.direct_option_name4 = this.directOptionName4 // 옵션 직접입력형 옵션명4
          }
          if (this.directOptionCount > 4) { // 직접입력형 옵션명 개수가 4보다 크면
            this.productVo.direct_option_name5 = this.directOptionName5 // 옵션 직접입력형 옵션명5
          }
        }
      }

      // 등록 처리 시작
      this.uploadFiles()
    },
    uploadFiles () {
      // 등록 시작
      this.loading = true
      this.percentage = 0
      // 파일 업로드 시작
      // 업로드 완료시 화면 이동 (fileUploaded에서)
      this.$refs.uploaderObj.upload()
    },
    fileUploaded (file, xhr) {
      // 이미지 업로드가 완료되면 이미지별로 각각 호출되는 메소드
      // let fileName = file.name
      // let fileSize = file.size
      // let fileType = file.type
      let fileNameNew = file.xhr.responseText
      for (let i = 0; i < this.targetFiles.length; i++) {
        if (this.targetFiles[i] === file.name) {
          this.targetFilesNewName[i] = fileNameNew
          break
        }
      }
      this.numOfTargetFiles++
      if (this.numOfTargetFiles === this.targetFiles.length) {
        // 업로드 전체 완료시 상품 등록
        this.insertProduct()
      }
    },
    // ■ 상품 등록
    insertProduct () {
      this.productVo.seq_file_mst = this.seqFileMst
      this.productVo.image_url = this.targetFilesNewName[0]
      this.productVo.targetFilesNewName = this.targetFilesNewName

      if (this.divProductOption) { // 옵션 설정이 true인 경우
        if (this.divSelectOption) { // 선택형
          this.productVo.select_option_type = this.selectOptionType // 단독형 or 조합형
          this.productVo.select_option_count = this.selectOptionCount // 선택형 옵션 갯수
        } else { // 선택형 옵션 없을 경우
          this.productOptionList = [] // 옵션리스트 초기화
          this.productVo.select_option_type = '' // 단독형 or 조합형
          this.productVo.select_option_count = '' // 선택형 옵션 갯수
          this.productVo.select_option_name1 = ''
          this.productVo.select_option_value1 = ''
          this.productVo.select_option_name2 = ''
          this.productVo.select_option_value2 = ''
          this.productVo.select_option_name3 = ''
          this.productVo.select_option_value3 = ''
        }
        if (this.divDirectOption) { // 직접입력형
          this.productVo.direct_option_count = this.directOptionCount // 직접입력형 옵션 갯수
        } else {
          this.productVo.direct_option_count = '' // 직접입력형 옵션 갯수 초기화
          this.productVo.direct_option_name1 = ''
          this.productVo.direct_option_name2 = ''
          this.productVo.direct_option_name3 = ''
          this.productVo.direct_option_name4 = ''
          this.productVo.direct_option_name5 = ''
        }
      } else { // 옵션 설정이 false인 경우 - 옵션 전부 초기화
        this.productOptionList = [] // 옵션리스트 초기화
        this.productVo.select_option_type = '' // 단독형 or 조합형
        this.productVo.select_option_count = '' // 선택형 옵션 갯수
        this.productVo.select_option_name1 = ''
        this.productVo.select_option_value1 = ''
        this.productVo.select_option_name2 = ''
        this.productVo.select_option_value2 = ''
        this.productVo.select_option_name3 = ''
        this.productVo.select_option_value3 = ''
        this.productVo.direct_option_count = '' // 직접입력형 옵션 갯수 초기화
        this.productVo.direct_option_name1 = ''
        this.productVo.direct_option_name2 = ''
        this.productVo.direct_option_name3 = ''
        this.productVo.direct_option_name4 = ''
        this.productVo.direct_option_name5 = ''
      }

      // 상품 등록
      this.$axios({
        url: this.$store.state.apiServerIp + '/api/product/insertProduct',
        method: 'POST',
        data: this.productVo })
        .then((result) => {
          this.loading = false // 등록 버튼 액션 중단
          this.$q.notify({
            color: 'info',
            position: 'top',
            message: '상품이 등록되었습니다.',
            icon: 'notifications_active'
          })
          this.$router.push('/seller/product')
        })
        .catch((err) => {
          console.log(err)
          // this.$q.notify(err)
          this.loading = false
        })
    },
    checkSelectOptionField () {
      if (this.selectOptionName1 === '') {
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '옵션명을 입력해주세요.',
          icon: 'notifications_active'
        })
        return false
      }
      if (this.selectOptionValue1 === '') {
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '옵션값을 입력해주세요.',
          icon: 'notifications_active'
        })
        return false
      }
      if (this.selectOptionCount > 1) {
        if (this.selectOptionName2 === '') {
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '옵션명을 입력해주세요.',
            icon: 'notifications_active'
          })
          return false
        }
        if (this.selectOptionValue2 === '') {
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '옵션값을 입력해주세요.',
            icon: 'notifications_active'
          })
          return false
        }
      }
      if (this.selectOptionCount > 2) {
        if (this.selectOptionName3 === '') {
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '옵션명을 입력해주세요.',
            icon: 'notifications_active'
          })
          return false
        }
        if (this.selectOptionValue3 === '') {
          this.$q.notify({
            color: 'primary',
            position: 'top',
            message: '옵션값을 입력해주세요.',
            icon: 'notifications_active'
          })
          return false
        }
      }
      return true
    },
    goBack () {
      if (this.productVo.title !== '' || this.productVo.content !== '') {
        this.$q.dialog({
          title: '돌아가기',
          message: '입력 항목이 초기화됩니다.',
          ok: true,
          cancel: true
        }).then(() => {
          // 라우터 백 패스 설정
          let path = this.$store.state.ROUTER_FROM_PATH[this.$store.state.ROUTER_FROM_PATH.length - 1]
          // 라우터 백 패스 1개 삭제
          this.$store.state.ROUTER_FROM_PATH.splice(this.$store.state.ROUTER_FROM_PATH.length - 1, 1)
          // 뒤로가기 여부 - true일 경우 라우터 패스를 저장 안함, goBack() 함수 내에서 true로 설정, 라우터에서 false로 초기화
          this.$store.state.ROUTER_IS_MOVE_BACK = true
          // 라우터 백 패스로 이동
          this.$router.push(path)
        }).catch(() => {
          // this.$q.notify(`조심해라..`)
        })
      } else {
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
}
</script>
<style>
</style>
