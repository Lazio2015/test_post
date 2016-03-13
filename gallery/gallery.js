var Gallery = (function() {
	function Gallery (options) {
		this.arr = options.arr ? options.arr : [];
		this.imageBlockId = options.image ? options.image : '';
		this.number = -1;
		this.el = 'idBlock';
	}

	Gallery.prototype.initImageByBlock = function() {
		// this.imageBlock =  document.getElementById(this.imageBlockId);
		// var images = imageBlock.getElementsByTagName('img');
		// for (var i=0; i < images.length; i++ ) {
		// 	this.arr.push(images[i].src);
		// }

		this.event();
	}
	
	Gallery.prototype.subscribe = function() {
		
	}

	Gallery.prototype.open = function (element) {

		console.log('here');
	};

	Gallery.prototype.right_arrow = function(to) {
		if (to < this.arr.length-1)  to++
		else
			to = 0;
		this.open(this.arr[to]);
	};

	Gallery.prototype.left_arrow = function (to) {
		if (to < this.arr.length-1)  to++
		else
			to = 0;
		this.open(this.arr[to]);
	};

	Gallery.prototype.event = function () {
			$('#' + this.imageBlockId + ' ' +'img').click(function(e){
				e.preventDefault();
				var element = $(this);
				$(document).trigger('show', {element: element});
			});
	}

	return Gallery;
})();