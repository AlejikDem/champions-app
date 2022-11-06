import React, {
  useState,
  useContext,
  useEffect,
  createContext
} from 'react';
import axios from 'axios';

import { marvelApiEndpoint, prepareCards } from './helpers';
import { Cards } from './types';

export type CardsContextType = {
  cards?: Cards;
};

const initCardsContext = {
  cards: {} as Cards
};

const CardsContext = createContext<CardsContextType>(initCardsContext);

interface ProviderProps {
  children: React.ReactNode;
};

export const CardsContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cards, setCards] = useState<Cards>(initCardsContext.cards);

  const onInit = async () => {
    const { data } = await axios.get<any[]>(`${marvelApiEndpoint}/cards/core`);
    const preparedCards = prepareCards(data);
    setCards(preparedCards);
  };

  useEffect(() => {
    onInit();
  }, []);

  return (
    <CardsContext.Provider value={{ cards }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCardsContext = () => {
  return useContext(CardsContext);
};

