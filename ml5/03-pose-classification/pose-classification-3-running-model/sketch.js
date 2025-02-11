/*
  Data and Machine Learning for Artistic Practice (DMLAP)
  Spring Term 2025 
  Pose Classification - Part 3: Running Pose Classifier
  Based on Daniel Shiffman (https://www.youtube.com/watch?v=FYgYyq-xqAw&t=1197s)
  Adapted on MoveNet
*/

let video,
    bodyPose,
    pose,
    classifier,
    poseLabel = " ";

function preload() {
  //load MoveNet
  bodyPose = ml5.bodyPose("MoveNet");
  console.log("MoveNet ready");
}

function setup() {
  createCanvas(640, 480);
  
  //set the backend to 'webgl' to allow this script to work across all browsers
  ml5.setBackend("webgl");
  
  //load camera
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  
  //start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses); 

  //set the options for the neural network
  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  }
  
  //initiate the neural network
  classifier = ml5.neuralNetwork(options);
  
  const modelInfo = {
    model: 'model.json',
    metadata: 'model_meta.json',
    weights: 'model.weights.bin',
  };
  
  //load our training from part 2 into the neural network - callback
  classifier.load(modelInfo, classifierLoaded);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0];
  }
}

function classifierLoaded() {
  console.log('pose classification ready');
  classifyPose();
}

function classifyPose() {
  //if a pose is detected, perform classification on it
  if (pose) {
    //inputs will hold all the keypoints' values
    let inputs = [];
    
    for(let keypoint of pose.keypoints) {
      let x = keypoint.x;
      let y = keypoint.y;
      
      inputs.push(x);
      inputs.push(y);
    }
    
    //classify the pose from the image
    classifier.classify(inputs, handleResults);
    
  } else {
    //we call this function recursively every 100 milliseconds
    setTimeout(classifyPose, 100); 
  }
}

function handleResults(results, error) {
  //the results from the classification include a label and a conf score
  // console.log(results)
  if (results[0].confidence > 0.8) {
    poseLabel = results[0].label //if working with letters add the extension ".toUpperCase()";
  }
  
  //keep classifying
  classifyPose();
}

function draw() {
  
  //display the keypoints and/or skeleton
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    for (let keypoint of pose.keypoints) {
      let x = keypoint.x;
      let y = keypoint.y;
      noStroke();
      fill(255);
      if (keypoint.confidence > 0.2){
        ellipse(x, y, 16, 16);
      }
    }
  }
  pop();

  //display the class/label in the center of the canvas
  fill(0, 0, 255);
  noStroke();
  textSize(512);
  textAlign(CENTER, CENTER);
  text(poseLabel, width / 2, height / 2);
  
}
