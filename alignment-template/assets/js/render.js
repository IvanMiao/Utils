function renderTopics(topics) {
  const container = document.querySelector("#topicCards");
  container.replaceChildren(
    ...topics.map((item, index) => {
      const card = createElement("article", "topic-card");
      card.append(
        createEditableElement("h3", "", item.title, `topics.${index}.title`),
        createEditableElement("p", "", item.summary, `topics.${index}.summary`),
        createEditableElement("strong", "", item.value, `topics.${index}.value`),
        renderChips(item.tags, `topics.${index}.tags`),
        createDeleteButton("topics", index),
      );
      return card;
    }),
  );
}

function renderLimitTabs(limits) {
  const tabs = document.querySelector("#limitTabs");
  tabs.replaceChildren(
    ...limits.map((limit, index) => {
      limit.index = index;
      const tab = createElement("button", "tab", limit.label);
      tab.type = "button";
      tab.id = `tab-${limit.id}`;
      tab.dataset.limitId = limit.id;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", "limitDetail");
      tab.setAttribute("aria-selected", String(index === 0));
      return tab;
    }),
  );
}

function renderLimitDetail(limit) {
  const panel = document.querySelector("#limitDetail");
  if (!limit) {
    panel.replaceChildren(createElement("p", "", "Ajoute une contrainte pour remplir cette section."));
    return;
  }

  panel.replaceChildren(
    createEditableElement("span", "meta-label", limit.label, `limits.${limit.index}.label`),
    createEditableElement("h3", "", limit.title, `limits.${limit.index}.title`),
    createEditableElement("p", "", limit.text, `limits.${limit.index}.text`),
    createElement("span", "meta-label", "Impact sur le plan"),
    createEditableElement("strong", "", limit.impact, `limits.${limit.index}.impact`),
    createDeleteButton("limits", limit.index),
  );
}

function renderSteps(steps) {
  const timeline = document.querySelector("#stepTimeline");
  timeline.replaceChildren(
    ...steps.map((step, index) => {
      const card = createElement("article", "step-card");
      card.append(
        createElement("div", "step-index", String(index + 1).padStart(2, "0")),
        renderStepBody(step, index),
        renderStepMeta(step, index),
        createDeleteButton("steps", index),
      );
      return card;
    }),
  );
}

function renderStepBody(step, index) {
  const body = createElement("div");
  body.append(
    createEditableElement("h3", "", step.title, `steps.${index}.title`),
    createEditableElement("p", "", step.understanding, `steps.${index}.understanding`),
  );
  return body;
}

function renderStepMeta(step, index) {
  const meta = createElement("div", "step-meta");
  meta.append(
    createElement("span", "meta-label", "Besoin"),
    createEditableElement("p", "", step.need, `steps.${index}.need`),
    createElement("span", "meta-label", "Livrable"),
    createEditableElement("p", "", step.output, `steps.${index}.output`),
  );
  return meta;
}

function renderOutputs(steps) {
  const matrix = document.querySelector("#outputMatrix");
  matrix.replaceChildren(
    ...steps.map((step, index) => {
      const card = createElement("article", "matrix-card");
      card.tabIndex = 0;
      card.setAttribute("aria-expanded", "false");
      card.append(
        createElement("h3", "", `${index + 1}. ${step.title}`),
        createEditableElement("p", "", step.output, `steps.${index}.output`),
      );
      return card;
    }),
  );
}

function renderQuestions(questions) {
  const list = document.querySelector("#questionList");
  list.replaceChildren(
    ...questions.map((question, index) => {
      const item = createElement("li");
      item.append(
        createEditableElement("span", "", question, `questions.${index}`),
        createDeleteButton("questions", index),
      );
      return item;
    }),
  );
}
