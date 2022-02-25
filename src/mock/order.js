import Mock from 'mockjs';
const Random = Mock.Random;

export function orderList() {
  const data = Mock.mock({
    'orderList|10': [
      {
        'orderId|1': '@id',
        'goodsId|1': '@id',
        'goodsName|1': '@ctitle',
        'goodsPrice|1': 1212,
        'goodsNum|1': 12,
        'goodsImage|1': Random.dataImage('200x100')
      }
    ]
  });
  return {
    code: 200,
    message: 'success',
    data: {
      total: data.orderList.length,
      orderList: data.orderList
    }
  };
}
