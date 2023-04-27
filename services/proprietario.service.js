import ProprietarioRepository from "../repositories/proprietario.repository.js";
import AnimalRepository from "../repositories/animal.repository.js";

async function createProprietario(proprietario) {
  return await ProprietarioRepository.insertProprietario(proprietario);
}

async function updateProprietario(proprietario) {
  return await ProprietarioRepository.updateProprietario(proprietario);
}

async function deleteProprietario(proprietario_id) {
  if (!(await AnimalRepository.getAnimais(proprietario_id))) {
    return await ProprietarioRepository.deleteProprietario(proprietario_id);
  }
  throw new Error(
    "Não é possível deletar proprietários que tenham animais no cadastro."
  );
}

async function getProprietarios() {
  return await ProprietarioRepository.getProprietarios();
}

async function getProprietario(proprietario_id) {
  return await ProprietarioRepository.getProprietario(proprietario_id);
}

export default {
  createProprietario,
  updateProprietario,
  deleteProprietario,
  getProprietarios,
  getProprietario,
};
