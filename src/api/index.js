import request from "@/utils/request";

const ARTICLEAPI = "article";
const API_VERSION = "/v1";

export function getUserInfoById(params) {
  return request({
    url: ARTICLEAPI + API_VERSION + `/admin_select/${params}`,
    method: "get"
  });
}
