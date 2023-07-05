import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null);

  const getData = useCallback(async () => {
    try {
      const loadedData = await api.loadData();
      console.log("Loaded data:", loadedData);
      setData(loadedData);

      const sortedEvents = loadedData?.events.sort(
        (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
      );

      setLast(sortedEvents[0]);
      console.log("Last event:", sortedEvents[0]);
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (data) return;
    getData();
  });

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;

/*
dabord il fallait définir last avec un useState qui renvoie un tableau avec deux éléments : 
l'état de last et setLast qui sera utilisé pour mettre à jour last.

J'ai opté pour faire apparaitre les data dans la console alors j'ai réecris un peu de code.
dans un soucis de logique j'ai trié les événements par ordre décroissant de date 
avec sort() sur le tableau loadedData?.events. newDate de l'eventB avant le A c'est logique en vrai, 
j'aurais du y penser par moi même..
Bref, setLast est utilisé pour maj last avec le dernier event du tableau trié.
*/
