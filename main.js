"use strict";
let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas";
}
PIXI.utils.sayHello(type);
let app = new PIXI.Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1
});
app.renderer.backgroundColor = 0x061639;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = false;
//app.renderer.resize(window.innerWidth, window.innerHeight)
app.renderer.resize(1024, 1024);
app.stage.interactive = true;
document.body.appendChild(app.view);
// scale to window size.
scaleToWindow(app.renderer.view);
window.addEventListener("resize", function(event){
    scaleToWindow(app.renderer.view);
});
// hey! @yosuke_furukawa!!
PIXI.loader
    .add([
        {name: "@yosuke_furukawa", url: "assets/yosuke_furukawa_icon_400x400.jpg", onComplete: onCompleteHandler},
        {name: "@yosuke_furukawa2", url: "assets/yosuke_furukawa_face.png"}])
    .add("tileset", "third_party/assets/tileset.png")
    .add("spineboy", "third_party/assets/spine/spineboy.json")
    .on("progress", loadProgressHandler)
    .load(setup);
function onCompleteHandler() {
}
function loadProgressHandler(loader, resource) {
    console.log("progress: " + loader.progress + "%");
    console.log("url: " + resource.url);
    console.log("loading: " + resource.name);
}
function setup(loader, res) {
    let sprite = new PIXI.Sprite(PIXI.loader.resources["@yosuke_furukawa"].texture);
    sprite.anchor.set(0.5);
    sprite.position.set(app.screen.width / 2, app.screen.height / 2);
    sprite.scale.set(0.5, 0.5);
    sprite.rotation = 180 * Math.PI / 180;
    app.stage.addChild(sprite);
    // rotate @yosuke_furukawa
    app.ticker.add(function(delta){
        sprite.rotation += 1/50 * delta;
    });
    let texture = PIXI.utils.TextureCache["tileset"];
    let rectangle = new PIXI.Rectangle(192, 128, 64, 64);
    texture.frame = rectangle;
    let rocket = new PIXI.Sprite(texture);
    rocket.x = 32;
    rocket.y = 32;
    rocket.scale.set(2, 2);
    app.stage.addChild(rocket);
    // spineBoy
    console.log(res.spineboy);
    let spineBoy = new PIXI.spine.Spine(res.spineboy.spineData);
    console.log(spineBoy.width);
    spineBoy.x = spineBoy.width;
    spineBoy.y = app.screen.height;
    spineBoy.scale.set(1.5);
    spineBoy.stateData.setMix('walk', 'jump', 0.2);
    spineBoy.stateData.setMix('jump', 'walk', 0.4);
    spineBoy.state.setAnimation(0, 'walk', true);
    app.stage.addChild(spineBoy);
    app.stage.on('pointerdown', function() {
        spineBoy.state.setAnimation(0, 'jump', false);
        spineBoy.state.addAnimation(0, 'walk', true, 0);
    });
}
