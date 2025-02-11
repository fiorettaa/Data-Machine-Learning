/*
  Data and Machine Learning for Artistic Practice (DMLAP)
  Spring Term 2025  
  Handpose Estimation on a Webcam

  Reference here: https://docs.ml5js.org/#/reference/handpose
*/

let video,
    handPose,
    hands = [];

function preload() {
  // handPose = ml5.handPose();
  handPose = ml5.handPose({
    maxHands: 2,
    flipped: true, // what if you don't flip the handpose while you do flip the video?
  })
}

function setup() {
  createCanvas(640, 480);

  // Create the video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();

  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

function draw() {

  // if we have the video access yet, draw it
  image(video, 0, 0, width, height);

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill("#9EBCFF");
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
      fill("#556973")
      circle(keypoint.x, keypoint.y, 5);
    }
  }

  // Could you isolate specific keypoints and draw shapes with them?
  // How will you find the name of the keypoint you want to use?
  // This is an example:
  // if (hands.length > 0) {
  //   ellipse(hands[0].index_finger_dip.x, hands[0].index_finger_dip.y, 50, 50);
  // }
}

// This time, using a click to display the hand object
function mousePressed() {
  console.log(hands[0]);
}

// Ideas to explore:

// How could you turn your hands into the hands of a magician?...
// What unexpected outcomes could you trigger with your fingers?
// What if you trigger a certain sound when your index fingers touch?
// What if you draw lines between your hands in a similar way to what 
// William Forsythe does in his Improvisation Technologies?
// Could you use your hands to control the speed of a video or the size of a shape?
// Be playful and explore the possibilities of this technology!