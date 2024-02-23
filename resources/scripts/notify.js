function notify(str){
    const p = document.getElementById("notify")
    const el = document.createElement("div")
    const s = str.split("\n")
    el.innerHTML=""
    for(let i = 0; i<s.length; i++){
        let e = "p"
        if(s[i]==""){
            e="br"
        }else if(s[i].startsWith("##")){
            e="h1"
            s[i]=s[i].substring(2, s[i].length)
        }else if(s[i].startsWith("#")){
            e="h3"
            s[i]=s[i].substring(1, s[i].length)
        }
        const ne = document.createElement(e)
        ne.innerText+=s[i]
        el.appendChild(ne)
    }
    p.appendChild(el)
    setTimeout(function(){p.removeChild(el)}, 2500)
}