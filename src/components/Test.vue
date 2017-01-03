<template>
  <div class="test">
    <h1 class="test__msg">{{ message }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'test',
    props: ['message'],
    data() {
      return {
        msg: 'TEST',
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .test {
    color: #FFFFFF;
    background: #000000;

    &__msg {
      font-size: 12px;
    }
  }
</style>
