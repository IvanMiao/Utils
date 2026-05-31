function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function createEditableElement(tag, className, text, path) {
  const element = createElement(tag, className, text);
  element.contentEditable = "true";
  element.dataset.editPath = path;
  return element;
}

function createDeleteButton(collection, index) {
  const button = createElement("button", "delete-item", "Supprimer");
  button.type = "button";
  button.dataset.deleteCollection = collection;
  button.dataset.deleteIndex = String(index);
  return button;
}

function renderChips(tags, basePath = "") {
  const row = createElement("div", "chip-row");
  row.append(
    ...tags.map((tag, index) =>
      createEditableElement("span", "chip", tag, `${basePath}.${index}`),
    ),
  );
  return row;
}
