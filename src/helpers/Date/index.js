export const MONTHS = {
  0: "janvier",
  1: "février",
  2: "mars",
  3: "avril",
  4: "mai",
  5: "juin",
  6: "juillet",
  7: "août",
  8: "septembre",
  9: "octobre",
  10: "novembre",
  11: "décembre",
};

export const getMonth = (date) => {
  const monthIndex = date.getMonth();
  return MONTHS[monthIndex];
};

// Dabord MONTHS prend un objet de 0 à 11 pour faire référence au mois.
/* Puis getMonth prend en paramètre une date et retourne 
le num du mois correspondant à cette date en utilisant la constante MONTHS. */
