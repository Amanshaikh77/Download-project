async function loadProjects() {
  const currentContainer = document.getElementById("current-project-container");
  const archiveContainer = document.getElementById("archive-container");

  try {
    const response = await fetch("/api/projects");

    if (!response.ok) {
      throw new Error("Failed to load projects");
    }

    const data = await response.json();

    const projects = Array.isArray(data.projects)
      ? data.projects
      : [];

    if (projects.length === 0) {
      currentContainer.innerHTML = "<p>No projects published yet.</p>";
      archiveContainer.innerHTML = "<p>No archived projects yet.</p>";
      return;
    }

    const currentProject = projects[0];
    const archivedProjects = projects.slice(1);

    currentContainer.innerHTML = createCurrentProject(currentProject);

    if (archivedProjects.length === 0) {
      archiveContainer.innerHTML = "<p>No previous projects yet.</p>";
    } else {
      archiveContainer.innerHTML = archivedProjects
        .map(createArchiveProject)
        .join("");
    }

  } catch (error) {
    console.error(error);

    currentContainer.innerHTML =
      "<p>Unable to load current project.</p>";

    archiveContainer.innerHTML =
      "<p>Unable to load project archive.</p>";
  }
}


function createCurrentProject(project) {
  return `
    <article class="project-card">
      <h3>${escapeHtml(project.name)}</h3>

      <p class="project-description">
        ${escapeHtml(project.description)}
      </p>

      <div class="project-meta">
        <p><strong>Version:</strong> ${escapeHtml(project.version)}</p>
        <p><strong>File Size:</strong> ${escapeHtml(project.file_size)}</p>
        <p><strong>Release Date:</strong> ${formatDate(project.created_at)}</p>
      </div>

      <a
        class="download-button"
        href="/redirect-1/?project=${encodeURIComponent(project.id)}"
      >
        Download
      </a>
    </article>
  `;
}


function createArchiveProject(project) {
  return `
    <article class="archive-card">
      <h3>${escapeHtml(project.name)}</h3>

      <p class="project-description">
        ${escapeHtml(project.description)}
      </p>

      <div class="project-meta">
        <p><strong>Version:</strong> ${escapeHtml(project.version)}</p>
        <p><strong>File Size:</strong> ${escapeHtml(project.file_size)}</p>
        <p><strong>Release Date:</strong> ${formatDate(project.created_at)}</p>
      </div>
    </article>
  `;
}


function formatDate(dateString) {
  if (!dateString) {
    return "Unknown";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString();
}


function escapeHtml(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


loadProjects();
