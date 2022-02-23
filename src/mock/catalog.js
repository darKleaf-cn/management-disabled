import Mock from 'mockjs';
// import getParam from '../util/getParam';
// const Random = Mock.Random;
// let catalogList = [];
export let catalogList = [];

export function catalogQueryList(option) {
  if (catalogList.length > 0) {
    return {
      code: '200',
      message: 'success',
      data: catalogList
    }
  }
  // const data = Mock.mock({
  //   'catalogList|5-10': [{
  //     'catalogId|1': '@id',
  //     'catalogName|1': '@ctitle',
  //     'children|0-10': [{
  //       'catalogId|1': '@id',
  //       'catalogName|1': '@ctitle',
  //       'children|0-10': [{
  //         'catalogId|1': '@id',
  //         'catalogName|1': '@ctitle'
  //       }]
  //     }]
  //   }]
  // });
  const data = Mock.mock({
    'catalogList|5-10': [{
      'catalogId|1': '@id',
      'catalogName|1': '@ctitle',
      'children|1-10': function () {
        const num = Math.random();
        if (num > 0.5) {
          return Mock.mock([{
            'catalogId|1': '@id',
            'catalogName|1': '@ctitle'
          }])
        }
        return Mock.mock([{
          'catalogId|1': '@id',
          'catalogName|1': '@ctitle',
          'children|1-10': [{
            'catalogId|1': '@id',
            'catalogName|1': '@ctitle'
          }]
        }])
      }
    }]
  });
  catalogList = data.catalogList;
  return {
    code: '200',
    message: 'success',
    data: catalogList
  };
}
