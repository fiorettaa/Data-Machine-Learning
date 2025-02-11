/*
  Data and Machine Learning for Artistic Practice (DMLAP)
  Spring Term 2025
  Image Classifier via Model trained with Teachable Machine

  adapted from https://github.com/ml5js/Intro-ML-Arts-IMA-F21
*/
  
// Classifier Variable
let classifier;

// If you prefer to download and store your model locally, create and call the respective folder:
let imageModelURL = './my_model/';

// Video
let video;

// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO, { flipped: true }); 
  video.size(320, 240);
  video.hide();

  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(video, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
