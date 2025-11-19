const Sequelize = require('sequelize');
const config =  require('./environment');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: {
        charset: 'utf8mb4'
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
   
});

// sequelize.on('trace', (sql) => { console.log(`Executed SQL: ${sql}`); });

module.exports = sequelize;
  

