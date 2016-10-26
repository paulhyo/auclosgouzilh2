import { Auclosgouzilh2Page } from './app.po';

describe('auclosgouzilh2 App', function() {
  let page: Auclosgouzilh2Page;

  beforeEach(() => {
    page = new Auclosgouzilh2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
