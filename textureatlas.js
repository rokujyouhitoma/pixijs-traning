// hey! @yosuke_furukawa!!
"use strict";
let app;
(function initialize() {
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
        type = "canvas";
    }
    PIXI.utils.sayHello(type);
    app = new PIXI.Application({
        width: 512,
        height: 512,
        antialias: true,
        transparent: false,
        resolution: 1
    });
    app.renderer.backgroundColor = 0x061639;
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = false;
    //app.renderer.resize(512, 512);
    app.stage.interactive = true;
    document.body.appendChild(app.view);
    // scale to window size.
    scaleToWindow(app.renderer.view);
    window.addEventListener("resize", function(event){
        scaleToWindow(app.renderer.view);
    });
    PIXI.loader
        .add([
            {name: "treasureHunter.json", url: "third_party/assets/treasureHunter.json"}])
        .on("progress", loadProgressHandler)
        .load(setup);
})();
function loadProgressHandler(loader, resource) {
    console.log(`progress: ${loader.progress}%, url: ${resource.url}, loading: ${resource.name}`);
}
let dungeon, explorer, treasure, door, id;
function setup(loader, res) {
    let dungeonTexture = PIXI.TextureCache["dungeon.png"];
    dungeon = new PIXI.Sprite(dungeonTexture);
    app.stage.addChild(dungeon);
    explorer = new PIXI.Sprite(
        loader.resources["treasureHunter.json"].textures["explorer.png"]
    );
    explorer.x = 68;
    explorer.y = app.stage.height / 2 - explorer.height / 2;
    app.stage.addChild(explorer);
    id = loader.resources["treasureHunter.json"].textures;
    treasure = new PIXI.Sprite(id["treasure.png"]);
    app.stage.addChild(treasure);
    treasure.x = app.stage.width - treasure.width - 48;
    treasure.y = app.stage.height / 2 - treasure.height / 2;
    app.stage.addChild(treasure);
    door = new PIXI.Sprite(id["door.png"]); 
    door.position.set(32, 0);
    app.stage.addChild(door);
    let numberOfBlobs = 6,
        spacing = 48,
        xOffset = 150;
    for (let i = 0; i < numberOfBlobs; i++) {
        let blob = new PIXI.Sprite(id["blob.png"]);
        let x = spacing * i + xOffset;
        let y = randomInt(0, app.stage.height - blob.height);
        blob.x = x;
        blob.y = y;
        app.stage.addChild(blob);
    }
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
