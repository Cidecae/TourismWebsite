document.addEventListener('DOMContentLoaded', function() {
  // DARK/LIGHT MODE TOGGLE
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  themeToggleBtn.addEventListener("change", function() {
    document.body.classList.toggle("dark-mode");
  });

  // RATING STARS FUNCTIONALITY (Scoped per destination)
  const ratingDivs = document.querySelectorAll('.rating');
  ratingDivs.forEach(function(ratingDiv) {
    const stars = ratingDiv.querySelectorAll('.star');
    stars.forEach(function(star) {
      star.addEventListener('click', function() {
        const ratingValue = this.getAttribute('data-value');
        stars.forEach(function(s) {
          if (s.getAttribute('data-value') <= ratingValue) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
        ratingDiv.setAttribute('data-rating', ratingValue);
      });
    });
  });

  // REVIEW FORM SUBMISSION FUNCTIONALITY
  const reviewForms = document.querySelectorAll('.review-form');
  reviewForms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const comment = this.querySelector('textarea').value.trim();
      const ratingContainer = this.parentElement.querySelector('.rating');
      const rating = ratingContainer ? ratingContainer.getAttribute('data-rating') : 0;
      
      if (comment === '') {
        alert('Please enter your review.');
        return;
      }
      
      // Get destination title from the card
      const h3El = this.parentElement.querySelector('h3');
      const destinationTitle = h3El ? h3El.innerText : "Unknown";
      
      // Create review object
      const review = {
        destination: destinationTitle,
        text: comment,
        stars: rating
      };
      
      // Save review in localStorage
      let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
      reviews.push(review);
      localStorage.setItem("reviews", JSON.stringify(reviews));
      alert('Thank you for your review!');
      
      // Clear the form and reset stars
      this.querySelector('textarea').value = '';
      const stars = this.parentElement.querySelectorAll('.star');
      stars.forEach(function(star) {
        star.classList.remove('active');
      });
      if (ratingContainer) {
        ratingContainer.setAttribute('data-rating', 0);
      }
      
      // Reload the "All Reviews" section
      loadReviews();
    });
  });

  // Function to load and display reviews in the "All Reviews" section
  function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const reviewsList = document.getElementById("reviews-list");
    reviewsList.innerHTML = "";
    
    reviews.forEach(function(review) {
      const reviewDiv = document.createElement("div");
      reviewDiv.classList.add("review-item");
      reviewDiv.innerHTML = `<p><strong>${review.destination}</strong>: ${review.text}</p>
                             <strong>⭐ ${review.stars} Stars</strong>`;
      reviewsList.appendChild(reviewDiv);
    });
  }

  // Initial load of reviews when the page loads
  loadReviews();
});
