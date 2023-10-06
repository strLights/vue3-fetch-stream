import request from "../utils/request";
import { fetchEventSource } from '@microsoft/fetch-event-source'

/**
 * @desc: 登录
 * @param { Object } data 输入的账号密码
 */
export const login = (data) => {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

/**
 * @desc: 对话
 * @param { Object } data 输入模型，temperature, 查询信息
 */
export const chatchat = async(data) => {
    const ctrlAbout = new AbortController();
    let message = "";
    return await fetchEventSource('api/chat/chat', {
        method: 'POST',
        headers: {
            Accept: "text/event-stream",
            'Content-Type': 'application/json',
        },
        signal: ctrlAbout.signal,
        body: JSON.stringify(data),
        onopen(response) {
            console.info('eventSource open: ', response);
        },
        onmessage(event) {
            message += event.data;
            console.log('eventSource msg: ', event.data);
            // ctrlAbout.abort()
        },
        // onerror(err) {
        //   console.log('eventSource error: ' + err);
        //   ctrlAbout.abort()
        // },
        // onclose() {
        //     console.log('eventSource close');
        // }
    })
}