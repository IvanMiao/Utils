function bindEditableFields(data) {
  document.querySelectorAll("[data-edit-path]").forEach((field) => {
    if (field.dataset.editorBound === "true") return;
    field.dataset.editorBound = "true";

    field.addEventListener("click", (event) => {
      if (field.closest("a")) event.preventDefault();
    });

    field.addEventListener("input", () => {
      const nextValue = normalizeEditableText(field);
      setPathValue(data, field.dataset.editPath, nextValue);
      if (field.dataset.editPath === "hero.title") document.title = nextValue;
      scheduleAutoSave(data);
    });
  });
}

function normalizeEditableText(field) {
  return field.textContent.replace(/\s+/g, " ").trim();
}

function renderSectionControls(data, onChange) {
  const labels = {
    understanding: "Compréhension",
    limits: "Contraintes",
    steps: "Étapes",
    outputs: "Livrables",
    questions: "Questions",
  };
  const container = document.querySelector("#sectionControls");
  container.replaceChildren(
    ...Object.entries(labels).map(([id, label]) => {
      const control = createElement("label", "section-toggle");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = data.layout.sections[id];
      input.addEventListener("change", () => {
        data.layout.sections[id] = input.checked;
        applySectionVisibility(data);
        onChange();
      });
      control.append(input, createElement("span", "", label));
      return control;
    }),
  );
}

function applySectionVisibility(data) {
  Object.entries(data.layout.sections).forEach(([id, isVisible]) => {
    document.querySelector(`#${id}`).hidden = !isVisible;
  });
}

function bindEditorActions(data, renderAll) {
  document.querySelectorAll("[data-add]").forEach((button) => {
    if (button.dataset.addBound === "true") return;
    button.dataset.addBound = "true";

    button.addEventListener("click", () => {
      data[button.dataset.add].push(createItem(button.dataset.add));
      renderAll();
      setEditorStatus("Élément ajouté.");
    });
  });

  document.querySelector("#saveTemplate").addEventListener("click", () => saveData(data));
  document.querySelector("#exportTemplate").addEventListener("click", () => exportData(data));
  document.querySelector("#resetTemplate").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  });

  const modeToggle = document.querySelector("#modeToggle");
  if (modeToggle.dataset.modeBound !== "true") {
    modeToggle.dataset.modeBound = "true";
    modeToggle.addEventListener("click", () => toggleMode(data));
  }
}

function bindDeleteButtons(data, renderAll) {
  document.querySelectorAll("[data-delete-collection]").forEach((button) => {
    button.addEventListener("click", () => {
      const collection = button.dataset.deleteCollection;
      const index = Number(button.dataset.deleteIndex);
      data[collection].splice(index, 1);
      renderAll();
      setEditorStatus("Élément supprimé.");
    });
  });
}

function createItem(collection) {
  const factories = {
    topics: () => ({
      title: "Nouveau sujet",
      summary: "Décris ce point du sujet.",
      value: "Explique pourquoi il compte.",
      tags: ["tag"],
    }),
    limits: () => ({
      id: `limit-${Date.now()}`,
      label: "Contrainte",
      title: "Nouvelle contrainte",
      text: "Décris la contrainte.",
      impact: "Explique son impact sur le plan.",
    }),
    steps: () => ({
      title: "Nouvelle étape",
      need: "Ce dont cette étape a besoin.",
      output: "Ce que cette étape livre.",
      understanding: "Pourquoi cette étape est utile.",
    }),
    questions: () => "Nouvelle question à valider.",
  };
  return factories[collection]();
}

function toggleMode(data) {
  const isBrowseMode = !document.body.classList.contains("browse-mode");
  document.body.classList.toggle("browse-mode", isBrowseMode);
  document.body.classList.toggle("editor-open", !isBrowseMode);
  document.querySelector("#editorPanel").classList.toggle("is-closed", isBrowseMode);
  document.querySelector("#modeToggle").textContent = isBrowseMode ? "Editer" : "Parcourir";
  document.querySelector("#modeToggle").setAttribute("aria-pressed", String(!isBrowseMode));
  setEditableState(!isBrowseMode);
  if (isBrowseMode) saveData(data);
}

function setEditableState(isEditable) {
  document.querySelectorAll("[data-edit-path]").forEach((field) => {
    field.contentEditable = String(isEditable);
  });
}

function setEditorStatus(message) {
  document.querySelector("#editorStatus").textContent = message;
}
