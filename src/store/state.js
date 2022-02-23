import { getStore } from '@/util/storage';
// import Base64 from '@/util/base64';
import { decode } from 'js-base64';

const admin = getStore('admin') ? JSON.parse(decode(getStore('admin'))) : {};
const state = {
	adminId: admin.adminId ? admin.adminId : '',
  adminName: admin.adminName ? admin.adminName : '',
	token: admin.token ? admin.token : ''
};

export default state;
