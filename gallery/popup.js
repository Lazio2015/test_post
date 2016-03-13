var PopUp = (function() {
    function PopUp() {
        this.init();
    }

    PopUp.prototype.init = function() {
        var self = this;

    	this._iconClose = '<a class="close" title="close" href="#close"></a>';
        this._overlay = $('<div class="overlay"><div class="popup" id="close"></div></div>').appendTo(document.body);
        this._popup = this._overlay.find('.popup');

        this._overlay.on('click', function() { self.hide(); });
        this._popup.on('click', function(e) { e.stopPropagation(); });
    };

    PopUp.prototype.show = function(content) {
    	  if (typeof content === 'string') {
           this._popup.html(this._iconClose + content);
        } else {
         	 this._popup.append(this._iconClose + content);
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


// var PopUp = (function() {
// 	function PopUp() {
// 		this._show = false;
// 	}

// 	PopUp.prototype.show = function (element) {
// 		console.log('elen', element);
// 		document.getElementById("popUp").innerHTML= element + this.close;
// 		jQuery('#popUp').show();
// 	}

// 	PopUp.prototype.closePopUp = function () {
// 		this.div.innerHTML = '';
// 		this._show = false;
// 	}

// 	PopUp.prototype.render = function () {
// 		var div = document.createElement("div");
// 		div.className = 'popup';
// 		div.id = 'popUp';
// 		close = '<a class="close" title="close" href="#close"></a>';

// 		//overlay
// 		this.overlay = document.createElement("a");
// 		this.overlay.href = '#x';
// 		this.overlay.className = 'overlay';
// 		this.overlay.id = 'win';
// 		document.body.appendChild(this.overlay);
// 		document.body.appendChild(this.div);
// 	}

// 	PopUp.prototype.init = function () {

// 		this.render();

// 		$(document).on('show', function(e, data){
// 			console.log(data);
// 			console.log(this);
// 			this.show(data.element);
// 		});
// 	}

// 	return PopUp;
// })();