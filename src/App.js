import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <main>
        <p>TrybeTunes!</p>

        <Switch>
          <Route path="/" component={ Login } exact />
          <Route path="/search" component={ Search } exact />
          <Route path="/album/:id" component={ Album } exact />
          <Route path="/favorites" component={ Favorites } exact />
          <Route path="/profile" component={ Profile } exact />
          <Route path="/profile/edit" component={ ProfileEdit } exact />
          <Route path="*" component={ NotFound } exact />
        </Switch>
      </main>
    );
  }
}

export default App;
