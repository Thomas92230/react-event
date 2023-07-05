import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => (
  <div
    data-testid="card-testid"
    className={`EventCard${small ? " EventCard--small" : ""}`}
    {...props}
  >
    <div className="EventCard__imageContainer">
      <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
      <div className="EventCard__label">{label}</div>
    </div>
    <div className="EventCard__descriptionContainer">
      <div className="EventCard__title">{title}</div>

      <div className="EventCard__month" data-testid="month-element">
        {getMonth(date)}
      </div>
    </div>
  </div>
);

EventCard.propTypes = {
  imageSrc: PropTypes.string, // Enlevé is Required "erreur console navigateur"
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string, // Enlevé is Required "erreur console navigateur"
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  imageSrc: "", // valeur par défaut ici
  imageAlt: "image",
  title: "",
  small: false,
};

export default EventCard;

/* alors la il fallait que toute les cartes affiche les mois correspondant au date du JSON,
donc j'ai fais appel à la fonction getMonth, j'ai ajouté DATATESTID pour le test
et maj qql props pcq la console était pas contente. */
