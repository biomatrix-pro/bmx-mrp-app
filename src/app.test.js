/* eslint-env jest jest-puppeteer */
// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from './app'

import puppeteer from 'puppeteer'
// import faker from 'faker'

/*
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
*/
let browser
let page
const width = 1920
const height = 1080

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  })
  page = await browser.newPage()
  await page.setViewport({ width, height })
})

afterAll(() => {
  browser.close()
})

describe('Google', () => {
  it('should display "google" text on page', async () => {
    await page.goto('https://google.com')
    await expect(await page.title()).toMatch('oogle')
  })
})
