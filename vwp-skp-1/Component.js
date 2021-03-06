var vwp={}

vwp.Component=class extends fw.Component
{
    init()
    {
        var pc = new fw.Container(this,"vwp-pricing-container")
        pc.setSize(350,480)
        this.initPricingLabels(pc);
        this.initMarkers(pc);

    }

    initPricingLabels(pc)
    {
            var scl=new fw.Element(pc,"vwp-price-scale")
            scl.setPosition(225,40);
            scl.setSize(7,400)
            for(var i=0;i<=40;i++)
            {
                var tck = new fw.Element(pc,"vwp-price-tick")
                tck.setPosition(225,40 + i*10);
                if(i%5==0) 
                {   
                    tck.setSize(15,1)
                    var lbl = new fw.Element(pc,"vwp-price-label","$" + (i*250))
                    lbl.setPosition(240,40 + i*10 -10)
                    lbl.setSize(50,20)
                }
                else tck.setSize(10,1)
            }
    
    }

    initMarkers(pc)
    {
        var m1=new fw.Element(pc,"vwp-marker vwp-acceptable-marker","Acceptable<span style='position:absolute;top:-3px;right:-15px;border-left-color:#81ecec' class='arrow-left'></span>")
        var m2=new fw.Element(pc,"vwp-marker vwp-expensive-marker","Expensive<span style='position:absolute;top:-3px;right:-15px;border-left-color:#ffeaa7' class='arrow-left'></span>")
        var m3=new fw.Element(pc,"vwp-marker vwp-tooexpensive-marker","Too Expensive<span style='position:absolute;top:-3px;right:-15px;border-left-color:#fab1a0' class='arrow-left'></span>")

        var mleft=60;var mtop=25;var mbot=425;
        var m1t=25; var m2t=150; var m3t=425;

        m1.setPosition(mleft,m1t );m1.setSize(150,30)
        m2.setPosition(mleft,m2t);m2.setSize(150,30)
        m3.setPosition(mleft,m3t);m3.setSize(150,30)

        m1.makeDraggable();
        m2.makeDraggable();
        m3.makeDraggable();
        
        this.restrictMarkers(m1,m2,m3,mleft,mtop,mbot,m1t,m2t,m3t);

        m1.onDrag=(left,top)=>{ m1t=top ; this.restrictMarkers(m1,m2,m3,mleft,mtop,mbot,m1t,m2t,m3t) ;}
        m2.onDrag=(left,top)=>{ m2t=top ; this.restrictMarkers(m1,m2,m3,mleft,mtop,mbot,m1t,m2t,m3t) ;}
        m3.onDrag=(left,top)=>{ m3t=top ; this.restrictMarkers(m1,m2,m3,mleft,mtop,mbot,m1t,m2t,m3t) ;}
    }

    restrictMarkers(m1,m2,m3,mleft,mtop,mbot,m1t,m2t,m3t)
    {
        m1.setDraggableArea(mleft,mtop,30,m2t-20)
        m2.setDraggableArea(mleft,m1t+20,30,m3t-20)
        m3.setDraggableArea(mleft,m2t+20,30,mbot)
    }
}