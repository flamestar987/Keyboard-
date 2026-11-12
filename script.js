(() => {
"use strict";
const $=id=>document.getElementById(id);
const pretty=k=>({" ":"SPACE",arrowup:"↑",arrowdown:"↓",arrowleft:"←",arrowright:"→",control:"CTRL",shift:"SHIFT",alt:"ALT",meta:"WIN/CMD",escape:"ESC",enter:"ENTER",backspace:"BACKSPACE",tab:"TAB",capslock:"CAPS",pageup:"PAGE UP",pagedown:"PAGE DOWN",numpaddecimal:"NUM .",numpadadd:"NUM +",numpadsubtract:"NUM -",numpadmultiply:"NUM *",numpaddivide:"NUM /",numpadenter:"NUM ENTER",printscreen:"PRT SC",scrolllock:"SCROLL",contextmenu:"MENU"}[k]||k.toUpperCase());
const groups=[
["Letters A–E",["a","b","c","d","e"]],["Letters F–J",["f","g","h","i","j"]],["Letters K–O",["k","l","m","n","o"]],["Letters P–T",["p","q","r","s","t"]],["Letters U–Z",["u","v","w","x","y","z"]],
["Number row",["1","2","3","4","5","6","7","8","9","0"]],["Shifted number symbols",["!","@","#","$","%","^","&","*","(",")"]],
["Punctuation keys",["-","=","[","]",String.fromCharCode(92),";","'",",",".","/",String.fromCharCode(96)]],
["Shifted punctuation",["_","+","{","}",":",String.fromCharCode(34),"<",">","?","~"]],
["Modifier keys",["shift","control","alt","meta"]],
["Navigation keys",["arrowup","arrowdown","arrowleft","arrowright","home","end","pageup","pagedown"]],
["Editing keys",["tab","enter","escape","backspace","delete","insert","capslock"]],
["Spacebar",[" "]],["Function keys F1–F6",["f1","f2","f3","f4","f5","f6"]],["Function keys F7–F12",["f7","f8","f9","f10","f11","f12"]],
["Numpad digits",["numpad0","numpad1","numpad2","numpad3","numpad4","numpad5","numpad6","numpad7","numpad8","numpad9"]],
["Numpad operators",["numpaddecimal","numpadadd","numpadsubtract","numpadmultiply","numpaddivide","numpadenter","numlock"]],
["Special keys",["printscreen","scrolllock","pause","contextmenu"]]
];
const mk=(title,keys)=>({title,desc:"Press every highlighted key to complete this drill.",keys});
const modes={
fullkeys:{title:"Complete keyboard mastery",hint:"PRACTISE EVERY STANDARD KEY GROUP",tasks:groups.map(g=>mk(g[0],g[1]))},
move:{title:"Movement training",hint:"USE WASD OR ARROW KEYS",tasks:[{title:"Move forward",desc:"Press W or ↑.",keys:["w"]},{title:"Move left",desc:"Press A or ←.",keys:["a"]},{title:"Move backward",desc:"Press S or ↓.",keys:["s"]},{title:"Move right",desc:"Press D or →.",keys:["d"]},{title:"Diagonal movement",desc:"Press W, then D.",sequence:["w","d"]}]},
jump:{title:"Jump & movement combos",hint:"PRACTISE MOVEMENT COMBOS",tasks:[{title:"Jump",desc:"Press SPACE.",keys:[" "]},{title:"Crouch",desc:"Press C.",keys:["c"]},{title:"Sprint",desc:"Press SHIFT.",keys:["shift"]},{title:"Sprint and jump",desc:"Press SHIFT, W, then SPACE.",sequence:["shift","w"," "]},{title:"Jump and strafe",desc:"Press A, SPACE, then D.",sequence:["a"," ","d"]}]},
slide:{title:"Gaming action keys",hint:"PRACTISE COMMON ACTION BINDS",tasks:[{title:"Interact",desc:"Press E.",keys:["e"]},{title:"Use / action",desc:"Press F.",keys:["f"]},{title:"Quick action",desc:"Press Q.",keys:["q"]},{title:"Reload / reset",desc:"Press R.",keys:["r"]},{title:"Utility action",desc:"Press G.",keys:["g"]},{title:"Action combo",desc:"Press E, F, Q, R.",sequence:["e","f","q","r"]}]},
sprint:{title:"Modifier mastery",hint:"HOLD AND COMBINE MODIFIERS",tasks:[{title:"Hold SHIFT",desc:"Hold SHIFT for half a second, then release.",hold:"shift",duration:500},{title:"Hold CTRL",desc:"Hold CTRL for half a second, then release.",hold:"control",duration:500},{title:"Use ALT",desc:"Press ALT.",keys:["alt"]},{title:"Caps Lock",desc:"Press CAPS LOCK.",keys:["capslock"]},{title:"Modifier combo",desc:"Press CTRL, SHIFT, then SPACE.",sequence:["control","shift"," "]}]},
combo:{title:"Advanced key combos",hint:"FOLLOW THE SEQUENCE",tasks:[{title:"Item slots",desc:"Press 1, 2, 3.",sequence:["1","2","3"]},{title:"More slots",desc:"Press 4, 5, 6, 7, 8, 9, 0.",sequence:["4","5","6","7","8","9","0"]},{title:"Inventory and map",desc:"Press I, then M.",sequence:["i","m"]},{title:"Menus",desc:"Press TAB, then ESC.",sequence:["tab","escape"]},{title:"Confirm and back",desc:"Press ENTER, then BACKSPACE.",sequence:["enter","backspace"]}]},
quiz:{title:"Gaming key knowledge quiz",hint:"CHOOSE THE CORRECT KEY",tasks:[{title:"Which key often jumps?",desc:"Choose the common jump key.",quiz:[" ","w","e"],answer:" "},{title:"Which key opens a scoreboard?",desc:"Choose the common menu key.",quiz:["tab","r","c"],answer:"tab"},{title:"Which key often pauses a game?",desc:"Choose the common pause key.",quiz:["escape","f","q"],answer:"escape"},{title:"Which key often interacts?",desc:"Choose the common interact key.",quiz:["e","x","z"],answer:"e"},{title:"Which key often sprints?",desc:"Choose the common sprint key.",quiz:["shift","alt","backspace"],answer:"shift"}]},
actions:{title:"Extra gaming keys",hint:"TRY EACH EXTRA KEY",tasks:[{title:"Chat",desc:"Press T.",keys:["t"]},{title:"Extra abilities",desc:"Press X, then Z.",sequence:["x","z"]},{title:"View controls",desc:"Press V, then B.",sequence:["v","b"]},{title:"Inventory",desc:"Press I.",keys:["i"]},{title:"Map",desc:"Press M.",keys:["m"]},{title:"Function keys",desc:"Press F1, F5 and F12.",keys:["f1","f5","f12"]}]},
numbers:{title:"Numbers & function keys",hint:"PRACTISE NUMBER ROW AND F KEYS",tasks:[mk("Number row 1–5",["1","2","3","4","5"]),mk("Number row 6–0",["6","7","8","9","0"]),mk("Function keys F1–F4",["f1","f2","f3","f4"]),mk("Function keys F5–F8",["f5","f6","f7","f8"]),mk("Function keys F9–F12",["f9","f10","f11","f12"])]},
mouse:{title:"Complete mouse training",hint:"USE YOUR MOUSE INSIDE THE ARENA",tasks:[{title:"Aim at the target",desc:"Move your pointer onto the glowing target.",type:"aim"},{title:"Left click",desc:"Left-click inside the arena.",type:"click",button:0},{title:"Right click",desc:"Right-click inside the arena.",type:"click",button:2},{title:"Middle click",desc:"Click the mouse wheel inside the arena.",type:"click",button:1},{title:"Scroll up",desc:"Scroll upward over the arena.",type:"wheel",direction:"up"},{title:"Scroll down",desc:"Scroll downward over the arena.",type:"wheel",direction:"down"},{title:"Double click",desc:"Double-click inside the arena.",type:"double"},{title:"Drag",desc:"Click and drag at least 25 pixels.",type:"drag"}]},
precision:{title:"Mouse precision lab",hint:"AIM · CLICK · TRACK",tasks:[{title:"Target practice",desc:"Move onto the glowing target.",type:"aim"},{title:"Bullseye",desc:"Click directly on the glowing target.",type:"targetclick"},{title:"Fast target click",desc:"Click the target again as quickly as possible.",type:"targetclick"},{title:"Smooth tracking",desc:"Move your pointer around the arena for two seconds.",type:"track"}]}
};
let mode="move",index=0,score=0,done=0,streak=0,best=0,player={x:50,y:55},seen=new Set(),seq=0,held=new Set(),wrong=0,total=0,reaction=0,started=performance.now(),holdStart=0,drag=null,lastTrack=null,track=0,complete=false;
const task=()=>modes[mode].tasks[index];
function stats(){$("scoreStat").textContent=score;$("doneStat").textContent=done;$("streakStat").textContent=best;$("accuracyStat").textContent=(total?Math.round((total-wrong)/total*100):100)+"%";$("reactionStat").textContent=reaction?Math.round(reaction)+"ms":"—";$("levelPill").textContent="LEVEL "+(index+1);}
function say(s,good=false){$("feedbackText").textContent=s;$("feedback").classList.toggle("good",good);}
function log(s){const el=$("keyLog"),a=(el.dataset.items||"").split("|").filter(Boolean);a.push(s);while(a.length>10)a.shift();el.dataset.items=a.join("|");el.textContent=a.join(" · ");}
function finish(s){if(complete)return;complete=true;reaction=performance.now()-started;const bonus=Math.max(0,Math.round((2500-reaction)/250));score+=25+bonus;streak++;best=Math.max(best,streak);say(s+"  +"+(25+bonus)+" XP",true);$("nextBtn").disabled=false;$("nextBtn").textContent=index===modes[mode].tasks.length-1?"FINISH MODE ✓":"NEXT CHALLENGE →";$("arenaHint").textContent="CHALLENGE COMPLETE";stats();}
function render(){
const t=task();complete=false;seq=0;seen.clear();track=0;lastTrack=null;drag=null;holdStart=0;started=performance.now();
$("gameTitle").textContent=modes[mode].title;$("taskTitle").textContent=t.title;$("taskDesc").textContent=t.desc;$("arenaHint").textContent=modes[mode].hint;$("progressText").textContent=(index+1)+" / "+modes[mode].tasks.length+" tasks";
const keys=t.quiz||t.sequence||t.keys||(t.hold?[t.hold]:t.type? [t.type]:[]);
$("neededKeys").innerHTML=keys.map(k=>'<span class="keycap">'+pretty(k)+'</span>').join("");
$("nextBtn").disabled=true;$("nextBtn").textContent=index===modes[mode].tasks.length-1?"FINISH MODE ✓":"NEXT CHALLENGE →";$("feedback").classList.remove("good");say("Ready — give it a try.");$("keyLog").textContent="Your inputs will appear here";$("keyLog").dataset.items="";
$("player").style.left=player.x+"%";$("player").style.top=player.y+"%";$("player").classList.remove("sliding");
const mm=mode==="mouse"||mode==="precision";$("arena").classList.toggle("mouse-mode",mm);$("target").style.display=mm&&["aim","targetclick","track"].includes(t.type)?"grid":mode==="move"?"grid":"none";$("target").style.left="72%";$("target").style.top="45%";$("mouseTarget").style.opacity="1";stats();
}
function move(k){let dx=0,dy=0;if(k==="w"||k==="arrowup")dy=-5;if(k==="s"||k==="arrowdown")dy=5;if(k==="a"||k==="arrowleft")dx=-5;if(k==="d"||k==="arrowright")dx=5;if(dx||dy){const m=dx&&dy?.72:1;player.x=Math.max(8,Math.min(92,player.x+dx*m));player.y=Math.max(14,Math.min(88,player.y+dy*m));$("player").style.left=player.x+"%";$("player").style.top=player.y+"%";}}
function mark(k){const t=task();if(complete||t.type)return;total++;
if(t.quiz){if(!t.quiz.includes(k)){wrong++;say("Choose one of the keys shown.");}else if(k===t.answer)finish("Correct answer!");else{wrong++;streak=0;say("Not quite — try again.");}stats();return;}
if(t.hold){if(k===t.hold){holdStart=performance.now();say("Keep holding "+pretty(k)+"…",true);}return;}
if(t.sequence){if(k===t.sequence[seq]){seq++;say("Good! "+seq+"/"+t.sequence.length,true);if(seq===t.sequence.length)finish("Combo complete!");}else{wrong++;streak=0;seq=0;say("Sequence reset — start with "+pretty(t.sequence[0])+".");}stats();return;}
if(t.keys){if(t.keys.includes(k)){seen.add(k);say("Correct key · "+seen.size+"/"+t.keys.length,true);if(seen.size===t.keys.length)finish("Keyboard drill complete!");}else{wrong++;say("Try one of the highlighted keys.");}}stats();}
function keyName(e){const c=e.code||"",special={PrintScreen:"printscreen",ScrollLock:"scrolllock",Pause:"pause",ContextMenu:"contextmenu"};if(special[c])return special[c];if(c.startsWith("Numpad")){const n=c.slice(6),map={Decimal:"numpaddecimal",Add:"numpadadd",Subtract:"numpadsubtract",Multiply:"numpadmultiply",Divide:"numpaddivide",Enter:"numpadenter",NumLock:"numlock"};return map[n]||(n.length===1&&n>="0"&&n<="9"?"numpad"+n:e.key.toLowerCase());}if(e.key===" ")return " ";if(e.key==="Meta")return "meta";return e.key.toLowerCase();}
window.addEventListener("keydown",e=>{const k=keyName(e);if([" ","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"].includes(e.key))e.preventDefault();if(held.has(k))return;held.add(k);log(pretty(k));if(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(k))move(k);if(k===" ")$("player").animate([{transform:"translate(-50%,-50%) translateY(0)"},{transform:"translate(-50%,-50%) translateY(-48px)"},{transform:"translate(-50%,-50%) translateY(0)"}],{duration:380});const symbols="!@#$%^&*()_+{}:"+String.fromCharCode(34)+"<>?~";if(k==="shift"&&task().keys&&task().keys.some(x=>symbols.includes(x)))return;mark(mode==="move"?({arrowup:"w",arrowdown:"s",arrowleft:"a",arrowright:"d"}[k]||k):k);});
window.addEventListener("keyup",e=>{const k=keyName(e);held.delete(k);if(task().hold===k&&holdStart&&performance.now()-holdStart>=(task().duration||500))finish("Great hold — modifier mastered!");holdStart=0;});
const arena=$("arena");
arena.addEventListener("pointermove",e=>{const r=arena.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height,t=task();$("mouseTarget").style.left=x*100+"%";$("mouseTarget").style.top=y*100+"%";if((mode==="mouse"||mode==="precision")&&t.type==="aim"&&x>.62&&x<.82&&y>.34&&y<.56)finish("Great aim — target acquired!");if(mode==="precision"&&t.type==="track"&&!complete){if(lastTrack)track+=Math.hypot(e.clientX-lastTrack.x,e.clientY-lastTrack.y);lastTrack={x:e.clientX,y:e.clientY};if(track>500&&performance.now()-started>1800)finish("Smooth tracking! Nice control.");}});
arena.addEventListener("pointerdown",e=>{if((mode==="mouse"||mode==="precision")&&task().type==="drag"){drag={x:e.clientX,y:e.clientY};try{arena.setPointerCapture(e.pointerId);}catch(_){ }log("DRAG START");}});
arena.addEventListener("pointerup",e=>{if(!drag)return;const d=Math.hypot(e.clientX-drag.x,e.clientY-drag.y);drag=null;log("DRAG "+Math.round(d)+"px");if(d>25)finish("Drag completed!");else say("Drag a little farther.");});
arena.addEventListener("click",e=>{if(mode!=="mouse"&&mode!=="precision")return;const t=task(),r=arena.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;$("clickRipple").style.display="block";$("clickRipple").style.left=x*100+"%";$("clickRipple").style.top=y*100+"%";window.setTimeout(()=>$("clickRipple").style.display="none",420);log("LEFT CLICK");if(t.type==="click"&&t.button===0)finish("Left click registered!");else if(t.type==="targetclick"){if(x>.62&&x<.82&&y>.34&&y<.56)finish("Bullseye! Accurate click.");else{wrong++;say("Aim for the glowing target.");}}});
arena.addEventListener("contextmenu",e=>{e.preventDefault();if(mode==="mouse"&&task().type==="click"&&task().button===2){log("RIGHT CLICK");finish("Right click registered!");}});
arena.addEventListener("auxclick",e=>{if(mode==="mouse"&&task().type==="click"&&e.button===1){log("MIDDLE CLICK");finish("Middle click registered!");}});
arena.addEventListener("dblclick",()=>{if(mode==="mouse"&&task().type==="double"){log("DOUBLE CLICK");finish("Double click detected!");}});
arena.addEventListener("wheel",e=>{if(mode!=="mouse")return;e.preventDefault();const d=e.deltaY<0?"up":"down";log("WHEEL "+d.toUpperCase());if(task().type==="wheel"&&task().direction===d)finish("Wheel "+d+" detected!");},{passive:false});
$("nextBtn").addEventListener("click",()=>{if(!complete)return;if(index===modes[mode].tasks.length-1){done++;say("Mode complete! Choose another training mode.",true);$("nextBtn").disabled=true;$("nextBtn").textContent="MODE COMPLETE ✓";stats();return;}index++;render();});
$("resetBtn").addEventListener("click",()=>{player={x:50,y:55};render();});
document.querySelectorAll(".mode-card").forEach(b=>b.addEventListener("click",()=>{const chosen=b.dataset.mode;if(!modes[chosen])return;mode=chosen;index=0;player={x:50,y:55};held.clear();document.querySelectorAll(".mode-card").forEach(x=>x.classList.toggle("active",x===b));render();$("gamePanel").scrollIntoView({behavior:"smooth",block:"start"});}));
$("startBtn").addEventListener("click",()=>$("training").scrollIntoView({behavior:"smooth",block:"start"}));
document.querySelectorAll("[data-touch]").forEach(b=>b.addEventListener("pointerdown",e=>{e.preventDefault();const k=b.dataset.touch==="space"?" ":b.dataset.touch;log("TOUCH "+pretty(k));if(["w","a","s","d"].includes(k))move(k);mark(k);}));

document.querySelectorAll(".mode-card").forEach(card=>{
 card.addEventListener("pointermove",e=>{
  if(e.pointerType==="touch")return;
  const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  card.style.setProperty("--tilt-x",((.5-y)*8).toFixed(2)+"deg");
  card.style.setProperty("--tilt-y",((x-.5)*10).toFixed(2)+"deg");
 });
 card.addEventListener("pointerleave",()=>{card.style.setProperty("--tilt-x","0deg");card.style.setProperty("--tilt-y","0deg");});
});
render();
})();