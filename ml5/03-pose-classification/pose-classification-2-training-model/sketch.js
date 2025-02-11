/*
  Data and Machine Learning for Artistic Practice (DMLAP)
  Spring Term 2025  
  Pose Classification - Part 2: Training
  Based on Daniel Shiffman (https://www.youtube.com/watch?v=FYgYyq-xqAw&t=1197s)
  Adapted on MoveNet
*/

let classifier;

function setup() {
  createCanvas(640, 480);
  
  //set the backend to 'webgl' to allow this script to work across all browsers
  ml5.setBackend("webgl");
  
  //define neural network options
  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  }
  classifier = ml5.neuralNetwork(options);
  
  //load the data we trained in part 1
  classifier.loadData('dataset.json', dataReady);
}

function dataReady() {
  //normalise our data using the pre-built function
  classifier.normalizeData();
  classifier.train({epochs: 30}, finished); 
}

function finished() {
  //when finished with the training, download the model
  console.log('model trained');
  classifier.save();
}