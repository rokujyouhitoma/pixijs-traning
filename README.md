# pixi.js

## 目的

pixi.jsのキャッチアップ。

## 指針

 - とにかくpixi.jsに触れる
 - ES6使う

## アプローチ

 - まずはAPIになれる。一通りAPIを触る
 - 内部コードの把握。段階ごとのアプローチを取る

## 環境

### ローカル環境

 - emacs 25.3.1
   - js2-mode
   - auto-complete

### ライブラリ

 - pixi.js 4.7.1
 - その他ライブラリ
   - [third_party/README.md](/third_party/README.md) に記載

### TODO

 - [ ] APIになれる
 - [x] 内部コードのインタフェース読み
 - [x] 内部コードの流し見
 - [ ] 内部コードの全読み
 - [ ] APIドキュメントの流し見
 - [ ] APIドキュメントの全読み
 - [ ] pixi-spine.jsを追う。Spineを触る

## History

### 2018.4.18

 - Learning Pixiを進める
 - (SpriteStudioのランタイムをPixi.jsで実現しようとして挫折...)

### 2018.4.17

 - ParticleContainerを使う
 - 内部コードのインタフェース読み、流し見
   - @mitsuhiko のコード（しかもシェーダ。彼シェーダ書くの...）が取り込まれてて衝撃を受ける

### 2018.4.16

 - Learning Pixiを進める
 - SpriteのTextureを動的に切り替える
 - Maskを使う。PIXI.Graphicsで抜く

### 2018.4.15

 - pixi-spine.jsを導入
 - Spine(spineBoy)を試しに動かす

### 2018.4.14

 - Learning Pixiを進める
 - README.mdの整備。目的、アプローチ、TODOを定義する

### 2018.4.13

 - Learning Pixiを開始
 - hello! @yosuke_furukawa sprite!!
 - scaleToWindowの導入。ウィンドウ領域に合わせる

## Learning Pixi

https://github.com/kittykatattack/learningPixi

 - [x] Introduction
 - [x] Setting up
 - [x] Installing Pixi
 - [x] Creating the stage and renderer
 - [x] Pixi sprites
 - [x] Loading images into the texture cache
 - [x] Displaying sprites
 - [x] Using Aliases
 - [x] A little more about loading things
 - [x] Make a sprite from an ordinary JavaScript Image object or Canvas
 - [x] Assigning a name to a loaded file
 - [x] Monitoring load progress
 - [x] More about Pixi's loader
 - [x] Positioning sprites
 - [x] Size and scale
 - [x] Rotation
 - [x] Make a sprite from a tileset sub-image
 - [x] Using a texture atlas
 - [x] Loading the texture atlas
 - [x] Creating sprites from a loaded texture atlas
 - [x] Moving Sprites
 - [ ] Using velocity properties
 - [ ] Game states
 - [ ] Keyboarad Movement
 - [x] Grouping Sprites
 - [x] Using a ParticleContainer to group sprites
 - [ ] Pixi's Graphic Primitives
 - [x] Displaying text
 - [ ] Collision detection
 - [ ] Case study: Treasure Hunter
 - [x] More about sprites
 - [ ] Taking it further
