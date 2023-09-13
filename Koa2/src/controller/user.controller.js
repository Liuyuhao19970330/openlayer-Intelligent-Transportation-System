const { createRoad,userFind,createUser,FindUser,updateById,userFind1} = require('../service/user.service')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default')
const User1 = require('../model/user model1')
const User = require('../model/usermodel')
class UserController {
  async road(ctx, next) {
    try {
  
      const { type, address, building, date1, date2, description,x_username } = ctx.request.body
      // 调用数据库操作
      const res = await createRoad(type, address, building, date1, date2, description,x_username)
  
      // 数据库操作成功
      ctx.body = {
        code: 0,
        message: '数据写入成功',
        data: null,
      };
    } catch (error) {
      // 错误处理
      console.error(error)
      ctx.response.status = 500
      ctx.body = {
        code: -1,
        message: '服务器错误',
        data: null,
      }
    }
  }

  async register(ctx, next) {
    try {
  
      const { username,password,type } = ctx.request.body
      // 调用数据库操作
      const res = await createUser(username,password,type)
  
      // 数据库操作成功
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        data: null,
      };
    } catch (error) {
      // 错误处理
      console.error(error)
      ctx.response.status = 500
      ctx.body = {
        code: -1,
        message: '服务器错误',
        data: null,
      }
    }
  }

  async login1(ctx, next) {
    console.log(ctx.request.body)
    const { username } = ctx.request.body
  
    // 1. 获取用户信息(在token的payload中, 记录id, user_name, is_admin)
    try {
      // 从返回结果对象中剔除password属性, 将剩下的属性放到res对象
      const { password, ...res } = await FindUser({username})
      const online = await User1.findOne({ where: { username: username} });
      await User1.update(
        { is_online: '在线' },
        { where: { username: username } }
      );
      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: {
          username:username,
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
        },
      }
    } catch (err) {
      console.error('用户登录失败', err)
    }
  }
  
  async searchUsers(ctx, next) {
    try {
      const requestBody = ctx.request.body;
      const key = Object.keys(requestBody)[0];
      // console.log(typeof key); // 输出: string，表示获得了第一个键名
      // console.log(key); 
      // 使用 User 模型进行模糊匹配搜索
      const res = await userFind(key)
      ctx.body = {
        code: 0,
        message: '搜索成功',
        data: res,
      };
    } catch (error) {
      // 错误处理
      console.error(error);
      ctx.response.status = 500;
      ctx.body = {
        code: -1,
        message: '服务器错误',
        data: null,
      };
    }
  }

  async changePassword(ctx, next) {
    try {
      const { username, password, newPassword } = ctx.request.body;
  
      // 验证旧密码
      const user = await User1.findOne({ where: { username: username, password: password } });
      if (!user) {
        ctx.status = 400;
        ctx.body = { 
          code:-1,
          message: 'Invalid old password' };
        return;
      }
  
      // 更新密码
      await User1.update(
        { password: newPassword },
        { where: { username: username } }
      );
  
      // 返回成功消息
      ctx.body = { 
        code:0,
        message: 'Password updated successfully' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: 'Server error' };
      console.error('Error in changePassword:', error);
    }
  }
  async loginOut(ctx, next) {
    console.log(ctx.request.body,'123')
    const requestBody = ctx.request.body;
    const key = Object.keys(requestBody)[0];
    console.log(key)
    await User1.update(
      { is_online: '离线' },
      { where: { username: key } },
      
    );
    ctx.body = { 
      code:0,
      message: 'Password updated successfully' }
  }
  async userData(ctx) {
    try {
      const users = await User1.findAll(); // 查询所有用户数据
      return ctx.body = {
        code: 0,
        message: '搜索成功',
        data: users,
      }; // 返回用户数据给调用方，你可以根据需要进行进一步处理或响应格式化
    } catch (error) {
      console.error('Error retrieving user data:', error);
      throw new Error('Failed to retrieve user data');
    }
  }

  async search1(ctx){
    try {
      const requestBody = ctx.request.body;
      const key = Object.keys(requestBody)[0];
      // console.log(typeof key); // 输出: string，表示获得了第一个键名
      // console.log(key); 
      // 使用 User 模型进行模糊匹配搜索
      const res = await userFind1(key)
      ctx.body = {
        code: 0,
        message: '搜索成功',
        data: res,
      };
    } catch (error) {
      // 错误处理
      console.error(error);
      ctx.response.status = 500;
      ctx.body = {
        code: -1,
        message: '服务器错误',
        data: null,
      };
    }
  }
  async  modify1(ctx) {
    console.log(ctx.request.body);
    const { form, oldForm } = ctx.request.body;
    const {type:oldType,address:oldAddress,building:oldBuilding,description:oldDescription,x_username:oldName} = oldForm;
    const {type, address, building,description,x_username,date1,date2} = form;
    await User.update(
      { type:type,
        address:address,
        building:building,
        description:description,
        x_username:x_username,
        date1:date1,
        date2:date2
      },
      { where: { x_username: oldName,
                description:oldDescription,
                building:oldBuilding,
                address:oldAddress,
                type:oldType           
              } },
      
    );
    ctx.body = { 
      code:0,
      message: 'Password updated successfully' }
  }

  async  modify(ctx) {
    const {username,password,type,oldUsername }= ctx.request.body;
    console.log(ctx.request.body)
    await User1.update(
      { password: password,
      username: username,
      type: type,
      },
      { where: { username: oldUsername } },  
    );
    ctx.body = { 
      code:0,
      message: 'Password updated successfully' }
  }

  async delete1(ctx){
    const {username,password,type }= ctx.request.body;
    await User1.destroy({
      where: { username: username, password: password,type:type }
    })
    ctx.body = {
      code: 0,
      message: '删除成功',
    };
  }
  async del1(ctx){
    console.log(ctx.request.body)
    const {type, address, building,description,x_username }= ctx.request.body;
    await User.destroy({
      where: { address: address, building: building,type:type,description:description,x_username:x_username }
    })
    ctx.body = {
      code: 0,
      message: '删除成功',
    };
  }
}


module.exports = new UserController()