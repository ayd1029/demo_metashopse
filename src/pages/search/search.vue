<template>
  <q-page class="">
    <q-layout-header :reveal="$store.state.device !== 'P'">
      <q-toolbar color="black" inverted>
        <table border="0" style="width: 100%">
          <tr>
            <td width="38"><q-btn flat round dense icon="fast_rewind" @click="goBack" /></td>
            <td><q-input ref="inputKeyword" v-model.trim="$store.state.searchKeyword" @keyup="keyup" placeholder="검색어 입력" hide-underline clearable style="width: 95%;" /></td>
            <!-- <td width="50px"><q-select v-model="$store.state.searchTarget" :options="selectAdvancedListOptions" hide-underline /></td> -->
            <td align="right">
              <q-btn :loading="loading" :percentage="percentage" color="black" flat @click="search" icon="search" style="width:100px;">
                <span slot="loading">
                  <q-spinner-oval />
                </span>
                &nbsp;&nbsp;&nbsp;찾기
              </q-btn>
            </td>
          </tr>
        </table>
      </q-toolbar>
    </q-layout-header>

    <!-- 0. 최근검색어/인기검색어 리스트 -->
    <!-- <div v-if="($store.state.searchProductList == null || $store.state.searchProductList == '' || $store.state.searchProductList == [])
     && ($store.state.searchMemberList == null || $store.state.searchMemberList == '' || $store.state.searchMemberList == [])"> -->
    <div v-if="$store.state.searchKeyword === ''">
      <!-- 최근검색어 -->
      <table border="0" style="width: 90%" align="center">
        <tr>
          <td width="80%"><font size="3" color="grey">최근 검색어</font></td>
          <td width="20%"><a @click="deleteSearchLogAll"><font size="2" color="grey">전체삭제</font></a></td>
        </tr>
        <tr>
          <td colspan="2"><q-card-separator /></td>
        </tr>
      </table>
      <div v-if="this.$store.state.searchLogList == ''">
        <table border="0" style="width: 90%" align="center">
          <tr>
            <td width="5%">&nbsp;</td>
            <td width="70%"><font size="2" color="grey">최근 검색어가 없습니다.</font></td>
            <td width="20%"></td>
            <td width="5%"></td>
          </tr>
        </table>
      </div>
      <div style="padding:5px 0px 0px 0px" v-for="(item, index) in this.$store.state.searchLogList" :key="index + 100">
        <table border="0" style="width: 90%" align="center">
          <tr>
            <td width="5%">&nbsp;</td>
            <td width="65%"><a @click="searchRecommendKeyword(`${item.keyword}`)"><font size="3" color="grey">{{ item.keyword }}</font></a></td>
            <td width="20%"><font size="3" color="grey">{{ item.reg_time }}</font></td>
            <td width="10%"><a @click="deleteSearchLog(`${index}`)"><font size="2" color="grey">X</font></a></td>
          </tr>
        </table>
      </div>
      <table border="0" style="width: 90%" align="center">
        <tr>
          <td colspan="4"><q-card-separator /></td>
        </tr>
      </table>
      <br>
      <!-- 인기검색어 -->
      <table border="0" style="width: 90%" align="center">
        <tr>
          <td width="70%"><font size="3" color="grey">인기 검색어</font></td>
        </tr>
        <tr>
          <td><q-card-separator /></td>
        </tr>
      </table>
      <div style="padding:5px 0px 0px 0px" v-for="(item, index) in popularKeywordList" :key="index">
        <table border="0" style="width: 90%" align="center">
          <tr>
            <td width="5%" align="right"><font size="3" color="grey"><strong>{{ index + 1 }}</strong></font></td>
            <td width="65%"><a @click="searchRecommendKeyword(`${item.keyword}`)">&nbsp;&nbsp;&nbsp;<font size="3" color="grey">{{ item.keyword }}</font></a></td>
            <td width="20%"></td>
            <td width="10%"></td>
          </tr>
        </table>
      </div>
      <br>
      <table border="0" style="width: 90%" align="center">
        <tr>
          <td colspan="4"><q-card-separator /></td>
        </tr>
      </table>
    </div>

    <div v-if="$store.state.encodedSearchKeyword !== ''" style="width:100%">
      <table style="width: 100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center"><q-btn flat icon="widgets" @click="changeTabInfo('product')" :color="$store.state.colorProduct" style="width: 100%"><font size="2" color="black">&nbsp;상품 {{$store.state.totalCountProduct}}</font></q-btn></td>
          <td align="center"><q-btn flat icon="play_circle_filled" @click="changeTabInfo('contents')" :color="$store.state.colorContents" style="width: 100%"><font size="2" color="black">&nbsp;영상 {{$store.state.totalCountContents}}</font></q-btn></td>
          <td align="center"><q-btn flat icon="account_circle" @click="changeTabInfo('member')" :color="$store.state.colorMember" style="width: 100%"><font size="2" color="black">&nbsp;계정 {{$store.state.totalCountMember}}</font></q-btn></td>
          <td v-if="$store.state.USE_CIRCLE" align="center"><q-btn flat icon="group" @click="changeTabInfo('circle')" :color="$store.state.colorCircle" style="width: 100%"><font size="2" color="black">&nbsp;모임 {{$store.state.totalCountCircle}}</font></q-btn></td>
        </tr>
      </table>
      <q-card-separator />
    </div>

    <!-- 1. 컨텐츠 리스트 -->
    <div v-if="$store.state.selectedSearchDiv === 'contents'">
      <div style="padding:0px 0px 0px 0px" v-for="item in $store.state.searchContentsList" :key="item.seq">
        <q-item link @click.native="goContentsDetail(item.seq)" style="padding:0px 0px 0px 0px">
          <table border="0" style="width: 100%; padding:5px 0px 5px 0px;">
            <tr>
              <td rowspan="1" width="5">&nbsp;</td>
              <td rowspan="1" width="160">
                <div v-if="item.image_url != null"><img :src="item.image_url" class='image-contents-list'></div>
                <div v-else><img :src="item.og_image_url" class='image-contents-list'></div>
              </td>
              <td rowspan="1" width="5px">&nbsp;</td>
              <td colspan="1"><font size="2" color="black"><div v-html="item.title" style="text-align:left; word-break:keep-all; word-wrap:break-word;" /></font></td>
              <td colspan="1" align="right">
                <!-- <q-btn flat round dense color="grey" icon="more_vert" @click="123" size="xs" /> -->
              </td>
            </tr>
            <!--
            <tr>
              <td colspan="2"><font size="2" color="black"><div v-html="item.contents" style="word-break:break-all;" /></font></td>
            </tr>
            -->
          </table>
        </q-item>
      </div>
    </div>

    <!-- 2. 상품 리스트 -->
    <div v-if="$store.state.selectedSearchDiv === 'product'">
      <div style="padding:0px 0px 0px 0px" v-for="item in $store.state.searchProductList" :key="item.seq">
        <q-item link @click.native="goProductDetail(item.seq)" style="padding:0px 0px 0px 0px">
          <table border="0" style="width: 100%; padding:0px 0px 0px 0px;" cellpadding="0" cellspacing="0">
            <tr>
              <td rowspan="6" width="150"><img :src="item.image_url" class='image-product-list'></td>
              <td rowspan="6" width="10">&nbsp;</td>
              <td colspan="5">
                <font v-if="item.free_delivery_yn === 'true'" size="1" color="red">무료배송&nbsp;&nbsp;</font>
                <font v-if="item.dawn_delivery_yn === 'true'" size="1" color="green">새벽배송&nbsp;&nbsp;</font>
                <font size="1" color="blue">&nbsp;&nbsp;</font>
              </td>
            </tr>
            <tr>
              <td colspan="5" style="word-break:keep-all; word-wrap:break-word;"><font size="2" color="grey">{{ item.subtitle }}&nbsp;</font></td>
            </tr>
            <tr>
              <td colspan="5" style="word-break:keep-all; word-wrap:break-word;">{{ item.title }}</td>
            </tr>
            <tr>
              <td colspan="5">&nbsp;</td>
            </tr>
            <tr>
              <td colspan="2"><font size="4" color="black" style="font-weight:bold;">{{ addComma(item.price) }}&nbsp;원</font></td>
              <td style="text-align: right;" colspan="3"><font size="2" color="black">{{ addComma(item.reward_coin) }} <img src="statics/images/logo/logocoin.png" style="width: 9px">&nbsp;&nbsp;&nbsp;</font></td>
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
        <q-card-separator />
        <q-card-separator />
        <q-card-separator />
        <q-card-separator />
        <q-card-separator />
        <q-card-separator />
        <q-card-separator />
        <q-card-separator />
        <q-card-separator />
        <q-card-separator />
      </div>
      <br>
    </div>

    <!-- 3. 인물 리스트 -->
    <div v-if="$store.state.selectedSearchDiv === 'member'">
      <div style="padding:0px 0px 0px 0px" v-for="item in $store.state.searchMemberList" :key="item.seq">
        <q-item link @click.native="showUserHome(item.uid)" style="padding:0px 0px 0px 0px">
          <table border="0" style="width: 100%; padding:5px 0px 5px 0px;">
            <tr>
              <td rowspan="3" width="5px">&nbsp;</td>
              <td rowspan="3" width="50">
                <div class="round">
                  <img :src="item.profile_image" style="width: 50px">
                </div>
              </td>
              <td rowspan="3" width="5px">&nbsp;</td>
              <td colspan="1">
                <font size="2" color="black">{{ item.name }}</font>
              </td>
              <td colspan="1" align="right">
                <font size="2" color="black">원더 랭킹&nbsp;&nbsp;{{ addComma(item.ranking) }} 위&nbsp;&nbsp;&nbsp;&nbsp;</font>
              </td>
            </tr>
            <tr>
              <td colspan="2"><font size="1" color="grey">{{ item.introduce }}&nbsp;</font></td>
            </tr>
          </table>
        </q-item>
        <q-card-separator />
      </div>
    </div>

    <!-- 4. 모임 리스트 -->
    <div v-if="$store.state.selectedSearchDiv === 'circle'">
      <div style="padding:0px 0px 0px 0px" v-for="item in $store.state.searchCircleList" :key="item.seq">
        <q-item :to="`/circle/circleInfo?seq=${item.seq}`" style="padding:0px 0px 0px 0px">
          <table border="0" style="width: 100%; padding:5px 0px 5px 0px;">
            <tr>
              <td rowspan="3" width="5px">&nbsp;</td>
              <td rowspan="3" width="50"><img :src="item.circle_profile_image" class="small-circle-list"></td>
              <td rowspan="3" width="5px">&nbsp;</td>
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
    </div>

    <!-- 6. 검색 결과 없음 - 추천상품 리스트 -->
    <div v-if="this.$store.state.searchResultKeyword !== ''
      && !loading
      && (($store.state.selectedSearchDiv === 'contents' && $store.state.totalCountContents === '0')
        || ($store.state.selectedSearchDiv === 'product' && $store.state.totalCountProduct === '0')
        || ($store.state.selectedSearchDiv === 'member' && $store.state.totalCountMember === '0')
        || ($store.state.selectedSearchDiv === 'circle' && $store.state.totalCountCircle === '0'))
      ">
      <br>
      <table border="0" style="width: 90%" align="center">
        <tr>
          <td width="1%"></td>
          <td width="99%" align="center"><font size="4" color="red">'{{ $store.state.searchResultKeyword }}'</font><font size="3" color="grey">에 대한 검색결과가 없습니다.</font></td>
        </tr>
      </table>
      <br>

      <!-- 추천상품 -->
      <table border="0" cellpadding="0" cellspacing="0" style="width: 100%">
        <tr>
          <td align="center">
            <font size="2" color="black">이런 상품은 어떠세요?</font>
          </td>
        </tr>
        <tr>
          <td align="center">
            <font size="1" color="grey">좌우로 밀어보세요</font>
          </td>
        </tr>
        <tr>
          <td align="center">&nbsp;</td>
        </tr>
      </table>
      <swiper :options="swiperOption" style="z-index:1;">
        <swiper-slide v-for="item in this.$store.state.recommendProductList" :key="item.seq" style="height:200px;">
          <a @click="goProductDetail(item.seq)">
            <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
              <tr>
                <td align="center"><img :src="item.image_url" width="100px;" style="border-radius: 3px;" /></td>
              </tr>
              <tr>
                <td align="center"><font size="3" color="black" style="font-weight:bold;">&nbsp;{{ addComma(item.price) }}&nbsp;원</font></td>
              </tr>
              <tr>
                <td align="center" style="word-break:keep-all; word-wrap:break-word;"><font size="2" color="black">&nbsp;{{ item.title }}&nbsp;</font></td>
              </tr>
            </table>
          </a>
        </swiper-slide>
      </swiper>

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
    <br>&nbsp;
  </q-page>
</template>

<style>
.round {
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
}
.round img {
  display: block;
  min-width: 100%;
  min-height: 100%;
}
</style>

<script>
import Vue from 'vue'

export default {
  name: 'search',
  data () {
    return {
      loading: false,
      percentage: 0,
      // searchLogList: [], // 최근 검색어 리스트
      searchLogVo: { // 쿠키 저장용
        keyword: '',
        uid: '',
        reg_time: ''
      },
      popularKeywordList: [], // 인기 검색어 리스트
      // searchKeyword: '',
      // searchTarget: 'product',
      // searchKeyword: this.$store.state.searchKeyword,
      // searchTarget: this.$store.state.searchTarget,
      /*
      selectAdvancedListOptions: [
        {
          label: '컨텐츠',
          icon: 'image',
          // sublabel: '컨텐츠를 검색합니다.',
          leftColor: 'primary',
          inset: true,
          // rightIcon: 'alarm',
          // rightColor: 'negative', // color for right side, whatever it is (icon, letter, ...)
          value: 'contents'
        },
        {
          label: '상품',
          icon: 'widgets',
          // sublabel: '상품을 검색합니다.',
          leftColor: 'primary',
          inset: true,
          // rightIcon: 'alarm',
          // rightColor: 'negative', // color for right side, whatever it is (icon, letter, ...)
          value: 'product'
        },
        {
          label: '인물',
          icon: 'account_circle',
          // sublabel: '인물을 검색합니다.',
          leftColor: 'primary',
          inset: true,
          value: 'member'
        },
        {
          label: '모임',
          icon: 'group',
          // sublabel: '모임을 검색합니다.',
          leftColor: 'primary',
          inset: true,
          value: 'circle'
        }
      ],
      */
      pageSize: 200,
      swiperOption: { // 추천상품 표시 옵션
        slidesPerView: 3,
        slidesPerGroup: 3,
        slidesPerColumn: 2,
        // loop: true, // 버그 있는듯. 클릭 인식이 됐다안됐다 함 ㅋ
        // centeredSlides: true,
        spaceBetween: 10
      }
    }
  },
  components: {
  },
  created: function () {
    // 최근 검색어 조회
    // if (this.$store.state.searchMemberList === '' && this.$store.state.searchMemberList === '') {
    if (this.$store.state.searchKeyword === '') {
      if (this.$cookie.get('searchLogList') == null) {
        this.$store.state.searchLogList = []
      } else {
        this.$store.state.searchLogList = JSON.parse(this.$cookie.get('searchLogList'))
      }
    }

    // 인기 검색어 조회
    this.$axios(this.$store.state.apiServerIp + '/api/search/selectPopularKeywordList')
      .then((result) => {
        // console.log(JSON.stringify(result.data))
        this.popularKeywordList = result.data
      })
      .catch((err) => {
        console.log(err)
      })

    // 추천 상품 리스트 - 검색결과 없을시 표시됨
    this.$axios(this.$store.state.apiServerIp + '/api/search/selectRecommendProductList')
      .then((result) => {
        // console.log(JSON.stringify(result.data))
        this.$store.state.recommendProductList = result.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  mounted: function () {
    // 검색어 포커싱
    this.$refs.inputKeyword.focus()
  },
  methods: {
    goContentsDetail (seqContents) {
      this.$router.push('/contents/contentsDetail?seq=' + seqContents)
    },
    deleteSearchLogAll () { // 최근 검색어 전체삭제
      this.$cookie.set('searchLogList', '', 0)
      this.$store.state.searchLogList = []
    },
    deleteSearchLog (index) { // 최근 검색어 삭제
      this.$store.state.searchLogList.splice(index, 1)
      this.$cookie.set('searchLogList', JSON.stringify(this.$store.state.searchLogList), 14)
    },
    keyup (event) {
      // console.log(event.key)
      if (event.key === 'Enter') {
        this.search()
      }
    },
    searchRecommendKeyword (paramKeyword) {
      if (paramKeyword != null || paramKeyword !== '') {
        this.$store.state.searchKeyword = paramKeyword
        this.search()
      }
    },
    // 상품정보 탭 변경 표시 처리 (normal:일반 리스트 image:이미지 리스트)
    changeTabInfo (listType) {
      // console.log(listType)
      this.$store.state.selectedSearchDiv = listType
      if (listType === 'contents') {
        this.$store.state.colorContents = 'primary'
        this.$store.state.colorProduct = 'black'
        this.$store.state.colorMember = 'black'
        this.$store.state.colorCircle = 'black'
      } else if (listType === 'product') {
        this.$store.state.colorContents = 'black'
        this.$store.state.colorProduct = 'primary'
        this.$store.state.colorMember = 'black'
        this.$store.state.colorCircle = 'black'
      } else if (listType === 'member') {
        this.$store.state.colorContents = 'black'
        this.$store.state.colorProduct = 'black'
        this.$store.state.colorMember = 'primary'
        this.$store.state.colorCircle = 'black'
      } else if (listType === 'circle') {
        this.$store.state.colorContents = 'black'
        this.$store.state.colorProduct = 'black'
        this.$store.state.colorMember = 'black'
        this.$store.state.colorCircle = 'primary'
      }
    },
    search (paramKeyword) {
      // this.$router.push('/search')
      if (this.$store.state.searchKeyword === '') {
        this.$q.notify({
          color: 'primary',
          position: 'left',
          message: '검색어를 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }

      // 포커스 해제
      this.$refs.inputKeyword.blur()

      this.loading = true // 로딩 표시
      this.$store.state.searchResultKeyword = this.$store.state.searchKeyword // 검색결과 없음 표시용 검색어

      // 검색어 인코딩
      this.$store.state.encodedSearchKeyword = encodeURI(this.$store.state.searchKeyword)
      // console.log('this.$store.state.encodedSearchKeyword: ' + this.$store.state.encodedSearchKeyword)

      // 검색어 쿠키에 저장
      let today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth() + 1
      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      let searchDay = mm + '.' + dd

      let searchLogVo = {}
      searchLogVo.keyword = this.$store.state.searchKeyword
      searchLogVo.uid = this.$store.state.userVo.uid
      searchLogVo.reg_time = searchDay

      let searchLogList = []
      if (this.$cookie.get('searchLogList') != null) {
        searchLogList = JSON.parse(this.$cookie.get('searchLogList'))
      }
      searchLogList.unshift(searchLogVo) // 배열 앞에 추가 (push 반대)
      this.$cookie.set('searchLogList', JSON.stringify(searchLogList), 14)
      // this.searchLogList = [] // 초기화
      this.$store.state.searchLogList = JSON.parse(this.$cookie.get('searchLogList'))

      // 검색어 로그 저장
      this.$axios.get(this.$store.state.apiServerIp + '/api/search/insertSearchLog',
        {params: {encodedKeyword: this.$store.state.encodedSearchKeyword}})
        .then((result) => {
          // console.log('검색어 로그 저장 ' + JSON.stringify(result.data))
        })
        .catch((err) => {
          console.log(err)
        })

      // 검색결과 초기화
      this.$store.state.searchContentsList = []
      this.$store.state.searchProductList = []
      this.$store.state.searchMemberList = []
      this.$store.state.searchCircleList = []
      // console.log('검색결과 초기화 완료')

      // 검색
      // 1. 컨텐츠 검색
      // 1.1 컨텐츠상품 검색결과 마지막 페이지 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/search/searchContentsListLastPageNum',
        {params: {pageSize: this.pageSize, encodedKeyword: this.$store.state.encodedSearchKeyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log('컨텐츠 last_page_num: ' + result.data.last_page_num + ' total_count:' + result.data.total_count)
          this.$store.state.totalCountContents = result.data.total_count // 총 건수
          // 1.2 상품 검색결과 조회
          if (result.data.total_count > 0) {
            this.selectListContents()
          }
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log('searchContentsListLastPageNum 에러: ' + err)
        })
      // 2. 상품 검색
      // 2.1 상품 검색결과 마지막 페이지 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/search/searchProductListLastPageNum',
        {params: {pageSize: this.pageSize, encodedKeyword: this.$store.state.encodedSearchKeyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log('상품 last_page_num: ' + result.data.last_page_num + ' total_count:' + result.data.total_count)
          this.$store.state.totalCountProduct = result.data.total_count // 총 건수
          // 2.2 상품 검색결과 조회
          if (result.data.total_count > 0) {
            this.selectListProduct()
          }
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log('searchProductListLastPageNum 에러: ' + err)
        })
      // 3. 인물 검색
      // 3.1 인물 검색결과 마지막 페이지 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/search/searchMemberListLastPageNum',
        {params: {pageSize: this.pageSize, encodedKeyword: this.$store.state.encodedSearchKeyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // console.log('인물 last_page_num: ' + result.data.last_page_num + ' total_count:' + result.data.total_count)
          this.$store.state.totalCountMember = result.data.total_count // 총 건수
          // 3.2 인물 검색결과 조회
          if (result.data.total_count > 0) {
            this.selectListMember()
          }
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log('searchMemberListLastPageNum 에러: ' + err)
        })
      // 4. 모임 검색
      // 4.1 모임 검색결과 마지막 페이지 조회
      if (this.$store.state.USE_CIRCLE) {
        this.$axios.get(this.$store.state.apiServerIp + '/api/search/searchCircleListLastPageNum',
          {params: {pageSize: this.pageSize, encodedKeyword: this.$store.state.encodedSearchKeyword}})
          .then((result) => {
            // console.log(JSON.stringify(result.data))
            // console.log('모임 last_page_num: ' + result.data.last_page_num + ' total_count:' + result.data.total_count)
            this.$store.state.totalCountCircle = result.data.total_count // 총 건수
            // 4.2 모임 검색결과 조회
            if (result.data.total_count > 0) {
              this.selectListCircle()
            }
            this.loading = false
          })
          .catch((err) => {
            this.loading = false
            console.log('searchCircleListLastPageNum 에러: ' + err)
          })
      }
    },
    // 검색결과 조회
    selectListContents () {
      // 컨텐츠 검색결과 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/search/searchContentsList',
        {params: {pageNum: 1, pageSize: this.pageSize, encodedKeyword: this.$store.state.encodedSearchKeyword}})
        .then((result) => {
          // console.log('컨텐츠 검색결과 ' + JSON.stringify(result.data))
          // 컨텐츠 리스트 설정
          this.$store.state.searchContentsList = result.data
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log('컨텐츠 검색결과 catch err: ' + err)
        })
    },
    selectListProduct () {
      // 상품 검색결과 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/search/searchProductList',
        {params: {pageNum: 1, pageSize: this.pageSize, encodedKeyword: this.$store.state.encodedSearchKeyword}})
        .then((result) => {
          // console.log('상품 검색결과 ' + JSON.stringify(result.data))
          // 상품 리스트 설정
          this.$store.state.searchProductList = result.data
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log('상품 검색결과 catch err: ' + err)
        })
    },
    selectListMember () {
      // 인물 검색결과 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/search/searchMemberList',
        {params: {pageNum: 1, pageSize: this.pageSize, encodedKeyword: this.$store.state.encodedSearchKeyword}})
        .then((result) => {
          // console.log('인물 검색결과 ' + JSON.stringify(result.data))
          // 인물 리스트 설정
          this.$store.state.searchMemberList = result.data
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log('인물 검색결과 catch err: ' + err)
        })
    },
    selectListCircle () {
      // 모임 검색결과 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/search/searchCircleList',
        {params: {pageNum: 1, pageSize: this.pageSize, encodedKeyword: this.$store.state.encodedSearchKeyword}})
        .then((result) => {
          // console.log('모임 검색결과 ' + JSON.stringify(result.data))
          // 모임 리스트 설정
          this.$store.state.searchCircleList = result.data
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log('모임 검색결과 catch err: ' + err)
        })
    },
    // 검색상품 상세화면으로 이동
    goProductDetail (seq) {
      // this.$refs.infiniteScrollProduct.stop()
      // this.$refs.infiniteScrollMember.stop()
      this.$router.push('/productDetail?seq=' + seq)
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
