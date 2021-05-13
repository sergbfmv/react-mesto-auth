import logo from '../images/logotype.svg';
import { Link, useHistory } from 'react-router-dom'

function Header(props) {
  const history = useHistory();

  function signOut(){
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип Место" className="logo"/>
      <div className='header__element'>
        {props.mail === '/' && (<p className='header__email'>{props.userMail}</p>)}
        <Link onClick={signOut} className='header__link' to={props.to}>{props.text}</Link>
      </div>
    </header>
  )
}

export default Header;