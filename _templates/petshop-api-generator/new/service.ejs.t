---
to: services/<%= name %>.service.js
---


async function create<%= h.capitalize(name) %>(<%=name %>) {
  return await <%= h.capitalize(name) %>Repository.insert<%= h.capitalize(name) %>(<%=name %>);
}

async function update<%= h.capitalize(name) %>(<%=name %>) {
  return await <%= h.capitalize(name) %>Repository.update<%= h.capitalize(name) %>(<%=name %>);
}

async function delete<%= h.capitalize(name) %>(<%=name %>_id) {
  if (!(await AnimalRepository.getAnimais(<%=name %>_id))) {
    return await <%= h.capitalize(name) %>Repository.delete<%= h.capitalize(name) %>(<%=name %>_id);
  }
  throw new Error(
    "Não é possível deletar proprietários que tenham animais no cadastro."
  );
}

async function get<%= h.capitalize(name) %>s() {
  return await <%= h.capitalize(name) %>Repository.get<%= h.capitalize(name) %>s();
}

async function get<%= h.capitalize(name) %>(<%=name %>_id) {
  return await <%= h.capitalize(name) %>Repository.get<%= h.capitalize(name) %>(<%=name %>_id);
}

export default {
  create<%= h.capitalize(name) %>,
  update<%= h.capitalize(name) %>,
  delete<%= h.capitalize(name) %>,
  get<%= h.capitalize(name) %>s,
  get<%= h.capitalize(name) %>,
};
