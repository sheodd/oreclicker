//Copyright © 2020 Sheodd


var copper = 0;
var moneys = 0;
var copperMine = false;
var coal = 0;
var coalminer = 0;
var restart = 0;
var totalmult = 0;
var CPS = 0
//gain coal buy mining

function coalClick(number){
	coal = coal + number;
	document.getElementById('coal').innerHTML = coal.toFixed(2);
};
//sell coal
function coalSell(){
	moneys = moneys + (coal * 2);
	coal = coal - coal;
	document.getElementById('moneys').innerHTML = moneys.toFixed(2);
	document.getElementById('coal').innerHTML = coal.toFixed(2);
	
	
	
};



//gain copper buy mining
function copperClick(number){
	if (copperMine == true){
copper = (copper + number) + (totalmult * 2);


document.getElementById('coppers').innerHTML = copper.toFixed(2);
	};	
};
function sellCopper(){
	moneys = moneys + (copper * 10);
	copper = copper - copper;
	document.getElementById('coppers').innerHTML = copper;
	document.getElementById('moneys').innerHTML = moneys.toFixed(2);
};
function buyCopperMine(){
	if (moneys >= 200){
	copperMine = true;
	moneys = moneys - 200
	document.getElementById('moneys').innerHTML = moneys.toFixed(2);
	};
};

// buying auto mineing
function buyAutoMineCoal(){
	var autoMineCoal = Math.floor(10 * Math.pow(1.5,coalminer));
	if (moneys >= autoMineCoal){
		moneys = moneys - autoMineCoal;
		coalminer = coalminer + 1
		document.getElementById('moneys').innerHTML = moneys.toFixed(2);
	};
	var nextAutoMineCoal = Math.floor(10 * Math.pow(1.5,coalminer));
	document.getElementById('autoMineCost').innerHTML = nextAutoMineCoal;
};

//reset value go up
function rebirth(){
	restart = ((Math.floor((restart + 0.01)*1000))/1000) / 10;
	document.getElementById('rebirth').innerHTML = restart.toFixed(2);
	
};
// collect rebirth mult
function cRebirth(){
	if (restart >= 1){
		totalmult = restart;
		coal = 0;
		copper = 0;
		moneys = 0;
		restart = 0;
		coalminer = 0;
		copperMine = false;
		document.getElementById('moneys').innerHTML = moneys;
		document.getElementById('coal').innerHTML = coal;
		document.getElementById('copper').innerHTML = copper;
		document.getElementById('restart').innerHTML = restart;
	};
	
	
};



// calculats coal per second
function cPS(){
	var coalPersecond = (coalminer + (Math.floor((coalminer * totalmult * 2) * 1000))/1000);
	CPS = coalPersecond;
	document.getElementById('cps').innerHTML = CPS
	
};


// saves data
function Save(){
	var save = {
		copper : copper,
		moneys : moneys,
		copperMine : copperMine,
		coal : coal,
		coalminer : coalminer,
		restart : restart,
		totalmult : totalmult,
		autoMineCoal : autoMineCoal
		
	};
	localStorage.setItem("save",JSON.stringify(save));
};




// loads saved data
function Load(){
var savegame = JSON.parse(localStorage.getItem("save")); 
if (typeof savegame.copper !=='undefined') copper = savegame.copper; document.getElementById('coppers').innerHTML = copper.toFixed(2);
if (typeof savegame.moneys !=='undefined') moneys = savegame.moneys; document.getElementById('moneys').innerHTML = moneys.toFixed(2);
if (typeof savegame.copperMine !=='undefined') copperMine = savegame.copperMine;
if (typeof savegame.coal !=='undefined') coal = savegame.coal; document.getElementById('coal').innerHTML = coal.toFixed(2);;
if (typeof savegame.coalminer !=='undefined') coalminer = savegame.coalminer;
if (typeof savegame.restart !=='undefined') restart = savegame.restart; 
if (typeof savegame.totalmult !=='undefined') totalmult = savegame.totalmult;

};



//delets save file
function Delete(){
	localStorage.removeItem('save');
	location.reload();
	
	
};



window.setInterval(function(){
	coalClick(coalminer + (Math.floor((coalminer * totalmult * 2) * 1000))/1000);
	
}, 2000);
window.setInterval(function(){
	rebirth();
	cPS();
}, 1000);

