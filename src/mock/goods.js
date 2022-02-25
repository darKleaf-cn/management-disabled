import Mock from 'mockjs';

export function goodsList() {
  const data = Mock.mock({
    'goodsList|10': [
      {
        'goodsId|1': '@id',
        'goodsName|1': '@ctitle',
        'goodsPhone|1': '@string',
        'goodsAddress|1': '@string',
        'goodsDescribe|1': '@string',
        goodsGoods: [
          {
            catalogId: '1',
            catalogName: '轮椅'
          },
          {
            catalogId: '2',
            catalogName: '假肢'
          }
        ]
      }
    ]
  });
  return {
    code: 200,
    message: 'success',
    data: {
      total: data.goodsList.length,
      goodsList: data.goodsList
    }
  };
}

export function goodsDelete() {
  return {
    code: 200,
    message: 'success'
  };
}

export function goodsUpdate() {
  return {
    code: 200,
    message: 'success'
  };
}

export function goodsAdd() {
  return {
    code: 200,
    message: 'success'
  };
}