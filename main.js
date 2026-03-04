const defaults = {
  html: `<section class="mission-card">
  <h1>Mi primera misión HTML</h1>
  <p>Estoy aprendiendo a construir interfaces semánticas.</p>
  <a href="https://developer.mozilla.org/es/docs/Web/HTML" target="_blank" rel="noopener noreferrer">Referencia HTML</a>
  <img src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=600&q=80" alt="Planeta visto desde el espacio">
  <ul>
    <li>Estructura</li>
    <li>Contenido</li>
    <li>Estilo</li>
  </ul>
  <button id="hello-btn" type="button">Saludar</button>
  <p id="hello-msg"></p>
</section>`,
  css: `.mission-card {
  max-width: 620px;
  margin: 2rem auto;
  background: linear-gradient(135deg, #0f2338, #183f64);
  color: #eaf4ff;
  border: 1px solid #2d678f;
  border-radius: 14px;
  padding: 1.2rem;
  font-family: "Segoe UI", sans-serif;
}

.mission-card img {
  width: 100%;
  border-radius: 10px;
  margin-top: 0.7rem;
}

.mission-card a {
  color: #7bf7da;
}`,
  js: `const button = document.querySelector("#hello-btn");
const message = document.querySelector("#hello-msg");

if (button && message) {
  button.addEventListener("click", () => {
    message.textContent = "Excelente: ya estás usando interacción con JavaScript.";
  });
}`,
};

const state = {
  checklistScore: 0,
  quizScore: 0,
};

const htmlEditor = document.querySelector("#html-editor");
const cssEditor = document.querySelector("#css-editor");
const jsEditor = document.querySelector("#js-editor");
const previewFrame = document.querySelector("#preview");
const runCodeBtn = document.querySelector("#run-code");
const resetCodeBtn = document.querySelector("#reset-code");
const liveStatus = document.querySelector("#live-status");
const tabButtons = document.querySelectorAll(".tab-btn");
const editorPanels = document.querySelectorAll(".code-editor");
const validateBtn = document.querySelector("#validate-challenge");
const challengeResult = document.querySelector("#challenge-result");
const challengeItems = document.querySelectorAll("#challenge-list li");
const quizForm = document.querySelector("#quiz-form");
const quizResult = document.querySelector("#quiz-result");
const learningBar = document.querySelector("#learning-bar");
const learningScore = document.querySelector("#learning-score");

function setDefaults() {
  htmlEditor.value = defaults.html;
  cssEditor.value = defaults.css;
  jsEditor.value = defaults.js;
}

function buildPreviewDoc(html, css, js) {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>
    try {
      ${js}
    } catch (error) {
      const p = document.createElement("p");
      p.style.color = "#b00020";
      p.textContent = "Error en JS: " + error.message;
      document.body.appendChild(p);
    }
  <\/script>
</body>
</html>`;
}

function runPreview() {
  const html = htmlEditor.value;
  const css = cssEditor.value;
  const js = jsEditor.value;
  previewFrame.srcdoc = buildPreviewDoc(html, css, js);
  liveStatus.textContent = "Vista previa actualizada.";
}

function switchTab(target) {
  tabButtons.forEach((btn) => {
    const active = btn.dataset.tab === target;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", String(active));
  });

  editorPanels.forEach((panel) => {
    const active = panel.dataset.panel === target;
    panel.classList.toggle("hidden", !active);
  });
}

function evaluateChecklist() {
  const html = htmlEditor.value;
  const rules = {
    title: /<h[12][^>]*>/i,
    paragraph: /<p[^>]*>/i,
    link: /<a\s+[^>]*href\s*=\s*["'][^"']+["'][^>]*>/i,
    image: /<img\s+[^>]*alt\s*=\s*["'][^"']+["'][^>]*>/i,
    list: /<(ul|ol)[^>]*>/i,
  };

  let passed = 0;
  challengeItems.forEach((item) => {
    const ruleKey = item.dataset.rule;
    const ok = rules[ruleKey].test(html);
    item.classList.toggle("passed", ok);
    if (ok) {
      passed += 1;
    }
  });

  state.checklistScore = Math.round((passed / challengeItems.length) * 100);
  challengeResult.textContent = `Resultado de checklist: ${passed}/${challengeItems.length} criterios completos.`;
  updateProgress();
}

function evaluateQuiz(event) {
  event.preventDefault();

  const formData = new FormData(quizForm);
  const answers = {
    q1: "h1",
    q2: "a11y",
    q3: "fieldset",
  };

  let correct = 0;
  Object.keys(answers).forEach((key) => {
    if (formData.get(key) === answers[key]) {
      correct += 1;
    }
  });

  state.quizScore = Math.round((correct / Object.keys(answers).length) * 100);
  quizResult.textContent = `Puntaje quiz: ${correct}/3 respuestas correctas.`;
  updateProgress();
}

function updateProgress() {
  const average = Math.round((state.checklistScore + state.quizScore) / 2);
  learningBar.style.width = `${average}%`;
  learningScore.textContent = `${average}%`;
}

runCodeBtn.addEventListener("click", runPreview);

resetCodeBtn.addEventListener("click", () => {
  setDefaults();
  runPreview();
  liveStatus.textContent = "Editor reiniciado con la plantilla base.";
});

for (const button of tabButtons) {
  button.addEventListener("click", () => switchTab(button.dataset.tab));
}

validateBtn.addEventListener("click", evaluateChecklist);
quizForm.addEventListener("submit", evaluateQuiz);

setDefaults();
switchTab("html");
runPreview();
