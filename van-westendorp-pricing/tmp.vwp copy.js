var fw={}

fw.Component=class
{
    constructor(pelement)
    {
        this.pelement = pelement;
        this.element = document.createElement("div");
        this.element.style.position="relative";
        this.element.style.zIndex=9000;
        this.element.className="vwp-component";
        this.pelement.appendChild(this.element);
        this.init()
    }

    init()
    {
        //Todo   
    }

}

fw.Container=class 
{
    constructor(parent,cname=null,html=null)
    {
        this.parent = parent;
        this.element = document.createElement("div");
        this.element.style.position="relative";
        this.element.className="vwp-container";
        if(html!=null) this.element.innerHTML = html
        if(cname !=null) this.addClass(cname)
        this.parent.element.appendChild(this.element);
        this.setSize(300,300);
        this.setzIndex(9000);
        this.init();
    }
    init(){}
    addClass(cname)
    {
        this.element.className +=" " + cname
    }
    removeClass(cname)
    {
        re = new RegExp(" " + cname, 'gi');
        this.element.className=this.element.className.replace(re, "");
    }
    setSize(width,height)
    {
        if (typeof height === 'string') this.element.style.height=height;
        else this.element.style.height=height + "px";

        if (typeof width === 'string') this.element.style.width=width;
        else this.element.style.width=width + "px";
        
    }
    setzIndex(zindex)
    {
        this.element.style.zIndex=zindex;
    }

}fw.Element=class 
{
    constructor(parent,cname=null,html=null)
    {
        this.dragOffsetX=0
        this.dragOffsetY=0

        this.dragX1=0
        this.dragY1=0

        this.dragX2=0
        this.dragY2=0

        this.drag=null
        this.dragStart=null
        this.dragStop=null

        this.parent = parent;
        this.element = document.createElement("div");
        this.element.style.position="absolute";
        this.element.className="vwp-element";
        
        if(html !=null) this.element.innerHTML = html
        if(cname !=null) this.addClass(cname)

        this.parent.element.appendChild(this.element);

        this.setSize(300,300);
        this.setzIndex(9001);

        this.init()

    }


    init(){}
    addClass(cname)
    {
        this.element.className +=" " + cname
    }
    removeClass(cname)
    {
        re = new RegExp(" " + cname, 'gi');
        this.element.className=this.element.className.replace(re, "");
    }
    setPositionLeft(left)
    {
        this.element.style.left=left + "px";
    }
    setPositionTop(top)
    {
        this.element.style.top=top + "px";
    }

    setPosition(left,top)
    {
        this.element.style.left=left + "px";
        this.element.style.top=top + "px";
    }
    setSize(width,height)
    {
        if (typeof height === 'string') this.element.style.height=height;
        else this.element.style.height=height + "px";

        if (typeof width === 'string') this.element.style.width=width;
        else this.element.style.width=width + "px";    
    }
    setzIndex(zindex)
    {
        this.element.style.zIndex=zindex;
    }

    onDragStart(){ }
    onDrag(left,top){ }
    onDragStop(){ }


    makeDraggable()
    {
        this.dragStart=(evt)=>
        {
            this.dragOffsetX = evt.pageX - this.element.offsetLeft
            this.dragOffsetY = evt.pageY - this.element.offsetTop
            document.addEventListener("mousemove",this.drag)
            document.addEventListener("mouseup",this.dragStop)
    
            this.onDragStart();
    
        }
        this.drag=(evt)=>
        {
            var left=evt.pageX-this.dragOffsetX
            var top=evt.pageY-this.dragOffsetY
    
            if(left > this.dragX2) left=this.dragX2
            if(top > this.dragY2) top=this.dragY2
            if(left < this.dragX1) left=this.dragX1
            if(top < this.dragY1) top=this.dragY1
    
            this.setPosition( left,top )
    
            this.onDrag(left,top);
            
        }
        this.dragStop=(evt)=>
        {
            document.removeEventListener("mousemove",this.drag)
            document.removeEventListener("mouseup",this.dragStop)
            this.onDragStop();
        }
    
        this.dragStart=this.dragStart.bind(this);
        this.drag=this.drag.bind(this);
        this.dragStop=this.dragStop.bind(this);

        this.element.addEventListener("mousedown",this.dragStart)
        this.dragX1=0
        this.dragY1=0
        this.dragX2=this.parent.element.offsetWidth-this.element.offsetWidth
        this.dragY2=this.parent.element.offsetHeight-this.element.offsetHeight
    }
    
    setDraggableArea(x1,y1,x2,y2)
    {
        this.dragX1=x1
        this.dragY1=y1
        this.dragX2=x2
        this.dragY2=y2
    }

}var vwp={}

vwp.Component=class extends fw.Component
{
    init()
    {
        var ic = new fw.Container(this,"vwp-content-container","<img style='margin-left:15px;margin-top:15px;padding-top:10px;height:85%;width:85%' src='cola.jpg'>")
        var pc = new fw.Container(this,"vwp-pricing-container")
        ic.setSize(300,350)
        pc.setSize(300,350)
        this.initPricingLabels(pc);
        this.initMarkers(pc);

    }

    initPricingLabels(pc)
    {
        var arrPrice = ['$2.00','$1.90','$1.80','$1.70','$1.60','$1.50','$1.40','$1.30','$1.20','$1.10','$1.00','$0.90','$0.80','$0.70','$0.60']
        for(var i=0;i<arrPrice.length;i++)
        {
            var pl=new fw.Element(pc,"vwp-price-label",arrPrice[i])
            pl.setPosition(230,20+20*i);
            pl.setSize(50,20)
        }
    }

    initMarkers(pc)
    {
        var me=new fw.Element(pc,"vwp-marker vwp-expensive-marker","Expensive<i style='position:absolute;top:-7px;right:-12px;font-size:34px;color:rgb(247, 188, 167)' class='fas fa-caret-right'></i>")
        var mr=new fw.Element(pc,"vwp-marker vwp-resonable-marker","Resonable<i style='position:absolute;top:-7px;right:-12px;font-size:34px;color:rgb(162, 226, 228)' class='fas fa-caret-right'></i>")
        var mc=new fw.Element(pc,"vwp-marker vwp-cheap-marker","Too Cheap<i style='position:absolute;top:-7px;right:-12px;font-size:34px;color:rgb(243, 243, 189)' class='fas fa-caret-right'></i>")

        var mleft=60;var mtop=15;var mbot=300;var met=15; var mrt=150; var mct=300;

        me.setPosition(mleft,met );me.setSize(150,20)
        mr.setPosition(mleft,mrt);mr.setSize(150,20)
        mc.setPosition(mleft,mct);mc.setSize(150,20)


        me.makeDraggable();
        mr.makeDraggable();
        mc.makeDraggable();
        
        this.restrictMarkers(me,mr,mc,mleft,mtop,mbot,met,mrt,mct);

        me.onDrag=(left,top)=>{ met=top ; this.restrictMarkers(me,mr,mc,mleft,mtop,mbot,met,mrt,mct) ;}
        mr.onDrag=(left,top)=>{ mrt=top ; this.restrictMarkers(me,mr,mc,mleft,mtop,mbot,met,mrt,mct) ;}
        mc.onDrag=(left,top)=>{ mct=top ; this.restrictMarkers(me,mr,mc,mleft,mtop,mbot,met,mrt,mct) ;}
    }

    restrictMarkers(me,mr,mc,mleft,mtop,mbot,met,mrt,mct)
    {
        me.setDraggableArea(mleft,mtop,30,mrt-20)
        mr.setDraggableArea(mleft,met+20,30,mct-20)
        mc.setDraggableArea(mleft,mrt+20,30,mbot)
    }
}