const projectInfo = document.getElementById("project-info");
const downloadButton = document.getElementById("download-button");

const params = new URLSearchParams(window.location.search);
const projectId = params.get("project");

if (!projectId) {
  showError("Project not found.");
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

    downloadButton.href =
      `https://drive.google.com/uc?export=download&id=${encodeURIComponent(project.drive_file_id)}`;

  } catch (error) {
    console.error(error);
    showError(error.message);
  }
}

function showError(message) {
  projectInfo.innerHTML = `
    <p class="error">${escapeHtml(message)}</p>
  `;

  downloadButton.style.display = "none";
}

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
