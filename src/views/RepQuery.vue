<template>
  <div id="report-query">
    <van-nav-bar title="报修记录" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="u_mobile"
        label="电话："
        placeholder="请输入电话号码"
        :rules="[
          { required: true, message: '请填写用电话号码！' },
          { name: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' },
        ]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">查询</van-button>
      </div>
    </van-form>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />
    <!-- <div class="record">仅展示近5次提交的记录</div> -->
    <ul class="report-list">
      <li v-for="(item, index) in reportList" :key="index" @click="showDialog(item)">
        <div>地点：{{ item.address + item.d_address + '' }}</div>
        <div class="date-format">提交时间：{{ dateFormart(item.rp_time) }}</div>
        <div>
          是否解决：<van-tag type="danger" v-if="item.rp_state === 0">未解决</van-tag>
          <van-tag type="success" v-else>已解决</van-tag>
          <span class="click-details">（点击查看详情）</span>
        </div>
      </li>
      <div class="tips-text">{{ tipsText }}</div>
    </ul>
  </div>
</template>

<script>
import { dateFormart } from 'common/utils'
export default {
  data() {
    return {
      mobile: '',
      // 报告列表
      reportList: [],
      tipsText: '',
    }
  },
  methods: {
    dateFormart,
    onClickLeft() {
      this.$router.back()
    },
    // 表单提交方法
    async onSubmit(values) {
      const { data: res } = await this.$http({
        url: '/report',
        params: values,
      })
      if (res === undefined || res.data.list.length === 0) {
        this.tipsText = '暂无记录'
      } else {
        this.reportList = res.data.list
        this.tipsText = ''
      }
    },
    showDialog(curItem) {
      if (curItem.rp_handler === null || curItem.rp_result === null) {
        this.$dialog({
          message: '暂无详细信息',
        })
      } else {
        this.$dialog({
          title: '处理人：' + curItem.rp_handler,
          message: '处理结果' + curItem.rp_result,
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
#report-query {
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  border-top: 46px solid transparent;
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

.van-form {
  margin: 7% 0;
}
.record {
  text-align: center;
  color: #d0d0d0;
  font-size: 14px;
  margin-bottom: 5%;
}

.report-list {
  li {
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
    border-bottom: 1px solid #ebedf0;
    .date-format {
      color: #9e9e9e;
    }
    .click-details {
      font-size: 12px;
      margin-right: 5px;
    }
  }

  .tips-text {
    text-align: center;
    color: #bebebe;
  }
}
</style>