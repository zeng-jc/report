<template>
  <div id="report">
    <van-nav-bar title="立即报修" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="school"></div>
    <van-form validate-first @failed="onFailed" @submit="onSubmit">
      <!-- 姓名 -->
      <van-field
        v-model="reportName"
        name="u_name"
        label="姓名："
        placeholder="请输入报修人真实姓名（必填）"
        :rules="[{ required: true, message: '请填写您的姓名！' }]"
      />

      <!-- 电话 -->
      <van-field
        v-model="reportPhone"
        name="u_phone"
        label="电话："
        type="number"
        placeholder="请输入报修人真实电话（必填）"
        :rules="[
          { required: true, message: '请填写电话号码！' },
          { name: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' },
        ]"
      />
      <!--  -->

      <!-- 报修身份 -->
      <van-field
        readonly
        clickable
        name="u_identity"
        :value="identityVal"
        label="身份："
        placeholder="请选择报修人身份（必选）"
        @click="showIdentity = true"
      />
      <van-popup v-model="showIdentity" position="bottom">
        <van-picker show-toolbar :columns="identityCol" @confirm="cmfIdentity" @cancel="showIdentity = false" />
      </van-popup>

      <!-- 报修地点 -->
      <van-field
        name="address"
        v-model="addressVal"
        is-link
        readonly
        label="地点："
        placeholder="请选择学校地点"
        @click="showCascader = true"
      />
      <van-popup v-model="showCascader" round position="bottom">
        <van-cascader
          active-color="#1989fa"
          v-model="cascaderValue"
          title="请选择学校地点"
          :options="options"
          @close="showCascader = false"
          @finish="cmfAddress"
        />
      </van-popup>

      <!-- 详细地址 -->
      <van-field
        v-model="ditailAddress"
        name="d_address"
        label="详细地址："
        placeholder="请输入详细地址（必填）"
        :rules="[{ required: true, message: '请填写详细地址！' }]"
      />

      <!-- 拍照上传 -->
      <van-field name="rp_pic" label="拍照上传：">
        <template #input>
          <van-uploader v-model="uploader" :max-count="1" />
        </template>
      </van-field>

      <!-- 故障描述 -->
      <van-field
        v-model="detailDes"
        rows="2"
        autosize
        label="故障描述："
        name="rp_describe"
        type="textarea"
        maxlength="120"
        placeholder="请输入详细内容（必填）"
        show-word-limit
        :rules="[{ required: true, message: '请填写详细内容' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import addressData from 'common/addressData.js'

export default {
  data() {
    return {
      // 提交人姓名
      reportName: 'admin',
      // 提交人电话
      reportPhone: '18890560823',
      // 上传的图片
      uploader: [],
      // 身份选择
      showIdentity: false,
      identityVal: '教职工',
      identityCol: ['教职工', '学生'],
      // 地点选择
      showCascader: false,
      addressVal: '',
      cascaderValue: '',
      // 选项列表，children 代表子选项，支持多级嵌套
      options: addressData,
      // 详细描述
      detailDes: '',
      // 详细地址
      ditailAddress: '',
    }
  },
  methods: {
    // 表单提交
    onSubmit(values) {
      if (this.identityVal === '' || this.addressVal === '') {
        this.$toast.fail('提交失败')
        return
      }
      // 报修时间与状态
      values.rp_time = Date.parse(new Date())
      values.rp_state = 0
      this.$toast.loading({
        message: '加载中...',
        onClose: async () => {
          const res = await this.$http({
            method: 'post',
            url: '/report',
            data: values,
          })
          if (res === undefined) {
            this.$toast.success('提交失败')
            return
          }
          this.$toast.success('提交成功')
        },
      })
      console.log('submit', values)
    },
    // 提交失败信息
    onFailed(errorInfo) {
      this.$toast.fail('提交失败')
      console.log('failed', errorInfo)
    },
    // 选择身份函数
    cmfIdentity(value) {
      this.identityVal = value
      this.showIdentity = false
    },

    // 级联选择器选择完成
    cmfAddress({ selectedOptions }) {
      this.addressVal = selectedOptions.map(option => option.text).join('/')
      this.showCascader = false
    },

    // 返回
    onClickLeft() {
      this.$router.back('/home')
    },
  },
}
</script>

<style lang="less" scoped>
#report {
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  border-top: 46px solid transparent;
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
</style>