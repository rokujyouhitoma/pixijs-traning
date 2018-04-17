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
            {name: "@yosuke_furukawa", url: "assets/yosuke_furukawa_icon_400x400.jpg"},
            {name: "@rokujyouhitoma", url: "assets/rokujyouhitoma_icon_400x400.jpg"},
            {name: "tileset", url: "third_party/assets/tileset.png"},
            {name: "spineboy", url: "third_party/assets/spine/spineboy.json"}])
        .on("progress", loadProgressHandler)
        .load(setup);
})();
function loadProgressHandler(loader, resource) {
    console.log(`progress: ${loader.progress}%, url: ${resource.url}, loading: ${resource.name}`);
}
let container, sprite, rocket, spineBoy, particles;
let currentSpriteName;
const SPRITE_NAME = "@yosuke_furukawa";
const PARTICLE_MAX = 400;
function setup(loader, res) {
    app.ticker.add(delta => gameloop(delta));
    // particle by used of @yosuke_furukawa
    setupParticle();
    // text message
    setupMessage();
    // sprite
    setupCircleIcon();
    // rocket by used of tileset
    setupRocket();
    // spineBoy by used of Spine data
    setupSpineBoy(res);
    setupParticle();
}
function setupMessage() {
    let style = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 36,
        fill: "white"
    });
    let message = new PIXI.Text("Love @yosuke_furukawa", style);
    app.stage.addChild(message);
    message.position.set(app.screen.width / 2 - message.width / 2, app.screen.height / 4);
}
function setupCircleIcon() {
    sprite = new PIXI.Sprite(PIXI.loader.resources[SPRITE_NAME].texture);
    sprite.anchor.set(0.5);
    sprite.scale.set(0.5, 0.5);
    sprite.rotation = 180 * Math.PI / 180;
    // circle for mask
    let circle = new PIXI.Graphics();
    app.stage.addChild(circle);
    circle.position.set(app.screen.width / 2, app.screen.height / 2);
    circle.beginFill();
    circle.lineStyle(0);
    circle.drawCircle(0, 0, 100);
    circle.endFill();
    container = new PIXI.Container();
    app.stage.addChild(container);
    container.position.set(app.screen.width / 2, app.screen.height / 2);
    container.addChild(sprite);
    container.mask = circle;
}
function setupRocket() {
    let texture = PIXI.utils.TextureCache["tileset"];
    let rectangle = new PIXI.Rectangle(192, 128, 64, 64);
    texture.frame = rectangle;
    rocket = new PIXI.Sprite(texture);
    rocket.position.set(32, 32);
    rocket.scale.set(1, 1);
    app.stage.addChild(rocket);
}
function setupSpineBoy(res) {
    spineBoy = new PIXI.spine.Spine(res.spineboy.spineData);
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
}
function gameloop(delta){
    // rotate and change @yosuke_furukawa texture
    container.rotation += 1/50 * delta;
    let candidateSpriteName = (Math.floor(container.rotation / (Math.PI / 2)) % 2 == 0) ? "@yosuke_furukawa" : "@rokujyouhitoma";
    if (currentSpriteName != candidateSpriteName) {
        currentSpriteName = candidateSpriteName;
        sprite.setTexture(PIXI.loader.resources[candidateSpriteName].texture);
    }
    // moving rocket
    rocket.x += 4 * delta;
    if (app.screen.width < rocket.x) {
        rocket.x = 0;
    }
    // moving spineBoy
    let speed = (spineBoy.state.getCurrent(0).animation.name == "jump") ? 6 : 2;
    spineBoy.x += speed * delta;
    if (app.screen.width < spineBoy.x) {
        spineBoy.x = 0;
    }
}
function setupParticle() {
    let container = new PIXI.ParticleContainer(PARTICLE_MAX, {alpha: true});
    app.stage.addChild(container);
    container.position.set(app.screen.width / 2, app.screen.height / 2);
    container.blendMode = PIXI.BLEND_MODES.ADD;
    var texture = PIXI.loader.resources[SPRITE_NAME].texture;
    particles = [];
    for (var i = 0; i < PARTICLE_MAX; i++) {
        var particle = new PIXI.Sprite(texture);
        container.addChild(particle);
        particle.anchor.set(0.5);
        var scale = 0.01 + Math.random() * 0.1;
        particle.scale.x = scale;
        particle.scale.y = scale;
        particle.position.x = (Math.random() - 0.5) * app.screen.width;
        particle.position.y = (Math.random() - 0.5) * app.screen.height;
        particle.life = 0.2 + Math.random() * 0.8;
        particle.alpha = 0.4;
        particles[i] = particle;
    }
    updateParticle();
}
function updateParticle() {
    emitParticle();
    requestAnimationFrame(updateParticle);
}
function emitParticle() {
    if (!particles) {
        return;
    }
    for (var i = 0; i < PARTICLE_MAX; i++) {
        let particle = particles[i];
        if (0 < particle.life) {
            particle.life -= 0.01;
            particle.alpha = 0.4 * particle.life;
        } else {
            particle.position.x = (Math.random() - 0.5) * app.screen.width;
            particle.position.y = (Math.random() - 0.5) * app.screen.height;
            particle.life = 0.2 + Math.random() * 0.8;
        }
    }
}
