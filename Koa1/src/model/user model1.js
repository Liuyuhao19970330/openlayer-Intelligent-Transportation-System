const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model zd_user -> 表 zd_users)
const User1 = seq.define('user', {
  // id 会被sequelize自动创建, 管理
  username: {
    type: DataTypes.CHAR(32),
    allowNull: false,
    comment: '名称', 
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码',
  },
  type: {
    type: DataTypes.CHAR(32),
    allowNull: true,
    comment: '账户类别',
  },
  is_online:{
    type: DataTypes.CHAR(16),
    allowNull: true,
    comment: '是否在线',
  }
})

//强制同步数据库(创建数据表)
 //User1.sync({ force: true })

module.exports = User1