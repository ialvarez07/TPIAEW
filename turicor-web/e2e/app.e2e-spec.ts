import { TuricorWebPage } from './app.po';

describe('turicor-web App', () => {
  let page: TuricorWebPage;

  beforeEach(() => {
    page = new TuricorWebPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
