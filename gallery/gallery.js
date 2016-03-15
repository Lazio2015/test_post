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
		var elementWithArrow = '<button class="arrow-left"> << </button>' + element +'<button class="arrow-right"> >> </button>';
		popUp.show(elementWithArrow);

		this.event();
	};

	Gallery.prototype.rightArrow = function() {
		console.log('r', this.position);
		if (this.position < this.arr.length-1)  this.position++
		else
			this.position = this.arr.length-1;
				console.log('r1', this.position);
		this.openIn(this.arr[this.position]);
	};

	Gallery.prototype.leftArrow = function () {
		if (this.position > 0)  this.position--
		else
			this.position = 0;
		this.openIn(this.arr[this.position]);
	};

	Gallery.prototype.event = function () {
		var self = this;
			$('#' + this.imageBlockId + ' ' + 'img').on('click', function(e) {
				e.preventDefault();
				var element = jQuery(this).context.outerHTML;
				self.position = self.arr.indexOf(element);
				self.openIn(element);
			});

			$('.popup .arrow-left').on('click', function(e) {
				console.log('left');
				self.leftArrow();
			});

			$(".popup .arrow-right").on('click', function(e) {
				console.log('right');
				self.rightArrow();
			});
	}

	return Gallery;
})();