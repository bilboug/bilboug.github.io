// Gestion de la langue pour tout le portfolio
// Ce fichier doit être inclus sur toutes les pages

// Récupérer la langue depuis localStorage ou utiliser français par défaut
let currentLang = localStorage.getItem('preferredLang') || 'fr';

// Fonction pour changer la langue
function toggleLanguage() {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  // Sauvegarder la préférence dans localStorage
  localStorage.setItem('preferredLang', currentLang);
  updateContent();
  
  // Mettre à jour le bouton avec les drapeaux
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.textContent = currentLang === 'fr' ? '🇬🇧' : '🇫🇷';
  }
  
  // Mettre à jour l'attribut lang du document
  document.documentElement.lang = currentLang;
}

// Fonction pour mettre à jour le contenu
function updateContent() {
  // Vérifier que translations existe (défini dans chaque page)
  if (typeof translations === 'undefined') {
    console.error('Les traductions ne sont pas définies sur cette page');
    return;
  }
  
  const lang = translations[currentLang];
  
  // Mettre à jour tous les éléments avec data-lang
  document.querySelectorAll('[data-lang]').forEach(element => {
    const key = element.getAttribute('data-lang');
    if (lang[key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.value = lang[key];
      } else {
        element.textContent = lang[key];
      }
      
      // Mettre à jour data-text pour le glitch effect
      if (element.hasAttribute('data-text')) {
        element.setAttribute('data-text', lang[key]);
      }
    }
  });
  
  // Mettre à jour la navigation
  document.querySelectorAll('[data-lang-nav]').forEach(element => {
    const key = 'nav-' + element.getAttribute('data-lang-nav');
    if (lang[key]) {
      element.textContent = lang[key];
    }
  });
  
  // Mettre à jour le lien du CV s'il existe
  const cvButton = document.getElementById('cvButton');
  if (cvButton && lang['cv-path']) {
    cvButton.href = lang['cv-path'];
  }
}

// Initialiser la page avec la langue sauvegardée
function initLanguage() {
  // Mettre à jour le bouton avec le bon drapeau
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.textContent = currentLang === 'fr' ? '🇬🇧' : '🇫🇷';
    
    // Event listener pour le bouton de langue
    langToggle.addEventListener('click', toggleLanguage);
  }
  
  // Mettre à jour l'attribut lang du document
  document.documentElement.lang = currentLang;
  
  // Appliquer les traductions si on est en anglais
  if (currentLang === 'en') {
    updateContent();
  }
}

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', initLanguage);
