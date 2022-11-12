import React from 'react';

import { snakeCaseToCapitalized } from '../../../helpers';
import { DeckInfo } from '../../../types';

import styles from './DeckMainInfo.module.scss';

interface DeckMainInfoProps {
  deckInfo: DeckInfo;
}

export const DeckMainInfo: React.FC<DeckMainInfoProps> = ({ deckInfo }) => {
  const items = [
    {
      label: 'Hero',
      prop: 'hero',
    },
    {
      label: 'Faction',
      prop: 'faction',
    },
    {
      label: 'Encounter',
      prop: 'encounter',
    },
    {
      label: 'Scenario',
      prop: 'scenario',
    },
  ];

  return (
    <div className={styles.DeckMainInfo}>
      {items.map(item => {
        const value = deckInfo[item.prop];
        return (
          <div key={item.prop} className={styles.DeckMainInfoRow}>
            <div>{item.label}: </div>
            {value && (
              <div data-testid={`deckMainInfo-${item.prop}`}>
                {snakeCaseToCapitalized(value)}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
};