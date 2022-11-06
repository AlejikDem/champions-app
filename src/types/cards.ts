export enum Faction {
  AGGRESSION = 'aggression',
  PROTECTION = 'protection',
  JUSTICE = 'justice',
  LEADERSHIP = 'leadership'
};

export enum HeroName {
  BLACK_PANTHER = 'black_panther',
  CAPTAIN_MARVEL = 'captain_marvel',
  IRON_MAN = 'iron_man',
  SHE_HULK = 'she_hulk',
  SPIDER_MAN = 'spider_man',
};

export enum EncounterName {
  RHINO = 'rhino',
  KLAW = 'klaw',
  ULTRON = 'ultron',
}

export type Card = any;

export type Cards = {
  heroes: {
    [key in HeroName]?: Card[]
  },
  obligations: {
    [key in HeroName]?: Card[]
  },
  factions: {
    [key in Faction]?: Card[]
  },
  encounters: {
    [key in EncounterName]?: Card[]
  },
  nemesis: {
    [key in HeroName]?: Card[]
  },
  basic: {
    hero: Card[],
    encounter: Card[],
  },
  scenarios: {
    [key: string]: Card[]
  },
}