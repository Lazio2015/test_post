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
		console.log('this.position', this.position);
		if (this.position > 0)  this.position--
		else
			this.position = this.arr.length-1;
		this.openIn(this.arr[this.position]);
	};

	Gallery.prototype.event = function () {
		var self = this;
			$('#' + this.imageBlockId + ' ' + 'img').on('click', function(e) {
				var element = jQuery(this).context.outerHTML;
				var elementWithArrow = '<button class="arrow-left"></button>' + element +'<button class="arrow-right"></button>';
				e.preventDefault();
				self.position = self.arr.indexOf(element);
				self.openIn(elementWithArrow);
			});

			$(".popup").on('click', function(e) {
				console.log('click11');
				self.left_arrow();
			});
	}

	return Gallery;
})();