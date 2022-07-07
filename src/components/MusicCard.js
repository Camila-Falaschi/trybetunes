import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../css/Album.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  favoriteHandle = () => {

  }

  render() {
    const { loading } = this.state;
    const { songsList } = this.props;
    return (
      <section className="songsList">
        { loading ? <Loading />
          : (
            songsList.map((song) => (
              <div key={ song.trackId }>
                <p>{song.trackName}</p>
                <audio
                  data-testid="audio-component"
                  src={ song.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label
                  data-testid={ `checkbox-music-${song.trackId}` }
                  htmlFor={ song.trackId }
                >
                  Favorita
                  <input
                    type="checkbox"
                    name={ song.trackId }
                    id={ song.trackId }
                    onChange={ this.favoriteHandle }
                  />
                </label>
              </div>
            )))}
      </section>
    );
  }
}

// para 'propTypes' foi consultado o stack overflow (https://stackoverflow.com/questions/59038307/reactjs-proptypes-validation-for-array-of-objects) e a documentação no React (https://reactjs.org/docs/typechecking-with-proptypes.html)
MusicCard.propTypes = {
  songsList: PropTypes.arrayOf(
    PropTypes.any.isRequired,
  ).isRequired,
};

export default MusicCard;
