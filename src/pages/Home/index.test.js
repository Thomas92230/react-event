import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

jest.mock("../../contexts/DataContext/index", () => ({
  useData: () => ({
    last: {
      cover: "/images/headway-F2KRf_QfCqw-unsplash.png",
      title: "Conférence #productCON",
      date: new Date("2022-08-29T20:28:45.744Z"),
    },
    data: null,
    error: null,
  }),
}));

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);

    const eventListElement = screen.getByTestId("event-list");
    expect(eventListElement).toBeInTheDocument();
  });
  it("a list a people is displayed", () => {
    render(<Home />);

    const eventPeopleList = screen.getByTestId("people-list");
    expect(eventPeopleList).toBeInTheDocument();
  });
  it("a footer is displayed", () => {
    render(<Home />);

    const footerDisplay = screen.getByTestId("footer-display");
    expect(footerDisplay).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", () => {
    render(<Home />);

    const eventCardElement = screen.getByTestId("event-card");
    expect(eventCardElement).toBeInTheDocument();

    const eventTitle = screen.getByText("Conférence #productCON");
    expect(eventTitle).toBeInTheDocument();

    const eventCover = document.querySelector(
      `img[src="/images/headway-F2KRf_QfCqw-unsplash.png"]`
    );
    expect(eventCover).toBeInTheDocument(); // voir avec Luc si QS est autorisé, je l'ai utilisé car pas de texte alt sur l'img de base.
  });
});

// import de Home pour les test d'intégration.
/* Jest.mock est la pour simuler le module DataContext. 
Dans la fonction de rappel, useData renvoie un objet avec last, data et error.
Donc pendant le test, le composant testé utilisera la version simulée du contexte, 
où last aura les valeurs spécifiées. */
// test d'intégration avec getByText et getBytestId.
