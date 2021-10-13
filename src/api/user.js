import request from '@/utils/request'
import baseURL from '@/api/global_variable'
//登录
export function login(data) {
  return request({
    url: baseURL + '/user/login.do',
    method: 'post',
    params:data
  })
}
//查询用户
export function listAlldo(current,size) {
  return request({
    url: baseURL + '/user/listAll.do',
    method: 'get',
    params:{
      current:current,
      size:size
    }
  })
}
//添加用户
export function savedo(data) {
  return request({
    url: baseURL + '/user/save.do',
    method: 'post',
    data:data
  })
}
//删除用户
export function deletedo(userId) {
  return request({
    url: baseURL + '/user/delete.do',
    method: 'post',
    params: {
      id:userId
    }
  })
}
//修改用户
export function updatedo(data) {
  return request({
    url: baseURL + '/user/update.do',
    method: 'post',
    data:data
  })
}
//用户名查询用户
export function findUserList(current,size,keyword) {
  return request({
    url: baseURL + '/user/findUserList.do',
    method: 'get',
    params:{
      current:current,
      size:size,
      keyword:keyword
    }
  })
}
//禁用用户
export function userupdateStatusdo(username,status) {
  return request({
    url: baseURL + '/user/updateStatus.do',
    method: 'post',
    params:{
      username:username,
      status:status
    }
  })
}
//充值
export function usermakeMoneydo(username,money) {
  return request({
    url: baseURL + '/user/makeMoney.do',
    method: 'post',
    params:{
      username:username,
      money:money
    }
  })
}
//校区信息
export function schoolInfoDo(current,size,userName) {
  return request({
    url: baseURL + '/school/schoolInfo.do',
    method: 'get',
    params:{
      current:current,
      size:size,
      username:userName
    }
  })
}
//校区信息
export function updateClassroom(data) {
  return request({
    url: baseURL + '/classroom/update.do',
    method: 'post',
    params: data
  })
}

//删除
export function deleteClassroom(id) {
  return request({
    url: baseURL + '/classroom/delete.do',
    method: 'post',
    params: {
      id:id
    }
  })
}
export function teacherList(current,size) {
  return request({
    url: baseURL + '/teacher/list.do',
    method: 'get',
    params:{
      current:current,
      size:size
    }
  })
}
export function updateTeacher(data) {
  return request({
    url: baseURL + '/teacher/update.do',
    method: 'post',
    params:data
  })
}

export function teacherDelete(id) {
  return request({
    url: baseURL + '/teacher/delete.do',
    method: 'post',
    params:{
      id:id
    }
  })
}
export function teacherSelect(current,size,keyword) {
  return request({
    url: baseURL + '/teacher/select.do',
    method: 'get',
    params:{
      current:current,
      size:size,
      keyword:keyword
    }
  })
}
export function teacherPingJia(username) {
  return request({
    url: baseURL + '/evaluation/listByTeacher.do',
    method: 'get',
    params:{
      username:username
    }
  })
}
//学生家长订单已付款
export function orderuserPayTab(current,size,username) {
  return request({
    url: baseURL + '/order/userPayTab.do',
    method: 'get',
    params:{
      current:current,
      size:size,
      username:username
    }
  })
}
//未付款
export function orderuserUnPayTab(current,size,username) {
  return request({
    url: baseURL + '/order/userUnPayTab.do',
    method: 'get',
    params:{
      current:current,
      size:size,
      username:username
    }
  })
}
//个人中心用户信息
export function userlistUserInfodo(username) {
  return request({
    url: baseURL + '/user/listUserInfo.do',
    method: 'get',
    params:{
      username:username
    }
  })
}
//添加留言信息
export function insertMessage(username,content,email,phone) {
  return request({
    url: baseURL + '/opinion/save.do',
    method: 'post',
    params:{
      username:username,
      content:content,
      email:email,
      phone:phone
    }
  })
}
//获取常用问题接口
export function getUsuallyQuestionList() {
  return request({
    url: baseURL + '/school/getUsuallyQuestionList.do',
    method: 'get'
  })
}













//查看所有采购记录
export function selectAllUserList(data) {
  return request({
    url: baseURL + '/buyinfo/list.do',
    method: 'post',
    params:data
  })
}
//查看所有订餐记录
export function orderinfoList(data) {
  return request({
    url: baseURL + '/order/list.do',
    method: 'post',
    params:data
  })
}
// //是否禁用
// export function updateStatus(userId,status) {
//   return request({
//     url: baseURL + '/admin/updateStatus',
//     method: 'post',
//     params: {
//       userId:userId,
//       status:status
//     }
//   })
// }
//查询用户
export function findList(userName) {
  return request({
    url: baseURL + '/admin/find',
    method: 'post',
    params: {
      userName:userName
    }
  })
}
//查看采购
export function insertUserList(data) {
  return request({
    url: baseURL + '/buyinfo/insert.do',
    method: 'post',
    params: data
  })
}

//删除采购
export function deleteUserList(userId) {
  return request({
    url: baseURL + '/buyinfo/delete.do',
    method: 'post',
    params: {
      id:userId
    }
  })
}
//删除订餐记录
export function orderinfodelete(userId) {
  return request({
    url: baseURL + '/order/delete.do',
    method: 'post',
    params: {
      id:userId
    }
  })
}
//编辑采购
export function editUserList(data) {
  return request({
    url: baseURL + '/buyinfo/update.do',
    method: 'post',
    params: data
  })
}
//修改用户密码
export function updatePassword(userId,password) {
  return request({
    url: baseURL + '/admin/updatePassword',
    method: 'post',
    params: {
      userId:userId,
      password:password
}
  })
}


//查询今日菜品
export function producetaskList(data) {
  return request({
    url: baseURL + '/menu/listMenu.do',
    method: 'post',
    params: data
  })
}

//上传菜品
export function menucaipin(files) {
  return request({
    url: baseURL + '/file/upload.do',
    method: 'post',

    file:files
  })
}
//添加菜品
export function producetaskinsertList(data) {
  return request({
    url: baseURL + '/menu/insertMenu.do',
    method: 'post',
    params: data
  })
}
//删除任务
export function producetaskdeleteList(userId) {
  return request({
    url: baseURL + '/producetask/delete',
    method: 'post',
    params: {
      id:userId
    }
  })
}
//修改任务
export function producetaskeditList(data) {
  return request({
    url: baseURL + '/producetask/update',
    method: 'post',
    params: data
  })
}

//查询任务
export function producetaskselectList(userName,pageNum,pageSize) {
  return request({
    url: baseURL + '/producetask/find',
    method: 'post',
    params: {
      goodsName:userName,
      pageNum:pageNum,
      pageSize:pageSize
    }
  })
}
//查询所有商品
export function goodsinfoList(data) {
  return request({
    url: baseURL + '/goodsinfo/list',
    method: 'post',
    params: data
  })
}
//添加商品
export function goodsinfoinsert(data) {
  return request({
    url: baseURL + '/goodsinfo/insert',
    method: 'post',
    params: data
  })
}
//删除商品
export function goodsinfodelete(userId) {
  return request({
    url: baseURL + '/goodsinfo/delete',
    method: 'post',
    params: {
      id:userId
    }
  })
}
//修改商品
export function goodsinfoupdate(data) {
  return request({
    url: baseURL + '/goodsinfo/update',
    method: 'post',
    params: data
  })
}
//查询商品
export function goodsinfofind(userName,pageNum,pageSize) {
  return request({
    url: baseURL + '/goodsinfo/find',
    method: 'post',
    params: {
      goodsName:userName,
      pageNum:pageNum,
      pageSize:pageSize
    }
  })
}
//修改个人信息
export function updatePasswordByName(data) {
  return request({
    url: baseURL + '/userinfo/update.do',
    method: 'post',
    params:data
  })
}
//查看个人信息
export function ctygfindUserInfo(id) {
  return request({
    url: baseURL + '/userinfo/findUserInfo.do',
    method: 'post',
    params: {
      id:id
    }
  })
}
//查询所有销售商品
export function commoditysaleList(data) {
  return request({
    url: baseURL + '/commoditysale/list',
    method: 'post',
    params: data
  })
}
//添加销售商品
export function commoditysaleinsert(data) {
  return request({
    url: baseURL + '/commoditysale/insert',
    method: 'post',
    params: data
  })
}
//删除销售商品
export function commoditysaledelete(userId) {
  return request({
    url: baseURL + '/commoditysale/delete',
    method: 'post',
    params: {
      id:userId
    }
  })
}
//修改销售商品
export function commoditysaleupdate(data) {
  return request({
    url: baseURL + '/commoditysale/update',
    method: 'post',
    params: data
  })
}
//查询销售商品
export function commoditysalefind(userName,pageNum,pageSize) {
  return request({
    url: baseURL + '/commoditysale/find',
    method: 'post',
    params: {
      goodsName:userName,
      pageNum:pageNum,
      pageSize:pageSize
    }
  })
}
//查询所有销售退货
export function salereturnList(data) {
  return request({
    url: baseURL + '/salereturn/list',
    method: 'post',
    params: data
  })
}
//修改退货
export function salereturnupdate(data) {
  return request({
    url: baseURL + '/salereturn/update',
    method: 'post',
    params: data
  })
}
//删除退货
export function salereturndelete(userId) {
  return request({
    url: baseURL + '/salereturn/delete',
    method: 'post',
    params: {
      id:userId
    }
  })
}
//搜索退货详情
export function salereturnfind(userName,pageNum,pageSize) {
  return request({
    url: baseURL + '/salereturn/find',
    method: 'post',
    params: {
      goodsName:userName,
      pageNum:pageNum,
      pageSize:pageSize
    }
  })
}
//退货状态
export function salereturnupdateStatus(userId,status) {
  return request({
    url: baseURL + '/salereturn/updateStatus',
    method: 'post',
    params: {
      id:userId,
      status:status
    }
  })
}
//查询所有采购记录
export function commoditypurchaseList(data) {
  return request({
    url: baseURL + '/commoditypurchase/list',
    method: 'post',
    params: data
  })
}
//添加采购商品
export function commoditypurchaseinsert(data) {
  return request({
    url: baseURL + '/commoditypurchase/insert',
    method: 'post',
    params: data
  })
}
//修改采购商品
export function commoditypurchaseupdate(data) {
  return request({
    url: baseURL + '/commoditypurchase/update',
    method: 'post',
    params: data
  })
}
//删除采购商品
export function commoditypurchasedelete(userId) {
  return request({
    url: baseURL + '/commoditypurchase/delete',
    method: 'post',
    params: {
      id:userId
    }
  })
}
//搜索采购商品
export function commoditypurchasefind(userName,pageNum,pageSize) {
  return request({
    url: baseURL + '/commoditypurchase/find',
    method: 'post',
    params: {
      goodsName:userName,
      pageNum:pageNum,
      pageSize:pageSize
    }
  })
}
//采购商品状态
export function commoditypurchaseupdateStatus(userId,status) {
  return request({
    url: baseURL + '/commoditypurchase/updateStatus',
    method: 'post',
    params: {
      id:userId,
      status:status
    }
  })
}
//查询所有采购退货商品
export function purchasereturnList(data) {
  return request({
    url: baseURL + '/purchasereturn/list',
    method: 'post',
    params: data
  })
}
//修改采购退货
export function purchasereturnupdate(data) {
  return request({
    url: baseURL + '/purchasereturn/update',
    method: 'post',
    params: data
  })
}
//删除采购退货记录
export function purchasereturndelete(userId) {
  return request({
    url: baseURL + '/purchasereturn/delete',
    method: 'post',
    params: {
      id:userId
    }
  })
}
//采购退货状态
export function purchasereturnupdateStatus(userId,status) {
  return request({
    url: baseURL + '/purchasereturn/updateStatus',
    method: 'post',
    params: {
      id:userId,
      status:status
    }
  })
}
//搜索采购退货记录
export function purchasereturnfind(userName,pageNum,pageSize) {
  return request({
    url: baseURL + '/purchasereturn/find',
    method: 'post',
    params: {
      goodsName:userName,
      pageNum:pageNum,
      pageSize:pageSize
    }
  })
}
