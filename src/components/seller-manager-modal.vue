<template>
  <q-modal v-model="sellerManagerModal" :content-css="{minWidth: '25%', minHeight: '35%'}">

    <addressRegisterModal ref="addressRegisterModal" />
    <addressModifyModal ref="addressModifyModal" />

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense icon="person" readonly />
        <!-- <img src="statics/icons/logo.png" style="width: 30px; height: 30px;"> -->
        <q-toolbar-title>담당자 관리</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <table align="center" border="0" width="90%">
        <thead>
          <th width="25%" />
          <th width="25%" />
          <th width="25%" />
          <th width="25%" />
        </thead>
        <tbody>
          <tr>
            <td align="left" colspan="4"><font size="2" color="black">매니저 초대</font></td>
          </tr>
          <tr>
            <td align="left"><font size="2" color="black">아이디</font></td>
            <td align="center"><q-input v-model.trim="invitedUid" color="white" style="width:130px; height:30px;" inverted-light /></td>
            <td align="left" colspan="2">
              <q-btn dense color="green" label="초대하기" @click="sendInviteMessage" size="md" style="width:85px; height:30px;" :loading="loadingInvite" :percentage="percentageInvite">
                <span slot="loading">
                  <q-spinner-oval class="on-left" />
                  초대중...
                </span>
              </q-btn>
            </td>
          </tr>
        </tbody>
      </table>
      <br>
      <q-card-separator />

      <br>
      <div v-for="(item, index) in sellerManagerList" :key="item.seq">
        <table align="center" border="0" width="95%">
          <thead>
            <th width="25%" />
            <th width="25%" />
            <th width="25%" />
            <th width="25%" />
          </thead>
          <tbody>
            <tr>
              <td><font size="2" color="grey">성명</font></td>
              <td><font size="2" color="black">{{ item.name }}</font></td>
              <td><font size="2" color="grey">휴대폰번호</font></td>
              <td><font size="2" color="black">{{ item.mobile_no }}</font></td>
            </tr>
            <tr>
              <td><font size="2" color="grey">아이디</font></td>
              <td><font size="2" color="black">{{ item.uid_manager }}</font></td>
              <td><font size="2" color="grey">이메일</font></td>
              <td><font size="2" color="black">{{ item.email }}</font></td>
            </tr>
            <tr>
              <td><font size="2" color="grey">역할</font></td>
              <td>
                <q-select v-model="item.roll_cd" inverted-light color="white" :options="$store.state.sellerManagerRollCdOptions" style="width:100%; height: 30px;" />
              </td>
              <td><font size="2" color="grey"></font></td>
              <td align="right">
                <q-btn dense color="primary" label="삭제" @click="deleteSellerManager(index)" size="md" style="width:60px; height:28px;" outline />
              </td>
            </tr>
            <tr><td colspan="4"></td></tr>
            <tr><td colspan="4"></td></tr>
            <tr><td colspan="4"></td></tr>
            <tr>
              <td colspan="4"><q-card-separator /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <br>
      <table align="center" border="0" width="90%">
        <tr>
          <td colspan="3">
            <q-btn color="primary" @click="updateSellerManagerList" icon="done" label="저장하기" style="width:100%; height:50px;" :loading="loading" :percentage="percentage">
              <span slot="loading">
                <q-spinner-oval class="on-left" />
                저장중...
              </span>
            </q-btn>
          </td>
        </tr>
      </table>
      <br>

    </q-modal-layout>
  </q-modal>
</template>

<style>
</style>

<script>

export default {
  name: 'seller-manager-modal',
  data () {
    return {
      uid: '',
      sellerVo: {}, // 판매자 정보
      invitedUid: '', // 초대 매니저 아이디
      sellerManagerList: [], // 담당자 리스트
      managerVo: {
        uid: ''
      },
      loadingInvite: false,
      percentageInvite: 0,
      loading: false,
      percentage: 0,
      loadingDelete: false,
      percentageDelete: 0,
      sellerManagerModal: false
    }
  },
  created: function () {
  },
  methods: {
    show () {
      this.sellerManagerModal = true
    },
    // 담당자 초대
    sendInviteMessage () {
      if (this.invitedUid == null || this.invitedUid === '') {
        this.$q.notify({
          color: 'green',
          position: 'left',
          message: '초대 대상자 아이디를 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }

      this.loadingInvite = true

      // 초대메세지 생성
      let messageVo = {}
      messageVo.uid_to = this.invitedUid
      messageVo.uid_from = this.$store.state.userVo.uid
      messageVo.sid = this.sellerVo.sid
      messageVo.message_cd = 'INVITE'
      messageVo.title = '매니저님을 초대합니다.'
      messageVo.message = '<b>' + this.sellerVo.seller_name + '</b>의 매니저로 초대합니다.<br>초대에 응하시려면 이 메세지를 눌러주세요.'
      // messageVo.message = '<font size="2" color="grey"><b>' + this.sellerVo.seller_name + '</b>의 매니저로 초대합니다.<br>초대에 응하시려면 아래 버튼을 눌러주세요.<br><br></font>'
      // messageVo.message += '<table align="center"><tr><td><input type="button" value="초대 확인" onclick="allowInvite(' + this.sellerVo.sid + ')"></td></tr></table>'

      // 초대메세지 전송
      this.$axios.post(this.$store.state.apiServerIp + '/api/message/insertMessage', messageVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.invitedUid = '' // 아이디 초기화
          this.loadingInvite = false
          this.$q.notify({
            color: 'green',
            position: 'left',
            message: '초대되었습니다.',
            icon: 'notifications_active'
          })
        })
        .catch((err) => {
          console.log(err)
          this.loadingInvite = false
        })
    },
    // 담당자 수정
    updateSellerManagerList () {
      // 담당자 수정
      this.loading = true
      this.$axios.post(this.$store.state.apiServerIp + '/api/sellermanager/updateSellerManagerList', this.sellerManagerList)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.sellerManagerList = result.data // 등록후 조회한 담당자 리스트 설정
          this.$emit('callback-seller-manager', result.data)
          this.loading = false
          this.$q.notify({
            color: 'primary',
            position: 'left',
            message: '저장되었습니다.',
            icon: 'notifications_active'
          })
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    // 담당자 삭제
    deleteSellerManager (index) {
      // 삭제 확인
      this.$q.dialog({
        title: '담당자 삭제',
        message: '정말 담당자를 삭제하시겠습니까?',
        ok: '예',
        cancel: '아니오',
        preventClose: true
      }).then(() => {
        // 담당자 삭제
        this.loadingDelete = true
        this.$axios.post(this.$store.state.apiServerIp + '/api/sellermanager/deleteSellerManager', this.sellerManagerList[index])
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.sellerManagerList = result.data // 등록후 조회한 담당자 리스트 설정
            // this.$emit('callback-seller-manager', JSON.parse(JSON.stringify(result.data)))
            this.$emit('callback-seller-manager', result.data)
            this.loadingDelete = false
            this.$q.notify({
              color: 'primary',
              position: 'left',
              message: '삭제되었습니다.',
              icon: 'notifications_active'
            })
          })
          .catch((err) => {
            console.log(err)
            this.loadingDelete = false
          })
      }).catch(() => {
        // this.$q.notify(`You didn't agree`)
      })
    },
    close () {
      this.sellerManagerModal = false
    }
  }
}
</script>
