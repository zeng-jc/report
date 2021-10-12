<template>
  <div id="home">
    <van-nav-bar title="报修平台" />
    <div class="school"></div>

    <ul class="select">
      <li><van-icon name="column" class="homeIcon" /> 通知公告</li>

      <li @click="reportClick"><van-icon name="setting" class="homeIcon" /> 点击报修</li>

      <li><van-icon name="printer" class="homeIcon" /> 报修查询</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    reportClick() {
      this.$router.push('/report')
    },
  },
}
</script>

<style lang="less" scoped>
#home {
  background-color: #f8f8f8;
  height: 100%;
}

.school {
  height: 45px;
  margin: 10px 0;
  background: url('~assets/img/logo.png') no-repeat;
  background-size: contain;
  background-position-x: 10px;
}

/deep/ .van-ellipsis.van-nav-bar__title {
  color: #fff;
}

/deep/ .van-nav-bar__text {
  color: #fff;
}
/deep/ .van-icon.van-icon-arrow-left.van-nav-bar__arrow {
  color: #fff;
}

.select li {
  background-color: #fff;
  height: 55px;
  line-height: 55px;
  margin: 10px 0;
  padding-left: 20px;
}

.homeIcon {
  margin-right: 10px;
}
</style>