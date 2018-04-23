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

 - [x] APIになれる
   - Larning Pixiこなしたので慣れたといえるだろう。
 - [x] 内部コードのインタフェース読み
 - [x] 内部コードの流し見
 - [ ] 内部コードの全読み
 - [x] APIドキュメントの流し見
 - [ ] APIドキュメントの全読み
 - [ ] pixi-spine.jsを追う。Spineを触る

## History

### 2018.4.23

 - Learn Pixi.jsを進める
   - Chapter 4
 - velocity.htmlを追加

### 2018.4.22

 - Learn Pixi.jsを進める
   - Chapter 2

### 2018.4.20

 - Learn Pixi.jsを始める
   - Chapter 1, 3

### 2018.4.19

 - Learning Pixiを進める

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

## Learn Pixi.js

英語だけど書籍出てたのでこなす。
=> Learning Pixiが増量された書籍だった...

 - [https://www.amazon.co.jp/dp/B01HXEJ4PC](Learn Pixi.js)
   - https://github.com/apress/learn-pixi.js

 - [x] Chapter 1: Making Sprites
 - [x] Chapter 2: Moving Sprites
 - [x] Chapter 3: Shapes, Text, and Groups
 - [x] Chapter 4: Making Games
 - [ ] Chapter 5: Animating Sprites
 - [ ] Chapter 6: Visual Effects and Transitions
 - [ ] Chapter 7: Mouse and Touch Events
 - [ ] APPENDIX Pixie Perilousness!—Complete Code

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
 - [x] Using velocity properties
 - [x] Game states
 - [x] Keyboarad Movement
 - [x] Grouping Sprites
 - [x] Using a ParticleContainer to group sprites
 - [x] Pixi's Graphic Primitives
 - [x] Displaying text
 - [x] Collision detection
 - [x] Case study: Treasure Hunter
 - [x] More about sprites
