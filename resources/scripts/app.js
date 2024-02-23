function loadPage(s) {
    const el = document.createElement("div")
    el.setAttribute("hx-get", "/pages/"+s+".html")
    el.setAttribute("hx-swap", "outerHTML")
    el.setAttribute("hx-trigger", "load")
    document.getElementById("page").innerHTML=""
    document.getElementById("page").appendChild(el);
    htmx.process(el)
}

function setTitle(s){
    document.getElementById("title").innerText=s
}