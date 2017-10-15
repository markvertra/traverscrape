if (!window.Array) {
	window.Array = {};
}
if (!window.Array.isArray) {
	window.Array.isArray = function(someVar) {
		return (Object.prototype.toString.call(someVar) === '[object Array]') ? true : false;
	};
}

window.pageDataTracker = (function() {
	var pageName, players = [];
	
	function getPageName() {
		if (pageName) {
			return pageName;
		} else if (!(window.pageData && pageData.page && pageData.page.type)) {
			if (window.pageData && pageData.page && !pageData.page.type) {
				if (document.location.pathname.indexOf('/top-attractions') > -1) {
					var els = document.location.pathname.split('/');
					pageData.page.city = els[1].replace(/\-/g, ' ').toLowerCase();
					pageData.page.attractionId = els[2];
					pageData.page.type = 'attractions:top';
				} else {
					return 'other';
				}
			}
		}
		
		var name = pageData.page.type;
		if (name == 'product:category' || name == 'product:group') {
			name = (pageData.page.city + ':' + name + ':' + pageData.page.groupName + (pageData.page.categoryName ? ':' + pageData.page.categoryName : '')).toLowerCase();
		} else if (name.indexOf('product') > -1 && pageData.products) {
			var nameEls = name.split(':')
			name = pageData.products[0].city.toLowerCase() + ':' + nameEls[0] + ':' + pageData.products[0].id + (nameEls[0] ? ':' + nameEls[1] : '');
		} else if (name.indexOf('things to do') > -1) {
			name = (pageData.page.city + ':' + name).toLowerCase();
		} else if (name.indexOf('attractions') > -1) {
			var nameEls = name.split(':')
			name = (pageData.page.city + ':' + nameEls[0] + (pageData.page.attractionName ? ':' + pageData.page.attractionName : '') + (nameEls[1] ? ':' + nameEls[1] : '')).toLowerCase();
		} else if (name.indexOf('recommendations') > -1) {
			var nameEls = name.split(':')
			name = (pageData.page.city + ':' + nameEls[0] + (pageData.page.recommendationsName ? ':' + pageData.page.recommendationsName : '') + (nameEls[1] ? ':' + nameEls[1] : '')).toLowerCase();
		}
		
		pageName = (pageData.page.language || 'en').toLowerCase() + ':' + name;
		return pageName;
	}
	
	function formatDate(d) {
		if (!d) {
			return '';
		} else {
			try {
				d = new Date(d);
			} catch(ex) {
				return '';
			}
		}
		
		return dateStr = d.getFullYear() + '-' + (d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() <=9 ? '0' : '') + d.getDate();
	}
	
	function dateDiff(d1, d2) {
		if (!(d1 && d2)) {
			return '';
		} else {
			try {
				d1 = new Date(d1);
				d2 = new Date(d2);
			} catch(ex) {
				return '';
			}
		}
		
		return Math.round(Math.abs(d1-d2)/(24 * 60 * 60 * 1000));
	}
	
	function wireEventTracking($) {
		$(function() {
			// navigation
			$('div.utilities a').on('click', function() {
				var $this = $(this), linkName = 'header:';
				if ($this.parents('#currencyDropdown').length > 0) {
					linkName += 'currency:';
				} else if ($this.parents('#languageDropdown').length > 0) {
					linkName += 'language:';
				} else if ($this.parents('#userDropdown').length > 0) {
					linkName += 'user:';
				}
				
				if ($this.find('#shopCartCount').length > 0) {
					linkName += 'cart';
				} else {
					linkName += $this.text();
				}
				
				if (!$this.attr('href') || $this.attr('href').indexOf('/') == 0) {
					s2.Util.cookieWrite('c34', linkName.toLowerCase());
				} else {
					s2.prop34 = linkName;
					s2.tl(true, 'o', 'navigation click');
				}
			});
			
			$('#globalHeader a').on('click', function() {
				s2.Util.cookieWrite('c34', 'header:home');
			});
			
			$('div.footer a').on('click', function() {
				var $this = $(this), parent = $this.parents('div.mtl:first, div.phm:first').find('h5').text().toLowerCase(), linkName = 'footer:';
				if (parent && !(parent == 'social' || parent == 'mobile')) {
					linkName += parent + ':' + $this.text().toLowerCase();
					if (!$this.attr('href') || $this.attr('href').indexOf('/') == -1) {
						s2.prop34 = linkName;
						s2.tl(true, 'o', 'navigation click');
					} else {
						s2.Util.cookieWrite('c34', linkName);
					}
				}
			});
			
			$('div.navmod').each(function() {
				var $nav = $(this);
				$nav.find('div.mod-header a').on('click', function(){
					s2.Util.cookieWrite('c34', 'sidebar:' + $.trim($(this).text()).toLowerCase())
				});
				
				$nav.find('ul.sidebar-list a').on('click', function() {
					var $link = $(this), $parent = $link.parents('li.subnav'), linkText = $.trim($link.parents('ul.sidebar-list').prev('div.mod-header').text());
					if ($parent.length > 0) {
						linkText += ':' + $.trim($parent.find('a.subnav-link-alt').text());
					}
					linkText += ':' + $.trim($link.text());
					s2.Util.cookieWrite('c34', 'sidebar:' + linkText.toLowerCase());
				});
			});
			
			// pdp tabs
			$('a[data-tab]').on('click', function() {
				trackEvent('productTabClick', {
					tabName: $(this).text()
				});
			});
			
			// faqs
			if (document.location.pathname.indexOf('/faq') > -1) {
				$('div.faq').on('click', 'div.line a', function() {
					trackEvent('faqClick', {
						faqName: $(this).text()
					});
				});
			}
			
			// product list clicks
			var $list = $('div.product-summary');
			$list.each(function(i) {
				var pos = i + 1, $li = $(this), prod = $li.attr('data-product-id');
				$li.on('click', 'a', function() {
					if (pos && $li.attr('data-product-id')) {
						if (pageData.search && pageData.search.currentPage) {
							pos = ((parseInt(pageData.search.currentPage) - 1) * $list.length) + pos;
							s2.Util.cookieWrite('v85', pos || 'position not available');
						} else {
							s2.Util.cookieWrite('v17', 'list:row ' + pos + ':col 1');
						}
					}
				});
			});
			
			$('div.product-list').on ('click', 'div[data-product-id] a', function() {
				var $this = $(this), $el = $this.parents('div[data-product-id]'), id = $el.attr('data-product-id'), row, col;
				$('div[data-product-id]').each(function(i) {
					if ($(this).attr('data-product-id') == id) {
						row = Math.floor((i + 1) / 3) + 1;
						col = (i % 3) + 1;
					}
				});
				
				if (row && col) {
					s2.Util.cookieWrite('v17', 'grid:row ' + row + ':col ' + col);
				}
			});
		});
	}
	
	function trackYouTube(e) {
		console.log(e.target);
		var player = e.target, position, duration, video;
		if (player.getVideoData) {
			position = player.getCurrentTime();
			duration = player.getDuration();
			video = player.getVideoData().title;
		} else {
			player = player.j;
			position = player.currentTime;
			duration = player.duration;
			video = player.videoData.title;
		}
		switch (e.data) {
			case 5:
			case -1:
				// open play complete pause
				if (player.open) {
					player.open = false;
					s2.Media.close(video);
				}
				break;
			case 1:
				if (!player.open){
					player.open = true;
					s2.Media.open(video, duration, s2.Media.playerName);
				}
				s2.Media.play(video, position);
				break;
			case 0:
				player.open = false;
				s2.Media.stop(video, position);
				s2.Media.close(video);
				break;
			case 2:
				s2.Media.stop(video, position);
		}
	}
	
	function trackPageLoad() {
		pageName = getPageName();
		
		if (window.jQuery) {
			wireEventTracking(jQuery);
		}
	}
	
	function trackEvent(event, data) {
		console.log(event);
		console.log(data);
		
		if (!event) {
			return;
		}
		
		if (data) {
			window.eventData = data;
		} else {
			window.eventData = {};
		}
		eventData.eventName = event;
		
		if (event == 'typeaheadSearch' && data.search) {
			var ta = (data.search.typeaheadText || 'no text') + '|' + (data.search.typeaheadTerm || 'no term') + '|' + (data.search.typeaheadType || 'no type') + '|' + (data.search.typeaheadPosition || 'no position');
			s2.Util.cookieWrite('v59', ta.replace(/\'|\"/g, '').toLowerCase());
		} else if (event == 'ytStateChange') {
			trackYouTube(data);
		} else {
			_satellite.track(event);
		}
	}
	
	function getParam(name, url) {
		if (!url) {
			url = window.location.href;
		} else if (url.indexOf('?') == -1) {
			url = '?' + url;
		}
		url = decodeURIComponent(url);
		var regexS = "[\\?&]+" + name + "=([^&#]*)";
		var regex = new RegExp(regexS, "i");
		var results = regex.exec(url);
		if (results === null) {
			return "";
		} else {
			return results[1].replace(/^[ \t]+|[ \t]+$/, "");
		}
	}
	
	return {
		trackPageLoad			: trackPageLoad
		,trackEvent				: trackEvent
		,getPageName			: getPageName
		,formatDate				: formatDate
		,dateDiff				: dateDiff
		,getParam				: getParam
	};
})();
