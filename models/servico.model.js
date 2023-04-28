import Sequelize from "sequelize";
import db from "../repositories/db.js";
import Animal from "./animal.model.js";

const Servico = db.define(
  "servicos",
  {
    servicoId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valor: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  { underscored: true }
);

Servico.belongsTo(Animal, { foreignKey: "animalId" });

export default Servico;
