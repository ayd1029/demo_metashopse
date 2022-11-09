<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">건들지말라했제..</p>
    <q-btn
      color="black"
      style="width:200px;"
      @click="$router.push('/')"
    >메인화면으로 쩝쩝</q-btn>
  </div>
</template>

<script>
export default {
  name: 'NoTouch'
}
</script>
