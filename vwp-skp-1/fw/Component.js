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

