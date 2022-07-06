import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../css/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchSinger: '',
      foundSinger: '',
      isButtonDisabled: true,
      loading: false,
      albumArray: [],
    };
  }

  searchButton = (event) => {
    event.preventDefault();
    const { searchSinger } = this.state;
    this.setState({
      loading: true,
      foundSinger: searchSinger,
      searchSinger: '',
    }, async () => {
      const albums = await searchAlbumsAPI(searchSinger);
      this.setState({
        albumArray: albums,
      }, this.setState({
        loading: false,
      }));
    });
  }

  onChangeState = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => ((value.length < 2)
      ? (this.setState({
        isButtonDisabled: true,
      }))
      : (this.setState({
        isButtonDisabled: false,
      }))));
  };

  render() {
    const {
      searchSinger,
      isButtonDisabled,
      loading,
      albumArray,
      foundSinger } = this.state;
    return (
      <div data-testid="page-search" className="pageSearch">
        <Header />
        <section className="searchArea">
          <section>
            {
              loading ? <Loading />
                : (
                  <form className="searchForm">
                    <input
                      type="text"
                      name="searchSinger"
                      placeholder="Nome do Artista"
                      data-testid="search-artist-input"
                      value={ searchSinger }
                      onChange={ this.onChangeState }
                    />
                    <button
                      type="submit"
                      data-testid="search-artist-button"
                      disabled={ isButtonDisabled }
                      onClick={ this.searchButton }
                    >
                      Pesquisar
                    </button>
                  </form>
                )
            }
          </section>
          <section>
            {
              (albumArray.length === 0)
                ? <h1>Nenhum álbum foi encontrado</h1>
                : (
                  <>
                    <div>
                      <h3>
                        Resultado de álbuns de:
                        {' '}
                        {foundSinger}
                      </h3>
                    </div>
                    <div className="albumsArea">
                      {albumArray.map((album) => {
                        const link = `/album/${album.collectionId}`;
                        return (
                          <div
                            className="album"
                            key={ album.collectionId }
                          >
                            <Link
                              to={ link }
                              data-testid={ `link-to-album-${album.collectionId}` }
                            >
                              <img
                                src={ album.artworkUrl100 }
                                alt={ album.collectionName }
                              />
                              <h3>{album.collectionName}</h3>
                              <p>{album.artistName}</p>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )
            }
          </section>
        </section>
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Search;
