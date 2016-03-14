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

	Gallery.prototype.openIn = function (element) {
		popUp.show(element);
		console.log('here');
	};

	Gallery.prototype.right_arrow = function() {
		if (this.position < this.arr.length-1)  this.position++
		else
			this.position = 0;
		this.openIn(this.arr[this.position]);
	};

	Gallery.prototype.left_arrow = function () {
		if (this.position > 0)  this.position
		else
			this.position = this.arr.length-1;
		this.openIn(this.arr[this.position]);
	};

	Gallery.prototype.event = function () {
		var self = this;
			$('#' + this.imageBlockId + ' ' + 'img').on('click', function(e) {
				var element = '<button class="arrow-left"></button>' + jQuery(this).context.outerHTML +'<button class="arrow-right"></button>';
				e.preventDefault();
				this.position = self.arr.indexOf(this);
				self.openIn(element);
			});

			$(".popup").on('click', function(e) {
				console.log('click');
				self.left_arrow();
			});
	}

	return Gallery;
})();