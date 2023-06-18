import React from "react";
import axios from 'axios';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Modal } from '../Modal/Modal';
import css from './App.module.css';


export class App extends React.Component {
  state = {
    query: '',
    searchResults: [],
    page: 1,
    showModal: false,
    largeImageURL: null,
  };

  handleSearchSubmit =  (query)  => {
    if (query === this.state.query) return;
    this.setState({searchResults:[], page: 1, query}, () => {
      this.fetchImages(query);
    });
    console.log('Submitted search term:', query);
  };

  handleInputChange = (e) => {
    this.setState({ query: e.target.value });
  };

  fetchImages = (query) => {
    const API_KEY = '35540331-8f9965a5a422b1cb6ad9cd0a3';
    const URL = `https://pixabay.com/api/?q=${query}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    axios
    .get(URL)
    .then((response) => {
      const {hits} = response.data;
      const searchResults = hits.map( (hit) => ({
        id: hit.id,
        webformatURL: hit.webformatURL,
        largeImageURL: hit.largeImageURL,
      }));
      this.setState((prevState) => ({
      searchResults: [...prevState.searchResults, ...searchResults],
      }));  
    })
    .catch((error) => {
      console.log('Error fetching images:', error);
    });
  };

  loadMoreImages = () => {
    this.setState(
      (prevState) => ({page: prevState.page + 1}),
      () => {
        this.fetchImages(this.state.query);
      }
    );
  };

  toggleModal = (largeImageURL) => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
      largeImageURL: largeImageURL,
    }));
  };


  

  render () {
    const { query, searchResults, showModal, largeImageURL } = this.state;
    return (
    <div className={css.containerApp}>
      <Searchbar onSubmit={this.handleSearchSubmit} value={query} onChange={this.handleInputChange}/>
      <ImageGallery searchResults={searchResults} onClick={this.toggleModal}/>
      {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={largeImageURL}/>
        )}
       <button onClick={this.loadMoreImages}>
          Load More
        </button>
      
    </div>
  );
}
};
