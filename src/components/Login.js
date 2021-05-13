import Header from './Header'
import React from 'react';
import { withRouter } from 'react-router-dom';
import * as auth from '../auth';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value 
    });
  }

  handleSubmit(e){
        e.preventDefault()
    if (!this.state.email || !this.state.password){
      return;
    }
    auth.authorize(this.state.password, this.state.email)
    .then((data) => {
      if (data.token){
        const mail = this.state.email
        this.props.mail(mail)
        this.setState({password: '', email: ''} ,() => {
            this.props.handleLogin(e);
            this.props.history.push('/');
        })
      }  
    })
    .catch(err => console.log(err)); // запускается, если пользователь не найден
  }

render() {
  return(
    <section className="login">
      <Header to='/sign-up' text='Регистрация' />
      <div className="login__container">
        <h2 className="login__title">Вход</h2>
        <form className="login__form" name="login" onSubmit={this.handleSubmit} noValidate>
          <label className="login__form-field">
            <input required onChange={this.handleChange} value={this.state.email} id="url-login" type="email" name="email" placeholder="Email" className="login__placeholder" minLength="2" maxLength="40"/>
            <span className="email-input-error login__placeholder-error"></span>
          </label>
          <label className="login__form-field">
            <input required onChange={this.handleChange} value={this.state.password} id="password-input" type="password" name="password" placeholder="Пароль" className="login__placeholder" minLength="6" maxLength="20"/>
            <span className="info-input-error login__placeholder-error"></span>
          </label>
          <button type="submit" name="login" className="login__button">Войти</button>
        </form>
      </div>
    </section>
    )
  }
}

export default withRouter(Login); 