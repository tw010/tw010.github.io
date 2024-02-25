function loadPage(s, afterReq) {
    if(!app) toggleApp()
    setTitle(s)
    const el = document.createElement("div")
    el.setAttribute("hx-get", "/pages/"+s+".html")
    el.setAttribute("hx-swap", "outerHTML")
    el.setAttribute("hx-trigger", "load")
    document.getElementById("page").innerHTML=""
    document.getElementById("page").appendChild(el);

    el.addEventListener('htmx:afterRequest', function(){afterReq()});

    htmx.process(el)
}

function setTitle(s){
    document.getElementById("title").innerText=s
}

let app = true
function toggleApp(){
    app=!app
    const el = document.getElementById("app")
    const ta = document.getElementById("toggleapp")
    if(app){
        el.style.scale = 1
        ta.style.scale = 1
    }else{
        el.style.scale = 0
        ta.style.scale = 0.5
    }
}

window.addEventListener('load', function() {
    loadPage("about")
    if(mobile)
        notify("#optimizing for mobile\n(todo: an actual check)", 5000)
});