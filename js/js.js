/**
 * Created by Administrator on 2016-08-21.
 */
var chessBox=document.getElementById('chessBox');
var chessBoxUl=chessBox.getElementsByTagName('ul')[0];
var arr=[];//表示二维数组；对应棋盘的交点
function chessBoxFun(rows){//rows表示我需要的行数
    var cols=chessBox.clientWidth/40;//每一行有几个;//clientWidth节点的可视宽度；40就是每个li的大小
    var frag=document.createDocumentFragment();//碎片就像一个空瓶子
    for(var i=0;i<=rows;i++)//纵坐标
    {
        arr[i]=[];//定义一维数组的元素为数组
        for(var j=0;j<=cols;j++)//横坐标
        {
            arr[i][j]=false;//变成二维数组,false表示没有落子
            if(i!=rows && j!=cols ){
                var li=document.createElement('li');//创建li
                frag.appendChild(li);//写入碎片
            }
        }
    }
    chessBoxUl.appendChild(frag);//写入ul
}
chessBoxFun(10);//创建棋盘


var boolVal=true;//true表示黑子，false表示白子
chessBox.onclick=function(e){ //每次点击触发函数
    var event=window.event || e; //得到事件对象
    var bodyChessBoxPosX=chessBox.offsetLeft;//得到节点于父级的距离（position有关）
    var bodyChessBoxPosY=chessBox.offsetTop;
    var pageX=event.pageX;//每个li节点的距离
    var pageY=event.pageY;
    //console.log(bodyChessBoxPosX,bodyChessBoxPosY,pageX,pageY);

    var X=Math.round((pageX-bodyChessBoxPosX)/40);//表示落子的x位子
    var Y=Math.round((pageY-bodyChessBoxPosY)/40);//表示落子的y位子
    //console.log(X,Y);

    if(arr[Y][X]){ //true才能进入判断,表示棋子已存在
        alert("棋子已经存在,请换个落子位子");
        return;//跳出函数
    }

    arr[Y][X]=true;//记录此坐标已经有落子

    var current=document.getElementById("current");
    var i=document.createElement('i');//创建i标签
    if(boolVal){//判断是黑子下还是白子下
        i.className="black";
        boolVal=false;
        current.style.top="80px";
        arr[Y][X]="black";
    }
    else{
        i.className="white";
        boolVal=true;
        current.style.top="0px";
        arr[Y][X]="white";
    }
    i.setAttribute("style","left:"+(X*40-15)+"px;top:"+(Y*40-15)+"px;");//落子的具体位子
    chessBox.appendChild(i);
    winFun(X,Y,arr[Y][X]);
}
function winFun(X,Y,color){//X表示横坐标；Y表示纵坐标；color表示颜色
    var num=0;//表示相同个数
    for(var i=Y-4,j=X;i<=Y+4;i++){//横向
        if(i>=0 && j>=0){//数组必须是自然数
            if(arr[i]!=null){//arr[i]必须存在
                if(arr[i][j]==color){
                    num++;
                    if(num==5){
                        alert(color+"赢了!");
                    }
                }
                else{ num=0;}//中间碰到不同颜色的必须归零，防止不连贯
            }
        }
    }

    for(var i=Y,j=X-4;j<=X+4;j++){//纵向
        if(i>=0 && j>=0){
            if(arr[i]!=null){
                if(arr[i][j]==color){
                    num++;
                    if(num==5){
                        alert(color+"赢了!");
                    }
                }
                else{ num=0;}
            }
        }
    }

    for(var i=Y-4,j=X-4;i<=Y+4,j<=X+4;i++,j++){//斜向下
        if(i>=0 && j>=0){
            if(arr[i]!=null){
                if(arr[i][j]==color){
                    num++;
                    if(num==5){
                        alert(color+"赢了!");
                    }
                }
                else{ num=0;}
            }
        }
    }

    for(var i=Y+4,j=X-4;i<=Y-4,j>=X+4;i--,j++){//斜向上
        if(i>=0 && j>=0){
            if(arr[i]!=null){
                if(arr[i][j]==color){
                    num++;
                    if(num==5){
                        alert(color+"赢了!");
                    }
                }
                else{ num=0;}
            }
        }
    }
}