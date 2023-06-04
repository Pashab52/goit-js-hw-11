import { fetchImg } from './JS/img-api';

import Notiflix from 'notiflix';

const formRef = document.getElementById('search-form');

const galleryRef = document.querySelector('.gallery');

// const loadMoreBtnRef = document.querySelector('.load-more');

const guardRef = document.querySelector('.guard');

Notiflix.Notify.init({
  width: '320px',
  position: 'center-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  timeout: 7000,
});


let page = 1;

let searchValue = '';

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                getImg();
            }
        });
    },{rootMargin: '500px'});


formRef.addEventListener('submit', handleSubmitFormImgSearch);


function handleSubmitFormImgSearch(event) {
    event.preventDefault();
    const inputValue = event.target.elements.searchQuery.value;
     if (!inputValue.trim() || inputValue === searchValue) {
       return;
     }
    galleryRef.innerHTML = '';
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
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b> ${likes}
            </p>
            <p class="info-item">
              <b>Views</b> ${views}
            </p>
            <p class="info-item">
              <b>Comments</b> ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b> ${downloads}
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
    }

  if (page === 1) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }
    
    if (Math.ceil(data.totalHits / 40) <= page) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        loadMoreBtnRef.disabled = true;
    }

    renderMarkup(data)
    page += 1;

    observer.observe(guardRef);
 }






