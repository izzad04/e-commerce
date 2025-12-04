document.addEventListener('DOMContentLoaded', () => {

  // ===================================
  // 1. IMAGE UPLOAD PREVIEW
  // ===================================
  const imageInput = document.getElementById('profileImageInput');
  const imagePreview = document.getElementById('profileImagePreview');
  const navAvatar = document.querySelector('.nav-avatar-img');
  const sidebarAvatar = document.querySelector('.sidebar-avatar-img');

  if (imageInput) {
    imageInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      
      if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          // Update the large profile picture
          imagePreview.src = e.target.result;
          
          // Optionally update the navbar and sidebar avatars immediately
          if (navAvatar) navAvatar.src = e.target.result;
          if (sidebarAvatar) sidebarAvatar.src = e.target.result;

          // In a real app, you would send this 'file' to your server here
          // console.log("File ready to upload:", file.name);
        }
        
        reader.readAsDataURL(file);
      }
    });
  }

  // ===================================
  // 2. DARK MODE LOGIC (Standard)
  // ===================================
  const darkModeBtn = document.getElementById('toggleDarkModeBtn');
  const darkModeIcon = document.getElementById('darkModeIcon');
  const body = document.body;

  // Check saved theme
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if(darkModeIcon) {
      darkModeIcon.classList.remove('bi-moon');
      darkModeIcon.classList.add('bi-sun');
    }
  }

  // Toggle theme
  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        if(darkModeIcon) {
          darkModeIcon.classList.remove('bi-moon');
          darkModeIcon.classList.add('bi-sun');
        }
      } else {
        localStorage.setItem('theme', 'light');
        if(darkModeIcon) {
          darkModeIcon.classList.remove('bi-sun');
          darkModeIcon.classList.add('bi-moon');
        }
      }
    });
  }

});