// Ouvrir les pop-ups sur clic des images
document.querySelectorAll('.work-item a.image').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    var popupId = this.dataset.popup; 
    if (!popupId) return;

    var popup = document.getElementById(popupId);
    if (popup) popup.style.display = 'block';
  });
});

// Fermer pop-ups
document.querySelectorAll('.close-popup').forEach(function(btn) {
  btn.addEventListener('click', function() {
    this.closest('.popup').style.display = 'none';
  });
});

// Optionnel : fermer si clic en dehors
document.addEventListener('click', function(e) {
  document.querySelectorAll('.popup').forEach(function(popup) {
    if (popup.style.display === 'block' && !popup.contains(e.target) && !e.target.closest('.work-item a.image')) {
      popup.style.display = 'none';
    }
  });
});
