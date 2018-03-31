import { OrderFoodyAngularPage } from './app.po';

describe('order-foody-angular App', () => {
  let page: OrderFoodyAngularPage;

  beforeEach(() => {
    page = new OrderFoodyAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
