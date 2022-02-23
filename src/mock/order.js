import Mock from 'mockjs';
import getParam from '../util/getParam';
const Random = Mock.Random;
// let orderList = [];
export let orderList = [];

export function orderQueryList(option) {
  const {
    // orderName,
    // orderStatus,
    // orderType,
    page,
    size
  } = getParam(option.url)
  if (orderList.length > 0) {
    return {
      code: '200',
      message: 'success',
      data: {
        total: orderList.length,
        data: orderList.slice((page - 1) * size, page * size)
      }
    }
  }
  const data = Mock.mock({
    'orderList|30-50': [{
      'orderId|1': '@id',
			'orderDate|1': '@date',
      'orderCommodityName|1': '@ctitle',
      'orderStatus|1-4': 1,
      'orderType|1': [
        '服饰',
        '电子产品',
        '零食',
        '书籍'
      ],
      'orderPrice|10-500': 10,
      'orderImage|1': Random.image('200x300'),
      'orderDescribe|1': '@cparagraph'
    }]
  });
  orderList = data.orderList;
  return {
    code: '200',
    message: 'success',
    data: {
      total: orderList.length,
      data: orderList.slice((page - 1) * size, page * size)
    }
  };
}
