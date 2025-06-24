import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Runs before each test and open main page https://forestfire.ru
    await page.goto('/');
});

test('"Become volunteer" button on top opens volunteer application form', async ({ context, page }) => {

    const pagePromise = context.waitForEvent('page');

    await page.getByRole('link', { name: 'Стать волонтёром' }).last().locator("..").click();

    const volunteerApplicationPage = await pagePromise;

    await expect(volunteerApplicationPage).toHaveURL('https://pyrus.com/form/1556636');
});

test('"Provide suppot" button opens page with donation info (/support)', async ({ page }) => {
    
    await page.getByRole('link', { name: 'Поддержать нас' }).last().locator("..").click();

    await expect(page).toHaveURL('/support');
});

test('"Attend Ladoga Lake camp" button opens Ladoga application form', async ({ context, page }) => {

    const pagePromise = context.waitForEvent('page');

    await page.getByRole('link', { name: 'Записаться в Ладожский лагерь' }).locator("..").click();

    const ladogaCampApplicationPage = await pagePromise;

    await expect(ladogaCampApplicationPage).toHaveURL('https://pyrus.com/form/1018370');
});

test('"Learn about us" button opens /about-us page', async ({ page }) => {

    await page
    .locator('//div[@data-elem-type="button"]')
    .filter({ has: page.getByRole('link', { name: 'Немного о нас' }) })
    .click();

    // await page.getByRole('link', { name: 'Немного о нас' }).locator("..").click();

    await expect(page).toHaveURL('/about-us');
})

test('Check links in "What do we do?" section', async ({ page }) => {

    // await page.getByRole('link', { name: 'Просвещаем людей' }).click();
    // await expect(page).toHaveURL('/???');
    // await page.goto('/');
    
    await page.getByRole('link', { name: 'Боремся с огнём' }).click();
    await expect(page).toHaveURL('/fires');
    await page.goto('/');

    await page.getByRole('link', { name: 'Развиваем добровольчество' }).click();
    await expect(page).toHaveURL('/volunteers');
})

test('"Learn more" button opens /volunteers page', async ({ page }) => {

    await page
    .locator('//div[@data-elem-type="button"]')
    .filter({ has: page.getByRole('link', { name: 'Узнать больше' }) })
    .click();

    await expect(page).toHaveURL('/volunteers');
})

test('"Fill application" button opens volunteer application form', async ({ context, page }) => {

    const pagePromise = context.waitForEvent('page');

    await page
    .locator('//div[@data-elem-type="button"]')
    .filter({ has: page.getByRole('link', { name: 'Заполнить анкету' }) })
    .click();

    const volunteerApplicationPage = await pagePromise;

    await expect(volunteerApplicationPage).toHaveURL('https://pyrus.com/form/1556636');
})

test('Check social media link: VK', async ({ context, page }) => {

    const pagePromise = context.waitForEvent('page');

    await page
    .getByRole('link')
    .filter({ has: page.locator('//img[@src="https://static.tildacdn.com/tild3266-3031-4166-a630-303161613738/Group_24.svg"]') })
    .click();

    const VKPage = await pagePromise;

    await expect(VKPage).toHaveURL('https://vk.com/forestfire_ru');

})

test('Check social media link: Telegram', async ({ context, page }) => {

    const pagePromise = context.waitForEvent('page');

    await page
    .getByRole('link')
    .filter({ has: page.locator('//img[@src="https://static.tildacdn.com/tild3631-6633-4138-a432-393138653238/Group_23.svg"]') })
    .click();

    const TelegamChannel = await pagePromise;

    await expect(TelegamChannel).toHaveURL('https://t.me/forestfireru');

})

test('"News archive" button opens /news page', async ({ page }) => {

    await page
    .locator('//div[@data-elem-type="button"]')
    .filter({ has: page.getByRole('link', { name: 'Архив новостей' }) })
    .first()
    .click();

    await expect(page).toHaveURL('/news');
})

test('Check "Ask question" form', async ({ page }) => {

    await page.getByRole('button', { name: 'Задать вопрос' }).click();

    await expect(page.getByPlaceholder('Имя')).toBeEditable();
    await expect(page.getByPlaceholder('e-mail')).toBeEditable();
    await expect(page.getByPlaceholder('Ваш вопрос')).toBeEditable();
    await expect(page.getByRole('checkbox')).toBeChecked();
    await expect(page.getByRole('button', { name: 'Отправить'})).toBeEnabled();
    
    await page.getByLabel('Закрыть диалоговое окно').click();

    await expect(page).toHaveURL('/');
})
