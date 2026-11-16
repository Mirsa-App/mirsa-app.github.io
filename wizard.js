(function(){
var D={
ar:{t:"تثبيت مرسى",st:function(a,b){return "الخطوة "+a+" من "+b},st1:"الخطوة ١ — اختر الطريقة",pick:"اختر الطريقة",back:"رجوع",next:"التالي",done:"تمّ",close:"إغلاق",dl:"تحميل مرسى",dlS:"تحميل Setup",
m:[{n:"باستخدام الكمبيوتر",d:"Apple ID مجاني، 7 أيام",b:"موصى به"},{n:"على هذا الآيفون (iOS 27)",d:"بدون كمبيوتر، عبر Apple ID + LocalDevVPN على الواي فاي"},{n:"بالشهادة",d:"بدون الحاوية وبعض المزايا",b:"محدود",o:1}]},
en:{t:"Install Mirsa",st:function(a,b){return "Step "+a+" of "+b},st1:"Step 1 — Choose a method",pick:"Choose a method",back:"Back",next:"Next",done:"Done",close:"Close",dl:"Download Mirsa",dlS:"Download Setup",
m:[{n:"Using a computer",d:"Free Apple ID, apps last 7 days",b:"Recommended"},{n:"On this iPhone (iOS 27)",d:"No computer, via Apple ID + LocalDevVPN on Wi‑Fi"},{n:"With a certificate",d:"No Container and some features unavailable",b:"Limited",o:1}]}};
var SL="https://sideloadly.io",SD="https://github.com/Dadoum/Sideloader";
var P={
ar:[
[["وصّل الآيفون بالكمبيوتر بكيبل. أول مرة اضغط «وثوق بهذا الكمبيوتر» (Trust) على الآيفون.","dl"],
["حمّل Sideloadly (ويندوز أو ماك) من الموقع الرسمي: <a href='"+SL+"' target='_blank' rel='noopener'>sideloadly.io</a> وافتحه. على لينكس استخدم بديلاً: <a href='"+SD+"' target='_blank' rel='noopener'>Sideloader</a> من Dadoum، وبيحتاج usbmuxd:</p><p><code class='mw-cmd'>sudo apt-get install usbmuxd</code>"],
["نزّل Mirsa.ipa من الزر وافتح Sideloadly، ثم اسحب الملف إلى نافذته.","dl"],
["اكتب إيميل Apple ID (أي حساب بيشتغل) واضغط Start."],
["إذا طلب الآيفون وضع المطوّر فعّله. وثق بالملف من الإعدادات › عام › VPN وإدارة الأجهزة."]],
[["حمّل Mirsa Setup من الزر.","dls"],["ثبّته بأي موقّع على الآيفون مثل ESign أو Feather."],["افتح «Mirsa Setup» وسجّل دخول بحساب Apple ID تبعك."],["شغّل LocalDevVPN وخليك على الواي فاي."],["اضغط تثبيت، وSetup بيثبّت مرسى الحقيقي بحسابك."],["خلص! بعدها مرسى بيحدّث حاله لحاله."]],
[["حمّل Mirsa.ipa من الزر.","dl"],["ثبّته بموقّع على الآيفون مثل ESign أو Feather بشهادتك."],["وضع الشهادة ما فيه الحاوية ولا بعض المزايا الثانية."]]],
en:[
[["Connect your iPhone with a cable. The first time, tap Trust on the iPhone.","dl"],
["Get Sideloadly (Windows or macOS) from the official site: <a href='"+SL+"' target='_blank' rel='noopener'>sideloadly.io</a> and open it. On Linux use <a href='"+SD+"' target='_blank' rel='noopener'>Sideloader</a> by Dadoum instead, which needs usbmuxd:</p><p><code class='mw-cmd'>sudo apt-get install usbmuxd</code>"],
["Download Mirsa.ipa with the button and open Sideloadly, then drag the file into its window.","dl"],
["Enter your Apple ID email (any Apple ID works) and press Start."],
["If the iPhone asks for Developer Mode, turn it on. Trust the profile in Settings › General › VPN & Device Management."]],
[["Download Mirsa Setup with the button.","dls"],["Install it with any on-device signer such as ESign or Feather."],["Open “Mirsa Setup” and sign in with your Apple ID."],["Turn on LocalDevVPN and stay on Wi‑Fi."],["Tap Install and Setup installs the real Mirsa with your account."],["Done! Mirsa then updates itself."]],
[["Download Mirsa.ipa with the button.","dl"],["Install it with an on-device signer such as ESign or Feather using your certificate."],["Certificate mode has no Container and some other features are unavailable."]]]};
var os=null,OS={ar:{h:"اختر نظام الكمبيوتر",win:["ويندوز","Sideloadly"],mac:["ماك","Sideloadly"],lin:["لينكس","Sideloader"],dl:"تحميل Sideloadly",dl2:"تحميل Sideloader",cp:"نسخ",cpd:"تم النسخ",s:{sl:["حمّل Sideloadly من الموقع الرسمي.","ثبّته وافتحه."],sd:["ثبّت usbmuxd بهذا الأمر.","حمّل Sideloader من Dadoum وافتحه."]}},en:{h:"Choose your computer",win:["Windows","Sideloadly"],mac:["macOS","Sideloadly"],lin:["Linux","Sideloader"],dl:"Download Sideloadly",dl2:"Download Sideloader",cp:"Copy",cpd:"Copied",s:{sl:["Get Sideloadly from the official site.","Install it and open it."],sd:["Install usbmuxd with this command.","Get Sideloader by Dadoum and open it."]}}};
var ov,lang=function(){return document.documentElement.lang==="en"?"en":"ar"},m=-1,s=0;
function link(id){var a=document.querySelector('.mx-card[data-app="'+id+'"] .mx-dl');return a&&a.getAttribute("aria-disabled")!=="true"?a.href:null}
function el(h){var d=document.createElement("div");d.innerHTML=h;return d.firstChild}
var LIN={ar:[["وصّل الآيفون بالكمبيوتر بكيبل. أول مرة اضغط «وثوق بهذا الكمبيوتر» (Trust) على الآيفون."],[""],["نزّل Mirsa.ipa من الزر، ثم افتح Sideloader وثبّت الملف فيه.<br><a href='https://github.com/Dadoum/Sideloader#readme' target='_blank' rel='noopener'>طريقة الاستخدام الرسمية (README)</a>","dl"],["إذا طلب الآيفون وضع المطوّر فعّله. وثق بالملف من الإعدادات › عام › VPN وإدارة الأجهزة."]],en:[["Connect the iPhone to the computer with a cable. The first time, tap “Trust This Computer” on the iPhone."],[""],["Download Mirsa.ipa with the button, then open Sideloader and install the file with it.<br><a href='https://github.com/Dadoum/Sideloader#readme' target='_blank' rel='noopener'>Official usage guide (README)</a>","dl"],["If the iPhone asks for Developer Mode, turn it on. Trust the profile in Settings › General › VPN & Device Management."]]};
function ST(){return m===0&&os==="lin"?LIN[lang()]:P[lang()][m]}
function osBody(){var O=OS[lang()],h='<div class="mw-body"><p>'+O.h+'</p><div class="mw-os" role="group" aria-label="'+O.h+'">';
["win","mac","lin"].forEach(function(k){h+='<button type="button" class="mw-osb'+(os===k?' on':'')+'" data-os="'+k+'" aria-pressed="'+(os===k)+'"><b>'+O[k][0]+'</b><small>'+O[k][1]+'</small></button>'});
h+='</div>';
if(os==="win"||os==="mac")h+='<ol class="mw-ms"><li>'+O.s.sl[0]+'</li><li>'+O.s.sl[1]+'</li></ol><a class="mw-dlb mw-sl" href="'+SL+'" target="_blank" rel="noopener">'+O.dl+'</a>';
if(os==="lin")h+='<ol class="mw-ms"><li>'+O.s.sd[0]+'</li></ol><div class="mw-cb"><code class="mw-cmd" dir="ltr">sudo apt-get install usbmuxd</code><button type="button" class="mw-cp">'+O.cp+'</button></div><ol class="mw-ms" start="2"><li>'+O.s.sd[1]+'</li></ol><a class="mw-dlb mw-sl" href="'+SD+'" target="_blank" rel="noopener">'+O.dl2+'</a>';
return h+'</div>'}
function draw(){var L=D[lang()],w=ov.querySelector(".mw"),h="";
var tot=m<0?1:ST().length+1,cur=m<0?1:s+2;
h+='<div class="mw-grab"></div><div class="mw-top"><h2 id="mw-t">'+L.t+'</h2><button class="mw-x" type="button" aria-label="'+L.close+'"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>';
h+='<div class="mw-stp">'+(m<0?L.st1:L.st(s+2,tot))+'</div><div class="mw-bar"><i style="width:'+(m<0?6:Math.round(cur/tot*100))+'%"></i></div>';
if(m<0){h+='<h3>'+L.pick+'</h3>';L.m.forEach(function(o,i){h+='<button class="mw-opt" type="button" data-m="'+i+'"><b><span class="mw-n">'+(i+1)+'</span>'+o.n+(o.b?' <span class="mw-b'+(o.o?' o':'')+'">'+o.b+'</span>':'')+'</b><small>'+o.d+'</small></b></button>'.replace('</b></button>','</button>')})}
else{var st=ST()[s],last=s===ST().length-1,u=st[1]==="dl"?link("com.alaa.mirsa"):st[1]==="dls"?link("com.alaa.mirsa.setup"):null;
h+=((m===0&&s===1)?osBody():'<div class="mw-body"><p>'+st[0]+'</p></div>')+'<div class="mw-act"><button class="mw-bk" type="button">'+L.back+'</button>';
if(st[1])h+='<a class="mw-dlb" '+(u?'href="'+u+'" rel="noopener"':'aria-disabled="true"')+'>'+(st[1]==="dls"?L.dlS:L.dl)+'</a>';
h+='<button class="mw-nx" type="button">'+(last?L.done:L.next)+'</button></div>'}
w.innerHTML=h;
w.querySelector(".mw-x").onclick=close;
[].forEach.call(w.querySelectorAll(".mw-opt"),function(b){b.onclick=function(){m=+b.dataset.m;s=0;draw()}});
[].forEach.call(w.querySelectorAll(".mw-osb"),function(b){b.onclick=function(){os=b.dataset.os;draw()}});
var cp=w.querySelector(".mw-cp");if(cp)cp.onclick=function(){var c="sudo apt-get install usbmuxd",ok=function(){cp.textContent=OS[lang()].cpd};if(navigator.clipboard)navigator.clipboard.writeText(c).then(ok,ok);else ok()};
var bk=w.querySelector(".mw-bk");if(bk)bk.onclick=function(){if(s>0)s--;else m=-1;draw()};
var nx=w.querySelector(".mw-nx");if(nx)nx.onclick=function(){if(s<ST().length-1){s++;draw()}else close()}}
function open(e){if(e)e.preventDefault();m=-1;s=0;draw();ov.classList.add("is-open");document.body.style.overflow="hidden";ov.querySelector(".mw-x").focus()}
function close(){ov.classList.remove("is-open");document.body.style.overflow=""}
function init(){ov=el('<div class="mw-ov" role="dialog" aria-modal="true" aria-labelledby="mw-t"><div class="mw"></div></div>');document.body.appendChild(ov);
ov.addEventListener("click",function(e){if(e.target===ov)close()});
document.addEventListener("keydown",function(e){if(e.key==="Escape")close()});
[].forEach.call(document.querySelectorAll('.x-actions a[href="#apps"]'),function(a){a.addEventListener("click",open)});
new MutationObserver(function(){if(ov.classList.contains("is-open"))draw()}).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
if(location.hash==="#install-wizard")open();if(location.hash==="#install-wizard-pc"){open();m=0;s=1;draw()}}
document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init):init()})();