const User = require('../model/usermodel')
const User1 = require('../model/user model1')
const { Op } = require('sequelize');

class UserService {
    async createRoad(type,address, building,date1,date2,description,x_username) {
      // todo: 写入数据库
      const res = await User.create({ type,address, building,date1,date2,description,x_username })
      return res.dataValues
    }

    async createUser(username,password,type) {
      // todo: 写入数据库
      const res = await User1.create({ username,password,type })
      return res.dataValues
    }
    
    async FindUser({ id,username, password, type }) {
      const whereOpt = {}
      id && Object.assign(whereOpt, { id })
      username && Object.assign(whereOpt, { username })
      password && Object.assign(whereOpt, { password })
      type && Object.assign(whereOpt, { type })
  
      const res = await User1.findOne({
        attributes: [ 'username', 'password', 'type'],
        where: whereOpt,
      })
      
      return res ? res.dataValues : null
    }
    async userFind(key) {
      const results = await User.findAll({
        attributes: ['type', 'address', 'building', 'date1', 'date2', 'description','x_username'],
        where: {
          [Op.or]: [
            { x_username: { [Op.like]: `%${key}%` } },
            { type: { [Op.like]: `%${key}%` } },
            { address: { [Op.like]: `%${key}%` } },
            { building: { [Op.like]: `%${key}%` } },
            { date1: { [Op.like]: `%${key}%` } },
            { date2: { [Op.like]: `%${key}%` } },
            { description: { [Op.like]: `%${key}%` } },
          ],
        },
      });
    
      return results.map(result => result.dataValues);
    }

    async userFind1(key) {
      const results = await User1.findAll({
        attributes: ['type', 'username','is_online','password'], //返回的数据
        where: {
          [Op.or]: [
            { type: { [Op.like]: `%${key}%` } },
            { username: { [Op.like]: `%${key}%` } },
            { is_online: { [Op.like]: `%${key}%` } },
          ],
        },
      });
    
      return results.map(result => result.dataValues);
    }
    
    
    
}

  module.exports = new UserService()