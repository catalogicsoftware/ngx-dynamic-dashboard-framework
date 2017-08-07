import { NgADFPage } from './app.po';

describe('ng-adf App', () => {
  let page: NgADFPage;

  beforeEach(() => {
    page = new NgADFPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
