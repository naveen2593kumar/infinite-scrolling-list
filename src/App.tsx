import { useState } from 'react';
import { Switch } from 'react-router-dom';

import ProtectedRoute from './components/commons/ProtectedRoute';
import Header from './components/header/Header';
import UserProvider from './contexts/user.context';
import { IUser } from './model/user.interface';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import './App.css';

function App() {
  const [user, setUser] = useState<IUser>();
  const isAuthenticated = !!user && user.isAuthenticated;

  return (
    <div className="App">
      <UserProvider value={{ user, setUser }}>
        <Header />
        <Switch>
          <ProtectedRoute exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/home" component={HomePage} />
          <ProtectedRoute path="/" component={isAuthenticated ? HomePage : LoginPage} />
        </Switch>
      </UserProvider>
    </div>
  );
}

export default App;
