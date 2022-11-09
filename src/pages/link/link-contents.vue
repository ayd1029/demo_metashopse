<template>
  <q-page class="">

    <shareModal ref="shareModal" />
    <loginModal ref="loginModal" />
    <contentsReplyModifyModal ref="contentsReplyModifyModal" />

    <q-layout-header>
      <q-toolbar
        color="black"
        inverted
      >
        <!-- <img src="statics/icons/logo.png" style="width: 20px; height: 20px;">&nbsp; -->
        <q-btn v-if="checkLogin()" flat round dense icon="fast_rewind" @click="goHome" />
        <q-btn v-else flat round dense icon="home" @click="goHome" />
        <!-- <img v-else @click="goHome" src="statics/icons/logo.png" style="width: 30px; height: 30px;"> -->
        &nbsp;&nbsp;&nbsp;
        <img @click="goHome" src="statics/images/logo/widelogo.png" style="width: 100px;">
        <!-- <q-btn flat round dense icon="flag" /> -->
        <q-toolbar-title></q-toolbar-title>
        <q-btn flat round dense icon="search" @click="goSearch" />
        <!-- <q-btn flat round dense icon="close" @click="close" /> -->
      </q-toolbar>

    </q-layout-header>

    <div style="width: 100%; margin: 0px 0px 0px 0px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
        <tr>
          <td align="center" colspan="3"></td>
        </tr>
        <tr>
          <td align="center" colspan="3">
            <div style="width: 100%; margin: 0px 0px 0px 0px;">
              <table border="0" cellpadding="0" cellspacing="0" style="width: 100%">
                <tr>
                  <td width="50" rowspan="2" align="center">
                    <div class="round-main">
                      <a @click="showUserHome(contentsVo.reg_id)"><img :src="contentsVo.profile_image" style="width: 30px"></a>
                    </div>
                  </td>
                  <td><a @click="showUserHome(contentsVo.reg_id)"><font size="2" color="grey">{{ contentsVo.name }}</font></a></td>
                  <td width="50" rowspan="2" align="center">
                    <!-- 기능버튼 -->
                    <q-btn flat round dense color="grey" icon="more_vert">
                      <q-popover>
                        <q-list link class="scroll" style="min-width: 100px">
                          <q-item key="1" v-close-overlay @click.native="copyUrlAuto('CONTENTS', contentsVo.seq)"><q-item-main label="링크복사" /></q-item>
                          <!-- <q-item key="2" v-if="$store.state.userVo != null && contentsVo.reg_id === $store.state.userVo.uid" v-close-overlay @click.native="goContensModify(contentsVo)"><q-item-main label="수정하기" /></q-item> -->
                          <!-- <q-item key="3" v-if="$store.state.userVo != null && contentsVo.reg_id === $store.state.userVo.uid" v-close-overlay @click.native="deleteContents(contentsVo, index)"><q-item-main label="삭제하기" /></q-item> -->
                          <q-item key="4" v-close-overlay @click.native="reportContents(contentsVo)"><q-item-main label="신고하기" /></q-item>
                        </q-list>
                      </q-popover>
                    </q-btn>
                  </td>
                </tr>
                <tr>
                  <td><font size="2" color="black"><div v-html="contentsVo.title" /></font></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" style="width: 100%">
                <tr>
                  <td>
                    <div v-if="contentsVo.imageList != null && contentsVo.imageList.length > 1" style="width: 100%; margin: 5px 0px 0px 0px;">
                      <q-carousel color="white" arrows :quick-nav="contentsVo.video_url == null" quick-nav-icon="favorite" :height="`${widthOneOne}px`">
                        <q-carousel-slide v-for="images in contentsVo.imageList" :key="images.seq" :img-src="images.url_path" />
                        <q-carousel-slide v-if="contentsVo.video_url != null"><q-video class="absolute-full" :src="setVideoParams(contentsVo.video_url)" playsinline webkit-playsinline /></q-carousel-slide>
                      </q-carousel>
                    </div>
                    <div v-else-if="contentsVo.image_url != null && contentsVo.video_url != null" style="width: 100%; margin: 5px 0px 0px 0px;">
                      <q-carousel color="white" arrows :quick-nav="contentsVo.video_url == null" quick-nav-icon="favorite" :height="`${widthOneOne}px`">
                        <q-carousel-slide :img-src="contentsVo.image_url" />
                        <q-carousel-slide><q-video class="absolute-full" :src="setVideoParams(contentsVo.video_url)" playsinline webkit-playsinline /></q-carousel-slide>
                      </q-carousel>
                    </div>
                    <div v-else-if="contentsVo.image_url != null && contentsVo.video_url == null" style="width: 100%; margin: 5px 0px 0px 0px;">
                      <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tr>
                          <td><img :src="contentsVo.image_url" :style="`width: ${widthOneOne}px;`"></td>
                        </tr>
                      </table>
                    </div>
                    <div v-else-if="contentsVo.video_url != null" style="width: 100%; margin: 5px 0px 0px 0px;">
                      <q-carousel color="white" :height="`${widthOneOne}px`">
                        <q-carousel-slide><q-video class="absolute-full" :src="setVideoParams(contentsVo.video_url)" playsinline webkit-playsinline /></q-carousel-slide>
                      </q-carousel>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div v-if="contentsVo.rating != null" style="width: 100%; text-align: center; margin: 4px 0px 0px 0px;">
              <div v-if="contentsVo.rating == 1"><font size="3" color="grey">평점 </font><q-rating v-model="contentsVo.rating" icon="sentiment_very_dissatisfied" :max="5" size="50px" color="red" readonly /><b> 나쁨</b></div>
              <div v-if="contentsVo.rating == 2"><font size="3" color="grey">평점 </font><q-rating v-model="contentsVo.rating" icon="sentiment_dissatisfied" :max="5" size="50px" color="orange" readonly /><b> 별로</b></div>
              <div v-if="contentsVo.rating == 3"><font size="3" color="grey">평점 </font><q-rating v-model="contentsVo.rating" icon="sentiment_satisfied" :max="5" size="50px" color="green" readonly /><b> 보통</b></div>
              <div v-if="contentsVo.rating == 4"><font size="3" color="grey">평점 </font><q-rating v-model="contentsVo.rating" icon="sentiment_satisfied_alt" :max="5" size="50px" color="cyan" readonly /><b> 좋음</b></div>
              <div v-if="contentsVo.rating == 5"><font size="3" color="grey">평점 </font><q-rating v-model="contentsVo.rating" icon="sentiment_very_satisfied" :max="5" size="50px" color="blue" readonly /><b> 최고</b></div>
            </div>
            <div v-if="contentsVo.seq_product != null" style="width: 100%; text-align: center; margin: 4px 0px 0px 0px;">
              <q-btn outline color="blue" style="width: 98%" @click="goProductDetail(contentsVo.seq_product)">상품 상세보기</q-btn>
            </div>
            <div v-if="contentsVo.seq_circle != null" style="width: 100%; text-align: center; margin: 4px 0px 0px 0px;">
              <q-btn outline color="green" style="width: 98%" @click="goCircleInfo(item.seq_circle)">모임 방문</q-btn>
            </div>
            <div style="width: 100%; margin: 0px 0px 0px 0px;">
              <table style="width: 99%; border-collapse:collapse; border-spacing:0px;" border="0" cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <td width="10" align="left"></td>
                  <td width="60" align="left">
                    <!-- 댓글 -->
                    <q-btn dense flat round color="black" icon="chat" />
                    <font size="1" color="black">{{contentsVo.reply_count}}</font>
                  </td>
                  <td width="60" align="left">
                    <!-- 좋아요 -->
                    <q-btn dense v-if="contentsVo.like_cd === 'Y'" flat round color="primary" icon="thumb_up_alt" @click="likeIt(contentsVo, 'YES')" />
                    <q-btn dense v-else flat round color="black" icon="thumb_up_alt" @click="likeIt(contentsVo, 'YES')" />
                    <font size="1" color="black">{{contentsVo.like_yes_count}}</font>
                  </td>
                  <td width="60" align="left">
                    <!-- 싫어요 -->
                    <q-btn dense v-if="contentsVo.like_cd === 'N'" flat round color="primary" icon="thumb_down_alt" @click="likeIt(contentsVo, 'NO')" />
                    <q-btn dense v-else flat round color="black" icon="thumb_down_alt" @click="likeIt(contentsVo, 'NO')" />
                    <font size="1" color="black">{{contentsVo.like_no_count}}</font>
                  </td>
                  <td width="60" align="left">
                    <!-- 공유 -->
                    <q-btn dense flat round color="black" icon="share" @click="copyUrlAuto('CONTENTS', contentsVo.seq)" />
                  </td>
                  <td width="60" align="left">
                    <!-- 플레이어 플레이 -->
                    <q-btn v-if="contentsVo.video_url != null && contentsVo.video_url != ''" dense flat round color="black" icon="branding_watermark" @click="playPlayer(contentsVo)" />
                  </td>
                  <td align="left"></td>
                  <td width="50" align="left">
                    <!-- 저장 -->
                    <q-btn dense v-if="contentsVo.save_yn === 'Y'" flat round color="primary" icon="beenhere" @click="saveIt(contentsVo, 'N')" />
                    <q-btn dense v-else flat round color="black" icon="beenhere" @click="saveIt(contentsVo, 'Y')" />
                  </td>
                </tr>
              </table>
            </div>
            <div style="width: 100%; margin: 5px 0px 0px 0px;">
              <table style="width: 95%; border-collapse:collapse;" border="0" align="center">
                <tr>
                  <td colspan="3" align="left">
                    <!-- <div v-html="setHtml(contentsVo.contents)" :style="`width:${widthOneOne-10}px; word-wrap: break-word;`"></div> -->
                    <div v-html="setHtml(contentsVo.contents)" style="word-break: break-all;"></div>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
      <br>
      <table v-for="item in contentsVo.contentsReplyList" :key="item.seq" border="0" style="width: 100%;" cellpadding="0" cellspace="0">
        <tr v-if="item.target_seq === ''"><td colspan="6"><q-card-separator /></td></tr>
        <tr><td colspan="6"></td></tr>
        <tr><td colspan="6"></td></tr>
        <tr><td colspan="6"></td></tr>
        <tr>
          <td rowspan="2" width="1"></td>
          <td rowspan="2" width="50" align="right" v-if="item.target_seq === ''" style="vertical-align:top;">
            <a @click="showUserHome(item.reg_id)"><div class="round-countents-reply"><img :src="item.profile_image" style="width: 45px"></div></a>
          </td>
          <td rowspan="2" width="50" align="right" v-else style="vertical-align:top;">
            <a @click="showUserHome(item.reg_id)"><div class="round-countents-reply2"><img :src="item.profile_image" style="width: 30px"></div></a>
          </td>
          <td rowspan="2" width="5">&nbsp;</td>
          <td colspan="1" width=""><a @click="setReplyTarget(item)"><font size="2" color="grey">{{ item.name }}</font></a></td>
          <td colspan="1" align="right"><font size="1" color="grey">{{ item.reg_time }}</font></td>
          <td colspan="1" width="35" align="left">
            <q-btn v-if="item.reg_id === $store.state.userVo.uid && item.del_id == null" flat round dense color="grey" icon="more_vert" size="sm">
              <q-popover>
                <q-list link class="scroll" style="width:100px;">
                  <q-item key="1" v-close-overlay @click.native="modifyReply(item)"><q-item-main label="수정하기" /></q-item>
                  <q-item key="2" v-close-overlay @click.native="deleteReply(item)"><q-item-main label="삭제하기" /></q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="word-break:break-all;">
            <div v-if="item.del_id == null">
              <a @click="setReplyTarget(item)"><font size="2" color="black">{{ item.reply }}&nbsp;</font></a>
            </div>
            <div v-else>
              <font size="1" color="grey">{{ item.reply }}&nbsp;</font>
            </div>
          </td>
          <td colspan="1" align="left">
            <a @click="setReplyTarget(item)"><font size="2" color="red">답글</font></a>
          </td>
        </tr>
        <tr><td colspan="6"></td></tr>
        <tr><td colspan="6"></td></tr>
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
      <br>
      <br>
      <br>
      <br>
      <br>
      <q-page-sticky expand position="bottom">
        <!-- 댓글 입력창 -->
        <table border="0" width="100%" cellspacing="0" cellpadding="0" style="background:white;">
          <tr>
            <td colspan="2"><q-card-separator /></td>
          </tr>
          <tr>
            <td width="100%"><q-input ref="inputReply" v-model.trim="reply" @input="onChangeReply" color="white" style="width:100%;" class="no-shadow" type="textarea" inverted-light clearable /></td>
            <td width="45"><q-btn dense icon="send" color="primary" @click="insertContentsReply" style="height:45px; width:55px;" /></td>
          </tr>
        </table>
      </q-page-sticky>
    </div>
  </q-page>
</template>

<style>
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
.round-countents-reply {
  border-radius: 50%;
  overflow: hidden;
  width: 45px;
  height: 45px;
}
.round-countents-reply img {
  display: block;
  min-width: 100%;
  min-height: 100%;
}
.round-countents-reply2 {
  border-radius: 50%;
  overflow: hidden;
  width: 30px;
  height: 30px;
}
.round-countents-reply2 img {
  display: block;
  min-width: 100%;
  min-height: 100%;
}
</style>

<script>
import Vue from 'vue'

export default {
  // name: 'mystore',
  data () {
    return {
      contentsVo: {},
      contentsReplyVo: {
        seq: '',
        seq_contents: '',
        target_seq: '',
        target_uid: '',
        reply: '',
        reg_id: '',
        mod_id: '',
        contentsOwnerUid: '' // 알림용 컨텐츠 등록자 아이디
      },
      reply: '', // 입력 전용
      widthOneOne: 0 // 화면너비를 1로 나눈 값
    }
  },
  created: function () {
    // 로그인 후 돌아올 페이지 설정
    // this.$store.state.redirectTo = '/link/contents?seq=' + this.contentsVo.seq
    let path = this.$store.state.ROUTER_TO_PATH[this.$store.state.ROUTER_TO_PATH.length - 1]
    this.$cookie.set('LOGIN_REDIRECT_URL', path, 1) // 현재 페이지 쿠키에 저장

    // let autoLoginRun = this.$cookie.get('autoLoginRun')
    // if (autoLoginRun === 'true') {
    // if (this.$store.state.userVo != null && this.$store.state.userVo !== '' && this.$store.state.userVo.uid !== '') {
    //   this.$router.push('/main')
    // }
    // }
    this.widthOneOne = window.innerWidth
    if (window.innerWidth > window.innerHeight) {
      this.widthOneOne = window.innerHeight / 2
    }
    // console.log('여기는 링크 컨텐츠 화면이다.')
    this.$q.loading.show() // 로딩 표시 시작
    this.$axios.get(this.$store.state.apiServerIp + '/api/contents/selectContents',
      {params: {seq_contents: this.$route.query.seq}})
      .then((result) => {
        this.$q.loading.hide() // 로딩 표시 종료
        // console.log(JSON.stringify(result.data))
        this.contentsVo = result.data
      })
      .catch((err) => {
        this.$q.loading.hide() // 로딩 표시 종료
        console.log(err)
      })
    // this.contentsReplyList = []
    // 댓글 리스트 조회
    /*
    this.$axios.get(this.$store.state.apiServerIp + '/api/contents/selectContentsReplyList',
      {params: {seq_contents: this.$route.query.seq}})
      .then((result) => {
        // console.log(JSON.stringify(result.data))
        this.contentsReplyList = result.data
        // this.$emit('callback-login', this.$store.state.userVo.uid)
      })
      .catch((err) => {
        console.log(err)
      })
    */
  },
  methods: {
    // 댓글 수정
    modifyReply (item) {
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        this.$refs.loginModal.show()
        return
      }
      this.$refs.contentsReplyModifyModal.contentsReplyVoOriginal = item // 수정완료 후 표시를 위해 설정
      this.$refs.contentsReplyModifyModal.contentsReplyVo = JSON.parse(JSON.stringify(item))
      this.$refs.contentsReplyModifyModal.show()
    },
    // 댓글 삭제
    deleteReply (item) {
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        this.$refs.loginModal.show()
        return
      }
      // 삭제 확인
      this.$q.dialog({
        title: '댓글 삭제',
        message: '정말 삭제하시겠습니까?',
        ok: '예',
        cancel: '아니오',
        preventClose: true
      }).then(() => {
        // 댓글 삭제 - 내용을 '삭제되었습니다'로 수정
        this.$q.loading.show() // 로딩 표시 시작
        this.$axios.post(this.$store.state.apiServerIp + '/api/contents/deleteContentsReply', item)
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            item.reply = '작성자에 의해 삭제되었습니다.'
            item.del_id = this.$store.state.userVo.uid
            this.$q.loading.hide() // 로딩 표시 종료
            this.$q.notify({
              color: 'primary',
              position: 'left',
              message: '삭제되었습니다.',
              icon: 'notifications_active'
            })
          })
          .catch((err) => {
            console.log(err)
            this.$q.loading.hide() // 로딩 표시 종료
            this.$q.notify({
              color: 'primary',
              position: 'left',
              message: '네트워크 오류. 다시 시도해주세요.',
              icon: 'notifications_active'
            })
          })
      }).catch(() => {
        // this.$q.notify(`You didn't agree`)
      })
    },
    // 플레이어로 재생
    playPlayer (item) {
      let videoUrl = item.video_url // DB상의 동영상 URL

      // 동영상 주소 설정
      let prefix = '' // '?'가 있으면 &로 파라미터 추가, '?'가 없으면 '?'로 파라미터 추가
      let playUrl = '' // 파라미터 붙인 동영상 URL
      if (videoUrl.toString().indexOf('?') < 0) { // '?'가 없는 경우
        prefix = '?'
      } else { // '?'가 있는 경우
        prefix = '&'
      }
      playUrl = videoUrl + prefix + this.$store.state.videoUrlParameter // 'rel=0&enablejsapi=1&playsinline=1'

      // 1. 플레이어 플레이
      // 화면 뒤로가기시 플레이어 플레이가 이전영상을 플레이하면서 스토어에 주소는 마지막 주소가 저장되어 있어서
      // 이전 영상을 플레이 해도 주소가 동일하기 때문에 재생을 하지 않는 버그 대응
      // this.$store.state.playVideoUrl = '' // 뒤로가기 했을때 플레이어 버그 대응 -> 이것도 안먹힘..
      if (this.$store.state.playVideoUrl === playUrl) {
        this.$store.state.playVideoUrl = playUrl + '&dummy'
      } else {
        this.$store.state.playVideoUrl = playUrl
      }
      // 2. 플레이어 버튼 설정
      this.$store.state.playerIsPlaying = true
      this.$store.state.playerIsShowing = true
      this.$store.state.playerStatusIcon = 'pause_circle_outline'
      this.$store.state.playerIsShowingIcon = 'hearing'
      if (this.$store.state.playerWidth === 0) {
        // 플레이어 비표시 중이면 표시
        this.$store.state.playerWidth = 160
        this.$store.state.playerHeight = 90
        this.$store.state.playerSizeIsBig = false // 작게 표시중
        this.$store.state.playerSizeIcon = 'featured_video' // 작게 표시중
      }

      // 3. 플레이 히스토리 등록
      if (this.$store.state.playVideoUrl !== playUrl) { // 같은 영상이 아닐 경우만 저장
        if (this.$store.state.userVo != null && this.$store.state.userVo.uid != null && this.$store.state.userVo.uid !== '') {
          let playlistVo = {}
          playlistVo.seq_contents = item.seq
          if (videoUrl.toString().indexOf('list=') < 0) {
            playlistVo.list_yn = 'N'
          } else {
            playlistVo.list_yn = 'Y'
          }
          playlistVo.video_url = videoUrl

          this.$axios.post(this.$store.state.apiServerIp + '/api/playlist/insertPlaylistHistory', playlistVo)
            .then((result) => {
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
    },
    checkLogin () {
      return Vue.prototype.$checkLogin(this.$store.state.userVo)
    },
    // 유저홈 팝업
    showUserHome (uid) {
      Vue.prototype.$showUserHome(uid)
    },
    goSearch () {
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        this.$refs.loginModal.show()
        return
      }
      this.$router.push('/search')
    },
    // 상품 상세 화면으로 이동
    goProductDetail (seqProduct) {
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        this.$refs.loginModal.show()
        return
      }
      this.$router.push('/productDetail?seq=' + seqProduct)
    },
    // 모임 정보 화면으로 이동
    goCircleInfo (seqCircle) {
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        this.$refs.loginModal.show()
        return
      }
      this.$router.push('/circle/circleInfo?seq=' + seqCircle)
    },
    // 좋아요/싫어요
    likeIt (item, likeCd) {
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        this.$refs.loginModal.show()
        return
      }
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
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        this.$refs.loginModal.show()
        return
      }
      console.log('saveYn: ' + saveYn)
      // 1. 화면 조작
      item.save_yn = saveYn

      // 2. 컨텐츠 저장 테이블에 저장
      let contentsSaveVo = {}
      contentsSaveVo.seq_contents = item.seq
      contentsSaveVo.save_yn = saveYn
      contentsSaveVo.uid = this.$store.state.userVo.uid

      if (saveYn === 'Y') { // 저장인 경우
        this.$q.notify({
          color: 'primary',
          position: 'top',
          message: '저장되었습니다.',
          icon: 'notifications_active'
        })
      }
      this.$axios.post(this.$store.state.apiServerIp + '/api/contents/updateContentsSave', contentsSaveVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
        })
        .catch((err) => {
          console.log(err)
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
    // 신고하기
    reportContents (item) {
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        this.$refs.loginModal.show()
        return
      }
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
    onChangeReply () {
      if (this.reply === '') {
        // 댓글 대상 해제
        this.contentsReplyVo.target_seq = ''
        this.contentsReplyVo.target_uid = ''
      }
    },
    // 댓글 대상 설정
    setReplyTarget (item) {
      this.contentsReplyVo.target_seq = item.seq
      this.contentsReplyVo.target_uid = item.reg_id
      this.reply = '@' + item.name + ' '

      // 입력창에 포커스
      this.$refs.inputReply.focus()
    },
    // 댓글 등록
    insertContentsReply () {
      // 로그인 체크
      if (!Vue.prototype.$checkLogin(this.$store.state.userVo)) {
        this.$refs.loginModal.show()
        return
      }
      if (this.reply === '') {
        return
      }
      console.log(this.contentsReplyVo)
      this.contentsReplyVo.seq_contents = this.contentsVo.seq
      this.contentsReplyVo.contentsOwnerUid = this.contentsVo.reg_id
      this.contentsReplyVo.reg_id = this.$store.state.userVo.uid
      this.contentsReplyVo.reply = this.reply

      this.reply = '' // 입력창 초기화

      // 댓글 등록
      this.$axios.post(this.$store.state.apiServerIp + '/api/contents/insertContentsReply', this.contentsReplyVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.contentsVo.contentsReplyList = result.data // 댓글 조회결과 재설정
          this.contentsVo.reply_count = result.data.length
          // this.scrollDownToBottom() // 스크롤 맨아래로 이동
        })
        .catch((err) => {
          console.log(err)
        })
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
      /*
      if (!this.checkLogin()) {
        // this.$refs.loginModal.show()
        this.$router.push('/menu')
      } else {
        if (history.length > 1) { // 뒤로갈 히스토리가 있으면
          this.$router.go(-1) // 뒤로가기
        } else { // 히스토리가 없으면
          // 메인 페이지로
          this.$router.push('/main')
        }
        // this.$router.push('/menu/newContentsList')
        this.$router.push('/menu')
      }
      */
    }
  }
}
</script>
