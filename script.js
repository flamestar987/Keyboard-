(()=>{
const $=id=>document.getElementById(id);
const pretty=k=>({" ":"SPACE","arrowup":"↑","arrowdown":"↓","arrowleft":"←","arrowright":"→","control":"CTRL","shift":"SHIFT","alt":"ALT","escape":"ESC","enter":"ENTER","backspace":"BACKSPACE","tab":"TAB","capslock":"CAPS","mouseleft":"LEFT CLICK","mouseright":"RIGHT CLICK","mousemiddle":"MIDDLE CLICK","wheelup":"WHEEL UP","wheeldown":"WHEEL DOWN","double":"DOUBLE CLICK","drag":"DRAG","aim":"AIM","meta":"WIN / CMD","home":"HOME","end":"END","pageup":"PAGE UP","pagedown":"PAGE DOWN","delete":"DELETE","insert":"INSERT","numpad0":"NUM 0","numpad1":"NUM 1","numpad2":"NUM 2","numpad3":"NUM 3","numpad4":"NUM 4","numpad5":"NUM 5","numpad6":"NUM 6","numpad7":"NUM 7","numpad8":"NUM 8","numpad9":"NUM 9","numpaddecimal":"NUM .","numpadadd":"NUM +","numpadsubtract":"NUM -","numpadmultiply":"NUM *","numpaddivide":"NUM /","numpadenter":"NUM ENTER"}[k]||k.toUpperCase());
const modes={
fullkeys:{"title":"Complete keyboard mastery","hint":"PRACTISE EVERY STANDARD KEY GROUP","tasks":[{"title":"Letters A–E","desc":"Practise every highlighted key in this group. Use SHIFT for the shifted symbols.","keys":["a","b","c","d","e"]},{"title":"Letters F–J","desc":"Practise every highlighted key in this group. Use SHIFT for the shifted symbols.","keys":["f","g","h","i","j"]},{"title":"Letters K–O","desc":"Practise every highlighted key in this group. Use SHIFT for the shifted symbols.","keys":["k","l","m","n","o"]},{"title":"Letters P–T","desc":"Practise every highlighted key in this group. Use SHIFT for the shifted symbols.","keys":["p","q","r","s","t"]},{"title":"Letters U–Z","desc":"Practise every highlighted key in this group. Use SHIFT for the shifted symbols.","keys":["u","v","w","x","y","z"]},{"title":"Number row","desc":"Practise every highlighted key in this group. Use SHIFT for the shifted symbols.","keys":["1","2","3","4","5","6","7","8","9","0"]},{"title":"Shifted number symbols","desc":"Practise every highlighted key in this group. Use SHIFT for the shifted symbols.","keys":["!","@","#","$","%","^","&","*","(",")"]},{"title":"Punctuation row","desc":"Practise every highlighted key in this group. Use SHIFT for the shifted symbols.","keys":["-","=","[","]","\\\\",";",",",".","/","`"]},{"title":"Shifted punctuation","desc":"Practise every highlighted key in this group. Use SHIFT for the shifted symbols.","keys":["_","+","{","}",":","<",">","?","~"]},{"title":"Modifier keys","desc":"Practise every highlighted key in this group. Use SHIFT for the shifted symbols.","keys":["shift","control","alt","meta"]},{"title":"Navigation keys","desc":"Practise every highlighted key in this group. Use SHIFT for the shifted symbols.","keys":["arrowup","arrowdown","arrowleft","arrowright","home","end","pageup","pagedown"]},{"title":"Editing and system keys","desc":"Practise every highlighted key in this group. Use SHIFT for the shifted symbols.","keys":["tab","enter","escape","backspace","delete","insert","capslock","",""]},{"title":"Function keys F1–F6","desc":"Practise every highlighted key in this group. Use SHIFT for the shifted symbols.","keys":["f1","f2","f3","f4","f5","f6"]},{"title":"Function keys F7–F12","desc":"Practise every highlighted key in this group. Use SHIFT for the shifted symbols.","keys":["f7","f8","f9","f10","f11","f12"]},{"title":"Numpad digits","desc":"Practise every highlighted key in this group. Use SHIFT for the shifted symbols.","keys":["numpad0","numpad1","numpad2","numpad3","numpad4","numpad5","numpad6","numpad7","numpad8","numpad9"]},{"title":"Numpad operators","desc":"Practise every highlighted key in this group. Use SHIFT for the shifted symbols.","keys":["numpaddecimal","numpadadd","numpadsubtract","numpadmultiply","numpaddivide","numpadenter"]}]},
move:{title:"Movement basics",hint:"USE W A S D OR ARROW KEYS",tasks:[
{title:"Move forward",desc:"Press W or ↑ to move your character forward.",keys:["w"]},
{title:"Move left",desc:"Press A or ← to move left.",keys:["a"]},
{title:"Move backward",desc:"Press S or ↓ to move backward.",keys:["s"]},
{title:"Move right",desc:"Press D or → to move right.",keys:["d"]},
{title:"Four-way movement",desc:"Use W, A, S and D. Each direction moves your character.",keys:["w","a","s","d"]},
{title:"Diagonal movement",desc:"Press W and D together to move diagonally.",sequence:["w","d"]}
]},
jump:{title:"Jump & movement",hint:"PRACTICE MOVEMENT COMBOS",tasks:[
{title:"Jump",desc:"Press SPACE to jump.",keys:[" "]},
{title:"Crouch",desc:"Press C to crouch.",keys:["c"]},
{title:"Alternative crouch",desc:"Press CTRL to crouch in games that use it.",keys:["control"]},
{title:"Sprint",desc:"Press SHIFT to practice the sprint key.",keys:["shift"]},
{title:"Sprint and jump",desc:"Press SHIFT, W, then SPACE.",sequence:["shift","w"," "]},
{title:"Jump and strafe",desc:"Press A, SPACE, then D.",sequence:["a"," ","d"]}
]},
slide:{title:"Action keys",hint:"PRACTICE COMMON GAME ACTIONS",tasks:[
{title:"Interact",desc:"Press E. Many games use it to interact or pick up items.",keys:["e"]},
{title:"Use an action",desc:"Press F. Its purpose depends on the game.",keys:["f"]},
{title:"Quick action",desc:"Press Q to practice a nearby action key.",keys:["q"]},
{title:"Reload / reset",desc:"Press R. Many games use it for reload or reset.",keys:["r"]},
{title:"Extra action",desc:"Press G to practice another common action bind.",keys:["g"]},
{title:"Action sequence",desc:"Press E, F, Q, then R.",sequence:["e","f","q","r"]}
]},
sprint:{title:"Advanced modifiers",hint:"PRACTICE MODIFIER KEYS",tasks:[
{title:"Hold SHIFT",desc:"Hold SHIFT for a moment, then release it.",hold:"shift",duration:500},
{title:"Hold CTRL",desc:"Hold CTRL for a moment, then release it.",hold:"control",duration:500},
{title:"Use ALT",desc:"Press ALT. Some games use it for alternate controls.",keys:["alt"]},
{title:"Caps Lock",desc:"Press CAPS LOCK to practice a toggle key.",keys:["capslock"]},
{title:"Modifier combo",desc:"Press CTRL, SHIFT, then SPACE.",sequence:["control","shift"," "]}
]},
combo:{title:"Advanced key combos",hint:"FOLLOW THE KEY SEQUENCE",tasks:[
{title:"Quick item slots",desc:"Press 1, then 2, then 3.",sequence:["1","2","3"]},
{title:"More item slots",desc:"Press 4, 5, 6, 7, 8, 9, then 0.",sequence:["4","5","6","7","8","9","0"]},
{title:"Inventory and map",desc:"Press I, then M.",sequence:["i","m"]},
{title:"Menu controls",desc:"Press TAB, then ESC.",sequence:["tab","escape"]},
{title:"Confirm and go back",desc:"Press ENTER, then BACKSPACE.",sequence:["enter","backspace"]},
{title:"Full combo",desc:"Press Q, E, R, F, then G.",sequence:["q","e","r","f","g"]}
]},
quiz:{title:"Gaming key quiz",hint:"CHOOSE THE CORRECT KEY",tasks:[
{title:"Which key often jumps?",desc:"Choose the common jump key.",quiz:[" ","w","e"],answer:" "},
{title:"Which key often opens inventory or scoreboard?",desc:"Choose the common menu key.",quiz:["tab","r","c"],answer:"tab"},
{title:"Which key often pauses a game?",desc:"Choose the common pause/menu key.",quiz:["escape","f","q"],answer:"escape"},
{title:"Which key often interacts?",desc:"Choose the common interact key.",quiz:["e","x","z"],answer:"e"},
{title:"Which key often sprints?",desc:"Choose the common sprint key.",quiz:["shift","alt","backspace"],answer:"shift"},
{title:"Which key often opens a map?",desc:"Choose a common map key.",quiz:["m","g","space"],answer:"m"}
]},
actions:{title:"Extra keyboard keys",hint:"TRY EACH KEY",tasks:[
{title:"Chat key",desc:"Press T. Some games use it to open chat.",keys:["t"]},
{title:"Extra abilities",desc:"Press X, then Z.",sequence:["x","z"]},
{title:"View controls",desc:"Press V, then B.",sequence:["v","b"]},
{title:"Function key F1",desc:"Press F1. Function keys vary by game.",keys:["f1"]},
{title:"Function key F5",desc:"Press F5 to practice another function key.",keys:["f5"]},
{title:"Function key F12",desc:"Press F12. Its action depends on the game.",keys:["f12"]}
]},
numbers:{title:"Numbers & function keys",hint:"PRACTICE NUMBER ROW + F KEYS",tasks:[
{title:"Number row 1–5",desc:"Press 1, 2, 3, 4 and 5.",keys:["1","2","3","4","5"]},
{title:"Number row 6–0",desc:"Press 6, 7, 8, 9 and 0.",keys:["6","7","8","9","0"]},
{title:"Function keys F1–F4",desc:"Press F1, F2, F3 and F4.",keys:["f1","f2","f3","f4"]},
{title:"Function keys F5–F8",desc:"Press F5, F6, F7 and F8.",keys:["f5","f6","f7","f8"]},
{title:"Function keys F9–F12",desc:"Press F9, F10, F11 and F12.",keys:["f9","f10","f11","f12"]}
]},
mouse:{title:"Mouse control training",hint:"USE YOUR MOUSE IN THE ARENA",tasks:[
{title:"Aim at the target",desc:"Move your mouse over the glowing target in the arena.",type:"aim"},
{title:"Primary click",desc:"Left-click anywhere inside the arena.",type:"click",button:0},
{title:"Secondary click",desc:"Right-click inside the arena.",type:"click",button:2},
{title:"Middle click",desc:"Press the mouse wheel button inside the arena.",type:"click",button:1},
{title:"Scroll up",desc:"Scroll the mouse wheel upward over the arena.",type:"wheel",direction:"up"},
{title:"Scroll down",desc:"Scroll the mouse wheel downward over the arena.",type:"wheel",direction:"down"},
{title:"Double-click",desc:"Double-click inside the arena.",type:"double"},
{title:"Drag the target",desc:"Click and drag inside the arena, then release.",type:"drag"}
]},
precision:{title:"Mouse precision lab",hint:"AIM CAREFULLY AND CLICK THE TARGET",tasks:[
{title:"Target practice",desc:"Move the cursor onto the glowing target.",type:"aim"},
{title:"Click the target",desc:"Move onto the glowing target and left-click it.",type:"targetclick"},
{title:"Fast target click",desc:"Click the glowing target again as quickly as you can.",type:"targetclick"},
{title:"Track the target",desc:"Move your cursor around while keeping it inside the arena.",type:"track"}
]}
};
let mode="move",taskIndex=0,progress=0,seq=0,points=0,done=0,streak=0,best=0,player={x:50,y:55},held=new Set(),seen=new Set(),history=[],wrong=0,total=0,taskStarted=performance.now(),reaction=0,dragStart=null,lastClick=0,aimed=false,holdStart=0,trackDistance=0,lastTrackPoint=null;
const task=()=>modes[mode].tasks[taskIndex];
function stats(){$("scoreStat").textContent=points;$("doneStat").textContent=done;$("streakStat").textContent=best;$("accuracyStat").textContent=(total?Math.round((total-wrong)/total*100):100)+"%";$("reactionStat").textContent=reaction?Math.round(reaction)+"ms":"—";$("levelPill").textContent="LEVEL "+(taskIndex+1)}
function say(s,good=false){$("feedbackText").textContent=s;$("feedback").classList.toggle("good",good)}
function record(s){history.push(s);if(history.length>16)history.shift();$("keyLog").textContent=history.join(" · ")}
function mark(k){const t=task();if(t.type==="aim"||t.type==="targetclick"||t.type==="track")return;total++;
 if(t.quiz){if(!t.quiz.includes(k)){wrong++;say("That key isn't one of the choices.");return}if(k!==t.answer){wrong++;streak=0;say("Not quite. Try another key.");return}finish("Correct! That's the answer.");return}
 if(t.hold&&k===t.hold){holdStart=performance.now();say("Keep holding "+pretty(k)+"…",true);return}
 if(t.sequence){if(k===t.sequence[seq]){seq++;if(seq===t.sequence.length)finish("Combo completed! Great timing.");else say("Correct. Next: "+pretty(t.sequence[seq]),true)}else{wrong++;streak=0;seq=0;say("Sequence reset. Start with "+pretty(t.sequence[0])+".")}return}
 if(t.keys){if(t.keys.includes(k)){if(!seen.has(k)){seen.add(k);progress++}say("Correct key! "+progress+"/"+t.keys.length,true);if(progress>=t.keys.length)finish("Challenge complete!")}else{wrong++;say("Try one of the highlighted keys.")}}
}
function finish(msg){if(!$("nextBtn").disabled)return;reaction=performance.now()-taskStarted;points+=25+Math.max(0,Math.round((1800-reaction)/180));streak++;best=Math.max(best,streak);say(msg+" +25 points",true);$("nextBtn").disabled=false;$("nextBtn").textContent=taskIndex===modes[mode].tasks.length-1?"FINISH MODE ✓":"NEXT CHALLENGE →";$("arenaHint").textContent="CHALLENGE COMPLETE!";stats()}
function render(){
 const t=task();$("gameTitle").textContent=modes[mode].title;$("taskTitle").textContent=t.title;$("taskDesc").textContent=t.desc;$("arenaHint").textContent=modes[mode].hint;$("progressText").textContent=(taskIndex+1)+" / "+modes[mode].tasks.length+" tasks";
 const needed=t.quiz||t.sequence||t.keys||(t.hold?[t.hold]:t.type?["aim","click","wheel","double","drag"].includes(t.type)?[t.type]:[]);
 $("neededKeys").innerHTML=needed.map((k,i)=>'<span class="keycap '+((t.sequence&&i<seq)||(t.keys&&seen.has(k))?'done':'')+'">'+pretty(k)+'</span>').join("");
 $("nextBtn").disabled=true;$("nextBtn").textContent=taskIndex===modes[mode].tasks.length-1?"FINISH MODE ✓":"NEXT CHALLENGE →";
 $("feedback").classList.remove("good");say("Waiting for your input…");$("keyLog").textContent=history.slice(-8).join(" · ")||"Your inputs will appear here";
 $("player").style.left=player.x+"%";$("player").style.top=player.y+"%";$("player").classList.remove("sliding");
 const mouseMode=mode==="mouse"||mode==="precision";$("arena").classList.toggle("mouse-mode",mouseMode);$("target").style.display=(mouseMode&&(t.type==="aim"||t.type==="targetclick"||t.type==="track"))?"grid":mode==="move"?"grid":"none";
 $("target").style.left="72%";$("target").style.top="45%";$("mouseTarget").style.left="50%";$("mouseTarget").style.top="50%";aimed=false;progress=0;seq=0;seen.clear();trackDistance=0;lastTrackPoint=null;taskStarted=performance.now();stats()
}
function movePlayer(k){let dx=0,dy=0;if(k==="w"||k==="arrowup")dy=-5;if(k==="s"||k==="arrowdown")dy=5;if(k==="a"||k==="arrowleft")dx=-5;if(k==="d"||k==="arrowright")dx=5;if(dx||dy){let scale=dx&&dy?.72:1;player.x=Math.max(8,Math.min(92,player.x+dx*scale));player.y=Math.max(14,Math.min(88,player.y+dy*scale));$("player").style.left=player.x+"%";$("player").style.top=player.y+"%";}}
function keyName(e){const c=e.code||"";if(c.startsWith("Numpad")){const n=c.slice(6);return ({Decimal:"numpaddecimal",Add:"numpadadd",Subtract:"numpadsubtract",Multiply:"numpadmultiply",Divide:"numpaddivide",Enter:"numpadenter"})[n]||(/^\\d$/.test(n)?"numpad"+n:e.key.toLowerCase())}if(e.key===" ")return " ";if(e.key==="Esc")return "escape";if(e.key==="Meta")return "meta";return e.key.toLowerCase()}
window.addEventListener("keydown",e=>{const k=keyName(e);if([" ","arrowup","arrowdown","arrowleft","arrowright","tab"].includes(k))e.preventDefault();if(held.has(k))return;held.add(k);record(pretty(k));if(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(k))movePlayer(k);if(k===" "){$("player").animate([{transform:"translate(-50%,-50%) translateY(0)"},{transform:"translate(-50%,-50%) translateY(-55px)"},{transform:"translate(-50%,-50%) translateY(0)"}],{duration:420})}if(mode==="move"){const action=({arrowup:"w",arrowleft:"a",arrowdown:"s",arrowright:"d"})[k]||k;mark(action)}else mark(k)});
window.addEventListener("keyup",e=>{const k=keyName(e);held.delete(k);if(task().hold===k&&holdStart&&performance.now()-holdStart>=(task().duration||500)){finish("Nice hold! You practiced the modifier key.")}holdStart=0});
const arena=$("arena");
arena.addEventListener("contextmenu",e=>{e.preventDefault();if(mode==="mouse"&&task().type==="click"&&task().button===2){record("RIGHT CLICK");finish("RIGHT CLICK registered!")} });
arena.addEventListener("pointermove",e=>{const r=arena.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;$("mouseTarget").style.left=(x*100)+"%";$("mouseTarget").style.top=(y*100)+"%";const t=task();if((mode==="mouse"||mode==="precision")&&t.type==="aim"){const inside=x>.62&&x<.82&&y>.34&&y<.56;if(inside&&!aimed){aimed=true;record("AIM: target found");finish("Great aim! You found the target.")}}if(mode==="precision"&&t.type==="track"){if(lastTrackPoint){trackDistance+=Math.hypot(e.clientX-lastTrackPoint.x,e.clientY-lastTrackPoint.y)}lastTrackPoint={x:e.clientX,y:e.clientY};if(trackDistance>450&&performance.now()-taskStarted>1800&&!aimed){aimed=true;finish("Great tracking! You kept moving smoothly around the arena.")}}if(dragStart){$("mouseTarget").style.opacity=".65"}});
arena.addEventListener("pointerdown",e=>{if(mode!=="mouse"&&mode!=="precision")return;const t=task();if(t.type==="drag"){dragStart={x:e.clientX,y:e.clientY};arena.setPointerCapture(e.pointerId);record("DRAG START")}});
arena.addEventListener("pointerup",e=>{if(dragStart){const d=Math.hypot(e.clientX-dragStart.x,e.clientY-dragStart.y);dragStart=null;$("mouseTarget").style.opacity="1";record("DRAG "+Math.round(d)+"px");if(d>25)finish("Nice drag! You moved and released the mouse.");else say("Drag a little farther before releasing.");}});
arena.addEventListener("click",e=>{if(mode!=="mouse"&&mode!=="precision")return;const t=task(),r=arena.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;$("clickRipple").style.display="block";$("clickRipple").style.left=(x*100)+"%";$("clickRipple").style.top=(y*100)+"%";setTimeout(()=>$("clickRipple").style.display="none",450);const label=e.button===0?"LEFT CLICK":e.button===1?"MIDDLE CLICK":"RIGHT CLICK";record(label);if(t.type==="click"&&e.button===t.button)finish(label+" registered!");else if(t.type==="targetclick"){if(x>.62&&x<.82&&y>.34&&y<.56)finish("Bullseye! Accurate click.");else{wrong++;say("Aim for the glowing target.")}}});
arena.addEventListener("auxclick",e=>{if(mode!=="mouse")return;const t=task();if(t.type==="click"&&e.button===1){record("MIDDLE CLICK");finish("MIDDLE CLICK registered!")}});
arena.addEventListener("dblclick",e=>{if(mode==="mouse"&&task().type==="double"){record("DOUBLE CLICK");finish("Double-click detected!") }});
arena.addEventListener("wheel",e=>{if(mode!=="mouse")return;e.preventDefault();const dir=e.deltaY<0?"up":"down";record("WHEEL "+dir.toUpperCase());if(task().type==="wheel"&&task().direction===dir)finish("Wheel "+dir+" detected!")},{passive:false});
$("nextBtn").addEventListener("click",()=>{if($("nextBtn").disabled)return;if(taskIndex===modes[mode].tasks.length-1){done++;say("Mode complete! Pick another training skill.",true);$("nextBtn").disabled=true;$("nextBtn").textContent="MODE COMPLETE ✓";stats();return}taskIndex++;render()});
$("resetBtn").addEventListener("click",()=>{progress=0;seq=0;seen.clear();held.clear();player={x:50,y:55};render()});
document.querySelectorAll(".mode-card").forEach(b=>b.addEventListener("click",()=>{mode=b.dataset.mode;taskIndex=0;progress=0;seq=0;held.clear();seen.clear();player={x:50,y:55};document.querySelectorAll(".mode-card").forEach(x=>x.classList.toggle("active",x===b));render()}));
$("startBtn").addEventListener("click",()=>$("training").scrollIntoView({behavior:"smooth"}));
document.querySelectorAll("[data-touch]").forEach(b=>{const k=b.dataset.touch==="space"?" ":b.dataset.touch;b.addEventListener("pointerdown",e=>{e.preventDefault();record("TOUCH "+pretty(k));if(["w","a","s","d"].includes(k))movePlayer(k);mark(k);if(k===" "){$("player").animate([{transform:"translate(-50%,-50%) translateY(0)"},{transform:"translate(-50%,-50%) translateY(-55px)"},{transform:"translate(-50%,-50%) translateY(0)"}],{duration:420})}})});
render();
})();