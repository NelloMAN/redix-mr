
import { Sequelize } from 'sequelize';

export const DATA_SOURCES = {
    mySqlDataSource: {
      DB_HOST: 'localhost',
      DB_USER: 'root',
      DB_PASSWORD: 'redixmr2022!_',
      DB_PORT: 3001,
      DB_DATABASE: 'redix_mr',
    }
  };

  const env = process.env.NODE_ENV || 'development';
  
  const config: Record<string, any> = {
    development: {
      username: 'root',  // inserire il proprio username
      password: 'redixmr2022!_',  // inserire la propria password
      database: 'redix_mr',  // inserire il nome del database
      host: 'localhost',
      dialect: 'mysql'
    },
    production: {
      username: 'root',  // inserire il proprio username
      password: 'redixmr2022!_',  // inserire la propria password
      database: 'redix_mr',  // inserire il nome del database
      host: 'localhost',
      dialect: 'mysql'
    }
  };
  
  export const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);
  