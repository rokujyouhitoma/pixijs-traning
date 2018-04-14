let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}
PIXI.utils.sayHello(type)
let app = new PIXI.Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1
})
app.renderer.backgroundColor = 0x061639
app.renderer.view.style.position = "absolute"
app.renderer.view.style.display = "block"
app.renderer.autoResize = false
//app.renderer.resize(window.innerWidth, window.innerHeight)
app.renderer.resize(1024, 1024)
document.body.appendChild(app.view)
// scale to window size.
scaleToWindow(app.renderer.view)
window.addEventListener("resize", function(event){
    scaleToWindow(app.renderer.view)
})
// hey! @yosuke_furukawa!!
PIXI.loader
    .add([
        {name: "@yosuke_furukawa", url: "assets/yosuke_furukawa_icon_400x400.jpg"},
        {name: "@yosuke_furukawa2", url: "assets/yosuke_furukawa_face.png"}])
    .on("progress", loadProgressHandler)
    .load(setup)
function loadProgressHandler(loader, resource) {
    console.log("progress: " + loader.progress + "%")
    console.log("url: " + resource.url)
    console.log("loading: " + resource.name)
}
function setup() {
    let sprite = new PIXI.Sprite(PIXI.loader.resources["@yosuke_furukawa"].texture)
    sprite.anchor.set(0.5)
    sprite.x = app.screen.width / 2
    sprite.y = app.screen.height / 2
    app.stage.addChild(sprite)
    // rotate @yosuke_furukawa
    app.ticker.add(function(delta){
        sprite.rotation += 1/50 * delta
    })
}
