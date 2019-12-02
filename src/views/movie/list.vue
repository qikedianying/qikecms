<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column
        prop="id"
        align="center"
        label="电影id"
      />
      <el-table-column
        prop="name"
        align="center"
        label="电影名称"
      />
      <el-table-column
        align="center"
        label="类型"
      >
        <template slot-scope="scope">
          <div v-show="scope.row.type === 1">
            <el-tag effect="dark">
              流行
            </el-tag>
          </div>
          <div v-show="scope.row.type === 2">
            <el-tag type="warning" effect="dark">
              正常
            </el-tag>
          </div>
          <div v-show="scope.row.type === -1">
            <el-tag type="danger" effect="dark">
              编辑
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="mei_score"
        align="center"
        label="美团评分"
      />
      <el-table-column
        prop="mao_score"
        align="center"
        label="猫眼评分"
      />
      <el-table-column label="电影海报" align="center" width="80px">
        <template slot-scope="scope">
          <div v-viewer="{movable: false}" class="images pointer">
            <img
              class="table-pic"
              :src="scope.row.face"
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="电影详情">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" size="mini"
                       @click="editInfo(scope.row.id)">添加详情</el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="相关演员">
        <template slot-scope="scope">
          <div>
            <el-button
              type="primary"
              size="mini"
              @click="performerEdit(scope.row.id)"
            >编辑演员</el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="相关文章">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" size="mini"
                       @click="addArticle(scope.row.id)">编辑文章</el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" size="mini" @click="edit">编辑</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    list: Array
  },
  methods: {
    edit() {
      this.$message.warning('暂无法编辑')
    },
    performerEdit(id) {
      this.$emit('performer', id)
    },
    editInfo(id) {
      this.$emit('edit-info', id)
    },
    addArticle(id) {
      this.$emit('add-article', id)
    }
  }
}
</script>

<style scoped lang="less">
  .table-pic{
    width: 40px;
    height: 40px;
    margin: 0 5px;
  }
  .width-100{
    box-sizing: border-box;
  }
</style>
