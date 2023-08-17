$(document).ready(function() {
    var widthNode =  2;
    var heightNode = 4 +1;
    var ladderWidth = 560;
    var ladderHeigth = 390;
    var LADDER = {};
    var ladder = $('#ladder');
    var ladder_canvas = $('#ladder_canvas');
    var GLOBAL_FOOT_PRINT= {};  
    var GLOBAL_CHECK_FOOT_PRINT= {};
    var working = false;
    init();

    function init() {
        canvasDraw();
    }

    function canvasDraw(){
        ladder.css({
            'width' : ladderWidth,
            'height' : 400,
            'background-color' : '#fff'
        });
       ladder_canvas
       .attr('width' , ladderWidth)
       .attr('height' , ladderHeigth);

        setDefaultFootPrint();
        reSetCheckFootPrint();
        setDefaultRowLine();
        setNodeData();
        drawDefaultLine();
        drawNodeLine();
        userSetting();
        resultSetting();
        
    }

    $(document).on('click', 'button.ladder-start', function(e){
        if(working){
            return false;
        }
        working = true;
        reSetCheckFootPrint();
        var _this = $(e.target);
        var node = _this.attr('data-node');
        var color = _this.attr('data-color');
        _this.attr('disabled' ,  true).css({
            'background-color' : color,
            'border' : '1px solid #F2F2F2',
        })
    
        startLineDrawing(node, color);
    })

    function startLineDrawing(node , color){

        var node = node;
        var color = color;
        
        var x = node.split('-')[0]*1;
        var y = node.split('-')[1]*1;
        var nodeInfo = GLOBAL_FOOT_PRINT[node];

        GLOBAL_CHECK_FOOT_PRINT[node] = true;
        
        if(y ==heightNode ){
            reSetCheckFootPrint();
            console.log(node);
            var target = $('button[data-node="'+node+'"]');
            console.log(target);
            target.css({
                'background-color' : target.attr('data-color')
            })
            working = false;
            return false;
        }
        if(nodeInfo["change"] ){
            var leftNode = (x-1) + "-" +y;
            var rightNode = (x+1) + "-" +y;
            var downNode = x +"-"+ (y + 1);
            var leftNodeInfo = GLOBAL_FOOT_PRINT[leftNode];
            var rightNodeInfo = GLOBAL_FOOT_PRINT[rightNode];
            if(!!!GLOBAL_FOOT_PRINT.hasOwnProperty(leftNode) && GLOBAL_FOOT_PRINT.hasOwnProperty(rightNode)){      
                /// 좌측라인
                console.log('좌측라인')
                if(  (rightNodeInfo["change"] && !!!rightNodeInfo["draw"] ) && !!!GLOBAL_CHECK_FOOT_PRINT[rightNode] ){
                    //Right우선 
                    console.log("RIGHT 우선");
                    stokeLine(x, y, 'w' , 'r' , color ,30)
                    setTimeout(function(){ 
                        return startLineDrawing(rightNode, color)
                    }, 100);
                }else{
                    console.log('DOWN')
                    stokeLine(x, y, 'h' , 'd' , color ,30)
                    setTimeout(function(){ 
                        return startLineDrawing(downNode, color)
                    }, 100);
                }
                
            }else if(GLOBAL_FOOT_PRINT.hasOwnProperty(leftNode) && !!!GLOBAL_FOOT_PRINT.hasOwnProperty(rightNode)){      
                /// 우측라인
                console.log('우측라인')
                if(  (leftNodeInfo["change"] && leftNodeInfo["draw"] ) && !!!GLOBAL_CHECK_FOOT_PRINT[leftNode] ){
                    //Right우선 
                    console.log("LEFT 우선");
                    stokeLine(x, y, 'w' , 'l' , color ,30)
                    setTimeout(function(){ 
                        return startLineDrawing(leftNode, color)
                    }, 100);
                }else{
                    console.log('DOWN')
                    stokeLine(x, y, 'h' , 'd' , color ,30)
                    setTimeout(function(){ 
                        return startLineDrawing(downNode, color)
                    }, 100);
                }
            }
        }else{
            console.log("down")
            var downNode = x +"-"+ (y + 1);
            console.log(downNode);
            stokeLine(x, y, 'h' , 'd' , color ,30)
            setTimeout(function(){ 
                return startLineDrawing(downNode, color)
             }, 100);
        }
    }

    function drawDefaultLine(){
        var html = '';
        html += '<table style="width: 560px; top: 10;">'
         for(var y =0; y < heightNode-1; y++){
            html += '<tr>';
            for(var x =0; x <widthNode-1 ; x++){
                html += '<td style="height:'+ ladderHeigth / (heightNode-1) +'; border-left:20px solid #ddd;  border-right:20px solid #ddd;"></td>';
            }
            html += '</tr>';
        }
        html += '</table>'
        ladder.append(html);
    }


    function drawNodeLine(){
        for(var y =0; y < heightNode; y++){
            for(var x =0; x <widthNode ; x++){
                var node = x + '-' + y;
                var nodeInfo  = GLOBAL_FOOT_PRINT[node];
                if(nodeInfo["change"] && nodeInfo["draw"] ){
                     stokeLine(x, y , 'w', 'r', '#ddd' , '20')
                }else{

                }
            }
        }
    }

    function stokeLine(x, y, flag, dir, color , width){
        var canvas = document.getElementById('ladder_canvas');
        var ctx = canvas.getContext('2d');
        var moveToStart =0, moveToEnd =0, lineToStart =0 ,lineToEnd =0; 
        var eachWidth = 560; 
        var eachHeight = 390/heightNode;
        

        if(flag == "w"){
            //가로줄
            if(dir == "r"){
                ctx.beginPath();
                moveToStart = x * eachWidth ;
                moveToEnd = y * eachHeight ;
                lineToStart = (x+ 1) * eachWidth;
                lineToEnd = y * eachHeight;
                
            }else{
                // dir "l"
                ctx.beginPath();
                moveToStart = x * eachWidth;
                moveToEnd = y * eachHeight;
                lineToStart = (x- 1) * eachWidth;
                lineToEnd = y * eachHeight;
            }
        }else{
                ctx.beginPath();
                moveToStart = x * eachWidth ;
                moveToEnd = y * eachHeight;
                lineToStart = x * eachWidth ;
                lineToEnd = (y+1) * eachHeight;
        }
        
        ctx.moveTo(moveToStart   ,moveToEnd   );
        ctx.lineTo(lineToStart   ,lineToEnd   );
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.closePath();
    }

    function setNodeData(){
        GLOBAL_FOOT_PRINT[0+'-'+0] = {"change" : false, "draw" : false};
        GLOBAL_FOOT_PRINT[1+'-'+0] = {"change" : false, "draw" : false};
        for (let y=1; y < heightNode; y++){
            for (let x=0; x < widthNode; x++){
                loopNode = x + "-" + y;
                GLOBAL_FOOT_PRINT[loopNode] = {"change" : true, "draw" : true};
                x++;
                loopNode = (x) + "-" + y;
                GLOBAL_FOOT_PRINT[loopNode] = {"change" : true, "draw" : false};
            }
        }
        console.log(GLOBAL_FOOT_PRINT);
    }

    function setDefaultRowLine(){
        let row = 0;
        for(var y =0; y < heightNode; y++){
            var rowArr = [];
            for(var x =0; x < widthNode ; x++){
                var node = x + "-"+ row;
                rowArr .push(node);
             }
             LADDER[row] =  rowArr;
             row++;
        }
        console.log("LADDER:",LADDER)
    }

    function userSetting(){
        var userList = LADDER[0];
        var html = '';
        html += '<div class="user-wrap" style="left:-35"><button class="ladder-start" style="background-color:#fff capacity:0.1" data-color="black" data-node="'+userList[0]+'">Left</button>';
        html +='</div>'
        html += '<div class="user-wrap" style="left:495"><button class="ladder-start" style="background-color:#fff capacity:0.1" data-color="black" data-node="'+userList[1]+'">Right</button>';
        html +='</div>'
        ladder.append(html);
    }

    function resultSetting(){
        var resultList = LADDER[heightNode-1];
        console.log("resultList: ",resultList )

        var html = '';
        var x1 = resultList[0].split('-')[0]*1;
        var y1 = resultList[0].split('-')[1]*1 + 1;
        var node1 = x1 + "-" + y1;
        var x2 = resultList[1].split('-')[0]*1;
        var y2 = resultList[1].split('-')[1]*1 + 1;
        var node2 = x2 + "-" + y2;
        html += '<div class="answer-wrap" style="left:-35"><button class="ladder-start" data-color="red" data-node="'+node1+'"></button>';
        html +='</div>'
        html += '<div class="answer-wrap" style="left:495"><button class="ladder-start" data-color="blue" data-node="'+node2+'"></button>';
        html +='</div>'
        ladder.append(html);
   }

   function setDefaultFootPrint(){
      
    for(var r = 0; r < heightNode; r++){
        for(var column =0; column < widthNode; column++){
            GLOBAL_FOOT_PRINT[column + "-" + r] = false;
        }
    }
    }
    function reSetCheckFootPrint(){

        for(var r = 0; r < heightNode; r++){
            for(var column =0; column < widthNode; column++){
                GLOBAL_CHECK_FOOT_PRINT[column + "-" + r] = false;
            }
        }
    }
});