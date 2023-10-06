import request from "../utils/request";

/**
 * @desc: 获取知识库列表
 * @returns data
 */
export const getKnowledgeBase = () => {
    return request({
      url: '/knowledge_base/list_knowledge_bases',
      method: 'get'
    })
  }