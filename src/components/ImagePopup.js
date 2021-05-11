function ImagePopup(props) {

  return (
    <section className={props.card.link  ? `popup popup_type_image popup_opened` : `popup popup_type_image`}>
      <div className="popup__wrap">
        <button className="popup__close-button popup__close-button_type_image" type="button" onClick={props.onClose}></button>
        <img src={props.card.link} alt={props.card.name} className="popup__photo"/>
        <h2 className="popup__title-image">{props.card.name}</h2>
      </div>
    </section>
  )
}

export default ImagePopup