import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumImage: '',
      albumName: '',
      singerName: '',
      songsList: [],
    };
  }

  // para '.slice(1)' foi consultado a documentação no MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  async componentDidMount() {
    const musics = await this.albumMusics();
    const albumInfo = musics[0];
    this.setState({
      albumImage: albumInfo.artworkUrl100,
      albumName: albumInfo.collectionName,
      singerName: albumInfo.artistName,
      songsList: musics.slice(1),
    });
  }

  albumMusics = async () => {
    const { match } = this.props;
    const musicsArray = await getMusics(match.params.id);
    return musicsArray;
  }

  render() {
    const { albumImage, albumName, singerName, songsList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <section className="albumInfo">
            <img src={ albumImage } alt={ albumName } />
            <h3 data-testid="album-name">{albumName}</h3>
            <p data-testid="artist-name">{singerName}</p>
          </section>
          <section>
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
          </section>
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
