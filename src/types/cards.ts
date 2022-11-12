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

export enum ScenarioName {
  BOMB_SCARE = 'bomb_scare',
  LEGIONS_OF_HYDRA = 'legions_of_hydra',
  MASTERS_OF_EVIL = 'masters_of_evil',
  THE_DOOMSDAY_CHAIR = 'the_doomsday_chair',
  UNDER_ATTACK = 'under_attack'
}

export enum DeckBuilStep {
  HERO = 'hero',
  FACTION = 'faction',
  ENCOUNTER = 'encounter',
  SCENARIO = 'scenario'
};

export type DeckInfo = {
  [DeckBuilStep.HERO]: HeroName;
  [DeckBuilStep.FACTION]: Faction;
  [DeckBuilStep.ENCOUNTER]: EncounterName;
  [DeckBuilStep.SCENARIO]: ScenarioName;
};

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