import { Space } from '@components/Space';
import { Flexbox } from '@components/Flexbox';

import { useIsTraveling } from '../../contexts/SpaceTravelContext.tsx';

import styles from './Cockpit.module.css';
import { Header } from './components/header/index.tsx';
import { PlanetList } from './components/body/index.tsx';
import { Footer } from './components/footer/index.tsx';

export function Cockpit() {
  const { isTraveling } = useIsTraveling();
  return (
    <Flexbox className={styles.cockpit} flexDirection="column">
      <Space isHyperSpace={isTraveling} className={styles.cockpitSpace} />
      <Header />
      <PlanetList />
      <Footer />
    </Flexbox>
  );
}
