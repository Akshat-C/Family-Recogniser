Webcam.set({
    height: 220,
    width: 220,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function capture_img()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_img' src="+data_uri+">";
    });
}

console.log("ml5 version is: ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ztp20hUAP/model.json", modelLoaded);
function modelLoaded()
{
    console.log("model has been loaded");
}

function recognise_img()
{
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResults);
}

function gotResults(error, results)
{
    if (error)
    {
        console.error(error);
    } else 
    {
        console.log(results);
        document.getElementById("member_name").innerHTML = results[0].label;
        accur = results[0].confidence*100;
        document.getElementById("accuracy").innerHTML = accur.toFixed(2) + "% ";
    }
}

