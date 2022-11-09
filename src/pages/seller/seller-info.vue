<template>
  <q-page class="flex flex-center">

    <addressBookModal ref="addressBookModal" @callback-address-book="callbackAddressBook" />
    <sellerManagerModal ref="sellerManagerModal" @callback-seller-manager="callbackSellerManager" />

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>판매자 정보</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
      </q-toolbar>
    </q-layout-header>

    <div class="no_refresh" style="width: 90%" >
      <br>
      <div v-if="sellerList.length > 1">
        <q-select v-model="selectedSellerSid" inverted-light color="white" stack-label="주사용 판매자" :options="sellerListOptions" @input="chageSellerInfo"/>
        <br>
      </div>
      <!-- 기본 정보 -->
      <q-chip color="primary" square icon="account_box" style="width:130px">기본 정보</q-chip>
      <br>
      <br>
      <font size="2" color="grey">판매유형 :&nbsp;&nbsp;&nbsp;</font>
      <q-radio v-model="sellerVo.seller_type" val="1" @input="changeSellerType"><font size="3">&nbsp;&nbsp;&nbsp;개인</font></q-radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <q-radio v-model="sellerVo.seller_type" val="2" @input="changeSellerType"><font size="3">&nbsp;&nbsp;&nbsp;사업자</font></q-radio>
      <br>
      <br>
      <q-input v-model.trim="sellerVo.seller_name" stack-label="판매자명 * (개인판매자는 반드시 실명을 사용)" placeholder="" maxlength="10" />
      <br>
      <img :src="sellerVo.seller_profile_image" style="width: 130px">
      <br>
      <q-uploader
        stack-label="프로필 이미지 변경"
        ref="uploaderObj"
        url="/api/common/uploadImage"
        hide-upload-button
        :filter="filterFiles"
        @add="fileAdded"
        @uploaded="fileUploaded"
        :additional-fields="[{name: 'seqFileMst', value: 0}]"
      />
      <br>
      <q-input v-model.trim="sellerVo.mobile_no" stack-label="휴대폰번호 *" />
      <br>
      <q-input v-model.trim="sellerVo.email" stack-label="이메일 *" />
      <br>
      <q-input v-model.trim="sellerVo.tel_no" stack-label="전화번호" />
      <br>
      <q-input v-model.trim="sellerVo.fax_no" stack-label="팩스번호" />
      <br>
      <q-select v-model="sellerVo.category1" inverted-light color="white" stack-label="대표 카테고리" :options="cate1CdOptions" />
      <br>
      <br>
      <!-- 정산 정보 -->
      <q-chip color="primary" square icon="attach_money" style="width:130px">정산 정보</q-chip>
      <input type="hidden" v-model="sellerVo.deposit_type" value="1" />
      <br>
      <br>
      <table width="100%">
        <tr>
          <td width="50"><font size="2" color="grey">은행 * : </font></td>
          <td><q-select v-model="sellerVo.deposit_bank_cd" style="width:160px" inverted-light color="white" :options="$store.state.bankCdOptions" /></td>
        </tr>
      </table>
      <br>
      <q-input v-model.trim="sellerVo.deposit_account_no" stack-label="계좌번호 *" type="number" />
      <br>
      <table width="100%">
        <tr>
          <td width="75%"><q-input v-model.trim="sellerVo.deposit_account_nm" stack-label="예금주명 *" placeholder="" maxlength="10" /></td>
          <td width="25%" align="right"><!--<q-btn color="blue" label="인증" @click="checkAccount" :disabled='accountChecked' style="width:80px;" />--></td>
        </tr>
      </table>
      <br>
      <br>
      <!-- 배송 정보 -->
      <q-chip color="primary" square icon="local_shipping" style="width:130px">배송 정보</q-chip>
      <br>
      <br>
      <table width="100%" border="0">
        <thead>
          <th width="25%" />
          <th width="25%" />
          <th width="25%" />
          <th width="25%" />
        </thead>
        <tr>
          <td colspan="3"><q-input v-model="sellerVo.from_address_title" stack-label="출고지 *" readonly hide-underline /></td>
          <td align="right"><q-btn color="blue" label="주소록" @click="showAddressBookModal('FROM')" style="width:80px;" /></td>
        </tr>
        <tr>
          <td colspan="4"><font size="2" color="black">(우 : {{ sellerVo.from_post_no }})&nbsp;{{ sellerVo.from_address1 }}&nbsp;{{ sellerVo.from_address2 }}</font></td>
        </tr>
        <tr>
          <td colspan="2"><font size="2" color="black">연락처1 : {{ sellerVo.from_tel_no1 }}</font></td>
          <td colspan="2"><font size="2" color="black">연락처2 : {{ sellerVo.from_tel_no2 }}</font></td>
        </tr>
      </table>
      <input type="hidden" v-model="sellerVo.from_address1" />
      <input type="hidden" v-model="sellerVo.from_address2" />
      <input type="hidden" v-model="sellerVo.from_post_no" />
      <input type="hidden" v-model="sellerVo.from_tel_no1" />
      <input type="hidden" v-model="sellerVo.from_tel_no2" />
      <br>
      <table width="100%" border="0">
        <thead>
          <th width="25%" />
          <th width="25%" />
          <th width="25%" />
          <th width="25%" />
        </thead>
        <tr>
          <td colspan="3"><q-input v-model="sellerVo.to_address_title" stack-label="반품/교환지 *" readonly hide-underline /></td>
          <td align="right"><q-btn color="blue" label="주소록" @click="showAddressBookModal('TO')" style="width:80px;" /></td>
        </tr>
        <tr>
          <td colspan="4"><font size="2" color="black">(우 : {{ sellerVo.to_post_no }})&nbsp;{{ sellerVo.to_address1 }}&nbsp;{{ sellerVo.to_address2 }}</font></td>
        </tr>
        <tr>
          <td colspan="2"><font size="2" color="black">연락처1 : {{ sellerVo.to_tel_no1 }}</font></td>
          <td colspan="2"><font size="2" color="black">연락처2 : {{ sellerVo.to_tel_no2 }}</font></td>
        </tr>
      </table>
      <input type="hidden" v-model="sellerVo.to_address1" />
      <input type="hidden" v-model="sellerVo.to_address2" />
      <input type="hidden" v-model="sellerVo.to_post_no" />
      <input type="hidden" v-model="sellerVo.to_tel_no1" />
      <input type="hidden" v-model="sellerVo.to_tel_no2" />
      <br>
      <br>

      <!-- 담당자 정보 -->
      <table width="100%" border="0">
        <thead>
          <th width="50%" />
          <th width="50%" />
        </thead>
        <tr>
          <td><q-chip color="primary" square icon="person" style="width:130px">담당자 정보</q-chip></td>
          <td align="right"><q-btn color="blue" label="관리" @click="showSellerManagerModal" style="width:80px;" /></td>
        </tr>
      </table>
      <br>
      <div style="overflow:auto">
        <table border="0" width="360">
          <thead>
            <th width="15%" align="left"><font size="2" color="grey">성명</font></th>
            <th width="25%" align="left"><font size="2" color="grey">아이디</font></th>
            <th width="25%" align="left"><font size="2" color="grey">휴대폰번호</font></th>
            <th width="35%" align="left"><font size="2" color="grey">이메일</font></th>
          </thead>
          <tbody>
            <tr v-for="item in sellerVo.sellerManagerList" :key="item.seq">
              <td><font size="2" color="black">{{ item.name }}</font></td>
              <td><font size="2" color="black">{{ item.uid_manager }}</font></td>
              <td><font size="2" color="black">{{ item.mobile_no }}</font></td>
              <td><font size="2" color="black">{{ item.email }}</font></td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
      <br>
      <br>

      <!-- 사업자 정보 -->
      <div v-if="sellerVo.seller_type === '2'">
        <q-chip color="primary" square icon="store" style="width:130px">사업자 정보</q-chip>
        <br>
        <br>
        <q-input v-model="sellerVo.business_nm" stack-label="상호명" />
        <br>
        <q-input v-model="sellerVo.business_ceo_nm" stack-label="대표자" />
        <br>
        <q-input v-model.trim="sellerVo.business_no" stack-label="사업자번호" />
        <br>
        <q-input v-model.trim="sellerVo.business_sell_no" stack-label="통신판매업신고번호" />
        <br>
        <q-input v-model.trim="sellerVo.business_address1" stack-label="사업장소재지" />
        <br>
        <!--
        <q-input v-model="sellerVo.business_address2" stack-label="사업장소재지2" hide-underline />
        <br>
        <q-input v-model="sellerVo.business_post_no" stack-label="사업장소재지우편번호" hide-underline />
        <br>
        -->
        <q-input v-model.trim="sellerVo.business_tel_no" stack-label="고객센터 전화번호" />
        <br>
        <q-input v-model.trim="sellerVo.business_type" stack-label="업태" />
        <br>
        <q-input v-model.trim="sellerVo.business_item" stack-label="종목" />
        <br>
        <q-input v-model.trim="sellerVo.site_name" stack-label="사이트명" />
        <br>
        <q-input v-model.trim="sellerVo.site_url" stack-label="사이트 URL" />
        <br>
        <br>
        <!-- API KEY 표시 -->
        <table v-if="apiKeyVisibleFlag" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td rowspan="2"><img src="statics/images/logo/logo_api.png" width="55px" style="display:block;"></td>
            <td rowspan="2" width="10"></td>
            <td>
              <font size="2"><b>API KEY</b></font>
              &nbsp;&nbsp;&nbsp;
              <a @click="copyUrl(sellerVo.api_key)" class="cursor-pointer">
                <q-icon name="file_copy" />&nbsp;<font size="2" color="black">복사하기</font>
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a @click="copyUrl(sellerVo.api_key)" class="cursor-pointer">
                <font size="2">{{ sellerVo.api_key }}</font>
              </a>
            </td>
          </tr>
        </table>
        <table v-else border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td rowspan="2"><img src="statics/images/logo/logo_api.png" width="55px" style="display:block;"></td>
            <td rowspan="2" width="10"></td>
            <td>
              <font size="2"><b>API KEY</b></font>
            </td>
          </tr>
          <tr>
            <td>
              <font size="2">
                사업자정보를 등록하시면 표시됩니다.
              </font>
            </td>
          </tr>
        </table>
        <br>
        <br>
        <br>
      </div>
      <q-btn color="primary" @click="updateSeller" icon="done" label="저장하기" style="width: 100%; height:50px" :loading="loading" :percentage="percentage">
        <span slot="loading">
          <q-spinner-oval class="on-left" />
          저장중...
        </span>
      </q-btn>
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
    </div>
  </q-page>
</template>

<style>
</style>

<script>
// import { domain, kakaotalkJsClientId } from '../../global/constants.js'
import Vue from 'vue'
import { VueEditor } from 'vue2-editor'

export default {
  name: 'Product',
  components: {
    VueEditor
  },
  data () {
    return {
      uid: '',
      storeUrl: '',
      cate1CdOptions: [],
      selectedSellerSid: this.$store.state.userVo.sid,
      sellerList: [], // 판매자 리스트 : 매니저의 경우 소속이 복수
      sellerListOptions: [],
      sellerVo: {
        sid: '',
        seller_name: '',
        seller_type: '',
        seller_profile_image: '',
        mobile_no: '',
        tel_no: '',
        fax_no: '',
        email: '',
        from_address1: '',
        from_address2: '',
        from_post_no: '',
        from_tel_no1: '',
        from_tel_no2: '',
        to_address1: '',
        to_address2: '',
        to_post_no: '',
        to_tel_no1: '',
        to_tel_no2: '',
        deposit_type: '',
        deposit_bank_cd: '',
        deposit_bank_nm: '',
        deposit_account_no: '',
        deposit_account_nm: '',
        category1: '',
        business_nm: '',
        business_ceo_nm: '',
        business_no: '',
        business_sell_no: '',
        business_address1: '',
        business_address2: '',
        business_post_no: '',
        business_tel_no: '',
        sellerManagerList: [] // 담당자 정보
      },
      callbackAddressCd: '', // 'FROM':출고지, 'TO':반품/교환지
      loading: false,
      percentage: 0,
      apiKeyVisibleFlag: false, // API 키 표시 여부
      accountChecked: false // 계좌인증 완료시 true
    }
  },
  created: function () {
    // 로그인 체크
    if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
      this.$router.push(this.$store.state.PAGE_LOGIN)
      return
    }
    // 화면 표시
    this.loadPage()

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
    loadPage () {
      this.$q.loading.show() // 로딩표시 시작
      // 판매자 정보 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/seller/selectSellerList')
        .then((result) => {
          // console.log(JSON.stringify(result.data))

          this.sellerList = result.data
          for (let i = 0; i < this.sellerList.length; i++) {
            // 판매자 셀렉트 박스 옵션 설정
            let sellerRow = {}
            sellerRow.label = this.sellerList[i].seller_name
            sellerRow.value = this.sellerList[i].sid
            this.sellerListOptions.push(sellerRow)

            // 주사용 판매자
            if (this.sellerList[i].sid === this.$store.state.userVo.sid) {
              this.sellerVo = this.sellerList[i]
            }
          }

          // API 표시 여부 설정
          this.setApiKeyVisibleFlag(this.sellerVo)

          this.$q.loading.hide() // 로딩표시 종료
        })
        .catch((err) => {
          console.log(err)
          this.$q.loading.hide() // 로딩표시 종료
        })
    },
    // API 표시 여부 설정
    setApiKeyVisibleFlag (sellerVo) {
      // API KEY 표시조건 - 모든 사업자정보 입력 완료
      // 상호명, 대표자, 사업자번호, 통신판매업신고번호, 사업장소재지, 고객센터전화번호, 업태, 종목, 사이트명, 사이트URL
      if (sellerVo.business_nm != null && sellerVo.business_nm !== '' &&
          sellerVo.business_ceo_nm != null && sellerVo.business_ceo_nm !== '' &&
          sellerVo.business_no != null && sellerVo.business_no !== '' &&
          sellerVo.business_sell_no != null && sellerVo.business_sell_no !== '' &&
          sellerVo.business_address1 != null && sellerVo.business_address1 !== '' &&
          sellerVo.business_tel_no != null && sellerVo.business_tel_no !== '' &&
          sellerVo.business_type != null && sellerVo.business_type !== '' &&
          sellerVo.business_item != null && sellerVo.business_item !== '' &&
          sellerVo.site_name != null && sellerVo.site_name !== '' &&
          sellerVo.site_url != null && sellerVo.site_url !== '') {
        this.apiKeyVisibleFlag = true
      } else {
        this.apiKeyVisibleFlag = false
      }
    },
    chageSellerInfo () {
      for (let i = 0; i < this.sellerList.length; i++) {
        // 판매자 정보 전환
        if (this.sellerList[i].sid === this.selectedSellerSid) {
          this.sellerVo = this.sellerList[i]
          return
        }
      }
    },
    // 주소록 호출
    showAddressBookModal (type) {
      this.callbackAddressCd = type // 'FROM':출고지, 'TO':반품/교환지
      this.$refs.addressBookModal.show()
    },
    // 주소록 콜백
    callbackAddressBook (selectedAddressVo) {
      if (this.callbackAddressCd === 'FROM') {
        this.sellerVo.from_address_title = selectedAddressVo.title
        this.sellerVo.from_address1 = selectedAddressVo.address1
        this.sellerVo.from_address2 = selectedAddressVo.address2
        this.sellerVo.from_post_no = selectedAddressVo.post_no
        this.sellerVo.from_tel_no1 = selectedAddressVo.mobile_no
        this.sellerVo.from_tel_no2 = selectedAddressVo.tel_no
      } else if (this.callbackAddressCd === 'TO') {
        this.sellerVo.to_address_title = selectedAddressVo.title
        this.sellerVo.to_address1 = selectedAddressVo.address1
        this.sellerVo.to_address2 = selectedAddressVo.address2
        this.sellerVo.to_post_no = selectedAddressVo.post_no
        this.sellerVo.to_tel_no1 = selectedAddressVo.mobile_no
        this.sellerVo.to_tel_no2 = selectedAddressVo.tel_no
      }
    },
    // 담당자 관리 호출
    showSellerManagerModal () {
      this.$refs.sellerManagerModal.sellerManagerList = this.sellerVo.sellerManagerList
      this.$refs.sellerManagerModal.sellerVo = this.sellerVo
      this.$refs.sellerManagerModal.show()
    },
    // 주소록 콜백
    callbackSellerManager (managerList) {
      this.sellerVo.sellerManagerList = managerList
    },
    filterFiles (files) {
      const MAX_FILE_SIZE = this.$store.state.UPLOAD_FILE_SIZE_LIMIT * 1024 * 1024 // = 4M
      // returns an Array containing allowed files
      return files.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          this.$q.notify('이미지 사이즈는 4MB 까지!')
        }
        return file.size <= MAX_FILE_SIZE
      })
    },
    fileAdded (files) { // 프로필 이미지 변경
      this.$refs.uploaderObj.upload()
    },
    fileUploaded (file, xhr) {
      // 이미지 업로드가 완료되면 호출되는 메소드
      let fileNameNew = file.xhr.responseText
      this.sellerVo.seller_profile_image = fileNameNew // 프로필 이미지 설정
      this.$refs.uploaderObj.reset()
      // 프로필 이미지 수정
      this.$axios.post(this.$store.state.apiServerIp + '/api/seller/updateSellerProfileImage', this.sellerVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changeSellerType () {
      if (this.sellerVo.seller_type === '1') {
        this.labelSellerName = '판매자명'
      } else {
        this.labelSellerName = ''
      }
    },
    checkAccount () {
      this.$q.notify({
        color: 'blue',
        position: 'top',
        message: '계좌인증 완료',
        icon: 'notifications_active'
      })
      this.accountChecked = true
    },
    updateSeller () { // 판매자정보 수정
      // 정합성 체크
      if (this.sellerVo.seller_name === '') { // 판매자명
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '판매자명을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.sellerVo.email === '') { // 이메일
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '이메일을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.sellerVo.mobile_no === '') { // 휴대폰번호
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '휴대폰번호를 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      /*
      if (this.sellerVo.category1 === '') { // 대표 카테고리
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '대표 카테고리를 선택해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      */
      if (this.sellerVo.seller_name === '') { // 판매자명
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '판매자명을 확인해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      // 판매자정보 수정
      this.loading = true
      this.$axios.post(this.$store.state.apiServerIp + '/api/seller/updateSeller', this.sellerVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.notify({
            color: 'blue',
            position: 'top',
            message: result.data.resultMsg,
            icon: 'notifications_active'
          })
          this.loading = false
          // store에 판매자 정보 저장
          this.$store.state.sellerVo = result.data
          this.sellerVo = result.data

          // API 표시 여부 설정
          this.setApiKeyVisibleFlag(this.sellerVo)
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.$q.notify({
            color: 'blue',
            position: 'top',
            message: '등록에 실패했습니다. 항목을 확인해주세요.',
            icon: 'notifications_active'
          })
        })
    },
    // 클립아트로 복사하기
    copyUrl (text) {
      this.$copyText(text).then(function (e) {
        // console.log(e)
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
