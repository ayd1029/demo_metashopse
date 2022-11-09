<template>
  <q-modal v-model="playlistHistoryModal" :content-css="{minWidth: '20vw', minHeight: '50vh'}">

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense icon="storage" readonly />
        <!-- <img src="statics/icons/logo.png" style="width: 30px; height: 30px;"> -->
        <q-toolbar-title>플레이리스트</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <div style="padding:0px 0px 10px 0px" v-for="item in $store.state.playlistHistoryList" :key="item.seq">
        <q-item @click.native="changePlayVideoUrl(item.video_url)" style="padding:0px 0px 0px 0px">
          <table border="0" style="width: 100%">
            <tr>
              <td rowspan="1" width="5">&nbsp;</td>
              <td rowspan="1" width="160">
                <div v-if="item.image_url != null"><img :src="item.image_url" class='image-contents-list'></div>
                <div v-else><img :src="item.og_image_url" class='image-contents-list'></div>
              </td>
              <td rowspan="2" width="5">&nbsp;</td>
              <td colspan="1" align="left"><font size="2" color="black"><div v-html="item.title" style="text-align:left; word-break:keep-all; word-wrap:break-word;" /></font></td>
              <td colspan="1" align="right">
                <!-- <q-btn flat round dense color="grey" icon="more_vert" @click="123" size="xs" /> -->
              </td>
            </tr>
            <!--
            <tr>
              <td colspan="2" align="left" width="100"><font size="2" color="black"><div v-html="item.contents" style="word-break:break-all;" /></font></td>
            </tr>
            -->
          </table>
        </q-item>
      </div>

    </q-modal-layout>
  </q-modal>
</template>

<style>
</style>

<script>

export default {
  name: 'playlist-history-modal',
  data () {
    return {
      uid: '',
      playlistHistoryList: [], // 플레이 히스토리 리스트
      loading: false,
      percentage: 0,
      playlistHistoryModal: false
    }
  },
  created: function () {
  },
  methods: {
    show () {
      this.playlistHistoryModal = true
      // this.$q.loading.show() // 로딩 표시 시작
      let userId = ''
      if (this.$store.state.userVo == null ||
          this.$store.state.userVo === '' ||
          this.$store.state.userVo.uid == null ||
          this.$store.state.userVo.uid === '') {
        userId = 'dcodj'
      } else {
        userId = this.$store.state.userVo.uid
      }
      this.$axios.get(this.$store.state.apiServerIp + '/api/playlist/selectPlaylistHistoryListNoPaging',
        {params: {uid: userId}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$store.state.playlistHistoryList = result.data
          // this.$q.loading.hide() // 로딩 표시 종료
        })
        .catch((err) => {
          // this.$q.loading.hide() // 로딩 표시 종료
          console.log(err)
        })
    },
    // 동영상 선택시 플레이
    changePlayVideoUrl (videoUrl) {
      // 스토어의 동영상 주소 변경
      // iframe의 src가 하기 변수로 지정되어 있으므로 하기 변수 값이 변경되면 동영상도 바뀜
      // this.$store.state.playVideoUrl = videoUrl

      // 동영상 주소 설정
      let prefix = '' // '?'가 있으면 &로 파라미터 추가, '?'가 없으면 '?'로 파라미터 추가
      let playUrl = '' // 파라미터 붙인 동영상 URL
      if (videoUrl.toString().indexOf('?') < 0) { // '?'가 있는 경우
        prefix = '?'
      } else { // '?'가 없는 경우
        prefix = '&'
      }
      playUrl = videoUrl + prefix + this.$store.state.videoUrlParameter // 'rel=0&enablejsapi=1&playsinline=1'

      // 1. 플레이어 플레이
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
      this.close()
    },
    close () {
      this.playlistHistoryModal = false
    }
  }
}
</script>
