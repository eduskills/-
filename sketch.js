let capture;
let capturewidth = 640;    
let captureheight = 480;

let emotions = ["happy", "sad", "angry","fearful", "disgusted","surprised"];

let faceapi;
let detections = [];

let poi = 255

let vid1;
let vid2;
let vid3;
let vid4;
let vid5;
let vid6;

let playing = true;

function setup() {
  createCanvas(capturewidth, captureheight);

  vid1 = createVideo("./video/happyness.mov");
  vid1.size(640, 480);
  vid1.hide(); 
  vid1.onended(sayDone)

  vid2 = createVideo("./video/anger.mp4");
  vid2.size(640, 480);
  vid2.hide();
  vid2.onended(sayDone)

  vid3 = createVideo("./video/FEAR.mov");
  vid3.size(640, 480);
  vid3.hide();
  vid3.onended(sayDone)

  vid4 = createVideo("./video/sadness.mov");
  vid4.size(640, 480);
  vid4.hide();
  vid4.onended(sayDone)

  vid5 = createVideo("./video/superise.mov");
  vid5.size(640, 480);
  vid5.hide();
  vid5.onended(sayDone)

  vid6 = createVideo("./video/disgust.mov");
  vid6.size(640, 480);
  vid6.hide();
  vid6.onended(sayDone)


  capture = createCapture(VIDEO);
  capture.position(0,0);
  
  capture.hide();
  
  const faceOptions = {withLandmarks: true, withExpressions: true, withDescriptors: false};
  
  faceapi = ml5.faceApi(capture, faceOptions, faceReady);
  
  }

function faceReady(){
  faceapi.detect(gotFaces);
}

function gotFaces(error, result){
  if (error){
    console.log(error);
    return
  }
    detections = result;
    faceapi.detect(gotFaces);
   // console.log(detections);
}
  
let page = 1;


function sayDone(elt) {
  page = 1
}
function draw() {
  
  background(0);

  if (page == 1) {
    image(capture, 0, 0)
  
  
  
    push();
    fill('green');
    if (detections.length > 0) {
      for (i = 0; i < detections.length; i++) {

          
        var neutralLevel = detections[i].expressions.neutral;
        var happyLevel = detections[i].expressions.happy;
        var sadLevel = detections[i].expressions.sad;
        var angryLevel = detections[i].expressions.angry;
        var fearfulLevel = detections[i].expressions.fearful;
        var disgustedLevel = detections[i].expressions.disgusted;
        var surprisedLevel = detections[i].expressions.surprised;


        if (happyLevel > 0.5) {
          poi = 255
          page = 2;
          vid2.pause()
          vid3.pause()
          vid4.pause()
          vid5.pause()
          vid6.pause()
          vid1.play()

        }


        if (angryLevel > 0.5) {
          poi = 255
          vid1.pause()
          vid3.pause()
          vid4.pause()
          vid5.pause()
          vid6.pause()
          page = 3;
          vid2.play()

        }
        if (sadLevel > 0.5) {
          poi = 255
          vid1.pause()
          vid2.pause()
          vid3.pause()
         
          vid5.pause()
          vid6.pause()
          page = 4;
          vid4.play()

        }
        if (fearfulLevel > 0.5) {
          poi = 255
          vid1.pause()
          vid2.pause()
          vid4.pause()

          vid5.pause()
          vid6.pause()
          page = 5;
          vid3.play()

        }
        if (disgustedLevel > 0.5) {
          poi = 255
          vid1.pause()
          vid2.pause()
          vid3.pause()

          vid5.pause()
          vid4.pause()
          page = 6;
          vid6.play()

        }
        if (surprisedLevel > 0.5) {
          poi = 255
          vid1.pause()
          vid2.pause()
          vid3.pause()

          vid4.pause()
          vid6.pause()
          page = 7;
          vid5.play()

        }
          
        push();
          
        for (k = 0; k < emotions.length; k++) {
            
          var thisemotion = emotions[k];
            
          var thisemotionlevel = detections[i].expressions[thisemotion];
            
          text(thisemotion + ":" + thisemotionlevel.toFixed(2), 40, 30 + 30 * k);
               
          rect(40, 35 + 30 * k, thisemotionlevel * 100, 10);
            
        }
            
     
          
      }
    }
  
    pop();
    
  }


  if (page == 2) {

    
    
    let img = vid1.get();
    image(img, 0, 0);
    ctMove()
  }

  if (page == 3) {
   
    let img = vid2.get();
    image(img, 0, 0);
    ctMove()
  }

  if (page == 4) {

    let img = vid4.get();
    image(img, 0, 0);
    ctMove()
  }
  if (page == 5) {

    let img = vid3.get();
    image(img, 0, 0);
    ctMove()
  }
  if (page == 6) {

    let img = vid6.get();
    image(img, 0, 0);
    ctMove()
  }
  if (page == 7) {

    let img = vid5.get();
    image(img, 0, 0);
    ctMove()
  }


  

}

function ctMove() {

  push()

  fill(255, 255, 255,poi)
  rect(0,0,width,height)



  pop()


  if(poi>0)poi-=3
  

}