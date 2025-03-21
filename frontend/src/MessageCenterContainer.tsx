// React
import { useEffect, useState } from 'react';

// Components
import { HUDSnackbar } from './components/HUDSnackbar';

// Helpers
import { waitMs } from '@helpers/waitMs.ts';

// Context
import { useMessageCenterContext } from './contexts/MessageCenterContext.tsx';

export function MessageCenterContainer() {
  const { type, message, updateMessageCenterContext } =
    useMessageCenterContext();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (message) {
      setIsActive(true);
      const resetIsActive = async () => {
        await waitMs(5000);
        setIsActive(false);
        updateMessageCenterContext({ type: 'info', message: null });
      };

      resetIsActive();
    }
  }, [type, message, updateMessageCenterContext]);

  return (
    <HUDSnackbar type={type} isActive={isActive}>
      {message}
    </HUDSnackbar>
  );
}
