window.onload = function(){
    // 对象收编变量
    var bird = {
        // 天空背景定位偏移量
        skyPosition: 0,
        // 天空移动的步长
        skyStep: 2,
        // 小鸟原来距离顶部的长度
        bridTop:235,
        // 开始按钮的颜色类名
        startColor:"white",

        // 初始化的方法
        init:function(){
            this.initData();
            this.animate();
        },

        // 初始化数据的方法
        initData:function(){
            this.el = document.getElementById("game");
            this.oBird = this.el.getElementsByClassName("bird")[0];
            this.oStart = this.el.getElementsByClassName("start")[0];
        },

        // 管理所有动画的方法
        animate:function(){
            // 声明一个变量,用于计数
            var count = 0;

            // 缓存this
            var self = this;

            // 开启定时器
            setInterval(function(){
                // 调用天空移动的方法
                self.skyMove();
                // count自加1
                count++;
                // count是10的倍数的时候
                if( count % 10 === 0 ){
                    // 调用小鸟跳跃的方法
                    self.birdJump();
                    // 调用小鸟煽动翅膀的方法
                    self.birdFly( count );
                    // 调用开始按钮跳动的方法
                    self.startBound();
                }

            }, 30 );
        },

        // 天空移动的方法
        skyMove:function(){
            this.skyPosition -= this.skyStep;
            this.el.style.backgroundPositionX = this.skyPosition + "px";
        },

        // 小鸟跳动的方法
        birdJump:function(){
            this.bridTop = this.bridTop === 220 ? 260 : 220;
            this.oBird.style.top = this.bridTop + "px";
        },

        // 小鸟煽动翅膀的方法
        birdFly:function( count ){
            this.oBird.style.backgroundPositionX = count % 3 * -30 + "px";
        },

        // 开始按钮跳动的方法
        startBound:function(){
            // 上一次的颜色类名
            var prevColor = this.startColor;
            //  修改颜色类名
            this.startColor = this.startColor === "blue" ? "white" : "blue";
            // 删除上一次颜色类名
            this.oStart.classList.remove("start-" + prevColor );
            // 添加新的颜色类名
            this.oStart.classList.add("start-" + this.startColor );
        }
    }

    bird.init();
}