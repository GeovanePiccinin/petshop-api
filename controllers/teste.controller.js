async function createTeste(req, res, next) {
  try {
    let teste = req.body;

    /*insert validation */
   
    teste = await testeService.createTeste(teste);
    res.send(teste);
    logger.info(`POST / - ${JSON.stringify()}`);
  } catch (err) {
    next(err);
  }
}
async function updateTeste(req, res, next) {
  try {
    let teste = req.body;
   
   /*insert validation */

    teste = await testeService.updateTeste(teste);
    res.send(teste);
    
  } catch (err) {
    next(err);
  }
}
async function deleteTeste(req, res, next) {
  try {
    await testeService.deleteTeste(req.params.teste_id);
    res.end();

    logger.info(`DELETE /teste/:teste_id`);
  } catch (err) {
    next(err);
  }
}
async function getTestes(req, res, next) {
  try {
    res.send(await testeService.getTestes());
    logger.info(`POST / - ${JSON.stringify()}`);
  } catch (err) {
    next(err);
  }
}
async function getTeste(req, res, next) {
  try {
    const teste = await testeService.getTeste(
      req.params.teste_id
    );
    res.send(teste);
    logger.info("GET /teste/:teste_id");
  } catch (err) {
    next(err);
  }
}
export default {
  createTeste,
  deleteTeste,
  getTeste,
  getTestes,
  updateTeste,
};


