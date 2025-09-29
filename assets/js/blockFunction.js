// Ouvrir les pop-ups
document.querySelectorAll('[data-popup]').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    var popupId = this.getAttribute('data-popup');
    var popup = document.getElementById(popupId);
    if (popup) popup.style.display = 'block';
  });
});

// Fermer les pop-ups
document.querySelectorAll('.close-popup').forEach(function(btn) {
  btn.addEventListener('click', function() {
    this.closest('.popup').style.display = 'none';
  });
});

// Optionnel : fermer si on clique en dehors de la pop-up
document.addEventListener('click', function(e) {
  document.querySelectorAll('.popup').forEach(function(popup) {
    if (popup.style.display === 'block' && !popup.contains(e.target) && !e.target.hasAttribute('data-popup')) {
      popup.style.display = 'none';
    }
  });
});
