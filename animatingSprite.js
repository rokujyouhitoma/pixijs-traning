"use strict";
let app;
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
    scaleToWindow(app.renderer.view);
    window.addEventListener("resize", function(event){
        scaleToWindow(app.renderer.view);
    });
    PIXI.loader
        .add([
            {name: "adventuress", url: "third_party/assets/adventuress.png"}])
        .on("progress", loadProgressHandler)
        .load(setup);
})();
function loadProgressHandler(loader, resource) {
    console.log(`progress: ${loader.progress}%, url: ${resource.url}, loading: ${resource.name}`);
}
function setup(loader, res) {
    let su = new SpriteUtilities(PIXI);
    let frames = su.filmstrip("adventuress", 32, 32);
    let adventuress = su.sprite(frames);
    adventuress.vx = 0;
    adventuress.vy = 0;
    adventuress.position.set(32, 32);
    app.stage.addChild(adventuress);
    adventuress.states = {
        down: 0,
        left: 3,
        right: 6,
        up: 9
    };
    app.ticker.add(delta => gameLoop(delta));
}
function gameLoop(delta) {
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
function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    key.downHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) {
                key.press();
            }
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };
    key.upHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) {
                key.release();
            }
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);
    return key;
}
