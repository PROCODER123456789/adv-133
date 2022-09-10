img=""
status=""
objects= [];


function setup(){
    canvas=createCanvas(640,420);
    canvas.center;
    objectDetector = ml5.objectDetector("cocssd", modelLoaded)
    document.getElementById("status").innerHTML = "status : Detecting Objects"
}

function preload(){
    img= loadImage('Bedroom.jpeg');
}

function draw(){
    image(img, 0,0, 640, 420);
    if (status !=""){
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "status: object detected";
            fill("#FF0000")
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+""+percent+ "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
 

}

function modelLoaded(){
    console.log("model loaded !");
    status=true;
    objectDetector.detect(img, gotresult);

}

function gotresult(error, results){
    if(error){
    console.log(error);
    }
    console.log(results);
    objects=results;
}
