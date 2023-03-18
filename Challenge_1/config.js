require('dotenv').config();

if (process.env.NODE_ENV == undefined) {
    process.env.NODE_ENV="dev"
}
let env = process.env.NODE_ENV.trim(); // 'dev' or 'prod'

const dev = {
    server: {
        port: parseInt(process.env.DEV_SERVER_PORT) || 3000,
        key: parseInt(process.env.DEV_SERVER_KEY) || "azerty",
        tokenDuration: parseInt(process.env.DEV_SERVER_TOKEN_DURATION) || "24h"
    },
    sql: {
        host: process.env.DEV_SQL_HOST || "localhost",
        user: process.env.DEV_SQL_USER || "root",
        password: process.env.DEV_SQL_PASSWORD || "mysql",
        database: process.env.DEV_SQL_DATABASE || "ctf1"
    }
};

const prod = {
    server: {
        port: parseInt(process.env.PROD_SERVER_PORT) || 3000,
        key: parseInt(process.env.PROD_SERVER_KEY) || "azerty",
        tokenDuration: parseInt(process.env.PROD_SERVER_TOKEN_DURATION) || "24h"
    },
    sql: {
        host: process.env.PROD_SQL_HOST || '127.0.0.1',
        port: parseInt(process.env.PROD_SQL_PORT) || 27017,
        name: process.env.PROD_SQL_NAME || 'prod'
    }
};

const config = {
    dev,
    prod
};

console.log(config[env]);

module.exports = config[env];