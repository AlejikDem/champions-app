import {
  Faction,
  HeroName,
  EncounterName,
  CardType,
  Cards
} from '../types';

export const addCardToDeck = <T,>(list: T[] | undefined, card: T) => {
  return [...(list || []), card];
};

export const prepareCards = (cards: CardType[]): Cards => {
  const emptyDeck: Cards = {
    heroes: {},
    obligations: {},
    factions: {
      aggression: [],
      justice: [],
      leadership: [],
      protection: [],
    },
    encounters: {},
    nemesis: {},
    basic: {
      hero: [],
      encounter: [],
    },
    scenarios: {},
  };

  const factions = Object.values(Faction);
  const heroNames = Object.values(HeroName);
  const encounterNames = Object.values(EncounterName);

  const coreDeck = cards.reduce((acc, card) => {
    const { faction_code, card_set_code } = card;
    if (faction_code === 'hero') {
      acc.heroes[card_set_code] = addCardToDeck(acc.heroes[card_set_code], card);
    } else if (faction_code === 'basic') {
      acc.basic.hero.push(card);
    } else if (factions.includes(faction_code)) {
      acc.factions[faction_code].push(card);
    } else if (faction_code === 'encounter') {
      if (heroNames.includes(card_set_code)) {
        acc.obligations[card_set_code] = addCardToDeck(acc.obligations[card_set_code], card);
      } else if (card_set_code.includes('_nemesis')) {
        const heroName = card_set_code.replace('_nemesis', '');
        acc.nemesis[heroName] = addCardToDeck(acc.nemesis[heroName], card);
      } else if (encounterNames.includes(card_set_code)) {
        acc.encounters[card_set_code] = addCardToDeck(acc.encounters[card_set_code], card);
      } else if (card_set_code === 'standard') {
        acc.basic.encounter.push(card);
      } else {
        acc.scenarios[card_set_code] = addCardToDeck(acc.scenarios[card_set_code], card);
      }
    }
    return acc;
  }, emptyDeck);

  return coreDeck;
};

export const heroesInfo = {
  [HeroName.BLACK_PANTHER]: { name: 'Black Panther' },
  [HeroName.CAPTAIN_MARVEL]: { name: 'Captain Marvel' },
  [HeroName.SHE_HULK]: { name: 'She Hulk' },
  [HeroName.SPIDER_MAN]: { name: 'Spider Man' },
  [HeroName.IRON_MAN]: { name: 'Iron Man' },
};