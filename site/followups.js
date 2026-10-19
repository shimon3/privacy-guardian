'use strict';
(() => {
 const KEY='privacy-guardian-cases-v1', DATES='privacy-guardian-followups-v1';
 const root=document.getElementById('followupList');
 if(!root)return;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 const parse=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch{return fallback}};
 const iso=s=>/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s+'T00:00:00Z'));
 const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
 const daysAfter=(start,n)=>{const d=new Date(start+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
 function render(){
  const cases=parse(KEY,[]),dates=parse(DATES,{});root.replaceChildren();
  if(!Array.isArray(cases)||!cases.length){root.append(el('p','Ajoutez une exposition pour planifier une relance.'));return}
  const active=cases.filter(c=>c&&typeof c.id==='string'&&!['removed'].includes(c.status));
  if(!active.length){root.append(el('p','Aucune demande active à relancer.'));return}
  for(const c of active){
   const state=dates[c.id]||{},wrap=el('article'),fields=el('div'),actions=el('div');
   wrap.className='case';fields.className='followup-fields';actions.className='case-actions';
   const title=el('strong',(c.site||'Site')+' — '+({identified:'Repéré',prepared:'Préparé',sent:'Envoyé',waiting:'En attente',rejected:'Refusé'}[c.status]||c.status));wrap.append(title);
   const sent=el('input'),due=el('input');sent.type='date';due.type='date';sent.value=iso(state.sent||'')?state.sent:'';due.value=iso(state.due||'')?state.due:'';
   sent.setAttribute('aria-label','Date d’envoi pour '+c.site);due.setAttribute('aria-label','Date de relance pour '+c.site);
   const dateLabel=el('label','Date d’envoi'),dueLabel=el('label','Relance prévue');dateLabel.append(sent);dueLabel.append(due);fields.append(dateLabel,dueLabel);
   const suggest=el('button','Relance à +30 jours');suggest.type='button';suggest.onclick=()=>{if(!sent.value)sent.value=today();due.value=daysAfter(sent.value,30)};
   const save=el('button','Enregistrer les dates');save.type='button';save.className='primary';save.onclick=()=>{if((sent.value&&!iso(sent.value))||(due.value&&!iso(due.value))){alert('Dates invalides');return}const all=parse(DATES,{});all[c.id]={sent:sent.value,due:due.value};try{localStorage.setItem(DATES,JSON.stringify(all));render()}catch{alert('Stockage indisponible')}};
   actions.append(suggest,save);wrap.append(fields,actions);
   if(iso(state.due||'')){const note=el('p',state.due<=today()?'Relance à effectuer ou à vérifier.':'Prochaine relance : '+state.due);note.className='followup-note';wrap.append(note)}
   root.append(wrap)
  }
 }
 const css=el('style');css.textContent='.followup-fields{display:flex;flex-wrap:wrap;gap:12px}.followup-fields label{display:grid!important;gap:5px;min-width:150px}.followup-note{color:#a35a26!important;width:100%}';document.head.append(css);
 render();
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)render()});
 window.addEventListener('storage',render);
 window.addEventListener('privacy-guardian-updated',render);
 window.addEventListener('focus',render);
})();