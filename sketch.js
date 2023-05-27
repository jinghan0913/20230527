let points = [[-3,0],[-3,1],[-4,2],[-5,1],[-6,2],[-5,3],[-4,3],[-4,4],[-5,3],[-6,4],[-5,5],[-4,5],[-3,4],[-2,5],[-3,6],[-3,7],[-1,10],[1,10],[3,11],[4,11],[6,10],[4,9],[3,9],[1,8],[3,9],[5,8],[5,6],[4,7],[3,7],[1,5],[2,4],[2,-1],[3,-3],[3,-5],[4,-5],[5,-4],[6,-4],[7,-5],[5,-7],[4,-7],[3,-6],[3,-7],[-5,-7],[-5,-6],[-4,-5],[-3,-5],[-4,-4],[-4,-3],[-3,-2],[-2,-2],[-3,0]]
var stroke_colors = "edede9-d6ccc2-f5ebe0-e3d5ca-d5bdaf".split("-").map(a=>"#"+a)
var fill_colors = "ff99c8-fcf6bd-d0f4de-a9def9-e4c1f9".split("-").map(a=>"#"+a)

var ball  //大象物件，代表單一個物件，利用這個變數來做正在處理的物件
var balls =[]  //陣列，放所有的物件資料，物件倉庫，裡面儲存所有的物件資料
var bullet  //飛彈物件
var bullets=[]
var monster   //怪物物件
var monsters=[]
var score = 0
var shipP   //設定砲台的位置
function setup() {  //設定大象物件倉庫內的資料
  createCanvas(windowWidth, windowHeight);
  shipP = createVector(width/2,height/2)  //預設砲台的位置為視窗的中間(使用向量座標)
  //產生幾個物件
  for(var j=0;j<50;j=j+1)
  {
    ball = new Obj({})  //產生一個新的物件，"暫時"放入到ball變數中
    balls.push(ball)  //把ball物件放入到balls物件倉庫(陣列)中
  }
  for(var j=0;j<20;j=j+1)
  {
    monster = new Monster({})  //產生一個新的物件，"暫時"放入到monster變數中
    monsters.push(monster)  //把monster物件放入到monsters物件倉庫(陣列)中
  }

  
}

function draw() {  //每秒會執行60次次
  background(220);
  for(let ball of balls){  //針對陣列變數，取出陣列內一個一個的物件
    ball.draw()
    ball.update()
    //+++++++++++++++由此判斷，每隻大象有沒有接觸每一個飛彈++++++++++++++++++++++
    for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y))  //判斷ball與bullet有沒有碰觸
      {
        score = score - 1     //分數扣一
        balls.splice(balls.indexOf(ball),1)         //讓大象從大象倉庫內移除
        bullets.splice(bullets.indexOf(bullet),1)   //讓飛彈從飛彈倉庫內移除
      }
    }
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  }


  for(let bullet of bullets){  //針對飛彈倉庫內的資料，一筆一筆的顯示出來
    bullet.draw()
    bullet.update()
  }

  for(let monster of monsters){  //針對怪物倉庫內的資料，一筆一筆的顯示出來
    if(monster.IsDead && monster.timenum>=6){
      monsters.splice(monsters.indexOf(monster),1) //讓怪物從怪物資料倉庫內移除
    }
    monster.draw()
    monster.update()
    //+++++++++++++++由此判斷，每隻怪物有沒有接觸每一個飛彈++++++++++++++++++++++
    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y))  //判斷monster與bullet有沒有碰觸
      {
        score = score + 5     //分數加一
        monster.IsDead = true //已經被打到了，準備執行爆炸後的畫面
        bullets.splice(bullets.indexOf(bullet),1)   //讓飛彈從飛彈倉庫內移除
      }
    }

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  }

  textSize(50)
  text(score,50,50)
  //+++++劃出中間三角形的砲台++++++++++++++
  push()
    let dx = mouseX-width/2  //滑鼠座標到中心點座標的x軸距離
    let dy = mouseY-height/2 //滑鼠座標到中心點座標的y軸距離
    let angle = atan2(dy,dx)   //利用反tan算出角度


    // translate(width/2,height/2)  //砲台的位置  
    translate(shipP.x,shipP.y) //砲台的位置 ，使用shipP的向量值
    rotate(angle)    //讓三角形翻轉一個angle角度       
    noStroke()
    fill("#ffd6ff")
    ellipse(0,0,60)  //劃出中間的圓
    fill("#ff8fab")
    triangle(50,0,-25,-25,-25,25)  //劃出三角形
  pop()
  //+++++++++++++++++++++++++++++++

}

function mousePressed(){
  
  //新增(產生)一筆飛彈資料(還沒有顯示)
  bullet  = new Bullet({})
  bullets.push(bullet)  //把這一筆資料放入飛彈倉庫

}

function keyPressed(){
  if(key==" "){
    //新增(產生)一筆飛彈資料(還沒有顯示)
    bullet  = new Bullet({})
    bullets.push(bullet)  //把這一筆資料放入飛彈倉庫
   
  }  

}