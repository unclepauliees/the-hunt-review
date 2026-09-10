import puppeteer from 'puppeteer-core';
import { mkdirSync, writeFileSync } from 'node:fs';

const out = '.impeccable/review/revised-direction';
mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
const results = [];
try {
  for (const [name, width, height, mobile] of [['desktop',1440,1000,false], ['mobile',390,844,true]]) {
    const page = await browser.newPage();
    await page.setViewport({width,height,deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile});
    const errors=[];
    page.on('pageerror', error=>errors.push(error.message));
    await page.goto('http://127.0.0.1:5174/', {waitUntil:'networkidle0'});
    await page.mouse.move(0,0);
    const settle=()=>new Promise(r=>setTimeout(r,750));
    await settle();
    const result={name,errors,sections:await page.$$eval('[data-act-index]',els=>els.length), galleries:[],overflow:[]};
    const ids=await page.$$eval('[data-act-index]',els=>els.map(el=>el.id));
    for (const id of ids) {
      await page.evaluate(id=>document.getElementById(id).scrollIntoView(),id);
      await settle();
      const dimensions=await page.evaluate(id=>{
        const section=document.getElementById(id);
        return [...section.querySelectorAll('h2,h3,.stamp-label,.act-copy p')].filter(el=>{
          const r=el.getBoundingClientRect(); const css=getComputedStyle(el);
          return css.visibility!=='hidden' && r.width>0 && (r.right>innerWidth+2 || r.left< -2 || el.scrollWidth>el.clientWidth+3);
        }).map(el=>el.textContent);
      },id);
      if(dimensions.length) result.overflow.push({id,dimensions});
      if(['cover','guest-flow','activations','library','hero-props','keyart-close'].includes(id)) await page.screenshot({path:`${out}/${name}-${id}.png`});
      const isGallery=await page.$(`#${id}.revised-gallery`);
      if(!isGallery) continue;
      const count=await page.$$eval(`#${id} .stamp`,els=>els.length);
      const last=await page.$(`#${id} .stamp:last-child`);
      await last.click(); await settle();
      const selected=await page.$$eval(`#${id} .elastic-item`,els=>els.findIndex(el=>el.classList.contains('is-active')));
      const labelsVisible=await page.$$eval(`#${id} .stamp-label`,els=>els.every(el=>{const r=el.getBoundingClientRect(); return r.width>5&&r.height>5&&r.bottom<=innerHeight+2;}));
      await page.click(`#${id} .elastic-item.is-active .elastic-cue`);
      await page.waitForSelector('[role=dialog]');
      const imageLoaded=await page.$eval('[role=dialog] img',el=>el.complete&&el.naturalWidth>0);
      await page.keyboard.press('Escape');
      await page.waitForSelector('[role=dialog]',{hidden:true});
      await page.mouse.move(0,0);
      await page.evaluate(id=>{const el=document.getElementById(id);scrollTo(0,el.offsetTop+(el.offsetHeight-innerHeight)*.55);},id);
      await settle();
      const pinned=await page.$eval(`#${id} .gallery-sticky-stage`,el=>Math.abs(el.getBoundingClientRect().top)<2);
      result.galleries.push({id,count,selected,labelsVisible,imageLoaded,pinned});
    }
    result.brokenImages=await page.$$eval('img',els=>els.filter(el=>!el.complete||!el.naturalWidth).length);
    results.push(result);
    await page.close();
  }
} finally { await browser.close(); }
writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
