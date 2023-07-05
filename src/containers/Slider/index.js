import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [sortedEvents, setSortedEvents] = useState([]);

  useEffect(() => {
    if (data) {
      const byDateDesc = data.focus.sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
      );
      setSortedEvents(byDateDesc);
    }
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex < sortedEvents.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [index, sortedEvents.length]);

  return (
    <div className="SlideCardList">
      {sortedEvents.map((event, idx) => (
        <div
          key={event.title} // clé unique puisque chaque image n'a qu'un seul titre
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {sortedEvents.map((event, idx) => (
            <input
              key={event.title} // clé unique puisque chaque image n'a qu'un seul titre
              type="radio"
              name="radio-button"
              checked={index === idx}
              onChange={() => setIndex(idx)} // message d'erreur dans la console du coup j'ai du utilisé onChange et spécifié la fonction setIndex
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

/* Le slider défilait de manière aléatoire et une des slide n'affichait pas la date,
donc pour mieux comprendre j'ai réecris un peu, dabord useState de sortedEvent 
puis dans le useEffect correction de la logique de tri dans la const byDataDesc, 
ajout de sortedEvent.length dans la const timer.
mis à jour des key, avec .title puisqu'il n'y a qu'un titre par event.
Concernant l'affichage de la date de chaque event, il fallait faire appel à la fonction getMonth 
avec (newdate(event.date)) en argument.   */
