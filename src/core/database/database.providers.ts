
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/users/user.entity';
import { DEVELOPMENT, PRODUCTION, TEST } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
          break;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        User
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];