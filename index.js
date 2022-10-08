
let keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false
}
document.addEventListener('keydown',function(e){
   e.preventDefault();
// console.log(e.key);
   keys[e.key]=true;
//    console.log(keys);
})
document.addEventListener('keyup',function(e){
    e.preventDefault();
     keys[e.key]=false;
    //  console.log(keys);
    // console.log(e.key);
 })

function movelines(){
    let line=document.querySelectorAll('.road-line');
    line.forEach(function(item){
        if(item.y>=700){
            item.y-=750;
        }
      item.y+=player.speed;
      item.style.top=item.y + "px";
    })
}

function endGame(){
    player.start=false;
    document.getElementById('start-game').classList.remove('hide')
    document.getElementById('start-game').innerHTML="Game Over <br> Your final score is " + player.score + 
    " <br> Press here to restart the Game."
}

function moveEnemyCar(car){
    let enemy=document.querySelectorAll('.enemy-car');
    enemy.forEach(function(item){

         if(creck(car,item)){ 
             console.log("it's over");
             endGame();
         }

        if(item.y>=750){
            item.y=-350;
            item.style.left=Math.floor(Math.random()*350)+"px";
        }
      item.y+=player.speed;
      item.style.top=item.y + "px";
    })
}

function creck(a,b){
    aRect=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();

    return!((aRect.bottom<bRect.top) || (aRect.top>bRect.bottom) ||
     (aRect.right<bRect.left) || (aRect.left>bRect.right))
}

 function play(){
    // console.log("hi this is animation");
    let car=document.querySelector('.car');
    let roadArea=road.getBoundingClientRect();
    // console.log(roadArea);
    if(player.start){

      movelines();
      moveEnemyCar(car);

        if(keys.ArrowUp && player.y>roadArea.top + 70){player.y -=player.speed}
        if(keys.ArrowDown && player.y<(roadArea.bottom-110)){player.y +=player.speed}
        if(keys.ArrowLeft && player.x>0){player.x -=player.speed}
        if(keys.ArrowRight && player.x<(roadArea.width-60)){player.x +=player.speed}

         car.style.top=player.y + "px";
         car.style.left=player.x + "px";

        window.requestAnimationFrame(play);
        console.log(player.score++);

        player.score++;
        let ps=player.score-2
        score.innerText="score " + ps;
    }
 }
 let player={speed:5,score:0};
let road=document.getElementById('road')
document.getElementById('start-game').addEventListener('click',function(){
    // document.getElementById('road').classList.remove('hide')
    document.getElementById('start-game').classList.add('hide')
    document.getElementById('road').innerHTML="";

    player.start=true;
    player.score=0;
    window.requestAnimationFrame(play);

     for(x=0;x<5;x++){

    let roadLine=document.createElement('div');
    roadLine.setAttribute('class','road-line');
    roadLine.y=(x*150)
    roadLine.style.top=roadLine.y + "px";
    document.getElementById('road').appendChild(roadLine);    

    }

    let car= document.createElement('div');
    car.setAttribute('class','car');
    // car.innerText="this is car";
    document.getElementById('road').appendChild(car);    

   player.x=car.offsetLeft;
   player.y=car.offsetTop;
    // console.log(car.offsetLeft);
    // console.log(car.offsetTop);
    for(x=0;x<3;x++){
    let enemyCar=document.createElement('div');
  enemyCar.setAttribute('class','enemy-car');
    enemyCar.y=((x+1)*350)* -1;
    enemyCar.style.top=enemyCar.y + "px";
    enemyCar.style.left=Math.floor(Math.random()*350)+"px";
    document.getElementById('road').appendChild(enemyCar);    
    }

})

