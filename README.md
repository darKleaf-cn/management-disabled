# 残疾人用具管理系统接口文档 v0.0.1

## 1 管理员相关

- **管理员相关接口地址统一前缀：** /

### 1.1 注册

- **地址：** /register

#### 1.1.1 请求参数

| 参数名称       | 类型   | 必要 | 描述   |
| :------------- | :----- | :--- | :----- |
| body           | &nbsp; | 必要 | &nbsp; |
| &emsp;username | string | 必要 | 用户名 |
| &emsp;password | string | 必要 | 密码   |

请求实例：

```
{
	username: "qianye",
	password: "MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6k"
}
```

#### 1.1.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

### 1.2 登录

- **地址：** /login

#### 1.2.1 请求参数

| 参数名称       | 类型   | 必要 | 描述   |
| :------------- | :----- | :--- | :----- |
| body           | &nbsp; | 必要 | &nbsp; |
| &emsp;username | string | 必要 | 用户名 |
| &emsp;password | string | 必要 | 密码   |

请求实例：

```
{
	username: "qianye",
	password: "MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6k"
}
```

#### 1.2.2 返回结果

| 参数名称        | 类型   | 必要 | 描述       |
| :-------------- | :----- | :--- | :--------- |
| code            | number | 必要 | 状态码     |
| message         | string | 必要 |
| data            | object | 必要 | &nbsp;     |
| &emsp;adminId   | string | 必要 | 管理员 id  |
| &emsp;adminName | string | 必要 | 管理员名称 |
| &emsp;token     | string | 必要 | 验证登录   |

请求实例：

```
{
	code: 200,
	message: "成功",
	data: {
		adminId: "1231312",
		adminName: "qianye",
		token: "MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6k"
	}
}
```

### 1.3 退出登录

- **用户地址：** /logout

#### 1.3.1 请求参数

| 参数名称            | 类型   | 必要 | 描述                                     |
| :------------------ | :----- | :--- | :--------------------------------------- |
| Header              | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;adminId       | string | 必要 | 用户 id                                  |

请求实例：

```
{
	adminId: "123231"
}
```

#### 1.3.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | number | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

## 2 用户管理

- **用户管理相关接口地址统一前缀：** /user

### 2.1 用户列表

- **地址：** /list

#### 2.1.1 请求参数

| 参数名称            | 类型   | 必要   | 描述                                     |
| :------------------ | :----- | :----- | :--------------------------------------- |
| Header              | &nbsp; | 必要   | 请求报文头                               |
| &emsp;Authorization | string | 必要   | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要   | &nbsp;                                   |
| &emsp;adminId       | string | 必要   | 管理员 id                                |
| &emsp;userPhone     | string | 不必要 | 用户手机号                               |
| &emsp;page          | int    | 必要   | 页数                                     |
| &emsp;size          | int    | 必要   | 每页条数                                 |

请求实例：

```
{
	adminId: "123123123",
	userPhone: "12345678901",
	page:1,
	size:10
}
```

#### 2.1.2 返回结果

| 参数名称                 | 类型   | 必要 | 描述       |
| :----------------------- | :----- | :--- | :--------- |
| code                     | int    | 必要 | 状态码     |
| message                  | string | 必要 |
| data                     | object | 必要 | &nbsp;     |
| &emsp;total              | number | 必要 | 用户总数   |
| &emsp;userList           | array  | 必要 | 用户数组   |
| &emsp;&emsp;userId       | string | 必要 | 用户 id    |
| &emsp;&emsp;userName     | string | 必要 | 用户名称   |
| &emsp;&emsp;userPhone    | string | 必要 | 用户手机号 |
| &emsp;&emsp;userAddress  | string | 必要 | 用户地址   |
| &emsp;&emsp;userDescribe | string | 必要 | 用户描述   |

请求实例：

```
{
	code: 200,
	message: "成功"
	data: {
		total: 1,
		userList: [
			{
				userId: "12312312",
				userName: "张三",
				userPhone: "1123321323",
				userAddress: "湖北省武汉市",
				userDescribe: "手残"
			}
		]
	}
}
```

### 2.2 用户新增

- **地址：** /add

#### 2.2.1 请求参数

| 参数名称            | 类型   | 必要 | 描述                                     |
| :------------------ | :----- | :--- | :--------------------------------------- |
| Header              | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;adminId       | string | 必要 | 管理员 id                                |
| &emsp;userName      | string | 必要 | 用户名称                                 |
| &emsp;userPhone     | string | 必要 | 用户手机号                               |
| &emsp;userAddress   | string | 必要 | 用户地址                                 |
| &emsp;userDescribe  | string | 必要 | 用户描述                                 |

请求实例：

```
{
	adminId: "123123123",
	userName: "张三",
	userPhone: "12312321321",
	userAddress: "湖北省武汉市",
	userDescribe: "撒后餐"
}
```

#### 2.2.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

### 2.3 用户删除

- **地址：** /delete

#### 2.3.1 请求参数

| 参数名称            | 类型   | 必要 | 描述                                     |
| :------------------ | :----- | :--- | :--------------------------------------- |
| Header              | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;adminId       | string | 必要 | 管理员 id                                |
| &emsp;userId        | string | 必要 | 用户 id                                  |

请求实例：

```
{
	adminId: "123123123",
	userId: "232131232"
}
```

#### 2.3.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

### 2.4 用户修改

- **地址：** /update

#### 2.4.1 请求参数

| 参数名称            | 类型   | 必要 | 描述                                     |
| :------------------ | :----- | :--- | :--------------------------------------- |
| Header              | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;adminId       | string | 必要 | 管理员 id                                |
| &emsp;userId        | string | 必要 | 用户 id                                  |
| &emsp;userName      | string | 必要 | 用户名称                                 |
| &emsp;userPhone     | string | 必要 | 用户手机号                               |
| &emsp;userAddress   | string | 必要 | 用户地址                                 |
| &emsp;userDescribe  | string | 必要 | 用户描述                                 |

请求实例：

```
{
	adminId: "123123123",
	userId: "123231",
	userName: "张三",
	userPhone: "12312321321",
	userAddress: "湖北省武汉市",
	userDescribe: "撒后餐"
}
```

#### 2.4.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

## 3 供应商管理

- **供应商管理相关接口地址统一前缀：** /supplier

### 3.1 供应商列表

- **地址：** /list

#### 3.1.1 请求参数

| 参数名称            | 类型   | 必要   | 描述                                     |
| :------------------ | :----- | :----- | :--------------------------------------- |
| Header              | &nbsp; | 必要   | 请求报文头                               |
| &emsp;Authorization | string | 必要   | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要   | &nbsp;                                   |
| &emsp;adminId       | string | 必要   | 管理员 id                                |
| &emsp;supplierPhone | string | 不必要 | 供应商联系方式                           |
| &emsp;page          | int    | 必要   | 页数                                     |
| &emsp;size          | int    | 必要   | 每页条数                                 |

请求实例：

```
{
	adminId: "123123123",
	supplierPhone: "12345678901",
	page:1,
	size:10
}
```

#### 3.1.2 返回结果

| 参数名称                      | 类型   | 必要 | 描述           |
| :---------------------------- | :----- | :--- | :------------- |
| code                          | int    | 必要 | 状态码         |
| message                       | string | 必要 |
| data                          | object | 必要 | &nbsp;         |
| &emsp;total                   | int    | 必要 | 供应商总数     |
| &emsp;supplierList            | array  | 必要 | 供应商数组     |
| &emsp;&emsp;supplierId        | string | 必要 | 供应商 id      |
| &emsp;&emsp;supplierName      | string | 必要 | 供应商名称     |
| &emsp;&emsp;supplierPhone     | string | 必要 | 供应商联系方式 |
| &emsp;&emsp;supplierAddress   | string | 必要 | 供应商地址     |
| &emsp;&emsp;supplierDescribe  | string | 必要 | 供应商描述     |
| &emsp;&emsp;supplierGoods     | array  | 必要 | 供应商商品数组 |
| &emsp;&emsp;&emsp;catalogId   | string | 必要 | 商品类型 id    |
| &emsp;&emsp;&emsp;catalogName | string | 必要 | 商品类型名称   |

请求实例：

```
{
	code: 200,
	message: "成功"
	data: {
		total: 1,
		supplierList: [
			{
				supplierId: "12312312",
				supplierName: "小米",
				supplierPhone: "1123321323",
				supplierAddress: "湖北省武汉市",
				supplierDescribe: "最好的公司",
				supplierGoods: [
					{
						catalogId: "1",
						catalogName: "轮椅"
					}，
					{
						catalogId: "2",
						catalogName: "助听器"
					}
				]
			}
		]
	}
}
```

### 3.2 供应商新增

- **地址：** /add

#### 3.2.1 请求参数

| 参数名称                | 类型   | 必要 | 描述                                     |
| :---------------------- | :----- | :--- | :--------------------------------------- |
| Header                  | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization     | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                    | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;adminId           | string | 必要 | 管理员 id                                |
| &emsp;supplierName      | string | 必要 | 供应商名称                               |
| &emsp;supplierPhone     | string | 必要 | 供应商联系方式                           |
| &emsp;supplierAddress   | string | 必要 | 供应商地址                               |
| &emsp;supplierDescribe  | string | 必要 | 供应商描述                               |
| &emsp;supplierGoods     | array  | 必要 | 供应商商品数组                           |
| &emsp;&emsp;catalogId   | string | 必要 | 商品类型 id                              |
| &emsp;&emsp;catalogName | string | 必要 | 商品类型名称                             |

请求实例：

```
{
	adminId: "123123123",
	supplierName: "小米",
	supplierPhone: "1123321323",
	supplierAddress: "湖北省武汉市",
	supplierDescribe: "最好的公司",
	supplierGoods: [
		{
			catalogId: "1",
			catalogName: "轮椅"
		}，
		{
			catalogId: "2",
			catalogName: "助听器"
		}
	]
}
```

#### 3.2.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

### 3.3 供应商删除

- **地址：** /delete

#### 3.3.1 请求参数

| 参数名称            | 类型   | 必要 | 描述                                     |
| :------------------ | :----- | :--- | :--------------------------------------- |
| Header              | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;adminId       | string | 必要 | 管理员 id                                |
| &emsp;supplierId    | string | 必要 | 供应商 id                                |

请求实例：

```
{
	adminId: "123123123",
	supplierId: "232131232"
}
```

#### 3.3.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

### 3.4 供应商修改

- **地址：** /update

#### 3.4.1 请求参数

| 参数名称                | 类型   | 必要 | 描述                                     |
| :---------------------- | :----- | :--- | :--------------------------------------- |
| Header                  | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization     | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                    | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;adminId           | string | 必要 | 管理员 id                                |
| &emsp;&emsp;supplierId  | string | 必要 | 供应商 id                                |
| &emsp;supplierName      | string | 必要 | 供应商名称                               |
| &emsp;supplierPhone     | string | 必要 | 供应商联系方式                           |
| &emsp;supplierAddress   | string | 必要 | 供应商地址                               |
| &emsp;supplierDescribe  | string | 必要 | 供应商描述                               |
| &emsp;supplierGoods     | array  | 必要 | 供应商商品数组                           |
| &emsp;&emsp;catalogId   | string | 必要 | 商品类型 id                              |
| &emsp;&emsp;catalogName | string | 必要 | 商品类型名称                             |

请求实例：

```
{
	adminId: "123123123",
	supplierId: "123131",
	supplierName: "小米",
	supplierPhone: "1123321323",
	supplierAddress: "湖北省武汉市",
	supplierDescribe: "最好的公司",
	supplierGoods: [
		{
			catalogId: "1",
			catalogName: "轮椅"
		}，
		{
			catalogId: "2",
			catalogName: "助听器"
		}
	]
}
```

#### 2.4.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```
