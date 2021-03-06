vwp.BaseDragItem=class 
{
    constructor(parent)
    {
        this.dragOffsetX=0
        this.dragOffsetY=0

        this.parent = parent;
        this.element = document.createElement("div");
        this.element.style.position="absolute";
        this.element.style.height="100px";
        this.element.style.width="100px";
        this.element.style.cursor="pointer";
        this.element.className="vwp-drag-item";
        this.element.style.zIndex=9001;
        this.parent.element.appendChild(this.element);

        this.dragStart=this.dragStart.bind(this);
        this.onDrag=this.onDrag.bind(this);
        this.dragStop=this.dragStop.bind(this);

        this.setPosition(0,0);
        this.makeDraggable();
    }

    setPositionLeft(left) { this.element.style.left=left + "px"; }
    setPositionTop(top)   { this.element.style.top=top + "px";   }
    setPosition(left,top) {this.setPositionLeft(left);this.setPositionTop(top);}

    dragStart=(evt)=>
    {
        this.dragOffsetX = evt.pageX - this.element.offsetLeft
        this.dragOffsetY = evt.pageY - this.element.offsetTop
        document.addEventListener("mousemove",this.onDrag)
        document.addEventListener("mouseup",this.dragStop)
    }
    onDrag=(evt)=>
    {
        var left=evt.pageX-this.dragOffsetX
        var top=evt.pageY-this.dragOffsetY

        if(left < 0 ) left =0
        if(top < 0) top=0;

        if(left > this.parent.element.offsetWidth-this.element.offsetWidth) 
            left=this.parent.element.offsetWidth-this.element.offsetWidth
        if(top > this.parent.element.offsetHeight-this.element.offsetHeight) 
            top=this.parent.element.offsetHeight-this.element.offsetHeight

        this.setPosition( left,top )

        
    }
    dragStop=(evt)=>
    {
        document.removeEventListener("mousemove",this.onDrag)
        document.removeEventListener("mouseup",this.dragStop)
    }

    makeDraggable()
    {
        document.addEventListener("mousedown",this.dragStart)
    }

}