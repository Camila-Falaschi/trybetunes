import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import '../css/Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumId: '',
      albumImage: '',
      albumName: '',
      singerName: '',
      songsList: [],
      favSongsArray: [],
      loading: false,
    };
  }

  // para '.slice(1)' foi consultado a documentação no MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  async componentDidMount() {
    this.handleFavoriteSongs();
    const musics = await this.albumMusics();
    const albumInfo = musics[0];
    this.setState({
      albumId: albumInfo.collectionId,
      albumImage: albumInfo.artworkUrl100,
      albumName: albumInfo.collectionName,
      singerName: albumInfo.artistName,
      songsList: musics.slice(1),
    });
  }

  handleFavoriteSongs = () => {
    this.setState({
      loading: true,
    }, async () => {
      const favoriteSongsList = await getFavoriteSongs();
      const { albumId } = this.state;
      const favThisAlbum = favoriteSongsList
        .filter((song) => song.collectionId === albumId);
      if (favThisAlbum.length > 0) {
        this.setState({
          favSongsArray: favThisAlbum.map((favSongs) => favSongs.trackId),
          loading: false,
        });
      }
      this.setState({
        loading: false,
      });
    });
  }

  albumMusics = async () => {
    const { match } = this.props;
    const musicsArray = await getMusics(match.params.id);
    return musicsArray;
  }

  render() {
    const { albumImage,
      albumName,
      singerName,
      songsList,
      loading,
      favSongsArray } = this.state;
    return (
      <div data-testid="page-album" className="pageAlbum">
        <Header />
        { loading ? <Loading />
          : (
            <section className="albumArea">
              <section className="albumInfo">
                <img src={ albumImage } alt={ albumName } />
                <h3 data-testid="album-name">{albumName}</h3>
                <p data-testid="artist-name">{singerName}</p>
              </section>
              <section className="songsList">
                {songsList.map((song) => (<MusicCard
                  favSongsArray={ favSongsArray }
                  song={ song }
                  key={ song.trackId }
                />))}
              </section>
            </section>
          )}
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
