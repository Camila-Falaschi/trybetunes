import React from 'react';
import { NavLink } from 'react-router-dom';
import logoTrybeTunes from '../images/logoClaro-TrybeTunes.png';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../css/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.userName();
  }

  userName = () => {
    this.setState({
      loading: true,
    }, async () => {
      const test = await getUser();
      const { name } = test;
      this.setState({
        userName: name,
        loading: false,
      });
    });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component" className="header">
        <div className="headerTop">
          <div className="headerLogo">
            <img src={ logoTrybeTunes } alt="Logo Trybe Tunes" />
          </div>
          <div className="userArea">
            { loading ? <Loading />
              : (<h3 data-testid="header-user-name">{userName}</h3>)}
          </div>
        </div>
        <nav className="navArea">
          <NavLink
            className="link"
            activeClassName="selected"
            to="/search"
            data-testid="link-to-search"
          >
            Pesquisa
          </NavLink>
          <NavLink
            className="link"
            activeClassName="selected"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favoritas
          </NavLink>
          <NavLink
            className="link"
            activeClassName="selected"
            to="/profile"
            data-testid="link-to-profile"
          >
            Perfil
          </NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
