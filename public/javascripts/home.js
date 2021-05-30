// const { spawn } = require("child_process");

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snap = document.getElementById("snap");
const errorMsgElement = document.getElementById("span#ErrorMsg");
const btnDownload = document.getElementById("btn-download");
var startvideo = document.getElementById("startvideo");
const constrains = {
  audio: true,
  video: {
    width: 400,
    height: 400,
  },
};

// access webcam
async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constrains);
    handleSuccess(stream);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia.error: ${e.toString()}`;
  }
}

// success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

//load init
init();
//Draw image
var context = canvas.getContext("2d");
snap.addEventListener("click", function () {
  context.drawImage(video, 0, 0, 400, 400);
  window.DataURI = canvas.toDataURL("image/jpeg");
  // console.log(window.DataURI);
});



// export default DataURI
// function dataURI(){
//   return DataURI
// }

btnDownload.addEventListener("click", function () {
  document.getElementById("datauri").value = `${window.DataURI}`;
  // console.log(document.getElementById("datauri").value);
});

















// btnDownload.addEventListener('click', function(){
//      // IE/Edge support (png only)
//     if(window.navigator.msSaveBlob){
//         window.navigator.msSaveBlob(canvas.msToBlob(), "Emotion.png")
//     }else{
//         const a= document.createElement("a");
//         document.body.appendChild(a);
//         a.href = canvas.toDataURL();
//         a.download = "Emotion.png";
//         a.click();
//         document.body.removeChild(a);

//     }
// });

// function runScript() {
//   var request = new XMLHttpRequest();
//   request.onreadystatechange = function () {
//     if (request.readyState === 4) {
//       if (request.status === 200) {
//         alert("Successful .... " + request.responseText);
//       } else {
//         alert("Something went wrong, status was " + request.status);
//       }
//     }
//   };
//   request.open("POST", "detect.py", true);
//   request.send(null);
//   return false;
// }

// document.getElementById("btn-download").onclick = runScript;
