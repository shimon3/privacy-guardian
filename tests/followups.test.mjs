import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {execFileSync} from 'node:child_process';
const html=readFileSync(new URL('../site/index.html',import.meta.url),'utf8');
test('Follow-up interface is wired',()=>{assert.match(html,/id="followupList"/);assert.match(html,/src="\/followups.js"/)});
test('Follow-up Javascript syntax',()=>{execFileSync(process.execPath,['--check',new URL('../site/followups.js',import.meta.url).pathname])});
test('No outbound request or automatic sending',()=>{const js=readFileSync(new URL('../site/followups.js',import.meta.url),'utf8');assert.doesNotMatch(js,/\bfetch\s*\(|XMLHttpRequest|sendBeacon|\.send\s*\(/)});

test('Export includes follow-up dates',()=>{const js=readFileSync(new URL('../site/app.js',import.meta.url),'utf8');assert.match(js,/format:'privacy-guardian-v2'/);assert.match(js,/followups:cleanDates\(readDates\(\),cases\)/)});
test('Old v1 backups remain importable',()=>{const js=readFileSync(new URL('../site/app.js',import.meta.url),'utf8');assert.match(js,/\['privacy-guardian-v1','privacy-guardian-v2'\]/)});
test('Application syntax remains valid',()=>{execFileSync(process.execPath,['--check',new URL('../site/app.js',import.meta.url).pathname])});
