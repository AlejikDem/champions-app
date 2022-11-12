import React from 'react';
import { render, screen } from '@testing-library/react';
import { DeckMainInfo } from './DeckMainInfo';
import { HeroName, Faction, EncounterName, ScenarioName } from '../../../types';

const baseDeckInfo = {
  hero: null,
  faction: null,
  encounter: null,
  scenario: null,
};

describe('DeckMainInfo', () => {
  it('checks if all rows are empty if data is empty', () => {
    render(<DeckMainInfo deckInfo={baseDeckInfo} />);

    expect(screen.queryByTestId('deckMainInfo-hero')).toBeNull();
    expect(screen.queryByTestId('deckMainInfo-faction')).toBeNull();
    expect(screen.queryByTestId('deckMainInfo-encounter')).toBeNull();
    expect(screen.queryByTestId('deckMainInfo-scenario')).toBeNull();
  });

  it('should render only hero and faction', () => {
    const deckInfo = {...baseDeckInfo, hero: HeroName.BLACK_PANTHER, faction: Faction.AGGRESSION };
    render(<DeckMainInfo deckInfo={deckInfo} />);

    expect(screen.getByTestId('deckMainInfo-hero')).not.toBeNull();
    expect(screen.getByTestId('deckMainInfo-faction')).not.toBeNull();
    expect(screen.queryByTestId('deckMainInfo-encounter')).toBeNull();
    expect(screen.queryByTestId('deckMainInfo-scenario')).toBeNull();
  });

  it('should render all fields', () => {
    const deckInfo = {
      hero: HeroName.BLACK_PANTHER,
      faction: Faction.AGGRESSION,
      encounter: EncounterName.RHINO,
      scenario: ScenarioName.BOMB_SCARE,
    };
    render(<DeckMainInfo deckInfo={deckInfo} />);

    expect(screen.getByTestId('deckMainInfo-hero')).not.toBeNull();
    expect(screen.getByTestId('deckMainInfo-faction')).not.toBeNull();
    expect(screen.getByTestId('deckMainInfo-encounter')).not.toBeNull();
    expect(screen.getByTestId('deckMainInfo-scenario')).not.toBeNull();
  });
});