import React from 'react';
import cn from 'classnames';

import { CardType } from '../../types';

import styles from './Card.module.css';

interface CardProps {
  card: CardType;
  addClassName?: string;
}

export const Card: React.FC<CardProps> = ({ card, addClassName = '' }) => {
  return (
    <div className={cn(styles.Card, addClassName)}>
      <img src={`/images/${card.code}.png`} alt={`${card.code}-card`} />
    </div>
  )
};