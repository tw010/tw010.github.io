const size = 10

const m = 4

let x = 0, y = 0
let mousedown = false
let colormode = 0
let container

function nextColorMode(){
    notify("#cursor\ntrail "+(colormode==m-1 ? "removed" : "#"+(colormode+1)), 3200)
    colormode = (colormode+1)%m
}

document.addEventListener("mousedown", (e)=>{
    mousedown = true
})

document.addEventListener("mouseup", (e)=>{
    mousedown = false
})

document.addEventListener("mousemove", (e)=>{
    x = e.x - (e.x%size)
    y = e.y - (e.y%size)
    
    pixel3x3(x,y)
})

function pixel3x3(x, y){
    if(!container)
        container = document.getElementById("pixels")
    if(colormode==0) return
    for(let i = -1; i<2; i++){
        for(let j = -1; j<2; j++){
            let p = createPixel(x+(i*size),y+(j*size))
            container.appendChild(p)
            let time = (Math.random()+5)*100
            setTimeout(function(){
                p.style.opacity = 0
                setTimeout(function(){
                    p.remove()
                },300)
            }, time)
        }
    }
}

function createPixel(x, y){
    let s = document.getElementsByClassName("pixel")
    for(let i = 0; i<s.length; i++){
        let p = s[i]
        if(x+"px"==p.style.left&&y+"px"==p.style.top)
            p.remove()
    }

    let p = document.createElement("div")
    p.style.top=y+"px"
    p.style.left=x+"px"
    p.classList.add("pixel")
    p.style.opacity = 0.75
    switch(colormode){
        case 1: 
            p.style.backgroundColor = Math.random()<0.33 ? "rgb(30,30,30)" : Math.random()<0.67 ? "rgb(0,225,225)" : "rgb(204, 15, 211)"
        break
        case 2: 
            p.style.backgroundColor = "rgb("+Math.random()*256+","+Math.random()*256+","+Math.random()*256+")"
        break
        case 3: 
            p.style.backgroundColor = Math.random()<0.5 ? "rgb(0,225,225)" : "rgb(204, 15, 211)"
        break
    }

    return p
}