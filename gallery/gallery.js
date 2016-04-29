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
		var self = this;
		var elementWithArrow = element + '<a href="javascript:;" class="arrows arrow-left"><span></span></a><a href="javascript:;" class="arrows arrow-right"><span></span></a>';
		popUp.show(elementWithArrow);

		$('.popup .arrow-left').on('click', function(e) {
			self.leftArrow();
		});

		$(".popup .arrow-right").on('click', function(e) {
			self.rightArrow();
		});
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

		$('.popup').on('keyup', function(e) {
			if (e.keyCode == 37) {
				self.leftArrow();
			} else if (e.keyCode == 39){
				self.rightArrow();
			}
			console.log(e.keyCode);
		});
	}

	return Gallery;
})();

var PopUp = (function() {
    var instance;

    function PopUp() {
        this.init();
        this.abc = 1;
		if (instance) {
			return instance;
		}
		if (this && this.constructor === PopUp) {
			instance = this;
		} else {
			return new PopUp();
		}
    }

    PopUp.prototype.init = function() {
        var self = this;

        var TEMPLATE = '<div class="overlay"><div class="popup" tabindex="0"><button class="close" title="close"></button><div class="popup-content"></div></div></div>';
        this._overlay = $(TEMPLATE).appendTo(document.body);
        this._popup = this._overlay.find('.popup');
        this._close = this._popup.find('.close');
        this._popupContent = this._overlay.find('.popup-content');

        this._overlay.on('click', function() { self.hide(); });
        this._close.on('click', function() { self.hide(); });
        this._popup.on('click', function(e) { e.stopPropagation(); });
    };

    PopUp.prototype.show = function(content) {
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
    
	return PopUp;
})();

//init popUp
var popUp = new PopUp();