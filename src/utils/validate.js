/**
 * 过滤特殊字符
 */
export function stripscript(s) {
  var pattern = new RegExp("[`~!@#$%^&*()+=|{}':;'\\[\\].<>/?~！@#￥%……&*（）——+|{}【】 ‘；：”“’。、？_ ]");
  var rs = "";
  for(let i =0; i< s.length; i++){
    rs = rs + s.substr(i,1).replace(pattern, '');
  }
  return rs;
}
/**
 * 验证邮箱
 * @param {} s
 */
export function validateEmail(value) {
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return !reg.test(value) ? true : false;
}

/**
 * 验证密码
 * @param {} s
 */
export function validatePass(value) {
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
  return !reg.test(value) ? true : false;
}
/**
 * 验证验证码
 * @param {*} s
 */
export function validateCode(value) {
  let reg = /^[a-z0-9]{6}$/;
  return !reg.test(value) ? true : false;
}
