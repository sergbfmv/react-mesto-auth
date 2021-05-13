import Header from './Header'
import React from 'react'
import { withRouter } from 'react-router-dom';
import * as auth from '../auth.js'
import InfoTooltip from './InfoTooltip'
import regOk from '../images/regOk.svg'
import regNotOk from '../images/regNotOk.svg'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      image: '',
      text: '',
      isOpen: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseInfoTooltip = this.handleCloseInfoTooltip.bind(this)
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  
  handleOpenInfoTooltip(image, text) {
    this.setState({
      isOpen: true,
      image: image,
      text: text
    })
  }

  handleCloseInfoTooltip() {
    const check = this.state.image
    this.setState({
      isOpen: false,
      image: '',
      text:''
    })
    this.handleClickClose(check)
  }

  handleClickClose(check) {
    if (check === regOk) {
      this.setState({
        message: ''
      }, () => {
        this.props.history.push('/sign-in')
      })
    } else {
        this.setState({
          message: "Что-то пошло не так!"
        })
      }
    }

  handleSubmit = (e) => {
    e.preventDefault();
      auth.register(this.state.password, this.state.email).then((res) => {
        if(!res.error && !res.message) {
          this.handleOpenInfoTooltip(regOk, 'Вы успешно зарегистрировались!')
        } else {
            this.handleOpenInfoTooltip(regNotOk, 'Что-то пошло не так! Попробуйте ещё раз.')
          }
      });
  }

  render() {
  return(
    <>
    <InfoTooltip isOpen={this.state.isOpen} image={this.state.image} text={this.state.text} onClose={this.handleCloseInfoTooltip}  />
    <section className="login">
      <Header to='/sign-in' text='Войти' />
      <div className="login__container">
        <h2 className="login__title">Регистрация</h2>
        <form className="login__form" name="login" onSubmit={this.handleSubmit} noValidate>
          <label className="login__form-field">
            <input required onChange={this.handleChange} id="url-login" type="email" name="email" placeholder="Email" className="login__placeholder" minLength="2" maxLength="40"/>
            <span className="email-input-error login__placeholder-error"></span>
          </label>
          <label className="login__form-field">
            <input required onChange={this.handleChange} id="password-input" type="password" name="password" placeholder="Пароль" className="login__placeholder" minLength="6" maxLength="20"/>
            <span className="info-input-error login__placeholder-error"></span>
          </label>
          <button type="submit" name="login" className="login__button">Зарегистрироваться</button>
          <p className="login__text">Уже зарегистрированы? <a href='/' className="login__link">Войти</a></p>
        </form>
      </div>
    </section>
    </>
  )
}
}

export default withRouter (Register);