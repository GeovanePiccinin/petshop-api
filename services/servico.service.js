import ServicoRepository from "../repositories/servico.repository.js";
import AnimalRepository from "../repositories/animal.repository.js";

async function createServico(servico) {
  if (await AnimalRepository.getAnimal(servico.animalId)) {
    return await ServicoRepository.insertServico(servico);
  }
  throw new Error("O animal_id informado não existe");
}

async function updateServico(servico) {
  if (await AnimalRepository.getAnimal(servico.animalId)) {
    return await ServicoRepository.updateServico(servico);
  }
  throw new Error("O animal_id informado não existe");
}

async function deleteServico(servicoId) {
  return await ServicoRepository.deleteServico(servicoId);
}

async function getServicosByProprietarioId(proprietario_id) {
  return await ServicoRepository.getServicosByProprietarioId(proprietario_id);
}

async function getServicos(animal_id) {
  if (animal_id) {
    return await ServicoRepository.getServicosByAnimalId(animal_id);
  }
  return await ServicoRepository.getServicos();
}

async function getServico(servicoId) {
  return await ServicoRepository.getServico(servicoId);
}

export default {
  createServico,
  updateServico,
  deleteServico,
  getServicos,
  getServico,
  getServicosByProprietarioId,
};
