<template>
  <q-page class="">

    <loginModal ref="loginModal" @callback-login="callbackLogin" />
    <shareModal ref="shareModal" />
    <contentsReplyModal ref="contentsReplyModal" />
    <contentsModifyModal ref="contentsModifyModal" />

    <q-layout-header class="no-shadow" reveal>
      <q-toolbar color="white" inverted style="height:85px">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td width="10%">
              <!-- <img v-else @click="goHome" src="statics/icons/icon-128x128.png" style="width: 30px; height: 30px;"> -->
              <q-btn flat round dense icon="fast_rewind" color="black" @click="goBack" />
            </td>
            <td width="65%"><font color="black"><b>{{circleVo.circle_name}}</b></font></td>
            <td width="25%" align="right">
              <q-btn flat round dense color="green" icon="home" @click="goMenu('/menu')" />
              <!-- 기능버튼 -->
              <q-btn flat round dense color="grey" icon="more_vert">
                <q-popover>
                  <q-list link class="scroll" style="min-width: 100px">
                    <q-item key="1" v-close-overlay @click.native="copyUrlAuto('CIRCLE', circleVo.seq)"><q-item-main label="링크복사" /></q-item>
                  </q-list>
                </q-popover>
              </q-btn>

            </td>
          </tr>
          <tr>
            <td colspan="3">
              <q-tabs v-if="isLogin" v-model="tab" inverted color="green" @input="tabChanged">
                <q-tab name="INFO" :style="`width:${widthOneThird-50}px`" slot="title"><font size="2" color="black">정보</font></q-tab>
                <q-tab name="NEWS" :style="`width:${widthOneThird-50}px`" slot="title"><font size="2" color="black">새소식</font></q-tab>
                <q-tab name="CHAT" :style="`width:${widthOneThird-50}px`" slot="title"><font size="2" color="black">채팅</font></q-tab>
              </q-tabs>
            </td>
          </tr>
        </table>
      </q-toolbar>
    </q-layout-header>

    <!-- 1. 모임 정보 탭 -->
    <div v-if="tab === 'INFO'">
      <!-- 1.1 모임 정보 -->
      <div class="row justify-left">
        <img :src="circleVo.circle_profile_image" style="width: 100%; height:100%;">
        <q-chip color="green" square icon="" style="width:100%;">
          {{ circleVo.circle_name }}
          &nbsp;&nbsp;&nbsp;
          <q-btn v-if="modifyFlag" color="black" @click="goModifyCircle(circleVo.seq)" label="정보수정" size="sm" />
        </q-chip>
      </div>
      <br>
      <div v-html="setHtml(circleVo.introduce)" />
      <br>
      <div v-if="joinedYn === 'N'">
        <br>
        <table width="100%" align="center">
          <tr>
            <td align="center"><q-btn icon="accessibility_new" color="green" @click="joinCircle" label="가입하기" style="width:70%; height:35px;" /></td>
          </tr>
        </table>
      </div>
      <div v-if="joinedYn === 'Y' && circleVo.chat_url != null && circleVo.chat_url !== ''">
        <br>
        <table width="100%" align="center">
          <tr>
            <td align="center">{{ circleVo.chat_url }}</td>
          </tr>
          <tr>
            <td align="center">
              <q-btn icon="chat" color="blue" @click="joinOpenChatRoom" label="오픈채팅방/홈페이지" style="width:70%; height:35px;" />
            </td>
          </tr>
        </table>
      </div>
      <br>
      <div class="row justify-left">
        <q-chip color="green" square icon="group" style="width:100%;">모임멤버&nbsp;&nbsp;{{ memberCount }}명</q-chip>
      </div>
      <!-- 1.2 멤버 리스트 -->
      <div style="padding:0px 0px 0px 0px" v-for="item in circleVo.circleMemberList" :key="item.seq">
        <q-card class="no-shadow">
          <q-item link @click.native="showUserHome(item.uid_member)" style="padding:0px 0px 0px 0px">
            <table border="0" style="width: 100%; padding:5px 0px 5px 0px;">
              <tr>
                <td rowspan="3" width="5px">&nbsp;</td>
                <td rowspan="3" width="50">
                  <div class="round-circle-info">
                    <img :src="item.profile_image" style="width: 50px">
                  </div>
                </td>
                <td rowspan="3" width="5px">&nbsp;</td>
                <td colspan="1"><font size="2" color="black">{{ item.name }}</font></td>
                <td v-if="item.roll_cd === '01'" align="right"><font size="2" color="primary">모임장</font>&nbsp;&nbsp;&nbsp;</td>
                <td v-if="item.roll_cd === '02'" align="right"><font size="2" color="primary">운영진</font>&nbsp;&nbsp;&nbsp;</td>
                <td v-if="item.roll_cd === '03'" align="right"></td>
              </tr>
              <tr>
                <td colspan="2"><font size="1" color="grey">{{ item.introduce }}&nbsp;</font></td>
              </tr>
            </table>
          </q-item>
          <q-card-separator />
        </q-card>
      </div>
      <br>
      <div v-if="joinedYn === 'Y'">
        <br>
        <table width="100%" align="center">
          <tr>
            <td align="center"><q-btn icon="sentiment_very_dissatisfied" color="grey" @click="leaveCircle" label="탈퇴하기" style="width:70%; height:35px;" /></td>
          </tr>
        </table>
        <br>
        <br>
      </div>
    </div>

    <!-- 2. 새소식 탭 -->
    <div v-if="tab === 'NEWS'" style="width: 100%; margin: 5px 0px 0px 0px;">
      <!-- 2.1 새소식 리스트 -->
      <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" color="green" >
        <!-- 컨텐츠 -->
        <div id="divContentsList" style="width: 100%;">
          <q-infinite-scroll :handler="loadMoreContents" ref="infiniteScrollContents">
            <div v-for="(item, index) in contentsList" :key="item.seq" style="width: 100%;">
              <div style="width: 100%; margin: 0px 0px 0px 0px;">
                <table border="0" cellpadding="0" cellspacing="0" style="width: 100%">
                  <tr>
                    <td width="50" rowspan="2" align="center">
                      <div class="round-main">
                        <a @click="showUserHome(item.reg_id)"><img :src="item.profile_image" style="width: 30px"></a>
                      </div>
                    </td>
                    <td><a @click="showUserHome(item.reg_id)"><font size="2" color="grey">{{ item.name }}</font></a></td>
                    <td width="50" rowspan="2" align="center">
                      <!-- 기능버튼 -->
                      <q-btn flat round dense color="grey" icon="more_vert">
                        <q-popover>
                          <q-list link class="scroll" style="min-width: 100px">
                            <q-item key="1" v-close-overlay @click.native="copyUrlAuto('CONTENTS', item.seq)"><q-item-main label="링크복사" /></q-item>
                            <q-item key="2" v-if="item.reg_id === $store.state.userVo.uid" v-close-overlay @click.native="modifyContents(item)"><q-item-main label="수정하기" /></q-item>
                            <q-item key="3" v-if="item.reg_id === $store.state.userVo.uid" v-close-overlay @click.native="deleteContents(item, index)"><q-item-main label="삭제하기" /></q-item>
                            <q-item key="4" v-close-overlay @click.native="reportContents(item)"><q-item-main label="신고하기" /></q-item>
                          </q-list>
                        </q-popover>
                      </q-btn>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <font size="2" color="black"><div v-html="item.title" style="text-align:left; word-break:keep-all; word-wrap:break-word;" /></font>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" style="width: 100%">
                  <tr>
                    <td>
                      <div v-if="item.imageList != null && item.imageList.length > 1" style="width: 100%; margin: 5px 0px 0px 0px;">
                        <q-carousel color="white" arrows :quick-nav="item.video_url == null" quick-nav-icon="favorite" :height="`${widthOneOne}px`">
                          <q-carousel-slide v-for="images in item.imageList" :key="images.seq" :img-src="images.url_path" />
                          <q-carousel-slide v-if="item.video_url != null"><q-video class="absolute-full" :src="setVideoParams(item.video_url)" playsinline webkit-playsinline /></q-carousel-slide>
                        </q-carousel>
                      </div>
                      <div v-else-if="item.image_url != null && item.video_url != null" style="width: 100%; margin: 5px 0px 0px 0px;">
                        <q-carousel color="white" arrows :quick-nav="item.video_url == null" quick-nav-icon="favorite" :height="`${widthOneOne}px`">
                          <q-carousel-slide :img-src="item.image_url" />
                          <q-carousel-slide><q-video class="absolute-full" :src="setVideoParams(item.video_url)" playsinline webkit-playsinline /></q-carousel-slide>
                        </q-carousel>
                      </div>
                      <div v-else-if="item.image_url != null && item.video_url == null" style="width: 100%; margin: 5px 0px 0px 0px;">
                        <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                          <tr>
                            <td><img :src="item.image_url" :style="`width: ${widthOneOne}px;`"></td>
                          </tr>
                        </table>
                      </div>
                      <div v-else-if="item.video_url != null" style="width: 100%; margin: 5px 0px 0px 0px;">
                        <q-carousel color="white" :height="`${widthOneOne}px`">
                        <q-carousel-slide><q-video class="absolute-full" :src="setVideoParams(item.video_url)" playsinline webkit-playsinline /></q-carousel-slide>
                        </q-carousel>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <div v-if="item.rating != null" style="width: 100%; text-align: center; margin: 4px 0px 0px 0px;">
                <div v-if="item.rating == 1"><font size="3" color="grey">평점 </font><q-rating v-model="item.rating" icon="sentiment_very_dissatisfied" :max="5" size="50px" color="red" readonly /><b> 나쁨</b></div>
                <div v-if="item.rating == 2"><font size="3" color="grey">평점 </font><q-rating v-model="item.rating" icon="sentiment_dissatisfied" :max="5" size="50px" color="orange" readonly /><b> 별로</b></div>
                <div v-if="item.rating == 3"><font size="3" color="grey">평점 </font><q-rating v-model="item.rating" icon="sentiment_satisfied" :max="5" size="50px" color="green" readonly /><b> 보통</b></div>
                <div v-if="item.rating == 4"><font size="3" color="grey">평점 </font><q-rating v-model="item.rating" icon="sentiment_satisfied_alt" :max="5" size="50px" color="cyan" readonly /><b> 좋음</b></div>
                <div v-if="item.rating == 5"><font size="3" color="grey">평점 </font><q-rating v-model="item.rating" icon="sentiment_very_satisfied" :max="5" size="50px" color="blue" readonly /><b> 최고</b></div>
              </div>
              <div v-if="item.seq_product != null" style="width: 100%; text-align: center; margin: 4px 0px 0px 0px;">
                <q-btn outline color="blue" style="width: 98%" @click="goProductDetail(item.seq_product)">상품 상세보기</q-btn>
              </div>
              <div v-if="item.seq_circle != null" style="width: 100%; text-align: center; margin: 4px 0px 0px 0px;">
                <q-btn outline color="green" style="width: 98%" @click="goCircleInfo(item.seq_circle)">모임 방문</q-btn>
              </div>
              <div style="width: 100%; margin: 0px 0px 0px 0px;">
                <table style="width: 99%; border-collapse:collapse; border-spacing:0px;" border="0" cellpadding="0" cellspacing="0" align="center">
                  <tr>
                    <td width="10" align="left"></td>
                    <td width="60" align="left">
                      <!-- 댓글 -->
                      <q-btn dense flat round color="black" icon="chat" @click="showContentsReplyModal(item)" />
                      <font size="1" color="black">{{item.reply_count}}</font>
                    </td>
                    <td width="60" align="left">
                      <!-- 좋아요 -->
                      <q-btn dense v-if="item.like_cd === 'Y'" flat round color="primary" icon="thumb_up_alt" @click="likeIt(item, 'YES')" />
                      <q-btn dense v-else flat round color="black" icon="thumb_up_alt" @click="likeIt(item, 'YES')" />
                      <font size="1" color="black">{{item.like_yes_count}}</font>
                    </td>
                    <td width="60" align="left">
                      <!-- 싫어요 -->
                      <q-btn dense v-if="item.like_cd === 'N'" flat round color="primary" icon="thumb_down_alt" @click="likeIt(item, 'NO')" />
                      <q-btn dense v-else flat round color="black" icon="thumb_down_alt" @click="likeIt(item, 'NO')" />
                      <font size="1" color="black">{{item.like_no_count}}</font>
                    </td>
                    <td width="60" align="left">
                      <!-- 공유 -->
                      <q-btn dense flat round color="black" icon="share" @click="copyUrlAuto('CONTENTS', item.seq)" />
                    </td>
                    <td align="left"></td>
                    <td width="50" align="left">
                      <!-- 저장 -->
                      <q-btn dense v-if="item.save_yn === 'Y'" flat round color="primary" icon="beenhere" @click="saveIt(item, 'N')" />
                      <q-btn dense v-else flat round color="black" icon="beenhere" @click="saveIt(item, 'Y')" />
                    </td>
                  </tr>
                </table>
              </div>
              <div style="width: 100%; margin: 5px 0px 0px 0px;">
                <table style="width: 95%; border-collapse:collapse;" border="0" align="center">
                  <tr>
                    <td colspan="3" align="left">
                      <!-- <div v-html="setHtml(item.contents)" :style="`width:${widthOneOne-10}px; word-wrap: break-word;`"></div> -->
                      <div v-html="setHtml(item.contents)" style="word-break: break-all;"></div>
                      <!-- <font size="2" color="black">{{ item.contents }}</font> -->
                    </td>
                  </tr>
                </table>
              </div>
              <br>
              <br>
            </div>
            <br>
            <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="green"></q-spinner-hearts></div>
          </q-infinite-scroll>
        </div>
      </q-pull-to-refresh>
    </div>

    <!-- 3. 채팅 탭 -->
    <div v-if="tab === 'CHAT'" id="divChat" style="width: 100%; margin: 5px 0px 0px 0px;">
      <div>
        <!-- 3.1 채팅 리스트 -->
        <div style="padding:5px 0px 0px 0px" v-for="item in chatList" :key="item.seq">
          <table width="100%" align="center" border="0">
            <tr>
              <td width="5"></td>
              <td>
                <a @click="showUserHome(item.reg_id)">
                  <q-chat-message
                    :name="item.reg_name"
                    :avatar="item.profile_image"
                    :text="[item.message]"
                    :stamp="item.reg_time"
                    bg-color="yellow"
                    text-color="black"
                    :sent="item.reg_id === $store.state.userVo.uid"
                  />
                </a>
              </td>
              <td width="5"></td>
            </tr>
          </table>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
      </div>
      <q-page-sticky expand position="bottom">
        <!-- 댓글 입력창 -->
        <table border="0" width="100%" cellspacing="0" cellpadding="0" style="background:white;">
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td width="100%"><q-input v-model.trim="message" color="white" style="width:100%;" class="no-shadow" type="textarea" inverted-light /></td>
            <td width="45"><q-btn dense icon="send" color="green" @click="sendMessage" style="height:45px; width:55px;" /></td>
          </tr>
        </table>
      </q-page-sticky>
    </div>
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
    <br>&nbsp;
  </q-page>
</template>

<style>
.round-circle-info {
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
}
.round-circle-info img {
  display: block;
  min-width: 100%;
  min-height: 100%;
}
.round-main {
  border-radius: 50%;
  overflow: hidden;
  width: 30px;
  height: 30px;
}
.round-main img {
  display: block;
  min-width: 100%;
  min-height: 100%;
}
</style>

<script>
import Vue from 'vue'

export default {
  name: 'mystore',
  data () {
    return {
      seq: this.$route.query.seq,
      modifyFlag: false, // 모임정보 수정권한 유무
      isLogin: false,
      refresherDone: '',
      pageSizeContents: 15,
      lastPageNumContents: 1, // 컨텐츠 마지막 페이지
      widthOneThird: 0, // 화면너비를 3으로 나눈 값 : 이미지형 리스트 정사각형으로 만들어야 되는데..시간점..
      widthOneOne: 0, // 화면너비를 1로 나눈 값 : 이미지형 리스트 정사각형으로 만들어야 되는데..시간점..
      tab: 'INFO',
      joinedYn: 'N',
      interval: '', // 채팅 메세지 조회용
      lastPageNum: 1, // 마지막 페이지
      circleVo: { // 모임 정보
        joinMemberProfileImage: '',
        joinMemberName: ''
      },
      contentsList: [], // 새소식 리스트
      contentsImageList: [], // 이미지형 새소식 리스트
      memberCount: 0, // 회원수
      message: '', // 전송할 메세지
      chatList: [] // 채팅 리스트
    }
  },
  components: {
  },
  created: function () {
    // 레이아웃 하단탭 제어
    this.$store.state.layoutTabVisible = true

    this.isLogin = this.checkLogin()
    this.widthOneOne = window.innerWidth
    if (window.innerWidth > window.innerHeight) {
      this.widthOneOne = window.innerHeight / 2
    }
    // console.log('window.innerWidth: ' + window.innerWidth)
    // console.log('window.innerWidth / 3: ' + window.innerWidth / 3)
    this.widthOneThird = window.innerWidth / 3
    if (this.$store.state.device === 'P') {
      this.widthOneThird = (window.innerWidth - 590) / 3
    }
    this.selectCircle() // 모임정보조회
    this.selectContentsListMax() // 새소식 마지막페이지 조회
  },
  mounted: function () {
    // 채팅 목록 조회
    if (this.checkLogin()) { // 로그인
      this.interval = setInterval(() => {
        if (this.tab === 'CHAT') { // 채팅창 벗어나면 실행 안함
          // 채팅 메세지 주기적 조회
          this.$axios.get(this.$store.state.apiServerIp + '/api/circle/selectCircleChatListCount', {params: {seq: this.$route.query.seq}})
            .then((result) => {
              // console.log(JSON.stringify(result.data))
              let newChatListCount = result.data
              if (newChatListCount > this.chatList.length) { // 새로 조회된 내용이 있을때만
                // 채팅 리스트 조회
                this.$axios.get(this.$store.state.apiServerIp + '/api/circle/selectCircleChatList', {params: {seq: this.$route.query.seq}})
                  .then((result) => {
                    // console.log(JSON.stringify(result.data))
                    let newChatList = result.data
                    for (let i = this.chatList.length; i < newChatList.length; i++) {
                      let chatRow = newChatList[i]
                      this.chatList.push(chatRow)
                    }
                    this.scrollDownToBottom() // 스크롤 맨아래로 이동
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }, 3000)
    }
    this.$q.loading.show() // 로딩 표시 시작
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    tabChanged () { // 채팅일 경우 하단 탭 숨기기
      if (this.tab === 'CHAT') {
        this.$store.state.layoutTabVisible = false
        this.$store.state.playerOffsetVert = 53
      } else {
        this.$store.state.layoutTabVisible = true
        this.$store.state.playerOffsetVert = 5
      }
    },
    checkLogin () {
      return Vue.prototype.$checkLogin(this.$store.state.userVo)
    },
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()

      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      this.$refs.infiniteScrollContents.reset() // index 초기화
      this.$refs.infiniteScrollContents.resume() // stop에서 다시 재생
      this.$refs.infiniteScrollContents.loadMore() // loadMore로 검색
    },
    scrollDownToBottom () { // 스크롤 맨아래로 이동
      // let div = document.getElementById('divChat')
      // console.log('div.scrollTop: ' + div.scrollTop + ' div.scrollHeight: ' + div.scrollHeight)
      // window.scrollTo(0, div.scrollHeight)
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      })
    },
    // 모임 정보 조회
    selectCircle () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/circle/selectCircleWithMemberList', {params: {seq: this.$route.query.seq}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.circleVo = result.data
          this.$q.loading.hide() // 로딩 표시 종료
          this.memberCount = result.data.circleMemberList.length

          // 가입여부 체크
          for (let i = 0; i < result.data.circleMemberList.length; i++) {
            if (this.$store.state.userVo.uid === result.data.circleMemberList[i].uid_member) {
              this.joinedYn = 'Y' // 가입여부 설정

              // 모임정보 수정 권한 설정
              if (result.data.circleMemberList[i].roll_cd < 10) {
                this.modifyFlag = true
              }
              break
            }
          }
          if (this.joinedYn === 'Y') {
            // 채팅 리스트 조회
            this.$axios.get(this.$store.state.apiServerIp + '/api/circle/selectCircleChatList', {params: {seq: this.$route.query.seq}})
              .then((result) => {
                // console.log(JSON.stringify(result.data))
                this.chatList = result.data
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((err) => {
          this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
        })
    },
    // 모임 가입
    joinCircle () {
      // 로그인 체크
      if (!this.checkLogin()) {
        this.$refs.loginModal.show()
        return
      }
      // 유저 프로필 사진 유무 체크
      if (this.$store.state.userVo.profile_image == null || this.$store.state.userVo.profile_image === '') {
        this.$q.notify({
          color: 'blue',
          position: 'left',
          message: '우선 프로필 사진을 등록해주세요!',
          icon: 'notifications_active'
        })
        return
      } else {
        this.circleVo.joinMemberProfileImage = this.$store.state.userVo.profile_image
        this.circleVo.joinMemberName = this.$store.state.userVo.name
      }
      this.$axios.post(this.$store.state.apiServerIp + '/api/circle/joinCircle', this.circleVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.joinedYn = 'Y'
          this.selectCircle() // 모임정보조회
          this.$q.notify({
            color: 'blue',
            position: 'left',
            message: '가입되었습니다!',
            icon: 'notifications_active'
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 모임 탈퇴
    leaveCircle () {
      // 삭제 확인
      this.$q.dialog({
        icon: 'reply',
        title: '탈퇴하기',
        message: '정말 탈퇴하시겠습니까?',
        ok: '예',
        cancel: '아니오'
      }).then(() => {
        this.$axios.post(this.$store.state.apiServerIp + '/api/circle/leaveCircle', this.circleVo)
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            this.joinedYn = 'N'
            this.selectCircle() // 모임정보조회
            this.$q.notify({
              color: 'grey',
              position: 'left',
              message: '탈퇴되었습니다.',
              icon: 'notifications_active'
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }).catch(() => {
        // this.$q.notify(`You didn't agree`)
      })
    },
    // 오픈채팅방 입장
    joinOpenChatRoom () {
      window.open(this.circleVo.chat_url)
    },
    // 상품 상세 화면으로 이동
    goProductDetail (seqProduct) {
      this.$router.push('/productDetail?seq=' + seqProduct)
    },
    // 모임 정보 화면으로 이동
    goCircleInfo (seqCircle) {
      this.$router.push('/circle/circleInfo?seq=' + seqCircle)
    },
    loadMoreContents: function (index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        console.log('loadMoreContents called index: ' + index + ' this.lastPageNumContents: ' + this.lastPageNumContents)
        if (index <= this.lastPageNumContents) {
          this.selectContentsList(index, done)
        } else {
          this.$refs.infiniteScrollContents.stop()
        }
        // refresher 로딩메세지 처리
        if (this.refresherDone != null && this.refresherDone !== '') {
          this.refresherDone() // 로딩메세지 종료
          this.refresherDone = '' // 로딩메세지 초기화
        }
      }, 100)
    },
    // 컨텐츠 리스트 마지막 페이지 조회
    selectContentsListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/circle/selectCircleNewsListLastPageNum',
        {params: {pageSize: this.pageSizeContents, seq: this.seq}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumContents = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 컨텐츠 리스트 조회
    selectContentsList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/circle/selectCircleNewsList',
        {params: {pageNum: idx, pageSize: this.pageSizeContents, seq: this.seq}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.contentsList = [] // 리스트 초기화
          }
          this.contentsList = this.contentsList.concat(result.data)
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    },
    // 공유링크 복사
    copyUrlAuto (linkCd, seqOg) {
      // linkCd -> PRODUCT:상품 CONTENTS:컨텐츠 CIRCLE:모임 MEMBER:회원
      this.$refs.shareModal.linkVo.seq_og = seqOg
      this.$refs.shareModal.linkVo.link_cd = linkCd
      this.$refs.shareModal.show()

      // this.$q.loading.show()
      // this.$refs.shareModal.copyUrlAuto() // 링크 자동 복사
    },
    // 컨텐츠 수정 모달 화면 표시
    modifyContents (item) {
      this.$refs.contentsModifyModal.contentsVoOriginal = item
      this.$refs.contentsModifyModal.contentsVo = JSON.parse(JSON.stringify(item))
      this.$refs.contentsModifyModal.show()
    },
    // 컨텐츠 삭제
    deleteContents (item, index) {
      // 확인 메세지
      this.$q.dialog({
        title: '컨텐츠 삭제',
        message: '정말 삭제할까요?',
        ok: '예',
        cancel: '아니오',
        color: 'primary'
      }).then(() => {
        let contentsVo = {}
        contentsVo.seq = item.seq
        contentsVo.del_id = this.$store.state.userVo.uid
        this.$axios.post(this.$store.state.apiServerIp + '/api/contents/deleteContents', contentsVo)
          .then((result) => {
            this.contentsList.splice(index, 1) // 컨텐츠 리스트에서 제거
            this.$q.notify({
              color: 'primary',
              position: 'left',
              message: '삭제되었습니다.',
              icon: 'notifications_active'
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }).catch(() => {
      })
    },
    // 신고하기
    reportContents (item) {
      // 확인 메세지
      this.$q.dialog({
        title: '게시물 신고',
        message: '정말 신고할까요?',
        ok: '예',
        cancel: '아니오',
        color: 'primary'
      }).then(() => {
        this.$q.notify({
          color: 'primary',
          position: 'left',
          message: '해당 게시물 신고 완료',
          icon: 'notifications_active'
        })
        let contentsVo = {}
        contentsVo.seq = item.seq
        contentsVo.mod_id = this.$store.state.userVo.uid
        this.$axios.post(this.$store.state.apiServerIp + '/api/contents/reportContents', contentsVo)
          .then((result) => {
            /*
            this.$q.notify({
              color: 'primary',
              position: 'left',
              message: '해당 게시물 신고 완료',
              icon: 'notifications_active'
            })
            */
          })
          .catch((err) => {
            console.log(err)
          })
      }).catch(() => {
      })
    },
    // 좋아요/싫어요
    likeIt (item, likeCd) {
      // like_cd Y:좋아요 N:싫어요 null:중립
      // 1. 화면 조작
      if (likeCd === 'YES') { // 좋아요인 경우
        if (item.like_cd === 'Y') { // 이전상태 좋아요일 경우
          item.like_cd = null // 중립으로 설정
          item.like_yes_count = Number(item.like_yes_count) - 1
        } else {
          if (item.like_cd === 'N') { // 이전상태 싫어요일 경우
            item.like_no_count = Number(item.like_no_count) - 1
          }
          item.like_cd = 'Y' // 좋아요로 설정
          item.like_yes_count = Number(item.like_yes_count) + 1
        }
      } else { // 싫어요인 경우
        if (item.like_cd === 'N') { // 이전상태 싫어요일 경우
          item.like_cd = null // 중립으로 설정
          item.like_no_count = Number(item.like_no_count) - 1
        } else {
          if (item.like_cd === 'Y') { // 이전상태 좋아요일 경우
            item.like_yes_count = Number(item.like_yes_count) - 1
          }
          item.like_cd = 'N' // 싫어요로 설정
          item.like_no_count = Number(item.like_no_count) + 1
        }
      }
      // 2. 좋아요 테이블 저장
      let contentsLikeVo = {}
      contentsLikeVo.seq_contents = item.seq
      // contentsLikeVo.uid_from = this.$store.state.userVo.uid
      // contentsLikeVo.from_name = this.$store.state.userVo.name
      contentsLikeVo.uid_to = item.reg_id
      contentsLikeVo.like_cd = item.like_cd

      this.$axios.post(this.$store.state.apiServerIp + '/api/contents/updateContentsLike', contentsLikeVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 컨텐츠 저장하기
    saveIt (item, saveYn) {
      console.log('saveYn: ' + saveYn)
      // 1. 화면 조작
      item.save_yn = saveYn

      // 2. 컨텐츠 저장 테이블에 저장
      let contentsSaveVo = {}
      contentsSaveVo.seq_contents = item.seq
      contentsSaveVo.save_yn = saveYn
      contentsSaveVo.uid = this.$store.state.userVo.uid

      this.$axios.post(this.$store.state.apiServerIp + '/api/contents/updateContentsSave', contentsSaveVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 컨텐츠 댓글 모달
    showContentsReplyModal (item) {
      this.$refs.contentsReplyModal.contentsVo = item
      this.$refs.contentsReplyModal.show()
    },
    // 유저홈 팝업
    showUserHome (uid) {
      // 로그인 체크
      /*
      if (!this.checkLogin()) {
        this.$refs.loginModal.show()
        return
      }
      */
      Vue.prototype.$showUserHome(uid)
    },
    // 모임 수정 화면으로 이동
    goModifyCircle (seq) {
      this.$router.push('/circle/circleModify?seq=' + seq)
    },
    // 메뉴로 이동
    goMenu (path) {
      // 로그인 체크
      /*
      if (!this.checkLogin()) {
        this.$refs.loginModal.show()
        return
      }
      */
      this.$router.push(path)
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
    },
    addComma (num) {
      return Vue.prototype.$addComma(num)
    },
    sendMessage () { // 채팅 메세지 등록 전 정합성 체크
      if (this.message !== '') {
        this.insertCircleChat()
      }
    },
    insertCircleChat () { // 채팅 메세지 등록
      console.log(this.message)
      let circleChatVo = {}
      circleChatVo.message = this.message
      circleChatVo.reg_id = this.$store.state.userVo.uid
      circleChatVo.chat_cd = null
      circleChatVo.seq_circle = this.circleVo.seq
      // 채팅 메세지 등록
      this.$axios.post(this.$store.state.apiServerIp + '/api/circle/insertCircleChat', circleChatVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.message = ''
          this.chatList = result.data
          this.scrollDownToBottom() // 스크롤 맨아래로 이동
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // ■ 로그인 콜백
    callbackLogin () {
      // 로그인 후 액션
      this.selectCircle()
      // this.$router.push('/circle/circleInfo?seq=' + this.$route.query.seq)
    },
    // 동영상 URL에 파라미터 추가 (playsinline=1)
    setVideoParams (videoUrl) {
      return Vue.prototype.$setVideoParams(videoUrl)
    },
    setHtml (str) {
      return Vue.prototype.$setHtml(str)
    },
    goHome () {
      this.$router.push('/menu')
    }
  }
}
</script>
