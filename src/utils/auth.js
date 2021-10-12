import Cookies from 'js-cookie'

const TokenKey = 'autodeploysystem'
const ReportSerialNumber = "sixProject_ReportSerialNumber"
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setLoginError(Error) {
  return Cookies.set('login_Errorr', Error)
}
export function getLoginError(Error) {
  return Cookies.get('login_Errorr')
}
export function removeLoginError() {
  return Cookies.remove('login_Errorr')
}
export function setLoginName(userName){
  return Cookies.set('login_userName',userName);
}
export function getLoginName(){
  return Cookies.get('login_userName');
}
export function removeLoginName() {
  return Cookies.remove('login_userName')
}

export function setLoginRole(roleId){
  return Cookies.set('login_roleId',roleId);
}
export function getLoginRole(){
  return Cookies.get('login_roleId');
}
export function removeLoginRole() {
  return Cookies.remove('login_roleId')
}
//存放将要连接的ip
export function setLocalIp(localIp){
  return Cookies.set('localIp',localIp);
}
export function getLocalIp(){
  return Cookies.get('localIp');
}
//存放将要连接的Port
export function getLocalPort(){
  return Cookies.get('localPort');
}
export function setLocalPort(localPort){
  return Cookies.set('localPort',localPort);
}

export function getReportSerialNumber() {
  return Cookies.get(ReportSerialNumber)
}

export function setReportSerialNumber(reportSerialNumber) {
  return Cookies.set(ReportSerialNumber, reportSerialNumber)
}

export function removeReportSerialNumber() {
  return Cookies.remove(ReportSerialNumber)
}

