!function(){function t(t){return t&&t.__esModule?t.default:t}var e,i,n={};e=n,i=function(){function t(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];if(i)for(var n in i)i.hasOwnProperty(n)&&(t[n]=i[n])}return t}function e(t,e){t&&e&&(t.className+=" "+e)}function i(t,e){t&&e&&(t.className=t.className.replace(new RegExp("(\\s|^)"+e+"(\\s|$)")," ").trim())}function n(t){var e=document.createElement("div");return e.innerHTML=t.trim(),e.childNodes[0]}function o(t,e){return(t.matches||t.matchesSelector||t.msMatchesSelector).call(t,e)}function s(t){this.init.apply(this,arguments)}return s.defaults={elementClass:"",elementLoadingClass:"slbLoading",htmlClass:"slbActive",closeBtnClass:"",nextBtnClass:"",prevBtnClass:"",loadingTextClass:"",closeBtnCaption:"Close",nextBtnCaption:"Next",prevBtnCaption:"Previous",loadingCaption:"Loading...",bindToItems:!0,closeOnOverlayClick:!0,closeOnEscapeKey:!0,nextOnImageClick:!0,showCaptions:!0,captionAttribute:"title",urlAttribute:"href",startAt:0,loadingTimeout:100,appendTarget:"body",beforeSetContent:null,beforeClose:null,afterClose:null,beforeDestroy:null,afterDestroy:null,videoRegex:new RegExp(/youtube.com|vimeo.com/)},t(s.prototype,{init:function(e){e=this.options=t({},s.defaults,e);var i,n=this;e.$items&&(i=e.$items.get()),e.elements&&(i=[].slice.call("string"==typeof e.elements?document.querySelectorAll(e.elements):e.elements)),this.eventRegistry={lightbox:[],thumbnails:[]},this.items=[],this.captions=[],i&&i.forEach((function(t,i){n.items.push(t.getAttribute(e.urlAttribute)),n.captions.push(t.getAttribute(e.captionAttribute)),e.bindToItems&&n.addEvent(t,"click",(function(t){t.preventDefault(),n.showPosition(i)}),"thumbnails")})),e.items&&(this.items=e.items),e.captions&&(this.captions=e.captions)},addEvent:function(t,e,i,n){return this.eventRegistry[n||"lightbox"].push({element:t,eventName:e,callback:i}),t.addEventListener(e,i),this},removeEvents:function(t){return this.eventRegistry[t].forEach((function(t){t.element.removeEventListener(t.eventName,t.callback)})),this.eventRegistry[t]=[],this},next:function(){return this.showPosition(this.currentPosition+1)},prev:function(){return this.showPosition(this.currentPosition-1)},normalizePosition:function(t){return t>=this.items.length?t=0:t<0&&(t=this.items.length-1),t},showPosition:function(t){var e=this.normalizePosition(t);return void 0!==this.currentPosition&&(this.direction=e>this.currentPosition?"next":"prev"),this.currentPosition=e,this.setupLightboxHtml().prepareItem(this.currentPosition,this.setContent).show()},loading:function(t){var n=this,o=this.options;t?this.loadingTimeout=setTimeout((function(){e(n.$el,o.elementLoadingClass),n.$content.innerHTML='<p class="slbLoadingText '+o.loadingTextClass+'">'+o.loadingCaption+"</p>",n.show()}),o.loadingTimeout):(i(this.$el,o.elementLoadingClass),clearTimeout(this.loadingTimeout))},prepareItem:function(t,e){var i=this,o=this.items[t];if(this.loading(!0),this.options.videoRegex.test(o))e.call(i,n('<div class="slbIframeCont"><iframe class="slbIframe" frameborder="0" allowfullscreen src="'+o+'"></iframe></div>'));else{var s=n('<div class="slbImageWrap"><img class="slbImage" src="'+o+'" /></div>');this.$currentImage=s.querySelector(".slbImage"),this.options.showCaptions&&this.captions[t]&&s.appendChild(n('<div class="slbCaption">'+this.captions[t]+"</div>")),this.loadImage(o,(function(){i.setImageDimensions(),e.call(i,s),i.loadImage(i.items[i.normalizePosition(i.currentPosition+1)])}))}return this},loadImage:function(t,e){if(!this.options.videoRegex.test(t)){var i=new Image;e&&(i.onload=e),i.src=t}},setupLightboxHtml:function(){var t=this.options;return this.$el||(this.$el=n('<div class="slbElement '+t.elementClass+'"><div class="slbOverlay"></div><div class="slbWrapOuter"><div class="slbWrap"><div class="slbContentOuter"><div class="slbContent"></div><button type="button" title="'+t.closeBtnCaption+'" class="slbCloseBtn '+t.closeBtnClass+'">×</button>'+(this.items.length>1?'<div class="slbArrows"><button type="button" title="'+t.prevBtnCaption+'" class="prev slbArrow'+t.prevBtnClass+'">'+t.prevBtnCaption+'</button><button type="button" title="'+t.nextBtnCaption+'" class="next slbArrow'+t.nextBtnClass+'">'+t.nextBtnCaption+"</button></div>":"")+"</div></div></div></div>"),this.$content=this.$el.querySelector(".slbContent")),this.$content.innerHTML="",this},show:function(){return this.modalInDom||(document.querySelector(this.options.appendTarget).appendChild(this.$el),e(document.documentElement,this.options.htmlClass),this.setupLightboxEvents(),this.modalInDom=!0),this},setContent:function(t){var o="string"==typeof t?n(t):t;return this.loading(!1),this.setupLightboxHtml(),i(this.$content,"slbDirectionNext"),i(this.$content,"slbDirectionPrev"),this.direction&&e(this.$content,"next"===this.direction?"slbDirectionNext":"slbDirectionPrev"),this.options.beforeSetContent&&this.options.beforeSetContent(o,this),this.$content.appendChild(o),this},setImageDimensions:function(){this.$currentImage&&(this.$currentImage.style.maxHeight=("innerHeight"in window?window.innerHeight:document.documentElement.offsetHeight)+"px")},setupLightboxEvents:function(){var t=this;return this.eventRegistry.lightbox.length||this.addEvent(this.$el,"click",(function(e){var i=e.target;o(i,".slbCloseBtn")||t.options.closeOnOverlayClick&&o(i,".slbWrap")?t.close():o(i,".slbArrow")?o(i,".next")?t.next():t.prev():t.options.nextOnImageClick&&t.items.length>1&&o(i,".slbImage")&&t.next()})).addEvent(document,"keyup",(function(e){t.options.closeOnEscapeKey&&27===e.keyCode&&t.close(),t.items.length>1&&((39===e.keyCode||68===e.keyCode)&&t.next(),(37===e.keyCode||65===e.keyCode)&&t.prev())})).addEvent(window,"resize",(function(){t.setImageDimensions()})),this},close:function(){this.modalInDom&&(this.runHook("beforeClose"),this.removeEvents("lightbox"),this.$el&&this.$el.parentNode.removeChild(this.$el),i(document.documentElement,this.options.htmlClass),this.modalInDom=!1,this.runHook("afterClose")),this.direction=void 0,this.currentPosition=this.options.startAt},destroy:function(){this.close(),this.runHook("beforeDestroy"),this.removeEvents("thumbnails"),this.runHook("afterDestroy")},runHook:function(t){this.options[t]&&this.options[t](this)}}),s.open=function(t){var e=new s(t);return t.content?e.setContent(t.content).show():e.showPosition(e.options.startAt)},s.registerAsJqueryPlugin=function(t){t.fn.simpleLightbox=function(e){var i,n=this;return this.each((function(){t.data(this,"simpleLightbox")||(i=i||new s(t.extend({},e,{$items:n})),t.data(this,"simpleLightbox",i))}))},t.SimpleLightbox=s},"undefined"!=typeof window&&window.jQuery&&s.registerAsJqueryPlugin(window.jQuery),s},"function"==typeof define&&define.amd?define([],i):n?n=i():e.SimpleLightbox=i();var o=[{preview:"https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",original:"https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",description:"Hokkaido Flower"},{preview:"https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",original:"https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",description:"Container Haulage Freight"},{preview:"https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",original:"https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",description:"Aerial Beach View"},{preview:"https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",original:"https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",description:"Flower Blooms"},{preview:"https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",original:"https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",description:"Alpine Mountains"},{preview:"https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",original:"https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",description:"Mountain Lake Sailing"},{preview:"https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",original:"https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",description:"Alpine Spring Meadows"},{preview:"https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",original:"https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",description:"Nature Landscape"},{preview:"https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",original:"https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",description:"Lighthouse Coast Sea"}];console.log(o);var s=document.querySelector(".gallery"),a=document.createElement("ul");a.classList.add("gallery");var r=o.map((function(t){var e=t.preview,i=t.original,n=t.description;return'<li><a class="gallery__item" href="'.concat(i,'">\n                    <img class="gallery__image" \n                    src="').concat(e,'" \n                    alt="').concat(n,'" />\n                </a></li>')})).join("");a.insertAdjacentHTML("beforeend",r),s.append(a),new(t(n))({elements:".gallery a"}).show()}();
//# sourceMappingURL=01-gallery.29c1c47d.js.map
