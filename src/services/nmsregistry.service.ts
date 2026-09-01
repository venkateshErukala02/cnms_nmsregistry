import BaseService from './base.service';


export type RegistrationResponse = {
  success: boolean;
  message: string;
  uuid: string | null;
  name?: string;
  location?: string;
  license?: string;
  lastverifiedat?: string;
};

export type ForceRegistry = {
    message: string,
    success: boolean,
    uuid: string
};

export type ForceRegistryPayload = {
  name: string;
  location: string;
  license: string;
};

export type RegistryCode = string;

export class ServerService extends BaseService {
  constructor() {
    super();
  }
  async getServerStats() {
    // const response = await this.get('./registry/verify');
    const response = await this.get('http://192.168.66.166:8081/nms/registry/verify');
    return response.data as RegistrationResponse;
  }


        async CreateForceRegistry(payload: ForceRegistryPayload) {
          const response = await this.post(
            'http://192.168.66.166:8081/nms/registry/force-register',
            payload
          );

          return response.data as ForceRegistry;
        }

         async getRegistryCode(code: string): Promise<RegistryCode>  {
          const response = await this.post(
            `http://192.168.66.166:8081/nms/registry/registryCode?code=${code}`,
          );

          return response.data as RegistryCode;
        }
}
