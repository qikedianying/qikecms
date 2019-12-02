<template>
  <div class="p20">
    <div class="">
      <el-button type="warning" size="mini" @click.stop="addMovie">添加电影</el-button>
    </div>
    <qike-list
      class="mt20"
      :list="list"
      @add-article="addArticle"
      @edit-info="editMovieInfo"
      @performer="editPerformer"
    />
    <el-pagination
      background
      class="mt10"
      :page-size="10"
      layout="prev, pager, next"
      :total="total"
      @current-change="pageChange"
    />
    <el-dialog
      :title="type === 'add' ? '添加电影': '编辑电影'"
      :visible.sync="movieDialog"
      width="600px"
    >
      <qike-handle
        :id="editId"
        :edit-data="editData"
        :type="type"
        @flush="flush"
      />
    </el-dialog>
    <el-dialog
      title="编辑演员"
      :visible.sync="performerDialog"
      width="600"
    >
      <qike-performer
        :id="currentMovieId"
        @close="performerDialog = false"
        @add-performer="addPerformerDialog = true"
      />
    </el-dialog>
    <el-dialog
      title="添加演员"
      :visible.sync="addPerformerDialog"
      width="400px"
    >
      <qike-add-performer
        @close="addPerformerDialog = false"
      />
    </el-dialog>
    <el-dialog
      title="电影详情"
      :visible.sync="contentDialog"
      width="500px"
    >
      <qike-movie-info
        :id="currentMovieId"
        @close="contentDialog = false "
      />
    </el-dialog>
    <el-dialog title="文章编辑" :visible.sync="articleDialog" width="80%">
      <qike-article :id="currentMovieId" @close="articleDialog = false"></qike-article>
    </el-dialog>

  </div>
</template>

<script>
import list from './list'
import handle from './handle'
import performer from './performer'
import addPerformer from './add-performer'
import movieInfo from './movie-info'
import article from './article'
import { getMovieList } from '../../api/movie'

export default {
  name: 'Index',
  components: {
    qikeList: list,
    qikePerformer: performer,
    qikeArticle: article,
    qikeMovieInfo: movieInfo,
    qikeAddPerformer: addPerformer,
    qikeHandle: handle
  },
  data() {
    return {
      type: 'add',
      editId: '',
      editData: {},
      movieDialog: false,
      performerDialog: false,
      contentDialog: false,
      articleDialog: false,
      addPerformerDialog: false,
      currentMovieId: '',
      total: 0,
      pageNum: 1,
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    flush() {
      this.editId = ''
      this.movieDialog = false
      this.pageNum = 1
      this.getList()
    },
    addMovie() {
      this.type = 'add'
      this.movieDialog = true
    },
    editPerformer(id) {
      this.currentMovieId = id
      this.performerDialog = true
    },
    addArticle(id) {
      this.currentMovieId = id
      this.articleDialog = true
    },
    editMovieInfo(id) {
      this.currentMovieId = id
      this.contentDialog = true
    },
    async getList() {
      try {
        const list = await getMovieList(this.pageNum)
        this.list = list.data.rows
        this.total = list.data.count
      } catch (e) {
        console.log(e)
      }
    },
    pageChange(page) {
      this.pageNum = page
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
