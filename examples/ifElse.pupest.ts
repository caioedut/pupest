import pupest from '../src';

pupest() //
  .ifElse(
    async ({ scope }) => {
      return scope.evaluate(() => {
        return Date.now() % 2 === 0;
      });
    },
    async ({ page }) => {
      page.evaluate(() => {
        document.title = 'Even';
      });
    },
    async ({ page }) => {
      page.evaluate(() => {
        document.title = 'Odd';
      });
    },
  )
  .wait(1000)
  .test('[ifElse] Check if current date is ODD or EVEN');
