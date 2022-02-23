import Mock from 'mockjs';
import {
  JSEncrypt
} from 'jsencrypt';
import {
  privateKey
} from '@/util/publicKey';

function decrypt(password) {
  const decryptor = new JSEncrypt();
  decryptor.setPrivateKey(privateKey);
  return decryptor.decrypt(password);
}

export const user = {
  username: '',
  password: '',
  Authorization: ''
}

export function register(option) {
  const {
    username,
    password
  } = JSON.parse(option.body);
  user.username = username;
  user.password = decrypt(password);
  return {
    code: 200,
    message: 'success'
  };
}

export function login(option) {
  let {
    username,
    password
  } = JSON.parse(option.body);
  password = decrypt(password);
  if (username === user.username && password === user.password) {
    user.Authorization = new Date().getTime();
    return {
      code: 200,
      message: 'success',
      data: {
        adminId: new Date().getTime(),
        adminName: username,
        token: user.Authorization
      }
    };
  } else {
    return {
      code: 404,
      message: '用户名密码不正确'
    }
  }
}

export function logout(option) {
  return {
    code: 200,
    message: 'success'
  };
}

export function userList() {
	const data = Mock.mock({
    'userList|10': [{
      'userId|1': '@id',
      'userName|1': '@ctitle',
      'userPhone|1': '@string',
			'userAddress|1': '@string',
      'userDescribe|1': '@string'
    }]
  });
	return {
		code: 200,
    message: 'success',
		data: {
			total: data.userList.length,
			userList: data.userList
		}
	}
}

export function userDelete() {
	return {
		code: 200,
		message: 'success'
	}
}

export function userUpdate() {
	return {
		code: 200,
		message: 'success'
	}
}

export function userAdd() {
	return {
		code: 200,
		message: 'success'
	}
}