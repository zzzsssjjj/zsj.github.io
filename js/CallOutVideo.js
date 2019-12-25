if( typeof (Widgets) == 'undefined') {
	var Widgets = Class.create();
}


//新闻页头部图片切换
Widgets.CallOutVideo = Class.create();
Object.extend(Widgets.CallOutVideo.prototype, {
    //服务器端方法
    server: {
        //获取预告片信息
        getVideoInfo: function (videoId, clientCallBack) {
            return Mtime.Component.Ajax.request(siteApiUrl, 'Mtime.Api.Pages.VideoService', 'GetVideoInfo', [videoId], clientCallBack, '/Service/Video.api?Ajax_CallBack=true', 'get', '10000');
        }
    },
    options: {
        // 监听容器
        slidesRegion: 'slides',

        playerWidth: 1000,
        playerHeight: 563,
        mp4Template: '<video width="1000" height="563" x-webkit-airplay="allow" controls="true" preload="none" src="#{mp4URL}"></video>',
        webTemplate: '<object width="#{width}" height="#{height}" autoactive="true" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="videoplayer" name="flashfirebug0"><param value="#{swfPath}?vid=#{vid}&autoplay=1&w=#{width}&h=#{height}#{debug}" name="movie"><param value="high" name="quality"><param value="true" name="allowFullScreen"><param value="false" name="menu"><param value="transparent" name="wmode"><param value="always" name="allowScriptAccess"><embed width="#{width}" height="#{height}" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="#{swfPath}?vid=#{vid}&autoplay=1&w=#{width}&h=#{height}#{debug}" play="true" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" id="flashfirebug0" name="flashfirebug0"></object>',
        webVideoUrlTemplate: '<object width="#{width}" height="#{height}" autoactive="true" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="videoplayer" name="flashfirebug0"><param value="#{swfPath}?videourl=#{videourl}&autoplay=1&w=#{width}&h=#{height}#{debug}" name="movie"><param value="high" name="quality"><param value="true" name="allowFullScreen"><param value="false" name="menu"><param value="transparent" name="wmode"><param value="always" name="allowScriptAccess"><embed width="#{width}" height="#{height}" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="#{swfPath}?videourl=#{videourl}&autoplay=1&w=#{width}&h=#{height}#{debug}" play="true" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" id="flashfirebug0" name="flashfirebug0"></object>',
        //回调返回上下两个视频 
        callback: null
    },
    initialize: function (options) {
        this.setOptions(options);
        this.initializeDom();
        this.initializeEvent();
        this.load();
    },
    setOptions: function (options) {
        Object.extend(Object.extend(this, this.options), options);
    },
    initializeDom: function () {
        this.$slidesRegion = $(this.slidesRegion);
        this.isBrowser = this.browserRedirect();
        if (!this.isBrowser) {
            window.videoPlayStop = this.outVideoPlayStop.bind(this);
            window.videoPlayPlay = this.outVideoPlayPlay.bind(this);
        }

    },
    initializeEvent: function () {
        //Widgets.SlidesControl.prototype.initializeEvent.apply(this);
        this.onClickSlidesRegionHandler = this.onClickSlidesRegion.bind(this);
        this.$slidesRegion && Event.observe(this.$slidesRegion, 'click', this.onClickSlidesRegionHandler);

        Event.observe(window, "unload", this.close.bind(this));
    },
    onClickSlidesRegion: function (evt) {
        var el = Event.element(evt), vid, videourl, parentEl;
        if (el) {
            vid = el.getAttribute("vid");
            if (!vid) {
                parentEl = el.up();
                if (parentEl) {
                    vid = parentEl.getAttribute("vid");
                }
                if (!vid) {
                    parentEl = parentEl.up();
                    if (parentEl) {
                        vid = parentEl.getAttribute("vid");
                    }
                }
            }
            if (vid) {
                vid = parseInt(vid, 10);
                this.videoBuilder(vid);
            }

            videourl = el.getAttribute("videourl");
            if (!videourl) {
                parentEl = el.up();
                if (parentEl) {
                    videourl = parentEl.getAttribute("videourl");
                }
                if (!videourl) {
                    parentEl = parentEl.up();
                    if (parentEl) {
                        videourl = parentEl.getAttribute("videourl");
                    }
                }
            }
            if (videourl) {
                this.videoUrlBuilder(videourl);
            }
        }
    },
    videoBuilder: function (vid) {
        // debug
        if (vid != "" && vid != "0") {
            if (this.isBrowser) {
                this.getmp4URL(vid, 'vid');
            } else {
                var jsServer = 'http://static1.mtime.cn/static/', _html;
                if(window.jsServer){
                    jsServer = window.jsServer;
                }
                this.playerTemplate = '<div class="transition4" style="opacity: 0;"><div class="ele_videobg" style="height:#{bodyheight}px;"></div><div class="ele_videoinner"><a class="close" id="videoclose">关闭视频</a>' + this.webTemplate + '</div></div>';
                var template = new Template(this.playerTemplate);
                var node = template.evaluate({
                    vid: vid,
                    bodyheight: document.body.offsetHeight,
                    width: this.playerWidth,
                    height: this.playerHeight,
                    swfPath: jsServer + 'flash/newvideoplayer.swf',
                    debug: debug ? '&debug=true' : ''
                });
                this.videoBuilderMethod(node);
            }
        }
    },
    videoUrlBuilder: function (videourl) {
        // debug
        if (videourl && videourl != '') {
            if (this.isBrowser) {
                this.getmp4URL(vid, 'videourl');
            } else {
                var jsServer = 'http://static1.mtime.cn/static/', _html;
                if(window.jsServer){
                    jsServer = window.jsServer;
                }
                this.playerTemplate = '<div class="transition4" style="opacity: 0;"><div class="ele_videobg" style="height:#{bodyheight}px;"></div><div class="ele_videoinner"><a class="close" id="videoclose">关闭视频</a>' + this.webVideoUrlTemplate + '</div></div>';
                var template = new Template(this.playerTemplate);
                var node = template.evaluate({
                    videourl: videourl,
                    bodyheight: document.body.offsetHeight,
                    width: this.playerWidth,
                    height: this.playerHeight,
                    swfPath: '/images/DisneyPlayer2.swf',
                    debug: debug ? '&debug=true' : ''
                });
                this.videoBuilderMethod(node);
            }
        }
    },
    videoBuilderMethod: function (node) {
        this.$playerContainer = Builder.build(node);
        document.body.appendChild(this.$playerContainer);
        this.$playerContainer.show();
        this.$playerContainer.style.opacity = 1;
        this.$closeBtn = $('videoclose');
        this.$videoplayer = $('videoplayer');
        Event.observe(this.$closeBtn, 'click', this.closeBtnClick.bind(this));
    },
    getmp4URL: function (vid, type) {
        var template, node;
        if(type === 'vid'){
            if (vid) {
                this.server.getVideoInfo(vid, function (result) {
                    if (result && result.value && result.value.mp4URL) {
                        this.playerTemplate = this.playerTemplate = '<div class="transition4" style="opacity: 0;"><div class="ele_videobg" style="height:#{bodyheight}px;"></div><div class="ele_videoinner"><a class="close" id="videoclose" style="zoom:2; top:-50px;">关闭视频</a>' + this.mp4Template + '</div></div>';
                        template = new Template(this.playerTemplate);
                        node = template.evaluate({
                            bodyheight: document.body.offsetHeight,
                            mp4URL: result.value.mp4URL,
                            debug: debug ? '&debug=true' : ''
                        });
                        this.videoBuilderMethod(node);
                    }
                } .bind(this));
            }
        }else{
            this.playerTemplate = this.playerTemplate = '<div class="transition4" style="opacity: 0;"><div class="ele_videobg" style="height:#{bodyheight}px;"></div><div class="ele_videoinner"><a class="close" id="videoclose" style="zoom:2; top:-50px;">关闭视频</a>' + this.mp4Template + '</div></div>';
            template = new Template(this.playerTemplate);
            node = template.evaluate({
                bodyheight: document.body.offsetHeight,
                mp4URL: vid,
                debug: debug ? '&debug=true' : ''
            });
            this.videoBuilderMethod(node);
        }
    },
    outVideoPlayStop: function () {
        this.$playerContainer.style.opacity = 0;
        setTimeout(function () {
            this.$playerContainer.remove();
        } .bind(this), 1000);
    },
    outVideoPlayPlay: function () {
        // 视频开始播放
        this.$closeBtn.addClassName('transition5');

        if (Mtime.browser.ie && Mtime.browser.ie < 9) {
            this.$closeBtn.hide();
        } else {
            this.$closeBtn.style.opacity = 0;
        };
        Event.observe(this.$videoplayer, 'mouseover', this.videoplayerOver.bind(this));
        Event.observe(this.$videoplayer, 'mouseout', this.videoplayerOut.bind(this));
        Event.observe(this.$closeBtn, 'mouseover', this.closeBtnOver.bind(this));
    },

    closeBtnClick: function (evt) {
        evt && Event.stop(evt);
        this.$playerContainer.hide();
        this.$playerContainer.innerHTML = '';
        Event.stopObserving(this.$videoplayer, 'mouseover', this.videoplayerOver.bind(this));
        Event.stopObserving(this.$videoplayer, 'mouseout', this.videoplayerOut.bind(this));
        Event.stopObserving(this.$closeBtn, 'mouseover', this.closeBtnOver.bind(this));
        Event.stopObserving(this.$closeBtn, 'click', this.closeBtnClick.bind(this));
        this.$closeBtn = null;
    },

    videoplayerOver: function (evt) {
        var el = Event.element(evt);
        if (this.$playerContainer === el.up('.transition4')) {
            if (Mtime.browser.ie && Mtime.browser.ie < 9) {
                this.$closeBtn.show();
            } else {
                this.$closeBtn.style.opacity = 1;
            }
        }
    },
    videoplayerOut: function (evt) {
        if (this.playerContainerTimeout !== null) {
            clearTimeout(this.playerContainerTimeout);
        }
        this.playerContainerTimeout = FunctionExt.defer(function () {
            var el = Event.element(evt);
            if (this.$playerContainer === el.up('.transition4')) {
                if (Mtime.browser.ie && Mtime.browser.ie < 9) {
                    this.$closeBtn.hide();
                } else {
                    this.$closeBtn.style.opacity = 0;
                }
            }
        }, 200, this);
    },
    closeBtnOver: function (evt) {
        if (this.playerContainerTimeout !== null) {
            clearTimeout(this.playerContainerTimeout);
        }
    },

    load: function () {

    },
    browserRedirect: function () {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphone = sUserAgent.match(/iphone/i) == "iphone";
        var bIsIpod = sUserAgent.match(/iphone/i) == "ipod";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

        if (bIsIpad || bIsIphone || bIsIpod || bIsAndroid || bIsWM) {
            return true;
        }
        return false;
    },

    close: function () {
        this.destroyEvent();
        this.destroyDOM();
        this.destroyField();
    },
    destroyField: function () {
    },
    destroyEvent: function () {
        if(this.$slidesRegion){
            Event.stopObserving(this.$slidesRegion, 'click', this.onClickSlidesRegionHandler);
        }
    },
    destroyDOM: function () {
        this.$slidesRegion = null;
    }

});