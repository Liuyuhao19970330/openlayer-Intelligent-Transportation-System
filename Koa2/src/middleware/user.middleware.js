const { FindUser } = require('../service/user.service')
const { userFormateError,
    userAlreadyExited,
    userRegisterError,
    userDoesNotExist,
    userLoginError,
    invalidPassword,} = require('../constant/errType.js')

const userValidator = async (ctx, next) => {
  const { username, password } = ctx.request.body
  // 合法性
  if (!username || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    // ctx.app.emit('error', userFormateError, ctx)
    ctx.response.body = userFormateError
    return
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { username } = ctx.request.body
  try {
  const res = await FindUser({ username })
  if (res) {
    console.error('用户名已经存在', { username })
    // ctx.app.emit('error', userAlreadyExited, ctx)
    ctx.response.body = userAlreadyExited
    return
  }
} catch (err) {
  console.error('获取用户信息错误', err)
  ctx.response.body = userRegisterError
  return
}

  await next()
}

const verifyLogin = async (ctx, next) => {
    // 1. 判断用户是否存在(不存在:报错)
    const { username, password } = ctx.request.body
  
    try {
      const res = await FindUser({ username })
  
      if (!res) {
        // ctx.app.emit('error', userDoesNotExist, ctx)
        ctx.response.body = userDoesNotExist
        return
      }
  
      // 2. 密码是否匹配(不匹配: 报错)
      if (!(password === res.password)){
        // ctx.app.emit('error', invalidPassword, ctx)
        ctx.response.body = invalidPassword
        return
      }
    } catch (err) {
      console.error(err)
      return ctx.response.body = userLoginError
      
    }
  
    await next()
  }

  


module.exports = {
  userValidator,
  verifyUser,
  verifyLogin,
}
