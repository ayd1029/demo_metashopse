<template>
  <q-page class="">

    <shareModal ref="shareModal" />
    <contentsReplyModal ref="contentsReplyModal" />
    <contentsModifyModal ref="contentsModifyModal" />

    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <!-- <img src="statics/icons/logo.png" style="width: 20px; height: 20px;">&nbsp; -->
        <!--<img src="statics/icons/logo.png" style="width: 30px; height: 30px;">-->
        <img src="statics/images/logo/widelogo.png" style="width:100px;">
        <!-- <q-btn flat round dense icon="play_circle_outline" /> -->
        <q-toolbar-title></q-toolbar-title>
        <q-btn flat round dense icon="search" @click="goSearch" />
        <!-- <q-btn flat round dense icon="close" @click="close" /> -->
      </q-toolbar>

    </q-layout-header>

    <div style="width: 100%; margin: 0px 0px 0px 0px;">
      <q-pull-to-refresh :handler="refresher" pull-message="땡기라~더땡기라~" release-message="놔라~이제점놔라~" refresh-message="온다온다~" >
        <table border="0" style="width:100%;" cellspacing="0" cellpadding="0">
          <thead>
            <th width="25%"></th>
            <th width="15%"></th>
            <th width="15%"></th>
            <th width="15%"></th>
            <th width="15%"></th>
            <th width="15%"></th>
          </thead>
          <tr>
            <td rowspan="5" align="center"><img :src="userVo.profile_image" style="width:90px; height:90px; object-fit:cover;"></td>
            <!-- <td rowspan="5" width="130px"><img src="statics/images/member/profile/profile6.jpg" style="width: 100%;"></td> -->
            <td align="center"><a @click="changeTabInfo('CONTENTS')"><font size="3" color="black">{{ userVo.count_contents }}</font><br><font size="2" color="grey">게시물</font></a></td>
            <td align="center"><a @click="changeTabInfo('PRODUCT')"><font size="3" color="black">{{ userVo.count_product }}</font><br><font size="2" color="grey">상품</font></a></td>
            <td align="center"><a @click="changeTabInfo('CIRCLE')"><font size="3" color="black">{{ userVo.count_circle }}</font><br><font size="2" color="grey">모임</font></a></td>
            <td align="center"><a @click="goFollowList('FOLLOWER')"><font size="3" color="black">{{ userVo.count_follow_from }}</font><br><font size="2" color="grey">팔로워</font></a></td>
            <td align="center"><a @click="goFollowList('FOLLOWING')"><font size="3" color="black">{{ userVo.count_follow_to }}</font><br><font size="2" color="grey">팔로잉</font></a></td>
          </tr>
          <tr>
            <td colspan="5"><q-card-separator /></td>
          </tr>
          <tr>
            <td colspan="2"><font size="2" color="grey">&nbsp;&nbsp;원더 랭킹</font></td>
            <td colspan="3" align="right"><font size="3" color="black">{{ userVo.ranking }}</font>&nbsp;<font size="2" color="grey">위</font>&nbsp;&nbsp;&nbsp;</td>
          </tr>
          <tr>
            <td colspan="2"><font size="2" color="grey">&nbsp;&nbsp;원더 누적</font></td>
            <td colspan="3" align="right"><font size="3" color="black">{{ addComma(userVo.coin) }}</font>&nbsp;<img src="statics/images/logo/logocoin.png" style="width: 12px">&nbsp;&nbsp;&nbsp;</td>
          </tr>
          <tr>
            <td colspan="5"></td>
          </tr>
        </table>
        <table border="0" cellspacing="0" cellpadding="0" style="width:100%; margin:7px 0px 0px 0px;">
          <tr>
            <td colspan="2">&nbsp;&nbsp;<b><font size="3" color="black">{{ userVo.name }}&nbsp;</font></b></td>
            <td colspan="4" align="right">
              <a v-if="userVo.homepage != null" @click="showSns(userVo.homepage)"><img src="statics/images/logo/homepage.png" style="width: 20px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a v-if="userVo.facebook != null" @click="showSns(userVo.facebook)"><img src="statics/images/logo/facebook.png" style="width: 20px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a v-if="userVo.instagram != null" @click="showSns(userVo.instagram)"><img src="statics/images/logo/instagram.png" style="width: 20px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a v-if="userVo.twitter != null" @click="showSns(userVo.twitter)"><img src="statics/images/logo/twitter.png" style="width: 20px">&nbsp;&nbsp;&nbsp;</a>
            </td>
          </tr>
        </table>
        <table border="0" cellspacing="0" cellpadding="0" style="width:100%; margin:7px 0px 0px 0px;">
          <tr>
            <td align="left">
              <a @click="copyUrl(mystoreUrl)">
                &nbsp;&nbsp;<font size="2" color="grey">{{ mystoreUrl }}</font>
                &nbsp;&nbsp;<q-icon name="file_copy" />&nbsp;<font size="2" color="black">주소복사</font>&nbsp;&nbsp;&nbsp;
              </a>
            </td>
          </tr>
        </table>
        <table border="0" cellspacing="0" cellpadding="0" style="width:100%; margin:7px 0px 0px 0px;">
          <tr>
            <td align="center">
              <!-- <div id="divIntroduce" v-html="userVo.introduce" style="width: 100%; display:block;"></div> -->
              <!-- <font size="2" color="grey">{{ userVo.introduce }}</font> -->
              <table border="0" style="width:98%;">
                <tr>
                  <td>
                    <div v-html="setHtml(userVo.introduce)" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <br>

        <div style="width:100%">
          <q-card-separator />
          <q-tabs v-model="$store.state.selectedHomeTab" inverted align="justify" color="primary">
            <q-tab name="CONTENTS" slot="title" icon="play_circle_filled" @click="changeTabInfo('CONTENTS')" />
            <q-tab name="PRODUCT" slot="title" icon="widgets" @click="changeTabInfo('PRODUCT')" />
            <q-tab v-if="$store.state.USE_CIRCLE" name="CIRCLE" slot="title" icon="group" @click="changeTabInfo('CIRCLE')" />
          </q-tabs>
          <q-card-separator />
        </div>

        <!-- 컨텐츠 -->
        <div id="divContentsList" style="width: 100%;">
          <!-- 1. 컨텐츠 리스트 -->
          <div id="divNormalContents" style="width: 100%; margin: 5px 0px 0px 0px;">
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
                      <td width="60" align="left">
                        <!-- 플레이어 플레이 -->
                        <q-btn v-if="item.video_url != null && item.video_url != ''" dense flat round color="black" icon="branding_watermark" @click="playPlayer(item)" />
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
              <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
            </q-infinite-scroll>
          </div>
        </div>

        <div id="divProductList" style="width:100%;">
          <!-- 2. 상품리스트 -->
          <div id="divNormalProduct" style="width: 100%;">
            <q-infinite-scroll :handler="loadMoreProduct" ref="infiniteScrollProduct">
              <div style="padding:0px 0px 0px 0px" v-for="item in productList" :key="item.seq">
                <q-item :to="`/productDetail?seq=${item.seq_product}&uid=${uid}`" style="padding:0px 0px 0px 0px">
                  <table border="0" style="width: 100%; padding:5px 0px 5px 0px;">
                    <tr>
                      <td rowspan="7" width="150"><img :src="item.image_url" class='image-product-list'></td>
                      <td rowspan="7" width="10">&nbsp;</td>
                      <td colspan="5">
                        <font v-if="item.free_delivery_yn === 'true'" size="1" color="red">무료배송&nbsp;&nbsp;</font>
                        <font v-if="item.dawn_delivery_yn === 'true'" size="1" color="green">새벽배송&nbsp;&nbsp;</font>
                        <font size="1" color="blue">&nbsp;&nbsp;</font>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5"><font size="2" color="grey">{{ item.subtitle }}&nbsp;</font></td>
                    </tr>
                    <tr>
                      <td colspan="5">{{ item.title }}</td>
                    </tr>
                    <tr>
                      <td colspan="5">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="text-align: right;"><font size="2" color="grey">&nbsp;</font></td>
                      <td><font size="4" color="black" style="font-weight:bold;">{{ addComma(item.price) }}&nbsp;원</font></td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td style="text-align: right;"><font size="2" color="black">{{ addComma(item.reward_coin) }} <img src="statics/images/logo/logocoin.png" style="width: 9px">&nbsp;&nbsp;&nbsp;</font></td>
                    </tr>
                    <tr>
                      <td colspan="5" style="text-align: right;">
                        <div v-if="item.avg_rating == null"><font size="1" color="orange">☆☆☆☆☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                        <div v-if="item.avg_rating === '1'"><font size="1" color="orange">★</font><font size="1" color="grey">☆☆☆☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                        <div v-if="item.avg_rating === '2'"><font size="1" color="orange">★★</font><font size="1" color="grey">☆☆☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                        <div v-if="item.avg_rating === '3'"><font size="1" color="orange">★★★</font><font size="1" color="grey">☆☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                        <div v-if="item.avg_rating === '4'"><font size="1" color="orange">★★★★</font><font size="1" color="grey">☆</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                        <div v-if="item.avg_rating === '5'"><font size="1" color="orange">★★★★★</font><font size="1" color="grey"> ({{ item.cnt_review }})&nbsp;&nbsp;&nbsp;</font></div>
                      </td>
                    </tr>
                  </table>
                </q-item>
              </div>
              <br>
              <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
            </q-infinite-scroll>
          </div>
        </div>

        <div id="divCircleList" style="width:100%;">
          <!-- 3. 모임리스트 -->
          <div id="divNormalCircle" style="width: 100%;">
            <q-infinite-scroll :handler="loadMoreCircle" ref="infiniteScrollCircle">
              <div style="padding:0px 0px 0px 0px" v-for="item in circleList" :key="item.seq">
                <q-item :to="`/circle/circleInfo?seq=${item.seq}`" style="padding:0px 0px 0px 0px">
                  <table border="0" style="width: 100%; padding:5px 0px 5px 0px;">
                    <tr>
                      <td rowspan="2" width="5px">&nbsp;</td>
                      <td rowspan="2" width="50"><img :src="item.circle_profile_image" class="small-circle-list"></td>
                      <td rowspan="2" width="5px">&nbsp;</td>
                      <td colspan="1">
                        <font size="2" color="black">{{ item.circle_name }}</font>
                      </td>
                      <td colspan="1" align="right">
                        <font size="2" color="grey"></font>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2"><font size="2" color="grey">{{ item.introduce }}&nbsp;</font></td>
                    </tr>
                  </table>
                </q-item>
              </div>
              <br>
              <div style="text-align:center;"><q-spinner-hearts slot="message" :size="100" color="primary"></q-spinner-hearts></div>
            </q-infinite-scroll>
          </div>
        </div>
      </q-pull-to-refresh>

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
</style>

<script>
import Vue from 'vue'
// import { mapState } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      uid: this.$store.state.userVo.uid,
      mystoreUrl: 'https://metashopse.com/home/', // 마이스토어 주소
      refresherDone: '',
      // offset: 500,
      pageSizeContents: 15,
      pageSizeProduct: 15,
      pageSizeCircle: 15,
      lastPageNumContents: 1, // 컨텐츠 마지막 페이지
      lastPageNumProduct: 1, // 상품 마지막 페이지
      lastPageNumCircle: 1, // 모임 마지막 페이지
      // tabInfoCd: 'normal', // normal:일반 리스트 image:이미지 리스트
      // widthOneThird: 0, // 화면너비를 3으로 나눈 값 : 이미지형 리스트 정사각형으로 만들어야 되는데..시간점..
      widthOneOne: 0, // 화면너비를 1로 나눈 값 : 이미지형 리스트 정사각형으로 만들어야 되는데..시간점..
      userVo: {
        uid: '',
        name: '',
        nickname: '',
        ucode: '',
        birth: '',
        gender: '',
        email: '',
        nation: '',
        mobile_no: '',
        tel_no: '',
        profile_image: '',
        thumbnail_image: '',
        introduce: '',
        homepage: '',
        facebook: '',
        instagram: '',
        twitter: ''
      },
      contentsList: [], // 컨텐츠 리스트
      productList: [], // 상품 리스트
      circleList: [] // 모임 리스트
      // widthOneThird: 0, // 화면너비를 3으로 나눈 값 : 이미지형 리스트 정사각형으로 만들어야 되는데..시간점..
    }
  },
  components: {
  },
  /*
  computed: mapState([
    'pageMeta'
  ]),
  */
  created: function () {
    // console.log('window.innerWidth: ' + window.innerWidth)
    // console.log('window.innerWidth / 3: ' + window.innerWidth / 3)
    // this.widthOneThird = window.innerWidth / 3 - 6
    this.widthOneOne = window.innerWidth
    if (window.innerWidth > window.innerHeight) {
      this.widthOneOne = window.innerHeight / 2
    }
    // alert(this.widthOneThird)
    // console.log('this.uid: ' + this.uid)

    // APP에서 이동한 경우 파라미터에 uid, auth_key가 붙어서 옴 -> 로그인 처리
    if (this.$route.query.uid != null && this.$route.query.auth_key != null &&
        (this.$store.state.device === 'android' || this.$store.state.device === 'ios')) { // APP
      this.loginFromApp(this.$route.query.uid, this.$route.query.auth_key)
    } else {
      this.initPage() // 화면 초기화
    }

    // 미확인 메세지 건수 조회
    if (this.$store.state.userVo != null && this.$store.state.userVo.uid != null && this.$store.state.userVo.uid !== '') {
      this.$axios.get(this.$store.state.apiServerIp + '/api/message/selectUnreadMessageCount',
        {params: {uid: this.$store.state.userVo.uid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$store.state.unreadMessageCount = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted: function () {
    // 디폴트 컨텐츠리스트
    if (this.$store.state.selectedHomeTab === 'CONTENTS') {
      document.getElementById('divContentsList').style.display = 'block'
      document.getElementById('divProductList').style.display = 'none'
      document.getElementById('divCircleList').style.display = 'none'
    } else if (this.$store.state.selectedHomeTab === 'PRODUCT') {
      document.getElementById('divContentsList').style.display = 'none'
      document.getElementById('divProductList').style.display = 'block'
      document.getElementById('divCircleList').style.display = 'none'
    } else if (this.$store.state.selectedHomeTab === 'CIRCLE') {
      document.getElementById('divContentsList').style.display = 'none'
      document.getElementById('divProductList').style.display = 'none'
      document.getElementById('divCircleList').style.display = 'block'
    }
  },
  methods: {
    // APP에서 왔을때 로그인 처리
    loginFromApp (uid, authKey) {
      // APP에서 이동한 경우 파라미터에 uid, auth_key가 붙어서 옴 -> 로그인 처리

      // 쿠키에 사용자 정보 저장
      this.$cookie.set('uid', uid, 365)
      this.$cookie.set('auth_key', authKey, 365)

      // 로그인
      let userVo = {}
      userVo.uid = uid
      userVo.pwd = authKey
      this.$axios.post(this.$store.state.apiServerIp + '/api/login/doLogin', userVo)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // 사용자 정보 설정
          this.$store.state.userVo = result.data // 사용자 정보 설정

          this.initPage() // 화면 초기화

          // 사용자 코인 조회
          this.$axios.get(this.$store.state.apiServerIp + '/api/coin/selectCoinRanking',
            {params: {uid: this.$store.state.userVo.uid}})
            .then((result) => {
              // console.log(JSON.stringify(result.data))
              // 코인 정보 설정
              this.$store.state.coinVo = result.data
            })
            .catch((err) => {
              console.log('★★3 ' + err)
            })

          // 판매자 정보 조회
          this.$axios.get(this.$store.state.apiServerIp + '/api/seller/selectSeller')
            .then((result) => {
              // console.log(JSON.stringify(result.data))
              // 판매자 정보 설정
              // 상품 등록시 계좌정보가 없으면 등록필요 알림
              this.$store.state.sellerVo = result.data
              // this.$store.state.sellerVo.from_post_no = result.data.from_post_no
              // this.$store.state.sellerVo.deposit_account_no = result.data.deposit_account_no
            })
            .catch((err) => {
              console.log('★★4 ' + err)
            })

          // 로그인 창 닫기
          this.loginModal = false

          // 미확인 메세지 건수 조회
          this.selectMessageCount()
        })
        .catch((err) => {
          this.loading = false
          console.log('★★5 ' + err)
        })
    },
    // 클립아트로 복사하기
    copyUrl (text) {
      this.$copyText(text).then(function (e) {
        console.log(e)
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
    initPage () {
      // 사용자 정보 조회
      // this.$q.loading.show() // 로딩 표시 시작
      this.$axios.get(this.$store.state.apiServerIp + '/api/user/selectUserHome',
        {params: {uid: this.$store.state.userVo.uid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // this.$q.loading.hide() // 로딩 표시 종료
          this.userVo = result.data

          // 마이스토어 주소 설정
          this.mystoreUrl = this.$store.state.DOMAIN + '/home/' + this.$store.state.userVo.uid
        })
        .catch((err) => {
          console.log(err)
          // this.$q.loading.hide() // 로딩 표시 종료
        })
      this.selectContentsListMax() // 컨텐츠 마지막페이지 조회
      this.selectProductListMax() // 상품 마지막페이지 조회
      if (this.$store.state.USE_CIRCLE) {
        this.selectCircleListMax() // 모임 마지막페이지 조회
      }
    },
    refresher (done) {
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise the refresh message
      //        will continue to be displayed
      // make some Ajax call then call done()
      setTimeout(() => { // 3초 후에 로딩메세지 비표시
        done()
      }, 3000)

      this.initPage() // 화면 초기화

      this.refresherDone = done // load가 끝나면 로딩메세지 종료
      console.log('this.$store.state.selectedHomeTab: ' + this.$store.state.selectedHomeTab)
      if (this.$store.state.selectedHomeTab === 'CONTENTS') {
        this.$refs.infiniteScrollContents.reset() // index 초기화
        this.$refs.infiniteScrollContents.resume() // stop에서 다시 재생
        this.$refs.infiniteScrollContents.loadMore() // loadMore로 검색
      } else if (this.$store.state.selectedHomeTab === 'PRODUCT') {
        this.$refs.infiniteScrollProduct.reset() // index 초기화
        this.$refs.infiniteScrollProduct.resume() // stop에서 다시 재생
        this.$refs.infiniteScrollProduct.loadMore() // loadMore로 검색
      } else if (this.$store.state.selectedHomeTab === 'CIRCLE') {
        this.$refs.infiniteScrollCircle.reset() // index 초기화
        this.$refs.infiniteScrollCircle.resume() // stop에서 다시 재생
        this.$refs.infiniteScrollCircle.loadMore() // loadMore로 검색
      } else {
        console.log('this.$store.state.selectedHomeTab in refresher is else..')
      }
    },
    // 상품 상세 화면으로 이동
    goProductDetail (seqProduct) {
      this.$router.push('/productDetail?seq=' + seqProduct)
    },
    // 모임 정보 화면으로 이동
    goCircleInfo (seqCircle) {
      this.$router.push('/circle/circleInfo?seq=' + seqCircle)
    },
    // 상품정보 탭 변경 표시 처리 (contents:컨텐츠 리스트 product:상품 리스트 circle:모임 리스트)
    changeTabInfo (listType) {
      this.$store.state.selectedHomeTab = listType
      if (listType === 'CONTENTS') {
        document.getElementById('divContentsList').style.display = 'block'
        document.getElementById('divProductList').style.display = 'none'
        document.getElementById('divCircleList').style.display = 'none'
        this.$refs.infiniteScrollContents.resume()
      } else if (listType === 'PRODUCT') {
        document.getElementById('divContentsList').style.display = 'none'
        document.getElementById('divProductList').style.display = 'block'
        document.getElementById('divCircleList').style.display = 'none'
        this.$refs.infiniteScrollProduct.resume()
      } else if (listType === 'CIRCLE') {
        document.getElementById('divContentsList').style.display = 'none'
        document.getElementById('divProductList').style.display = 'none'
        document.getElementById('divCircleList').style.display = 'block'
        this.$refs.infiniteScrollCircle.resume()
      }
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
      this.$axios.get(this.$store.state.apiServerIp + '/api/contents/selectContentsListLastPageNum',
        {params: {pageSize: this.pageSizeContents, uid: this.$store.state.userVo.uid}})
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
      this.$axios.get(this.$store.state.apiServerIp + '/api/contents/selectContentsList',
        {params: {pageNum: idx, pageSize: this.pageSizeContents, uid: this.$store.state.userVo.uid}})
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
    loadMoreProduct: function (index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        console.log('loadMoreProduct called index: ' + index + ' this.lastPageNumProduct: ' + this.lastPageNumProduct)
        if (index <= this.lastPageNumProduct) {
          this.selectProductList(index, done)
        } else {
          this.$refs.infiniteScrollProduct.stop()
        }
        // refresher 로딩메세지 처리
        if (this.refresherDone != null && this.refresherDone !== '') {
          this.refresherDone() // 로딩메세지 종료
          this.refresherDone = '' // 로딩메세지 초기화
        }
      }, 100)
    },
    // 상품 리스트 마지막 페이지 조회
    selectProductListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/myproduct/selectMyproductListLastPageNum',
        {params: {pageSize: this.pageSizeProduct, uid: this.uid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumProduct = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 상품 리스트 조회
    selectProductList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/myproduct/selectMyproductList',
        {params: {pageNum: idx, pageSize: this.pageSizeProduct, uid: this.uid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.productList = [] // 리스트 초기화
          }
          this.productList = this.productList.concat(result.data)
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    },
    loadMoreCircle: function (index, done) {
      // index - called for nth time
      // done - Function to call when you made all necessary updates.
      //        DO NOT forget to call it otherwise your loading message
      //        will continue to be displayed. Has optional boolean
      //        parameter that invokes stop() when true
      // make some Ajax call then call done()
      // this.pageNum = index
      setTimeout(() => {
        console.log('lastPageNumCircle called index: ' + index + ' this.lastPageNumCircle: ' + this.lastPageNumCircle)
        if (index <= this.lastPageNumCircle) {
          this.selectCircleList(index, done)
        } else {
          this.$refs.infiniteScrollCircle.stop()
        }
        // refresher 로딩메세지 처리
        if (this.refresherDone != null && this.refresherDone !== '') {
          this.refresherDone() // 로딩메세지 종료
          this.refresherDone = '' // 로딩메세지 초기화
        }
      }, 100)
    },
    // 모임 리스트 마지막 페이지 조회
    selectCircleListMax () {
      this.$axios.get(this.$store.state.apiServerIp + '/api/circle/selectCircleListLastPageNum',
        {params: {pageSize: this.pageSizeCircle, uid: this.uid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.lastPageNumCircle = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 모임 리스트 조회
    selectCircleList (idx, done) {
      this.$axios.get(this.$store.state.apiServerIp + '/api/circle/selectCircleList',
        {params: {pageNum: idx, pageSize: this.pageSizeCircle, uid: this.uid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (idx === 1) { // 첫번째 load인 경우
            this.circleList = [] // 리스트 초기화
          }
          this.circleList = this.circleList.concat(result.data)
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
        title: '게시물 삭제',
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
    // 팔로우/팔로워 리스트 화면으로 이동
    goFollowList (followCd) {
      this.$router.push('/main/followList?followCd=' + followCd + '&uid=' + this.userVo.uid)
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
    // 컨텐츠 댓글 모달
    showContentsReplyModal (item) {
      this.$refs.contentsReplyModal.contentsVo = item
      this.$refs.contentsReplyModal.show()
    },
    // SNS 팝업
    showSns (snsUrl) {
      window.open(snsUrl)
    },
    // 유저홈 팝업
    showUserHome (uid) {
      Vue.prototype.$showUserHome(uid)
    },
    goSearch () {
      this.$router.push('/search')
    },
    // 동영상 URL에 파라미터 추가 (playsinline=1)
    setVideoParams (videoUrl) {
      return Vue.prototype.$setVideoParams(videoUrl)
    },
    setHtml (str) {
      return Vue.prototype.$setHtml(str)
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
