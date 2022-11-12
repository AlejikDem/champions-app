import React from 'react';

import { heroesInfo } from '../../helpers';
import { DeckInfo } from '../../types';

import styles from './DeckMainInfo.module.scss';

interface DeckMainInfoProps {
  deckInfo: DeckInfo;
}

export const DeckMainInfo: React.FC<DeckMainInfoProps> = ({ deckInfo }) => {
  return (
    <div className={styles.DeckMainInfo}>
      <div className={styles.DeckMainInfoRow}>
        <div>Hero: </div>
        <div>{heroesInfo[deckInfo.hero]?.name}</div>
      </div>
    </div>
  )
};