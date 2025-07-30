document.addEventListener("DOMContentLoaded", function () {
  // 1. Forcer le rôle gestionnaire
  const isManager = true; // true = gestionnaire, false = contributeur

  // 2. Activer les fonctionnalités gestionnaire
  if (isManager) {
    // Afficher tous les éléments réservés aux gestionnaires
    document.querySelectorAll("[data-manager-only]").forEach((el) => {
      el.style.display = "block";
    });

    // Activer le bouton des paramètres
    const settingsBtn = document.getElementById("settingsBtn");
    if (settingsBtn) settingsBtn.style.display = "inline-block";
  }

  // 3. Gestion des onglets (commun aux deux rôles)
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Retirer active de tous
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Activer l'onglet cliqué
      button.classList.add("active");
      const tabId = button.getAttribute("data-tab");
      document.getElementById(`${tabId}-tab`).classList.add("active");
    });
  });

  // 4. Modal des paramètres (uniquement gestionnaire)
  const settingsModal = document.getElementById("settingsModal");
  if (isManager && settingsModal) {
    const openModal = () => (settingsModal.style.display = "block");
    const closeModal = () => (settingsModal.style.display = "none");

    document
      .getElementById("settingsBtn")
      ?.addEventListener("click", openModal);
    document
      .querySelector(".modal-close")
      ?.addEventListener("click", closeModal);

    // Fermer en cliquant à l'extérieur
    window.addEventListener("click", (e) => {
      if (e.target === settingsModal) closeModal();
    });
  }
});
