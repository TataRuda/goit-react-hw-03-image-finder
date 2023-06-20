import axios from 'axios';

export const fetchData = (query, page) => {
  const API_KEY = '35540331-8f9965a5a422b1cb6ad9cd0a3';
  const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return axios
    .get(URL)
    .then(response => response.data)
    .catch((error) => {
      console.log('Error fetching images:', error);
    });
};

