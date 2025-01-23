// React
import { Flexbox } from '@components/Flexbox/index';
import { PlanetListErrorBoundary } from './PlanetListErrorBoundary';

import { PlanetSelectionContainer } from './PlanetSelectionContainer';
import { CurrentPlanetContainer } from './CurrentPlanetContainer';

import { FetchPlanetProvider } from '../../context/FetchPlanetContext.tsx';
import { PlanetService } from '../../service/planetService';

export function PlanetList() {
  const planetService = new PlanetService();
  return (
    <Flexbox flex="2 1 auto" alignItems="center">
      <FetchPlanetProvider service={planetService}>
        <PlanetListErrorBoundary>
          <PlanetSelectionContainer />
        </PlanetListErrorBoundary>
        <CurrentPlanetContainer />
      </FetchPlanetProvider>
    </Flexbox>
  );
}
