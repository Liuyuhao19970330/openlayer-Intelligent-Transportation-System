const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model zd_user -> 表 zd_users)
const User = seq.define('report', {
  // id 会被sequelize自动创建, 管理
  x_username:{
    type: DataTypes.CHAR(16),
    allowNull: true,
    comment: '用户名',
  },
  type: {
    type: DataTypes.CHAR(10),
    allowNull: true,
    comment: '类型', 
  },
  address: {
    type: DataTypes.CHAR(64),
    allowNull: true,
    comment: '地址',
  },
  building: {
    type: DataTypes.CHAR(64),
    allowNull: true,
    comment: '附近建筑',
  },
  date1: {
    type: DataTypes.DATE(64),
    allowNull: true,
    comment: '日期',
  },
  date2: {
    type: DataTypes.TIME(64),
    allowNull: true,
    comment: '时间',
  },
  description: {
    type: DataTypes.CHAR(128),
    allowNull: true,
    comment: '描述',
  }
})

//强制同步数据库(创建数据表)
// User.sync({ force: true })

module.exports = User