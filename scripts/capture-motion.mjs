import { chromium } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../docs/motion-demo')
fs.mkdirSync(outDir, { recursive: true })

// clean old webms
for (const f of fs.readdirSync(outDir)) {
  if (f.endsWith('.webm')) fs.unlinkSync(path.join(outDir, f))
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  recordVideo: { dir: outDir, size: { width: 1440, height: 900 } },
})
const page = await context.newPage()

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForSelector('#home-hero-heading', { timeout: 15000 })
await page.waitForTimeout(2800)

await page.screenshot({ path: path.join(outDir, 'hero-still.png'), fullPage: false })

const heroText = await page.locator('#home-hero-heading').innerText()
const eyebrow = await page.locator('text=Living Blueprint').count()
console.log('Hero heading:', heroText.slice(0, 80))
console.log('Living Blueprint eyebrow count:', eyebrow)

await page.mouse.move(980, 360)
await page.waitForTimeout(500)
await page.mouse.move(1180, 280)
await page.waitForTimeout(700)
await page.mouse.move(1050, 520)
await page.waitForTimeout(900)

await page.locator('#process-heading').scrollIntoViewIfNeeded()
await page.waitForTimeout(2000)
await page.mouse.wheel(0, 320)
await page.waitForTimeout(1800)

await page.screenshot({ path: path.join(outDir, 'process-still.png'), fullPage: false })

const processEyebrow = await page.locator('text=Process · Blueprint').count()
console.log('Process blueprint eyebrow count:', processEyebrow)

await context.close()
await browser.close()

const webm = fs.readdirSync(outDir).find((f) => f.endsWith('.webm'))
if (webm) {
  fs.renameSync(path.join(outDir, webm), path.join(outDir, 'living-blueprint-demo.webm'))
  console.log('Wrote docs/motion-demo/living-blueprint-demo.webm')
}
ls()
function ls() {
  for (const f of fs.readdirSync(outDir)) {
    const s = fs.statSync(path.join(outDir, f))
    console.log(f, s.size)
  }
}
