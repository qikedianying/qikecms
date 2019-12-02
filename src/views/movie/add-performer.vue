<template>
  <div>
    <div class="flex align-center mt10">
      <div class="label-80 mr10">姓名</div>
      <div>
        <el-input v-model="performerParams.name" />
      </div>
    </div>
    <div class="flex align-center mt10">
      <div class="label-80 mr10">头像</div>
      <div>
        <idol-qiniu-upload
          list-type="picture-card"
          :limit="1"
          :file-list="performerParams.face"
          @upload-success="facePicUpload(arguments)"
          @remove="facePicRemove(arguments)"
        >
          <i class="el-icon-plus" />
        </idol-qiniu-upload>
      </div>
    </div>
    <div class="flex align-center mt10">
      <div class="label-80 mr10" />
      <div>
        <el-button type="warning" size="mini" @click="addPerformer">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qiniuUplad from '@/components/pic-upload/qiniu-upload'
import { addPerformer } from '../../api/performer'

export default {
  name: 'AddPerformer',
  components: {
    idolQiniuUpload: qiniuUplad

  },
  data() {
    return {
      performerParams: {
        name: '',
        face: []
      }
    }
  },
  methods: {
    facePicUpload(e) {
      console.log('goodsPicUpload', e)
      this.performerParams.face.push(e[0])
    },
    facePicRemove(e) {
      console.log('goodsPicRemove', e)
      this.performerParams.face = []
    },
    async addPerformer() {
      if (this.performerParams.name && this.performerParams.face.length) {
        try {
          await addPerformer(this.performerParams)
          this.$message.success('提交成功')
          this.$emit('close')
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
  /*/deep/ .has-data .el-upload--picture-card{*/
    /*display: none;*/
  /*}*/
  /deep/ .el-upload-list--picture-card .el-upload-list__item,
  /deep/ .el-upload--picture-card{
    width: 60px;
    height: 60px;
  }
  /deep/ .el-upload--picture-card{
    line-height: 68px;
  }
</style>
