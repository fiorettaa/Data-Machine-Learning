/*
  Data and Machine Learning for Artistic Practice (DMLAP)
  Spring Term 2024  
  Handpose webcam demo

  Originally from here: https://editor.p5js.org/ml5/sketches/Handpose_Webcam
  Reference here: https://learn.ml5js.org/#/reference/handpose
  And other examples: https://learn.ml5js.org/#/reference/handpose?id=examples
*/

let video,
    handPose,
    hand; // NOTE: as per the documentation, this model can only detect
          //       one hand: https://github.com/tensorflow/tfjs-models/tree/master/handpose#mediapipe-handpose
          //       see this reply: https://github.com/ml5js/ml5-library/pull/1117#issuecomment-791100940

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  handpose = ml5.handpose(video, modelReady);
}

function draw() {

  // if we have the video access yet, draw it
  if (video) {
    image(video, 0, 0);
  }

  drawHand();
}

function modelReady() {
  handpose.on('predict', gotPose);
}

// This time, using a click to display the hand object
function mousePressed() {
  console.log(hand);
}

function gotPose(results) {
  // do something with the results
  hand = results;
};

function drawHand() {

  push(); // Precaution: styles remain within this function
  noStroke();
  fill(255,0,0); // Set colour of circle

  // if we have any hand detected, draw it
  if (hand && hand.length > 0) {

    let landmarks = hand[0].landmarks;

    for (let i = 0; i < landmarks.length; i++) {
      let [x, y, z] = landmarks[i];
      ellipse(x, y, 7);
    }
  }

  pop();
}

// Ideas to explore:

// One thing that could be done, to familiarise yourself with the landmarks and
// the geometry of the hands, would be to draw lines between the landmarks, to
// create a silhouette of a hand, as seen here for instance:
// https://github.com/tensorflow/tfjs-models/tree/master/handpose#mediapipe-handpose
