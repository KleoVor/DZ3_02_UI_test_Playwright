import { test, expect } from '@playwright/test';
import userData from './user.js'; // Импорт данных логина и пароля
const faker = require('faker');



import * as path from 'path';

const screenshotFolder = path.join(process.cwd(), 'screenshots');

test('Successful authorization', async ({ page }) => {
  await page.goto('https://netology.ru/');
 // await expect(page.getByTestId('cookies-module')).toBeVisible();
//  await page.getByTestId('cookies-submit-btn').click();
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(userData.email); // Используем email из файла use.js
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(userData.password); // Используем пароль из файла use.js
  await page.getByTestId('login-submit-btn').click();
  await page.waitForLoadState('load');
  await expect(page.locator('h2')).toContainText('Моё обучение');
});

test('unsuccessful authorization', async ({ page }) => {
  await page.goto('https://netology.ru/');
  await page.screenshot({ path: '${screenshotFolder}/OpenSite.png' });

//  await page.getByTestId('cookies-submit-btn').click();

  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByPlaceholder('Email').click();
  await page.screenshot({ path: '${screenshotFolder}/Int.png' });

  await page.getByPlaceholder('Email').fill(faker.internet.email());
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(faker.internet.password());
  await page.screenshot({ path: '${screenshotFolder}/pass.png' });

  await page.getByTestId('login-submit-btn').click();
  
  await expect(page.getByTestId('login-error-hint')).toContainText('Вы ввели неправильно логин или пароль');
  await page.screenshot({ path: '${screenshotFolder}/Error.png' });
});