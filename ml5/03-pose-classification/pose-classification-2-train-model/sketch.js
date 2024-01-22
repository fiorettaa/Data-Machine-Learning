/*
  Data and Machine Learning for Artistic Practice (DMLAP)
  Spring Term 2024 
  Pose classification (train model 2/3)
  Based on Daniel Shiffman  
  https://www.youtube.com/watch?v=FYgYyq-xqAw&t=430s
*/

let brain;

function setup() {
  createCanvas(640, 480);
  
  // define neural network options
  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  }

  brain = ml5.neuralNetwork(options);
  
  // load the data we trained in part 1
  brain.loadData('ymca.json', dataReady);
}

function dataReady() {
  // normalise our data using the pre-built function
  brain.normalizeData();
  brain.train({epochs: 10}, finished); 
}

function finished() {
  console.log('model trained');
  brain.save();
}
