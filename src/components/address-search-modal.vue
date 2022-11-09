<template>
  <q-modal v-model="addressSearchModal" :content-css="{minWidth: '60vw', minHeight: '50vh'}">

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense icon="pin_drop" readonly />
        <q-toolbar-title>주소 검색</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <table border="0" style="width:100%" align="center" cellpadding="0" cellspacing="5">
        <tr>
          <td width="80%" align="left"><q-input ref="inputKeyword" color="white" v-model.trim="searchAddressKeyword" @keyup="keyup" placeholder="도로명, 건물명, 지번 주소 검색" class="no-shadow" inverted-light clearable /></td>
          <td width="20%" align="center">
            <q-btn icon="search" color="primary" @click="searchAddress" style="width:100%;" :loading="loading" :percentage="percentage">
              <span slot="loading">&nbsp;&nbsp;&nbsp;<q-spinner-oval class="on-left" /></span>
            </q-btn>
          </td>
        </tr>
      </table>
      <q-card-separator />

      <!-- 검색 결과 오류 메세지 -->
      <table v-if="errorMessage !== ''" border="0" style="width:100%" align="center" cellpadding="0" cellspacing="5">
        <tr>
          <td width="1%"></td>
          <td width="99%" align="left"><font size="2" color="red">{{errorMessage}}</font></td>
        </tr>
      </table>
      <br>

      <!-- 검색 결과 -->
      <q-list highlight inset-separator v-for="(item, index) in searchAddressList" :key="item.seq" style="padding:5px 0px 5px 0px">
        <q-card class="no-shadow">
          <q-item @click.native="sendAddressInfo(index)" style="padding:0px 0px 0px 0px">
            <table border="0" style="width: 100%">
              <tr>
                <td width="1%" rowspan="2"></td>
                <td width="89%"><font size="2" color="grey">{{ item.roadAddr }}</font></td>
                <td width="10%" rowspan="2" align="right"><font size="2" color="grey">{{ item.zipNo }}&nbsp;&nbsp;</font></td>
              </tr>
              <tr>
                <td><font size="2" color="grey">{{ item.jibunAddr }}</font></td>
              </tr>
            </table>
          </q-item>
        </q-card>
      </q-list>

      <!-- 검색 팁 -->
      <br>
      <br>
      <div>
        &nbsp;&nbsp;&nbsp;■&nbsp;&nbsp;<b>주소 검색 TIP</b>
        <br>
        <br>
        <table border="0" style="width:95%" align="center" cellpadding="0" cellspacing="5">
          <tr>
            <td width="18%" align="left"><font size="2" color="grey">· 건물명</font></td>
            <td width="35%" align="left"><font size="2" color="grey">:&nbsp;&nbsp;&nbsp;&nbsp;건물 명칭 입력</font></td>
            <td width="47%" align="left"><font size="2" color="grey">예) 코엑스</font></td>
          </tr>
          <tr>
            <td align="left"><font size="2" color="grey">· 도로명</font></td>
            <td align="left"><font size="2" color="grey">:&nbsp;&nbsp;&nbsp;&nbsp;도로명 + 건물번호</font></td>
            <td align="left"><font size="2" color="grey">예) 영동대로 502</font></td>
          </tr>
          <tr>
            <td align="left"><font size="2" color="grey">· 지번주소</font></td>
            <td align="left"><font size="2" color="grey">:&nbsp;&nbsp;&nbsp;&nbsp;동 (읍/면/리/가)</font></td>
            <td align="left"><font size="2" color="grey">예) 삼성동 168-6</font></td>
          </tr>
        </table>
        <br>
      </div>

      <!--
      <q-toolbar slot="footer">
        <a @click="123123">ddddd</a>
      </q-toolbar>
      -->

    </q-modal-layout>
  </q-modal>
</template>

<style>
</style>

<script>

export default {
  name: 'address-search-modal',
  data () {
    return {
      uid: '',
      searchAddressKeyword: '', // 주소 검색어
      encodedSearchAddressKeyword: '', // 인코디드 주소 검색어
      searchAddressList: [], // 주소 검색결과 리스트
      errorMessage: '', // 검색 오류시 에러메세지
      loading: false,
      percentage: 0,
      pageSize: 100,
      addressSearchModal: false
    }
  },
  created: function () {
  },
  methods: {
    show () {
      // 항목 초기화
      this.searchAddressKeyword = '' // 키워드 초기화
      this.searchAddressList = [] // 주소리스트 초기화
      this.errorMessage = '' // 에러메세지 초기화

      // 검색어 포커싱 - 모달은 안먹힘?
      // this.$refs.inputKeyword.focus()

      this.addressSearchModal = true
    },
    keyup (event) {
      // console.log(event.key)
      if (event.key === 'Enter') {
        this.searchAddress()
      }
    },
    // 주소 검색
    searchAddress () {
      // 주소 검색결과 초기화
      this.searchAddressList = []
      // 에러메세지 초기화
      this.errorMessage = ''

      // 정합성 체크
      if (this.searchAddressKeyword === '') {
        this.$q.notify({
          color: 'primary',
          position: 'left',
          message: '검색어를 입력해주세요.',
          icon: 'notifications_active'
        })
        return
      }

      // 포커스 해제
      // this.$refs.inputKeyword.blur()

      // http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&resultType=json&confmKey=U01TX0FVVEgyMDE5MDMyNDE1MzcwMzEwODU5OTk=&keyword=강서로7길

      // 주소 검색어 인코딩
      // this.encodedSearchAddressKeyword = encodeURI(this.searchAddressKeyword)

      // 주소 API 호출 (https://www.juso.go.kr)
      this.loading = true
      this.$axios.get('http://www.juso.go.kr/addrlink/addrLinkApi.do',
        {params: {
          currentPage: 1,
          countPerPage: this.pageSize,
          resultType: 'json',
          confmKey: 'U01TX0FVVEgyMDE5MDMyNDE1MzcwMzEwODU5OTk=',
          keyword: this.searchAddressKeyword}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data.results.common.errorCode !== '0') {
            this.errorMessage = result.data.results.common.errorMessage
            this.loading = false
            return
          }
          this.searchAddressList = result.data.results.juso // 주소 리스트 설정
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    // 주소 선택시 주소정보 전송
    sendAddressInfo (index) {
      // 부모창의 콜백함수 호출
      this.$emit('callback-address-search', JSON.parse(JSON.stringify(this.searchAddressList[index])))
      this.close()
    },
    close () {
      this.addressSearchModal = false
    }
  }
}
</script>
