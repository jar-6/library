$(document).ready(function(){
//基本预设

  var scene;
  var light;
  var camera;
//书单预设
  var bookList=[];
  var bookListAll=[];
  var cataNum=[245,247,248,257];
  //var bookListAllT=["b1","b2"];
  var myBookList=[[],[],[],[]];
  var cameraStatus=0;
//鼠标预设
  var clickNum;
  var hoverNum;
  var preClickNum;
  var preHoverNum;
  var q=new THREE.Object3D();
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2(),INTERSECTED;
//镜头值预设  
  var width = document.getElementById('canvas-frame').clientWidth
  var height = document.getElementById('canvas-frame').clientHeight
  var zoomN=6;
//数列预设
  var boxArr=[];var windowArr=[];var glassArr=[];var textArr=[];
  var bookArr=[];
//组件预设
  var roomGroup=new THREE.Object3D();
  var treeGroup = new THREE.Object3D();
  var columnGroup = new THREE.Object3D();
  var shelfGroup = new THREE.Object3D();
  var bookGroup = new THREE.Object3D();
//形状值预设
  var boxH=50;
  var boxD=200;
  var windowD=25;
  var windowB=4;
  var boxL=[100,100,100,100];
  var undonePercent=[1,0.5,1,1,1];
  var bottonL=0;
  var topL=100;
  boxL.unshift(bottonL);
  boxL.push(topL);
  var radiumCol=3.5;
  var shelfH=12,shelfD=12,shelfL=12,shelfBorder=1,shelfRowN=3,shelfColN=7,bookH=8,bookD=2,bookL=5;
//材质值预设 
  var boxColor=[0x0000ff,0x00ffff,0x00ff00,0xffff00,0x00ff00,0xffff00,0x0000ff];
  var whiteM = new THREE.MeshLambertMaterial({color:0xcccccc});
  var columnM = new THREE.MeshLambertMaterial({color:0xcccccc}); 
  var greenM = new THREE.MeshLambertMaterial({color:0x00ff00});
  var brownM = new THREE.MeshLambertMaterial({color:0x330000});
  var loader=new THREE.TextureLoader();
  var grassMap = loader.load( './assets/img/grass.jpg', function ( grassMap ) {
    grassMap.wrapS = THREE.RepeatWrapping;
    grassMap.repeat.set(3, 1.5 );
  });
  var grassM = new THREE.MeshLambertMaterial({map:grassMap})
 function renderBook(value,index,arr){
  if(value!==undefined){
  var src=value.img;
  $("#books").append("<div class='book'><img class='book-img' src='"+src+"'/></div>")
  }
  }
//绑定事件
//点击后退
 $("#back").click(function() {
    camera.position.set(250,300,600);
    renderer.setSize(width, height);
    renderer.render(scene, camera);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    scene.add(columnGroup);
    $("#back").hide();
    scene.remove(bookGroup);  
    $("#books").empty(); 
  });
//点击书单
  $("#list-frame").delegate("div","click", function() {
    var num1=parseInt(this.id.split("-")[0],10);
    var num2=parseInt(this.id.split("-")[1],10);;
    console.log(num1,num2);
    myBookList[num1].push(bookList[num1][num2]) 
    console.log(myBookList);
    boxL[num1+1]+=25;
    boxArr.forEach(function(value){scene.remove(value)})
    glassArr.forEach(function(value){scene.remove(value)})
    windowArr.forEach(function(value){scene.remove(value)})
 
    scene.remove(roomGroup,columnGroup);
    roomGroup=new THREE.Object3D();
    boxArr=[];windowArr=[];glassArr=[];textArr=[];
    bookArr=[];
    initObject();

/*    if(cameraStatus===1){var list=myBookList[clickNum-2];
      renderBook(list[list.length-1]);
    }*/
  });
//点击楼层

  window.addEventListener("mousedown",onmousedown);
  function onmousedown(e){

    mouse.x = e.clientX / renderer.domElement.clientWidth*2-1;
    mouse.y = -(e.clientY / renderer.domElement.clientHeight*2)+1;
    raycaster.setFromCamera(mouse,camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if(intersects.length){
      var selected = intersects[0];
      if(selected.point.y<75){clickNum=Math.ceil(selected.point.y/50);}
      else{clickNum=Math.round(selected.point.y/50);}
      console.log(selected.point,clickNum);
      if(clickNum<2){
        showBookList();
        console.log("warehouse",clickNum,preClickNum);
        scene.add(boxArr[preClickNum-2],windowArr[preClickNum-2],glassArr[preClickNum-2]);
       }
      else if(clickNum>=2){
        console.log("library");
        if(clickNum!==preClickNum){ 
          console.log("diff",clickNum,preClickNum);
          scene.remove(boxArr[clickNum-2],windowArr[clickNum-2],glassArr[clickNum-2]);
          shelfGroup.position.set(shelfL*shelfColN/2,clickNum*boxH-boxH/2+2+windowB/2,boxD/2-30);
          scene.add(shelfGroup);
          scene.add(boxArr[preClickNum-2],windowArr[preClickNum-2],glassArr[preClickNum-2]);
        }

        else{
          console.log("same",clickNum,preClickNum);
          
          cameraStatus=1;
          //camera = new THREE.OrthographicCamera(width / - 2+60*n, width / 2+60*n,height / 2-100, height / - 2-100, 100, 1200 );
          camera.position.set(573,220-boxH*(6-clickNum)-boxH/2,600);
          camera.up.set(0,0,0);
          //camera.lookAt(new THREE.Vector3(100,0,0));
         // camera.position.set(250,220-boxH*(6-clickNum),600);
          renderer.setSize(width*zoomN, height*zoomN);
          requestAnimationFrame(animation);
          renderer.render(scene, camera);
          document.getElementById('canvas-frame').appendChild(renderer.domElement);
          scene.remove(columnGroup);
          putBook(clickNum);
          $("#back").show();
        }
      }
      else{console.log("nothing")}
      preClickNum=clickNum;
    }
  }
//悬停楼层
  window.addEventListener("mousemove",onmousemove);
  function onmousemove(e){
    mouse.x = e.clientX / renderer.domElement.clientWidth*2-1;
    mouse.y = -(e.clientY / renderer.domElement.clientHeight*2)+1;
    raycaster.setFromCamera(mouse,camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if ( intersects.length > 0 ) {
      if ( INTERSECTED != intersects[ 0 ].object ) {
        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        var selected = intersects[0];
        if(selected.point.z>112&&selected.point.z<126){
          hoverNum=Math.round(selected.point.y/50-1);
          INTERSECTED = selected.object;
          INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
          //INTERSECTED.material.emissive.setHex( 0xffff00 );
          if(hoverNum!==preHoverNum){
            scene.add(textArr[hoverNum-1]);
            scene.remove(textArr[preHoverNum-1]);
            glassArr[hoverNum-1].material.emissive.setHex( 0xffff00 );
          }
          preHoverNum=hoverNum;
        }
      }
    } 
    else {
      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      INTERSECTED = null;
    }
  }
 
//function     
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
          console.log("get",bookList)
      })
    }
  }
//排序方式
  function sortReading(a,b){
    return  b.reading.slice(0,-5)-a.reading.slice(0,-5);
  }
//显示书单
  function showBookList(){
    getBook();
    var t=setTimeout(function(){
      for(var i=0;i<bookList.length;i++){
        var bookListAll2=bookListAll.concat(bookList[i])
        bookListAll=bookListAll2;
        console.log("add2",bookListAll);
      }
      bookListAll.sort(sortReading);
      console.log("fanal",bookListAll);
      for(var i=0;i<bookListAll.length;i++){
        var book="<div class='list' id="+bookListAll[i].catalogId+">"+bookListAll[i].title+"</div>"
        $("#list-frame").append(book);
      }
    },3000);
  }

  function putBook(clickNum){
    var list=myBookList[clickNum-2];
    var frameWidth=shelfL*(shelfColN-1)*zoomN*1.05;
    var frameHeight=shelfH*(shelfRowN-1)*zoomN*1.05;
    $("#books").css("width",frameWidth);
    $("#books").css("height",frameHeight);
    $("#books").css("left",230);
    $("#books").css("top",245);
    var list=myBookList[clickNum-2]
    //var list=[1,2,3,3,3,3,3];
list.forEach(renderBook)
  }
 
  function initThree() {
    renderer = new THREE.WebGLRenderer({
      antialias : true
    });
    renderer.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0x333333, 1.0);
    renderer.shadowMap.enabled = true // 设置是否开启投影, 开启的话, 光照会产生投影
    renderer.shadowMap.type = THREE.PCFSoftShadowMap  
  }
  function initCamera() {
    camera = new THREE.OrthographicCamera(width / - 2, width / 2,height / 2, height / - 2, 0, 1200 );
    camera.position.set(200,300,600);
    camera.up.set(0,0,0);
    camera.lookAt(new THREE.Vector3(-200,0,0));
  }
  function initScene() {
    scene = new THREE.Scene();
  }
  function initLight() {
    var directionalLight = new THREE.DirectionalLight( 0xffffff , 1.1); 
    directionalLight.position.set( 300, 1000, 500 );
    directionalLight.target.position.set( 0, 0, 0 );
    directionalLight.castShadow = true; 
    var d = 300;
    directionalLight.shadow.camera = new THREE.OrthographicCamera( -d, d, d, -d,  500, 1600 ); 
    directionalLight.shadow.bias = 0.0001;
    directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024; 
    scene.add(directionalLight)
    var light = new THREE.AmbientLight( 0xffccdd, 0.35 ) 
    scene.add( light )
  }
  function initObject(){
    var treeLeave = new THREE.Mesh(new THREE.CylinderGeometry(0,10,10),greenM);
    treeLeave.translateOnAxis(new THREE.Vector3(0,1,0),10)
    var treeRoot = new THREE.Mesh(new THREE.CylinderGeometry(2,2,10),brownM);
    treeGroup.add(treeLeave,treeRoot)    
    //草
    var grass= new THREE.Mesh(new THREE.CubeGeometry(800,2,500),grassM);
    grass.position.set(0,0,0);
   //书架
    for(i=0;i<shelfRowN;i++){
      var boardRow=new THREE.Mesh(new THREE.CubeGeometry(shelfL*(shelfColN-1)+1,shelfBorder,shelfD),brownM);
      var boardRows=boardRow.clone();
      boardRows.translateOnAxis(new THREE.Vector3(0,1,0),shelfH*i)
      shelfGroup.add(boardRows);
    }
    for(i=0;i<shelfColN;i++){
      var boardCol=new THREE.Mesh(new THREE.CubeGeometry(shelfBorder,shelfH*(shelfRowN-1),shelfD),brownM);
      boardCol.position.set(-shelfL*shelfColN/2+shelfL/2,shelfH*(shelfRowN-1)/2,0)
      var boardCols=boardCol.clone();
      boardCols.translateOnAxis(new THREE.Vector3(1,0,0),shelfL*i)
      shelfGroup.add(boardCols);
    }
    //书库
    var warehouse = new THREE.Mesh(new THREE.CylinderGeometry(boxD/2-20,boxD/2-20,boxH),new THREE.MeshLambertMaterial({
      map:loader.load( "./assets/img/1f.jpg", function ( glassMap ) {
        glassMap.wrapS = THREE.RepeatWrapping;
        glassMap.repeat.set(5, 0.5);
      }
    )}));
    warehouse.position.set(boxD/2-10,50,10);
    var warehouseFloor = new THREE.Mesh(new THREE.CubeGeometry(boxD,windowB,boxD),whiteM);
    warehouseFloor.position.set(boxD/2,1.5*boxH,0);
    scene.add(warehouse);
    //2~6层
    for(var i=1;i<boxL.length;i++){
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
      var box = new THREE.Mesh( new THREE.CubeGeometry(boxL[i],boxH,boxD),new THREE.MeshLambertMaterial({map:boxMap}));
      box.position.set(boxL[i]/2,boxH*(i+1),0);
      scene.add(box);
      boxArr.push(box);
      var floor1 = new THREE.Mesh(new THREE.CubeGeometry(boxL[i],windowB,boxD+20),whiteM);
      floor1.position.set(boxL[i]/2,boxH*(i+1)-boxH/2+windowB/2,0);
      var floor2=floor1.clone();
      floor2.translateOnAxis(new THREE.Vector3(0,1,0),boxH);
      var wall1= new THREE.Mesh( new THREE.CubeGeometry(2,boxH,boxD), new THREE.MeshLambertMaterial({map:boxMap}));
      wall1.position.set(1,boxH*(i+1),0)
      var wall2=wall1.clone();
      wall2.translateOnAxis(new THREE.Vector3(1,0,0),boxL[i]-2);
      roomGroup.add(floor1,floor2,wall1,wall2)

      //窗户
      var leftL=undonePercent[i]*boxL[i];
      var rightL=(1-undonePercent[i])*boxL[i];
      var doneWindow = new THREE.Object3D();
      if(i>0&&i<boxL.length-1&&undonePercent[i]<1){
        var window1 = new THREE.Mesh( new THREE.CubeGeometry(rightL,windowB,windowD),whiteM);
        window1.position.set(rightL/2+leftL,boxH*(i+1)-boxH/2+windowB,(boxD+windowD)/2);
        var window2=window1.clone();
        window2.translateOnAxis(new THREE.Vector3(0,1,0),boxH-windowB/2);
        var window3 = new THREE.Mesh(new THREE.CubeGeometry(windowB,boxH,windowD),whiteM);
        window3.position.set(leftL+windowB/2,boxH*(i+1),(boxD+windowD)/2)
        var window4=window3.clone();
        window4.translateOnAxis(new THREE.Vector3(1,0,0),rightL-windowB);
        var glass = new THREE.Mesh(  new THREE.CubeGeometry(rightL,boxH-2*windowB),new THREE.MeshLambertMaterial({map:glassMap}));
        glass.position.set(leftL+rightL/2,boxH*(i+1),(boxD+windowD)/2);
        doneWindow.add(window1,window2,window3,window4);
        scene.add(doneWindow);
        scene.add(glass);
        windowArr.push(doneWindow);
        glassArr.push(glass);
        //文字
        (function (position,text,shape){
          new THREE.FontLoader().load('./assets/fonts/optimer_bold.typeface.json',function(font){
            var textGeo=new THREE.TextGeometry(text,{font:font,size:shape[0],height:shape[1]});
            textGeo.computeBoundingBox();
            var text3D = new THREE.Mesh(textGeo,whiteM);
            text3D.position.set(position[0],position[1],position[2]);
            textArr.push(text3D);
          })
        })([leftL+rightL/2-30,boxH*(i+1)-10,(boxD+2*windowD)/2], Math.floor((1-undonePercent[i])*100)+"%",[20,0.5]); 
      }
      //树
      if(boxL[i]>boxL[i+1]){
        var tree=treeGroup.clone();
        tree.position.set(boxL[i]-30,boxH*(i+1)+boxH/2+10,0);
        scene.add(tree);
      }
      //柱子
      var column = new THREE.Object3D();
      var column1 = new THREE.Mesh( new THREE.CylinderGeometry(radiumCol,radiumCol,boxH*i),columnM);
      var column2=column1.clone();
      var column1b=column1.clone();
      var column2b=column2.clone();
      var arr=boxL.slice(i,boxL.length);
      column1.position.set(-2*radiumCol,boxH*(i+1)/2,-boxD/2+radiumCol*2);
      column2.position.set(-2*radiumCol,boxH*(i+1)/2,boxD/2-radiumCol*2);
      column1b.position.set(0,boxH*(i+1)/2,-boxD/2+radiumCol*2);
      column2b.position.set(0,boxH*(i+1)/2,boxD/2-radiumCol*2);
      columnGroup.add(column1b,column2b);
      if(i>0){
        for(j=1;j*50<=Math.max.apply(Math,arr)+bottonL/2;j++){   

          var column1s=column1.clone();
          var column2s=column2.clone();
          column1s.translateOnAxis(new THREE.Vector3(1,0,0),50*j);
          column2s.translateOnAxis(new THREE.Vector3(1,0,0),50*j);
          columnGroup.add(column1s,column2s);
        }
      }
    }
    scene.add(grass);
    scene.add(roomGroup,columnGroup);    
  }

  function threeStart(){
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    animation();
  }
  function animation(){
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
  }   
 window.onload = threeStart();
})
 
