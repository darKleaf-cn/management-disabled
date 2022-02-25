import Mock from 'mockjs';
const Random = Mock.Random;
export function goodsList() {
  const data = Mock.mock({
    'goodsList|10': [
      {
        'goodsId|1': '@id',
        'goodsName|1': '@ctitle',
        'goodsSupplierId|1': '@string',
        'goodsAddress|1': '@string',
        'goodsPrice|1': 1212,
				'goodsSku|1': 12,
				'goodsCatalogId|1': 1,
				'goodsDescribe|1': '@string',
				'goodsImage|1': Random.dataImage('200x100'),
				'goodsSupplierName|1': '@string'
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

export function goodsBuy() {
  return {
    code: 200,
    message: 'success'
  };
}

export function goodsSkuAdd() {
  return {
    code: 200,
    message: 'success'
  };
}

export function goodsSkuCut() {
  return {
    code: 200,
    message: 'success'
  };
}