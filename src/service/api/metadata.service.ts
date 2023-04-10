import { API_URLS } from '../../constants';
import type { CodeName, Provider } from '../../core/models/link.dto';
import { ApiWrapper } from '../api-wrapper.service';

export const MetadataService = {
  getAllProviders(): Promise<CodeName<Provider>[]> {
    const url = API_URLS.METADATA.GET_PROVIDERS();
    return ApiWrapper.get(url);
  },
};

export default MetadataService;
