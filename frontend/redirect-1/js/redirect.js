const projectInfo = document.getElementById("project-info");
const timerText = document.getElementById("timer-text");
const continueButton = document.getElementById("continue-button");

const params = new URLSearchParams(window.location.search);
const projectId = params.get("project");

if (!projectId) {
  projectInfo.innerHTML = `
    <p class="error">Project not found.</p>
  `;

  timerText.textContent = "Invalid project link.";
} else {
  loadProject();
}

async function loadProject() {
  try {
    const response = await fetch("/api/projects");

    if (!response.ok) {
      throw new Error("Failed to load projects");
    }

    const data = await response.json();

    if (!data.success || !Array.isArray(data.projects)) {
      throw new Error("Invalid project data");
    }

    const project = data.projects.find(item => item.id === projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    projectInfo.innerHTML = `
      <div class="info-item">
        <span class="info-label">Project:</span>
        ${escapeHtml(project.name)}
      </div>

      <div class="info-item">
        <span class="info-label">Version:</span>
        ${escapeHtml(project.version)}
      </div>

      <div class="info-item">
        <span class="info-label">Description:</span>
        ${escapeHtml(project.description)}
      </div>

      <div class="info-item">
        <span class="info-label">File Size:</span>
        ${escapeHtml(project.file_size)}
      </div>

      <div class="info-item">
        <span class="info-label">Release Date:</span>
        ${formatDate(project.created_at)}
      </div>
    `;

    startTimer();
  } catch (error) {
    console.error(error);

    projectInfo.innerHTML = `
      <p class="error">${escapeHtml(error.message)}</p>
    `;

    timerText.textContent = "Unable to continue.";
  }
}

function startTimer() {
  let seconds = 5;

  timerText.textContent = `Please wait ${seconds} seconds...`;

  const timer = setInterval(() => {
    seconds--;

    if (seconds > 0) {
      timerText.textContent = `Please wait ${seconds} seconds...`;
    } else {
      clearInterval(timer);

      timerText.textContent = "You can continue.";
      continueButton.disabled = false;
    }
  }, 1000);
}

continueButton.addEventListener("click", () => {
  if (!projectId) {
    return;
  }

  window.location.href =
    `/redirect-2/?project=${encodeURIComponent(projectId)}`;
});

function formatDate(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
