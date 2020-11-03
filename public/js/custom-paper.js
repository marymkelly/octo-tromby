//paper/canvas variables
var pWidth = view.bounds.width; 
var pHeight = view.bounds.height;
var midY = pHeight / 2;
var midX = pWidth / 2;
var pWidth3; // (pWidth / 3) - initSlideX

//shape variables
var width = 100;
var height = 100;

//trombone vars
var bell; //recolor
var slideChild = {};  //recolor

//calculate slide positions
var initSlideX; //center X of slide - used
var offset; // - used
var slideSeventh; // equal division of 7 parts //116 each - used

//slide svg relative ~ not canvas
var topSlide; //initSlideX - offset; // 245 - static // top of slide and left bound of animation - used
var bottomSlide; // 1085 - static - used
var leftSlSvg; // ((slide.bounds.width / 2) - (pWidth / 3)); // left endpoint x of slide svg - used 
var rightSlSvg; // ((slide.bounds.width / 2) + (pWidth / 3)); // right endpoint x of slide svg - used

var trombone = paper.project.importSVG('/images/tspBell.svg', function(onload) { //background trombone image
    trombone = onload;

    trombone.bounds.width;
    trombone.position = new Point((pWidth / 3), midY);
    bell = trombone.children[1].children['Layer_4'].children[2];
    bell.fillColor = "#17FFEF";
    //console.log(trombone.children);
});

var slide = paper.project.importSVG('/images/tspSlide.svg', function(onload) { //animated trombone slide
    slide = onload;
    
    //console.log(slide.bounds);
    slide.position = new Point((pWidth / 3), midY); 
    pWidth3 = (pWidth / 3); // same as initial slide x
    initSlideX = slide.position.x; 

    leftSlSvg = ((slide.bounds.width / 2) - (pWidth / 3)); // left endpoint x of slide svg 
    rightSlSvg = ((slide.bounds.width / 2) + (pWidth / 3)); // right endpoint x of slide svg - bottom of slide - good
    offset = (pWidth * 0.0806); //from right side of canvas - used
    topSlide =  (pWidth * 0.2527);; // visual top of slide; should be fixed/closer //corrected sans resonsiveness
    bottomSlide = rightSlSvg; // good
    slideSeventh = (bottomSlide - topSlide) / 7; // corrected

    slideChild = slide.children[1].children['Layer_4'].children[0];
    slideChild.fillColor = "#17FFEF";
});

function onMouseDown(event) {
    if(globals.conflict){
        return;
    } else if(event.event.button === 0) {
        globals.mouseDraggery(event);
    } return;
}

function onMouseDrag(event) {
    if(globals.conflict){
        return;
    } else if(event.event.button === 0) {
        globals.mouseDraggery(event);
    } return;
}
globals.mouseDraggery = function(event) {
    if(event.point.x >= (topSlide + 10) && event.point.x <= (bottomSlide - offset)){ //max and min slide range
        if((event.point.x > topSlide) && (event.point.x <= (topSlide + 40))) {
            slide.position.x = event.point.x + (offset - 10);
        }else if(event.point.x >= (bottomSlide - (offset + 10))){
                slide.position.x = event.point.x + offset;
        }else {
                slide.position.x = event.point.x + (offset - 10);
        }
    }
}

globals.getSlideX = function() {
    var clientSlide = slide.position.x - (pWidth * 0.0806); // calculate offset from current slide center x 
    return clientSlide;
}

globals.moveSlide = function(s){
    var moveSlide = (slideSeventh * (s - 1));
    var newSlidePos = initSlideX + moveSlide;

    slide.tween({
        'position.x': newSlidePos,
        
    }, {
        easing: 'easeInOutCubic',
        duration: 200
    });

    bell.tween({
        'fillColor.hue': '+=5'
    }, {
        easing: 'easeInOutCubic',
        duration: 200
    })

    slideChild.tween({
        'fillColor.hue': '+=5'
    }, {
        easing: 'easeInOutCubic',
        duration: 200
    })

};

globals.backToFirst = function(){
    if(slide.position.x === topSlide){
        return;
    } else {
        globals.moveSlide(1);
        return;
    }
}

function onResize(event) {
//slide.position = ({x: (view.bounds.width/3), y: (view.bounds.height/2)});
//trombone.position = ({x: (view.bounds.width/3), y: (view.bounds.height/2)}); 
}
// console.log(paper.project._view._id); //paperScope object id
paper.install(window);  //inject into window global scope
