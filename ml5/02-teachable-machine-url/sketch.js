/*
  Data and Machine Learning for Artistic Practice (DMLAP)
  Spring Term 2025
  Image Classifier via Model trained with Teachable Machine

  adapted from https://github.com/ml5js/Intro-ML-Arts-IMA-F21
*/

// classifier variable
let classifier;

// Model URL 
// This default model is differentating between Night and Day - Test it by placing your hand in front of the camera
// Replace with your model trained on teachablemachine.withgoogle.com 
// by copying `Your sharable link`, after uploading it 
const imageModelURL = 'https://teachablemachine.withgoogle.com/models/bXy2kDNi/';

// video
let video;
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
  // flip the video horizontally
  video = createCapture(VIDEO, { flipped: true }); 
  video.size(320, 240);
  video.hide();

  // start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // draw the video
  image(video, 0, 0);

  // draw the label with the respective confidence value (2 decimal points)
  fill(255);
  textSize(16);
  textAlign(CENTER);

  let conf = confidence.toFixed(2) * 100
  text(label + ' ' + conf + '%', width / 2, height - 4);
}

// get a prediction for the current video frame
function classifyVideo() {
  classifier.classifyStart(video, gotResult);
}

// when we get a result
function gotResult(results) {

  // the results are in an array ordered by confidence
  // console.log(results[0]);
  label = results[0].label;
  confidence = results[0].confidence;
}
