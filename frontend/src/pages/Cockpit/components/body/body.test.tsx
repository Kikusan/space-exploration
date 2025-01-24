import { act, render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { FetchPlanetProvider } from '../../context/FetchPlanetContext.tsx';
import { BodyContainer } from './BodyContainer.tsx';
import { FakePlanetService } from '../../service/FakePlanetService';
import userEvent from '@testing-library/user-event';
import { SpaceTravelProvider } from '@contexts/SpaceTravelContext.tsx';
import { waitMs } from '@helpers/waitMs.ts';

vi.mock('@assets/icon-planet.svg?react', () => ({
  default: 'svg',
}));
vi.mock('@assets/icon-male-female.svg?react', () => ({
  default: 'svg',
}));
describe('cockpit body component', () => {
  const planetService = new FakePlanetService();
  const planetNameList = planetService.planets.map((planet) => planet.name);
  it.each(planetNameList)('should display planet %s', async (planetName) => {
    render(
      <SpaceTravelProvider>
        <FetchPlanetProvider service={planetService}>
          <BodyContainer />
        </FetchPlanetProvider>
      </SpaceTravelProvider>,
    );

    const planetList = await screen.findByText(planetName);
    expect(planetList).toBeInTheDocument();
  });
  it('should have a disabled hyperspace button', async () => {
    render(
      <SpaceTravelProvider>
        <FetchPlanetProvider service={planetService}>
          <BodyContainer />
        </FetchPlanetProvider>
      </SpaceTravelProvider>,
    );
    await act(async () => {});
    const hyperspace = screen.getByRole('button');
    expect(hyperspace).toBeDisabled();
  });

  it('should have a enabled hyperspace button', async () => {
    render(
      <SpaceTravelProvider>
        <FetchPlanetProvider service={planetService}>
          <BodyContainer />
        </FetchPlanetProvider>
      </SpaceTravelProvider>,
    );
    const planet = await screen.findByText('pouloulou');
    await userEvent.click(planet);
    const hyperspace = screen.getByRole('button');
    expect(hyperspace).not.toBeDisabled();
  });

  it('should travel to the selectionned planet on hyperspace click', async () => {
    render(
      <SpaceTravelProvider>
        <FetchPlanetProvider service={planetService}>
          <BodyContainer />
        </FetchPlanetProvider>
      </SpaceTravelProvider>,
    );
    const planet = await screen.findByText('pouloulou');
    await userEvent.click(planet);
    const hyperspace = screen.getByRole('button');
    await userEvent.click(hyperspace);
    await act(async () => {
      await waitMs(1000);
    });
    const planetImg = screen.getByRole('img');
    expect(planetImg).toHaveAttribute('src', '/assets/pouloulou.jpg');
  });
});
