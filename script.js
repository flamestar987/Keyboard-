(()=>{
const $=id=>document.getElementById(id);
const modes={
move:{title:"Movement basics",hint:"PRESS W A S D TO MOVE",tasks:[
{title:"Move forward",desc:"Press W or ↑ to move your character forward.",keys:["w"]},
{title:"Move left",desc:"Press A or ← to move left.",keys:["a"]},
{title:"Move backward",desc:"Press S or ↓ to move backward.",keys:["s"]},
{title:"Move right",desc:"Press D or → to move right.",keys:["d"]},
{title:"Move in every direction",desc:"Press W, A, S and D. Try moving diagonally too.",keys:["w","a","s","d"]}
]},
jump:{title:"Jump training",hint:"PRESS SPACE TO JUMP",tasks:[
{title:"Your first jump",desc:"Press SPACE to jump over the training obstacle.",keys:[" "]},
{title:"Jump again",desc:"Press SPACE two times to practice repeated jumps.",keys:[" "," "]},
{title:"Jump and move",desc:"Move forward with W, then jump with SPACE.",sequence:["w"," "]},
{title:"Jump and strafe",desc:"Press A, then SPACE, then D.",sequence:["a"," ","d"]}
]},
slide:{title:"Slide & crouch",hint:"PRESS C OR CTRL TO SLIDE",tasks:[
{title:"Crouch down",desc:"Press C to crouch under an obstacle.",keys:["c"]},
{title:"Try the other key",desc:"Press CTRL to practice the alternative crouch key.",keys:["control"]},
{title:"Slide while moving",desc:"Hold SHIFT to run, then press C to slide.",sequence:["shift","c"]},
{title:"Slide and move",desc:"Press W, then C, then D.",sequence:["w","c","d"]}
]},
sprint:{title:"Sprint training",hint:"HOLD SHIFT TO SPRINT",tasks:[
{title:"Start sprinting",desc:"Hold SHIFT to run faster.",hold:"shift"},
{title:"Sprint forward",desc:"Hold W and SHIFT together.",holdCombo:["w","shift"]},
{title:"Change direction",desc:"Hold SHIFT and press A, then D.",sequence:["shift","a","d"]},
{title:"Sprint and jump",desc:"Press SHIFT, W and SPACE in that order.",sequence:["shift","w"," "]}
]},
combo:{title:"Combo practice",hint:"FOLLOW THE KEY SEQUENCE",tasks:[
{title:"Forward + jump",desc:"Press W, then SPACE.",sequence:["w"," "]},
{title:"Sprint + forward",desc:"Press SHIFT, then W.",sequence:["shift","w"]},
{title:"Strafe + jump",desc:"Press A, SPACE, then D.",sequence:["a"," ","d"]},
{title:"The gamer combo",desc:"Press W, SHIFT, SPACE, then D.",sequence:["w","shift"," ","d"]},
{title:"Quick direction change",desc:"Press A, D, S, then W.",sequence:["a","d","s","w"]}
]},
quiz:{title:"Gaming key quiz",hint:"PICK THE RIGHT KEY",tasks:[
{title:"Which key usually makes you jump?",desc:"Choose the key used to jump in many PC games.",quiz:["space","w","e"],answer:"space"},
{title:"Which key usually moves you forward?",desc:"Choose the common forward movement key.",quiz:["a","w","s"],answer:"w"},
{title:"Which key often makes you sprint?",desc:"Choose the common sprint key.",quiz:["shift","r","q"],answer:"shift"},
{title:"Which key often lets you interact?",desc:"Choose the common interact or pick-up key.",quiz:["e","c","tab"],answer:"e"},
{title:"Which key often reloads?",desc:"Choose the common reload key.",quiz:["f","r","x"],answer:"r"}
]}
};
let mode="move",taskIndex=0,progress=0,sequenceIndex=0,points=0,done=0,streak=0,best=0,player={x:50,y:55},held=new Set(),seenKeys=new Set(),keyHistory=[];
const norm=e=>{let k=e.key.toLowerCase();return k===" "?" ":k};
const pretty=k=>({" ":"SPACE","arrowup":"↑","arrowdown":"↓","arrowleft":"←","arrowright":"→","control":"CTRL","shift":"SHIFT"}[k]||k.toUpperCase());
const task=()=>modes[mode].tasks[taskIndex];
function updateStats(){$("scoreStat").textContent=points;$("doneStat").textContent=done;$("streakStat").textContent=best;$("streakStat").title="Best streak: "+best;$("levelPill").textContent="LEVEL "+(taskIndex+1)}
function draw(){
 const t=task();$("gameTitle").textContent=modes[mode].title;$("taskTitle").textContent=t.title;$("taskDesc").textContent=t.desc;$("arenaHint").textContent=modes[mode].hint;
 $("progressText").textContent=(taskIndex+1)+" / "+modes[mode].tasks.length+" tasks";
 const needed=t.sequence||t.keys||t.holdCombo|| (t.hold?[t.hold]:[]);
 $("neededKeys").innerHTML=(t.quiz?t.quiz:needed).map((k,i)=>'<span class="keycap '+((t.sequence&&i<sequenceIndex)||(t.keys&&i<progress)?'done':'')+'">'+pretty(k)+'</span>').join("");
 $("keyGuide").innerHTML='<span class="keycap mini">W</span><span class="keycap mini">A</span><span class="keycap mini">S</span><span class="keycap mini">D</span><span class="guide-label">MOVE</span>';
 $("nextBtn").disabled=true;$("nextBtn").textContent=taskIndex===modes[mode].tasks.length-1?"FINISH MODE ✓":"NEXT CHALLENGE →";
 $("feedback").classList.remove("good");$("feedbackText").textContent="Waiting for your key...";$("keyLog").textContent=keyHistory.slice(-9).map(pretty).join("  ·  ")||"Your keys will appear here";
 $("player").style.left=player.x+"%";$("player").style.top=player.y+"%";$("player").classList.remove("sliding");
 $("target").style.display=mode==="move"?"grid":"none";updateStats();
}
function feedback(msg,good=false){$("feedbackText").textContent=msg;$("feedback").classList.toggle("good",good)}
function complete(msg){if($("nextBtn").disabled){points+=25;streak++;best=Math.max(best,streak);feedback(msg||"Nice! Challenge complete. +25 points",true);$("nextBtn").disabled=false;$("nextBtn").textContent=taskIndex===modes[mode].tasks.length-1?"FINISH MODE ✓":"NEXT CHALLENGE →";$("arenaHint").textContent="CHALLENGE COMPLETE!";updateStats()}}
function log(k){keyHistory.push(k);if(keyHistory.length>20)keyHistory.shift();$("keyLog").textContent=keyHistory.slice(-9).map(pretty).join("  ·  ")}
function move(k){
 let dx=0,dy=0;if(k==="w"||k==="arrowup")dy=-5;if(k==="s"||k==="arrowdown")dy=5;if(k==="a"||k==="arrowleft")dx=-5;if(k==="d"||k==="arrowright")dx=5;
 if(dx||dy){const scale=dx&&dy?.72:1;player.x=Math.max(8,Math.min(92,player.x+dx*scale));player.y=Math.max(14,Math.min(88,player.y+dy*scale));$("player").style.left=player.x+"%";$("player").style.top=player.y+"%";if(mode==="move"){const t=task();const action=({arrowup:"w",arrowleft:"a",arrowdown:"s",arrowright:"d"})[k]||k;if(t.keys.includes(action)){if(t.keys.length===4){if(!seenKeys.has(action)){progress++;seenKeys.add(action)}if(progress>=4)complete("Great movement! You used all four directions.");}else complete("Good move! +25 points");}}}
}
function handle(k){
 log(k);const t=task();
 if(mode==="quiz"){if(t.quiz.includes(k)){if(k===t.answer){complete("Correct! "+pretty(k)+" is the answer.");}else{streak=0;feedback("Not quite — try another key.");}}else feedback("That key isn't one of the choices.");return}
 if(mode==="move"){move(k);return}
 if(mode==="jump"){if(k===" "){$("player").animate([{transform:"translate(-50%,-50%) translateY(0)"},{transform:"translate(-50%,-50%) translateY(-65px)"},{transform:"translate(-50%,-50%) translateY(0)"}],{duration:420});if(t.sequence){if(k===t.sequence[sequenceIndex])sequenceIndex++;if(sequenceIndex>=t.sequence.length)complete("Nice jump combo!");}else{progress++;if(progress>=t.keys.length)complete("Jump practice complete!");else feedback("Good! Jump once more.");}}else if(t.sequence&&k===t.sequence[sequenceIndex]){sequenceIndex++;if(sequenceIndex>=t.sequence.length)complete("Perfect combo!");else feedback("Good! Next key: "+pretty(t.sequence[sequenceIndex]));}return}
 if(mode==="slide"){if(k==="c"||k==="control"){$("player").classList.add("sliding");setTimeout(()=>$("player").classList.remove("sliding"),450)}}
 if(t.sequence){if(k===t.sequence[sequenceIndex]){sequenceIndex++;if(sequenceIndex>=t.sequence.length)complete("Combo completed! Great work.");else feedback("Correct! Now press "+pretty(t.sequence[sequenceIndex])+".",true)}else{sequenceIndex=0;streak=0;feedback("Sequence reset. Start again with "+pretty(t.sequence[0])+".")}return}
 if(t.keys){if(t.keys.includes(k)){progress++;if(progress>=t.keys.length)complete("You got it!");else feedback("Correct key! Keep going.",true)}return}
 if(t.hold){if(k===t.hold){complete("Great! You pressed the sprint key.")}return}
 if(t.holdCombo){if(t.holdCombo.includes(k)){progress++;if(progress>=t.holdCombo.length)complete("Combo complete!")}return}
}
window.addEventListener("keydown",e=>{const k=norm(e);if([" ","arrowup","arrowdown","arrowleft","arrowright"].includes(k))e.preventDefault();if(held.has(k))return;held.add(k);if(k==="shift"&&mode==="sprint"&&task().hold==="shift")complete("You're sprinting! Hold SHIFT to run.");handle(k)});
window.addEventListener("keyup",e=>{held.delete(norm(e))});
$("nextBtn").addEventListener("click",()=>{if($("nextBtn").disabled)return;if(taskIndex===modes[mode].tasks.length-1){done++;feedback("Mode complete! Choose another skill.",true);$("nextBtn").disabled=true;$("nextBtn").textContent="MODE COMPLETE ✓";updateStats();return}taskIndex++;progress=0;sequenceIndex=0;held.clear();seenKeys.clear();draw()});
$("resetBtn").addEventListener("click",()=>{progress=0;sequenceIndex=0;held.clear();player={x:50,y:55};draw()});
document.querySelectorAll(".mode-card").forEach(b=>b.addEventListener("click",()=>{mode=b.dataset.mode;taskIndex=0;progress=0;sequenceIndex=0;held.clear();seenKeys.clear();player={x:50,y:55};document.querySelectorAll(".mode-card").forEach(x=>x.classList.toggle("active",x===b));draw()}));
$("startBtn").addEventListener("click",()=>$("training").scrollIntoView({behavior:"smooth"}));
document.querySelectorAll("[data-touch]").forEach(b=>{const k=b.dataset.touch==="space"?" ":b.dataset.touch;b.addEventListener("pointerdown",e=>{e.preventDefault();if(k===" "){handle(k);$("player").animate([{transform:"translate(-50%,-50%) translateY(0)"},{transform:"translate(-50%,-50%) translateY(-55px)"},{transform:"translate(-50%,-50%) translateY(0)"}],{duration:420})}else{move(k);handle(k)}})});
draw();
})();