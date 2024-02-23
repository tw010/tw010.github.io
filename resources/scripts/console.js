let histindex = 0
const history = []

class Cmd {
    names;
    desc;
    func;
    constructor(names, desc, func){
        this.names = names
        this.desc = desc;
        this.func = func
    }
}

const cmds = [
    new Cmd(["clear"], "clear the console", () => {
        const children = document.getElementById("console").children;

        for (let i = children.length - 1; i >= 0; i--) {
            const child = children[i];
            if (child.id != "input")
                child.remove()
        }
    }),
    new Cmd(["help","?"], "general information", () => {
        out("command list:")
        for(let i in cmds) {
            out(" - "+cmds[i].names+": "+cmds[i].desc)
        }
    })
]

function submit(){
    const el = document.getElementById("infield")
    const cmd = el.value
    el.value=""
    const l = document.createElement("p")
    l.innerText=cmd
    
    enter(document.getElementById("input").childNodes[0].cloneNode(true))
    enter(l)
    enter(document.createElement("br"))
    process(cmd)
}

function process(cmd){
    if(cmd=="") return
    history.push(cmd)
    for(let i in cmds){
        for(let j in cmds[i].names){
            if(cmds[i].names[j]==cmd){
                cmds[i].func()
                return
            }
        }
    }
    out("unknown command: \""+cmd+"\"")
}

function out(s){
    let o = document.createElement("p")
    o.innerText=s
    enter(o)
    enter(document.createElement("br"))
}

function enter(el){
    const console = document.getElementById("console")
    console.insertBefore(el, document.getElementById("input"));
    console.scrollTop = console.scrollHeight;
}