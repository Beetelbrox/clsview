    var points = [];
    
    function drawCoordinates(x,y, group_id){
        var canvas = document.getElementById("canvas");
        var pointsize = 3;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = group_id == 0 ? "#ff0000" : "#0000ff";        
        ctx.fillRect(x,y,1,1);
        ctx.fillRect(0,0,10,10);
        
    }
    
function requestPoints(p, button_id) {
    var obj = { n: 2000,
               center: p,
                stdev: 20};             
    reqPoints = new XMLHttpRequest();
    reqPoints.open("POST", "/points", true);
    reqPoints.setRequestHeader("Content-type", "application/json");
    reqPoints.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var canvas = document.getElementById("canvas");
            pnt = this.responseText.match(/[\d.]+,[\d.]+/g)
            pnt.forEach( function(p) {
                coords = p.split(",");
                if(coords[0] >= 0 && coords[0] < canvas.width && 
                    coords[1] >= 0 && coords[1] < canvas.height){
                    points.push([coords[0], coords[1]]); 
                    drawCoordinates(coords[0], coords[1], button_id);
                }
            });
        }
    };
    console.log(points);
    reqPoints.send(JSON.stringify(obj));
}
        
function mouseClickHandler(e) {
    var canvas = document.getElementById("canvas");
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var points = requestPoints([x,y], e.button)
}
canvas.addEventListener("mousedown", function(e){ mouseClickHandler(e) });
