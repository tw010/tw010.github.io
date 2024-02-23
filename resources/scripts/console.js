let histindex = 0
const history = []

let fortunes = ["loading fortunes"]

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

fetch('/resources/assets/fortunes')
.then(response => {
    if (!response.ok) {
        throw new Error('network response was not ok');
    }
    return response.text();
})
.then(data => {
    fortunes = data.split("\n%\n")
})
.catch(error => {
    fortunes = ["fortunes failed to load :("]
});

const cmds = [
    new Cmd(["notify"], "test notifications <content.., timeout (ms)>", (args) => {
        notify(args.slice(0,-1).join(" ").replaceAll("\\n","\n"),args[args.length-1])
    }),
    new Cmd(["fortune"], "print a random, hopefully interesting, adage", (args) => {
        out(fortunes[Math.floor(Math.random()*fortunes.length)])
    }),
    new Cmd(["echo","print","say"], "display a line of text", (args) => {
        out(args.join(" "))
    }),
    new Cmd(["clear"], "clear the console", (args) => {
        const children = document.getElementById("console").children;

        for (let i = children.length - 1; i >= 0; i--) {
            const child = children[i];
            if (child.id != "input")
                child.remove()
        }
    }),
    new Cmd(["help","?"], "general information", (args) => {
        out("console")
        out("underlined text is clickable")
        out("use up and down arrows to traverse history")
        out("")
        out("command list:")
        for(let i in cmds) {
            out(" "+cmds[i].names+": "+cmds[i].desc)
        }
    })
]

function fromhist(i){
    histindex = Math.max(Math.min(history.length, histindex+i),0)
    if(histindex==history.length){
        setinput("")
        return
    }
    setinput(history[histindex])
}

function submit(){
    const el = document.getElementById("infield")
    const cmd = el.value
    el.value=""
    const l = document.createElement("p")
    l.innerText=cmd
    
    enter(document.getElementById("input").children[0].cloneNode(true))
    enter(l)
    enter(document.createElement("br"))
    process(cmd)
}

function process(cmd){
    cmd = cmd.trim()
    if(cmd=="") return
    history.push(cmd)
    histindex=history.length
    const args = cmd.split(" ")
    for(let i in cmds){
        for(let j in cmds[i].names){
            if(cmds[i].names[j]==args[0]){
                args.shift()
                cmds[i].func(args)
                return
            }
        }
    }
    out("unknown command: \""+args[0]+"\"")
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

function setinput(s){
    document.getElementById("infield").value=s
}