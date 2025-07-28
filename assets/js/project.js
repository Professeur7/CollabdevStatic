// Dans project.js
export async function submitContribution(projectId, data) {
  const response = await fetch("/api/contributions", {
    method: "POST",
    body: JSON.stringify({ projectId, ...data }),
  });

  if (response.ok) {
    // Mettre à jour l'UI locale
    updateProjectUI();
    // Notifier le dashboard
    document.dispatchEvent(new CustomEvent("contributionSubmitted"));
  }
}
