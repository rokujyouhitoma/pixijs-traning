// hey! @yosuke_furukawa!!
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
PIXI.loader
    .add([
        {name: "@yosuke_furukawa", url: "assets/yosuke_furukawa_icon_400x400.jpg", onComplete: onCompleteHandler},
        {name: "@rokujyouhitoma", url: "assets/rokujyouhitoma_icon_400x400.jpg", onComplete: onCompleteHandler},
        {name: "tileset", url: "third_party/assets/tileset.png"},
        {name: "spineboy", url: "third_party/assets/spine/spineboy.json"}])
    .on("progress", loadProgressHandler)
    .load(setup);
function onCompleteHandler() {
}
function loadProgressHandler(loader, resource) {
    console.log(`progress: ${loader.progress}%, url: ${resource.url}, loading: ${resource.name}`);
}
function setup(loader, res) {
    app.ticker.add(delta => gameloop(delta));
    // hello @yosuke_furukawa
    let spriteName = "@yosuke_furukawa";
    let sprite = new PIXI.Sprite(PIXI.loader.resources[spriteName].texture);
    sprite.anchor.set(0.5);
    sprite.position.set(app.screen.width / 2, app.screen.height / 2);
    sprite.scale.set(0.5, 0.5);
    sprite.rotation = 180 * Math.PI / 180;
    app.stage.addChild(sprite);
    // rocket by used of tileset
    let texture = PIXI.utils.TextureCache["tileset"];
    let rectangle = new PIXI.Rectangle(192, 128, 64, 64);
    texture.frame = rectangle;
    let rocket = new PIXI.Sprite(texture);
    rocket.position.set(32, 32);
    rocket.scale.set(1, 1);
    app.stage.addChild(rocket);
    // spineBoy by used of Spine data
    let spineBoy = new PIXI.spine.Spine(res.spineboy.spineData);
    spineBoy.position.set(spineBoy.width, app.screen.height);
    spineBoy.scale.set(1.5);
    spineBoy.stateData.setMix('walk', 'jump', 0.2);
    spineBoy.stateData.setMix('jump', 'walk', 0.4);
    spineBoy.state.setAnimation(0, 'walk', true);
    app.stage.addChild(spineBoy);
    app.stage.on('pointerdown', function() {
        spineBoy.state.setAnimation(0, 'jump', false);
        spineBoy.state.addAnimation(0, 'walk', true, 0);
    });
    function gameloop(delta){
        // rotate and change @yosuke_furukawa texture
        sprite.rotation += 1/50 * delta;
        let candidateSpriteName = (Math.floor(sprite.rotation / (Math.PI / 2)) % 2 == 0) ? "@yosuke_furukawa" : "@rokujyouhitoma";
        if (spriteName != candidateSpriteName) {
            spriteName = candidateSpriteName;
            sprite.setTexture(PIXI.loader.resources[spriteName].texture);
        }
        // moving rocket
        rocket.x += 1;
        if (app.screen.width < rocket.x) {
            rocket.x = 0;
        }
    }
}
