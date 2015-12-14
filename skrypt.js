setInterval(function(){time()},1000);
var sec = -1;
var entTime=120;
var afterGame =false;
function time()
{
	if (score == size/2 && afterGame==false){
	 $('#time').html(sec++);
	var decision = confirm("Wygrałeś! Twój czas: "+sec+"\n Ilość punktów: "+score+"\n Chcesz zacząć grę od nowa?");
	AfterGameDecision(decision);
	
	}
    else if (afterGame==false) {
		if(sec>=-1&&sec<endTime){
			$('#time').html(sec++);
		}

		else{
			 $('#time').html(sec++);
			var decision = confirm("Koniec gry! Wynik: "+score+"\n Chcesz zacząć grę od nowa?");
			AfterGameDecision(decision);
		
		}
	}
}


function AfterGameDecision(decision){
	
		if (decision==true){
				Start();
			}
			else{
				
				afterGame=true;
			}
}

function getId(strId) {
    arr = new Array(2);
    arr[0]=strId.substring(3, strId.indexOf('_'));
    arr[1]=strId.substring(strId.indexOf('_')+1, strId.length);
    return arr 
}

function Picture(accept) {
    this.val;
    do{
        rand = Math.floor(Math.random() * accept.length);
    }while(accept[rand]==2);
    accept[rand]++;
    this.val = rand;
}



var width=0;
var height=0;
var size=1;
function BoardSize(){
	while(size%2!=0 || size<12 || size > 100){
	width = prompt("Wybierz szerokość planszy: ", "3");
	height=prompt("Wybierz wysokość planszy", "4");
	size = width*height;
	}
	endTime=prompt("Wybierz czas w jakim chcesz ukończyć grę (w sekundach)", "120");
}


var score;
var isBlock=false;
function GameBoard() {

	BoardSize();
    var n = parseInt(width);
    var m = parseInt(height);

	console.log(n,m);
    score = 0;


    picBoard = new Array(n);
    last = -1;

    accepTab = new Array(n*m/2);
    for (var i=0; i<accepTab.length; i++){
        accepTab[i] = 0;
    }

    for (var i=0; i<picBoard.length; i++){
        picBoard[i] = new Array(m);
        for (var j=0; j<picBoard[i].length; j++){
            picBoard[i][j] = new Picture(accepTab);
        }
    }

    function getPicture(id) {
        return picBoard[id[0]][id[1]].val
    }

    function show(obj){
		if(afterGame==false & isBlock==false){
			val = getPicture(getId(obj.id));
			$(obj).html(val);
			if(last==-1)
			{
				last = val;
				lastId = getId(obj.id);
			} 
			else 
			{
				if(last==val)
				{
					$('#score').html(++score);
					 $(obj).unbind();
					  $("#col"+lastId[0]+"_"+lastId[1]).unbind();
					
				} 
				else 
				{
					isBlock=true;
					setTimeout(function(){
						$(obj).html("X");
						$("#col"+lastId[0]+"_"+lastId[1]).html("X");
						isBlock=false;
					}, 1000);
					
				}
				last=-1;
			}
		}
    }

    for(var i=0; i<n; i++){
        $("#board").append("<div class=row id=row"+i+"> ");
        for(var j=0; j<m; j++){
            $("#board #row"+i).append("<span class=col id=col"+i+"_"+j+">X");
            $("#col"+i+"_"+j).bind("click", function() {
                show(this);
            });

        }
        
    }
    
}



var board;

function Start(){
	afterGame=false;
	$("#board").empty();
    board = new GameBoard();
    sec=0;
	score=0;
    //$("#start").unbind("click");

}

$().ready(function () {
    $("#start").bind("click", function() {
        Start();
    });
});


