

import { fetchImg } from './JS/img-api';

const formRef = document.getElementById('search-form');

const galleryRef = document.querySelector('.gallery');

const loadMoreBtn = document.querySelector('.load-more');

let page = 1;

let searchValue = '';

formRef.addEventListener('submit', handleFormImgSearch);

// let response = "";

function handleFormImgSearch(event) {
    event.preventDefault();
    searchValue = event.target.elements.searchQuery.value;
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

function getImg() {
    //   if (!inputValue.trim() || inputValue === queryToFetch) {
    //     return;
    //   }
    fetchImg(searchValue, page).then(renderMarkup);
    page += 1;
 }



loadMoreBtn.addEventListener('click', handleLoadMoreBtn);

function handleLoadMoreBtn() {
    
     getImg();
     
}




