import request from '../utils/https'
import {Article} from "../types";

export function fetchList(query: any) {
    return request({
        url: '/users/articles',
        method: 'get',
        params: query
    })
}

export function fetchArticle(id: number) {
    return request({
        url: '/articles/' + id + '/detail',
        method: 'get'
    })
}

export function fetchPv(pv: any) {
    return request({
        url: '/article/pv',
        method: 'get',
        params: {pv}
    })
}

export function createArticle(data: Article) {
    return request({
        url: '/articles',
        method: 'post',
        data
    })
}

export function updateArticle(data: Article) {
    return request({
        url: '/articles/' + data.id,
        method: 'put',
        data
    })
}

export function deleteArticle(id: number) {
    return request({
        url: '/articles/' + id,
        method: 'delete'
    })
}

export function viewArticle(id: number) {
    return request({
        url: '/articles/' + id + '/view',
        method: 'put'
    })
}

export function fetchHotList(query: any) {
    return request({
        url: '/articles/hot',
        method: 'get',
        params: query
    })
}

