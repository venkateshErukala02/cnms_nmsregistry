import { create } from 'zustand';
import type {RegistrationResponse} from '../../services/nmsregistry.service'
import type { ForceRegistry,RegistryCode } from '../../services/nmsregistry.service';


export type AppState = {
  registrationResponse?: RegistrationResponse;
  forceRegistryResponse?: ForceRegistry;
  registryCodeResponse?: RegistryCode;
  open?:boolean;
  errors: Record<string, string>;
//   currentUser?: {
//     buildCode: string;
//     currentUser: string;
//     role: string;
//   };
};

export type AppActions = {
  setRegistrationResponse: (data: RegistrationResponse) => void;
  setForceRegistryResponse : (data : ForceRegistry) => void;
  setRegistryCodeResponse : (data : RegistryCode) => void;
  setOpen : (data : boolean) => void;
  setErrors: (errors: Record<string, string>) => void;
//   setCurrentUser: (currentUser: {
//     buildCode: string;
//     currentUser: string;
//     role: string;
//   }) => void;
};

export const useAppStore = create<AppState & AppActions>((set) => ({
  registrationResponse: undefined,
  forceRegistryResponse: undefined,
  registryCodeResponse: undefined,
  open: undefined,
  errors: {},
  setRegistrationResponse: (data) =>
    set({ registrationResponse: data }),

  setForceRegistryResponse: (data) =>
    set({ forceRegistryResponse: data }),

  setRegistryCodeResponse: (data) =>
    set({ registryCodeResponse: data }),

  setOpen: (data) =>
    set({ open: data }),
  setErrors: (errors) =>
    set({ errors }),
}));