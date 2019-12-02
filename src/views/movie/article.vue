<template>
  <div>
    <div class="flex mt10">
      <div class="label-80 mr20">标题</div>
      <el-input v-model="title" />
    </div>
    <div class="flex mt10">
      <div class="label-80 mr20">内容</div>
      <el-input v-model="content" type="textarea" />
    </div>
    <div class="flex mt10">
      <div class="label-80 mr20">链接</div>
      <el-input v-model="url" type="textarea" />
    </div>
    <div class="flex mt10">
      <div class="label-80 mr20">
        正文
      </div>
      <div ref="editor" class="flex-1 mb20" />
    </div>
    <!--<div ref="editor" class="full-width mb20" />-->
    <div class="flex mt10">
      <div class="label-80 mr20" />
      <div>
        <el-button
          type="warning"
          size="mini"
          @click="submit"
        >提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
import { addArticle } from '../../api/article'

export default {
  name: 'Article',
  props: {
    id: Number
  },
  data() {
    return {
      title: '',
      content: '',
      html: '',
      url: ''
    }
  },
  mounted() {
    let editor = new E(this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      this.html = html
    }
    // this.editor.txt.html(this.html)
    editor.create()
  },
  methods: {
    async submit() {
      if (this.title && this.content && (this.html || this.url)) {
        try {
          await addArticle({
            id: this.id,
            title: this.title,
            content: this.content,
            html: this.html,
            url: this.url
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
