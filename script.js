let ec;
let xp=0;
let health=100;
let gold=50;
let currentWeapon=0;
let monsterHealth;
let inventory=["stick"];


const button1=document.querySelector("#button1");
const button2=document.querySelector("#button2");
const button3=document.querySelector("#button3");
const text=document.querySelector("#text");
const xpText=document.querySelector("#xptext");
const healthText=document.querySelector("#healthtext");
const goldText=document.querySelector("#goldtext");
const monsterStats=document.querySelector("#monsterstats");
const monsternametext=document.querySelector("#monstername");
const monsterhealthText=document.querySelector("#monsterhealth");

button1.onclick=goStore;
button2.onclick=goCave;
button3.onclick=fightDragon;

const weapons=[
  {name:"stick",power:5},
  {name:"dagger",power:30},
  {name:"clawhammer",power:50},
  {name:"sword",power:100}
]

const monsters=[
  {name:"slime",level:2,health:15},
  {name:"beast",level:8,health:60},
  {name:"dragon",level:20,health:300}
]

const locations=[
  {
    name:"townsquare",
    "button-text":["Go to Store","Go to Cave","Fight Dragon"],
    "button-function":[goStore,goCave,fightDragon],
    text:"yo you are in town square"
  },
  {
    name:"gostore",
    "button-text":["buy health","buy weapon","townsquare"],
    "button-function":[buyHealth,buyWeapon,goTown],
    text:"you entered store"
  },
  {
    name:"cave",
    "button-text":["fight slime","fight beast","townsquare"],
    "button-function":[fightSlime,fightBeast,goTown],
     text:"you enterd cave"
  },
  {
    name:"fight",
    "button-text":["attack","dodge","run"],
    "button-function":[attack,dodge,goTown],
    text:"you are fighting monsters "
  },
  {
    name:"kill monster",
    "button-text":["go to town","go to town","go to town"],
    "button-function":[goTown,goTown,easterEgg],
    text:"monster died hero got gold and xp"
  },
  {
    name:"lose",
    "button-text":["replay","replay","replay"],
    "button-function":[restart,restart,restart],
    text:"you died"
  },
  {
    name:"win",
    "button-text":["replay","replay","replay"],
    "button-function":[restart,restart,restart],
    text:"you have won game"
  },
  {
    name:"easter egg",
    "button-text":["2","8","go townsquare"],
    "button-function":[pickTwo,pickEight,goTown],
    text:"pick a number from above"
 }
]


function update(location){
  monsterStats.style.display="none";
  button1.innerText=location["button-text"][0];
  button2.innerText=location["button-text"][1];
  button3.innerText=location["button-text"][2];
  button1.onclick=location["button-function"][0];
  button2.onclick=location["button-function"][1];
  button3.onclick=location["button-function"][2];
  text.innerText=location.text;
}

function goTown(){
  update(locations[0]);
}
function goStore(){
  update(locations[1]);
}
function goCave(){
  update(locations[2]);
}
function fightDragon(){
  ec=2;
  goFight();
}
function fightBeast(){
  ec=1;
  goFight();
}
function fightSlime(){
  ec=0;
  goFight();
}
function goFight(){
  update(locations[3]);
  monsterStats.style.display="block";
  monsterHealth=monsters[ec].health;
  monsternametext.innerText=monsters[ec].name;
  monsterhealthText.innerText=monsterHealth;
}
function buyHealth(){
  if(gold>=10){
    gold-=10;
    health+=10;
    goldText.innerText=gold;
    healthText.innerText=health;
  }
  else{
    text.innerText="poor,no money for health";
  }
}
function buyWeapon(){
  if(currentWeapon<weapons.length-1){
    if(gold>=30){
      gold-=30;
      currentWeapon++;
      goldText.innerText=gold;
      let newWeapon=weapons[currentWeapon].name;
      text.innerText="you now have "+newWeapon+".";
      inventory.push(newWeapon);
      text.innerText+="ok now your weapons are"+inventory;
    }
    else{
      text.innerText="no gold to buy weapon";
    }
  }
  else{
    text.innerText="you already have all weapons";
    button2.innerText="sell weapon for 15 gold";
    button2.onclick=sellWeapon;
  }
}
function sellWeapon(){
  if(inventory.length>1){
    gold+=15;
    goldText.innerText=gold;
    let currentWeapon=inventory.shift();
    text.innerText="you sold "+currentWeapon;
    text.innerText+="now you are having"+inventory;
  }
  else{
    text.innerText="man you have only single weapon";
  }
}
function attack(){
  text.innerText="the "+monsters[ec].name+" attacks. ";
  text.innerText+="you attack with "+weapons[currentWeapon].name;
  if(isMonsterHit()){
    health-=getMonsterAttackValue(monsters[ec].level);
  }
  else{
    text.innerText+=", you miss";
  }
  monsterHealth-=weapons[currentWeapon].power+Math.floor(Math.random()*xp)+1;
  healthText.innerText=health;
  monsterhealthText.innerText=monsterHealth;
  if(health<=0){
    lose();
  }
  else if(monsterHealth<=0){
    if(ec===2){
      winGame();
    }
    else{
      defeatMonster();
    }
  }
  if(Math.random()<=.1 && inventory.length!==1){
    text.innerText+="your "+inventory.pop()+" broke";
    currentWeapon--;
  }
}
function isMonsterHit(){
  return Math.random()>.2||health<20;
}
function lose(){
  update(locations[5]);
}
function dodge(){
  text.innerText="you dodged attack from"+monsters[ec].name;
}
function defeatMonster(){
  gold+=Math.floor(monsters[ec].level*6.7);
  xp+=monsters[ec].level;
  goldText.innerText=gold;
  xpText.innerText=xp;
  update(locations[4]);
}
function restart(){
    xp=0;
    health=100;
    gold=50;
    currentWeapon=0;
    inventory=["stick"];
    goldText.innerText=gold;
    healthText.innerText=health;
    xpText.innerText=xp;
    goTown();
}
function winGame(){
  update(locations[6]);
}
function getMonsterAttackValue(level){
  let hit=(level*5)-(Math.floor(Math.random()*xp));
  return hit;
}
function easterEgg(){
  update(locations[7]);
}
function pickTwo(){
  pick(2);
}
function pickEight(){
  pick(8);
}
function pick(guess){
  let numbers=[];
  while(numbers.length<10){
    numbers.push(Math.floor(Math.random()*11));
  }
  text.innerText="you picked"+guess+".here are the random numbers:\n";
  for(let i=0;i<10;i++){
    text.innerText+=numbers[i]+"\n";
  }
  if(numbers.indexOf(guess)!==-1){
    text.innerText+="right!you win 20 gold";
    gold+=20;
    goldText.innerText=gold;
  }
  else{
    text.innerText+="wrong you loose 10 health";
    health-=10;
    healthText.innerText=health;
    if(health<=0){
      lose();
    }
  }
}