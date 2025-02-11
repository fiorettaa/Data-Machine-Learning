/*
  Data and Machine Learning for Artistic Practice (DMLAP)
  Spring Term 2025
  Regression Example #1

  In this code we create colour markers on the screen, each time saving their coordinates
  and r,g,b values and providing them to our neural network.
  e.g. nnAddData(inputs, output); in mousePressed();

  Once we have enough points we call nnTrain();
  This trains the neural network.

  After it has trained, we ask the neural network to predict the colour for the mouse coordinates,
  reflected in the square on the bottom left corner of the canvas.

  Instructions:
  - Click to place a point
  - Press 1 to 3 to change the colour of the points
  - Press 't' to train the model

  IDEAS for experimentations: Play with a different number of inputs and/or outputs,
                              to understand how this NN system works. E.g., instead of taking
                              x and y as inputs, try using just one of them or a completely different one. 
                              For that, you would need to make the respective changes when you define your network
                              and whenever an input is fed into your NN. Can you think of cases where your system 
                              could take 1, 3 or more inputs, instead of the 2 of this example?
                              Similarly, can you think of cases where the NN predicts less or more than the 3 numbers
                              you currently get as output (r, g, b)? What if you affected only the red values of the
                              background or the diameter of a circle or a sound frequency, e.t.c.?                       
*/

let nn,
    ourColor,
    mode = "training";

function setup() {
  createCanvas(500, 500);

  // for this example to work across all browsers
  // "webgl" or "cpu" needs to be set as the backend
  ml5.setBackend("webgl");

  // set our background once at the start
  background(0);

  // our first colour can be red;
  ourColor = color(255,0,0);

  // note in this demo we just clear the canvas at the beginning
  fill(255);
  noStroke();
  text("Click to place a point\nPress 1-3 to change color\nPress 't' to train.", 20, 20);

  // Setup the neural network
  // For each example, the network has two inputs [x, y] (the mouse position)
  // and three outputs [r, g, b] (the corresponding colour)
  // (Here we use the default config. To add more, look here under 'regression':
  // https://archive-docs.ml5js.org/#/reference/neural-network?id=defining-custom-layers
  nn = ml5.neuralNetwork({
    inputs: 2,          // two inputs: x and y
    outputs: 3,         // three outputs: r, g and b
    task: 'regression', // because we predict the three numbers directly (r/g/b values)
    debug: true         // this opens the training pane
  });

}

function draw() {
  // after we train the NN, we move into the 'demo' mode
  // where we want to show the output as a square in the bottom left-hand side
   if (mode === "demo") {
     const mouseColor = nnPredict([mouseX, mouseY]);

     // Here you can modify your code in order to create a different visualisation
     // of your output. How could you use mouseColor alternatively to paint another 
     // element of your canvas instead of this tiny little square?

     // console.log('mouse color:', mouseColor);
     fill(mouseColor[0], mouseColor[1], mouseColor[2]);
     rect(0, height-50, 50, 50);
   }
}

function mousePressed() {
  if (mode == "training") {
    // draw a circle at your mouse coordinates, set to the colour of your current colour
    fill(ourColor);
    noStroke();
    ellipse(mouseX, mouseY, 10, 10);

    let inputs = [mouseX, mouseY];
    let outputs = [
      red(ourColor),
      green(ourColor),
      blue(ourColor)
    ];

    // this adds the data to the neural network
    nn.addData(inputs, outputs);
    // console.log(ourColor, inputs, outputs);
  }
}

function keyPressed() {
  if (key == "1") {
    ourColor = color(255,0,0);
  } else if (key == "2") {
    ourColor = color(0,255,0);
  } else if (key == "3") {
    ourColor = color(0,0,255);
  } else if (key == "t") {
    // WHERE THE TRAINING HAPPENS: no need to change this
    // More information here: https://docs.ml5js.org/#/reference/neural-network?id=train-the-model
    nn.normalizeData();    // Normalise our data
    nn.train({
      epochs: 35,          // This controls for how long we train!
      batchSize: 12,       // We will see what all this means soon
      learningRate: 0.2,
      validationSplit: 0.0 // By default we won't perform any validation (this does not influence training, but removes datapoints if > 0)
    }, finishedTraining);  // This is a callback: the function finishedTraining is called when the training is over
  }
}

// about the NN
function finishedTraining(){
  console.log("We finished training!");
  console.log("Here's how one raw prediction looks like for one datapoint:");
  console.log(nn.predictSync([width/2,height/2])); // prediction for the centre of the canvas
  // Switch to the demo mode - this will tell our app that we can visualise the result
  mode = "demo";
}

function nnPredict(input) {
  // The standard ML5js way to perform predictions is asyncronous, but async programming can be tricky.
  // Luckily the "predictSync" function forces ML5js to give us the result immediately and simplifies matters
  const res = nn.predictSync(input);

  // ML5 places each component of the prediction into an object.
  // as a result, the format of the output of a prediction is different from the one given as training data
  // E.g. if we trained the network with one input array [x] and an output array [a, b, c] one prediction will give
  // [{0:predicted_a, label: 0, value:predicted_a, unNormalizedValue: unnormalized_predicted_a},
  //  {1:predicted_b, label: 1, value:predicted_b, unNormalizedValue: unnormalized_predicted_b},
  //  {2:predicted_c, label: 2, value:predicted_c, unNormalizedValue: unnormalized_predicted_c}]
  // meaning that with "straight" ML5js we will need to parse these values and put them into our preferred format
  // (which is likely the one we provided in the first place as training data).
  //
  // If we provide an array of inputs (asking for multiple predictions), predictSync will return an array of such objects,
  // so here we handle the two cases

  // making it consistent with the input format
  if (Array.isArray(input[0])){ // checking if the value we pass in is an array
    // multiple predictions
    return res.map(element => element.map(v => v.value));
  } else {
    // make one prediction
    return res.map(v => v.value);
  }
}
