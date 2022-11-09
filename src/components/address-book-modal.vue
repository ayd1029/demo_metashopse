<template>
  <q-modal v-model="addressBookModal" :content-css="{minWidth: '40vw', minHeight: '60vh'}">

    <addressRegisterModal ref="addressRegisterModal" />
    <addressModifyModal ref="addressModifyModal" />

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense icon="place" readonly />
        <!-- <img src="statics/icons/logo.png" style="width: 30px; height: 30px;"> -->
        <q-toolbar-title>주소록</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <br>
      <table align="center" border="0" width="90%">
        <tr>
          <td colspan="3"><q-btn outline color="primary" @click="showAddressRegisterModal" icon="add" label="주소 추가" style="width:100%; height: 50px" /></td>
        </tr>
      </table>

      <div v-for="(item, index) in $store.state.addressList" :key="item.seq">
        <br>
        <table align="center" border="0" width="90%">
          <thead>
            <th width="25%" />
            <th width="25%" />
            <th width="25%" />
            <th width="25%" />
          </thead>
          <tbody>
            <tr>
              <td align="left" colspan="3"><font size="3" color="black"><b>{{ item.title }}</b></font></td>
              <td align="right" v-if="item.default_yn === 'true'"><font size="2" color="green"><b>기본배송지</b></font></td>
              <td align="right" v-else></td>
            </tr>
            <tr>
              <td colspan="4"><font size="3" color="black"><b>{{ item.to_name }}</b></font></td>
            </tr>
            <tr>
              <td colspan="4"><font size="2" color="black">{{ item.address1 }}&nbsp;{{ item.address2 }}</font></td>
            </tr>
            <tr>
              <td colspan="4"><font size="3" color="black">{{ item.mobile_no }}</font></td>
            </tr>
            <tr>
              <td colspan="4"><font size="3" color="black">{{ item.message }}</font></td>
            </tr>
            <tr>
              <td><q-btn outline dense color="blue" label="수정" @click="showAddressModifyModal(index)" size="md" style="width:60px;" /></td>
              <td></td>
              <td></td>
              <td align="right"><q-btn dense color="primary" label="선택" @click="sendAddressInfo(index)" size="md" style="width:60px;" /></td>
            </tr>
          </tbody>
        </table>
      </div>

    </q-modal-layout>
  </q-modal>
</template>

<style>
</style>

<script>

export default {
  name: 'address-book-modal',
  data () {
    return {
      uid: '',
      addressVo: {
        uid: this.$store.state.userVo.uid
      },
      loading: false,
      percentage: 0,
      addressBookModal: false
    }
  },
  created: function () {
  },
  methods: {
    show () {
      // 주소록 리스트 조회
      this.$axios.post(this.$store.state.apiServerIp + '/api/address/selectAddressList', this.addressVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$store.state.addressList = result.data
          // this.$emit('callback-login', this.$store.state.userVo.uid)
        })
        .catch((err) => {
          console.log(err)
        })
      this.addressBookModal = true
    },
    showAddressRegisterModal () {
      // 주소 등록 화면 표시
      this.$refs.addressRegisterModal.show()
      // this.$router.push('/address/addressRegister')
    },
    showAddressModifyModal (index) {
      // 주소 수정 화면 표시
      let addressInfo = JSON.parse(JSON.stringify(this.$store.state.addressList[index]))
      if (addressInfo.default_yn === 'true') {
        addressInfo.default_yn = true
      } else {
        addressInfo.default_yn = false
      }
      this.$refs.addressModifyModal.addressVo = addressInfo
      this.$refs.addressModifyModal.show()
    },
    // 주소 선택시 주소정보 전송
    sendAddressInfo (index) {
      // 부모창의 콜백함수 호출
      this.$emit('callback-address-book', JSON.parse(JSON.stringify(this.$store.state.addressList[index])))
      this.close()
    },
    close () {
      this.addressBookModal = false
    }
  }
}
</script>
