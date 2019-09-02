//index.js
//获取应用实例
// const app = getApp()
const Base64 = require('js-base64').Base64

Page({
  data: {

  },
  // 获取token
  getToken() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'http://localhost:3000/v1/token',
          method: 'POST',
          data: {
            account: res.code,
            type: 100
          },
          success: (result) => {
            console.log(result.data);
            wx.setStorageSync('token', result.data.token);
          }
        })
      }
    })
  },

  // 校验token
  verifyToken() {
    wx.request({
      url: 'http://localhost:3000/v1/token/verify',
      method: 'POST',
      data: {
        "token": wx.getStorageSync('token')
      },
      success: (result) => {
        console.log(result.data);
      }
    })
  },

  // 获取最新一期期刊
  getLatest() {
    wx.request({
      url: 'http://localhost:3000/v1/classic/latest',
      method: 'GET',
      header: {
        "Authorization": `Basic ${this._encode()}` // HTTP Auth-Basic规则
      },
      success: (result) => {
        console.log(result.data);
      }
    })
  },


  // 获取下一期期刊
  getNext() {
    wx.request({
      url: 'http://localhost:3000/v1/classic/6/next',
      method: 'GET',
      header: {
        "Authorization": `Basic ${this._encode()}` // HTTP Auth-Basic规则
      },
      success: (result) => {
        console.log(result.data);
      }
    })
  },

  // 获取上一期期刊
  getPrevious() {
    wx.request({
      url: 'http://localhost:3000/v1/classic/6/previous',
      method: 'GET',
      header: {
        "Authorization": `Basic ${this._encode()}` // HTTP Auth-Basic规则
      },
      success: (result) => {
        console.log(result.data);
      }
    })
  },

  // 获取当前期刊点赞情况
  getLikeInfo() {
    wx.request({
      url: 'http://localhost:3000/v1/classic/100/1/favor',
      method: 'GET',
      header: {
        "Authorization": `Basic ${this._encode()}` // HTTP Auth-Basic规则
      },
      success: (result) => {
        console.log(result.data);
      }
    })
  },

  // 获取当前期刊信息
  getClassicInfo() {
    wx.request({
      url: 'http://localhost:3000/v1/classic/100/1',
      method: 'GET',
      header: {
        "Authorization": `Basic ${this._encode()}` // HTTP Auth-Basic规则
      },
      success: (result) => {
        console.log(result.data);
      }
    })
  },


  // 点赞
  like() {
    wx.request({
      url: 'http://localhost:3000/v1/like',
      method: 'POST',
      data: {
        art_id: 1,
        type: 100
      },
      header: {
        "Authorization": `Basic ${this._encode()}` // HTTP Auth-Basic规则
      },
      success: (result) => {
        console.log(result.data);
      }
    })
  },

  // 取消点赞
  likeCancel() {
    wx.request({
      url: 'http://localhost:3000/v1/like/cancel',
      method: 'POST',
      data: {
        art_id: 1,
        type: 100
      },
      header: {
        "Authorization": `Basic ${this._encode()}` // HTTP Auth-Basic规则
      },
      success: (result) => {
        console.log(result.data);
      }
    })
  },

  _encode() {
    const name = wx.getStorageSync('token');
    const pass = '';
    // HTTP Auth-Basic规则：name:pass
    return Base64.encode(name + ':' + pass)
  }

})