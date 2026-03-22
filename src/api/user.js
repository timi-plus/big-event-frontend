// 引入request.js 工具类
import request from "@/utils/request.js";

// 提供用户注册接口函数
export const userRegisterService = (registerData)=>{
    //借助于urlsearchparams完成传递
    console.log(registerData);
    const params = new URLSearchParams();
    for(let key in registerData){
        params.append(key,registerData[key]);
    }
    console.log(params);
    return request.post('/user/register', params);
}

// 提供用户登录接口函数
export const userLoginService = (loginData)=>{
    console.log("开始请求登录接口");
    console.log(loginData);
    const params = new URLSearchParams();
    for(let key in loginData){
        params.append(key,loginData[key])
    }
    console.log("params:", params);
    params.get('username')      // 获取某个值
    params.has('password')      // 检查是否存在
    params.getAll('remember')   // 获取所有值
    params.toString()           // 查看完整字符串
    return request.post('/user/login', params);
}

//获取个人信息
export const userInfoGetService = ()=>{
    return request.get('/user/userInfo');
}

//修改个人信息
export const userInfoUpdateService = (userInfo)=>{
    return request.put('/user/update',userInfo)
}

export const userAvatarUpdateService=(avatarUrl)=>{
    let params = new URLSearchParams();
    params.append('avatarUrl',avatarUrl)
    return request.patch('/user/updateAvatar',params)
}

export const userPasswordUpdateService=(password)=>{
    console.log("开始请求修改密码接口");
    console.log("password:", password);
    return request.patch("/user/updatePwd", password)
}