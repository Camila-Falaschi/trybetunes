import React from 'react';
import PropTypes from 'prop-types';
import '../css/Album.css';

class MusicCard extends React.Component {
  render() {
    const { songsList } = this.props;
    return (
      <>
        { songsList.map((song) => (
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
          </div>
        ))}
      </>
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
