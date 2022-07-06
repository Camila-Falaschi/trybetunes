import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchSinger: '',
      isButtonDisabled: true,
    };
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
    const { searchSinger, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <section>
          <form>
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
        </section>
      </div>
    );
  }
}

export default Search;
