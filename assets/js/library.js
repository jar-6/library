$(document).ready(function(){
//基本预设

  var scene;
  var light;
  var camera
  var cameraP,cameraL
  var renderer;
//书单预设
  var bookList=[];
  var bookListAll=[];
  var cataNum=[245,247,248,257];
  //var myBookList=[[],[],[],[]];
  var myBookList=
  [[{"title":"人生就是不停的战斗","catalog":"小说 成功励志 散文 ","tags":"台湾文学 成长小说 散文随笔 青春励志 青春文学 ","sub1":"九把刀励志作：《人生就是不停的战斗》","sub2":"《人生就是不停的战斗》是台湾著名作家九把刀创作的第一部战斗文学励志作。全书由九把刀的博客文章集结而成，记述了发生在作者生活中大大小小的事情，大到人生哲学、情感专栏、演讲历程，小到和女朋友的一次吵架。\n《人生就是不停的战斗》","img":"http:\/\/apis.juhe.cn\/goodbook\/img\/99d98edde4eb65b8de2a650ce967d2de.jpg","reading":"39179人阅读","bytime":"2014年3月6日"},{"title":"最好的时光在路上","catalog":"散文 旅游 ","tags":"好书推荐 带心灵去旅行 散文随笔 游记 ","sub1":"旅行作家郭子鹰的灵魂悟语：《最好的时光在路上》","sub2":"“一辈子是场修行，短的是旅行，长的是人生。” ","img":"http:\/\/apis.juhe.cn\/goodbook\/img\/b83919999c7d66892c6b994389c32665.jpg","reading":"31374人阅读","bytime":"2014年3月24日"}],[{"title":"人生就是不停的战斗","catalog":"小说 成功励志 散文 ","tags":"台湾文学 成长小说 散文随笔 青春励志 青春文学 ","sub1":"九把刀励志作：《人生就是不停的战斗》","sub2":"《人生就是不停的战斗》是台湾著名作家九把刀创作的第一部战斗文学励志作。全书由九把刀的博客文章集结而成，记述了发生在作者生活中大大小小的事情，大到人生哲学、情感专栏、演讲历程，小到和女朋友的一次吵架。\n《人生就是不停的战斗》","img":"http:\/\/apis.juhe.cn\/goodbook\/img\/99d98edde4eb65b8de2a650ce967d2de.jpg","reading":"39179人阅读","bytime":"2014年3月6日"},{"title":"最好的时光在路上","catalog":"散文 旅游 ","tags":"好书推荐 带心灵去旅行 散文随笔 游记 ","sub1":"旅行作家郭子鹰的灵魂悟语：《最好的时光在路上》","sub2":"“一辈子是场修行，短的是旅行，长的是人生。” ","img":"http:\/\/apis.juhe.cn\/goodbook\/img\/b83919999c7d66892c6b994389c32665.jpg","reading":"31374人阅读","bytime":"2014年3月24日"}],[{"title":"人生就是不停的战斗","catalog":"小说 成功励志 散文 ","tags":"台湾文学 成长小说 散文随笔 青春励志 青春文学 ","sub1":"九把刀励志作：《人生就是不停的战斗》","sub2":"《人生就是不停的战斗》是台湾著名作家九把刀创作的第一部战斗文学励志作。全书由九把刀的博客文章集结而成，记述了发生在作者生活中大大小小的事情，大到人生哲学、情感专栏、演讲历程，小到和女朋友的一次吵架。\n《人生就是不停的战斗》","img":"http:\/\/apis.juhe.cn\/goodbook\/img\/99d98edde4eb65b8de2a650ce967d2de.jpg","reading":"39179人阅读","bytime":"2014年3月6日"},{"title":"最好的时光在路上","catalog":"散文 旅游 ","tags":"好书推荐 带心灵去旅行 散文随笔 游记 ","sub1":"旅行作家郭子鹰的灵魂悟语：《最好的时光在路上》","sub2":"“一辈子是场修行，短的是旅行，长的是人生。” ","img":"http:\/\/apis.juhe.cn\/goodbook\/img\/b83919999c7d66892c6b994389c32665.jpg","reading":"31374人阅读","bytime":"2014年3月24日"}],[{"title":"人生就是不停的战斗","catalog":"小说 成功励志 散文 ","tags":"台湾文学 成长小说 散文随笔 青春励志 青春文学 ","sub1":"九把刀励志作：《人生就是不停的战斗》","sub2":"《人生就是不停的战斗》是台湾著名作家九把刀创作的第一部战斗文学励志作。全书由九把刀的博客文章集结而成，记述了发生在作者生活中大大小小的事情，大到人生哲学、情感专栏、演讲历程，小到和女朋友的一次吵架。\n《人生就是不停的战斗》","img":"http:\/\/apis.juhe.cn\/goodbook\/img\/99d98edde4eb65b8de2a650ce967d2de.jpg","reading":"39179人阅读","bytime":"2014年3月6日"},{"title":"最好的时光在路上","catalog":"散文 旅游 ","tags":"好书推荐 带心灵去旅行 散文随笔 游记 ","sub1":"旅行作家郭子鹰的灵魂悟语：《最好的时光在路上》","sub2":"“一辈子是场修行，短的是旅行，长的是人生。” ","img":"http:\/\/apis.juhe.cn\/goodbook\/img\/b83919999c7d66892c6b994389c32665.jpg","reading":"31374人阅读","bytime":"2014年3月24日"}]]
  var cameraStatus=0;
  var doneArr=[[],[],[],[]];
  
  
//鼠标预设
  var clickNum;
  var hoverNum;
  var preClickNum;
  var preHoverNum=0;
  var q=new THREE.Object3D();
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2(),INTERSECTED;
//canvas值预设
  var width = window.innerWidth;
  var height = window.innerWidth*0.6;
  if(width>1000){windowZoom=width/1000}
  else{windowZoom=1}
  $("#canvas-frame").css({"width":width/2+width*windowZoom/2,"height":height/2+height*windowZoom/2,"left":-width*windowZoom/2+width/2,"top":-height*windowZoom/2+height/2});  //windowZoom
//形状预设
  var boxArr,windowArr,glassArr,textArr,bookArr,floor1Arr,cataArr;
  var roomGroup,treeGroup,columnGroup,shelfGroup,warehouse;
  var boxH,boxD,windowD,windowB,boxL,undonePercent,radiumCol,shelfL,shelfH,shelfD,shelfB,shelfRowN,shelfColN
  initShape();

//材质值预设 
  var boxColor=[0x0000ff,0x00ffff,0x00ff00,0xffff00,0x00ff00,0xffff00,0x0000ff];
  var whiteM = new THREE.MeshLambertMaterial({color:0xcccccc});
  var columnM = new THREE.MeshLambertMaterial({color:0xcccccc}); 
  var greenM = new THREE.MeshLambertMaterial({color:0x2E8B57});
  var brownM = new THREE.MeshLambertMaterial({color:0x330000});
  var loader=new THREE.TextureLoader();
  var grassMap = loader.load( './assets/img/grass.jpg', function ( grassMap ) {
    grassMap.wrapS = THREE.RepeatWrapping;
    grassMap.repeat.set(3, 1.5 );
  });
  var grassM = new THREE.MeshLambertMaterial({map:grassMap})
 

//function 
  function initShape(){
    cameraP=[500,370,1000];
    cameraL=[-500,-230,0];
    warehouse=new THREE.Object3D();
    roomGroup=new THREE.Object3D();
    shelfGroup=new THREE.Object3D();
    columnGroup=new THREE.Object3D();
    treeGroup = new THREE.Object3D();
    boxArr=[];windowArr=[];glassArr=[];textArr=[];bookArr=[];floor1Arr=[];cataArr=[];
    boxH=50
    boxD=200
    windowD=25
    windowB=4
/*    boxL=myBookList.map(function(val,index,arr){
      if(val!==undefined){
        return 100+25*val.length
      }
      else{return val=100}
    })*/
  boxL=[100,300,200,50]
    undonePercent=myBookList.map(function(val,index,arr){
      if(val!==0){return 1-doneArr[index].length/val.length}
      else{return 1}
    })
    //undonePercent=[0.9,0.9,0.4,0.9]
    console.log(boxL,undonePercent,doneArr)
    radiumCol=3.5;
    shelfL=12,shelfH=12,shelfD=12,shelfL=12,shelfB=1,shelfRowN=3,shelfColN=7
  } 
  function cleanObject(){
    boxArr.forEach(function(value){scene.remove(value)})
    floor1Arr.forEach(function(value){scene.remove(value)})
    glassArr.forEach(function(value){scene.remove(value)})
    windowArr.forEach(function(value){scene.remove(value)})
    textArr.forEach(function(value){scene.remove(value)})
    cataArr.forEach(function(value){scene.remove(value)})
    scene.remove(roomGroup,columnGroup,warehouse,shelfGroup);
    initShape()
  }   

//取得书
  function getBook(){
    for(let i=0;i<4;i++){
      $.getJSON("http://apis.juhe.cn/goodbook/query?callback=?",{
        async:false,
        catalog_id:cataNum[i],
        rn:30,
        key:"d43d49f6b17a5b13abc49697214f62fb",
        format: 'jsonp',
        apikey:"hwE4tut1go0Fs9rMP7VFvfVqtKVXB6NLZCDqS7yeT3AyQvFK8zvcVVEOgObC0vaK",
      },function(json){
          json.result.data.forEach(function(val,index,arr){val.catalogId=i+"-"+index;})
          bookList[i]=json.result.data;
          //console.log("get",bookList)
      })
    }
  }
//排序方式
  function sortReading(a,b){
    return  b.reading.slice(0,-5)-a.reading.slice(0,-5);
  }
//显示书单
  function appendBookList(){
    getBook();
    var t=setTimeout(function(){
      for(var i=0;i<bookList.length;i++){
        var bookListAll2=bookListAll.concat(bookList[i])
        bookListAll=bookListAll2;
        //console.log("add2",bookListAll);
      }
      bookListAll.sort(sortReading);
      //console.log("fanal",bookListAll);
      for(var i=0;i<bookListAll.length;i++){
        var book="<div class='list' id="+bookListAll[i].catalogId+">"+bookListAll[i].title+"</div>"
        $("#list-frame").append(book);
      }
    },3000);
  }
/*    function nofind(){
var img=event.srcElement;
img.src="./assets/img/error.png";
img.onerror=null; 控制不要一直跳动
}*/
  function renderBook(value,index,arr){
    if(value!==undefined){
      var src=value.img;
      var errorSrc="./assets/img/error.png"
      //$("#books").append("<div class='book'><img class='book-img' src='"+src+"'/></div>")
      $("#books").append("<div class='book' id='"+index+"' style='width:"+shelfL*windowZoom+"px;height:"+shelfL*windowZoom+"px'><img class='book-img' src='"+src+"' style='width:"+shelfL*windowZoom*0.6+"px;height:"+shelfL*windowZoom*0.8+"px;left:"+shelfL*windowZoom*0.1+"px;top:"+shelfL*windowZoom*0.18+"px'/></div>")
    }
  }

  function putBook(clickNum){
    console.log("putbook")
    var list=myBookList[clickNum-1];
    var frameWidth=shelfL*(shelfColN-1)*windowZoom
    var frameHeight=shelfH*(shelfRowN-1)*windowZoom
    $("#books").css({"width":frameWidth,"height":frameHeight,"left":width/2-frameWidth/2,"top":width/3*2/2-frameHeight+boxH*windowZoom/2-frameHeight/2-windowB*windowZoom});
    var list=myBookList[clickNum-1]
    //var list=[1,2,3,3,3,3,3];
    list.forEach(renderBook)
    doneArr[clickNum-1].forEach(showDone)
  }
  function showDone(val,index,arr){
    var index=parseInt(val);
    var buttonLeft=index*shelfL*windowZoom;
    var buttonTop=-shelfL*windowZoom*Math.floor(index/(shelfColN-1))
    $("#books").append("<div class='read-state' style='left:"+buttonLeft+"px;top:"+buttonTop+"px'><img src='./assets/img/done.png'/></div>")
  }
  function initThree() {
    renderer = new THREE.WebGLRenderer({
      antialias : true
    });
    renderer.setSize(width*windowZoom, height*windowZoom);
    $('#canvas-frame').append(renderer.domElement);
    renderer.setClearColor(0x333333, 1.0);
    renderer.shadowMap.enabled = true // 设置是否开启投影, 开启的话, 光照会产生投影
    renderer.shadowMap.type = THREE.PCFSoftShadowMap  
  }

 
  function initCamera() {
    camera=new THREE.OrthographicCamera(width / - 2, width / 2,height / 2, height / - 2, 0, 2000 );
    camera.up.set(0,0,0);
    camera.position.set(cameraP[0],cameraP[1],cameraP[2]);
    camera.lookAt(new THREE.Vector3(cameraL[0],cameraL[1],cameraL[2]));
  }
  function initScene() {
    scene = new THREE.Scene();
  }
  function initLight() {
    var directionalLight = new THREE.DirectionalLight( 0xffffff , 1.1); 
    directionalLight.position.set( 300, 1000, 500 );
    directionalLight.target.position.set( 0, 0, 0 );
    directionalLight.castShadow = true; 
    directionalLight.shadow.camera = new THREE.OrthographicCamera(width / - 2, width / 2,height / 2, height / - 2, 0, 1800 );
    directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024; 
    scene.add(directionalLight)
    var light = new THREE.AmbientLight( 0xffccdd, 0.35 ) 
    scene.add( light )
  }
  function initObject(shapeZoom,clickNum){

    //boxL=[boxL[0]*shapeZoom,boxL[1]*shapeZoom,boxL[2]*shapeZoom,boxL[3]*shapeZoom,boxL[4]*shapeZoom,boxL[5]*shapeZoom]
    boxL =boxL.map(function(val){return val=val*shapeZoom})
    boxH=boxH*shapeZoom;
    boxD=boxD*shapeZoom;
    boardRow=boardRow*shapeZoom;
    shelfL=shelfD=shelfH=shelfL*shapeZoom;
    shelfB=shelfB*shapeZoom;
    windowB=windowB*shapeZoom;
    windowD=windowD*shapeZoom;
    
    //草
    var grass= new THREE.Mesh(new THREE.CubeGeometry(width*1.5,2,width),greenM);
    grass.position.set(0,0,width/4);
   //书架
    for(i=0;i<shelfRowN;i++){
      var boardRow=new THREE.Mesh(new THREE.CubeGeometry(shelfL*(shelfColN-1)+shelfB,shelfB,shelfD),brownM);
      var boardRows=boardRow.clone();
      boardRows.translateOnAxis(new THREE.Vector3(0,1,0),shelfH*i)
      shelfGroup.add(boardRows);
    }
    for(i=0;i<shelfColN;i++){
      var boardCol=new THREE.Mesh(new THREE.CubeGeometry(shelfB,shelfH*(shelfRowN-1),shelfD),brownM);
      boardCol.position.set(-shelfL*shelfColN/2+shelfL/2,shelfH*(shelfRowN-1)/2,0)
      var boardCols=boardCol.clone();
      boardCols.translateOnAxis(new THREE.Vector3(1,0,0),shelfL*i)
      shelfGroup.add(boardCols);
    }
    //书库
    new THREE.FontLoader().load('./assets/fonts/optimer_bold.typeface.json',function(font){
      var warehouseGeo=new THREE.TextGeometry("GET",{font:font,size:boxH,height:boxD});
      warehouseGeo.computeBoundingBox();
      var warehouseMesh = new THREE.Mesh(warehouseGeo,whiteM);
      warehouseMesh.position.set(-boxH/5,0,-boxD/2);
      warehouse.add(warehouseMesh);
    })
    //2~6层
    for(var i=0;i<boxL.length+2;i++){
      var boxMap;var glassMap;
      (function(num){
        boxMap = loader.load( "./assets/img/"+parseInt(num+1)+"f.jpg", function ( boxMap ) {
          boxMap.wrapS = THREE.RepeatWrapping;
          boxMap.repeat.set(boxL[num]/100, 0.5);
        });
        glassMap = loader.load( "./assets/img/glass.jpg", function ( glassMap ) {
        glassMap.wrapS = THREE.RepeatWrapping;
        glassMap.repeat.set((1-undonePercent[num])*boxL[num]/30, 0.1);
        });
      })(i);
      //var box = new THREE.Mesh( new THREE.CubeGeometry(boxL[i],boxH,boxD),new THREE.MeshLambertMaterial({map:boxMap}));
      if(i<boxL.length){
        var box = new THREE.Mesh( new THREE.CubeGeometry(boxL[i],boxH,boxD),whiteM);
        box.position.set(boxL[i]/2,boxH*(i+3/2),0);
        scene.add(box);
        boxArr.push(box);
        var floor1 = new THREE.Mesh(new THREE.CubeGeometry(boxL[i]+5,windowB,boxD+20),whiteM);
        floor1.position.set((boxL[i]+5)/2,boxH*(i+1)+windowB/2,0);
        var floor2=floor1.clone();
        floor2.translateOnAxis(new THREE.Vector3(0,1,0),boxH);
        //var wall1= new THREE.Mesh( new THREE.CubeGeometry(2,boxH,boxD), new THREE.MeshLambertMaterial({map:boxMap}));
        var wall1= new THREE.Mesh( new THREE.CubeGeometry(windowB,boxH,boxD), whiteM);
        wall1.position.set(windowB/2,boxH*(i+3/2),0)
        var wall2=wall1.clone();
        wall2.translateOnAxis(new THREE.Vector3(1,0,0),boxL[i]-windowB);
        var wall3= new THREE.Mesh( new THREE.CubeGeometry(boxL[i],boxH,1), whiteM);
        wall3.position.set(boxL[i]/2,boxH*(i+3/2),-boxD/2)
        roomGroup.add(floor2,wall1,wall2,wall3)
        scene.add(floor1);
        floor1Arr.push(floor1);
      
      //窗户
        var leftL=undonePercent[i]*boxL[i];
        var rightL=(1-undonePercent[i])*boxL[i];
        var doneWindow = new THREE.Object3D();
        var window1 = new THREE.Mesh( new THREE.CubeGeometry(rightL,windowB,windowD),whiteM);
        window1.position.set(rightL/2+leftL,boxH*(i+1)+windowB,(boxD+windowD)/2);
        var window2=window1.clone();
        window2.translateOnAxis(new THREE.Vector3(0,1,0),boxH-windowB/2);
        var window3 = new THREE.Mesh(new THREE.CubeGeometry(windowB,boxH,windowD),whiteM);
        window3.position.set(leftL+windowB/2,boxH*(i+3/2)+windowB,(boxD+windowD)/2)
        var window4=window3.clone();
        window4.translateOnAxis(new THREE.Vector3(1,0,0),rightL-windowB);
        var glass = new THREE.Mesh(  new THREE.CubeGeometry(rightL,boxH-2*windowB),new THREE.MeshLambertMaterial({map:glassMap}));
        glass.position.set(leftL+rightL/2,boxH*(i+3/2)+windowB/2,(boxD+windowD)/2);
        doneWindow.add(window1,window2,window3,window4);
        var nothing=new THREE.Mesh(new THREE.CubeGeometry(1,1,1),whiteM);
        if(undonePercent[i]<1){
          scene.add(doneWindow);
          scene.add(glass);
          windowArr.push(doneWindow);
          glassArr.push(glass);
        }
        else{
          windowArr.push(nothing);
          glassArr.push(nothing);
        }
        //文字
        var cataName=["NOVEL","PROSE","HISTORY","PHILOSOPHY"];
        var cataSize=[50,50,32,22];
        (function (position,text,shape){
          new THREE.FontLoader().load('./assets/fonts/optimer_bold.typeface.json',function(font){
            var textGeo=new THREE.TextGeometry(text,{font:font,size:shape[0],height:shape[1]});
            textGeo.computeBoundingBox();
            var text3D = new THREE.Mesh(textGeo,whiteM);
            text3D.position.set(position[0],position[1],position[2]);
            textArr.push(text3D);
          })
        })([leftL+rightL/2-30,boxH*(i+3/2)-10,(boxD+2*windowD)/2], Math.floor((1-undonePercent[i])*100)+"%",[20,0.5]);
        (function (position,text,shape){
          new THREE.FontLoader().load('./assets/fonts/optimer_bold.typeface.json',function(font){
            var textGeo=new THREE.TextGeometry(text,{font:font,size:shape[0],height:shape[1]});
            textGeo.computeBoundingBox();
            var text3D = new THREE.Mesh(textGeo,whiteM);
            text3D.position.set(position[0],position[1],position[2]);
            text3D.rotateOnAxis(new THREE.Vector3(0,1,0),Math.PI/2);
            scene.add(text3D);
            cataArr.push(text3D);
          })
        })([boxL[i],boxH*(i+3/2)-20,(boxD)/2], cataName[i],[cataSize[i],5]); 
      }
      //树
      var treeLeave1 = new THREE.Mesh(new THREE.CylinderGeometry(8,8,10),greenM);
      var treeLeave2=treeLeave1.clone();
      var treeRoot1 = new THREE.Mesh(new THREE.CylinderGeometry(1,1,10),brownM);
      var treeRoot2=treeRoot1.clone();
      treeLeave1.position.set(-4*radiumCol,boxH*(i+2)+20,-boxD/2+radiumCol*4);
      treeLeave2.position.set(-4*radiumCol,boxH*(i+2)+20,boxD/2-radiumCol*4);
      treeRoot1.position.set(-4*radiumCol,boxH*(i+2)+10,-boxD/2+radiumCol*4);
      treeRoot2.position.set(-4*radiumCol,boxH*(i+2)+10,boxD/2-radiumCol*4);
       // for(j=2;j*50<=boxL[i+1]&&boxL[i]>boxL[i+1];j++){   
      for(j=Math.ceil(boxL[i+1]/50)+1;j*50<=boxL[i]&&boxL[i]>boxL[i+1];j++){ 
        var treeLeave1s=treeLeave1.clone();
        var treeLeave2s=treeLeave2.clone();
        treeLeave1s.translateOnAxis(new THREE.Vector3(1,0,0),50*j);
        treeLeave2s.translateOnAxis(new THREE.Vector3(1,0,0),50*j);
        var treeRoot1s=treeRoot1.clone();
        var treeRoot2s=treeRoot2.clone();
        treeRoot1s.translateOnAxis(new THREE.Vector3(1,0,0),50*j);
        treeRoot2s.translateOnAxis(new THREE.Vector3(1,0,0),50*j);
        columnGroup.add(treeLeave1s,treeLeave2s,treeRoot1s,treeRoot2s);
      }
      
      //柱子
      var column = new THREE.Object3D();
      var column1 = new THREE.Mesh( new THREE.CylinderGeometry(radiumCol,radiumCol,boxH*i),columnM);
      var column2=column1.clone();
      var column1b=column1.clone();
      var column2b=column2.clone();
      var arr=boxL.slice(i-2,boxL.length+2);
      column1.position.set(-2*radiumCol,boxH*i/2,-boxD/2+radiumCol*2);
      column2.position.set(-2*radiumCol,boxH*i/2,boxD/2-radiumCol*2);
      column1b.position.set(0,boxH*i/2,-boxD/2+radiumCol*2);
      column2b.position.set(0,boxH*i/2,boxD/2-radiumCol*2);
      columnGroup.add(column1b,column2b);
      
        for(j=1;j*50<=Math.max.apply(Math,arr);j++){   
          var column1s=column1.clone();
          var column2s=column2.clone();
          column1s.translateOnAxis(new THREE.Vector3(1,0,0),50*j);
          column2s.translateOnAxis(new THREE.Vector3(1,0,0),50*j);
          columnGroup.add(column1s,column2s);
        }
      }
    
    scene.add(grass);
    scene.add(roomGroup,columnGroup,treeGroup,warehouse);
    scene.remove(boxArr[clickNum-1],windowArr[clickNum-1],glassArr[clickNum-1]); 

  }
    function animation(){
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
  }

  function threeStart(){
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject(1);
    animation();
  }


  //绑定事件
//点击后退
 $("#back").click(function() {
    cameraStatus=0;
initCamera() 
    cleanObject();
    initObject(1);
   // $("#books").empty($(".book"));
    $(".book").remove()
    $(".read-state").remove()
    $("#back").hide();  
    $("#info-frame").hide();
    $("#books").hide();
    //$("#books").delegate(".book","mouseenter", function() {$(".button").hide();})
  });
//点击书单
  $("#list-frame").delegate("div","click", function() {
    var num1=parseInt(this.id.split("-")[0],10);
    var num2=parseInt(this.id.split("-")[1],10);;
    //console.log(num1,num2);
    myBookList[num1].push(bookList[num1][num2]) 
    console.log(myBookList);
    cleanObject();
    initObject(1);
/*    if(cameraStatus===1){var list=myBookList[clickNum-2];
      renderBook(list[list.length-1]);
    }*/
  });
  //悬停书本
  var hoverId;
    $("#books").delegate(".book","mouseenter", function() {
      var buttonLeft=this.id*shelfL*windowZoom;
      var buttonTop1=-shelfL*windowZoom*Math.floor(this.id/(shelfColN-1))
      var buttonTop2=-shelfL*windowZoom*Math.floor(this.id/(shelfColN-1))+shelfL*windowZoom/2
      var buttonHeight=shelfL*windowZoom/2;
      var buttonWidth=shelfL*windowZoom;
      
      hoverId=this.id;
      $(".button").show();
      $(".button").css({"left":buttonLeft,"width":buttonWidth,"height":buttonHeight,"font-size":buttonHeight*0.5})
      $("#read-button").css({"top":buttonTop1});
      $("#like-button").css({"top":buttonTop2});
      $("#info-frame").text(myBookList[clickNum-1][this.id].sub2)
      $("#info-frame").show();
      $("#info-frame").css({"height":height-150,"width":width/5,"top":50,"left":50});
  });
    //点击已读
    $("#read-button").click(function(){
      doneArr[clickNum-1].push(hoverId);
      showDone(hoverId)

    })
    $("#like-button").click(function(){
      //console.log("like-button");
    })

//点击楼层
  window.addEventListener("mousedown",onmousedown);
  function onmousedown(e){
    mouse.x = (e.clientX / width*2-1)/windowZoom;
    mouse.y = (-(e.clientY / height*2)+1)/windowZoom;
    //console.log(mouse.x,mouse.y)
    raycaster.setFromCamera(mouse,camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if(intersects.length){
      var selected = intersects[0];
      clickNum=Math.floor(selected.point.y/boxH);
      console.log(selected.point,clickNum);
      if(clickNum<1&&selected.point.x>-50&&selected.point.x<100){
        $("#list-frame").show()
        $("#list-frame").css({"height":height-300,"width":width/5,"top":50,"left":50});
        if(bookListAll.length===0){
          appendBookList();
          console.log("warehouse")
        }
        scene.add(boxArr[preClickNum-1],windowArr[preClickNum-1],glassArr[preClickNum-1]);
       }
      else if(clickNum>=1&&clickNum<6){
        //console.log("library");
        if(cameraStatus===0){
          cameraStatus=1;
          scene.remove(boxArr[clickNum-1],windowArr[clickNum-1],glassArr[clickNum-1]);
          scene.add(shelfGroup);
          shelfGroup.position.set(shelfL*shelfColN/2,clickNum*boxH+2+windowB/2,boxD/2-30);
          if(clickNum!==preClickNum){
            console.log("0d");
            scene.add(boxArr[preClickNum-1],windowArr[preClickNum-1],glassArr[preClickNum-1]);
          }
        }

        else if(cameraStatus===1){
          if(clickNum!==preClickNum){
            console.log("1d");
          scene.remove(boxArr[clickNum-1],windowArr[clickNum-1],glassArr[clickNum-1]);
          scene.add(shelfGroup);
          shelfGroup.position.set(shelfL*shelfColN/2,clickNum*boxH+2+windowB/2,boxD/2-30);
          scene.add(boxArr[preClickNum-1],windowArr[preClickNum-1],glassArr[preClickNum-1]);
          }
          else{//console.log("same",clickNum,preClickNum);
          console.log("1s");
          $("#back").show();
          $("#books").show();
          $("#list-frame").hide();
          cameraStatus=2;
          cleanObject();
          initObject(5.5,clickNum);

          camera.position.set(cameraP[0]-1.2*shelfL,cameraP[1]+(clickNum)*boxH-boxH/2,cameraP[2]);
          camera.lookAt(new THREE.Vector3(cameraL[0]-1.2*shelfL,cameraL[1]+(clickNum)*boxH-boxH/2,cameraL[2]));

          shelfGroup.position.set(shelfL*shelfColN/2,clickNum*boxH+shelfB*6,boxD/2-40);
          scene.add(shelfGroup);
          
          scene.remove(columnGroup);
          putBook(clickNum);
        }
        }
        else{}
      }
      else{console.log("nothing")}
      preClickNum=clickNum;
    }
  }
//悬停楼层
  window.addEventListener("mousemove",onmousemove);
  function onmousemove(e){
   mouse.x = (e.clientX / width*2-1)/windowZoom;
    mouse.y = (-(e.clientY / height*2)+1)/windowZoom;
    raycaster.setFromCamera(mouse,camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if ( intersects.length > 0 &&cameraStatus!==2) {
      if ( INTERSECTED != intersects[ 0 ].object ) {
        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        var selected = intersects[0];
        if(selected.point.z>112&&selected.point.z<126){
          hoverNum=Math.floor(selected.point.y/boxH);
          INTERSECTED = selected.object;
          if(hoverNum!==preHoverNum){
            //console.log("hoverdiff",hoverNum,preHoverNum)
            scene.add(textArr[hoverNum-1]);
            scene.remove(textArr[preHoverNum-1]);
            glassArr[hoverNum-1].material.emissive.setHex( 0xffff00 );
            glassArr[preHoverNum-1].material.emissive.setHex( 0x000000 );
          }
        }
        preHoverNum=hoverNum;
      }
    } 
    else {
      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      INTERSECTED = null;
    }
  }   
 window.onload = threeStart();
})
 
