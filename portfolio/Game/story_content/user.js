window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script95 = function()
{
  var obj = document.querySelectorAll("[data-acc-text='forest']");
obj.forEach(element => {
  element.addEventListener('mouseover', () => {
    gsap.to(element, { scale: 1.2, duration: 0.3, ease: "power1.out" });
  });
  element.addEventListener('mouseout', () => {
    gsap.to(element, { scale: 1, duration: 0.3, ease: "power1.in" });
  });
});

}

window.Script96 = function()
{
  var obj = document.querySelectorAll("[data-acc-text='ac1']");
gsap.to(obj, 
  { scale: 1.1, repeat: -1, yoyo: true, duration: 0.5, ease: "power1.inOut" }
);

}

};
