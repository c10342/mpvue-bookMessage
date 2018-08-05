import config from './config.js'

export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    wx.request({
      data,
      method,
      url: config.baseUrl + url,
      success (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
          wx.hideLoading()
        } else {
          reject(res.data)
          wx.hideLoading()
        }
      }
    })
  })
}

export function showSuccess (title) {
  wx.showToast({
    title,
    icon: 'success',
    duration: 2000
  })
}

export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}
