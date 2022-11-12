import React, { useState } from 'react';
import cn from 'classnames';

import { useCardsContext } from '../../CardsContext';
import {
  HeroName,
  Faction,
  EncounterName,
  DeckInfo,
  DeckBuilStep
} from '../../types';
import { heroesInfo } from '../../helpers';

import { DeckMainInfo } from '../../components/DeckMainInfo';
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
      cardsCollection: cards.heroes,
      itemsCollection: Object.values(HeroName),
      getItemLabel: (item) => heroesInfo[item].name,
    },
    [DeckBuilStep.FACTION]: {
      cardsCollection: cards.factions,
      itemsCollection: Object.values(Faction),
      getItemLabel: (item) => item,
    },
    [DeckBuilStep.ENCOUNTER]: {
      cardsCollection: cards.encounters,
      itemsCollection: Object.values(EncounterName),
      getItemLabel: (item) => item,
    },
    [DeckBuilStep.SCENARIO]: {
      cardsCollection: cards.scenarios,
      itemsCollection: ['1', '2'],
      getItemLabel: (item) => item,
    },
  }

  const updateDeckInfo = (prop: keyof DeckInfo, value: string) => {
    setDeckInfo({
      ...deckInfo,
      [prop]: value
    });
  };

  const {
    itemsCollection,
    cardsCollection,
    getItemLabel,
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
        <div className={styles.StepTitle}>
          {!isFirstStep && (
            <span
              className={cn(styles.Arrow, styles.Prev)}
              onClick={setPrevStep}
            />
          )}
          <span>Choose hero</span>
          {!isLastStep && (
            <span
              className={cn(styles.Arrow, styles.Next, {
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
                label={getItemLabel(itemName)}
                isActive={itemName === currentStepProp}
                onClick={updateDeckInfo.bind(null, activeStep, itemName)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.SectionCards}>
        {currentStepProp && cardsCollection[currentStepProp]?.map(card => {
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
