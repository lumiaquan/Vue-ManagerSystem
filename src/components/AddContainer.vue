<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="题型">
        <el-select v-model="form.tixing" placeholder="请选择题型">
          <el-option label="单选题" value="danxuan"></el-option>
          <el-option label="多选题" value="duoxuan"></el-option>
          <el-option label="判断题" value="panduan"></el-option>
          <el-option label="简答题" value="jianda"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="加入题库">
        <el-radio v-model="form.tiku" label="gaoshu">高数</el-radio>
        <el-radio v-model="form.tiku" label="yingyu">英语</el-radio>
        <el-radio v-model="form.tiku" label="zhengzhi">政治</el-radio>
        <el-radio v-model="form.tiku" label="tongyong">通用</el-radio>
      </el-form-item>
      <el-form-item label="章节">
        <el-input type="textarea" v-model="form.zhangjie"></el-input>
      </el-form-item>
      <el-form-item label="题目内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="选项" class="answer" v-if="form.tixing=='danxuan'||form.tixing=='duoxuan'">
        <div class="xuanzeti">
          <div class="sub-answer1">
            <label>A</label>
            <input type="textarea" v-model="form.choicesanswer.A"/>
            <label>B</label>
            <input type="textarea" v-model="form.choicesanswer.B"/>
          </div>
          <div class="sub-answer2">
            <label>C</label>
            <input type="textarea" v-model="form.choicesanswer.C"/>
            <label>D</label>
            <input type="textarea" v-model="form.choicesanswer.D"/>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="正确答案">
        <div class="rightchoice" v-if="form.tixing=='danxuan'">
          <el-radio v-model="form.rightchoice" label="A">A</el-radio>
          <el-radio v-model="form.rightchoice" label="B">B</el-radio>
          <el-radio v-model="form.rightchoice" label="C">C</el-radio>
          <el-radio v-model="form.rightchoice" label="D">D</el-radio>
        </div>
        <div class="rightchoices" v-if="form.tixing=='duoxuan'">
          <el-checkbox-group v-model="form.rightchoices">
            <el-checkbox label="A"></el-checkbox>
            <el-checkbox label="B"></el-checkbox>
            <el-checkbox label="C"></el-checkbox>
            <el-checkbox label="D"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="rightjudgement" v-if="form.tixing=='panduan'">
          <el-radio v-model="form.judgementanswer" label="right">对</el-radio>
          <el-radio v-model="form.judgementanswer" label="false">错</el-radio>
        </div>
        <div class="rightjianda" v-if="form.tixing=='jianda'">
          <el-input type="textarea" v-model="form.jiandaanswer"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="解析">
        <el-input type="textarea" v-model="form.jiexi"></el-input>
      </el-form-item>
      <el-form-item label="相关图片">
        <el-upload
          class="avatar-uploader"
          action="http://118.178.196.114:3000/image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
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
  data() {
    return {
      form: {
        tiku: "",
        tixing: "",
        zhangjie: "",
        content: "",
        imageUrl: "",
        choicesanswer: {
          A: "",
          B: "",
          C: "",
          D: ""
        },
        judgementanswer: "",
        jiandaanswer: "",
        rightchoice: "",
        rightchoices: [],
        jiexi: ""
      },
      imageUrl: ""
    };
  },
  methods: {
    onSubmit() {
      var answer = {}
      if(this.form.choicesanswer.A != ""){
        if(this.form.rightchoice !=""){
          answer = {
            choicesAnswer: this.form.choicesanswer,
            rightChoice: this.form.rightchoice
          }
        }else{
          answer = {
            choicesAnswer: this.form.choicesanswer,
            rightChoices: this.form.rightchoices
          }
        }
      }else if(this.form.judgementanswer != ""){
        answer = {
          judgementAnswer: this.form.judgementanswer
        }
      }else if(this.form.jiandaanswer != ""){
        answer = {
          jiandaAnswer: this.form.jiandaanswer
        }
      }

      this.$api.addQuestion({
        "tixing": this.form.tixing,
        "tiku": this.form.tiku,
        "zhangjie": this.form.zhangjie,
        "content": this.form.content,
        "imageUrl": this.form.imageUrl,
        "amswer": answer,
        "jiexi": this.form.jiexi 
      }).then(res => {
        if (res.status == 200) {
          alert("添加成功！");
          this.form.tiku = "";
          this.form.tixing = "";
          this.form.content = "";
          this.form.imageUrl = "";
          this.form.choicesanswer.A = "";
          this.form.choicesanswer.B = "";
          this.form.choicesanswer.C = "";
          this.form.choicesanswer.D = "";
          this.form.rightchoice = "";
          this.form.rightchoices = [];
          this.form.judgementanswer = "";
          this.form.jiandaanswer = "";
          this.form.jiexi = ""
        }else{
          alert('添加失败！')
        }
      })
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl = res.url;
        this.form.imageUrl = res.url;
        alert("图片上传成功");
      } else {
        alert("图片上传错误");
      }
    },
    beforeAvatarUpload(file) {
      const isIMG = ["image/jpeg", "image/jpg", "image/png"].includes(
        file.type
      );
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isIMG) {
        this.$message.error("上传头像图片只能是 JPG JPEG PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isIMG && isLt2M;
    }
  }
};
</script>

<style  >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
.answer label {
  margin-right: 10px;
}
.answer input {
  margin-right: 20px;
  width: 460px;
  height: 50px;
}
.sub-answer1 {
  margin-bottom: 20px;
}
.sub-answer2 {
  margin-left: 10px;
}
</style>
