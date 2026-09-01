async function loadProjects() {
    const projectsContainer = document.getElementById("projects");

    try {
        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error("Could not load projects");
        }

        const projects = await response.json();

        projectsContainer.innerHTML = "";

        projects.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";

            card.innerHTML = `
                <h3>${project.name}</h3>

                <p class="release-date">
                    Version: ${project.version}
                    | Released: ${project.releaseDate}
                </p>

                <p>
                    ${project.description}
                </p>

                <p>
                    <strong>File Size:</strong> ${project.fileSize}
                </p>

                <a
                    class="download-btn"
                    href="${project.downloadPage}"
                >
                    Get Download Link
                </a>
            `;

            projectsContainer.appendChild(card);
        });

    } catch (error) {
        projectsContainer.innerHTML = `
            <div class="project-card">
                <h3>Unable to load projects</h3>
                <p>Please try again later.</p>
            </div>
        `;

        console.error(error);
    }
}

loadProjects();
