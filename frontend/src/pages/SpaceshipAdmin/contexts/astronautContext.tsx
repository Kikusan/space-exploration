import React, { createContext, ReactNode, useCallback, useMemo } from 'react';
import IfetchAstronautService from '../services/IFetchAstronautService';
import { Astronaut } from '@api/astronaut.api';

export interface ApiContextType {
  fetchAstronauts: () => Promise<Astronaut[]>;
  deleteAstronaut: (id: number) => Promise<Astronaut[]>;
  updateAstronaut: (
    id: string,
    updatedData: Partial<Astronaut>,
  ) => Promise<void>;
}

interface ApiProviderProps {
  service: IfetchAstronautService;
  children: ReactNode;
}

export const FetchAstronautContext = createContext<ApiContextType>({
  fetchAstronauts: async () => [],
  deleteAstronaut: async () => [],
  updateAstronaut: async () => {
    throw new Error('Not implemented');
  },
});

export const FetchAstronautProvider: React.FC<ApiProviderProps> = ({
  service,
  children,
}) => {
  const fetchAstronauts = useCallback(async () => {
    return service.fetchAstronauts();
  }, [service]);

  const deleteAstronaut = useCallback(
    async (id: number) => {
      return service.deleteAstronaut(id);
    },
    [service],
  );
  const updateAstronaut = async (id: string) => {
    console.log('update', id);
    Promise.resolve();
  };

  const contextValue = useMemo(
    () => ({ fetchAstronauts, deleteAstronaut, updateAstronaut }),
    [fetchAstronauts, deleteAstronaut],
  );
  return (
    <FetchAstronautContext.Provider value={contextValue}>
      {children}
    </FetchAstronautContext.Provider>
  );
};
