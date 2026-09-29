import { create } from 'zustand';
import type {MigrateStatusResponse, RegistrationResponse} from '../../services/nmsregistry.service'
import type { ForceRegistry,RegistryCode } from '../../services/nmsregistry.service';


export type AppState = {
  registrationResponse?: RegistrationResponse;
  forceRegistryResponse?: ForceRegistry;
  registryCodeResponse?: RegistryCode;
  open?:boolean;
  errors: Record<string, string>;
  hasDb: boolean;
  noDb: boolean;
  showUploadPopup: boolean;
  selectedFile: File | null;
  migrationStatus?: MigrateStatusResponse;
};

export type AppActions = {
  setRegistrationResponse: (data: RegistrationResponse) => void;
  setForceRegistryResponse : (data : ForceRegistry) => void;
  setRegistryCodeResponse : (data : RegistryCode) => void;
  setOpen : (data : boolean) => void;
  setErrors: (errors: Record<string, string>) => void;
  setHasDb: (data: boolean) => void;
  setNoDb: (data: boolean) => void;
  setShowUploadPopup: (data: boolean) => void;
  setSelectedFile: (data: File | null) => void;
  setMigrationStatus: (data: MigrateStatusResponse) => void;
};

export const useAppStore = create<AppState & AppActions>((set) => ({
  registrationResponse: undefined,
  forceRegistryResponse: undefined,
  registryCodeResponse: undefined,
  open: undefined,
  errors: {},
  hasDb: false,
  noDb: false,
  showUploadPopup: false,
  selectedFile: null,
  migrationStatus: undefined, 
  
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
  setHasDb: (data) =>
    set({ hasDb: data }),

  setNoDb: (data) =>
    set({ noDb: data }),

  setShowUploadPopup: (data) =>
    set({ showUploadPopup: data }),

  setSelectedFile: (data) =>
    set({ selectedFile: data }),
    setMigrationStatus: (data) =>
    set({ migrationStatus: data }),
}));