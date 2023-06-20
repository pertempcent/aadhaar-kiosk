await faceapi.loadSsdMobilenetv1Model('/models')
await faceapi.loadFaceLandmarkModel('/models')
await faceapi.loadFaceRecognitionModel('/models')
const video = document.getElementById('video')
navigator.getUserMedia({ video: true }, stream => {
video.srcObject = stream}, error => console.error(error))
video.addEventListener('loadedmetadata', async () => {
const canvas = faceapi.createCanvasFromMedia(video)
document.body.append(canvas)
const displaySize = { width: video.videoWidth, height: video.videoHeight }
faceapi.matchDimensions(canvas, displaySize)
setInterval(async () => {
const detections = await faceapi.detectAllFaces(video)
const landmarks = await faceapi.detectAllFaceLandmarks(video)
const resizedDetections = faceapi.resizeResults(detections, displaySize)
const resizedLandmarks = faceapi.resizeResults(landmarks, displaySize)
canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
faceapi.draw.drawDetections(canvas, resizedDetections)
faceapi.draw.drawFaceLandmarks(canvas, resizedLandmarks)
const faceMatcher = new faceapi.FaceMatcher(detections)
const labels = faceMatcher.findBestMatch(detections)
console.log(labels)
}, 1000)
})