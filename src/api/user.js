'use strict'
// import {ajax} from '@/libs/util'
import util from '@/libs/util.js'
import URL from '@/api/base'
import handler from '@/api/handler-response'
import querystring from 'querystring'

const userApi = {}

userApi.login = async function (data) {
  const res = await util.ajax.request({
    method: 'POST',
    url: URL.login,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      name: data.name,
      password: data.password
    }
  })
  return handler.handleResponse(res)
}
userApi.list = async function (params) {
  const query = querystring.stringify(params)
  const res = await util.ajax.request({
    method: 'GET',
    url: `${URL.users}?${query}`
  })
  return handler.handleResponse(res)
}

export default userApi
