let VIDEO=null
let VIDEO1=null
let CANVAS=null
let CONTEXT=null
let SCALER=1

let SIZE={x:0, y:0, width:0,height:0}

function main(){
    CANVAS=document.getElementById("myCanvas")
    CONTEXT=CANVAS.getContext("2d")
    

    let promise=navigator.mediaDevices.getUserMedia({video : {width:{ exact: 20},height:{exact: 20}}});
    promise.then(function (signal){
            VIDEO=document.createElement("video")
            VIDEO.srcObject=signal
            VIDEO.play()

            VIDEO1=document.createElement("video")
            VIDEO1.srcObject=signal
            VIDEO1.play()

            VIDEO.onloadeddata=function(){
                handleResize()
                window.addEventListener('resize', handleResize)
                updateCanvas()
            }
            VIDEO1.onloadeddata=function(){
                handleResize()
                window.addEventListener('resize', handleResize)
                updateCanvas()

            }
    }).catch(function(err){
            alert("camera err" + err)
    })
}
function handleResize(){
    CANVAS.width=window.innerWidth
    CANVAS.height=window.innerHeight
    let resizer=SCALER*
    Math.min(
        window.innerWidth/VIDEO.videoWidth,
        window.innerHeight/VIDEO.videoHeight
        );
SIZE.width=resizer*VIDEO.videoWidth
SIZE.height=resizer*VIDEO.videoHeight
SIZE.x=window.innerWidth/2-SIZE.width/2
SIZE.y=window.innerHeight/2-SIZE.height/2
}
function updateCanvas(){
    CONTEXT.drawImage(VIDEO,SIZE.x-SIZE.width/2,SIZE.y,SIZE.width,SIZE.height)
    CONTEXT.drawImage(VIDEO,SIZE.x+SIZE.width/2,SIZE.y,SIZE.width,SIZE.height)
    window.requestAnimationFrame(updateCanvas)
}
