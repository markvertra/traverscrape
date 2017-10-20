require=function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){!function(factory){var registeredInModuleLoader=!1;if("function"==typeof define&&define.amd&&(define(factory),registeredInModuleLoader=!0),"object"==typeof exports&&(module.exports=factory(),registeredInModuleLoader=!0),!registeredInModuleLoader){var OldCookies=window.Cookies,api=window.Cookies=factory();api.noConflict=function(){return window.Cookies=OldCookies,api}}}(function(){function extend(){for(var i=0,result={};i<arguments.length;i++){var attributes=arguments[i];for(var key in attributes)result[key]=attributes[key]}return result}function init(converter){function api(key,value,attributes){var result;if("undefined"!=typeof document){if(arguments.length>1){if(attributes=extend({path:"/"},api.defaults,attributes),"number"==typeof attributes.expires){var expires=new Date;expires.setMilliseconds(expires.getMilliseconds()+864e5*attributes.expires),attributes.expires=expires}try{result=JSON.stringify(value),/^[\{\[]/.test(result)&&(value=result)}catch(e){}return value=converter.write?converter.write(value,key):encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),key=encodeURIComponent(String(key)),key=key.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),key=key.replace(/[\(\)]/g,escape),document.cookie=[key,"=",value,attributes.expires?"; expires="+attributes.expires.toUTCString():"",attributes.path?"; path="+attributes.path:"",attributes.domain?"; domain="+attributes.domain:"",attributes.secure?"; secure":""].join("")}key||(result={});for(var cookies=document.cookie?document.cookie.split("; "):[],i=0;i<cookies.length;i++){var parts=cookies[i].split("="),cookie=parts.slice(1).join("=");'"'===cookie.charAt(0)&&(cookie=cookie.slice(1,-1));try{var name=parts[0].replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent);if(cookie=converter.read?converter.read(cookie,name):converter(cookie,name)||cookie.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent),this.json)try{cookie=JSON.parse(cookie)}catch(e){}if(key===name){result=cookie;break}key||(result[name]=cookie)}catch(e){}}return result}}return api.set=api,api.get=function(key){return api.call(api,key)},api.getJSON=function(){return api.apply({json:!0},[].slice.call(arguments))},api.defaults={},api.remove=function(key,attributes){api(key,"",extend(attributes,{expires:-1}))},api.withConverter=init,api}return init(function(){})})},{}],2:[function(require,module,exports){var BaseView=require("base-view"),SelectorHelper=require("../../../../Site/Resources/_selector_helper"),FooterView=BaseView.extend({el:"footer",events:{'click [data-action="collapse"]':"toggleOptions"},initialize:function(){document.documentElement.classList.add("with-footer")},toggleOptions:function(event){var container,target=event.delegateTarget;if(target&&(container=SelectorHelper.getClosest(target,".footer-content-item")))if(container.classList.contains("is-expanded"))container.classList.remove("is-expanded");else{for(var items=this.el.querySelectorAll(".footer-content-item"),i=0;i<items.length;i++)items[i].classList.remove("is-expanded");container.classList.add("is-expanded")}}});module.exports=FooterView},{"../../../../Site/Resources/_selector_helper":13,"base-view":"base-view"}],3:[function(require,module,exports){var BaseView=require("base-view"),Config=require("meta-config").global(),HeaderNavigationView=require("../../../../Site/Components/HeaderNavigation/_header_navigation"),SearchFormView=require("../../../../Components/SearchForm/_search_form"),EventDispatcher=require("event-dispatcher").global(),HeaderView=BaseView.extend({el:".page-header",initialize:function(options){this.userModel=options.userModel,this.el.querySelector(".header-navigation")&&this.addSubview(new HeaderNavigationView({model:this.userModel,el:".header-navigation"})),!Config.get("suppressGlobalSearchFormView",!1)&&this.el.querySelector(".header-search")&&this.addSubview(new SearchFormView({el:".header-search .search-form"})),this.listenTo(EventDispatcher,"headerNavigation:searchToggle",this.onHeaderNavigationSearchToggle)},onHeaderNavigationSearchToggle:function(){this.el.classList.toggle("is-search-expanded")}});module.exports=HeaderView},{"../../../../Components/SearchForm/_search_form":4,"../../../../Site/Components/HeaderNavigation/_header_navigation":7,"base-view":"base-view","event-dispatcher":"event-dispatcher","meta-config":"meta-config"}],4:[function(require,module,exports){var _=require("underscore"),BaseView=require("base-view"),EventDispatcher=require("event-dispatcher").global(),SearchSuggestionsView=require("../SearchSuggestions/_search_suggestions"),SearchFormView=BaseView.extend({el:".search-form",events:{submit:"onSubmit","keyup .search-form-input":"toggleResetButton","click .icon-reset":"onReset"},initialize:function(){this.el&&(this.searchTermInput=this.el.querySelector(".search-form-input"),this.searchTermInput&&(this.searchTermInput.addEventListener("animationend",this.onAnimationEnd.bind(this)),this.addSubview({suggest:new SearchSuggestionsView({el:".search-form-input",limit:5})}),this.listenTo(EventDispatcher,"headerNavigation:searchToggle",this.onToggle.bind(this)),this.toggleResetButton()))},onSubmit:function(event){var query=this.searchTermInput.value||"",query_set=!!query.length,blocked=this.el.classList.contains("search-form-submitting"),cancel=function(){event.preventDefault(),event.stopImmediatePropagation()};return blocked?void cancel():query_set?(this.el.classList.add("search-form-submitting"),_.delay(this.onSubmittingEnd,800,this),EventDispatcher.trigger("search_form:submit",{q:query},event),void this.trackSearchSubmit(event,query)):(cancel(),void this.searchTermInput.classList.add("error-animation"))},onAnimationEnd:function(){this.searchTermInput.classList.remove("error-animation")},onSubmittingEnd:function(_this){_this.el.classList.remove("search-form-submitting")},onReset:function(event){event.preventDefault(),this.searchTermInput.value="",this.toggleResetButton();var inputContainer=this.el.querySelector(".keyword-input-container");inputContainer&&inputContainer.classList.add("is-empty")},onToggle:function(){this.searchTermInput.focus()},toggleResetButton:function(){var inputField=document.getElementById("search-form-input"),resetButton=document.querySelector(".icon-reset");inputField&&resetButton&&(inputField.value?resetButton.style.display="block":resetButton.style.display="none");var inputContainer=this.el.querySelector(".keyword-input-container");inputContainer&&inputContainer.classList.add("is-empty")},trackSearchSubmit:function(event,query){var payload={target:"headerSearchSubmitButton"};try{Object.assign(payload,{id:event.target.id||"",action:event.type||"",metadata:{search_keyword:query}})}catch(e){payload.exception_message=e.message}EventDispatcher.trigger("ping","ui",payload)}});module.exports=SearchFormView},{"../SearchSuggestions/_search_suggestions":5,"base-view":"base-view","event-dispatcher":"event-dispatcher",underscore:"underscore"}],5:[function(require,module,exports){var _=require("underscore"),BaseView=require("base-view"),EventDispatcher=require("event-dispatcher").global(),Config=require("meta-config").global(),ElementHelper=require("element-helper"),SelectorHelper=require("../../Site/Resources/_selector_helper.js"),Request=require("page-token-request"),SearchSuggestionsView=(require("meta-dictionary").global(),BaseView.extend({defaults:{minimumCharacters:1,limit:Number.POSITIVE_INFINITY},selectedSuggestionIndex:-1,maxSelectedSuggestionIndex:-1,lastQuery:"",events:{focus:"onFocus",blur:"hideSuggestions",keyup:"checkKeyPress"},initialize:function(options){this.options=Object.assign({},this.defaults,options),this.options.url=this.options.url||Config.get("searchSuggestionsUrl","/"),this.ignoreMouseUp=!1,this.customContainer=!1,this.options.containerElement?(this.customContainer=!0,this.suggestionsContainer=this.options.containerElement):this.createContainer(),this.debouncedFetchSuggestions=_.debounce(this.fetchSuggestions.bind(this),150),this.suggestionsContainer.addEventListener("mousedown",this.onSuggestionSelection.bind(this)),this.suggestionsContainer.addEventListener("mouseup",this.onMouseUp.bind(this)),this.suggestionsContainer.addEventListener("touchstart",this.onSuggestionSelection.bind(this)),Config.get("isMobile",!1)||document.body.addEventListener("click",this.closeOnClick.bind(this)),this.customContainer||window.addEventListener("resize",_.throttle(function(event){this.suggestionsContainer.style.minWidth=this.el.offsetWidth+"px"}.bind(this),250))},fetchSuggestions:function(){var value=this.el.value;value.length>=this.options.minimumCharacters&&this.suggestionsContainer?this.fetchWithQuery(value):this.hideSuggestions()},onFocus:function(){var value=this.el.value;value.length>=this.options.minimumCharacters&&this.suggestionsContainer&&this.fetchWithQuery(value)},fetchWithQuery:function(query){var trimmedQuery=query.trim();trimmedQuery!==this.lastQuery?(this.lastQuery=trimmedQuery,this._xhr&&this._xhr.abort&&this._xhr.abort(),this._xhr=new XMLHttpRequest,Request.getJSON(this.options.url,{params:{q:trimmedQuery},xhr:this._xhr}).then(this.renderSuggestions.bind(this)).catch(function(){})):this.showSuggestions()},createContainer:function(){var docFrag=document.createDocumentFragment(),div=document.createElement("DIV");div.classList.add("suggestions-container"),docFrag.appendChild(div),this.el.parentNode.insertBefore(docFrag,this.el.nextSibling),this.suggestionsContainer=this.el.nextSibling,this.suggestionsContainer.style.minWidth=this.el.offsetWidth+"px",this.hideSuggestions()},renderSuggestions:function(results){if(results.length){for(var docFrag=document.createDocumentFragment(),div=document.createElement("DIV"),i=0;i<results.length&&i<this.options.limit;i++){var element=document.createElement("DIV");element.classList.add("suggestion-item"),element.dataset.value=results[i],element.dataset.index=i,element.textContent=results[i],div.appendChild(element)}docFrag.appendChild(div),this.suggestionsContainer.innerHTML="",this.selectedSuggestionIndex=-1,this.maxSelectedSuggestionIndex=i-1,this.suggestionsContainer.appendChild(docFrag),this.showSuggestions()}},onSuggestionSelection:function(event){event.preventDefault(),event.stopImmediatePropagation();var element=event.target||event.srcElement;element.dataset.value&&(this.el.value=element.dataset.value,ElementHelper.createAndDispatchNativeEvent(this.el,"change"),this.el.blur(),ElementHelper.createAndDispatchNativeEvent(this.el,"blur"),this.ignoreMouseUp=!0,EventDispatcher.trigger("SearchSuggestion:selected",element.dataset.value,event))},onMouseUp:function(event){this.ignoreMouseUp&&(event.preventDefault(),event.stopImmediatePropagation(),this.ignoreMouseUp=!1)},closeOnClick:function(event){if("none"!==this.suggestionsContainer.style.display){var target=event.target||event.srcElement;if(target){SelectorHelper.getClosest(target,".suggestion-group")||this.hideSuggestions()}}},checkKeyPress:function(event){40===event.keyCode||38===event.keyCode?setTimeout(this.suggestionSelectionOnKeyInput.bind(this,event),0):this.debouncedFetchSuggestions()},suggestionSelectionOnKeyInput:function(event){switch(event.keyCode){case 38:this.selectedSuggestionIndex=this.selectedSuggestionIndex-1<0?this.selectedSuggestionIndex:this.selectedSuggestionIndex-1;break;case 40:this.selectedSuggestionIndex=this.selectedSuggestionIndex+1>this.maxSelectedSuggestionIndex?this.maxSelectedSuggestionIndex:this.selectedSuggestionIndex+1;break;default:return}if(this.selectedSuggestionIndex>=0){var item=this.suggestionsContainer.querySelector('.suggestion-item[data-index="'+this.selectedSuggestionIndex+'"]');if(item){for(var items=this.suggestionsContainer.querySelectorAll(".suggestion-item"),i=0;i<items.length;i++)items[i].classList.remove("highlighted");item.classList.add("highlighted"),this.el.value=item.dataset.value}}},showSuggestions:function(){this.suggestionsContainer&&(this.suggestionsContainer.style.display="")},hideSuggestions:function(){this.selectedSuggestionIndex=-1,this.maxSelectedSuggestionIndex=-1,this.suggestionsContainer&&(this.suggestionsContainer.style.display="none")}}));module.exports=SearchSuggestionsView},{"../../Site/Resources/_selector_helper.js":13,"base-view":"base-view","element-helper":"element-helper","event-dispatcher":"event-dispatcher","meta-config":"meta-config","meta-dictionary":"meta-dictionary","page-token-request":"page-token-request",underscore:"underscore"}],6:[function(require,module,exports){var _=require("underscore"),BaseView=require("base-view"),EventDispatcher=require("event-dispatcher").global(),CurrencySelectorView=BaseView.extend({el:"#currency-selector",events:{change:"onChange"},initialize:function(){this.options=this.el?this.el.querySelectorAll("option")||[]:[]},onChange:function(event){var selectedOption,currencyId,payload={target:"CurrencySelector"};if(event.preventDefault(),void 0!==this.el.selectedIndex){selectedOption=this.options[this.el.selectedIndex],currencyId=selectedOption.value;try{_.extend(payload,{id:event.target.getAttribute("id")||"",action:event.type,metadata:{currency_id:currencyId}})}catch(e){_.extend(payload,{exception_message:e.message})}EventDispatcher.trigger("ping","ui",payload),_.existy(currencyId)&&this.model.setCurrency(currencyId)}}});module.exports=CurrencySelectorView},{"base-view":"base-view","event-dispatcher":"event-dispatcher",underscore:"underscore"}],7:[function(require,module,exports){var _=require("underscore"),BaseView=require("base-view"),EventDispatcher=require("event-dispatcher").global(),LoginModalView=require("./../../../Site/Components/LoginModal/_login_modal"),Config=require("meta-config").global(),WishlistButtonOnHeaderView=require("./_wishlist_button_on_header"),Modal=require("modal"),userLoggedInTemplate=require("./_user_logged_in.smarty.tpl"),Cookies=require("js-cookie"),HeaderNavigationView=BaseView.extend({el:".header-navigation",events:{"click .logout-link":"onLogoutClick","click .header-navigation-user .header-navigation-title":"onSignupClick","click .header-navigation-search-toggle":"onSearchToggleClick","click .header-navigation-trip a":"onTripClick"},initialize:function(){this.addSubview(new WishlistButtonOnHeaderView({model:this.model})),this.listenTo(this.model,"change",this.onModelChange),this.addHoverListeners(this.el.querySelectorAll(".header-navigation-submenu")),setTimeout(this.showPopup.bind(this),1500)},showPopup:function(){var counterEl=this.el.querySelector(".header-navigation-title-amount");this.popup=document.getElementById("customer-history-notification"),this.popup&&!Cookies.get("historyNotificationOff")&&(this.dismissButton=this.popup.querySelector(".notification-dismiss"),this.popup.classList.add("is-visible"),this.dismissButton.addEventListener("click",this.dismissHistoryNotification.bind(this)),this.dismissButton.classList.remove("hide")),counterEl&&counterEl.classList.add("pulse")},dismissHistoryNotification:function(event){return event.preventDefault(),Cookies.set("historyNotificationOff",!0,{path:"/",expires:178}),this.el.querySelector(".header-navigation-history").classList.remove("has-hover-effect"),this.popup.classList.remove("is-visible"),!1},addHoverListeners:function(elems){for(var i=0;i<elems.length;i++)Modernizr.touchevents||elems[i].addEventListener("mouseenter",this.onSubMenuMouseEnter),elems[i].addEventListener("click",this.onSubMenuClick),elems[i].addEventListener("mouseleave",this.onSubMenuMouseLeave)},onModelChange:function(){var changed=this.model.changedAttributes();changed.hasOwnProperty("cart")&&this.renderCart(),changed.hasOwnProperty("customer")&&this.renderLogin()},renderCart:function(){var titleEl=this.el.querySelector(".header-navigation-cart .header-navigation-title");if(titleEl){var amountEl=titleEl.querySelector(".cart-items-count"),itemsInCart=this.model.get("cart")||0;itemsInCart>0?titleEl.classList.add("header-navigation-title--has-amount"):titleEl.classList.remove("header-navigation-title--has-amount"),amountEl.textContent=itemsInCart}},renderLogin:function(){if(Config.get("headerNavShowUser",!1)){var template,userElems=this.el.querySelectorAll(".header-navigation-user"),customer=this.model.get("customer");if(customer){template=userLoggedInTemplate.render({headerNavCustomerFirstName:customer.first_name||""});for(var i=0;i<userElems.length;i++)userElems[i].innerHTML=template,userElems[i].classList.add("header-navigation-submenu");this.addHoverListeners(userElems)}else this.addLoginModalView()}},onSubMenuClick:function(event){event.currentTarget.classList.toggle("header-navigation-item--selected")},onSubMenuMouseEnter:function(event){event.currentTarget.classList.add("header-navigation-item--selected")},onSubMenuMouseLeave:function(event){event.currentTarget.classList.remove("header-navigation-item--selected")},addLoginModalView:function(){this.addSubview(new LoginModalView({model:this.model})),this.addSubview(new Modal({el:".login-modal-trigger"}))},onLogoutClick:function(event){this.facebook&&this.facebook.get("status")&&this.facebook.get("logged")&&(event.preventDefault(),this.listenTo(this.facebook,"facebook:logged_out",function(){window.location.href=event.target.href}),this.facebook.logout())},onSearchToggleClick:function(event){event.preventDefault(),Config.get("isMobile")?EventDispatcher.trigger("searchOverlay:open"):EventDispatcher.trigger("headerNavigation:searchToggle"),this.trackSearchIconClicked(event)},onSignupClick:function(event){var customer=this.model.get("customer");event.preventDefault(),customer||(Config.get("isMobile")?(EventDispatcher.trigger("views:loginModal:remove"),this.followLink(event)):this.openLoginModal(event))},onTripClick:function(){var payload={};try{Object.assign(payload,{id:this.el.id||"",target:"TripPage",action:"click"})}catch(e){Object.assign(payload,{exception_message:e.message})}EventDispatcher.trigger("ping","ui",payload)},openLoginModal:function(event){EventDispatcher.trigger("views:loginModal:render",event)},followLink:function(event){event.delegateTarget.dataset.hasOwnProperty("url")&&_.lengthy(event.delegateTarget.dataset.url)&&(window.location=event.delegateTarget.dataset.url)},trackSearchIconClicked:function(event){var payload={};try{Object.assign(payload,{id:event.target.id||"",action:event.type,target:"searchIconInHeader"})}catch(e){Object.assign(payload,{exception_message:e.message})}EventDispatcher.trigger("ping","ui",payload)}});module.exports=HeaderNavigationView},{"./../../../Site/Components/LoginModal/_login_modal":11,"./_user_logged_in.smarty.tpl":8,"./_wishlist_button_on_header":9,"base-view":"base-view","event-dispatcher":"event-dispatcher","js-cookie":1,"meta-config":"meta-config",modal:"modal",underscore:"underscore"}],8:[function(require,module,exports){module.exports=function(root){var __ret={render:function(__tn,__da){"object"==typeof __tn&&(__da=__tn,__tn=void 0),"string"==typeof __tn&&(__da=__da||{});var __f={isset:function(any){return void 0!==any}},__func={__fn__gygtext:function(params){try{return require("meta-dictionary").global().get(params.key)}catch(error){}}},__h="",__v=function(){for(var __va=Array.prototype.slice.call(arguments),__vi=0,__vl=__va.length;__vi<__vl;__vi++){var __vd=__va[__vi];if(void 0!=__vd&&""+__vd!="NaN")return"function"==typeof __vd?__vd():__vd}};return __h+="\t",__f.isset(__v(__da.headerNaveCustomerFirstName))&&(__h+='\t\t<span class="header-navigation-title icon icon-user" aria-haspopup="true">\t\t\t<span class="header-navigation-title-text">',__h+=__v(__da.headerNaveCustomerFirstName),__h+="</span>\t\t</span>\t"),__h+='\t<ul class="header-navigation-submenu-items">\t\t<li class="header-navigation-submenu-item">\t\t\t<a class="header-navigation-submenu-link" rel="nofollow" href="',__h+=__v(__da.customerBookingsUrl),__h+='">',__h+=__func.__fn__gygtext({key:"pModules_Header tickets"}),__h+='</a>\t\t</li>\t\t<li class="header-navigation-submenu-item">\t\t\t<a class="header-navigation-submenu-link" rel="nofollow" href="',__h+=__v(__da.customerProfileUrl),__h+='">',__h+=__func.__fn__gygtext({key:"pModules_Header settings"}),__h+='</a>\t\t</li>\t\t<li class="header-navigation-submenu-item">\t\t\t<a class="header-navigation-submenu-link logout-link" rel="nofollow" href="',__h+=__v(__da.logoutUrl),__h+='">',__h+=__func.__fn__gygtext({key:"pModules_Header logout"}),__h+="</a>\t\t</li>\t</ul>",__tn?__func["__fn__"+__tn](__da):__h}};return"object"==typeof exports&&"object"==typeof module&&(exports=module.exports=__ret),"function"==typeof define&&define.amd&&define(__ret),root._smartyTpl=__ret,__ret}(this)},{"meta-dictionary":"meta-dictionary"}],9:[function(require,module,exports){var BaseView=require("base-view"),EventDispatcher=require("event-dispatcher").global(),WishlistButtonOnHeaderView=BaseView.extend({el:".header-navigation-wishlist",initialize:function(options){this.options=Object.assign({},this.defaults,options||{}),this.listenTo(EventDispatcher,"wishlistItem:update",this.updateWishlistCounter.bind(this)),this.listenTo(this.model,"sync",this.onModelSync.bind(this))},onModelSync:function(){this.updateWishlistCounter()},updateWishlistCounter:function(){var lists=this.model.get("lists"),wishlist=lists.wishlist||null;null!==wishlist&&void 0!==wishlist.items.length&&this.updateAmount(wishlist.items.length)},updateAmount:function(total){var titleEl=this.el.querySelector(".header-navigation-title"),amountEl=titleEl.querySelector(".wishlist-items-count"),feedbackCounter=document.getElementById("wishlisted-amount");total=total||0,total>0?titleEl.classList.add("header-navigation-title--has-amount"):titleEl.classList.remove("header-navigation-title--has-amount"),amountEl.textContent=total,feedbackCounter&&(feedbackCounter.textContent=total)}});module.exports=WishlistButtonOnHeaderView},{"base-view":"base-view","event-dispatcher":"event-dispatcher"}],10:[function(require,module,exports){var _=require("underscore"),Cookies=require("js-cookie"),BaseView=require("base-view"),EventDispatcher=require("event-dispatcher").global(),Config=require("meta-config").global(),LanguageSelectorView=BaseView.extend({el:"#language-selector",events:{change:"onChange"},initialize:function(){this.options=this.el?this.el.querySelectorAll("option")||[]:[],this.destination="",EventDispatcher.on("router:change",this.onRouterChange.bind(this)),EventDispatcher.on("router:pageChange",this.onRouterChange.bind(this))},onChange:function(event){var selectedOption,destination,payload={target:"LanguageSelector"};if(event.preventDefault(),this.el.selectedIndex&&(selectedOption=this.options[this.el.selectedIndex],destination=selectedOption.value,_.lengthy(destination))){try{_.extend(payload,{id:event.target.getAttribute("id")||"",action:event.type,metadata:{destination:destination,language_id:selectedOption.getAttribute("data-language-id"),locale_code:selectedOption.getAttribute("data-locale-code")}}),Cookies.set("gyg_domain_switch",!0,{path:"/",expires:178})}catch(e){_.extend(payload,{exception_message:e.message})}EventDispatcher.trigger("ping","ui",payload),window.location.href=Config.get("localeHost","/")+"change-language?redirect="+encodeURIComponent(destination)}},onRouterChange:function(params,fragment){fragment&&Array.prototype.forEach.call(this.options,function(option){option.dataset.hasOwnProperty("url")&&_.lengthy(option.dataset.url)&&(option.value=option.dataset.url+fragment)})}});module.exports=LanguageSelectorView},{"base-view":"base-view","event-dispatcher":"event-dispatcher","js-cookie":1,"meta-config":"meta-config",underscore:"underscore"}],11:[function(require,module,exports){var BaseView=require("base-view"),EventDispatcher=require("event-dispatcher").global(),FacebookModel=require("../../../Site/Resources/_facebook"),Config=require("meta-config").global(),Request=require("page-token-request"),LoginModalView=BaseView.extend({el:"#login-modal",defaults:{target:window.location.href||"",contentContainerClassName:"login-signup-container-modal",loginFormContainerClassName:"login-data",facebookFormContainerClassName:"facebook-form",loginFormEndpoint:"/login-ajax/",errorContainerClassName:"modal-error"},facebookLogin:!1,events:{"submit .login-data":"onFormSubmit","click .btn-facebook":"onFacebookLogin","click .login-action":"showLoginForm"},initialize:function(options){this.options=Object.assign({},this.defaults,options||{}),EventDispatcher.on("views:loginModal:render",this.render.bind(this)),EventDispatcher.on("views:loginModal:remove",this.remove.bind(this))},render:function(){this.facebook||(this.facebook=new FacebookModel),this.showLoginForm()},remove:function(){this.el.remove()},showLoginForm:function(event){event&&event.preventDefault(),this.showLoginSpinner(),this.mode="login",Request.getJSON(this.options.loginFormEndpoint).then(this.addForm.bind(this)).catch(this.failedForm.bind(this))},failedForm:function(){var loginPageURL=Config.get("localeHost","/")+"signup";this.hideLoginSpinner(),this.el.querySelector(".modal-close").click(),window.location.href=loginPageURL},addForm:function(response){var content=response.data.content||"",loginForm=document.querySelector("."+this.options.loginFormContainerClassName),nextUrl=window.location.pathname||"/";loginForm&&this.addHiddenInputToForm("next",nextUrl,loginForm);var contentContainer=document.querySelector("."+this.options.contentContainerClassName);contentContainer&&(contentContainer.innerHTML=content),this.hideLoginSpinner()},onFormSubmit:function(event){event.preventDefault();var loginForm=document.querySelector("."+this.options.loginFormContainerClassName);loginForm&&Request.postJSON(this.options.loginFormEndpoint,{formData:new FormData(loginForm)}).then(this.onSubmitResponse.bind(this)).catch(this.failedForm.bind(this)),this.showLoginSpinner()},onSubmitResponse:function(response){for(var status=response.status,payload={action_type:this.mode,facebook:this.facebookLogin},errorContainer=document.querySelectorAll("."+this.options.errorContainerClassName),i=0;i<errorContainer.length;i++)errorContainer[i].style.display="none";"error"===status||"fail"===status?this.onFormSubmitError(response):(Config.set("isLoggedIn",!0),Config.set("customerId",String(response.data.customerId)),payload=Object.assign(payload,{user:{visitor_id:Config.get("visitorId"),customer_id:Config.get("customerId"),is_logged_in:Config.get("isLoggedIn",!1),session_id:Config.get("sessionId"),currency:Config.get("currencyCode"),locale_code:Config.get("localeCode")}}),EventDispatcher.trigger("ping","action",payload),window.location.reload())},onFormSubmitError:function(response){if("error"===response.status){for(var errorContainer=document.querySelectorAll("."+this.options.errorContainerClassName),i=0;i<errorContainer.length;i++)errorContainer[i].style.display="block",errorContainer[i].innerHTML=response.message;this.hideLoginSpinner()}else this.addForm(response)},onFacebookLoginStatus:function(accessToken){var facebookForm=document.querySelector("."+this.options.facebookFormContainerClassName),nextUrl=window.location.pathname||"/";facebookForm&&void 0!==accessToken&&(this.facebookLogin=!0,this.showLoginSpinner(),this.addHiddenInputToForm("access_token",accessToken,facebookForm),this.addHiddenInputToForm("next",nextUrl,facebookForm),Request.postJSON("/login-facebook-ajax/",{formData:new FormData(facebookForm)}).then(this.onSubmitResponse.bind(this)).catch(this.failedForm.bind(this)))},onFacebookLogin:function(event){event.preventDefault(),this.listenTo(this.facebook,"facebook:logged_in",this.onFacebookLoginStatus.bind(this)),this.facebook.login()},showLoginSpinner:function(){var spinner=this.el.querySelector(".spinner");spinner&&(spinner.style.display="block")},hideLoginSpinner:function(){var spinner=this.el.querySelector(".spinner");spinner&&(spinner.style.display="none")},addHiddenInputToForm:function(name,value,form){var hiddenInput=document.createElement("INPUT");hiddenInput.setAttribute("type","hidden"),hiddenInput.setAttribute("name",name),hiddenInput.setAttribute("value",value),form.appendChild(hiddenInput)}});module.exports=LoginModalView},{"../../../Site/Resources/_facebook":12,"base-view":"base-view","event-dispatcher":"event-dispatcher","meta-config":"meta-config","page-token-request":"page-token-request"}],12:[function(require,module,exports){var _=require("underscore"),Backbone=require("backbone"),Config=require("meta-config").global(),FacebookModel=Backbone.Model.extend({defaults:{status:null,logged:!1,failed:!1},initialize:function(){var _this=this;window.fbAsyncInit=function(){FB.init({appId:Config.get("facebookAppId"),status:!0,cookie:!0,xfbml:!0,version:"v2.2"}),_this.fetch()};var fbRoot=document.createElement("DIV");fbRoot.id="fb-root",document.body.appendChild(fbRoot),function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];d.getElementById(id)||(js=d.createElement(s),js.id=id,js.async=!0,js.src="//connect.facebook.net/"+Config.get("localeCode").replace("-","_")+"/sdk.js",fjs.parentNode.insertBefore(js,fjs))}(document,"script","facebook-jssdk")},fetch:function(){var _this=this;this.set("failed",Config.get("loginFailed",!1)),this.get("failed")||FB.getLoginStatus(function(response){_this.set("status",response.status),_this.set("logged","connected"===response.status),_.existy(response.authResponse)&&_.existy(response.authResponse.accessToken)&&_this.trigger("facebook:logged_in",response.authResponse.accessToken)})},login:function(){var _this=this,opts={scope:Config.get("facebookScope")};FB.login(function(response){_this.set("status",response.status),_this.set("logged","connected"===response.status),_.existy(response.authResponse)&&_.existy(response.authResponse.accessToken)&&_this.trigger("facebook:logged_in",response.authResponse.accessToken)},opts)},logout:function(){function onLogout(){_this.get("logged")?FB.logout(function(){_this.set("status","unknown"),_this.set("logged",!1),_this.trigger("facebook:logged_out")}):_this.trigger("facebook:logged_out")}var _this=this;_.existy(this.get("status"))?onLogout():(this.fetch(),this.on("change:status",onLogout))}});module.exports=FacebookModel},{backbone:"backbone","meta-config":"meta-config",underscore:"underscore"}],13:[function(require,module,exports){var SelectorHelpers={getClosest:function(elem,selector){var attribute,value,firstChar=selector.charAt(0),supports="classList"in document.documentElement;for("["===firstChar&&(selector=selector.substr(1,selector.length-2),attribute=selector.split("="),attribute.length>1&&(value=!0,attribute[1]=attribute[1].replace(/"/g,"").replace(/'/g,"")));elem&&elem!==document&&1===elem.nodeType;elem=elem.parentNode){if("."===firstChar)if(supports){if(elem.classList.contains(selector.substr(1)))return elem}else if(new RegExp("(^|\\s)"+selector.substr(1)+"(\\s|$)").test(elem.className))return elem;if("#"===firstChar&&elem.id===selector.substr(1))return elem;if("["===firstChar&&elem.hasAttribute(attribute[0])){if(!value)return elem;if(elem.getAttribute(attribute[0])===attribute[1])return elem}if(elem.tagName.toLowerCase()===selector)return elem}return null},getParent:function(elem,selector){return this.getClosest(elem.parentNode,selector)},getParents:function(elem,selector){var firstChar,parents=[];for(selector&&(firstChar=selector.charAt(0));elem&&elem!==document;elem=elem.parentNode)selector?("."===firstChar&&elem.classList.contains(selector.substr(1))&&parents.push(elem),"#"===firstChar&&elem.id===selector.substr(1)&&parents.push(elem),"["===firstChar&&elem.hasAttribute(selector.substr(1,selector.length-1))&&parents.push(elem),
elem.tagName.toLowerCase()===selector&&parents.push(elem)):parents.push(elem);return 0===parents.length?null:parents},getSiblings:function(elem){var siblings,parentNode=elem&&1===elem.nodeType?elem.parentNode:null;return parentNode&&(siblings=function(list){for(var children=parentNode.children,childrenMapped=[],i=0;i<children.length;i++)childrenMapped.push(children[i]);return childrenMapped}(parentNode),siblings.length>0)?siblings:null},getSibling:function(elem,selector){function getClosest(sibiling){return this.getClosest(sibiling,selector)}var siblings=this.getSiblings(elem);return siblings?function(list,check){for(var item,i=0;i<list.length;i++)if(item=list[i],check(item))return item;return null}(siblings,getClosest.bind(this)):null}};module.exports=SelectorHelpers},{}],branding:[function(require,module,exports){var BaseView=require("base-view"),HeaderView=require("./Components/Header/_header"),FooterView=require("./Components/Footer/_footer"),CurrencySelectorView=require("../../Site/Components/CurrencySelector/_currency_selector"),LanguageSelectorView=require("../../Site/Components/LanguageSelector/_language_selector"),DefaultBrandingView=BaseView.extend({initialize:function(options){this.addSubview(new HeaderView({userModel:options.user,currencyModel:options.currency})),this.addSubview(new FooterView),this.addSubview(new CurrencySelectorView({model:options.currency})),this.addSubview(new LanguageSelectorView)}});module.exports=DefaultBrandingView},{"../../Site/Components/CurrencySelector/_currency_selector":6,"../../Site/Components/LanguageSelector/_language_selector":10,"./Components/Footer/_footer":2,"./Components/Header/_header":3,"base-view":"base-view"}]},{},["branding"]);