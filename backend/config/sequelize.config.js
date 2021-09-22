'use strict'
const mysqlConfig = require("backend/db/mysql.db.config");
const Sequelize = require("sequelize");
const {pool} = require("../db/mysql.db.config");

module.exports = new Sequelize(mysqlConfig.DB, mysqlConfig.USER, mysqlConfig.PASSWORD, {
    host: mysqlConfig.HOST,
    dialect: mysqlConfig.dialect,
    operatorsAliases: false,

    pool: mysqlConfig.pool
});








