// Components
import { HUDAstronautList } from './components/HUDAstronautList';

import styles from './AstronautListContainer.module.css';

export function AstronautListContainer() {
  return (
    <HUDAstronautList
      label="astronauts in the spaceship"
      className={styles.astronautlistcontainer}
      emptyAstronautListMessage="Any astronaut in your spaceship"
    />
  );
}
