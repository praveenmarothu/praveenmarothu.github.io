fw.Element=class 
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
        var isTouchDevice = 'ontouchstart' in document.documentElement;

        this.dragStart=(evt)=>
        {
            evt.preventDefault();
            if(isTouchDevice) evt=evt.targetTouches[0]

            this.dragOffsetX = evt.pageX - this.element.offsetLeft
            this.dragOffsetY = evt.pageY - this.element.offsetTop
            if(isTouchDevice) 
            {
                document.addEventListener("touchmove",this.drag)
                document.addEventListener("touchend",this.dragStop)
            }
            else
            {
                document.addEventListener("mousemove",this.drag)
                document.addEventListener("mouseup",this.dragStop)
            }
    
            this.onDragStart();
    
        }
        this.drag=(evt)=>
        {
            evt.preventDefault();

            if(isTouchDevice) evt=evt.targetTouches[0]

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
            evt.preventDefault();

            if(isTouchDevice)
            {
                document.removeEventListener("touchmove",this.drag)
                document.removeEventListener("touchend",this.dragStop)                
            }
            else
            {
                document.removeEventListener("mousemove",this.drag)
                document.removeEventListener("mouseup",this.dragStop)
            }

            this.onDragStop();
        }
    
        this.dragStart=this.dragStart.bind(this);
        this.drag=this.drag.bind(this);
        this.dragStop=this.dragStop.bind(this);

        if(isTouchDevice)   this.element.addEventListener("touchstart",this.dragStart)
        else                this.element.addEventListener("mousedown",this.dragStart)
        
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

}