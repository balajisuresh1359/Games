const deckCards4=["SUNRISERS-Logo-PNG.png","SUNRISERS-Logo-PNG.png","Royal-Challengers-Bangalore-Logo-PNG.png","Royal-Challengers-Bangalore-Logo-PNG.png","Rajasthan-Royals-Logo-PNG.png","Rajasthan-Royals-Logo-PNG.png","Mumbai-Indians-Logo-PNG.png","Mumbai-Indians-Logo-PNG.png","Gujarat-Lions-Logo-PNG.png","Gujarat-Lions-Logo-PNG.png","Kings-XI-Punjab-Logo-PNG.png","Kings-XI-Punjab-Logo-PNG.png","Delhi-Daredevils-Logo-PNG.png","Delhi-Daredevils-Logo-PNG.png","Chennai-Super-Kings-Logo-PNG.png","Chennai-Super-Kings-Logo-PNG.png"]
const deckCards3=["Royal-Challengers-Bangalore-Logo-PNG.png","Royal-Challengers-Bangalore-Logo-PNG.png","Rajasthan-Royals-Logo-PNG.png","Rajasthan-Royals-Logo-PNG.png","Gujarat-Lions-Logo-PNG.png","Gujarat-Lions-Logo-PNG.png","Kings-XI-Punjab-Logo-PNG.png","Kings-XI-Punjab-Logo-PNG.png","Delhi-Daredevils-Logo-PNG.png","Delhi-Daredevils-Logo-PNG.png","Chennai-Super-Kings-Logo-PNG.png","Chennai-Super-Kings-Logo-PNG.png"]
const deckCards2=["Gujarat-Lions-Logo-PNG.png","Gujarat-Lions-Logo-PNG.png","Kings-XI-Punjab-Logo-PNG.png","Kings-XI-Punjab-Logo-PNG.png","Delhi-Daredevils-Logo-PNG.png","Delhi-Daredevils-Logo-PNG.png","Chennai-Super-Kings-Logo-PNG.png","Chennai-Super-Kings-Logo-PNG.png"]
const deck=document.querySelector(".deck");
let level=2;
console.log(deck);
let opened=[];
let matched=[];
let stats=document.getElementById("stats");
let stats1=document.getElementById("stats1");
const modal=document.getElementById("modal");
const modal1=document.getElementById("modal1");
const reset=document.querySelector(".resetbtn");
const playagain =document.querySelector(".playagain");
console.log(playagain);
const number_of_moves=document.querySelector(".number_of_moves");
let moves=0;
let level_count=document.getElementById("level");
const  timecounter=document.querySelector(".timer_class");
let time,minute=0,sec=0;
let timeStart=false;
function shuffle(array)
{
    var current=array.length;
    var temp,rand;
    while(current!==0){
            rand=Math.floor(Math.random()*current);
            current-=1;
            temp=array[current];
            array[current]=array[rand];
            array[rand]=temp;
    }
    return array;   
}
function  startGame(){
    level_count.innerHTML="<h1>Level</h1>"+ (level-1);
    let shuffedDeck;
    if(level==2)
    shuffedDeck=shuffle(deckCards2);
    if(level==3)
    shuffedDeck=shuffle(deckCards3);
    if(level==4)
    shuffedDeck= shuffle(deckCards4);
    for(let i=0;i<shuffedDeck.length;i++)
    {
        const liTag=document.createElement('LI');
        liTag.classList.add('card');
        const addImage=document.createElement('IMG');
        liTag.appendChild(addImage); 
        addImage.setAttribute("src","img/"+shuffedDeck[i]);
        addImage.setAttribute("alt","images");
        console.log(liTag);
        console.log(deck);
        console.log(i,typeof i);
        deck.appendChild(liTag); 
    }
}
startGame();
function revomeCard()
{
    while(deck.hasChildNodes())
    {
        deck.removeChild(deck.firstChild); 
    }
}
function timer()
{
    time=setInterval(function(){
        sec++;
        if(sec===60)
        {
            minute++;
            sec=0;
        }
        timecounter.innerHTML="Timer:"+minute+"mins"+sec+"sec";
    },1000); 
}
function stopTime()
{
    clearInterval(time);
}
function resetEverything()
{
    stopTime();
    timeStart=false;
    sec=0;
    minute=0;
    timecounter.innerHTML="Timer: 00:00";
    moves=0;
    number_of_moves.innerHTML=0;
    matched=[];
    opened=[]; 
    revomeCard();
    startGame();
}
function movesCounter(){
    number_of_moves.innerHTML++;
    moves++;
}
function compareTwo(){
    if(opened.length===2)
    {
        document.body.style.pointerEvents="none";
    }
    if(opened.length===2 && opened[0].src === opened[1].src)
    {
        match();
    }
    else if (opened.length===2 & opened[0].src != opened[1].src)
        {
            noMatch();
        }
    
}
function match()
{
    setTimeout(function(){
        opened[0].parentElement.classList.add("match");
        opened[1].parentElement.classList.add("match");
        matched.push(...opened);
        document.body.style.pointerEvents="auto";
        winGame();
        opened=[];
    },600);
    movesCounter();
}

function noMatch()
{
    setTimeout(function(){
        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");
        document.body.style.pointerEvents="auto";
        opened=[];
    },700);
    movesCounter();
}

function displayModal(){
    const modalClose=document.getElementsByClassName("close")[0];
    modal.style.display="block";
    modalClose.onclick=function(){
        modal.style.display="none";
    };
    window.onclick=function(event){
        if(event.target == modal)
        {
            modal.style.display="none";
        }
    };
}
function end(){
    document.getElementById("stats2").innerHTML="TimeTaken : "+minute+" mins and "+sec+" secs";
    document.getElementById("stats3").innerHTML="Total number of moves : "+moves;
    const modalClose=document.getElementsByClassName("close")[0];
    modal1.style.display="block";
    modalClose.onclick=function(){
        modal1.style.display="none";
    };
    window.onclick=function(event){
        if(event.target == modal1)
        {
            modal1.style.display="none";
        }
    };
}
function Addstats()
{
    stats.innerHTML="TimeTaken : "+minute+" mins and "+sec+" secs";
    stats1.innerHTML="Total number of moves : "+moves;
}
function winGame(){
    if((matched.length===8 && level===2 ) || (matched.length===12 && level===3 ) || (matched.length===16 && level===4 ))
    {
        stopTime();
        Addstats();
        if(level!=4)
            displayModal();
        else
            end();
        level++;
    }
}

deck.addEventListener("click",function(evt){
    if(evt.target.nodeName=="LI")
    {
        console.log(evt.target.nodeName+" CLICKED");
        if(timeStart === false)
        {
            timeStart=true;
            timer();
        }
        flipCard();
    }
    function flipCard(){
        evt.target.classList.add("flip");
        addToOpened();
    }
    function addToOpened(){
        if(opened.length===0 || opened.length===1)
        {
            opened.push(evt.target.firstElementChild);
        }
        compareTwo();
    }
});
reset.addEventListener('click',resetEverything);
playagain.addEventListener('click',function(){
    modal.style.display="none";
    resetEverything();
});