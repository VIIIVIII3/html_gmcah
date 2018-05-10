//_load
(function($,w){
	var winHei=$(w).height();
	var loadFn=function(){
		var $conLis=$('[_load]');
		$conLis.each(function(i,v){
			var scrollTop=$(w).scrollTop();
			var $v=$(v);
			if($conLis.filter('_load')==0) $(w).off('scroll.z');
			if( winHei+scrollTop > $v.offset().top){
				$v.addClass('active');
				$(this).removeAttr('_load');
			}
		})
	}
	$(w).on('scroll.z load',loadFn);
})(jQuery, window);

//requestAnimationFrame
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
})();