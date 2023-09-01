const Router = require('koa-router')
const {auth} = require('../middleware/auth.middleware')
const {userValidator,verifyUser,verifyLogin} = require('../middleware/user.middleware')
const { road,searchUsers,register,login1,changePassword,loginOut,userData,search1,modify,delete1} = require('../controller/user.controller')

const router = new Router({ prefix: '/api' })

// 注册接口
router.post('/road', road)
router.post('/road1', searchUsers)
router.post('/register', userValidator,verifyUser,register)
router.post('/login1',userValidator,verifyLogin, login1)
router.patch('/changepassword' , changePassword)
router.post('/loginout' , loginOut)
router.post('/admin' , userData)
router.post('/search1' , search1)
router.post('/admin1' , modify)
router.post('/delete' , delete1)

module.exports = router