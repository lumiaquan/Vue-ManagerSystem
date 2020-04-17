<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="加入题库">
        <el-radio v-model="form.tiku" label="高数">高数</el-radio>
        <el-radio v-model="form.tiku" label="英语">英语</el-radio>
        <el-radio v-model="form.tiku" label="政治">政治</el-radio>
        <el-radio v-model="form.tiku" label="通用">通用</el-radio>
      </el-form-item>
      <el-form-item label="科目">
        <el-input type="textarea" v-model="form.zhuti"></el-input>
      </el-form-item>
      <el-form-item label="科目简称">
        <el-input type="textarea" v-model="form.subzhuti"></el-input>
      </el-form-item>
      <el-form-item label="章节">
        <el-input type="textarea" v-model="form.zhangjie"></el-input>
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
  created() {
    this.num = Math.floor-(22/10)
  },
  data() {
    return {
      form: {
        tiku: "",
        zhuti: "",
        zhangjie: "",
        subzhuti: ""
      }
    }
  },
  methods: {
    onSubmit (){
      this.$api.addZhangjie(this.form).then(res => {
        if(res.status == 200){
          alert("添加成功!")
        }else{
          alert("添加失败!")
        }
      })
    }
  }
}
</script>

<style scoped>

</style>