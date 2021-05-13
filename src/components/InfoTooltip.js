function InfoTooltip(props) {
  return(
    <section className={props.isOpen ? `popup popup_opened` : `popup`}>
      <div className="popup__container">
        <button className='popup__close-button' type="button" onClick={props.onClose}></button>
        <div className='popup__success-img' style={{backgroundImage: `url(${props.image})`}}></div>
        <h3 className="popup__success-title">{props.text}</h3>
      </div>
    </section>
  )
}

export default InfoTooltip