// Gestion de l'état d'authentification
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

export function getCurrentUser() {
    return currentUser;
}

export function setCurrentUser(user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateUI();
}

function updateUI() {
    // Mise à jour commune à toutes les pages
    const authButtons = document.querySelector('.auth-buttons');
    if (currentUser) {
        authButtons.innerHTML = `
            <span>Bonjour, ${currentUser.username}</span>
            <button class="btn btn-outline" id="logoutBtn">Déconnexion</button>
        `;
    } else {
        authButtons.innerHTML = `
            <button class="btn btn-outline" id="loginBtn">Connexion</button>
            <button class="btn btn-primary" id="registerBtn">Inscription</button>
        `;
    }
}