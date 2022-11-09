<template>
  <q-modal v-model="addressRegisterModal" :content-css="{minWidth: '48vw', minHeight: '50vh'}">

    <addressSearchModal ref="addressSearchModal" @callback-address-search="callbackAddressSearch" />

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense icon="add_location" readonly />
        <q-toolbar-title>주소 추가</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <table border="0" style="width:90%" align="center" cellpadding="0" cellspacing="10">
        <tr>
          <td width="60%" align="left"><q-input inverted-light color="white" v-model.trim="addressVo.title" stack-label="주소명 *" placeholder="예) 집, 회사 등" maxlength="20" /></td>
          <td width="40%" align="center"><q-checkbox v-model="addressVo.default_yn" color="primary"><font size="2" color="grey">&nbsp;&nbsp;기본배송지</font></q-checkbox></td>
        </tr>
        <tr>
          <td colspan="2"><q-input inverted-light color="white" v-model.trim="addressVo.to_name" stack-label="받는 사람 *" maxlength="20" /></td>
        </tr>
        <tr>
          <td><q-input inverted-light color="white" v-model.trim="addressVo.post_no" @click="showAddressSearchModal" class="" readonly /></td>
          <td align="right"><q-btn icon="search" color="primary" label="찾기" @click="showAddressSearchModal" /></td>
        </tr>
        <tr v-if="addressVo.post_no !== ''">
          <td colspan="2">
            <font size="2" color="grey">{{ addressVo.address1 }}</font>
          </td>
        </tr>
        <tr v-if="addressVo.post_no !== ''">
          <td colspan="2"><q-input inverted-light color="white" v-model.trim="addressVo.address2" stack-label="상세주소" /></td>
        </tr>
        <tr>
          <td colspan="2"><q-input inverted-light color="white" v-model.trim="addressVo.mobile_no" stack-label="휴대폰번호 *" placeholder="예) 01012345678" maxlength="11" /></td>
        </tr>
        <tr v-if="addressVo.mobile_no !== ''">
          <td colspan="2"><q-input inverted-light color="white" v-model.trim="addressVo.tel_no" stack-label="기타 연락처" placeholder="필요하신 분만 적어주세요." maxlength="15" /></td>
        </tr>
        <tr>
          <td colspan="2"><q-select v-model="addressVo.message_cd" stack-label="배송 요청사항" :options="$store.state.addressMessageCdOptions" @input="setMessage" inverted-light color="white" /></td>
        </tr>
        <tr v-if="addressVo.message_cd === '0'">
          <td colspan="2"><q-input inverted color="blue" v-model.trim="addressVo.message" stack-label="요청사항 직접입력" placeholder="요청사항을 직접 적어주세요." maxlength="100" /></td>
        </tr>
        <tr>
          <td colspan="2"><q-input inverted-light color="white" v-model.trim="addressVo.door_pwd" stack-label="공동현관 출입번호" placeholder="필요하신 분만 적어주세요. 예) #1234" maxlength="10" /></td>
        </tr>
        <tr>
          <td colspan="2">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2">
            <q-btn color="primary" @click="insertAddress" icon="done" label="동의하고 추가하기" style="width: 100%; height:50px" :loading="loading" :percentage="percentage">
              <span slot="loading">
                <q-spinner-oval class="on-left" />
                저장중...
              </span>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td></td>
        </tr>
        <tr>
          <td colspan="2"><font size="1" color="grey">입력된 공동출입문번호는 배송을 위해 필요한 정보로, 향후 배송을 위해 필요한 기간 동안 보관하는데 동의합니다.</font></td>
        </tr>
      </table>
      <br>
      <br>
      <br>
    </q-modal-layout>
  </q-modal>
</template>

<style>
</style>

<script>

export default {
  name: 'address-register-modal',
  data () {
    return {
      uid: '',
      addressVo: {
        // seq: '',
        // uid: '',
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
        default_yn: true
      },
      loading: false,
      percentage: 0,
      addressRegisterModal: false
    }
  },
  created: function () {
  },
  methods: {
    show () {
      // 항목 초기화
      this.addressVo.title = ''
      this.addressVo.to_name = ''
      this.addressVo.address1 = ''
      this.addressVo.address2 = ''
      this.addressVo.post_no = ''
      this.addressVo.mobile_no = ''
      this.addressVo.tel_no = ''
      this.addressVo.message_cd = ''
      this.addressVo.message = ''
      this.addressVo.door_pwd = ''
      this.addressVo.default_yn = true

      this.addressRegisterModal = true
    },
    // 주소검색 콜백
    callbackAddressSearch (selectedAddressVo) {
      this.addressVo.address1 = selectedAddressVo.roadAddr
      this.addressVo.post_no = selectedAddressVo.zipNo
    },
    setMessage () { // 배송 요청사항 설정
      if (this.addressVo.message_cd === '0') { // 직접입력일 경우
        this.addressVo.message = ''
      } else { // 그 외에는 선택한 문구를 메세지로 설정
        for (let i = 0; i < this.$store.state.addressMessageCdOptions.length; i++) {
          let optionValue = this.$store.state.addressMessageCdOptions[i].value
          if (optionValue === this.addressVo.message_cd) {
            this.addressVo.message = this.$store.state.addressMessageCdOptions[i].label
          }
        }
      }
    },
    showAddressSearchModal () {
      // 주소 검색 화면으로 이동
      this.$refs.addressSearchModal.show()
    },
    // 주소 등록
    insertAddress () {
      // 정합성 체크
      if (this.addressVo.title === '') { // 주소명 입력
        this.$q.notify({
          color: 'primary',
          position: 'left',
          message: '주소명을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.addressVo.to_name === '') { // 받는 사람 입력
        this.$q.notify({
          color: 'primary',
          position: 'left',
          message: '받는 사람을 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.addressVo.post_no === '') { // 주소 입력
        this.$q.notify({
          color: 'primary',
          position: 'left',
          message: '주소를 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }
      if (this.addressVo.mobile_no === '') { // 휴대폰번호 입력
        this.$q.notify({
          color: 'primary',
          position: 'left',
          message: '휴대폰번호를 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }

      // 주소 등록
      this.loading = true
      this.$axios.post(this.$store.state.apiServerIp + '/api/address/insertAddress', this.addressVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$store.state.addressList = result.data // 등록후 조회한 주소 리스트 설정
          this.loading = false
          this.addressRegisterModal = false
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    close () {
      this.addressRegisterModal = false
    }
  }
}
</script>
