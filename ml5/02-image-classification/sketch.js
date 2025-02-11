/*
  Data and Machine Learning for Artistic Practice (DMLAP)
  Spring Term 2025
  Image Classification Demo

  Reference here: https://docs.ml5js.org/#/reference/image-classifier 
*/

let classifier,
    result_string = "Predicting...",
    img;

// The `preload` function is predefined and automatically called in p5js (alike setup or draw). 
// It is used to make sure any asset or object loaded in it is finished BEFORE setup is called.
function preload() {

  // load in our classifier from the internet, downloading the model if need be
  classifier = ml5.imageClassifier("MobileNet"); 
  //alternative models to test out: DarkNet , DarkNet-Tiny, DoodleNet

  // load our dog image
  // try out using australian-labradoodle-guide.jpg - does it work well?
  img = loadImage("images/labrador.jpg");   

  // how about importing, or even creating, your own images, and see what the model is able to recognise?
  // how about gradually applying some effects (e.g. noise, doodles) on an existing image and observing how the
  // network responds to that? how does it classify the image as it transforms?
}

function setup() {
  createCanvas(img.width, img.height + 50);

  // call `classify` on the image
  // we do this in setup as we only want to do this once.
  // we pass in a function `gotResults` that will be called once the classifier has identified what our image is.
  // Note that we pass the name of the function, as an argument to the function.
  // In JavaScript functions can be treated as any other variable. So they can be assigned, e.g. I could do:
  //
  // let f = weKnow; 
  //
  // and then `f` and `gotResults` would represent exactly the same function.
  // Note that we do not add the parentheses at the end, it is `gotResults` and not `gotResults()`.
  // that means we are treating the function as a variable, while adding the `()` at the end, with eventual arguments
  // would actually *call* the function (i.e. exectute it) and gives us back any information that the function returns.
  // A function passed in in this manner is commonly referred to as a *callback*, and this is quite common to see in JavaScript.
  classifier.classify(img, gotResults); 
}

function draw() {
  background(255);

  // draw the dog
  image(img, 0, 0, img.width, img.height);

  // draw the prediction, this is waiting text until `gotResults` is called
  fill(0);
  textSize(15);
  textAlign(CENTER);
  text(result_string, 0, height - 40, width, 40);
}

// The callback function!
// This function is called when the image classifier has
// decided on what the image contains, or has thrown an error.
function gotResults(results) {

  // Form a string to contain the results – here we use the backtick method (`...`)
  // of embedding variables in strings. We use Math.ceil to round up the
  // decimal to the closest whole number
  const confidence_percentage = (Math.ceil(results[0].confidence * 100));
  result_string = `This is a ${results[0].label}!\n(I'm ${confidence_percentage}% confident.)`;

  // Note that here we use *only the top detection* (results[0])! 
  // But you could imagine using more than the top one, and display them in some way. 
  // Have look inside the results array, to see how it works:
  // console.log(results)
}
