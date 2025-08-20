
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('#menu-bar');
  const navbar = document.querySelector('.navbar');
  if (menu && navbar) {
    menu.addEventListener('click', () => {
      menu.classList.toggle('fa-times');
      navbar.classList.toggle('active');
    });
  }

  document.querySelectorAll('.icon-overlay .fa-heart').forEach(heart => {
    heart.addEventListener('click', (e) => {
      const el = e.currentTarget;
      el.classList.toggle('liked');
      el.classList.toggle('fa-regular');
      el.classList.toggle('fa-solid');
    });
  });

  (function(){
    const storageKey = 'gs_reviews';
    const savedRatings = JSON.parse(localStorage.getItem(storageKey) || '{}');
    document.querySelectorAll('.review-card').forEach(card => {
      const id = card.dataset.id;
      if(!id) return; 
      const starIcons = Array.from(card.querySelectorAll('.fa-star'));
      const initial = parseInt(savedRatings[id] || card.dataset.rating || 0, 10);
      function render(rate){
        card.dataset.rating = rate;
        starIcons.forEach((s,i)=> s.classList.toggle('filled', i < rate));
      }
      render(initial);

      starIcons.forEach((star, idx)=>{
        star.addEventListener('click', ()=>{
          const rating = idx + 1;
          render(rating);
          const all = JSON.parse(localStorage.getItem(storageKey) || '{}');
          all[id] = rating;
          localStorage.setItem(storageKey, JSON.stringify(all));
        });
        star.addEventListener('mouseover', ()=> starIcons.forEach((s,i)=> s.classList.toggle('filled', i <= idx)));
        star.addEventListener('mouseout', ()=> render(parseInt(card.dataset.rating || 0, 10)));
      });
    });
  })();

});
