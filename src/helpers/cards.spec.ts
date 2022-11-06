import testCardsResponse from '../__tests__/response.json';
import { prepareCards, addCardToDeck } from './cards';

import { HeroName, Faction, EncounterName } from '../types';

describe('properly builds base cards structure', () => {
  const cards = prepareCards(testCardsResponse);

  it('should handle heroes', () => {
    expect(cards.heroes).not.toBeFalsy();
    expect(Object.keys(cards.heroes).length).toEqual(Object.keys(HeroName).length);
  });

  it('should handle obligations', () => {
    expect(cards.obligations).not.toBeFalsy();
    expect(Object.keys(cards.obligations).length).toEqual(Object.keys(HeroName).length);
  });

  it('should handle factions', () => {
    expect(cards.factions).not.toBeFalsy();
    expect(Object.keys(cards.factions).length).toEqual(Object.keys(Faction).length);
  });

  it('should handle nemesis', () => {
    expect(cards.nemesis).not.toBeFalsy();
    expect(Object.keys(cards.nemesis).length).toEqual(Object.keys(HeroName).length);
  });

  it('should handle basic', () => {
    expect(cards.basic.hero.length).toBeGreaterThan(0);
    expect(cards.basic.encounter.length).toBeGreaterThan(0);
  });

  it('should handle scenarios', () => {
    expect(cards.scenarios).not.toBeFalsy();
  });

  it('should handle encounters', () => {
    expect(cards.encounters).not.toBeFalsy();
    expect(Object.keys(cards.encounters).length).toEqual(Object.keys(EncounterName).length);
  });
});

it('should handle addCardToDeck', () => {
  expect(addCardToDeck([1, 2, 4], 5)).toEqual([1, 2, 4, 5]);
  expect(addCardToDeck(undefined, 5)).toEqual([5]);
});

