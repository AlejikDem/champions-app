import React, {
  useState,
  useContext,
  useEffect,
  createContext
} from 'react';
import axios from 'axios';
// import data from './__tests__/response.json';

import { marvelApiEndpoint, prepareCards } from './helpers';
import { Cards } from './types';

export type CardsContextType = {
  cards?: Cards;
  isLoaded: boolean;
};

const initCardsContext = {
  cards: {} as Cards,
  isLoaded: false
};

const CardsContext = createContext<CardsContextType>(initCardsContext);

interface ProviderProps {
  children: React.ReactNode;
};

export const CardsContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cards, setCards] = useState<Cards>(initCardsContext.cards);
  const [isLoaded, setIsLoaded] = useState(false);

  const onInit = async () => {
    const { data } = await axios.get<any[]>(`${marvelApiEndpoint}/cards/core`);
    const preparedCards = prepareCards(data);
    setCards(preparedCards);
    setIsLoaded(true);
  };

  useEffect(() => {
    onInit();
  }, []);

  return (
    <CardsContext.Provider value={{ cards, isLoaded }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCardsContext = () => {
  return useContext(CardsContext);
};

