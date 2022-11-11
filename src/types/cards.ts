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

export type CardType = any;

export type Cards = {
  heroes: {
    [key in HeroName]?: CardType[]
  },
  obligations: {
    [key in HeroName]?: CardType[]
  },
  factions: {
    [key in Faction]?: CardType[]
  },
  encounters: {
    [key in EncounterName]?: CardType[]
  },
  nemesis: {
    [key in HeroName]?: CardType[]
  },
  basic: {
    hero: CardType[],
    encounter: CardType[],
  },
  scenarios: {
    [key: string]: CardType[]
  },
}