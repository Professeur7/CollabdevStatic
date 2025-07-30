document.addEventListener("DOMContentLoaded", function () {
  // Gestion des dropdowns
  const dropdownBtns = document.querySelectorAll(".btn-icon");
  dropdownBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const dropdown = this.nextElementSibling;
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        if (menu !== dropdown) menu.style.display = "none";
      });
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });
  });

  // Fermer les dropdowns quand on clique ailleurs
  document.addEventListener("click", function () {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.style.display = "none";
    });
  });

  // Gestion des modals
  const modalTriggers = {
    addTaskBtn: "taskModal",
    addMemberBtn: "memberModal",
    projectSettings: "settingsModal",
  };

  for (const [btnId, modalId] of Object.entries(modalTriggers)) {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener("click", () => {
        document.getElementById(modalId).style.display = "flex";
      });
    }
  }

  // Fermer les modals
  const closeModalBtns = document.querySelectorAll(".close-modal");
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      this.closest(".modal").style.display = "none";
    });
  });

  // Fermer modal en cliquant à l'extérieur
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.style.display = "none";
      }
    });
  });

  // Toggle tâche complète
  const taskCheckboxes = document.querySelectorAll(".task-checkbox input");
  taskCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const taskItem = this.closest(".task-item");
      if (this.checked) {
        taskItem.classList.add("completed");
      } else {
        taskItem.classList.remove("completed");
      }
    });
  });

  // Simulation de données (pour démo)
  function updateProjectProgress() {
    const progress = Math.min(Math.floor(Math.random() * 20) + 45, 100);
    document.querySelector(".progress-fill").style.width = `${progress}%`;
    document.querySelector(
      ".progress-header span:last-child"
    ).textContent = `${progress}%`;

    // Mettre à jour les stats aléatoirement
    document.querySelector(
      ".stat-value:nth-child(1)"
    ).textContent = `${Math.floor((progress / 100) * 58)}/58`;

    setTimeout(updateProjectProgress, 5000);
  }

  updateProjectProgress();
});
