setInterval(function(){time()},1000);
var sec = -1;
var afterGame =false;
var revealed = 0;
function time()
{
	if (score == size/2 && afterGame==false){
	 $('#time').html(sec++);
	var decision = confirm("Wygrałeś! Twój czas: "+sec+"\n Ilość punktów: "+score+"\nŁącznie odkryć: "+revealed+"\n Chcesz zacząć grę od nowa?");
	AfterGameDecision(decision);
	
	}
    else if (afterGame==false) {
		if(sec>=-1&&sec<endTime){
			$('#time').html(sec++);
		}

		else{
			 $('#time').html(sec++);
			var decision = confirm("Koniec gry! Wynik: "+score+"\nŁącznie odkryć: "+revealed+"\n Chcesz zacząć grę od nowa?");
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
    }
	while(accept[rand]==2);
    accept[rand]++;
    this.val = rand;
}

function ShowPicture(object, val){
			console.log(val);
			object.html("");
			 object.append('<img src=obrazki/'+val+'.png />');
}


var width=0;
var height=0;
var size=1;
function BoardSize(){
	while(size%2!=0 || size<12 || size > 56){
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
        return picBoard[id[0]][id[1]].val;
    }

    function show(obj){
		if(afterGame==false & isBlock==false)
		{
			
			val = getPicture(getId(obj.id));
			ShowPicture($(obj), val);
			//$(obj).html(val);
			$(obj).unbind();
			if(last==-1)
			{
				last = val;
				lastId = getId(obj.id);
			} 
			else 
			{
				$('#revealed').html(++revealed);
				if(last==val)
				{
				$('#score').html(++score);
				$("#col"+lastId[0]+"_"+lastId[1]).unbind();
					
				} 
				else 
				{
					isBlock=true;
					$(obj).bind("click", function() {show(this);});
				$("#col"+lastId[0]+"_"+lastId[1]).bind("click", function() {show(this);});
					setTimeout(function(){
						$(obj).html('<img src=obrazki/x.jpg />');
						$("#col"+lastId[0]+"_"+lastId[1]).html('<img src=obrazki/x.jpg />');
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
            $("#board #row"+i).append("<span class=col id=col"+i+"_"+j+">");
			$("#col"+i+"_"+j).append('<img src=obrazki/x.jpg />');
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
	revealed=0;
	$("#revealed").html("0");
}

$().ready(function () {
    $("#start").bind("click", function() {
        Start();
    });
});


