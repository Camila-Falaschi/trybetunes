import React from 'react';
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
        <div className="headerLogo">
          <img src={ logoTrybeTunes } alt="Logo Trybe Tunes" />
        </div>
        <div className="userArea">
          { loading ? <Loading />
            : (<h3 data-testid="header-user-name">{userName}</h3>)}
        </div>
      </header>
    );
  }
}

export default Header;
