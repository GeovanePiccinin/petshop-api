async function createTeste(teste) {
  return await TesteRepository.insertTeste(teste);
}

async function updateTeste(teste) {
  return await TesteRepository.updateTeste(teste);
}

async function deleteTeste(teste_id) {
  if (!(await AnimalRepository.getAnimais(teste_id))) {
    return await TesteRepository.deleteTeste(teste_id);
  }
  throw new Error(
    "Não é possível deletar proprietários que tenham animais no cadastro."
  );
}

async function getTestes() {
  return await TesteRepository.getTestes();
}

async function getTeste(teste_id) {
  return await TesteRepository.getTeste(teste_id);
}

export default {
  createTeste,
  updateTeste,
  deleteTeste,
  getTestes,
  getTeste,
};
