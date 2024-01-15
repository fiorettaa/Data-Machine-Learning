/*
  Data and Machine Learning for Artistic Practice (DMLAP)
  Spring Term 2024  
  Image Classifier via Model trained with Teachable Machine

  adapted from https://github.com/ml5js/Intro-ML-Arts-IMA-F21
*/


// classifier variable
let classifier;

// Model URL 
// This default model is differentating between Night and Day
// Replace with your model trained on teachablemachine.withgoogle.com 
// by copying `Your sharable link`, after uploading it 
const imageModelURL = 'https://teachablemachine.withgoogle.com/models/bXy2kDNi/';
// If you prefer to download and store your model locally, create and call the respective folder:
// const imageModelURL = './my_model/';

// video
let video;
let flippedVideo;
// to store the classification
let label = "";
let confidence = 0.0;

// load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 260);
  // create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);

  // start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // draw the video
  image(flippedVideo, 0, 0);

  // draw the label with the respective confidence value (2 decimal points)
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label + ' confidence:' + confidence.toFixed(2), width / 2, height - 4);
}

// get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// when we get a result
function gotResult(error, results) {
  // if there is an error
  if (error) {
    console.error(error);
    return;
  }
  // the results are in an array ordered by confidence
  // console.log(results[0]);
  label = results[0].label;
  confidence = results[0].confidence;
  // classifiy again!
  classifyVideo();
}
