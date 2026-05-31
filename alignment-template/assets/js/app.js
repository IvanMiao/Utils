const defaultData = window.alignmentData;
const data = loadStoredData(defaultData);
window.alignmentData = data;

function renderAll() {
  renderHero(data);
  renderFacts(data.facts);
  renderSectionCopy(data.sections);
  renderTopics(data.topics);
  renderLimitTabs(data.limits);
  renderLimitDetail(data.limits[0]);
  renderSteps(data.steps);
  renderOutputs(data.steps);
  renderQuestions(data.questions);
  renderSectionControls(data, () => saveData(data));
  applySectionVisibility(data);
  bindEditableFields(data);
  bindDeleteButtons(data, renderAll);
  bindEditorActions(data, renderAll);
  initLimitTabs(data.limits);
  initOutputCards();
  initOutputToggle();
  initProgress(data.steps);
  setEditableState(!document.body.classList.contains("browse-mode"));
}

renderAll();
document.body.classList.add("editor-open");
