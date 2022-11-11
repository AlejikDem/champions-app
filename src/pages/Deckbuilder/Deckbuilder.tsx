import React, { useState } from 'react';

import { useCardsContext } from '../../CardsContext';
import { HeroName, Faction, EncounterName } from '../../types';
import { heroesInfo } from '../../helpers';

import { Pill } from '../../components/Pill';
import { Card } from '../../components/Card';
import styles from './Deckbuilder.module.css';

type DeckInfo = {
  hero: HeroName;
  faction: Faction;
  encounter: EncounterName;
  scenario: string;
};

enum Step {
  HERO = 'hero',
  FACTION = 'faction',
  ENCOUNTER = 'encounter',
  SCENARIO = 'scenario'
};

export const DeckBuilder = () => {
  const { cards, isLoaded } = useCardsContext();
  const [ activeStep, setActiveStep ] = useState<Step>(Step.HERO);
  const stepsOrder = [Step.HERO, Step.FACTION, Step.ENCOUNTER, Step.SCENARIO];

  const stepsInfo = {
    [Step.HERO]: {}
  }

  const heroes = Object.values(HeroName);
  const factions = Object.values(Faction);
  const encounters = Object.values(EncounterName);

  const [ deckInfo, setDeckInfo ] = useState<DeckInfo>({
    hero: heroes[0],
    faction: factions[0],
    encounter: encounters[0],
    scenario: '1',
  });
  const updateDeck = (prop: keyof DeckInfo, value: string) => {
    setDeckInfo({
      ...deckInfo,
      [prop]: value
    });
  }


  if (!isLoaded) return null;

  return (
    <div className={styles.Container}>
      <div className={styles.PageTitle}>Form you deck</div>
      <div className={styles.Header}>
        <div className={styles.StepTitle}>Choose hero</div>
        <div className={styles.HeaderMain}>
          <div className={styles.DeckInfo}>
            <div className={styles.DeckInfoRow}>
              <div>Hero: </div>
              <div>{heroesInfo[deckInfo.hero].name}</div>
            </div>
          </div>
          <div className={styles.ItemsList}>
            {heroes.map(heroName => (
              <Pill
                key={heroName}
                label={heroesInfo[heroName].name}
                isActive={heroName === deckInfo.hero}
                onClick={updateDeck.bind(null, 'hero', heroName)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.SectionCards}>
        {cards?.heroes[deckInfo.hero]?.map(card => {
          return (
            <Card
              key={card.code}
              card={card}
              addClassName={styles.Card}
            />
          )
        })}
      </div>
    </div>
  );
};
