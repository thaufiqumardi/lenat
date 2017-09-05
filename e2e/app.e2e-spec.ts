import { Apatv3Page } from './app.po';

describe('apatv3 App', () => {
  let page: Apatv3Page;

  beforeEach(() => {
    page = new Apatv3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
