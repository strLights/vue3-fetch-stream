import request from "../utils/request";

/**
 * @desc: 获取已加载模型列表
 * @param { Object } data 地址和字符串
 */
export const getListModels = (data) => {
    return request({
      url: '/llm_model/list_models',
      method: 'post',
      data
    })
  }