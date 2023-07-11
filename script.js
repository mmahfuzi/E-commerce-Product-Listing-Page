document.addEventListener('DOMContentLoaded', function () {
  var lazyloadImages;


if ('IntersectionObserver' in window) {
  lazyloadImages = document.querySelectorAll('.lazy');
  var imageObserver = new IntersectionObserver(function(entries, observer) {

  entries.forEach(function(entry) {

  if (entry.isIntersecting) {
  var image = entry.target;
  image.src = 'https://api.escuelajs.co/api/v1/products';
  image.classList.remove('lazy');
  imageObserver.unobserve(image);
   }
   });
  })
}

  let products = document.querySelector('.products');
    async function fetchProducts(url) {
      try {
        let data = await fetch(url);
        let response = await data.json();
    
        for(let i = 0; i < response.length; i++) {
          let description = response[i].description;
          let title = response[i].title;
          products.innerHTML += `
            <div class="product">
              <img src="${response[i].images[1]}" alt="" class="product-img" loading="lazy" width="200" height="300">
              <div class="product-content">
                <h2 class="product-title">${title.length > 25 ? title.substring(0, 25).concat('...') : title}</h2>
                <h4 class="product-category">${response[i].category.name}</h4>
                <p class="product-description">${description.length > 65 ? description.substring(0, 65).concat('...more') : description}</p>
                <div class="product-price-container">
                  <h3 class="product-price">$${response[i].price}</h3>
                  <a href="#!" data-productId="${response[i].id}" class="add-to-cart"><i class="bi bi-cart-dash"></i>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-dash" viewBox="0 0 16 16">
                      <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"/>
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                  </a>
                  
                </div>
              </div>
            </div>
          `;
          }
        } 
      catch(err) {
        console.log(err);
      }
  }
  fetchProducts('https://api.escuelajs.co/api/v1/products');
});
