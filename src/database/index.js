import Sequelize from 'sequelize';
import configDatabase from '../config/database';
import User from '../app/models/User';
import Products from '../app/models/Products';
import Category from '../app/models/Category';

const models = [User, Products, Category];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(configDatabase);
    models.
    map((model) => model.init(this.connection));
  }
}

export default new Database();