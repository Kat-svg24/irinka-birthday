const $=s=>document.querySelector(s);
const music=$('#birthdayMusic');
// Chorus cue confirmed by the user.
const CHORUS_START=0;
let musicStarted=false;
function stopVolumeFade(){}
function fadeMusicIn(){}
function chime(){} // Do not layer synthesized tones over the chosen song.
function updateSound(){const playing=!music.paused;$('#sound').textContent=playing?'Музыка выкл. ♫':'Музыка вкл. ♫';$('#sound').setAttribute('aria-pressed',String(playing));}
async function startMusic(){if(CHORUS_START===null)return;if(!musicStarted){music.currentTime=CHORUS_START;musicStarted=true;}try{await music.play();}catch(e){console.info('Playback awaits user gesture');}updateSound();}
$('#sound').onclick=()=>{if(!music.paused){music.pause();updateSound();}else startMusic();};
music.addEventListener('ended',updateSound);
music.addEventListener('pause',stopVolumeFade);
$('#reveal').onclick=()=>{$('#hero').classList.add('revealed');startMusic();if(innerWidth<701)document.querySelector('.portrait-wrap').scrollIntoView({behavior:'smooth',block:'center'});$('#reveal').innerHTML='Конечно, ты. Ирина! <span>♥</span>';chime(523.25)};const wishes=[['Место для счастья','Пусть в твоей жизни будет много любви. Такой, в которой есть забота, смех, объятия — и достаточно места для всех твоих любимых вещей.','love'],['Красиво жить','Пусть вокруг будет красиво, дома — уютно, а в планах всегда найдётся место тому, что давно хочется. И пусть на все эти желания хватает возможностей.','style'],['За новым поворотом','Пусть впереди будут дороги, от которых захватывает дух, города, в которые хочется вернуться, и люди, с которыми хорошо идти рядом.','travel'],['Момент для себя','Желаю чаще выбирать себя: отдыхать без чувства вины, наслаждаться моментом и оставлять в каждом дне место для маленьких удовольствий.','moment']];let opened=new Set;document.querySelectorAll('.card').forEach(b=>b.onclick=()=>{let n=Number(b.dataset.n),w=wishes[n];$('#modalTitle').textContent=w[0];$('#modalText').textContent=w[1];$('#modalImg').src='assets/'+w[2]+'.jpg';$('#modal').showModal();opened.add(n);b.classList.add('opened');$('#counter').textContent='Открыто пожеланий: '+opened.size+' из 4';chime(440)});document.querySelectorAll('.close,.close-text').forEach(b=>b.onclick=()=>$('#modal').close());$('#modal').onclick=e=>{if(e.target===$('#modal')){let r=$('#modal').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('#modal').close()}};function confetti(){
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const host=$('#confetti'),colors=['#edc66f','#f1d9aa','#d36189','#fff0d6','#bc6d8b'];
 const count=innerWidth<701?180:240;
 for(let i=0;i<count;i++){
  const p=document.createElement('i'),burst=i<80,side=i%2;
  p.className='particle '+(burst?'burst':'shower');
  const size=10+Math.random()*13;
  p.style.width=size+'px';p.style.height=(i%4===0?size:size*.52)+'px';
  p.style.background=colors[i%colors.length];
  p.style.borderRadius=i%5===0?'50%':'2px';
  p.style.animationDuration=(4.8+Math.random()*2.6)+'s';
  p.style.animationDelay=(burst?Math.random()*.6:Math.random()*2)+'s';
  if(burst){
   p.style.left=side?'98%':'2%';p.style.top='70%';
   p.style.setProperty('--dx',((side?-1:1)*(80+Math.random()*innerWidth*.68))+'px');
   p.style.setProperty('--rise',(-150-Math.random()*innerHeight*.55)+'px');
  }else{p.style.left=Math.random()*100+'%';p.style.top='-35px';p.style.setProperty('--drift',(-130+Math.random()*260)+'px');}
  p.style.setProperty('--spin',(360+Math.random()*1080)+'deg');
  host.append(p);setTimeout(()=>p.remove(),10500);
 }
 for(let side=0;side<2;side++){
  const pop=document.createElement('span');pop.className='party-popper';pop.textContent='🎉';
  pop.style.left=side?'auto':'3%';pop.style.right=side?'3%':'auto';host.append(pop);setTimeout(()=>pop.remove(),2100);
 }
}$('#candle').onclick=()=>{if($('#candle').classList.contains('out'))return;$('#candle').classList.add('out');$('#wishText').textContent='Пусть сбудется. И пусть окажется ещё прекраснее, чем ты представляла.';$('#again').hidden=false;chime(659.25);confetti()};$('#again').onclick=()=>{$('#candle').classList.remove('out');$('#wishText').textContent='Ещё одно желание? Сегодня можно.';$('#again').hidden=true};$('#celebrate').onclick=()=>{confetti();chime(523.25);$('#finalText').textContent='И пусть поводов сиять будет гораздо больше, чем один день в году.'};document.addEventListener('visibilitychange',()=>{if(document.hidden){music.pause();updateSound();}});
