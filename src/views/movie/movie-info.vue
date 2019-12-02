<template>
  <div>
    <div class="flex align-center mt10">
      <div class="label-80 mr20">剧情简介</div>
      <el-input v-model="content" type="textarea" />
    </div>
    <div class="flex align-center mt10">
      <div class="label-80 mr20" />
      <div>
        <el-button type="warning" size="mini" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addContent } from '../../api/movie'

export default {
  name: 'MovieInfo',
  props: {
    id: Number
  },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    async submit() {
      if (this.content) {
        try {
          await addContent({
            content: this.content,
            id: this.id
          })
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

<style scoped>

</style>
