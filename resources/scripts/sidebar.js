const trans = 50;

let v = true;
let an = null;
let id = null;

function toggle() {
  const bar = document.getElementById("sidebar");
  const buttons = bar.children;
  v = !v;

  window.clearInterval(id);
  if (v) {
    bar.style.opacity="1"
    bar.style.height="100%";
    bar.style.visibility="visible"
    bar.style.overflow="scroll"
    document.getElementById("app").style.marginTop=""
    document.getElementById("app").style.position="relative"
    document.getElementById("app").style.left="0"
    an = 0;
    id = window.setInterval(function () {
      if(an<buttons.length){
        buttons[an].style.transform = "";
        an++;
      }else{
        window.clearInterval(id);
      }
    }, trans);
  } else {
    an = buttons.length - 1;
    id = window.setInterval(function () {
      if(an>0){
        buttons[an].style.transform= "translateX(-200%)";
        an--;
      }else{
        bar.style.opacity="0.75"
        bar.style.height="0"
        bar.style.visibility="hidden"
        bar.style.overflow="visible"
        document.getElementById("app").style.left="-3rem"
        document.getElementById("app").style.marginTop="6em"
        document.getElementById("app").style.position="fixed"
        window.clearInterval(id);
      }
    }, trans);
  }
}