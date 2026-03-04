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
const missionStepItems = document.querySelectorAll("#mission-steps li");
const missionHint = document.querySelector("#mission-hint");
const missionStatus = document.querySelector("#mission-status");
const missionCheckBtn = document.querySelector("#mission-check");
const missionExampleBtn = document.querySelector("#mission-example");
const missionResetBtn = document.querySelector("#mission-reset");
const moduleDialog = document.querySelector("#module-dialog");
const moduleButtons = document.querySelectorAll(".detail-trigger");
const dialogTitle = document.querySelector("#dialog-title");
const dialogKicker = document.querySelector("#dialog-kicker");
const dialogSummary = document.querySelector("#dialog-summary");
const dialogTopics = document.querySelector("#dialog-topics");
const dialogCloseBtn = document.querySelector("#dialog-close-btn");
const dialogCloseIcon = document.querySelector("#dialog-close-icon");

const moduleCatalog = {
  estructura: {
    kicker: "Módulo 01",
    title: "Estructura base del documento",
    summary: "Ordena tu HTML con semántica para mejorar lectura, mantenimiento y accesibilidad.",
    topics: [
      "Comienza con `<!doctype html>` y define `lang=\"es\"`.",
      "Usa `header`, `main` y `footer` como esqueleto principal.",
      "Divide bloques con `section` y contenido autónomo con `article`.",
    ],
  },
  texto: {
    kicker: "Módulo 02",
    title: "Texto semántico y jerarquía",
    summary: "Las etiquetas de texto no son visuales solamente: transmiten importancia del contenido.",
    topics: [
      "Debe existir un solo `h1` representando el tema central.",
      "Utiliza `h2` y `h3` para agrupar subtemas de forma lógica.",
      "Usa `strong`, `em`, `blockquote` y `q` cuando el sentido lo requiera.",
    ],
  },
  enlaces: {
    kicker: "Módulo 03",
    title: "Navegación con enlaces claros",
    summary: "Un enlace bien escrito mejora la experiencia y evita ambigüedad en la navegación.",
    topics: [
      "Texto del enlace debe describir destino, no solo decir 'click aquí'.",
      "Para enlaces externos en nueva pestaña, usa `target=\"_blank\"` y `rel=\"noopener noreferrer\"`.",
      "Usa anclas internas (`#id`) para guiar al usuario por la página.",
    ],
  },
  imagenes: {
    kicker: "Módulo 04",
    title: "Imágenes con contexto y accesibilidad",
    summary: "Toda imagen relevante necesita contexto para usuarios y tecnologías asistivas.",
    topics: [
      "Incluye atributo `alt` útil y específico en cada `img`.",
      "Evita repetir en `alt` lo que ya está justo al lado en texto.",
      "Usa `figure` + `figcaption` para ilustraciones con explicación.",
    ],
  },
  tablas: {
    kicker: "Módulo 05",
    title: "Tablas para datos, no maquetación",
    summary: "Las tablas deben expresar relaciones entre columnas y filas de forma semántica.",
    topics: [
      "Declara `caption` para contexto rápido de los datos.",
      "Separa `thead` y `tbody` para estructura clara.",
      "Usa `scope=\"col\"` y `scope=\"row\"` en los encabezados.",
    ],
  },
  formularios: {
    kicker: "Módulo 06",
    title: "Formularios usables",
    summary: "Un formulario claro reduce errores y facilita que el usuario complete la tarea.",
    topics: [
      "Asocia cada input con su `label` usando `for` e `id`.",
      "Agrupa campos relacionados en `fieldset` con `legend` descriptivo.",
      "Aprovecha tipos (`email`, `date`, `range`) para validación nativa.",
    ],
  },
};

const beginnerMission = [
  {
    label: "Paso 1",
    regex: /<h1[^>]*>[\s\S]*?<\/h1>/i,
    hint: "Agrega un título principal, por ejemplo: <h1>Mi primera página</h1>.",
    example: "<h1>Mi primera página</h1>",
  },
  {
    label: "Paso 2",
    regex: /<p[^>]*>[\s\S]*?<\/p>/i,
    hint: "Añade un párrafo corto debajo del título para explicar de qué trata tu página.",
    example: "<p>Estoy practicando HTML paso a paso.</p>",
  },
  {
    label: "Paso 3",
    regex: /<a\s+[^>]*href\s*=\s*["'][^"']+["'][^>]*>[\s\S]*?<\/a>/i,
    hint: "Incluye un enlace con href. Ejemplo: <a href=\"https://example.com\">Visitar</a>.",
    example: "<a href=\"https://developer.mozilla.org/es/docs/Web/HTML\" target=\"_blank\" rel=\"noopener noreferrer\">Referencia HTML</a>",
  },
  {
    label: "Paso 4",
    regex: /<img\s+[^>]*alt\s*=\s*["'][^"']+["'][^>]*>/i,
    hint: "Agrega una imagen y describe su contenido en alt.",
    example: "<img src=\"https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=600&q=80\" alt=\"Planeta visto desde el espacio\">",
  },
];

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

function evaluateBeginnerMission(announce = false) {
  if (!missionStepItems.length || !missionHint || !missionStatus) {
    return { currentStep: 0, completedCount: 0 };
  }

  const html = htmlEditor.value;
  const completed = beginnerMission.map((step) => step.regex.test(html));
  const completedCount = completed.filter(Boolean).length;

  let currentStep = completed.findIndex((done) => !done);
  if (currentStep === -1) {
    currentStep = beginnerMission.length;
  }

  missionStepItems.forEach((item, index) => {
    item.classList.remove("done", "current", "locked");

    if (index < currentStep) {
      item.classList.add("done");
      return;
    }

    if (index === currentStep) {
      item.classList.add("current");
      return;
    }

    item.classList.add("locked");
  });

  if (currentStep < beginnerMission.length) {
    missionHint.innerHTML = `Pista activa: ${beginnerMission[currentStep].hint}`;
    if (announce) {
      missionStatus.textContent = `Estado: completaste ${completedCount}/${beginnerMission.length}. Ahora sigue con ${beginnerMission[currentStep].label}.`;
    }
  } else {
    missionHint.textContent = "Misión completa: ya dominas la estructura base de una página HTML.";
    if (announce) {
      missionStatus.textContent = "Estado: misión completada. Excelente trabajo.";
    }
  }

  return { currentStep, completedCount };
}

function insertBeginnerExample() {
  const { currentStep } = evaluateBeginnerMission(false);
  if (currentStep >= beginnerMission.length) {
    missionStatus.textContent = "Estado: ya completaste todos los pasos.";
    return;
  }

  const step = beginnerMission[currentStep];
  if (step.regex.test(htmlEditor.value)) {
    missionStatus.textContent = `Estado: ${step.label} ya está completo.`;
    return;
  }

  htmlEditor.value = `${htmlEditor.value}\n${step.example}`.trim();
  missionStatus.textContent = `Estado: se insertó un ejemplo para ${step.label}.`;
  runPreview();
  evaluateBeginnerMission(false);
}

function resetBeginnerMission() {
  htmlEditor.value = `<section>\n  <!-- Escribe aquí tu misión -->\n</section>`;
  switchTab("html");
  runPreview();
  missionStatus.textContent = "Estado: editor reiniciado para comenzar desde cero.";
  evaluateBeginnerMission(false);
}

function closeModal(dialog, returnValue = "dismiss") {
  if (!dialog?.open) {
    return;
  }

  if (typeof dialog.requestClose === "function") {
    dialog.requestClose(returnValue);
  } else {
    dialog.close(returnValue);
  }
}

function openModuleDialog(moduleKey) {
  const moduleData = moduleCatalog[moduleKey];
  if (!moduleData || !moduleDialog || typeof moduleDialog.showModal !== "function") {
    return;
  }

  dialogKicker.textContent = moduleData.kicker;
  dialogTitle.textContent = moduleData.title;
  dialogSummary.textContent = moduleData.summary;
  dialogTopics.innerHTML = moduleData.topics.map((topic) => `<li>${topic}</li>`).join("");
  moduleDialog.showModal();
}

runCodeBtn.addEventListener("click", runPreview);

resetCodeBtn.addEventListener("click", () => {
  setDefaults();
  runPreview();
  liveStatus.textContent = "Editor reiniciado con la plantilla base.";
  evaluateBeginnerMission(false);
});

for (const button of tabButtons) {
  button.addEventListener("click", () => switchTab(button.dataset.tab));
}

validateBtn.addEventListener("click", evaluateChecklist);
quizForm.addEventListener("submit", evaluateQuiz);
missionCheckBtn?.addEventListener("click", () => evaluateBeginnerMission(true));
missionExampleBtn?.addEventListener("click", insertBeginnerExample);
missionResetBtn?.addEventListener("click", resetBeginnerMission);
htmlEditor?.addEventListener("input", () => evaluateBeginnerMission(false));

for (const trigger of moduleButtons) {
  trigger.addEventListener("click", () => {
    openModuleDialog(trigger.dataset.module);
  });
}

if (moduleDialog) {
  moduleDialog.addEventListener("click", (event) => {
    const dialogRect = moduleDialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < dialogRect.left ||
      event.clientX > dialogRect.right ||
      event.clientY < dialogRect.top ||
      event.clientY > dialogRect.bottom;

    if (clickedOutside) {
      closeModal(moduleDialog, "backdrop");
    }
  });
}

dialogCloseBtn?.addEventListener("click", () => closeModal(moduleDialog, "button"));
dialogCloseIcon?.addEventListener("click", () => closeModal(moduleDialog, "icon"));

setDefaults();
switchTab("html");
runPreview();
evaluateBeginnerMission(false);
