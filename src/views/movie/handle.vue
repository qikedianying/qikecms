<template>
  <div>
    <el-form ref="form" :mocel="form" label-width="100px">
      <el-form-item label="电影名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="英文名">
        <el-input v-model="form.englishName" />
      </el-form-item>
      <el-form-item label="电影类型">
        <el-select v-model="form.type" placeholder="请选择类类型">
          <el-option label="编辑中" value="-1" />
          <el-option label="流行" value="1" />
          <el-option label="正常" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="电影海报">
        <idol-qiniu-upload
          list-type="picture-card"
          :limit="1"
          :file-list="form.face"
          @upload-success="facePicUpload(arguments)"
          @remove="facePicRemove(arguments)"
        >
          <i class="el-icon-plus" />
        </idol-qiniu-upload>
      </el-form-item>
      <el-form-item label="美团评分">
        <el-input v-model="form.meiScore" />
      </el-form-item>
      <el-form-item label="猫眼评分">
        <el-input v-model="form.maoScore" />
      </el-form-item>
      <el-form-item label="电影分类">
        <el-input v-model="form.label" />
      </el-form-item>
      <el-form-item label="归属地">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="电影时长">
        <el-input v-model="form.movieLength" />
      </el-form-item>
      <el-form-item label="上映时间">
        <el-input v-model="form.releaseTime" />
      </el-form-item>
      <el-form-item label="上映城市">
        <el-input v-model="form.releaseCountry" />
      </el-form-item>

      <el-form-item label="">
        <el-button
          :type="type=== 'add' ? 'warning': 'primary'"
          size="mini"
          @click="submit"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qiniuUplad from '@/components/pic-upload/qiniu-upload'
import { validateNotNull } from '../../validate'
import { createMovie, updateMovie } from '../../api/movie'

export default {
  name: 'Handle',
  components: {
    idolQiniuUpload: qiniuUplad
  },
  props: {
    type: {
      type: String,
      value: 'add'
    },
    id: String,
    editData: Object
  },
  data() {
    return {
      form: {
        name: '',
        englishName: '',
        face: [],
        meiScore: '',
        maoScore: '',
        label: '',
        address: '',
        movieLength: '',
        releaseTime: '',
        type: '2',
        releaseCountry: ''
      }
    }
  },
  methods: {
    async submit() {
      try {
        await validateNotNull(this.form.name, '电影名称不能为空')
        await validateNotNull(this.form.englishName, '英文名不能为空')
        await validateNotNull(this.form.face.length, '海报不能为空')
        await this.validateScore(this.form.meiScore, '美团评分有误')
        await this.validateScore(this.form.maoScore, '猫眼评分有误')
        await validateNotNull(this.form.address, '归属地不能为空')
        await validateNotNull(this.form.label, '电影分类')
        await validateNotNull(this.form.movieLength, '电影时长不能为空')
        await validateNotNull(this.form.releaseTime, '上映时间不能为空')
        await validateNotNull(this.form.releaseCountry, '上映城市不能为空')
        if (this.type === 'add') {
          await createMovie(this.form)
          this.$message.success('添加成功')
        } else {
          await updateMovie({
            ...this.form,
            id: this.id
          })
          this.$message.success('编辑成功')
          this.$emit('flush')
        }
      } catch (e) {
        console.log(e)
      }
    },
    validateScore(score, msg) {
      return new Promise((resolve, reject) => {
        if (score > 0 && score < 10) {
          resolve()
        } else {
          this.$message.warning(msg)
          reject()
        }
      })
    },
    facePicUpload(e) {
      console.log('goodsPicUpload', e)
      this.form.face.push(e[0])
    },
    facePicRemove(e) {
      console.log('goodsPicRemove', e)
      this.form.face = []
    }
  }
}
</script>

<style scoped lang="less">
  /deep/ .el-upload-list--picture-card .el-upload-list__item,
  /deep/ .el-upload--picture-card{
    width: 60px;
    height: 60px;
  }
  /deep/ .el-upload--picture-card{
    line-height: 68px;
  }
</style>
