import request from "@/utils/request";

// 获取商户列表
export async function getMerchantList() {
  return request('/merchants');
}

// 创建商户
export async function createMerchant(data: any) {
  return request('/merchants', {
    method: 'POST',
    body: data,
  });
}