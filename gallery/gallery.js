var Gallery = (function() {
	function Gallery (options) {
		this.arr = options.arr ? options.arr : [];
		this.imageBlockId = options.imageBlockId ? options.imageBlockId : '';
		this.position = -1;
	}

	Gallery.prototype.init = function() {		
		this.imageBlock =  document.getElementById(this.imageBlockId);
		var images = this.imageBlock.getElementsByTagName('img');
		for (var i=0; i < images.length; i++ ) {
			this.arr.push(images[i].outerHTML);
		}
		this.event();
	}

	Gallery.prototype.open = function (element) {
		var elementWithArrow = '<div class="arrow-left"></div>' + element +'<div class="arrow-right"></div>';
		popUp.show(elementWithArrow);

		this.event();
	};

	Gallery.prototype.rightArrow = function() {
		if (this.position < this.arr.length-1)  
			this.position++
		else
			this.position = this.arr.length-1;
		this.open(this.arr[this.position]);
	};

	Gallery.prototype.leftArrow = function () {
		if (this.position > 0)  this.position--
		else
			this.position = 0;
		this.open(this.arr[this.position]);
	};

	Gallery.prototype.event = function () {
		var self = this;
			$('#' + this.imageBlockId + ' ' + 'img').on('click', function(e) {
				e.preventDefault();
				var element = jQuery(this).context.outerHTML;
				self.position = self.arr.indexOf(element);
				self.open(element);
			});

			$('.popup .arrow-left').on('click', function(e) {
				self.leftArrow();
			});

			$(".popup .arrow-right").on('click', function(e) {
				self.rightArrow();
			});
	}

	return Gallery;
})();

var PopUp = (function() {
    function PopUp() {
        this.init();
    }

    PopUp.prototype.init = function() {
        var self = this;

        var TEMPLATE = '<div class="overlay"><div class="popup"><a class="close" title="close" href="#close"></a><div class="popup-content"></div></div></div>';
        this._overlay = $(TEMPLATE).appendTo(document.body);
        this._popup = this._overlay.find('.popup');
        this._popupContent = this._overlay.find('.popup-content');

        this._overlay.on('click', function() { self.hide(); });
        this._popup.on('click', function(e) { e.stopPropagation(); });
    };

    PopUp.prototype.show = function(content) {
        //this._popupContent.html('');
    	  if (typeof content === 'string') {
           this._popupContent.html(content);
        } else {
             this._popupContent.append(content);
        }
        this._overlay.css({display: 'block'});
    };

    PopUp.prototype.hide = function() {
        this._overlay.css({display: 'none'});
    };

    var instance = new PopUp();
    
    return function () {
        return instance;
    }
})();

//init popUp
var popUp = new PopUp();