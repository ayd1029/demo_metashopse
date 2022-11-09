<template>
  <q-modal v-model="traceDeliveryModal" :content-css="{minWidth: '40vw', minHeight: '60vh'}">

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense icon="local_shipping" />
        <q-toolbar-title>배송조회</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="traceDeliveryModal = false" />
      </q-toolbar>
      <!--
      <table border="0" style="width: 95%" align="center">
        <tr><td></td></tr>
        <tr><td></td></tr>
        <tr>
          <td width="25%"><font size="3" color="grey">택배사</font></td>
          <td width="75%">
            <q-select hide-underline v-model="deliveryCorpCd" :options="$store.state.deliveryCorpCdOptions" readonly />
          </td>
        </tr>
        <tr>
          <td><font size="3" color="grey">송장번호</font></td>
          <td>{{ deliveryNo }}</td>
        </tr>
        <tr><td></td></tr>
        <tr><td></td></tr>
      </table>
      -->

      <!-- 배송 기본 정보 -->
      <table border="0" style="width: 95%" align="center">
        <tr><td colspan="2"></td></tr>
        <tr><td colspan="2"></td></tr>
        <tr>
          <td colspan="2"><font size="3" color="grey"><b>기본 정보</b></font></td>
        </tr>
        <tr>
          <td colspan="2"><q-card-separator /></td>
        </tr>
        <tr>
          <td width="30%"><font size="3" color="grey">택배사</font></td>
          <td width="70%"><q-select hide-underline v-model="deliveryCorpCd" :options="$store.state.deliveryCorpCdOptions" readonly /></td>
        </tr>
        <tr>
          <td><font size="3" color="grey">운송장번호</font></td>
          <td>{{ trackingInfo.invoiceNo }}</td>
        </tr>
        <tr>
          <td><font size="3" color="grey">상품명</font></td>
          <td>{{ trackingInfo.itemName }}</td>
        </tr>
        <tr>
          <td><font size="3" color="grey">받는 사람</font></td>
          <td>{{ trackingInfo.receiverName}}</td>
        </tr>
        <tr>
          <td><font size="3" color="grey">보낸 사람</font></td>
          <td>{{ trackingInfo.senderName }}</td>
        </tr>
        <tr>
          <td><font size="3" color="grey">수령 주소</font></td>
          <td>{{ trackingInfo.receiverAddr }}</td>
        </tr>
        <tr>
          <td><font size="3" color="grey">배송 상태</font></td>
          <td v-if="trackingInfo.complete === true">배송 완료</td>
          <td v-else-if="deliveryCorpCd === '99'">쿠폰번호 발급 완료</td><!-- 99:★쿠폰★ -->
          <td v-else>배송중</td>
        </tr>
        <tr>
          <td><font size="3" color="grey">쿠폰 번호</font></td>
          <td>{{ comment }}</td>
        </tr>
        <tr>
          <td colspan="2">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2"><font size="1" color="grey">※ 택배사 집하 전에는 목록이 표시되지 않을 수 있습니다.</font></td>
        </tr>
      </table>
      <br>
      <!-- 배송 추적 정보 -->
      <table border="0" style="width: 95%" align="center">
        <tr>
          <td width="38%"><font size="3" color="grey"><b>시간</b></font></td>
          <td width="22%"><font size="3" color="grey"><b>담당점소</b></font></td>
          <td width="40%"><font size="3" color="grey"><b>상태</b></font></td>
        </tr>
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
        <tr v-for="item in trackingInfo.trackingDetails" :key="item.time">
          <td><font size="2">{{ item.timeString }}</font></td>
          <td><font size="2">{{ item.where }}</font></td>
          <td><font size="2">{{ item.kind }}</font></td>
        </tr>
        <tr>
          <td colspan="3"><q-card-separator /></td>
        </tr>
      </table>
      <br>
      <!-- <iframe :src="url" style="width: 100%; height: 700px;"></iframe> -->
    </q-modal-layout>
  </q-modal>
</template>

<style>
</style>

<script>

export default {
  // name: 'mystore',
  data () {
    return {
      icon: '',
      title: '',
      url: '',
      deliveryNo: '', // 송장번호
      deliveryCorpCd: '', // 택배사 코드
      comment: '', // 판매자 코멘트 ('쿠폰번호')
      trackingInfo: [], // 배송정보
      traceDeliveryModal: false
    }
  },
  created: function () {
  },
  mounted: function () {
  },
  methods: {
    show () {
      this.trackingInfo = [] // 배송정보 초기화

      this.traceDeliveryModal = true

      // 테스트용 데이터
      // this.trackingInfo = {result: 'Y', senderName: '디지*', receiverName: '안영*', itemName: 'SL-J3560FW', invoiceNo: '621348057325', receiverAddr: '서울특별시 마*******', orderNumber: null, adUrl: null, estimate: null, level: 6, complete: true, recipient: '안영대', itemImage: '', trackingDetails: [{time: 1550649763000, timeString: '2019-02-20 17: 02: 43', code: null, where: '전자랜드', kind: '배달출발 (배달예정시간 :)', telno: '02-703-4995', telno2: '', remark: null, level: 2, manName: '', manPic: ''}], productInfo: null, zipCode: null, lastDetail: {time: 1550717284000, timeString: '2019-02-21 11: 48: 04', code: null, where: '서울상암', kind: '배달완료', telno: '010-2335-7164', telno2: '01096582827', remark: null, level: 6, manName: '김재원', manPic: ''}, firstDetail: {time: 1550649763000, timeString: '2019-02-20 17: 02: 43', code: null, where: '전자랜드', kind: '배달출발 (배달예정시간 :)', telno: '02-703-4995', telno2: '', remark: null, level: 2, manName: '', manPic: ''}, completeYN: 'Y', lastStateDetail: {time: 1550717284000, timeString: '2019-02-21 11: 48: 04', code: null, where: '서울상암', kind: '배달완료', telno: '010-2335-7164', telno2: '01096582827', remark: null, level: 6, manName: '김재원', manPic: ''}}

      this.$q.loading.show() // 로딩중 표시 시작
      // 택배사 리스트 조회 - sweettracker API
      this.$axios.get('http://info.sweettracker.co.kr/api/v1/trackingInfo',
        {params: {t_key: this.$store.state.deliveryApiKey, t_code: this.deliveryCorpCd, t_invoice: this.deliveryNo}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          this.$q.loading.hide() // 로딩중 표시 종료
          this.trackingInfo = result.data
        })
        .catch((err) => {
          console.log(err)
          this.$q.loading.hide() // 로딩중 표시 종료
        })
    },
    close () {
      this.traceDeliveryModal = false
    }
  }
}
</script>
