function ExecuteScript(strId)
{
  switch (strId)
  {
      case "60WxuhfkxhJ":
        Script1();
        break;
      case "6dVtHG2RI2Z":
        Script2();
        break;
      case "5nljE26ISsD":
        Script3();
        break;
      case "65lagSxtROW":
        Script4();
        break;
      case "6b0lMaBw89D":
        Script5();
        break;
      case "63O0Y3SoYVA":
        Script6();
        break;
      case "5wePbOK8TT4":
        Script7();
        break;
  }
}

function Script1()
{
  function isScriptAlreadyIncluded(src) {
  return document.querySelectorAll(`script[src="${src}"]`).length > 0;
}
 
function loadScript(src) {
  if (!isScriptAlreadyIncluded(src)) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
  }
}
 
const jquerySrc = 'story_content/external_files/jquery-3.6.0.min.js';
const customLibSrc = 'story_content/external_files/AIcustomLib.js';
 
loadScript(jquerySrc);
loadScript(customLibSrc);
}

function Script2()
{
  CopyResponse();
}

function Script3()
{
  ExportChat();
}

function Script4()
{
  SendMessage();
}

function Script5()
{
  SendMessage();
}

function Script6()
{
  CopyResponse();
}

function Script7()
{
  ExportChat();
}

