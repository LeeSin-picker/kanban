// 获取用户表
import axios from 'axios'
import {
    getToken
} from '@/utils/auth' // 验权(从cookie中获取)
// 封装axios的GET请求
export function axiosGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: param,
                headers: {
                    'Authorization': 'Bearer ' + getToken('Token')
                }
            })
            .then(res => {
                resolve(res)
            }).catch(err => {
                if (err.response) {
                    reject(err.response.data.error.message)
                } else {
                    reject(err)
                }

            })

    })
}
// 封装axios的PUT请求
export function axiosPut(url, param) {
    return new Promise((resolve, reject) => {
        axios.put(url, param, {
                headers: {
                    'Authorization': 'Bearer ' + getToken('Token')
                }
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                if (err.response) {
                    reject(err.response.data.error.message)
                } else {
                    reject(err)
                }

            })
    })
}
// 封装axios的POST请求
export function axiosPost(url, param) {
    return new Promise((resolve, reject) => {
        axios.post(url, param, {
                headers: {
                    'Authorization': 'Bearer ' + getToken('Token')
                }
            })
            .then(res => {
                console.log(res)
                resolve(res)
            }).catch(err => {
                //返回状态码不是200的情况，抓取服务器返回信息
                if (err.response) {
                    reject(err.response.data.error.message)
                } else {
                    reject(err)
                }
            })
    })
}
// 封装axios的DELETE请求
export function axiosDelete(url, param) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
                params: param,
                headers: {
                    'Authorization': 'Bearer ' + getToken('Token')
                }
            })
            .then(res => {
                resolve(res)
            }).catch(err => {
                if (err.response) {
                    reject(err.response.data.error.message)
                } else {
                    reject(err)
                }

            })
    })
}