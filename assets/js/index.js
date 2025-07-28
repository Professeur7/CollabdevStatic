// Gestion de la navigation
document.addEventListener("DOMContentLoaded", () => {
  // Liaison des projets vers les pages de détail
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!e.target.closest(".project-stat, .project-tag")) {
        const projectId = card.dataset.projectId;
        window.location.href = `project.html?id=${projectId}`;
      }
    });
  });

  // Chargement des données du projet
  if (window.location.pathname.includes("project.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("id");
    loadProjectData(projectId);
  }
});

async function loadProjectData(projectId) {
  try {
    const response = await fetch(`/api/projects/${projectId}`);
    const project = await response.json();
    displayProject(project);
  } catch (error) {
    console.error("Error loading project:", error);
  }
}
