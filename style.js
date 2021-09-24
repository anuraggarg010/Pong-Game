let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let boardbounds = board.getBoundingClientRect();//getting coordinates of board
let x = true;
let y = true;
var leftplayerlives =3;
var rightplayerlives =3;

//moving paddle
let leftpaddle = document.querySelector(".left");
let rightpaddle = document.querySelector(".right");
document.addEventListener("keydown", function (e) {
   
    if (e.key == "w") {
        movepaddle(leftpaddle, -window.innerHeight * 0.1);//decreasing by 10per of windowheight
    }
    else if (e.key == "s") {
        movepaddle(leftpaddle, window.innerHeight * 0.1);
    }
    else if (e.key == "ArrowUp") {
        movepaddle(rightpaddle, -window.innerHeight * 0.1);
    }
    else if (e.key == "ArrowDown") {
        movepaddle(rightpaddle, window.innerHeight * 0.1);
    }

});



function movepaddle(cpaddle, change)
{
    let cpaddlebounds = cpaddle.getBoundingClientRect();//gettin paddle coordinates
    if (cpaddlebounds.top + change >= boardbounds.top && cpaddlebounds.bottom + change <= boardbounds.bottom) {
        cpaddle.style.top = cpaddlebounds.top + change + "px";
    }
}


//moving ball
function moveball() {
    let ballcord = ball.getBoundingClientRect();//getting current position of ball
    let balltop = ballcord.top;
    let ballleft = ballcord.left;
    let ballbottom = ballcord.bottom;//coordinates of ball
    let ballright = ballcord.right;

    //check if ball collides with any place horizontal boundary
    let hastouchedleft = ballleft<boardbounds.left;
    let hastouchedright = ballright>boardbounds.right;

    if(hastouchedleft || hastouchedright )
    {
      if(hastouchedleft){
       leftplayerlives--;
     
 
       if(leftplayerlives==0)
       {
          alert("RIGHT WINS"); 
             document.location.reload();
       }
       else{
           return  resetGame();
       }
      }
      else{
           rightplayerlives--;

            if(rightplayerlives==0)
            {
               alert("LEFT WINS");
               document.location.reload();
            }
            else{
              return  resetGame();
            }
         }
    }

    function resetGame(){
        ball.style.top=window.innerHeight*0.45+"px";
        ball.style.left=window.innerWidth*0.45+"px";
        requestAnimationFrame(moveball);
    }

  
      

  //handling ball doesnot move outside of board or is ball in bound 

    //handle vertical bound 
    if (balltop <= boardbounds.top || ballbottom >= boardbounds.bottom) {
        //means vertically outside
        y = !y;//means y is false it is outside 
    }

    //handle horizontal bound 
    //if (ballleft <= boardbounds.left || ballright >= boardbounds.right) {
        //horizontal outside
      //  x = !x;
    //}

   //when  ball strike left or right  paddle
      let leftpaddlebounds = leftpaddle.getBoundingClientRect();
     let rightpaddlebounds = rightpaddle.getBoundingClientRect();
   
    if(ballleft <= leftpaddlebounds.right && ballright >= leftpaddlebounds.left &&  balltop+30 >= leftpaddlebounds.top && ballbottom-30 <= leftpaddlebounds.bottom)
    {
      x = !x;
    }
   if(ballleft <= rightpaddlebounds.right && ballright >=  rightpaddlebounds.left &&   balltop+30 >= rightpaddlebounds.top && ballbottom-30 <= rightpaddlebounds.bottom)
    {
      x = !x;
     }

    // handle movement of ball 
    ball.style.top = y == true ? balltop + 7 + "px" : balltop - 7 + "px";
    ball.style.left = x == true ? ballleft + 7 + "px" : ballleft - 7 + "px";//moving 1 step forward

    requestAnimationFrame(moveball);
}
requestAnimationFrame(moveball);//TO SHOW BALL MOVING at every frame

