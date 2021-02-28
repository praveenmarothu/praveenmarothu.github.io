var vwp={}

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