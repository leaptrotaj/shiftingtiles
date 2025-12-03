(function($){

  $.fn.shiftingtiles = function(images, options) {
    
    // Merge options safely
    var settings = $.extend({
          photosource: images,
          duration: 5000,
          jitterPercent: 0
        }, options), 
        timeout, 
        where = this;
    
    // Animation end handlers
    where.on("animationend webkitAnimationEnd oAnimationEnd", ".leave > .row", function(){
      $(this).parent().addClass("left").removeClass("leave");
    });
    where.on("animationend webkitAnimationEnd oAnimationEnd", ".disappear", function(){
      $(this).css("display", "none").remove();
      where.trigger("st-animate-after");
      return false;
    });

    setup(where);

    // Source image selector
    function source(){
      if (!images || images.length === 0) return null;

      if(typeof images.bottom === "undefined")
        images.bottom = 0;

      var index = images.bottom + Math.floor((images.length - images.bottom) * Math.random());
      var one = images.splice(index, 1)[0];
      images.unshift(one);

      images.bottom++;

      if(images.bottom === images.length){
        images.bottom = 0;
        where.trigger("st-galleryrestart");
      }

      return one;
    }

    // Setup DOM structure
    function setup(where){
      where.addClass("shiftingtiles");
      where.prepend("<div class='row'><div class='single'></div><div class='single'></div><div class='dual'><div></div><div></div></div></div>");
      where.prepend("<div class='row'><div class='single'></div><div class='single'></div><div class='dual'><div></div><div></div></div></div>");
      where.append("<div class='loading'>Loading Photos...</div>");

      where.find(".single, .dual > div").each(addImage);
      timeout = setTimeout(frame, settings.duration);
    }

    // Add background image
    function image($element){
      var src = source();
      if(src) $element.css("background-image", "url("+src+")");
    }

    // Add images to nodes
    function addImage(index, node){
      node = $(node);
      if(node.hasClass("single") || node.parent(".dual").length > 0){
        image(node);
      } else if(node.hasClass("dual")) {
        node.children().each(function(){
          image($(this));
        });
      }
      return node;
    }

    // Animate frame
    function frame(){
      clearTimeout(timeout);
      var boxes = where.find(".single:not(:last-child), .dual:not(:last-child)");
      if(boxes.length === 0) return;

      var disappear = $(boxes.get(Math.floor(Math.random() * boxes.length)));

      where.trigger("st-animate-before", disappear);

      disappear.parent().append(addImage(0, disappear.clone()));
      disappear.addClass("disappear");
      where.trigger("st-animate", disappear);

      // Jitter logic
      var jitter = Math.floor(settings.duration * settings.jitterPercent * (Math.random() - 0.5));
      var nextInterval = settings.duration + jitter;
      console.log("Next frame in:", nextInterval, "ms");
      timeout = setTimeout(frame, nextInterval);
    }

    // Keyboard controls
    $(document.body).keydown(function(e){
      if(e.key === 32){ 
        frame();
        e.preventDefault();
        return false;
      }
      if(e.key === 38){
        $(".shiftingtiles").toggleClass("leave");
      }
    });
    
    // Chainability
    return this;

  };
})(jQuery);

// Polyfill for Array.reduce
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function reduce(accumulator){
    if (this===null || this===undefined) throw new TypeError("Object is null or undefined");
    var i = 0, l = this.length >>> 0, curr;
 
    if(typeof accumulator !== "function")
      throw new TypeError("First argument is not callable");
 
    if(arguments.length < 2) {
      if (l === 0) throw new TypeError("Array length is 0 and no second argument");
      curr = this[0];
      i = 1;
    } else {
      curr = arguments[1];
    }
 
    while (i < l) {
      if(i in this) curr = accumulator.call(undefined, curr, this[i], i, this);
      ++i;
    }
 
    return curr;
  };
}
