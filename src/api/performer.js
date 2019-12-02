import request from '@/utils/request'

export function getPerformerByName(key) {
  return request({
    url: `performer/serachByName?key=${key}`
  })
}
export function addPerformer(data) {
  return request({
    url: `performer/add`,
    method: 'post',
    data
  })
}

export function moviePerformer(data) {
  return request({
    url: `performer/addRole`,
    method: 'post',
    data
  })
}
