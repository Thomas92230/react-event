import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredType, setFilteredType] = useState(null); // Ajout de l'état filteredType

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
    setFilteredType(evtType); // Mettre à jour le type filtré
  };

  const sortedEvents = data?.events
    ? [...data.events].sort(
        (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
      )
    : [];

  const filteredEvents = ((!type ? sortedEvents : sortedEvents) || []) // Utilisation de sortedEvents
    .filter((event) => filteredType === null || event.type === filteredType) // Filtre les événements en fonction du type spécifié
    .filter((event, index) => {
      if (
        (currentPage - 1) * PER_PAGE <= index &&
        PER_PAGE * currentPage > index
      ) {
        return true;
      }
      return false;
    });

  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
            updateFilteredEvents={setFilteredType} // Passer la fonction de mise à jour de l'état filteredType
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;

/* Pour la, quand on selectionnait un filtre il ne se passait rien, donc après examen du code.
 j'ai corrigé la logique de filtrage avec un tri des event du plus récent au plus ancien,
 quand à lui filteredEvent stock les event filtrés en fonction de leur date, 
 et filteredType filtre les événements en fonction du type spécifié, si filteredType est null,
 tous les événements seront inclus sinon, 
 seuls les événements dont le type correspond à filteredType seront inclus.
 Il fallait évidemment passée la fonction updateFilteredEvents avec comme paramètre 
 setFilteredEvent qui met à jour l'etat de filteredType en fonction du type choisis
 dans la liste de select */
