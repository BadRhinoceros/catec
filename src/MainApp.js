import React, { Component } from 'react'; // подключение react
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Header } from './components/Header.js'
import { Home } from './Home.js'
import { Statement } from './Statement.js'
import { Footer } from './components/Footer.js'

import $ from 'jquery';

class MainApp extends Component {
  state = {
    login: '',
    password: '',
    profileName: '',
    authorized: '',
    userExists: '',
    code: '',
  }

  componentDidMount = () => { // проверка сессии пользователя
    $.ajax({
      url: '/checkSession',
      type: 'GET',
      success: (res) => {
        const { authorized,profileName } = res;
        if (authorized) {
          this.setState({ authorized: authorized, profileName: profileName });
        } else {
          this.setState({ authorized: authorized });
        }
      }
    })
  }

  onInputChange = (e) => { // при изменении полей ввода изменять общий state
    const { id,value } = e.currentTarget;
    this.setState({ [id]: value });
  }

  onАuthorizationBtnClick = (e) => { // При нажатии на кнопку авторизации отправлюя логин и пароль на сервер
    e.preventDefault();
    const { login,password,code } = this.state;
    if (login && password) {
      if (!code) { // проверка ввода кода
        $.ajax({
          url: '/authorization',
          type: 'POST',
          data: {
            login: login,
            password: password,
          },
          success: (res) => {
            const { userExists } = res;
            if ( userExists ) {
              this.setState({ userExists: userExists });
            } else {
              this.setState({ authorized: false });
              alert('Такая учетная запись не зарегестрирована')
            }
          }
        });
      } else { // если код введен, отправляется запрос на сервер для проверки кода
        $.ajax({
          url: '/checkCodeWithData',
          type: 'POST',
          data: {
            login: login,
            password: password,
            code: code,
          },
          success: (res) => {
            const { authorized,profileName } = res;
            if (authorized) {
              this.setState({ authorized: authorized, profileName: profileName, login: '', password: '' })
            } else {
              alert('Неверный код');
            }
          }
        })
      }
    } else {
      alert('Нужно ввести данные');
    }
  }

  onRegistrationBtnClick = (e) => { // регистрация пользователя
    e.preventDefault();
    const { login,password } = this.state;
    if (login && password) {
      $.ajax({
        url: '/registration',
        type: 'POST',
        data: {
          login: login,
          password: password,
        },
        success: (res) => {
          if (res.registrationSuccess) {
            this.setState({ login: '', password: '' })
            alert('Регистрация прошла успешно');
          } else {
            alert('Что-то пошло не так');
          }
        }
      });
    } else {
      alert('Нужно ввести данные');
    }
  }

  onLogoutBtnClick = (e) => { // Выход из аккаунта
    e.preventDefault();
    $.ajax({
      url: '/logout',
      type: 'GET',
      success: (res) => {
        const { authorized,profileName } = res;
        this.setState({ authorized: authorized, profileName: profileName, code: '', userExists: '' });
        this.props.history.push("/")
      }
    });
  }

  onLogoutBtnClick = (e) => { // Выход из аккаунта
    e.preventDefault();
    $.ajax({
      url: '/logout',
      type: 'GET',
      success: (res) => {
        const { authorized,profileName } = res;
        this.setState({ authorized: authorized, profileName: profileName, code: '', userExists: '' });
      }
    });
  }

  render() {
    const { login,password,code,userExists,authorized,profileName } = this.state

    let userBlock;

    if (authorized) {
      userBlock = <div className="form-block">
                    <p>Добро пожаловать, { profileName }</p>
                    <div className="buttons-block">
                      <button onClick={this.onLogoutBtnClick}>Выход</button>
                    </div>
                  </div>
    } else {
      userBlock = <div className="form-block">
                    <form>
                      <input onChange={this.onInputChange}  id="login" placeholder="Логин" value={login}/>
                      <input onChange={this.onInputChange}  id="password" type="password" placeholder="Пароль" value={password}/>
                      {
                        userExists && <input id="code" onChange={this.onInputChange} placeholder="Введите код" value={code}/>
                      }
                      <div className="buttons-block">
                        <button onClick={this.onАuthorizationBtnClick}>Вход</button>
                        <button onClick={this.onRegistrationBtnClick}>Регистрация</button>
                      </div>
                    </form>
                  </div>
    }

    return(
      <Router>
        <div>
          <Header authorized={authorized}/>
          { userBlock }
          <Route exact path="/" component={() => <Home authorized={authorized} /> } />
          <Route exact path="/statement" component={() => <Statement authorized={authorized} /> } />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default MainApp;
