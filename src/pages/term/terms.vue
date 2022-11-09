<template>
  <q-page class="">

    <q-layout-header>
      <q-toolbar color="black" inverted>

        <table width="100%" border="0" cellpadding="0" cellspacing="0" align="left">
          <tr>
            <td width="40">
              <q-btn flat round dense icon="home" @click="goHome" />
            </td>
            <td><font color="black">약관 및 정책</font></td>
          </tr>
          <tr>
            <td colspan="2">
              <q-tabs v-model="tab" inverted :style="`width:${tabWidth}px`" color="black">
                <q-tab name="term1" slot="title"><font size="2" color="black">이용약관</font></q-tab>
                <q-tab name="term2" slot="title"><font size="2" color="black">전자금융거래이용약관</font></q-tab>
                <q-tab name="term3" slot="title"><font size="2" color="black">판매자 이용약관</font></q-tab>
                <q-tab name="term4" slot="title"><font size="2" color="black">개인정보 수집 및 이용</font></q-tab>
                <q-tab name="term5" slot="title"><font size="2" color="black">개인정보 제공</font></q-tab>
                <q-tab name="term6" slot="title"><font size="2" color="black">개인정보처리방침</font></q-tab>
                <q-tab name="term7" slot="title"><font size="2" color="black">마케팅 활용 및 광고성 정보 수신 동의</font></q-tab>
              </q-tabs>
            </td>
          </tr>
        </table>
      </q-toolbar>
    </q-layout-header>

    <div v-if="tab === 'term1'">
      <termsOfService ref="termsOfService" />
    </div>
    <div v-if="tab === 'term2'">
      <termsOfElectronicFinance ref="termsOfElectronicFinance" />
    </div>
    <div v-if="tab === 'term3'">
      <termsOfSeller ref="termsOfSeller" />
    </div>
    <div v-if="tab === 'term4'">
      <termsOfPrivacy ref="termsOfPrivacy" />
    </div>
    <div v-if="tab === 'term5'">
      <termsOfPrivacyOffering ref="termsOfPrivacyOffering" />
    </div>
    <div v-if="tab === 'term6'">
      <termsOfPrivacyPolicy ref="termsOfPrivacyPolicy" />
    </div>
    <div v-if="tab === 'term7'">
      <termsOfMarketing ref="termsOfMarketing" />
    </div>

  </q-page>
</template>

<style>
</style>

<script>
export default {
  // name: 'mystore',
  data () {
    return {
      tab: 'term1',
      tabWidth: 400
    }
  },
  components: {
  },
  // 파라미터가 변경되면 감지해서 컨텐츠 조회
  watch: {
    '$route.query.term': function (term) {
      this.tab = this.$route.query.term
    }
  },
  created: function () {
    this.tabWidth = window.innerWidth - 30
    if (this.$route.query.term != null &&
      (this.$route.query.term === 'term1' ||
      this.$route.query.term === 'term2' ||
      this.$route.query.term === 'term3' ||
      this.$route.query.term === 'term4' ||
      this.$route.query.term === 'term5' ||
      this.$route.query.term === 'term6' ||
      this.$route.query.term === 'term7')) {
      this.tab = this.$route.query.term
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>
