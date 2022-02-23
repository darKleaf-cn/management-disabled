import {
  Message
} from 'element-ui';

export default function (type, message) {
  switch (type) {
    case 'error':
      Message.error({
        message: message
      });
      break;
    case 'success':
      Message.success({
        message: message
      });
      break;
    case 'warning':
      Message.warning({
        message: message
      });
      break;
    case 'info':
      Message.info({
        message: message
      });
      break;
    default:
      break;
  };
}
