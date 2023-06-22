import React from "react";
import { fetchData } from 'api.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Modal } from '../Modal/Modal';
import { Loader } from '../Loader/Loader';
import { Button } from 'components/Button/Button';
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
  
  componentDidUpdate( prevProps, prevState) {
    const { query, page } = this.state;
    // if query or page are changed then load images with new search options.
    if (prevState.query !== this.state.query || (prevState.page !== page && page !== 1)) {
      this.fetchImages(query, page)
    };
  }; 

  fetchImages = () => {
      const { query, page } = this.state;
      this.setState({ isLoading: true });
      fetchData (query, page)
        .then(({hits}) => {
          if (hits.length === 0) {
            toast.warn('Oops! No results for your query',  {
              position: toast.POSITION.TOP_LEFT
            });
          };
          const data = hits.map(({ id, webformatURL, largeImageURL }) => {
            return {
              id,
              webformatURL,
              largeImageURL,
              };
          });
          this.setState(({searchResults}) => ({
            searchResults: [...searchResults,...data],
          }));
        })
        .catch((error) => {
          console.log('Error fetching images:', error);
          toast.error('Error fetching images', {
            position: toast.POSITION.TOP_RIGHT
          });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    };
  
  handleSearchSubmit =  (query)  => {
    if (query === this.state.query) return;
    this.setState({searchResults:[], query, isLoading: true });
  };

  handleInputChange = (e) => {
    this.setState({ query: e.target.value });
  };   
   
  loadMoreImages = (e) => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
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
      {searchResults.length !== 0 && <ImageGallery searchResults={searchResults} onClick={this.toggleModal}/>}
      {isLoading === true && <Loader/>}

      {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={largeImageURL}/>
        )}
      {showLoadMoreButton && 
        (<Button onClick={this.loadMoreImages}/>)}
      <ToastContainer /> 
         
    </div>
  );
}
};
