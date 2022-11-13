import React, { useState } from 'react';
import cn from 'classnames';

import { useCardsContext } from '../../CardsContext';
import {
  HeroName,
  Faction,
  EncounterName,
  ScenarioName,
  DeckInfo,
  DeckBuilStep
} from '../../types';
import { snakeCaseToCapitalized } from '../../helpers';

import { DeckMainInfo } from './DeckMainInfo';
import { Pill } from '../../components/Pill';
import { Card } from '../../components/Card';
import styles from './Deckbuilder.module.scss';

export const DeckBuilder = () => {
  const { cards, isLoaded } = useCardsContext();
  const stepsOrder = [DeckBuilStep.HERO, DeckBuilStep.FACTION, DeckBuilStep.ENCOUNTER, DeckBuilStep.SCENARIO];
  const [ activeStep, setActiveStep ] = useState<DeckBuilStep>(stepsOrder[0]);
  const activeStepIndex = stepsOrder.findIndex(item => item === activeStep);
  const [ deckInfo, setDeckInfo ] = useState<DeckInfo>({
    hero: null,
    faction: null,
    encounter: null,
    scenario: null,
  });

  if (!isLoaded) return null;

  const stepsInfo = {
    [DeckBuilStep.HERO]: {
      title: 'Choose Hero',
      cardsCollection: cards.heroes,
      itemsCollection: Object.values(HeroName),
    },
    [DeckBuilStep.FACTION]: {
      title: 'Choose Faction',
      cardsCollection: cards.factions,
      itemsCollection: Object.values(Faction),
    },
    [DeckBuilStep.ENCOUNTER]: {
      title: 'Choose Encounter',
      cardsCollection: cards.encounters,
      itemsCollection: Object.values(EncounterName),
    },
    [DeckBuilStep.SCENARIO]: {
      title: 'Choose Scenario',
      cardsCollection: cards.scenarios,
      itemsCollection: Object.values(ScenarioName),
    },
  }

  const pillsColorsInfo = {
    [HeroName.BLACK_PANTHER]: { active: '#46295d' },
    [HeroName.SHE_HULK]: { active: '#46295d' },
    [HeroName.SPIDER_MAN]: { active: '#922d2c' },
    [HeroName.IRON_MAN]: { active: '#922d2c' },
    [HeroName.CAPTAIN_MARVEL]: { active: '#2f3592' },
  }

  const updateDeckInfo = (prop: keyof DeckInfo, value: string) => {
    setDeckInfo({
      ...deckInfo,
      [prop]: value
    });
  };

  const {
    title,
    itemsCollection,
    cardsCollection,
  } = stepsInfo[activeStep];
  const currentStepProp = deckInfo[activeStep];

  const isFirstStep = activeStepIndex === 0;
  const isLastStep = activeStepIndex === stepsOrder.length - 1;

  const setNextStep = () => {
    if (!currentStepProp) return null;
    setActiveStep(stepsOrder[activeStepIndex + 1]);
  };

  const setPrevStep = () => {
    setActiveStep(stepsOrder[activeStepIndex - 1]);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.PageTitle}>Form you deck</div>
      <div className={styles.Header}>
        <div className={styles.HeaderTop}>
          {!isFirstStep && (
            <span
              className={cn(styles.Arrow, styles.Left)}
              onClick={setPrevStep}
            />
          )}
          <div className={styles.StepTitle}>{title}</div>
          {!isLastStep && (
            <span
              className={cn(styles.Arrow, styles.Right, {
                [styles.Disabled]: !currentStepProp
              })}
              onClick={setNextStep}
            />
          )}
        </div>
        <div className={styles.HeaderMain}>
          <DeckMainInfo deckInfo={deckInfo} />
          <div className={styles.ItemsList}>
            {itemsCollection.map(itemName => (
              <Pill
                key={itemName}
                label={snakeCaseToCapitalized(itemName)}
                isActive={itemName === currentStepProp}
                onClick={updateDeckInfo.bind(null, activeStep, itemName)}
                colorsInfo={pillsColorsInfo[itemName]}
              />
            ))}
          </div>
        </div>
      </div>
      {currentStepProp && (
        <div className={styles.SectionCards}>
          {cardsCollection[currentStepProp]?.map(card => {
            return (
              <Card
                key={card.code}
                card={card}
                addClassName={styles.Card}
              />
            )
          })}
        </div>
      )}
    </div>
  );
};
