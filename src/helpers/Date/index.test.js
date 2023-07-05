import { getMonth } from "../Date/index.js";

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    it("should return janvier for 2022-01-01 as date", () => {
      const date = new Date("2022-01-01");
      const result = getMonth(date);
      expect(result).toEqual("janvier");
    });

    it("should return juillet for 2022-07-08 as date", () => {
      const date = new Date("2022-07-08");
      const result = getMonth(date);
      expect(result).toEqual("juillet");
    });
  });
});

// import getMonth pour le test, et merci le tuto pour la syntaxe toEqual dans le test pour la date.
