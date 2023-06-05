import { fetchImg } from './JS/img-api';

import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import debounce from 'lodash.debounce';

const formRef = document.getElementById('search-form');

const galleryRef = document.querySelector('.gallery');

const guardRef = document.querySelector('.guard');

const secondGuardRef = document.querySelector('.secondGuard');


// const loadMoreBtnRef = document.querySelector('.load-more');


Notiflix.Notify.init({
  width: '320px',
  position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  timeout: 5000,
});



let gallery = new SimpleLightbox('.gallery a', {
  animationSpeed: 150,
  fadeSpeed: 150,
  animationSlide: false,
  showCounter: false,
  captionDelay: 250,
  captionsData: 'alt',
});


let page = 1;

let searchValue = '';

secondGuardRef.style.display = "none";

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                getImg();
            }
        });
  }, { rootMargin: '500px' });
    

  const secondObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      });
    },
    { rootMargin: '500px' }
  );


formRef.addEventListener('submit', handleSubmitFormImgSearch);


function handleSubmitFormImgSearch(event) {
    event.preventDefault();
    const inputValue = event.target.elements.searchQuery.value;
     if (!inputValue.trim() || inputValue === searchValue) {
       return;
  }
    secondGuardRef.style.display = 'none';
    galleryRef.innerHTML = '';
    // clearTimeout(timeoutId);
    observer.unobserve(guardRef);
    page = 1;
    searchValue = inputValue;
    getImg();

}


function renderMarkup(data) {
    console.log(data);
    const markup = data.hits
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `<div class="photo-card">
      <a class="gallery__link" href="${largeImageURL}"><img class="gallery__image" src="${webformatURL}" alt="${tags}" width="360px" height: "200px" loading="lazy" /></a>
   
          <div class="info">
            <p class="info-item">
              <b>Likes</b> <span class="data-wrapper">${likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b> <span class="data-wrapper">${views}</span>
            </p>
            <p class="info-item">
              <b>Comments</b> <span class="data-wrapper">${comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b> <span class="data-wrapper">${downloads}</span>
            </p>
          </div>
        </div>`;
        }
      )
      .join('');
galleryRef.insertAdjacentHTML('beforeend', markup)
}



async function getImg() {
  
 
  const data = await fetchImg(searchValue, page);
  

  
    if (data.totalHits === 0) {
        Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
      return;
  };
  
  
    renderMarkup(data);
  
    gallery.refresh();
  
  if (page === 1) {
      // secondGuardRef.style.display = 'none';
      //   observer.unobserve(secondGuardRef);
      //   observer.unobserve(guardRef);
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }
  
    
  if (Math.ceil(data.totalHits / 40) === page) {
      console.log(Math.ceil(data.totalHits / 40));
      observer.unobserve(guardRef);
      // secondGuardRef.style.display = 'block';
      // secondObserver.observe(secondGuardRef);
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    };
  observer.observe(guardRef);
  
  page += 1;

 }

// let gallery = new SimpleLightbox('.gallery a');




