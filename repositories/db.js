import Sequelize from "sequelize";

const sequelize = new Sequelize(process.env.ELEPHANT_SQL_STRING_CONNECTION, {
  dialect: "postgres",
  define: {
    timestamps: false,
  },
});

export default sequelize;
