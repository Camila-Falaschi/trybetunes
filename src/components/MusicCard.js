import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    const { favSongsArray, song } = this.props;
    this.state = {
      loading: false,
      isChecked: favSongsArray.some((id) => id === song.trackId),
    };
  }

  saveAsFavorite = () => {
    const { song } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      await addSong(song);
      this.setState({
        loading: false,
        isChecked: true,
      });
    });
  }

  render() {
    const { loading, isChecked } = this.state;
    const { song } = this.props;
    return (
      <div>
        { loading ? <Loading />
          : (
            <div>
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
                htmlFor="favorite"
              >
                Favorita
                <input
                  data-testid={ `checkbox-music-${song.trackId}` }
                  type="checkbox"
                  name="favorite"
                  id={ song.trackId }
                  checked={ isChecked }
                  onChange={ this.saveAsFavorite }
                />
              </label>
            </div>
          )}
      </div>
    );
  }
}

// para 'propTypes' foi consultado a documentação no React (https://reactjs.org/docs/typechecking-with-proptypes.html)
MusicCard.propTypes = {
  favSongsArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  song: PropTypes.shape(
    PropTypes.any.isRequired,
  ).isRequired,
};

export default MusicCard;
