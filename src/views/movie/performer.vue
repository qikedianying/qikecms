<template>
  <div>
    <div>
      <el-button type="warning" size="mini" @click="showAddDialog">添加演员</el-button>
    </div>
    <div v-for="(item, index) in ids" :key="index" class="flex align-center mt10">
      <div class="label-80">演员{{ index + 1 }}</div>
      <div class="pl20">
        <el-select
          v-model="ids[index]"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="getPerformer"
          :loading="loading"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="pl20">
        <el-input v-model="role[index]" placeholder="饰演" />
      </div>
    </div>
    <div class="flex mt10">
      <div class="label-80 mr20" />
      <div>
        <el-button type="primary" size="mini" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getPerformerByName, moviePerformer } from '../../api/performer'

export default {
  name: 'Performer',

  props: {
    id: Number
  },
  data() {
    return {
      role: ['', '', '', '', '', '', '', '', '', ''],
      ids: ['', '', '', '', '', '', '', '', '', ''],
      loading: false,
      options: []

    }
  },
  methods: {
    showAddDialog() {
      this.$emit('add-performer')
    },
    async submit() {
      let ids = []
      let performer = []
      this.ids.forEach((item, index) => {
        let obj = {}
        if (item) {
          ids.push(item)
          obj.performer_id = item
          obj.movie_id = this.id
          obj.play_row = this.role[index]
          performer.push(obj)
        }
      })
      try {
        await moviePerformer({
          performer,
          ids: ids.join(','),
          id: this.id
        })
        this.$message.success('添加成功')
        this.$emit('close')
      } catch (e) {
        console.log(e)
      }
      console.log(performer)
      console.log(ids)
    },
    async getPerformer(e) {
      console.log(e, this.id)
      try {
        const list = await getPerformerByName(e)
        console.log(list)
        this.options = list.data
      } catch (e) {
        console.log(e)
      }
    }

  }
}
</script>

<style scoped>

</style>
