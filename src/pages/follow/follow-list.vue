<template>
  <q-page class="">

    <loginModal ref="loginModal" />

    <q-layout-header>
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <div style="width:100%">
          <table style="width: 100%" border="0">
            <tr>
              <td width="49%" align="center"><q-btn flat icon="favorite_border" @click="changeTabInfo('FOLLOWER')" style="width: 100%;">&nbsp;&nbsp;&nbsp;팔로워</q-btn></td>
              <td width="2%" align="center"><font>｜</font></td>
              <td width="49%" align="center"><q-btn flat icon="favorite" @click="changeTabInfo('FOLLOWING')" style="width: 100%;">&nbsp;&nbsp;&nbsp;팔로잉</q-btn></td>
            </tr>
          </table>
        </div>
      </q-toolbar>
    </q-layout-header>

    <!-- 팔로우 리스트 -->
    <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" >
      <!-- 1. 팔로워 리스트 -->
      <div id="divFollowerList" style="width:100%;">
        <div class="row justify-left" style="margin: 0px 0px 0px 0px;">
          &nbsp;<q-chip color="primary" square icon="favorite_border" style="width:150px;">팔로워&nbsp;&nbsp;<font size="2" color="white">{{ followerCount }}명</font></q-chip>
        </div>
        <q-card-separator />
        <q-infinite-scroll :handler="loadMoreFollower" ref="infiniteScrollFollower">
          <div style="padding:0px 0px 0px 0px" v-for="item in followerList" :key="item.seq">
            <q-item link style="padding:0px 0px 0px 0px">
              <table border="0" style="width: 98%; padding:5px 0px 5px 0px;">
                <tr>
                  <td rowspan="2" width="5">&nbsp;</td>
                  <td rowspan="2" width="50" align="right"><a @click="showUserHome(item.uid)"><div class="round-follow-list"><img :src="item.profile_image" style="width: 45px"></div></a></td>
                  <td rowspan="2" width="5">&nbsp;</td>
                  <td colspan="1" width="55%"><a @click="showUserHome(item.uid)"><font size="2" color="black">{{ item.name }}</font></a></td>
                  <td colspan="1" align="right">
                    <!-- 팔로잉이면 팔로잉 버튼, 아니면 팔로우 버튼 표시 -->
                    <div v-if="item.follow_yn === 'Y'"><q-btn v-if="item.uid !== $store.state.userVo.uid" dense color="grey" label="팔로잉" @click="setFollow(item, 'OFF', 1)" style="width:85px; height:20px;" />&nbsp;</div>
                    <div v-else><q-btn v-if="item.uid !== $store.state.userVo.uid" dense color="blue" label="팔로우" @click="setFollow(item, 'ON', 1)" style="width:85px; height:20px;" />&nbsp;</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="1"><a @click="showUserHome(item.uid)"><font size="1" color="grey">{{ item.introduce }}&nbsp;</font></a></td>
                  <td colspan="1" align="right"><a @click="showUserHome(item.uid)"><font size="1" color="grey">원더 랭킹&nbsp;&nbsp;{{ addComma(item.ranking) }} 위&nbsp;&nbsp;&nbsp;&nbsp;</font></a></td>
                </tr>
              </table>
            </q-item>
            <q-card-separator />
          </div>
          <br>
          <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
        </q-infinite-scroll>
      </div>

      <!-- 2. 팔로잉 리스트 -->
      <div id="divFollowingList" style="width:100%;">
        <div class="row justify-left" style="margin: 0px 0px 0px 0px;">
          &nbsp;<q-chip color="primary" square icon="favorite" style="width:150px;">팔로잉&nbsp;&nbsp;<font size="2" color="white">{{ followingCount }}명</font></q-chip>
        </div>
        <q-card-separator />
        <q-infinite-scroll :handler="loadMoreFollowing" ref="infiniteScrollFollowing">
          <div style="padding:0px 0px 0px 0px" v-for="item in followingList" :key="item.seq">
            <q-item link style="padding:0px 0px 0px 0px">
              <table border="0" style="width: 98%; padding:5px 0px 5px 0px;">
                <tr>
                  <td rowspan="2" width="5">&nbsp;</td>
                  <td rowspan="2" width="50" align="right"><a @click="showUserHome(item.uid)"><div class="round-follow-list"><img :src="item.profile_image" style="width: 45px"></div></a></td>
                  <td rowspan="2" width="5">&nbsp;</td>
                  <td colspan="1" width="55%"><a @click="showUserHome(item.uid)"><font size="2" color="black">{{ item.name }}</font></a></td>
                  <td colspan="1" align="right">
                    <!-- 팔로잉이면 팔로잉 버튼, 아니면 팔로우 버튼 표시 -->
                    <div v-if="item.follow_yn === 'Y'"><q-btn v-if="item.uid !== $store.state.userVo.uid" dense color="grey" label="팔로잉" @click="setFollow(item, 'OFF', 1)" style="width:85px; height:20px;" />&nbsp;</div>
                    <div v-else><q-btn v-if="item.uid !== $store.state.userVo.uid" dense color="blue" label="팔로우" @click="setFollow(item, 'ON', 1)" style="width:85px; height:20px;" />&nbsp;</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="1"><a @click="showUserHome(item.uid)"><font size="1" color="grey">{{ item.introduce }}&nbsp;</font></a></td>
                  <td colspan="1" align="right"><a @click="showUserHome(item.uid)"><font size="1" color="black">원더 랭킹&nbsp;&nbsp;{{ addComma(item.ranking) }} 위&nbsp;&nbsp;&nbsp;&nbsp;</font></a></td>
                </tr>
              </table>
            </q-item>
            <q-card-separator />
          </div>
          <br>
          <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
        </q-infinite-scroll>
      </div>

    </q-pull-to-refresh>
    <br>
    <br>
    <br>
    <br>
  </q-page>
</template>

<style>
.round-follow-list {
  border-radius: 50%;
  overflow: hidden;
  width: 45px;
  height: 45px;
}
.round-follow-list img {
  display: block;
  min-width: 100%;
  min-height: 100%;
}
</style>

<script>
import Vue from 'vue'

export default {
  name: 'follow-list',
  data () {
    return {
      uid: this.$route.query.uid,
      refresherDone: '',
      selectedTab: 'FOLLOWER',
      pageSize: 30,
      lastPageNumFollower: 1, // 팔로워 마지막 페이지
      lastPageNumFollowing: 1, // 팔로잉 마지막 페이지
      followerList: [], // 팔로워 리스트
      followingList: [], // 팔로잉 리스트
      followerCount: 0,
      followingCount: 0
    }
  },
  components: {
  },
  created: function () {
    this.selectedTab = this.$route.query.followCd
    this.selectFollowerListMax() // 팔로워 마지막페이지 조회
    this.selectFollowingListMax() // 팔로워 마지막페이지 조회

    this.selectFollowerCount(this.uid) // 팔로워 총 카운트 조회
    this.selectFollowingCount(this.uid) // 팔로잉 총 카운트 조회
  },
  mounted: function () {
    // 디폴트 리스트
    this.setTabInfo(this.selectedTab)
  },
  methods: {
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      setTimeout(() => { // 3초 후에 로딩메세지 비표시
        done()
      }, 3000)
      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      console.log('this.selectedTab: ' + this.selectedTab)
      if (this.selectedTab === 'FOLLOWER') {
        this.$refs.infiniteScrollFollower.reset() // index 초기화
        this.$refs.infiniteScrollFollower.resume() // stop에서 다시 재생
        this.$refs.infiniteScrollFollower.loadMore() // loadMore로 검색
      } else {
        this.$refs.infiniteScrollFollowing.reset() // index 초기화
        this.$refs.infiniteScrollFollowing.resume() // stop에서 다시 재생
        this.$refs.infiniteScrollFollowing.loadMore() // loadMore로 검색
      }

      this.selectFollowerCount(this.uid) // 팔로워 총 카운트 조회
      this.selectFollowingCount(this.uid) // 팔로잉 총 카운트 조회
    },
    // 팔로워 총 카운트 조회
    selectFollowerCount (uid) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/follow/selectFollowerCount',
        {params: {uid: this.uid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.followerCount = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 팔로잉 총 카운트 조회
    selectFollowingCount (uid) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/follow/selectFollowingCount',
        {params: {uid: this.uid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.followingCount = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 팔로잉정보 탭 초기 표시
    setTabInfo (listType) {
      if (listType === 'FOLLOWER') {
        this.selectedTab = 'FOLLOWER'
        document.getElementById('divFollowerList').style.display = 'block'
        document.getElementById('divFollowingList').style.display = 'none'
      } else {
        this.selectedTab = 'FOLLOWING'
        document.getElementById('divFollowerList').style.display = 'none'
        document.getElementById('divFollowingList').style.display = 'block'
      }
    },
    // 팔로잉정보 탭 변경 표시 처리 (Follower:팔로워 리스트 Following:팔로잉 리스트 circle:모임 리스트)
    changeTabInfo (listType) {
      // console.log('listType: ' + listType)
      if (listType === 'FOLLOWER') {
        this.selectedTab = 'FOLLOWER'
        document.getElementById('divFollowerList').style.display = 'block'
        document.getElementById('divFollowingList').style.display = 'none'
        this.$refs.infiniteScrollFollower.reset()
        this.$refs.infiniteScrollFollower.resume()
      } else {
        this.selectedTab = 'FOLLOWING'
        document.getElementById('divFollowerList').style.display = 'none'
        document.getElementById('divFollowingList').style.display = 'block'
        this.$refs.infiniteScrollFollowing.reset()
        this.$refs.infiniteScrollFollowing.resume()
      }
    },
    loadMoreFollower: function (index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        console.log('loadMoreFollower called index: ' + index + ' this.lastPageNumFollower: ' + this.lastPageNumFollower)
        if (index <= this.lastPageNumFollower) {
          this.selectFollowerList(index, done)
        } else {
          this.$refs.infiniteScrollFollower.stop()
        }
        // refresher 로딩메세지 처리
        if (this.refresherDone != null && this.refresherDone !== '') {
          this.refresherDone() // 로딩메세지 종료
          this.refresherDone = '' // 로딩메세지 초기화
        }
      }, 100)
    },
    // 팔로워 리스트 마지막 페이지 조회
    selectFollowerListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/follow/selectFollowerListLastPageNum',
        {params: {pageSize: this.pageSize, uid: this.uid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumFollower = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 팔로워 리스트 조회
    selectFollowerList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/follow/selectFollowerList',
        {params: {pageNum: idx, pageSize: this.pageSize, uid: this.uid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.followerList = [] // 리스트 초기화
          }
          this.followerList = this.followerList.concat(result.data)
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    },
    loadMoreFollowing: function (index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        console.log('loadMoreFollowing called index: ' + index + ' this.lastPageNumFollowing: ' + this.lastPageNumFollowing)
        if (index <= this.lastPageNumFollowing) {
          this.selectFollowingList(index, done)
        } else {
          this.$refs.infiniteScrollFollowing.stop()
        }
        // refresher 로딩메세지 처리
        if (this.refresherDone != null && this.refresherDone !== '') {
          this.refresherDone() // 로딩메세지 종료
          this.refresherDone = '' // 로딩메세지 초기화
        }
      }, 100)
    },
    // 팔로잉 리스트 마지막 페이지 조회
    selectFollowingListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/follow/selectFollowingListLastPageNum',
        {params: {pageSize: this.pageSize, uid: this.uid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumFollowing = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 팔로잉 리스트 조회
    selectFollowingList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/follow/selectFollowingList',
        {params: {pageNum: idx, pageSize: this.pageSize, uid: this.uid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.followingList = [] // 리스트 초기화
          }
          this.followingList = this.followingList.concat(result.data)
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    },
    setFollow (userRow, onOff, listIndex) {
      // 로그인 체크
      if (!this.checkLogin()) {
        this.$refs.loginModal.show()
        return
      }
      // 팔로우/언팔로우 처리
      let followVo = {}
      followVo.uid_from = this.$store.state.userVo.uid
      followVo.uid_to = userRow.uid

      if (onOff === 'ON') { // 팔로우
        userRow.follow_yn = 'Y' // 팔로우
        this.$axios.post(this.$store.state.apiServerIp + '/api/follow/insertFollow', followVo)
          .then((result) => {
          })
          .catch((err) => {
            console.log(err)
          })
        // 다른 리스트에서 해당 처리 팔로워:1 팔로잉:2
        if (listIndex === 1) {
          // 팔로잉에서 해당 유저 팔로잉으로 수정
          for (let i = 0; i < this.followingList.length; i++) {
            if (this.followingList[i].uid === userRow.uid) {
              this.followingList[i].follow_yn = 'Y'
              break
            }
          }
        } else {
          // 팔로워에서 해당 유저 팔로잉으로 수정
          for (let i = 0; i < this.followerList.length; i++) {
            if (this.followerList[i].uid === userRow.uid) {
              this.followerList[i].follow_yn = 'Y'
              break
            }
          }
        }
      } else { // 언팔로우
        // 확인 메세지
        this.$q.dialog({
          title: '팔로우 취소',
          message: '팔로우를 취소할까요?',
          ok: '예',
          cancel: '아니오',
          color: 'primary'
        }).then(() => {
          if (userRow.uid === 'sellerz' || userRow.uid === '1theDJ') {
            this.$q.notify({
              color: 'primary',
              position: 'left',
              message: '운영자 언팔로우는 안되요~',
              icon: 'notifications_active'
            })
            return
          }
          // 언팔로우
          userRow.follow_yn = 'N' // 언팔로우
          this.$axios.post(this.$store.state.apiServerIp + '/api/follow/deleteFollow', followVo)
            .then((result) => {
            })
            .catch((err) => {
              console.log(err)
            })
          // 다른 리스트에서 해당 처리 팔로워:1 팔로잉:2
          if (listIndex === 1) {
            // 팔로잉에서 해당 유저 언팔로잉으로 수정
            for (let i = 0; i < this.followingList.length; i++) {
              if (this.followingList[i].uid === userRow.uid) {
                this.followingList[i].follow_yn = 'N'
                break
              }
            }
          } else {
            // 팔로워에서 해당 유저 언팔로잉으로 수정
            for (let i = 0; i < this.followerList.length; i++) {
              if (this.followerList[i].uid === userRow.uid) {
                this.followerList[i].follow_yn = 'N'
                break
              }
            }
          }
        }).catch(() => {
          // this.$q.notify(`You didn't agree`)
        })
      }
    },
    // 로그인 체크
    checkLogin () {
      return Vue.prototype.$checkLogin(this.$store.state.userVo)
    },
    // 유저홈 팝업
    showUserHome (uid) {
      Vue.prototype.$showUserHome(uid)
    },
    addComma (num) {
      return Vue.prototype.$addComma(num)
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
