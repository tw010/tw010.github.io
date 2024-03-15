const params = new URLSearchParams(document.location.search);
const pages = {
    "about": null,
    "console": null,
    "github": createRepoList,
    "graphs": graphinit,
}

function loadPage(s) {
    if(!(s in pages)) {
        loadPage("about")
        return
    }

    if(!app) toggleApp()
    if(mobile&&v) toggle()
    setTitle(s)

    const el = document.createElement("div")
    el.setAttribute("hx-get", "/pages/"+s+".html")
    el.setAttribute("hx-swap", "outerHTML")
    el.setAttribute("hx-trigger", "load")

    document.getElementById("page").innerHTML=""
    document.getElementById("page").appendChild(el);

    let url = new URL(window.location.href);
    url.searchParams.set("p", s)
    window.history.replaceState({}, '', url);

    el.addEventListener('htmx:afterRequest', pages[s]);

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

window.onload = function() {
    const bhx = document.body.querySelectorAll("div[hx-get]")
    let n = bhx.length
    for(let i = 0; i<bhx.length; i++) {
        bhx[i].addEventListener("htmx:afterRequest", ()=>{n--})
    }
    const wfl = setInterval(()=>{
        if(n!=0) return
        clearTimeout(wfl)
        
        loadPage(params.get("p"))

        if(params.has("bg")){
            if(!mobile)
                toggle()
            toggleApp()
            return
        }
    }, 100)
};