function setText(selector, text) {
  document.querySelector(selector).textContent = text;
}

function setEditableText(selector, text, path) {
  const element = document.querySelector(selector);
  element.textContent = text;
  element.dataset.editPath = path;
  element.contentEditable = "true";
}

function renderHero(data) {
  document.title = data.hero.title;
  setEditableText("#siteName", data.siteName, "siteName");
  setEditableText("#subjectType", data.hero.type, "hero.type");
  setEditableText("#subjectTitle", data.hero.title, "hero.title");
  setEditableText("#subjectSummary", data.hero.summary, "hero.summary");
  setEditableText("#primaryAction", data.hero.primaryAction, "hero.primaryAction");
  setEditableText("#secondaryAction", data.hero.secondaryAction, "hero.secondaryAction");
}

function renderFacts(facts) {
  const panel = document.querySelector("#subjectFacts");
  panel.replaceChildren(
    ...facts.map((fact, index) => {
      const item = createElement("div");
      item.append(
        createEditableElement("span", "status-label", fact.label, `facts.${index}.label`),
        createEditableElement("strong", "", fact.value, `facts.${index}.value`),
      );
      return item;
    }),
  );
}

function renderSectionCopy(sections) {
  setEditableText("#understandingEyebrow", sections.understanding.eyebrow, "sections.understanding.eyebrow");
  setEditableText("#understanding-title", sections.understanding.title, "sections.understanding.title");
  setEditableText("#understandingText", sections.understanding.text, "sections.understanding.text");
  setEditableText("#limitsEyebrow", sections.limits.eyebrow, "sections.limits.eyebrow");
  setEditableText("#limits-title", sections.limits.title, "sections.limits.title");
  setEditableText("#limitsText", sections.limits.text, "sections.limits.text");
  setEditableText("#stepsEyebrow", sections.steps.eyebrow, "sections.steps.eyebrow");
  setEditableText("#steps-title", sections.steps.title, "sections.steps.title");
  setEditableText("#outputsEyebrow", sections.outputs.eyebrow, "sections.outputs.eyebrow");
  setEditableText("#outputs-title", sections.outputs.title, "sections.outputs.title");
  setEditableText("#questionsEyebrow", sections.questions.eyebrow, "sections.questions.eyebrow");
  setEditableText("#questions-title", sections.questions.title, "sections.questions.title");
}
