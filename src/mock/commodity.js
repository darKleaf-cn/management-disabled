import Mock from 'mockjs';
import getParam from '../util/getParam';
const Random = Mock.Random;
// let commodityList = [];
export let commodityList = [];

export function commodityQueryList(option) {
  const {
    // commodityName,
    // commodityStatus,
    // commodityType,
    page,
    size
  } = getParam(option.url)
  if (commodityList.length > 0) {
    return {
      code: '200',
      message: 'success',
      data: {
        total: commodityList.length,
        commodityList: commodityList.slice((page - 1) * size, page * size)
      }
    }
  }
  const data = Mock.mock({
    'commodityList|30-50': [{
      'commodityId|1': '@id',
      'commodityName|1': '@ctitle',
      'commodityStatus|1': '@boolean',
      'commodityType|1': [
        '服饰',
        '电子产品',
        '零食',
        '书籍'
      ],
      'commodityPrice|10-500': 10,
      'commodityImage|1': Random.image('200x300'),
      'commodityDescribe|1': '@cparagraph'
    }]
  });
  commodityList = data.commodityList;
  return {
    code: '200',
    message: 'success',
    data: {
      total: commodityList.length,
      commodityList: commodityList.slice((page - 1) * size, page * size)
    }
  };
}
