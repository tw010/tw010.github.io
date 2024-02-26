const params = new URLSearchParams(document.location.search);
const pages = {
    "console": null,
    "about": null,
    "github": createRepoList,
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

//i guess this is called when the dom is loaded and the htmx requests not yet in chromium
//and after everything loaded in firefox
//todo: i guess an htmx:afterRequest on every base element, or just move all of them into index (optimal solution, but its gonna be a mess)
window.addEventListener('load', () => {
    loadPage(params.get("p"))

    if(params.has("bg")){
        if(!mobile)
            toggle()
        toggleApp()
        return
    }
});