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
    bar.style.height="100%";
    bar.style.borderRadius="0%";
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
        bar.style.height="6em"
        bar.style.borderRadius="0% 0% 2rem 0%"
        window.clearInterval(id);
      }
    }, trans);
  }
}