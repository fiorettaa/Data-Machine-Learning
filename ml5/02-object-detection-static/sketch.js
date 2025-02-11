/*
  Data and Machine Learning for Artistic Practice (DMLAP)
  Spring Term 2025
  Object Detection on a Static Image

  This sketch is deprecated, using an older version of ml5.js.
  Check how we call a specific ml5 library in the html.

  Original sketch: https://editor.p5js.org/ml5/sketches/ObjectDetector_COCOSSD_single_image
  Reference here: https://learn.ml5js.org/#/reference/object-detector
  And other examples: https://learn.ml5js.org/#/reference/object-detector?id=examples
*/

let detector,
    pic,
    detections = [];

// load our model & image before setup
function preload() {
  // load our object detection model `cocossd` – you could use `yolo` instead
  detector = ml5.objectDetector('cocossd'); 

  // load our image, try the other ones in the directory!
  pic = loadImage('images/dog.jpg');
}

function setup() {
  createCanvas(pic.width, pic.height);

  console.log("Setting up, about to detect...");
  // start our detector, give the callback function of gotResults()
  detector.detect(pic, gotResults); 
}

function draw() {
  // clear the background
  background(0);

  // draw dog photo
  image(pic, 0, 0);

  // loop through all our detections and draw them
  for (let object of detections) {

    // we use lerp to color the border somewhere between red and green based on the confidence of the prediction
    stroke(lerpColor(color(255,0,0), color(0, 255, 0), object.confidence));
    strokeWeight(3);
    noFill();
    // draw rectangle around a detection
    rect(object.x, object.y, object.width, object.height);

    // We could also use the normalised values, these represent the percentage
    // across the screen as a value between 0 and 1 – so we multiply these out
    // by the width and height of the canvas:
    // rect(object.normalized.x * pic.width,
    //      object.normalized.y * pic.height,
    //      object.normalized.width * pic.width,
    //      object.normalized.height * pic.height);

    // draw the label
    fill(255);
    noStroke();
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }

  // Ideas to explore:

  // Could you think of a way to show the user (without requiring them to look into the console) 
  // that the model is currently processing the image? You could use the fact that `detections` is 
  // empty, i.e. has a length of 0.

  // What about shifting the things you visualise? Instead of showcasing the original image, 
  // you could draw only the predicted labels, and/or only the bounding boxes, and use these as material for
  // some generative art.
}

// Our callback function!
function gotResults(err, results) {
  if (err) {
    console.log("We had an error with the detection:", err);
    return;
  }
  // remember our detections so that we can draw them in draw()
  detections = results;
  // if you want to see what `detections` look like
  console.log(detections); 
}
