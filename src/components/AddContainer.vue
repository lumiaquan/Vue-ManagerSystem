<template>
  <div>
      <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="题目名称">
              <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="类别">
              <el-select v-model="form.region" placeholder="请选择类别">
                  <el-option label="高数" value="shanghai"></el-option>
                  <el-option label="线性代数" value="beijing"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="关键词">
              <el-checkbox-group v-model="form.type">
                  <el-checkbox label="理科" name="type"></el-checkbox>
                  <el-checkbox label="文科" name="type"></el-checkbox>
                  <el-checkbox label="高数" name="type"></el-checkbox>
                  <el-checkbox label="经济学" name="type"></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="题目内容">
              <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="相关图片">
              <el-upload
                      class="avatar-uploader"
                      action="http://127.0.0.1:8081/image"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      imageUrl: ''
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(URL.createObjectURL(file.raw))
    },
    beforeAvatarUpload(file) {
      const isIMG = ['image/jpeg','image/jpg','image/png'].includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isIMG) {
        this.$message.error('上传头像图片只能是 JPG JPEG PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isIMG && isLt2M;
    }
  }
}
</script>

<style >
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
