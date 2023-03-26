import type { Page } from '../../core/models/page.dto'

export const PageService = {
  getUserPages(userId: string): Promise<Page[]> {
    console.log('fetching pages for user', userId)
    const mockPage: Page = {
      id: 'TESTID',
      name: 'TEST_NAME',
      createdTs: new Date(),
      updatedTs: new Date(),
      ownerId: 'string',
        active: true,
      underCreation: true,
    }
    return Promise.resolve([mockPage, mockPage])
    // const url = API_URLS.GET_PAGES_URL(userId);
    // return ApiWrapper.get(url);
  },
}

export default PageService
