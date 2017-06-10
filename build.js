/* eslint-env node */
"use strict";

var fs = require("fs-extra"),
  compressor = require("node-minify");

function foo() {
}

function copyFiles() {
  fs.copySync("./src/html/index.html", "./build/index.html");
  fs.copySync("./src/api/play.php", "./build/api/play/index.php");
  fs.copySync("./src/sounds/play.mp3", "./build/api/play/play.mp3");
  fs.copySync("./tmp/birdcam.min.css", "./build/resources/css/birdcam.min.css");
  fs.copySync("./tmp/birdcam.min.js", "./build/resources/js/birdcam.min.js");
  fs.copySync("./dependencies/fontello", "./build/vendors/fontello");
}

function concatJavascript() {
  compressor.minify({
    compressor: "no-compress",
    input: ["src/js/request.js", "src/js/Observable.js", "src/js/View.js", "src/js/BirdCam.js",
      "src/js/BirdCamViewer.js", "src/js/init.js",
    ],
    output: "./tmp/birdcam.min.js",
    sync: true,
    callback: foo,
  });
}

function concatCSS() {
  compressor.minify({
    compressor: "no-compress",
    input: "./src/css/*.css",
    output: "./tmp/birdcam.min.css",
    sync: true,
    callback: foo,
  });
}

concatJavascript();
concatCSS();
copyFiles();
