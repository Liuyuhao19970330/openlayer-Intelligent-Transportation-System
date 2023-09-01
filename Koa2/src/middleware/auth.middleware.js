const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')

const {
    tokenExpiredError,
    invalidToken,
  } = require('../constant/errType')

  const auth = async (ctx, next) => {
    const { authorization = '' } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    // console.log(token)
  
    try {
      // user中包含了payload的信息(id, username, type)
      const user = jwt.verify(token, JWT_SECRET)
      ctx.state.user = user
    } catch (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          console.error('token已过期', err)
          ctx.response.body = tokenExpiredError
          return 
        case 'JsonWebTokenError':
          console.error('无效的token', err)
          ctx.response.body = invalidToken
          return 
      }
    }
  
    await next()
  }

  module.exports = {
    auth,
    
  }
  