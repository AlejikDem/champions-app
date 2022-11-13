import React from 'react';
import cn from 'classnames';

import styles from './Pill.module.scss';

interface PillProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  colorsInfo?: {
    default?: string;
    active?: string;
  }
}

export const Pill: React.FC<PillProps> = ({
  label,
  isActive,
  onClick,
  colorsInfo,
}) => {
  let addStyles = {};

  if (colorsInfo) {
    if (colorsInfo.active && isActive) {
      addStyles = {
        backgroundColor: colorsInfo.active,
        borderColor: colorsInfo.active,
      }
    };
    if (!isActive && colorsInfo.default) {
      addStyles = { borderColor: colorsInfo.default }
    }
  }

  return (
    <div
      className={cn(styles.Pill, {
        [styles.Clickable]: !!onClick,
        [styles.Active]: isActive,
      })}
      onClick={!isActive && !!onClick ? onClick : null}
      data-testid={`pill-${label}`}
      style={{...addStyles}}
    >
      {label}
    </div>
  )
};