'use strict';
(() => {
 const $ = id => document.getElementById(id);
 const storageKey = 'privacy-guardian-cases-v1';
 const make = (tag, text) => { const e=document.createElement(tag); if(text!==undefined)e.textContent=text; return e; };
 const clean = raw => {try {const u=new URL(raw); if(u.protocol!=='https:'||u.username||u.password||u.href.length>2048)return null;return u.href;}catch{return null;}};
 const queries=[['Nom exact',q=>'"'+q+'"'],['Annuaires',q=>'"'+q+'" (annuaire OR profil OR directory)'],['PDF publics',q=>'"'+q+'" filetype:pdf']];
 let matches=[];
 const row=$('scanQueries');
 for(const [title,query] of queries){const b=make('button',title+' ↗');b.type='button';b.onclick=()=>{const q=$('scanIdentity').value.trim();if(q.length<3){$('scanSummary').textContent='Saisissez au moins trois caractères.';return;}window.open('https://www.google.com/search?q='+encodeURIComponent(query(q)),'_blank','noopener,noreferrer');};row.append(b);}
 const bing=make('button','Bing ↗');bing.type='button';bing.onclick=()=>{const q=$('scanIdentity').value.trim();if(q.length<3){$('scanSummary').textContent='Saisissez au moins trois caractères.';return;}window.open('https://www.bing.com/search?q='+encodeURIComponent('"'+q+'"'),'_blank','noopener,noreferrer');};row.append(bing);
 function render(){
  const box=$('scanResults');box.replaceChildren();
  for(const href of matches){
   const item=make('div');item.className='case';
   const left=make('div');const a=make('a',href);a.href=href;a.target='_blank';a.rel='noopener noreferrer';left.append(a);
   const buttons=make('div');buttons.className='case-actions';
   const check=make('button','Vérifier la page ↗');check.type='button';check.onclick=()=>window.open(href,'_blank','noopener,noreferrer');
   const add=make('button','Ajouter au suivi');add.type='button';add.onclick=()=>{
    const records=JSON.parse(localStorage.getItem(storageKey)||'[]');
    if(!Array.isArray(records))return;
    if(records.some(x=>x.url===href)){$('scanSummary').textContent='Ce lien est déjà suivi.';return;}
    records.push({id:crypto.randomUUID(),site:new URL(href).hostname,url:href,kind:'Profil public',contact:'',notes:'Lien candidat issu du scan assisté ; présence de données personnelles à vérifier.',status:'identified'});
    try{localStorage.setItem(storageKey,JSON.stringify(records));$('scanSummary').textContent='Lien ajouté. Rechargez la page pour actualiser le tableau de bord.';}catch{$('scanSummary').textContent='Impossible de sauvegarder.';}
   };
   buttons.append(check,add);item.append(left,buttons);box.append(item);
  }
 }
 $('scanAnalyze').onclick=()=>{
  const input=$('scanPaste').value;
  const urls=input.match(/https:\/\/[^\s<>"']+/g)||[];
  const existing=new Set((()=>{try{return JSON.parse(localStorage.getItem(storageKey)||'[]').map(x=>x.url);}catch{return [];}})());
  const unique=[...new Set(urls.map(x=>x.replace(/[),.;]+$/,'')).map(clean).filter(Boolean))];
  matches=unique.filter(x=>!existing.has(x)).slice(0,100);
  $('scanSummary').textContent=matches.length+' lien(s) HTTPS candidat(s) non encore suivis. Aucune présence de données personnelles n’est confirmée par cette analyse.';
  render();
 };
 $('scanReset').onclick=()=>{matches=[];$('scanPaste').value='';$('scanSummary').textContent='';render();};
 const hibp=$('hibpOpen');if(hibp)hibp.onclick=()=>window.open('https://haveibeenpwned.com/','_blank','noopener,noreferrer');
})();