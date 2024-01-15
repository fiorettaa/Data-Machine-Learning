/*
  Data and Machine Learning for Artistic Practice (DMLAP)
  Spring Term 2024
  Object detection with a Webcam

  Original sketch: https://editor.p5js.org/ml5/sketches/ObjectDetector_COCOSSD_Video
  Reference here: https://learn.ml5js.org/#/reference/object-detector
  And other examples: https://learn.ml5js.org/#/reference/object-detector?id=examples
*/

let video,
    detector,
    detections = [];

function preload() {
  // load your object detection model `cocossd` – you could use 'yolo'
  detector = ml5.objectDetector('cocossd'); 
}

function setup() {
  createCanvas(640, 480);
  // load our webcam feed, when the video is ready the videoReady callback will be called
  video = createCapture(VIDEO, videoReady); 
  video.size(640, 480);
  video.hide();
}

function videoReady(stream) {
  // we now know the video is ready, so we'll start the detection

  // start our detector, pass in the callback function 'gotResults' 
  // this will be called once a detection is performed, i.e. we get some results
  detector.detect(video, gotResults); 
}

function draw() {
  background(0);

  // draw webcam frame
  image(video, 0, 0);

  // IDEA: instead of only using the model as intended (image detection), how about
  //       using, say, only the labels, or only the bounding boxes, as material for
  //       some generative art where we would not necessarily even see the video feed?
  // IDEA: note that the labels could be used poetically: for instance, you could choose
  //       a large text file (containing one or more novels, poetry, other kinds  of
  //       text), load it in memory, and then *search* through it for a sentence con-
  //       taining the label of the object being detected?
  // IDEA: something that I've seen implemented somewhere, is the idea of using an ex-
  //       ternal API (an image search engine) to look for images of what is being de-
  //       tected (person, apple, etc.), pull that from the internet, and display the
  //       random image on top of the video feed in the bounding box of the detected
  //       object?

  // loop through all our detections
  for (let object of detections) {

    // we use lerp to color the border somewhere between red and green based on the confidence of the prediction
    stroke(lerpColor(color(255,0,0), color(0, 255, 0), object.confidence));
    strokeWeight(3);
    noFill();

    // draw a rectangle around the recognized object
    rect(object.x, object.y, object.width, object.height);
    // In this commented version, we use the normalised values, these represent
    // the percentage across the screen as a value between 0 and 1 – so we
    // multiply these out by the width and height of the canvas. this will be
    // useful in case we want to rescale the video:
    // rect(object.normalized.x * video.width,
    //      object.normalized.y * video.height,
    //      object.normalized.width * video.width,
    //      object.normalized.height * video.height);

    // draw the label
    fill(255);
    noStroke();
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}

function gotResults(err, results) {
  if (err) {
    console.log("We had an error with the detection:", err);
  }

  // remember our detections so that we can draw them in draw()
  detections = results;

  // By default, no new detection will be done so we need to restart the detection 
  // again (as we did in videoReady(...)) to keep detecting each frame
  detector.detect(video, gotResults);
}
