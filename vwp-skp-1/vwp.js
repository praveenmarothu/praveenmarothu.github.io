var fw={Component:class{constructor(pelement){this.pelement=pelement,this.element=document.createElement("div"),this.element.style.position="relative",this.element.style.zIndex=9e3,this.element.className="vwp-component",this.pelement.appendChild(this.element),this.init()}init(){}},Container:class{constructor(parent,cname=null,html=null){this.parent=parent,this.element=document.createElement("div"),this.element.style.position="relative",this.element.className="vwp-container",null!=html&&(this.element.innerHTML=html),null!=cname&&this.addClass(cname),this.parent.element.appendChild(this.element),this.setSize(300,300),this.setzIndex(9e3),this.init()}init(){}addClass(cname){this.element.className+=" "+cname}removeClass(cname){re=new RegExp(" "+cname,"gi"),this.element.className=this.element.className.replace(re,"")}setSize(width,height){this.element.style.height="string"==typeof height?height:height+"px",this.element.style.width="string"==typeof width?width:width+"px"}setzIndex(zindex){this.element.style.zIndex=zindex}},Element:class{constructor(parent,cname=null,html=null){this.dragOffsetX=0,this.dragOffsetY=0,this.dragX1=0,this.dragY1=0,this.dragX2=0,this.dragY2=0,this.drag=null,this.dragStart=null,this.dragStop=null,this.parent=parent,this.element=document.createElement("div"),this.element.style.position="absolute",this.element.className="vwp-element",null!=html&&(this.element.innerHTML=html),null!=cname&&this.addClass(cname),this.parent.element.appendChild(this.element),this.setSize(300,300),this.setzIndex(9001),this.init()}init(){}addClass(cname){this.element.className+=" "+cname}removeClass(cname){re=new RegExp(" "+cname,"gi"),this.element.className=this.element.className.replace(re,"")}setPositionLeft(left){this.element.style.left=left+"px"}setPositionTop(top){this.element.style.top=top+"px"}setPosition(left,top){this.element.style.left=left+"px",this.element.style.top=top+"px"}setSize(width,height){this.element.style.height="string"==typeof height?height:height+"px",this.element.style.width="string"==typeof width?width:width+"px"}setzIndex(zindex){this.element.style.zIndex=zindex}onDragStart(){}onDrag(left,top){}onDragStop(){}makeDraggable(){var isTouchDevice="ontouchstart"in document.documentElement;this.dragStart=evt=>{evt.preventDefault(),isTouchDevice&&(evt=evt.targetTouches[0]),this.dragOffsetX=evt.pageX-this.element.offsetLeft,this.dragOffsetY=evt.pageY-this.element.offsetTop,isTouchDevice?(document.addEventListener("touchmove",this.drag),document.addEventListener("touchend",this.dragStop)):(document.addEventListener("mousemove",this.drag),document.addEventListener("mouseup",this.dragStop)),this.onDragStart()},this.drag=evt=>{evt.preventDefault(),isTouchDevice&&(evt=evt.targetTouches[0]);var left=evt.pageX-this.dragOffsetX,top=evt.pageY-this.dragOffsetY;left>this.dragX2&&(left=this.dragX2),top>this.dragY2&&(top=this.dragY2),left<this.dragX1&&(left=this.dragX1),top<this.dragY1&&(top=this.dragY1),this.setPosition(left,top),this.onDrag(left,top)},this.dragStop=evt=>{evt.preventDefault(),isTouchDevice?(document.removeEventListener("touchmove",this.drag),document.removeEventListener("touchend",this.dragStop)):(document.removeEventListener("mousemove",this.drag),document.removeEventListener("mouseup",this.dragStop)),this.onDragStop()},this.dragStart=this.dragStart.bind(this),this.drag=this.drag.bind(this),this.dragStop=this.dragStop.bind(this),isTouchDevice?this.element.addEventListener("touchstart",this.dragStart):this.element.addEventListener("mousedown",this.dragStart),this.dragX1=0,this.dragY1=0,this.dragX2=this.parent.element.offsetWidth-this.element.offsetWidth,this.dragY2=this.parent.element.offsetHeight-this.element.offsetHeight}setDraggableArea(x1,y1,x2,y2){this.dragX1=x1,this.dragY1=y1,this.dragX2=x2,this.dragY2=y2}}},vwp={};vwp.Component=class extends fw.Component{init(){var pc=new fw.Container(this,"vwp-pricing-container");pc.setSize(350,480),this.initPricingLabels(pc),this.initMarkers(pc)}initPricingLabels(pc){var scl=new fw.Element(pc,"vwp-price-scale");scl.setPosition(225,40),scl.setSize(7,400);for(var i=0;i<=40;i++){var tck=new fw.Element(pc,"vwp-price-tick");if(tck.setPosition(225,40+10*i),i%5==0){tck.setSize(15,1);var lbl=new fw.Element(pc,"vwp-price-label","$"+250*i);lbl.setPosition(240,40+10*i-10),lbl.setSize(50,20)}else tck.setSize(10,1)}}initMarkers(pc){var m1=new fw.Element(pc,"vwp-marker vwp-acceptable-marker","Acceptable<span style='position:absolute;top:-3px;right:-15px;border-left-color:#81ecec' class='arrow-left'></span>"),m2=new fw.Element(pc,"vwp-marker vwp-expensive-marker","Expensive<span style='position:absolute;top:-3px;right:-15px;border-left-color:#ffeaa7' class='arrow-left'></span>"),m3=new fw.Element(pc,"vwp-marker vwp-tooexpensive-marker","Too Expensive<span style='position:absolute;top:-3px;right:-15px;border-left-color:#fab1a0' class='arrow-left'></span>"),m1t=25,m2t=150,m3t=425;m1.setPosition(60,m1t),m1.setSize(150,30),m2.setPosition(60,m2t),m2.setSize(150,30),m3.setPosition(60,m3t),m3.setSize(150,30),m1.makeDraggable(),m2.makeDraggable(),m3.makeDraggable(),this.restrictMarkers(m1,m2,m3,60,25,425,m1t,m2t,m3t),m1.onDrag=(left,top)=>{m1t=top,this.restrictMarkers(m1,m2,m3,60,25,425,m1t,m2t,m3t)},m2.onDrag=(left,top)=>{m2t=top,this.restrictMarkers(m1,m2,m3,60,25,425,m1t,m2t,m3t)},m3.onDrag=(left,top)=>{m3t=top,this.restrictMarkers(m1,m2,m3,60,25,425,m1t,m2t,m3t)}}restrictMarkers(m1,m2,m3,mleft,mtop,mbot,m1t,m2t,m3t){m1.setDraggableArea(mleft,mtop,30,m2t-20),m2.setDraggableArea(mleft,m1t+20,30,m3t-20),m3.setDraggableArea(mleft,m2t+20,30,mbot)}};
