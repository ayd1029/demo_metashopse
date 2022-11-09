<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        :duration="500"
        @leave="resetScroll"
      >
        <router-view />
      </transition>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'LayoutNothing',
  data () {
    return {
    }
  },
  created: function () {
  },
  mounted: function () {
  },
  methods: {
    resetScroll (el, done) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      done()
    }
  }
}
</script>

<style>
</style>
