import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { FetchPlanetProvider } from '../../context/FetchPlanetContext.tsx';
import { BodyContainer } from './BodyContainer.tsx';
import { FakePlanetService } from '../../service/FakePlanetService';

// Mock de l'importation du fichier SVG
vi.mock('@assets/icon-planet.svg?react', () => ({
  default: 'svg',
}));

describe('cockpit body component', () => {
  const planetService = new FakePlanetService();
  const planetNameList = planetService.planets.map((planet) => planet.name);
  it.each(planetNameList)('should display planet %s', async (planetName) => {
    render(
      <FetchPlanetProvider service={planetService}>
        <BodyContainer />
      </FetchPlanetProvider>,
    );
    await waitFor(() => {
      const planetList = screen.getByText(planetName);
      expect(planetList).toBeDefined();
    });
  });
});
