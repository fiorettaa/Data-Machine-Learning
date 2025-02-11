/*
  Data and Machine Learning for Artistic Practice (DMLAP)
  Spring Term 2025
  Face Estimation on a Webcam

  Reference here: https://docs.ml5js.org/#/reference/facemesh
*/

let faceMesh,
    faces,
    video,
    options = { maxFaces: 1, refineLandmarks: false, flipped: true };

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(640, 480);

  // Create the video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();

  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}

function draw() {
  image(video, 0, 0, width, height);

  if (faces) {
    // Draw all the tracked face points
    for (let i = 0; i < faces.length; i++) {
      let face = faces[i];
      for (let j = 0; j < face.keypoints.length; j++) {
        let keypoint = face.keypoints[j];
        fill("#9EBCFF");
        noStroke();
        circle(keypoint.x, keypoint.y, 5);
      }
    }
  }
}

// Ideas to explore:

// Like in all sketches, it is not necessairy to display the video
// What could you do with this facial point cloud?
// Could you draw a face mask on top of the face?