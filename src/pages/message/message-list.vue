<template>
  <q-page class="">

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="notifications_active" />
        <q-toolbar-title>기분 좋은 알림</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
        <!--
        <div style="width:100%">
          <table style="width: 100%" border="0">
            <tr>
              <td width="32%" align="center"><q-btn flat icon="favorite" @click="123" style="width:100%;">&nbsp;&nbsp;&nbsp;팔로잉</q-btn></td>
              <td width="2%" align="center"><font>｜</font></td>
              <td width="32%" align="center"><q-btn flat icon="group" @click="123" style="width: 100%;">&nbsp;&nbsp;&nbsp;모임</q-btn></td>
              <td width="2%" align="center"><font>｜</font></td>
              <td width="32%" align="center"><q-btn flat icon="widgets" @click="123" style="width: 100%;">&nbsp;&nbsp;&nbsp;쇼핑</q-btn></td>
            </tr>
          </table>
        </div>
        -->
      </q-toolbar>
    </q-layout-header>

    <!-- 메세지 리스트 -->
    <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" >
      <q-infinite-scroll :handler="loadMore" ref="infiniteScroll">
        <!-- <q-list highlight inset-separator style="padding:5px 0px 0px 0px; width: 100%" v-for="item in messageList" :key="item.seq"> -->
        <div v-for="item in messageList" :key="item.seq">
          <q-item link @click.native="goLinkUrl(item)" style="padding:0px 0px 0px 0px">
            <table border="0" style="width: 98%; word-break: break-all;" align="center">
              <tr>
                <td colspan="4"></td>
              </tr>
              <tr>
                <td rowspan="3" width="1px">&nbsp;</td>
                <td rowspan="3" width="50" align="left" style="vertical-align:top;">
                  <div class="round-message-list">
                    <img :src="item.profile_image_from" style="width: 30px">
                  </div>
                </td>
                <td>
                  <font size="2" color="grey" align="left">{{ item.name_from }}</font>
                </td>
                <td align="right">
                  <font size="2" color="grey">{{ item.reg_time.substring(0, 16) }}&nbsp;&nbsp;</font>
                </td>
              </tr>
              <tr>
                <td colspan="2"><font size="2" color="grey"><b>{{ item.title }}</b></font></td>
              </tr>
              <tr>
                <td colspan="2">
                  <font size="2" color="grey">
                    <div id="divMessage" v-html="item.message" style="width: 100%; display:block;"></div>
                  </font>
                  <!-- <font size="2" color="grey">{{ item.message }}</font> -->
                </td>
              </tr>
              <tr>
                <td colspan="4"></td>
              </tr>
            </table>
          </q-item>
          <q-card-separator />
        </div>
        <!-- </q-list> -->
        <br>
        <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
      </q-infinite-scroll>
    </q-pull-to-refresh>
    <br>
    <br>
    <br>&nbsp;

  </q-page>
</template>

<style>
.round-message-list {
  border-radius: 50%;
  overflow: hidden;
  width: 35px;
  height: 35px;
}
.round-message-list img {
  display: block;
  min-width: 100%;
  min-height: 100%;
}
</style>

<script>
import Vue from 'vue'

export default {
  name: 'message-list',
  data () {
    return {
      refresherDone: '',
      pageSize: 30,
      lastPageNum: 1, // 마지막 페이지
      messageList: []
    }
  },
  components: {
  },
  created: function () {
    // 로그인 체크
    if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
      this.$router.push(this.$store.state.PAGE_LOGIN)
      return
    }
    this.selectListMax()
    // 메세지 읽음 처리
    let messageVo = {}
    messageVo.uid_to = this.$store.state.userVo.uid
    messageVo.mod_id = this.$store.state.userVo.uid
    this.$axios.post(this.$store.state.apiServerIp + '/api/message/updateMessageReadAll', messageVo)
      .then((result) => {
        // console.log(JSON.stringify(result.data))
        this.$store.state.unreadMessageCount = 0 // 미확인 메세지 건수 초기화
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()

      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScroll.reset() // index 초기화
      this.$refs.infiniteScroll.resume() // stop에서 다시 재생
      this.$refs.infiniteScroll.loadMore() // loadMore로 검색
    },
    loadMore: function (index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      console.log('index: ' + index)
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        // alert(index)
        console.log('loadMore called index: ' + index)
        if (index <= this.lastPageNum) {
          this.selectList(index, done)
          if (index === this.lastPageNum) {
            this.$refs.infiniteScroll.stop()
          }

          // refresher 로딩메세지 처리
          if (this.refresherDone != null && this.refresherDone !== '') {
            this.refresherDone() // 로딩메세지 종료
            this.refresherDone = '' // 로딩메세지 초기화
          }
        }
      }, 500)
    },
    // 메세지 리스트 마지막 페이지 조회
    selectListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/message/selectMessageListLastPageNum',
        {params: {pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNum = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 메세지 리스트 조회
    selectList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/message/selectMessageList',
        {params: {pageNum: idx, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.messageList = [] // 리스트 초기화
          }
          this.messageList = this.messageList.concat(result.data)
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    },
    // 알림 관련 링크로 이동
    goLinkUrl (item) {
      if (item.message_cd === 'INVITE') { // 판매자 매니저 초대 메세지
        this.allowInvite(item.sid)
      } else if (item.message_cd === 'FOLLOW') { // 새로운 팔로워
        this.showUserHome(item.uid_from)
      } else {
        // 해당 화면으로 이동
        this.$router.push(item.link_url)
      }
    },
    // 매니저 초대 알림 - 매니저 초대 허락
    // statics/js/message.js에서 호출
    allowInvite (sid) {
      // 확인
      this.$q.dialog({
        title: '매니저 수락',
        message: '초대에 응하시겠습니까?',
        ok: '예',
        cancel: '아니오',
        preventClose: true
      }).then(() => {
        // 판매자 매니저 vo 설정
        let sellerManagerVo = {}
        sellerManagerVo.sid = sid
        sellerManagerVo.uid_manager = this.$store.state.userVo.uid
        sellerManagerVo.roll_cd = '3' // 1:오너 2:총괄 3:직원
        sellerManagerVo.uid = this.$store.state.userVo.uid

        // 판매자 매니저 등록
        this.$axios.post(this.$store.state.apiServerIp + '/api/sellermanager/insertSellerManagerInvited', sellerManagerVo)
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            if (result.data === -1) {
              this.$q.notify({
                color: 'primary',
                position: 'left',
                message: '이미 매니저로 등록되어 있습니다.',
                icon: 'notifications_active'
              })
            } else {
              this.$q.notify({
                color: 'green',
                position: 'left',
                message: '매니저 등록이 완료되었습니다.',
                icon: 'notifications_active'
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }).catch(() => {
        // this.$q.notify(`You didn't agree`)
      })
    },
    // 유저홈 팝업
    showUserHome (uid) {
      Vue.prototype.$showUserHome(uid)
    }
  }
}
</script>
