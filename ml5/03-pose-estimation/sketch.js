/*
  Data and Machine Learning for Artistic Practice (DMLAP)
  Spring Term 2025
  BodyPose Estimation on a Webcam

  Reference here: https://docs.ml5js.org/#/reference/bodypose
*/

let video,
    bodyPose,
    poses,
    connections;

function preload() {
  bodyPose = ml5.bodyPose("MoveNet", {
    modelType: "MULTIPOSE_LIGHTNING", // "MULTIPOSE_LIGHTNING", "SINGLEPOSE_LIGHTNING", or "SINGLEPOSE_THUNDER".
    flipped: true
  });
  // 'MoveNet' is the model used by default
  // Try adding 'BlazePose' instead
  // see: https://docs.ml5js.org/#/reference/bodypose?id=ml5bodypose
}

function setup() {
  createCanvas(640, 480);

  // Create the video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);

  // Get the skeleton connection information
  connections = bodyPose.getSkeleton();
}

// Callback function for when the model returns pose data
function gotPoses(results) {
  // Store the model's results in a global variable
  poses = results;
}

function draw() {
  image(video, 0, 0, width, height);

  if (!poses) return; // only execute if we have poses detected

  // Draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];

      // Only draw a line if we have confidence in both points
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke("#9EBCFF");
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  // Iterate through all the poses
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    // Iterate through all the keypoints for each pose
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      // Only draw a circle if the keypoint's confidence is greater than 0.1
      if (keypoint.confidence > 0.1) {
        fill("#556973");
        noStroke();
        circle(keypoint.x, keypoint.y, 5);
      }
    }
  }
}


// A click of the mouse logs the pose to the console, have a look at the object!
function mousePressed() {
  if (poses) {
    console.log('all poses:');
    console.log(poses);
    console.log('connections:');
    console.log(connections);
    console.log('-----------------------------');
  } else {
    console.log("No pose detected yet");
  }
}

// Ideas to explore:

// Here you can do wonders, similar to the hand and face estimation examples.
// Could you for instance imagine a blank canvas where a few points
// from the body are used to control the position, or other parameters
// of text that is displayed on the screen, like in the Bill T. Jones work seen in class?
