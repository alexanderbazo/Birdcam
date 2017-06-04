var fs = require("fs-extra"),
  compressor = require("node-minify");


function copyFiles() {
  fs.copySync("./src/html/index.html", "./build/index.html");
  fs.copySync("./tmp/birdcam.min.css", "./build/resources/css/birdcam.min.css");
  fs.copySync("./tmp/birdcam.min.js", "./build/resources/js/birdcam.min.js");
  fs.copySync("./dependencies/fontello", "./build/vendors/fontello");
}

function concatJavascript() {
  compressor.minify({
    compressor: "no-compress",
    input: ["src/js/Observable.js", "src/js/View.js", "src/js/BirdCam.js","src/js/BirdCamViewer.js","src/js/init.js"],
    output: "./tmp/birdcam.min.js",
    sync: true,
    callback: function(err, min) {
    }
  });
}

function concatCSS() {
  compressor.minify({
    compressor: "no-compress",
    input: "./src/css/*.css",
    output: "./tmp/birdcam.min.css",
    sync: true,
    callback: function(err, min) {
    }
  });
}

concatJavascript();
concatCSS();
copyFiles();
