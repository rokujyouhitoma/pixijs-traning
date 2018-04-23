"use strict";
let app;
const YOSUKE_FURUKAWA = "@yosuke_furukawa";
(function initialize() {
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
        type = "canvas";
    }
    PIXI.utils.sayHello(type);
    app = new PIXI.Application({
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
            {name: YOSUKE_FURUKAWA, url: "assets/yosuke_furukawa_icon_400x400.jpg"}])
        .on("progress", loadProgressHandler)
        .load(setup);
})();
function loadProgressHandler(loader, resource) {
    console.log(`progress: ${loader.progress}%, url: ${resource.url}, loading: ${resource.name}`);
}
let sprite;
let state = play;
function setup(loader, res) {
    sprite = new PIXI.Sprite(PIXI.loader.resources[YOSUKE_FURUKAWA].texture);
    sprite.position.set(100, 100);
    sprite.vx = 0;
    sprite.vy = 0;
    //sprite.anchor.set(0.5);
    sprite.scale.set(0.5, 0.5);
    app.stage.addChild(sprite);
    app.ticker.add(delta => gameLoop(delta));
}
function gameLoop(delta) {
    state();
}
function play() {
    sprite.vx = 1;
    sprite.vy = 1;
    sprite.x += sprite.vx;
    sprite.y += sprite.vy;
    let collision = contain(sprite, {
        x: 0,
        y: 0,
        width: app.renderer.view.width,
        height: app.renderer.view.height,
    });
    if (collision) {
        if (collision.has("left") || collision.has("right")) {
            sprite.vx = -sprite.vx;
        }
        if (collision.has("top") || collision.has("bottom")) {
            sprite.vy = -sprite.vy;
        }
    }
}
function contain(sprite, container) {
    var collision = new Set();
    if (sprite.x < container.x) {
        sprite.x = container.x;
        collision.add("left");
    }
    if (sprite.y < container.y) {
        sprite.y = container.y;
        collision.add("top");
    }
    if (sprite.x + sprite.width > container.width) {
        sprite.x = container.width - sprite.width;
        collision.add("right");
    }
    if (sprite.y + sprite.height > container.height) {
        sprite.y = container.height - sprite.height;
        collision.add("bottom");
    }
    if (collision.size === 0) collision = undefined;
    return collision;
}
