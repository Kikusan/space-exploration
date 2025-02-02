import { UpdateAstronautProvider } from './contexts/UpdateAstronautContext.tsx';
import { UpdateAstronautContainer } from './UpdateAstronautContainer.tsx';
import { UpdateAstronautService } from './services/UpdateAstronautService';

export function UpdateAstronaut() {
  const recruitAstronautService = new UpdateAstronautService();
  return (
    <UpdateAstronautProvider service={recruitAstronautService}>
      <UpdateAstronautContainer />;
    </UpdateAstronautProvider>
  );
}
