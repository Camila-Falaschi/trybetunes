import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import logoTrybeTunes from '../images/logo_TrybeTunes.png';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isButtonDisabled: true,
      loading: false,
    };
  }

  onChangeState = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => ((value.length <= 2)
      ? (this.setState({
        isButtonDisabled: true,
      }))
      : (this.setState({
        isButtonDisabled: false,
      }))));
  }

  // Para a função 'signInButton' foi recebido a orientação e auxilio da instrutora Samanta Below da Trybe
  signInButton = (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { userName } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: userName });
      history.push('/search');
    });
  }

  render() {
    const { userName, isButtonDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        {
          loading ? <Loading />
            : (
              <>
                <img src={ logoTrybeTunes } alt="Logo Trybe Tunes" />
                <form>
                  <input
                    type="text"
                    name="userName"
                    placeholder="Nome"
                    data-testid="login-name-input"
                    value={ userName }
                    onChange={ this.onChangeState }
                  />
                  <button
                    type="submit"
                    data-testid="login-submit-button"
                    disabled={ isButtonDisabled }
                    onClick={ this.signInButton }
                  >
                    Entrar
                  </button>
                </form>
              </>
            )
        }
      </div>
    );
  }
}

// Para o 'PropTypes' do 'history' foi consultado o Stack OverFlow (https://stackoverflow.com/questions/52109592/react-router-the-prop-history-is-undefined)
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
