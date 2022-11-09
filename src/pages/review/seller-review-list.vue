<template>
  <q-page class="flex justify-center">

    <shareModal ref="shareModal" />
    <contentsReplyModal ref="contentsReplyModal" />
    <contentsModifyModal ref="contentsModifyModal" />

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <q-btn flat round dense icon="fast_rewind" @click="goBack" />
        <q-toolbar-title>리뷰 관리</q-toolbar-title>
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
        <!-- <q-select inverted-light color="white" v-model="orderby" :options="$store.state.reviewOrderbyOptions" style="width:120px" /> -->
      </q-toolbar>
    </q-layout-header>

    <!-- 판매자 리뷰 관리 -->
    <div id="sellerReview" :style="`width: ${widthRate}%; margin: 5px 0px 0px 0px;`">
      <!-- 1. 컨텐츠 리스트 -->
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
                      <!-- <q-carousel-slide v-if="item.video_url != null"><q-video class="absolute-full" :src="item.video_url" /></q-carousel-slide> -->
                    </q-carousel>
                  </div>
                  <div v-else-if="item.image_url != null && item.video_url != null" style="width: 100%; margin: 5px 0px 0px 0px;">
                    <q-carousel color="white" arrows :quick-nav="item.video_url == null" quick-nav-icon="favorite" :height="`${widthOneOne}px`">
                      <q-carousel-slide :img-src="item.image_url" />
                      <!-- <q-carousel-slide><q-video class="absolute-full" :src="item.video_url" /></q-carousel-slide> -->
                    </q-carousel>
                  </div>
                  <div v-else-if="item.image_url != null && item.video_url == null" style="width: 100%; margin: 5px 0px 0px 0px;">
                    <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                      <tr>
                        <td><img :src="item.image_url" :style="`width: ${widthOneOne}px;`"></td>
                      </tr>
                    </table>
                  </div>
                  <!--
                  <div v-else-if="item.video_url != null" style="width: 100%; margin: 5px 0px 0px 0px;">
                    <q-carousel color="white" :height="`${widthOneOne}px`">
                      <q-carousel-slide><q-video class="absolute-full" :src="item.video_url" /></q-carousel-slide>
                    </q-carousel>
                  </div>
                  -->
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
        <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
      </q-infinite-scroll>
    </div>
    <br>
    <br>
    <br>&nbsp;
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
.round-circle-list {
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
}
.round-circle-list img {
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
      widthRate: 100, // 레이아웃 너비 % - PC화면 대응
      uid: '',
      seqProduct: '',
      orderby: '', // 정렬순
      contentsList: [], // 상품리뷰 리스트
      pageSizeContents: 15,
      lastPageNumContents: 1, // 상품리뷰 마지막 페이지
      // widthOneThird: 0, // 화면너비를 3으로 나눈 값 : 이미지형 리스트 정사각형으로 만들어야 되는데..시간점..
      widthOneOne: 0 // 화면너비를 1로 나눈 값 : 이미지형 리스트 정사각형으로 만들어야 되는데..시간점..
    }
  },
  created: function () {
    // this.widthOneThird = window.innerWidth / 3 - 6
    this.widthOneOne = window.innerWidth
    if (window.innerWidth > window.innerHeight) {
      this.widthOneOne = window.innerHeight / 1.5
    }
    if (this.$store.state.device === 'P') { // PC인 경우
      this.widthRate = 40 // 화면 너비 50%
    }
    this.selectContentsListMax() // 컨텐츠 마지막페이지 조회
  },
  methods: {
    // 상품리뷰 loadMore
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
      }, 100)
    },
    // 컨텐츠 리스트 마지막 페이지 조회
    selectContentsListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/review/selectSellerReviewListLastPageNum',
        {params: {pageSize: this.pageSizeContents}})
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
      this.$axios.get(this.$store.state.apiServerIp + '/api/review/selectSellerReviewList',
        {params: {pageNum: idx, pageSize: this.pageSizeContents}})
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
      Vue.prototype.$showUserHome(uid)
    },
    setHtml (str) {
      return Vue.prototype.$setHtml(str)
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
