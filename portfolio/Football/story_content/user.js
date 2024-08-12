function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6OipseVY6vp":
        Script1();
        break;
      case "5sEJdfIFhOq":
        Script2();
        break;
      case "5ljCUSLoiZ2":
        Script3();
        break;
  }
}

function Script1()
{
  let player = GetPlayer();
let ftb = document.getElementsByClassName("slideobject-maskable")[10]

player.SetVar("object", ftb)


}

function Script2()
{
  let player = GetPlayer();
let moveX = player.GetVar("x")
let moveY = player.GetVar("y")
let ftb =  player.GetVar("object")

ftb.style.transform = "translate("+ moveX +"px," +moveY + "px)"
}

function Script3()
{
  let player = GetPlayer();
let moveX = player.GetVar("x")
let moveY = player.GetVar("y")
let ftb =  player.GetVar("object")

ftb.style.transform = "translate("+ moveX +"px," +moveY + "px)"
}

