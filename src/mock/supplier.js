import Mock from 'mockjs';

export function supplierList() {
  const data = Mock.mock({
    'supplierList|10': [
      {
        'supplierId|1': '@id',
        'supplierName|1': '@ctitle',
        'supplierPhone|1': '@string',
        'supplierAddress|1': '@string',
        'supplierDescribe|1': '@string',
        supplierGoods: [
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
      total: data.supplierList.length,
      supplierList: data.supplierList
    }
  };
}

export function supplierDelete() {
  return {
    code: 200,
    message: 'success'
  };
}

export function supplierUpdate() {
  return {
    code: 200,
    message: 'success'
  };
}

export function supplierAdd() {
  return {
    code: 200,
    message: 'success'
  };
}
