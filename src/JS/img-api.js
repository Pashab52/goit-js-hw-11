
import axios from 'axios';

import Notiflix from 'notiflix';
// import { searchValue } from '../index';

const API_KEY = '37020257-50f9bd55f20927cb154e79678';

axios.defaults.baseURL = 'https://pixabay.com/api/';  

async function fetchImg(searchValue, page) {
  try {
    const { data } = await axios.get('?', {
      params: {
        key: API_KEY,
        q: searchValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
        page: page,
      },
    });
      
//       console.log(searchValue);
// console.log(page);
    return data;
  } catch (error) {
     Notiflix.Notify.failure(
       `Oops! Something went wrong! Try reloading the page!`
     );
  }
}
export { fetchImg };