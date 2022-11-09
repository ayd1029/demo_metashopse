<template>
  <q-modal v-model="redirectModal" :content-css="{minWidth: '80%', minHeight: '50%'}">

    <q-modal-layout>
      <q-toolbar slot="header" color="black" inverted>
        <q-btn flat round dense :icon="icon" />
        <q-toolbar-title>{{ title }}</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="redirectModal = false" />
      </q-toolbar>
      <iframe :src="url" style="width:100%;" :height="iframeHeight" frameborder="0"></iframe>
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
      iframeHeight: 800,
      redirectModal: false
    }
  },
  created: function () {
  },
  mounted: function () {
  },
  methods: {
    show () {
      this.iframeHeight = window.innerHeight
      this.redirectModal = true
    },
    close () {
      this.redirectModal = false
    }
  }
}
</script>
