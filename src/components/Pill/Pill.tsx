import React from 'react';
import cn from 'classnames';

import styles from './Pill.module.scss';

interface PillProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const Pill: React.FC<PillProps> = ({ label, isActive, onClick }) => {
  return (
    <div
      className={cn(styles.Pill, {
        [styles.Clickable]: !!onClick,
        [styles.Active]: isActive,
      })}
      onClick={onClick}
    >
      {label}
    </div>
  )
};