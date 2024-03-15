let canv, g

function graphinit() {
    canv = document.getElementById("graphc")
    g = canv.getContext("2d")
    g.fillStyle="black"
    g.fillRect(0,0,canv.width, canv.height)
}