import {Sequelize} from "sequelize";

const sequelize = new Sequelize(
  "complaints",
  "root",
  "root1234",
  {
    host: "localhost",
    dialect: 'mysql', 
    logging: false, // Set to true to enable console logging
  }
);

export default sequelize;
