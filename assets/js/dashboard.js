import { getCurrentUser, logout } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = "index.html";
    return;
  }

  // Gestion du menu utilisateur
  const userMenuBtn = document.getElementById("userMenuBtn");
  const userDropdown = document.getElementById("userDropdown");

  userMenuBtn.addEventListener("click", () => {
    userDropdown.style.display =
      userDropdown.style.display === "block" ? "none" : "block";
  });

  // Fermer le menu quand on clique ailleurs
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".user-menu")) {
      userDropdown.style.display = "none";
    }
  });

  // Gestion de la déconnexion
  document.getElementById("logoutBtn").addEventListener("click", logout);

  // Charger les données du dashboard
  loadDashboardData();
});

async function loadDashboardData() {
  try {
    const [projects, contributions] = await Promise.all([
      fetchUserProjects(),
      fetchPendingContributions(),
    ]);

    displayRecentProjects(projects);
    displayPendingContributions(contributions);
  } catch (error) {
    console.error("Error loading dashboard data:", error);
  }
}

async function fetchUserProjects() {
  // Simuler un appel API
  return [
    {
      id: 1,
      title: "Plateforme de gestion de tâches",
      role: "Développeur Frontend",
      progress: 65,
      lastActivity: "2023-07-20",
    },
    {
      id: 2,
      title: "Application mobile de recettes",
      role: "UI Designer",
      progress: 30,
      lastActivity: "2023-07-18",
    },
  ];
}

async function fetchPendingContributions() {
  // Simuler un appel API
  return [
    {
      id: 101,
      projectId: 1,
      projectTitle: "Plateforme de gestion de tâches",
      feature: "Intégration GitHub",
      status: "review",
      submittedDate: "2023-07-19",
    },
    {
      id: 102,
      projectId: 2,
      projectTitle: "Application mobile de recettes",
      feature: "Design des recettes",
      status: "modifications",
      submittedDate: "2023-07-15",
    },
  ];
}

function displayRecentProjects(projects) {
  const container = document.getElementById("recentProjects");

  container.innerHTML = projects
    .map(
      (project) => `
        <div class="project-item" data-project-id="${project.id}">
            <div class="project-info">
                <h4>${project.title}</h4>
                <span class="project-role">${project.role}</span>
            </div>
            <div class="project-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${project.progress}%"></div>
                </div>
                <span>${project.progress}%</span>
            </div>
            <div class="project-actions">
                <a href="project.html?id=${project.id}" class="btn btn-outline">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
    `
    )
    .join("");
}

function displayPendingContributions(contributions) {
  const container = document.getElementById("pendingContributions");

  container.innerHTML = contributions
    .map(
      (contribution) => `
        <div class="contribution-item" data-contribution-id="${
          contribution.id
        }">
            <div class="contribution-status ${contribution.status}">
                <i class="fas ${
                  contribution.status === "review" ? "fa-clock" : "fa-edit"
                }"></i>
            </div>
            <div class="contribution-info">
                <h4>${contribution.feature}</h4>
                <p>Projet: ${contribution.projectTitle}</p>
                <small>Soumis le ${new Date(
                  contribution.submittedDate
                ).toLocaleDateString()}</small>
            </div>
            <div class="contribution-actions">
                <a href="project.html?id=${
                  contribution.projectId
                }#contributions" class="btn btn-outline">
                    Voir
                </a>
            </div>
        </div>
    `
    )
    .join("");
}
