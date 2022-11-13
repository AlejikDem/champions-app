import React from 'react';
import cn from 'classnames';

import { CardType } from '../../types';

import styles from './Card.module.scss';

interface CardProps {
  card: CardType;
  addClassName?: string;
  showQuantity?: boolean;
}

export const Card: React.FC<CardProps> = ({
  card,
  addClassName = '',
  showQuantity
}) => {
  const isHorizontal = card.type_code === 'main_scheme' || card.type_code === 'side_scheme';

  return (
    <div
      className={cn(styles.Card, {
        [styles.Horizontal]: isHorizontal,
      }, addClassName)}
      data-testid={`card-${card.code}`}
    >
      <img src={`/images/${card.code}.png`} alt={`${card.code}-card`} />
      {showQuantity && card.quantity >= 2 && (
        <div className={styles.Quantity}>x{card.quantity}</div>
      )}
    </div>
  )
};