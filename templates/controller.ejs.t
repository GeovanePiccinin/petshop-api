---
to: controllers/<%= name %>.controller.js
---

async function create<%= h.capitalize(name) %>(req, res, next) {
  try {
    let <%= name %> = req.body;

    /*insert validation */
   
    <%= name %> = await <%= name %>Service.create<%= h.capitalize(name) %>(<%= name %>);
    res.send(<%= name %>);
    logger.info(`POST / - ${JSON.stringify()}`);
  } catch (err) {
    next(err);
  }
}
async function update<%= h.capitalize(name) %>(req, res, next) {
  try {
    let <%= name %> = req.body;
   
   /*insert validation */

    <%= name %> = await <%= name %>Service.update<%= h.capitalize(name) %>(<%= name %>);
    res.send(<%= name %>);
    
  } catch (err) {
    next(err);
  }
}
async function delete<%= h.capitalize(name) %>(req, res, next) {
  try {
    await <%= name %>Service.delete<%= h.capitalize(name) %>(req.params.<%= name %>_id);
    res.end();

    logger.info(`DELETE /<%= name %>/:<%= name %>_id`);
  } catch (err) {
    next(err);
  }
}
async function get<%= h.capitalize(name) %>s(req, res, next) {
  try {
    res.send(await <%= name %>Service.get<%= h.capitalize(name) %>s());
    logger.info(`POST / - ${JSON.stringify()}`);
  } catch (err) {
    next(err);
  }
}
async function get<%= h.capitalize(name) %>(req, res, next) {
  try {
    const <%= name %> = await <%= name %>Service.get<%= h.capitalize(name) %>(
      req.params.<%= name %>_id
    );
    res.send(<%= name %>);
    logger.info("GET /<%= name %>/:<%= name %>_id");
  } catch (err) {
    next(err);
  }
}
export default {
  create<%= h.capitalize(name) %>,
  delete<%= h.capitalize(name) %>,
  get<%= h.capitalize(name) %>,
  get<%= h.capitalize(name) %>s,
  update<%= h.capitalize(name) %>,
};


