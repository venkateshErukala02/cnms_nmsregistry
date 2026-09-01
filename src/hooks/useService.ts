import { createContext, useContext } from 'react';

import { ServerService } from '../services/nmsregistry.service';

interface ServiceRegistry {
  ServerService: ServerService;
}

export const ServiceContext = createContext<ServiceRegistry>({
  ServerService: new ServerService(),
});

export const useService = <T>(key: keyof ServiceRegistry): T => {
  const services = useContext(ServiceContext);

  return services[key] as T;
};
