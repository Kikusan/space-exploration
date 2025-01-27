// Components
import { HUDAstronautList } from './components/HUDAstronautList';
import { HUDWindowLoader } from '@components/HUDWindowLoader/index';

// Context
import { useMessageCenter } from '@contexts/MessageCenterContext.tsx';

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
