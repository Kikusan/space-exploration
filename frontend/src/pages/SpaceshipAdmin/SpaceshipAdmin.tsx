// Components
import { Flexbox } from '../../components/Flexbox';
import { AstronautListErrorBoundary } from './AstronautListErrorBoundary';

// Containers
import { AstronautListContainer } from './AstronautListContainer';
import { SpaceshipAdminHeaderContainer } from './SpaceshipAdminHeaderContainer';

// Styles
import styles from './SpaceshipAdmin.module.css';

export function SpaceshipAdmin() {
  return (
    <Flexbox className={styles.spaceshipadmin} flexDirection="column">
      <Flexbox justifyContent="center" alignItems="center">
        <SpaceshipAdminHeaderContainer />
      </Flexbox>
      <Flexbox justifyContent="center" alignItems="center">
        <AstronautListErrorBoundary>
          <AstronautListContainer />
        </AstronautListErrorBoundary>
      </Flexbox>
    </Flexbox>
  );
}
