const Sequelize = require('sequelize');

const dbName = process.env.MYSQL_DB_NAME;
const dbHost = process.env.MYSQL_DB_HOST;
const dbPort = process.env.MYSQL_DB_PORT;
const userName = process.env.MYSQL_DB_USER;
const userPass = process.env.MYSQL_DB_PASS;

const sequelize = new Sequelize(dbName, userName, userPass, {
    dialect: 'mysql',
    host: dbHost,
    port: dbPort,
    define: {
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        underscored: true,
    },
    logging: false,
});

module.exports = sequelize;