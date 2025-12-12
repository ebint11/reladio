function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6PttdkKbfAY":
        Script1();
        break;
      case "6Sf1vt6bYoS":
        Script2();
        break;
      case "6AGRZgvsAky":
        Script3();
        break;
      case "6B6FOgkrZOx":
        Script4();
        break;
      case "6CTULkjSDC4":
        Script5();
        break;
      case "6pMqvMAZf6v":
        Script6();
        break;
      case "5vos3tVFxPV":
        Script7();
        break;
      case "6m1EbF7HAjb":
        Script8();
        break;
      case "5zvulsFeYDo":
        Script9();
        break;
      case "5VXndq91xMN":
        Script10();
        break;
      case "5V27pWezoUv":
        Script11();
        break;
      case "6RKYRZGBjaP":
        Script12();
        break;
      case "5xaOj7XPnEP":
        Script13();
        break;
  }
}

window.InitExecuteScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script1 = function()
{
  player.once(() => {
const target = object('6eR3y9H5GI9');
const duration = 750;
const easing = 'ease-out';
const id = '65qorKrhmYv';
const pulseAmount = 0.07;
const delay = 0;
addToTimeline(
target.animate(
[ {scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script2 = function()
{
  const target = object('6eR3y9H5GI9');
const duration = 750;
const easing = 'ease-out';
const id = '65qorKrhmYv';
const pulseAmount = 0.07;
player.addForTriggers(
id,
target.animate(
[ {scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

};
