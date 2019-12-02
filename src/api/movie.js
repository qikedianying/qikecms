import request from '@/utils/request'

export function getMovieList(pageNum) {
  return request({
    url: `movie/list?pageNum=${pageNum}`
  })
}

export function createMovie(data) {
  return request({
    url: `movie/create`,
    method: 'post',
    data
  })
}
export function updateMovie(data) {
  return request({
    url: `movie/update`,
    method: 'post',
    data
  })
}
export function addContent(data) {
  return request({
    url: 'movie/content',
    method: 'post',
    data
  })
}
