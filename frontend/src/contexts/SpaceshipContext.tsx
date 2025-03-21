// React
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

// Error
import { FetchError } from '../errors/FetchError';
import { ContextError } from '../errors/ContextError';

// API
import { Astronaut } from '../api/astronaut.api';

type SpaceshipContextType = {
  astronautList: {
    isLoading: boolean;
    astronautList?: Astronaut[] | null;
    error?: FetchError | null;
  };
  updateSpaceshipContext: (
    stateToUpdate: Partial<SpaceshipContextType>,
  ) => void;
};

const initialSpaceshipContext: SpaceshipContextType = {
  astronautList: {
    isLoading: false,
  },
  updateSpaceshipContext: () => {},
};

const SpaceshipContext = createContext(initialSpaceshipContext);

export function SpaceshipProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [spaceshipState, setSpaceshipState] = useState<SpaceshipContextType>(
    initialSpaceshipContext,
  );

  const updateSpaceshipContext = useCallback(
    (stateToUpdate: Partial<SpaceshipContextType>) => {
      setSpaceshipState((prevState) => ({
        ...prevState,
        ...stateToUpdate,
      }));
    },
    [],
  );

  const value = useMemo(
    () => ({
      ...spaceshipState,
      updateSpaceshipContext,
    }),
    [spaceshipState, updateSpaceshipContext],
  );

  return (
    <SpaceshipContext.Provider value={value}>
      {children}
    </SpaceshipContext.Provider>
  );
}

export function useSpaceshipContext(): SpaceshipContextType {
  const spaceshipContext = useContext(SpaceshipContext);

  if (!spaceshipContext) {
    throw new ContextError(
      'SpaceshipContext',
      'no SpaceshipContext available, is the Provider was set?',
    );
  }

  return spaceshipContext;
}

export function useAstronautList(): {
  astronautList: SpaceshipContextType['astronautList'];
  setAstronautList: (
    astronautList: SpaceshipContextType['astronautList'],
  ) => void;
} {
  const { astronautList, updateSpaceshipContext } = useSpaceshipContext();

  return {
    astronautList,
    setAstronautList: (astronautList: SpaceshipContextType['astronautList']) =>
      updateSpaceshipContext({ astronautList }),
  };
}
