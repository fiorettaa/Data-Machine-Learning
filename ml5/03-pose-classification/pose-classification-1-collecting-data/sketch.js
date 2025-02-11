/*
  Data and Machine Learning for Artistic Practice (DMLAP)
  Spring Term 2025  
  Pose Classification - Part 1: Collecting Data
  Based on Daniel Shiffman (https://www.youtube.com/watch?v=FYgYyq-xqAw&t=1197s)
  Adapted on MoveNet
*/

let video,
    bodyPose,
    pose,
    classifier,
    state = "waiting",
    targetLabel;

function preload() {
  bodyPose = ml5.bodyPose("MoveNet");
  console.log("MoveNet ready");
}

function setup() {
  createCanvas(640, 480);

  //load camera
  video = createCapture(VIDEO);
  video.hide();
  
  //load bodyPose model 
  bodyPose.detectStart(video, gotPoses); //callback for pose detection

  //initialise our neural network, so that we can start training
  let options = {
    inputs: 34,
    outputs: 4,
    task: "classification",
    debug: true,
  }
  classifier = ml5.neuralNetwork(options);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0];
    
    //are we in the collecting state?
    if (state == "collecting") {
      let inputs = [];
      
      for (let keypoint of pose.keypoints) {
        let x = keypoint.x;
        let y = keypoint.y;
        
        //add these points to our array
        inputs.push(x);
        inputs.push(y);
      }
      
      //provide our label
      let target = [targetLabel];
      
      //add it to the model ready for training later
      classifier.addData(inputs, target);
    }
  }
}

function draw() {
  //translate and scale to flip the video so that it is mirroring us
  translate(video.width, 0);
  scale(-1, 1); 
  image(video, 0, 0, video.width, video.height);

  //if pose is detected, draw it
  if (pose) {
    for (let keypoint of pose.keypoints) {
      let x = keypoint.x;
      let y = keypoint.y;
      noStroke();
      if (keypoint.confidence > 0.1){
        ellipse(x, y, 16, 16);
      }
    }
  }
}

function keyPressed() {
  if (key == "s" || key =="S") {
    classifier.saveData();
  } else {
    targetLabel = key;
    console.log(targetLabel);
    //setTimeout calls this function after a set time, 10000 miliseconds in this case
    setTimeout(function () {
      console.log("collecting");
      state = "collecting";
      setTimeout(function () {
        console.log("not collecting");
        state = "waiting";
      }, 10000); // 10 seconds
    }, 5000); // 5 seconds
  }
}