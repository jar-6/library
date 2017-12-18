$(document).ready(function(){
    var scene;
     var light;
    var camera;
  var bookList=[];
  var cataNum=[245,247,248,257];
var bookListAll=[];
//取得书
function getBook(){
for(var i=0;i<4;i++){
  $.getJSON("http://apis.juhe.cn/goodbook/query?callback=?",{
            async:false,
            catalog_id:cataNum[i],
            rn:30,
            key:"d43d49f6b17a5b13abc49697214f62fb",
            format: 'jsonp',
            apikey:"hwE4tut1go0Fs9rMP7VFvfVqtKVXB6NLZCDqS7yeT3AyQvFK8zvcVVEOgObC0vaK",
            
          },function(json){
            json.result.data.forEach(function(val,index,arr){val.catalogId=i+"-"+index;})
            //json.result.data.catalogId=i;
            bookList.push(json.result.data);
console.log("get",bookList)

  })
}
if(i=2){

}
}
//排序方式
function sortReading(a,b){
  return  b.reading.slice(0,-5)-a.reading.slice(0,-5);
}

//集中

//排序书
var bookListAllT=["b1","b2"];
var historyCat=[];
var novelCat=[];
//var cat=["历史":[],"小说":[],"散文":[],"哲学":[]];
var myBookList=[[],[],[],[]]
var test="list"
/*for(var i=0;i<bookListAllT.length;i++){
var a="<div class='list' id="+bookListAllT[i]+">"+bookListAllT[0]+"</div>"
//var b='<label><input name="Fruit" type="checkbox" value="1" id="2" />苹果 </label>'

$("#list-frame").append(a);
}*/
//$("#list-frame").append(b);

//$('input:checkbox:checked').each(function (index, item) {cat="t"});


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
//console.log(book);
//var book='<label><input name="book" type="checkbox" value='+bookListAll[i].catlogId+' class="input" id='+i+' />'+bookListAll[i].title+'</label>'
$("#list-frame").append(book);
}
},3000);
}
/*function showBookList(){
var t=setTimeout(function(){

  for(var i=0;i<bookListAllT.length;i++){
var book="<div class='list' id="+bookListAllT[i]+">"+bookListAllT[i]+"</div>"
//var book='<label><input name="book" type="checkbox" value='+bookListAll[i].catlogId+' class="input" id='+i+' />'+bookListAll[i].title+'</label>'
$("#list-frame").append(book);
}
},3000);
}*/

//var bookListAll=[{title:"t1",author:"a1",catalog:"c1",tags:"t2"},{title:"t2",author:"a2",catalog:"c2",tags:"t2"},{title:"t3",author:"a3",catalog:"c3",tags:"t3"}];
$("#list-frame").delegate("div","click", function() {
  var num1=parseInt(this.id.split("-")[0],10);
  var num2=0;
  console.log(num1,num2);
myBookList[num1].push(bookList[num1][num2]) 
  console.log(myBookList);
 });



  var boxArr=[];var windowArr=[];var glassArr=[];var textArr=[];
//镜头
  var width = document.getElementById('canvas-frame').clientWidth
  var height = document.getElementById('canvas-frame').clientHeight
  var zoomN=6;
//形状值

  var boxH=50;
  var boxD=200;
  var windowD=25;
  var windowB=4;
  var boxL=[250,150,250,300];
  var undonePercent=[1,0.8,0.3,0.5,0.1,1];
  var bottonL=0;
  var topL=100;
  boxL.unshift(bottonL);
  boxL.push(topL);


  var radiumCol=3.5;
  var shelfH=12,shelfD=12,shelfL=12,shelfBorder=1,shelfRowN=3,shelfColN=7,bookH=8,bookD=2,bookL=5;
//材质值
  var boxColor=[0x0000ff,0x00ffff,0x00ff00,0xffff00,0x00ff00,0xffff00,0x0000ff];
  var whiteM = new THREE.MeshLambertMaterial({color:0xcccccc});
  var columnM = new THREE.MeshLambertMaterial({color:0xcccccc}); 
  var greenM = new THREE.MeshLambertMaterial({color:0x00ff00});
  var brownM = new THREE.MeshLambertMaterial({color:0x330000});
  //var glassM = new THREE.MeshLambertMaterial({color:0x444444});

var loader=new THREE.TextureLoader();
var grassMap = loader.load( './assets/img/grass.jpg', function ( grassMap ) {
    grassMap.wrapS = THREE.RepeatWrapping;
    grassMap.repeat.set(3, 1.5 );

} );
  var grassM = new THREE.MeshLambertMaterial({map:grassMap})
   var rooms=new THREE.Object3D();
  var trees = new THREE.Object3D();
  var columns = new THREE.Object3D();
  var shelf = new THREE.Object3D();
//tree组件
  var treeOrigin = new THREE.Object3D();
 

   //文字
 function putBook(bookY,num){

var book = new THREE.Mesh(new THREE.CubeGeometry(bookL,bookH,bookD),columnM);
book.position.set(20+shelfL/2,bookY+bookH/2-shelfH,boxD/2-30);
for(i=0;i<num;i++){
  var books=book.clone();
  var moveX=i%shelfColN*shelfL;
  var moveY=-(i-i%shelfColN)/shelfColN*shelfH;
  books.translateOnAxis(new THREE.Vector3(moveX,moveY,0),1)
  scene.add(books);
}
 
 }
  //鼠标事件
  var clickNum;
  var hoverNum;
  var preClickNum;
  var preHoverNum;
  var q=new THREE.Object3D();
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2(),INTERSECTED;
  //悬停
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

//点击
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
 // if(clickNum===0){clickNum=clickNum+1}
  if(clickNum<2){
    showBookList();
    console.log("2","warehouse",clickNum,preClickNum);
    scene.add(boxArr[preClickNum-2],windowArr[preClickNum-2],glassArr[preClickNum-2]);
   }
  else if(clickNum>=2){
    console.log("library");

    
    if(clickNum!==preClickNum){ 
      console.log("2","diff",clickNum,preClickNum);
          scene.remove(boxArr[clickNum-2],windowArr[clickNum-2],glassArr[clickNum-2]);
    shelf.position.set(shelfL*shelfColN/2+20,clickNum*boxH-boxH/2+2,boxD/2-30);
    scene.add(shelf);
      scene.add(boxArr[preClickNum-2],windowArr[preClickNum-2],glassArr[preClickNum-2]);
    }
    else{
      console.log("2","same",clickNum,preClickNum);
      camera.position.set(220+width/3,220-boxH*(6-clickNum),600);
      renderer.setSize(width*zoomN, height*zoomN);
      requestAnimationFrame(animation);
      renderer.render(scene, camera);
      document.getElementById('canvas-frame').appendChild(renderer.domElement);
      scene.remove(columns);
      putBook(clickNum*boxH+2,13);
    }
  }
  else{console.log("nothing")}
  preClickNum=clickNum;
}
}


 window.onload = threeStart();
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
        /*camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);*/
        camera = new THREE.OrthographicCamera(width / - 2+100, width / 2,height / 2, height / - 2, 100, 1200 );
        camera.position.set(250,300,600);
        camera.up.x = 0;
        camera.up.y = 0;
        camera.up.z = 0;
        camera.lookAt({
            x : -200,
            y : -100,
            z : 0
        });
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
  var treeRoot = new THREE.Mesh(new THREE.CylinderGeometry(2,2,10),columnM);
  treeOrigin.add(treeLeave,treeRoot)
 //书架

for(i=0;i<shelfRowN;i++){
  var boardRow=new THREE.Mesh(new THREE.CubeGeometry(shelfL*shelfColN,shelfBorder,shelfD),brownM);
  var boardRows=boardRow.clone();
  boardRows.translateOnAxis(new THREE.Vector3(0,1,0),shelfH*i)
  shelf.add(boardRows);
}
for(i=0;i<shelfColN+1;i++){
  var boardCol=new THREE.Mesh(new THREE.CubeGeometry(shelfBorder,shelfH*(shelfRowN-1),shelfD),brownM);
  boardCol.position.set(-shelfL*shelfColN/2,shelfH*(shelfRowN-1)/2,0)
  var boardCols=boardCol.clone();
  boardCols.translateOnAxis(new THREE.Vector3(1,0,0),shelfL*i)
  shelf.add(boardCols);
}


var warehouse = new THREE.Mesh( new THREE.CylinderGeometry(boxD/2-20,boxD/2-20,boxH),new THREE.MeshLambertMaterial({map:loader.load( "./assets/img/1f.jpg", function ( glassMap ) {
        glassMap.wrapS = THREE.RepeatWrapping;
        glassMap.repeat.set(5, 0.5);
        }
      )}));
warehouse.position.set(boxD/2-10,50,5-boxD/2);
scene.add(warehouse);
//boxArr.push(warehouse);
//生成2~6层
    for(var i=1;i<boxL.length;i++){

    var boxMap;var glassMap;
    (function(num){
boxMap = loader.load( "./assets/img/"+parseInt(num+1)+"f.jpg", function ( boxMap ) {
        boxMap.wrapS = THREE.RepeatWrapping;
        boxMap.repeat.set(boxL[num]/100, 0.5);
        }
      );
glassMap = loader.load( "./assets/img/glass.jpg", function ( glassMap ) {
        glassMap.wrapS = THREE.RepeatWrapping;
        glassMap.repeat.set((1-undonePercent[num])*boxL[num]/30, 0.1);
        }
      );
    })(i);
      
      var box = new THREE.Mesh( new THREE.CubeGeometry(boxL[i],boxH,boxD),new THREE.MeshLambertMaterial({map:boxMap}));
      box.position.set(boxL[i]/2,boxH*(i+1),0);
      scene.add(box);
      boxArr.push(box);
      var floor1 = new THREE.Mesh(new THREE.CubeGeometry(boxL[i],windowB,boxD+20),whiteM);
      floor1.position.set(boxL[i]/2,boxH*(i+1)-boxH/2,0);
      var floor2=floor1.clone();
      floor2.translateOnAxis(new THREE.Vector3(0,1,0),boxH);
      var wall1= new THREE.Mesh( new THREE.CubeGeometry(2,boxH,boxD), new THREE.MeshLambertMaterial({map:boxMap}));
      wall1.position.set(0,boxH*(i+1),0)
      var wall2=wall1.clone();
      wall2.translateOnAxis(new THREE.Vector3(1,0,0),boxL[i]);
      rooms.add(floor1,floor2,wall1,wall2)
    
//生成窗户
      var leftL=undonePercent[i]*boxL[i];
      var rightL=(1-undonePercent[i])*boxL[i];
      var doneWindow = new THREE.Object3D();
      if(i>0&&i<boxL.length-1){

        var window1 = new THREE.Mesh( new THREE.CubeGeometry(rightL,windowB,windowD),whiteM);
        window1.position.set(rightL/2+leftL,boxH*(i+1)-boxH/2+windowB/2,(boxD+windowD)/2);
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

        ( function (position,text,shape){
    new THREE.FontLoader().load('./assets/fonts/optimer_bold.typeface.json',function(font){
    var textGeo=new THREE.TextGeometry(text,{font:font,size:shape[0],height:shape[1]});
    textGeo.computeBoundingBox();
    var text3D = new THREE.Mesh(textGeo,whiteM);
    text3D.position.set(position[0],position[1],position[2]);
    textArr.push(text3D);
  })
})([leftL+rightL/2-30,boxH*(i+1)-10,(boxD+2*windowD)/2], Math.floor((1-undonePercent[i])*100)+"%",[20,0.5]);
        
      }
//生成树
      if(boxL[i]>boxL[i+1]){
        var tree=treeOrigin.clone();
        tree.position.set(boxL[i]-30,boxH*(i+1)+boxH/2+10,0);
        trees.add(tree);
      }
//生成柱子
      var column = new THREE.Object3D();
      var column1 = new THREE.Mesh( new THREE.CylinderGeometry(radiumCol,radiumCol,boxH*i),columnM);
      var column2=column1.clone();
      column1.position.set(0,boxH*(i+1)/2,-boxD/2+radiumCol*2);
      column2.position.set(0,boxH*(i+1)/2,boxD/2-radiumCol*2);
   

      //return Math.max.apply(Math,boxL);
      if(i>0){
        for(j=0;j*50-50<Math.max.apply(Math,boxL)+bottonL/2;j++){   
          var column1s=column1.clone();
          var column2s=column2.clone();
          column1s.translateOnAxis(new THREE.Vector3(1,0,0),50*j);
          column2s.translateOnAxis(new THREE.Vector3(1,0,0),50*j);
          columns.add(column1s,column2s);
        }
      }

      var grass= new THREE.Mesh( new THREE.CubeGeometry(400,2,500),grassM);
      grass.position.set(100,0,0);
     scene.add(grass);
scene.add(rooms,trees,columns);

    }

  }


    function threeStart() {
        initThree();
        initCamera();
        initScene();
        initLight();
        initObject();
        animation();

    }
    function animation()
    {
        renderer.render(scene, camera);
        requestAnimationFrame(animation);
    }
    
 

})
 
/*canvas.addEventListener('mousewheel', mousewheel, false);
function mousewheel(e) {
            e.preventDefault();
            //e.stopPropagation();
            if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                if (e.wheelDelta > 0) { //当滑轮向上滚动时
                    fov -= (near < fov ? 1 : 0);
                }
                if (e.wheelDelta < 0) { //当滑轮向下滚动时
                    fov += (fov < far ? 1 : 0);
                }
            } else if (e.detail) {  //Firefox滑轮事件
                if (e.detail > 0) { //当滑轮向上滚动时
                    fov -= 1;
                }
                if (e.detail < 0) { //当滑轮向下滚动时
                    fov += 1;
                }
            }
            camera.fov = fov;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
          updateinfo();
        }*/
/*  $.get("http://apis.juhe.cn/goodbook/catalog?key=d43d49f6b17a5b13abc49697214f62fb&dtype=json&callback=?",function(json){
  alert(json)}
  )*/

/*$.ajax({
   async:false,
   //url: "http://apis.juhe.cn/goodbook/catalog?key=d43d49f6b17a5b13abc49697214f62fb&catalog_id=246&rn=10&rn=10&callback=?",
   url: "http://apis.juhe.cn/goodbook/query?key=d43d49f6b17a5b13abc49697214f62fb&catalog_id=246&rn=10&rn=10&callback=?",
   type: "GET",
   dataType: 'jsonp',
   jsonp: 'jsoncallback',
   
   timeout: 5000,

   success:function(json){
  console.log(json);
}
})*/
/*$.getJSON("https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?callback=?",{
            is_xml: 0,
            format: 'jsonp',
            key: "q",
          }, function(json){
  alert(json);
});*/

/*   $.getJSON({
"http://api.zhuishushenqi.com/ranking/gender",
function(res){console.log( res)}
  })*/
  /*console.log( $http.jsonp(api + APPKey ));*/
/*  $.get("https://way.jd.com/JDCloud/basebook?sku_id=11932116&appkey=729e7d614b5c77377c30ac5fdf550eab", function(result){
    console.log(result);
  });*/

 /*  $.get("http://120.76.205.241:8000/comment/baiduread?id=1cacfea9360cba1aa911da5f&apikey=hwE4tut1go0Fs9rMP7VFvfVqtKVXB6NLZCDqS7yeT3AyQvFK8zvcVVEOgObC0vaK?callback=?",function(json){
  alert(json)}
  )*/
/*  $.ajax({
   async:false,
   url: "http://apis.juhe.cn/goodbook/catalog?key=d43d49f6b17a5b13abc49697214f62fb&catalog_id="+246+"&rn="+10+"&rn=10&callback=?",
 url: "http://apis.juhe.cn/goodbook/catalog?key=d43d49f6b17a5b13abc49697214f62fb&dtype=json&callback=?",
  //url:"http://120.76.205.241:8000/comment/baiduread?id=1cacfea9360cba1aa911da5f&apikey=hwE4tut1go0Fs9rMP7VFvfVqtKVXB6NLZCDqS7yeT3AyQvFK8zvcVVEOgObC0vaK",
  //url:"http://120.76.205.241:8000/comment/baiduread?id=1cacfea9360cba1aa911da5f&apikey=hwE4tut1go0Fs9rMP7VFvfVqtKVXB6NLZCDqS7yeT3AyQvFK8zvcVVEOgObC0vaK&callback=?"
   type: "GET",
   dataType: 'jsonp',
   jsonp: 'jsoncallback',
   timeout: 5000,
   success:function(json){
  console.log(json);
}
})*/
/* $.getJSON({"http://apis.juhe.cn/goodbook/catalog?key=d43d49f6b17a5b13abc49697214f62fb&dtype=json&callback=?",function(res){console.log( res)}
  })*/
  //bookList
/*    $.ajax({
   async:false,
// url: "http://apis.juhe.cn/goodbook/catalog?key=d43d49f6b17a5b13abc49697214f62fb&catalog_id=246&rn=10&rn=10&callback=?",
  url:"http://120.76.205.241:8000/book/easyread163?kw=d&apikey=hwE4tut1go0Fs9rMP7VFvfVqtKVXB6NLZCDqS7yeT3AyQvFK8zvcVVEOgObC0vaK",
  //url:"http://120.76.205.241:8000/comment/baiduread?id=1cacfea9360cba1aa911da5f&apikey=hwE4tut1go0Fs9rMP7VFvfVqtKVXB6NLZCDqS7yeT3AyQvFK8zvcVVEOgObC0vaK&callback=?"
   type: "GET",
   dataType: 'jsonp',
  jsonp: 'callback',
   timeout: 5000,
   success:function(json){
  console.log(json);
}
})
*/
/*$.jsonp({  
   url:'http://120.76.205.241:8000/book/easyread163?kw=d&apikey=hwE4tut1go0Fs9rMP7VFvfVqtKVXB6NLZCDqS7yeT3AyQvFK8zvcVVEOgObC0vaK',  
   callbackParameter:"callback",  
   timeout:3000,  
   data:{rel:13}, 
 dataFilter:function(json){  
console.log("1",json)
},  
   success:function(json,textStatus,xOptions){  
       console.log("jsonp.success:");  
   },  
   //error:function(xOptions,textStatus){  console.log("jsonp.error:"+textStatus+", rel="+xOptions.data.rel);   }  
}); */



  /*$.getJSON("http://120.76.205.241/book/easyread163&callback=?",{
            
            format: 'jsonp',
            key: "q",
            apikey:"hwE4tut1go0Fs9rMP7VFvfVqtKVXB6NLZCDqS7yeT3AyQvFK8zvcVVEOgObC0vaK"
          },function(json){
  alert(json)})*/

/*$.getJSON("https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?callback=?",function(json){
  alert(json);
});*/
/*$.ajax({
   async:false,
   //url: "http://apis.juhe.cn/goodbook/catalog?key=d43d49f6b17a5b13abc49697214f62fb&catalog_id=246&rn=10&rn=10&callback=?",
  // url: "http://apis.juhe.cn/goodbook/query?key=d43d49f6b17a5b13abc49697214f62fb&catalog_id=246&rn=10&rn=50&callback=?",
  //url:"http://120.76.205.241/book/easyread163?kw=d&apikey=hwE4tut1go0Fs9rMP7VFvfVqtKVXB6NLZCDqS7yeT3AyQvFK8zvcVVEOgObC0vaK&callback=?"
 // url: "http://apis.juhe.cn/goodbook/catalog?key=d43d49f6b17a5b13abc49697214f62fb&catalog_id=246&rn=10&rn=10&callback=?",
  
  url:"http://120.76.205.241:8000/comment/baiduread?id=1cacfea9360cba1aa911da5f&apikey=hwE4tut1go0Fs9rMP7VFvfVqtKVXB6NLZCDqS7yeT3AyQvFK8zvcVVEOgObC0vaK&callback=?"
   //type: "GET",
   //dataType: 'jsonp',
   //jsonp: 'jsoncallback',
   
   timeout: 5000,

   success:function(json){
  console.log(json);
}
})*/
/*    $.ajax({
        type:'get',
        url:"http://api.yi18.net/book/list?id=1",//这里是url
        success:function(body,heads,status){
            console.log(body);  //body就是内容了
        }});*/
   /*     function onmousemove(e){
    mouse.x = e.clientX / renderer.domElement.clientWidth*2-1;
    mouse.y = -(e.clientY / renderer.domElement.clientHeight*2)+1;
    raycaster.setFromCamera(mouse,camera);
    var intersects = raycaster.intersectObjects(scene.children);

    if ( intersects.length > 0 ) {
      
      
        //if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        var selected = intersects[0];
        hoverNum=Math.round(selected.point.y/50-1);
        console.log(hoverNum,preHoverNum);
        if(selected.point.z>112&&selected.point.z<126&&hoverNum>-1){
console.log("666");
          
          INTERSECTED = selected.object;
          INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
          //INTERSECTED.material.emissive.setHex( 0xffff00 );
          if(hoverNum!==preHoverNum){
            scene.add(textArr[hoverNum-1]);
            scene.remove(textArr[preHoverNum-1]);
            glassArr[hoverNum-1].material.emissive.setHex( 0xffff00 );
            glassArr[preHoverNum-1].material.emissive.setHex( INTERSECTED.currentHex );
          }
          
        }
          preHoverNum=hoverNum;
      

    } 
    else {
      //if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      INTERSECTED = null;
    }
  }  */