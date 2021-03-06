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

}