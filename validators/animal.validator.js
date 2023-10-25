import { body } from "express-validator";

const validate = (method) => {
  switch (method) {
    case "createAnimal": {
      return [
        body("nome", "nome é obrigatório").exists().notEmpty(),
        body("tipo", "tipo é obrigatório").exists().notEmpty(),
        body("proprietario_id", "proprietario_id oi é obrigatório")
          .exists()
          .notEmpty(),
      ];
    }
  }
};

export default { validate };
