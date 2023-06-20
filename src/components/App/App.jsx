import React from "react";
import axios from 'axios';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Modal } from '../Modal/Modal';
import { Loader } from '../Loader/Loader';
import { Button } from "components/Button/Button";
import css from './App.module.css';


export class App extends React.Component {
  state = {
    query: '',
    searchResults: [],
    page: 1,
    showModal: false,
    largeImageURL: null,
    isLoading: false, 
  };

  // componentDidUpdate( prevProps, prevState) {
  //  const { query, page } = this.state; 
  // if query or page are changed then load images with new search options.
  //  if (prevState.query !== query || (prevState.page !== page && page !== 1)) {
  //    this.fetchImages(query);
  // }
  // }

  handleSearchSubmit =  (query)  => {
    if (query === this.state.query) return;
    this.setState({searchResults:[], query, isLoading: true }, () => {
      this.fetchImages(query);
    });
  };

  handleInputChange = (e) => {
    this.setState({ query: e.target.value });
  };

  fetchImages = () => {
    const { query, page } = this.state;
    const API_KEY = '35540331-8f9965a5a422b1cb6ad9cd0a3';
    const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

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
      }),
      () => {
        this.setState({ isLoading: false }); // add false after after receiving data
      });  
    })
    .catch((error) => {
      console.log('Error fetching images:', error);
      this.setState({ isLoading: false });
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
    const { query, searchResults, showModal, largeImageURL, isLoading } = this.state;
    const showLoadMoreButton = searchResults.length >= 12 && !isLoading; 
    
    return (
    <div className={css.containerApp}>
      <Searchbar onSubmit={this.handleSearchSubmit} value={query} onChange={this.handleInputChange}/>
      {isLoading ? (<Loader/>) :
      (<ImageGallery searchResults={searchResults} onClick={this.toggleModal}/>)}
      {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={largeImageURL}/>
        )}
      {showLoadMoreButton && 
        (<Button onClick={this.loadMoreImages}/>)}
         
    </div>
  );
}
};
