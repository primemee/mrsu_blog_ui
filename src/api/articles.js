import request from "@/utils/request";

const ARTICLEAPI = "article";
const API_VERSION = "/v1";

export function getArticleList(data) {
  return request({
    url: ARTICLEAPI + API_VERSION + "/article_list",
    method: "post",
    data
  });
}

export function getArticleListById(params) {
  return request({
    url: ARTICLEAPI + API_VERSION + `/select/${params}`,
    method: "get"
  });
}

export function articleNumUpd(data) {
  return request({
    url: ARTICLEAPI + API_VERSION + "/update",
    method: "post",
    data
  });
}

export function articleSearchByTitle(data) {
  return request({
    url: ARTICLEAPI + API_VERSION + "/search",
    method: "post",
    data
  });
}
