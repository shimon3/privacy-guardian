import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {execFileSync} from 'node:child_process';
const base=new URL('../site/',import.meta.url);
test('Evidence interface connected',()=>{const h=readFileSync(new URL('index.html',base),'utf8');assert.match(h,/id="evidenceList"/);assert.match(h,/src="\/evidence.js"/)});
test('Client scripts parse',()=>{for(const f of ['app.js','evidence.js'])execFileSync(process.execPath,['--check',new URL(f,base).pathname])});
test('Versioned evidence backup',()=>{const s=readFileSync(new URL('app.js',base),'utf8');assert.match(s,/format:'privacy-guardian-v3'/);assert.match(s,/evidence:cleanEvidence/);assert.match(s,/cleanEvidence\(x.evidence,x.cases\)/)});
test('No automatic network send',()=>{const s=readFileSync(new URL('evidence.js',base),'utf8');assert.doesNotMatch(s,/\bfetch\s*\(|XMLHttpRequest|sendBeacon/)});
