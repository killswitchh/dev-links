import { Provider } from '@prisma/client';
import type { CodeName } from '../../core/models/link.dto';
import { convertToName } from '../../core/utils/utils';

export const MetadataService = {
  async getAllProviders(): Promise<CodeName<Provider>[]> {
    const providers: Provider[] = Object.values(Provider);
    const providerCodeName: CodeName<Provider>[] = [];
    let index = 0;
    providers.map((x) => {
      providerCodeName.push({ code: x, name: convertToName(x) as string, index });
      index = index + 1;
    });
    return providerCodeName;
  },
};

export default MetadataService;
