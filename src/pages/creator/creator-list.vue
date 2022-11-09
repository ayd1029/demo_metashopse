<template>
  <q-page class="">
    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar
        color="black"
        inverted
      >
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>인기순위</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
        <!-- <q-select inverted-light color="white" v-model="selectedOrderBy" :options="selectedOrderByOptions" style="width:120px" /> -->
      </q-toolbar>
    </q-layout-header>

    <!-- 순위 설명 -->
    <table width="94%" align="center">
      <tr>
        <td align="center">
          <font size="2" color="grey">
            순위는 등록한 게시물 수, 좋아요 수, 원더 보유량,<br> 기타 활동 관련 사항을 전반적으로 평가하여 정해집니다.
          </font>
        </td>
      </tr>
      <tr>
        <td align="center">&nbsp;</td>
      </tr>
    </table>
    <q-card-separator />

    <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" >
      <!-- 인기순위 리스트 -->
      <div id="divCreatorList" style="width:100%;">
        <q-infinite-scroll :handler="loadMoreCreator" ref="infiniteScrollCreator">
          <div style="padding:0px 0px 0px 0px" v-for="item in creatorRankingList" :key="item.seq">
            <q-item link @click.native="showUserHome(item.uid)" style="padding:0px 0px 0px 0px">
              <table border="0" style="width: 98%; padding:5px 0px 5px 0px;">
                <tr>
                  <td rowspan="2" width="5">&nbsp;</td>
                  <td rowspan="2" width="45" align="right"><div class="round-creator-list"><img :src="item.profile_image" style="width: 45px"></div></td>
                  <td rowspan="2" width="5">&nbsp;</td>
                  <td colspan="1" width="55%"><font size="2" color="black">{{ item.name }}</font></td>
                  <td colspan="1" align="right"><font size="1" color="black"></font>&nbsp;<font size="2" color="red">{{ addComma(item.rownum) }}</font><font size="1" color="black">위&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
                </tr>
                <tr>
                  <td colspan="2"><font size="1" color="grey">{{ item.introduce }}&nbsp;</font></td>
                  <!--
                  <td colspan="1" align="right">
                    -- 팔로잉이면 팔로잉 버튼, 아니면 팔로우 버튼 표시
                    <div v-if="item.follow_yn === 'Y'"><q-btn v-if="item.uid !== $store.state.userVo.uid" dense color="grey" label="팔로잉" @click="setFollow(item, 'OFF', 1)" style="width:100px; height:20px;" />&nbsp;</div>
                    <div v-else><q-btn v-if="item.uid !== $store.state.userVo.uid" dense color="blue" label="팔로우" @click="setFollow(item, 'ON', 1)" style="width:100px; height:20px;" />&nbsp;</div>
                  </td>
                  -->
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
.round-creator-list {
  border-radius: 50%;
  overflow: hidden;
  width: 45px;
  height: 45px;
}
.round-creator-list img {
  display: block;
  min-width: 100%;
  min-height: 100%;
}
</style>

<script>
import Vue from 'vue'

export default {
  name: 'creator-list',
  data () {
    return {
      uid: this.$store.state.userVo.uid,
      refresherDone: '',
      pageSize: 15,
      lastPageNumCreator: 1, // 팔로잉 마지막 페이지
      creatorRankingList: []
    }
  },
  components: {
  },
  created: function () {
    this.selectCreatorListMax() // 팔로워 마지막페이지 조회
  },
  mounted: function () {
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
      this.$refs.infiniteScrollCreator.reset() // index 초기화
      this.$refs.infiniteScrollCreator.resume() // stop에서 다시 재생
      this.$refs.infiniteScrollCreator.loadMore() // loadMore로 검색
    },
    loadMoreCreator: function (index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        console.log('loadMoreCreator called index: ' + index + ' this.lastPageNumCreator: ' + this.lastPageNumCreator)
        if (index <= this.lastPageNumCreator) {
          this.selectCreatorList(index, done)
        } else {
          this.$refs.infiniteScrollCreator.stop()
        }
        // refresher 로딩메세지 처리
        if (this.refresherDone != null && this.refresherDone !== '') {
          this.refresherDone() // 로딩메세지 종료
          this.refresherDone = '' // 로딩메세지 초기화
        }
      }, 100)
    },
    // 인기순위 리스트 마지막 페이지 조회
    selectCreatorListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/creator/selectCreatorRankingListLastPageNum',
        {params: {pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumCreator = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 인기순위 리스트 조회
    selectCreatorList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/creator/selectCreatorRankingList',
        {params: {pageNum: idx, pageSize: this.pageSize}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.creatorRankingList = [] // 리스트 초기화
          }
          this.creatorRankingList = this.creatorRankingList.concat(result.data)
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    },
    /*
    setFollow (userRow, onOff, listIndex) {
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
          for (let i = 0; i < this.creatorRankingList.length; i++) {
            if (this.creatorRankingList[i].uid === userRow.uid) {
              this.creatorRankingList[i].follow_yn = 'Y'
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
            for (let i = 0; i < this.creatorRankingList.length; i++) {
              if (this.creatorRankingList[i].uid === userRow.uid) {
                this.creatorRankingList[i].follow_yn = 'N'
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
    */
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
