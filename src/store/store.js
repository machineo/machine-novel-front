import {serverRealmName} from "../const";
import {Toast} from "antd-mobile";

export function login(username, password) {
    return fetch(`${serverRealmName}/v1/user/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: toRequestJSON({
            username: username,
            password: password
        })
    }).then(result => result.json())
        .then(response => handleResponse(response))

}


export function search(page, size, searchInfo) {

    const url = `${serverRealmName}/novel/search`;
    return fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({//post请求参数
            page: page,
            size: size,
            searchInfo: searchInfo
        })
    }).then(result => result.json())

}


export function getNovelDetail(id) {

    const url = `${serverRealmName}/novel/detail/${id}`;
    return fetch(url)
        .then(result => result.json())

}

export function getNovelChapter(novelId, sort) {

    const url = `${serverRealmName}/novel/content/${novelId}/${sort}`;
    return fetch(url).then(result => result.json())


}


export function getMovieDetail(id) {

    const url = `${serverRealmName}/v1/movie/detail`;
    return fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: toRequestJSON({//post请求参数
            id: id
        })
    }).then(result => result.json())
        .then(response => handleResponse(response))

}


function handleResponse(response) {

    if (!response || response.code < 1) {
        Toast.offline('服务器异常', 1);
        return null;
    }
    const code = response.code;
    if (code === 200) {
        return response.data;
    } else if (code === 1000010) {
        console.log("/login")
        window.location.href = `#/login`;
    }
    Toast.fail(response.msg, 1);
    return null;
}

let token = window.localStorage.getItem("redsack.token");

function toRequestJSON(body) {
    return JSON.stringify(addRequestParam(body));
}

function addRequestParam(body) {
    return {
        timestamp: Date.now(),
        token: token,
        platform: "H5",
        biz: body

    }
}

export function setToken(userToken) {
    token = userToken;
    window.localStorage.setItem("redsack.token", userToken)
}


