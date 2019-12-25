// JavaScript Document
//banner头图效果
jQuery(function(){

	var topSlickCount = jQuery('.h_banner ul li').size();

	jQuery('.banner_dot a').mouseover(function(){
		clearInterval(timer)
		myindex = jQuery(this).index();
		step = myindex;
		jQuery('.h_banner ul').animate({'left':-1200*step},800);
		jQuery('.banner_dot a').eq(step).addClass('on').siblings().removeClass('on');
	});
	jQuery('.banner_dot a').mouseout(function(){
		if (topSlickCount != 1) {
			timer = setInterval(autoplay, 4000);
		}
	})
	var step = 0;
	var timer = null;


	if (topSlickCount != 1) {
		jQuery('.h_banner ul').append(jQuery('.h_banner ul li').eq(0).clone());
	}
	jQuery('.h_banner ul').width(jQuery('.h_banner ul li').length * 1200 ) ;
	function autoplay(){
		step ++;
		if(step == jQuery('.h_banner ul li').length){
			step = 1;
			jQuery('.h_banner ul').css('left','0');
		}
		else if(step == (jQuery('.h_banner ul li').length-1)){
			jQuery('.banner_dot a').eq(0).addClass('on').siblings().removeClass('on');

		}
		jQuery('.h_banner ul').animate({'left':-1200*step},800);
		jQuery('.banner_dot a').eq(step).addClass('on').siblings().removeClass('on');
	}
	if (topSlickCount != 1) {
		timer = setInterval(autoplay, 4000);
	}
	jQuery('.h_banner ul li').mouseover(function(e) {
		clearInterval(timer)
	});
	jQuery('.h_banner ul li').mouseout(function(e) {
		clearInterval(timer)
		if (topSlickCount != 1) {
			timer = setInterval(autoplay, 4000)
		}
	});

	jQuery('.b_block').click(function (e) {
		jQuery('.codebox').hide();
		jQuery('.b_block').hide();
		jQuery('#d_map').hide();
	});

	jQuery('[data-id="d_pop"]').click(function(){
		jQuery('#d_map').show();
		jQuery('.b_block').show();
	})
	jQuery('#d_map em').click(function(){
		jQuery('#d_map').hide();
		jQuery('.b_block').hide();
	})

	//处理新闻相关全部区域可点击
	jQuery('.h_newscont, .h_shoppingnr').click(function () {
		var linkEl = jQuery(this).find('a')[0];
		if (linkEl) linkEl.click();
	})

});

function showWeixinPopupBox() {
	jQuery('.codebox').show();
	jQuery('.b_block').show();
}