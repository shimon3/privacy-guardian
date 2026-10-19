import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {execFileSync} from 'node:child_process';
const site=new URL('../site/',import.meta.url);
test('Directory is connected to page',()=>{const html=readFileSync(new URL('index.html',site),'utf8');assert.match(html,/id="directoryList"/);assert.match(html,/src="\/directory.js"/)});
test('Directory JavaScript parses',()=>{execFileSync(process.execPath,['--check',new URL('directory.js',site).pathname])});
test('Directory uses safe static external links',()=>{const js=readFileSync(new URL('directory.js',site),'utf8');assert.match(js,/noopener noreferrer/);assert.doesNotMatch(js,/\bfetch\s*\(|XMLHttpRequest/);});
