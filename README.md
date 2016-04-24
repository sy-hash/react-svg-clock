# Simple Analog Clock

## 概要

とてもシンプルなアナログ時計です。  
Reactを使用して、SVGを描画しています。

## 構成

<root>
  ├─ README.md
  └─ <src>
       ├─ index.html
       └─ clock.js

## 留意点

ローカル上では、ローカルファイル読み込みが発生するため、Chromeなどでは正常に動作しません。  
サーバーに配置するか、Chrome で開く場合は "-allow-file-access-from-files" オプションを使用してください。

## Library

* React  
  https://facebook.github.io/react/