const $=(id)=>document.getElementById(id);

const fixed=$('fixedCost'), gpu=$('gpuCost'), saving=$('savingRate'), volume=$('volume');
function fmtB(n){return `${n<0?'−':''}$${Math.abs(n).toFixed(1)}B`}
function fmtK(n){return `${n.toLocaleString()}k`}
function updateEconomics(){
  const f=+fixed.value*1e9;
  const g=+gpu.value*1000;
  const s=+saving.value/100;
  const savingPer=g*s;
  const be=savingPer>0?f/savingPer:0;
  const deployed=+volume.value*1000;
  const generated=deployed*savingPer/1e9;
  const net=generated-(+fixed.value);
  const diff=deployed-be;
  $('fixedOut').textContent=`$${(+fixed.value).toFixed(1)}B`;
  $('gpuOut').textContent=`$${gpu.value}k`;
  $('savingOut').textContent=`${saving.value}%`;
  $('volumeOut').textContent=`${volume.value}k`;
  $('breakEven').textContent=`${Math.round(be).toLocaleString()} chips`;
  $('formulaText').textContent=`$${(+fixed.value).toFixed(1)}B ÷ $${Math.round(savingPer/1000)}k`;
  $('savingPerChipCalc').textContent=`$${gpu.value}k × ${saving.value}% = $${Math.round(savingPer/1000)}k`;
  $('breakEvenCalc').textContent=`$${(+fixed.value).toFixed(1)}B ÷ $${Math.round(savingPer/1000)}k = ${Math.round(be).toLocaleString()} chips`;
  $('generatedSavings').textContent=fmtB(generated);
  $('netResult').textContent=`${net>=0?'+':'−'}$${Math.abs(net).toFixed(1)}B`;
  $('marginResult').textContent=`${diff>=0?'+':'−'}${Math.abs(diff/1000).toFixed(0)}k chips`;
  const badge=$('statusBadge'); badge.textContent=deployed>=be?'PROGRAM POSITIVE':'BELOW BREAK-EVEN'; badge.className=`status ${deployed>=be?'positive':'negative'}`;
  const thresholdPct=Math.min(100,be/600000*100);
  $('thresholdLine').style.bottom=`${thresholdPct}%`;
  $('thresholdLabel').textContent=`${Math.round(be/1000)}k threshold`;
  const vPct=+volume.value/600*100;
  $('customBar').style.height=`${Math.min(100,vPct)}%`;
  $('volumeMarker').style.bottom=`${Math.min(100,vPct)}%`;
  $('volumeMarker').style.left=`${Math.min(96,vPct)}%`;
  $('volumeMarkerLabel').textContent=`${volume.value}k deployed`;
}
[fixed,gpu,saving,volume].forEach(el=>el.addEventListener('input',updateEconomics));
const presets={
  pessimistic:[3,50,20,80],likely:[3,50,40,250],optimistic:[3,50,50,500],rainier:[3,50,40,500]
};
document.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>{
 document.querySelectorAll('[data-preset]').forEach(x=>x.classList.remove('active')); b.classList.add('active');
 const p=presets[b.dataset.preset]; [fixed.value,gpu.value,saving.value,volume.value]=p; updateEconomics();
}));
updateEconomics();

const strategyData={
 nvidia:{why:"Nvidia guarantees the most mature ecosystem and immediate performance, but supply risk and margin cost remain concentrated.",risk:"−$4B under a supply squeeze",rule:"Use as the performance and hedge track"},
 dual:{why:"Nvidia protects immediate performance while an anchor customer resolves demand uncertainty and lowers break-even risk.",risk:"−$3B if the chip fails",rule:"Scale only after gates pass"},
 custom:{why:"All-in custom can win with high adoption, but it concentrates technical, market and ecosystem risk in one strategy.",risk:"−$12B if the chip fails",rule:"Avoid unless Tail risk is acceptable"}
};
document.querySelectorAll('.strategy-card').forEach(card=>card.addEventListener('click',()=>{
 document.querySelectorAll('.strategy-card').forEach(c=>c.classList.remove('selected')); card.classList.add('selected');
 const d=strategyData[card.dataset.strategy]; const detail=$('strategyDetail');
 detail.children[0].querySelector('p').textContent=d.why;
 detail.children[1].querySelector('strong').textContent=d.risk;
 detail.children[2].querySelector('strong').textContent=d.rule;
}));

document.querySelectorAll('.mini-radar').forEach(radar=>{const vals=radar.dataset.values.split(',').map(Number);radar.querySelectorAll('i').forEach((bar,i)=>bar.style.height=`${vals[i]*.55}px`)});

const works=$('worksProb'), adoption=$('adoptionProb');
function updateTree(){
 const w=+works.value/100,h=+adoption.value/100,l=1-h;
 const dual=w*(h*8+l*1)+(1-w)*-3;
 const custom=w*(h*10+l*-4)+(1-w)*-12;
 const nvidia=-2;
 $('worksOut').textContent=`${works.value}%`;$('adoptionOut').textContent=`${adoption.value}%`;
 $('worksLabel').textContent=`${works.value}%`; $('failsLabel').textContent=`${100-works.value}%`;
 $('highLabel').textContent=`${adoption.value}%`; $('lowLabel').textContent=`${100-adoption.value}%`;
 $('nvidiaEV').textContent=`EV ${nvidia<0?'−':'+'}$${Math.abs(nvidia).toFixed(2)}B`;
 $('dualEV').textContent=`EV ${dual<0?'−':'+'}$${Math.abs(dual).toFixed(2)}B`;
 $('customEV').textContent=`EV ${custom<0?'−':'+'}$${Math.abs(custom).toFixed(2)}B`;
 $('cardNvidiaEV').textContent=`${nvidia<0?'−':'+'}$${Math.abs(nvidia).toFixed(2)}B`;
 $('cardDualEV').textContent=`${dual<0?'−':'+'}$${Math.abs(dual).toFixed(2)}B`;
 $('cardCustomEV').textContent=`${custom<0?'−':'+'}$${Math.abs(custom).toFixed(2)}B`;
 $('customWorksLabel').textContent=`${works.value}%`;
 $('customFailsLabel').textContent=`${100-works.value}%`;
 $('customHighLabel').textContent=`${adoption.value}%`;
 $('customLowLabel').textContent=`${100-adoption.value}%`;
 document.querySelectorAll('.tree-strategy').forEach(c=>c.classList.remove('winner')); document.querySelector('.dual-tree').classList.add('winner');
 if(custom>dual&&custom>nvidia)document.querySelector('.custom-tree').classList.add('winner');
 if(nvidia>dual&&nvidia>custom)document.querySelector('.nvidia-tree').classList.add('winner');
 const largeCapacity=h*8+l*-2;
 const smallCapacity=h*3+l*1;
 const bestWithoutSignal=Math.max(largeCapacity,smallCapacity);
 const perfect=h*8+l*1;
 const information=perfect-bestWithoutSignal;
 $('withoutInfo').textContent=`${bestWithoutSignal<0?'−':'+'}$${Math.abs(bestWithoutSignal).toFixed(2)}B`;
 $('withoutInfoLabel').textContent=`BEST SCALE CHOICE, NO SIGNAL · ${largeCapacity>=smallCapacity?'LARGE':'SMALL'}`;
 $('withInfo').textContent=`+$${perfect.toFixed(2)}B`;
 $('voiValue').textContent=`+$${Math.max(0,information).toFixed(2)}B`;
}
[works,adoption].forEach(el=>el.addEventListener('input',updateTree));
$('resetTree').addEventListener('click',()=>{works.value=75;adoption.value=60;updateTree()});updateTree();

$('optionToggle').addEventListener('click',()=>{$('flexibleView').classList.toggle('revealed');$('optionToggle').querySelector('strong').textContent=$('flexibleView').classList.contains('revealed')?'HIDE FLEXIBILITY':'REVEAL FLEXIBILITY'});

document.querySelectorAll('.gates button').forEach(button=>button.addEventListener('click',()=>{button.classList.toggle('checked');const span=button.closest('article').querySelector(':scope > span');span.textContent=button.classList.contains('checked')?'Met':'Open';span.style.color=button.classList.contains('checked')?'#63d2a1':'#9aa7ba'}));

const sections=[...document.querySelectorAll('main section')];
const links=[...document.querySelectorAll('.nav-link')];
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')===`#${entry.target.id}`))}})},{rootMargin:'-35% 0px -55% 0px'});sections.forEach(s=>observer.observe(s));
