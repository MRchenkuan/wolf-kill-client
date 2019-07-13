var app = getApp();
module.exports = Behavior({
    properties: {
        /**
         * 播放视频：
         * 1、未加载视频组件或视频已播放完成。
         * 2、播放中。
         * 3、停止播放。
         */
        playStatus: {
            type: Number,
            value: 1,
            observer: function (newVal, oldVal, changedPath) {
                if (newVal != oldVal && newVal > 0) {
                    this.updatePlayerStatus(newVal);
                }
            }
        },
        // 是否显示全屏按钮
        showFullscreenBtn: { type: Boolean, value: false },
        // 视频播放进度
        timeUpdate: {
            type: Number,
            value: 0,
            observer: function (newVal, oldVal, changedPath) {
                if (newVal != oldVal) {
                    this.upTimeUpdate(newVal);
                }
            }
        },
        // 橱窗ID
        windId: { type: Number, value: 0 }
    },
    data: {
        // 视频是否处理全屏播放状态
        fullScreen: false,
        // 是否已播放完成
        playerEnded: false,
        // 视频缓存状态（是否已缓存过）
        videoCacheState: false,
    },
    methods: {
        /**
         * 是否处理全屏播放状态
         */
        isFullScreen: false,
        /**
         * 当前播放进度
         */
        videoTimeUpdate: 0,
        /**
         * 是否可重设播放进度
         */
        resetSeek: true,
        /**
         * 修改视频播放状态
         */
        updatePlayerStatus(playStatus) {
            this.setData({
                playStatus: playStatus
            }, ()=> {
                var videoContext = wx.createVideoContext('videoProduct', this);
                if (playStatus == 2) {
                    videoContext.play();
                }
                else if (playStatus == 3) {
                    if (this.fullScreen) {
                        //this.triggerEvent("player-click", this.data.key, this.data);
                    }
                    else {
                        videoContext.pause();
                    }
                }
                else if (playStatus == 1) {
                    videoContext.stop();
                }
            });
        },
        /**
         * 视频播放点击
         */
        onPlayerClick(e) {
            this.triggerEvent("player-click", {
                key: this.data.key,
                product: this.data,
                windId: this.data.windId
            });
        },
        /**
         * 暂停播放
         */
        videoPause() {
            return;
            this.setData({
                playStatus: 3
            });
            // 暂时执行以下代码，正在播放的视频，全屏会触发暂停事件。
            this.triggerEvent("player-pause", this.data.key, this.data);
        },
        /**
         * 播放完成
         */
        videoEnded() {
            // 苹果手机自动退出全屏有bug
            if (((app || {}).globalData || {}).isIPhone && this.fullScreen) {
                return;
            }
            this.videoTimeUpdate = 0;
            this.setData({
                timeUpdate: 0,
                playStatus: 1
            }, ()=> {
                var videoContext = wx.createVideoContext('videoProduct', this);
                if (this.fullScreen) {
                    this.fullScreen = false;
                    // 退出全屏播放状态
                    videoContext.exitFullScreen();
                    this.videoFullscreenchange({
                        detail: {
                            fullScreen: false
                        }
                    });
                }
                this.triggerEvent("player-ended", {
                    key: this.data.key,
                    product: this.data,
                    windId: this.data.windId
                });
            });
        },
        /**
         * 播放视频
         */
        videoPlay() {
            if (!this.data.videoCacheState) {
                this.setData({
                    videoCacheState: true
                });
            }
            // 暂时执行以下代码，开启后，点击全屏播放按钮后，播放暂停。
            if (this.data.playStatus != 2) {
                this.onPlayerClick();
            }
        },
        /**
         * 全屏播放状态
         */
        videoFullscreenchange(e) {
            this.fullScreen = e.detail.fullScreen;
            var objData = {
                key: this.data.key,
                product: this.data,
                fullScreen: e.detail.fullScreen,
                windId: this.data.windId
            }
            this.triggerEvent("player-fullscreen-change", objData);
        },
        /**
         * 在新的页面全屏播放
         */
        playNewPageFullscreen() {
            var objData = {
                key: this.data.key,
                product: this.data,
                timeUpdate: this.videoTimeUpdate,
                windId: this.data.windId
            }
            this.triggerEvent("play-newpage-fullscreen", objData);
        },
        /**
         * 视频播放进度
         */
        playTimeUpdate(e) {
            this.videoTimeUpdate = e.detail.currentTime;
            if (this.resetSeek == true) {
                var videoContext = wx.createVideoContext('videoProduct', this);
                videoContext.seek(this.data.timeUpdate);
                this.resetSeek = false;
            }
        },
        /**
         * 修改视频播放进度
         */
        upTimeUpdate(num) {
            this.resetSeek = true;
            var videoContext = wx.createVideoContext('videoProduct', this);
            videoContext.seek(num);
            if (this.data.playStatus == 2) {
                    videoContext.play();
            }
        }
    }
});
