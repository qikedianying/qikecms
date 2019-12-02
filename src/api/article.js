import request from '@/utils/request'

export function addArticle(data) {
  return request({
    url: 'article/add',
    method: 'post',
    data
  })
}
