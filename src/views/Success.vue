<template>
  <div class="success">
    <van-icon name="checked" color="#07c160" size="80" />
    <div class="text1">提交成功</div>
    <div class="text2">我们已收到你提交，感谢填写</div>
    <van-button round type="info" size="small" @click="toHome">返回首页</van-button>
  </div>
</template>

<script>
export default {
  name: 'Success',
  methods: {
    toHome() {
      this.$router.replace('/home')
    },
  },
}
</script>

<style lang="less" scoped>
.success {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40%;
  .text1 {
    margin: 10px 0;
  }
  .text2 {
    font-size: 10px;
    color: #9f9f9f;
    margin-bottom: 20px;
  }
}
</style>