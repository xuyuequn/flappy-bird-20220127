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
        // 游戏是否游戏开始的标识符
        startFlag:false,
        // 小鸟下落的步长
        birdStepY:0,
        // 上边界
        minTop:0,
        // 下边界
        maxTop: 570,
        // 定时器标识符
        timer:null,
        // 生成柱子的对数
        pipeLength:7,
        // 存放柱子dom元素的数组
        pipeArr:[],


        // 初始化的方法
        init:function(){
            this.initData();
            this.animate();
            this.handleStart();
            this.handleClick();
        },

        // 初始化数据的方法
        initData:function(){
            this.el = document.getElementById("game");
            this.oBird = this.el.getElementsByClassName("bird")[0];
            this.oStart = this.el.getElementsByClassName("start")[0];
            this.oScore = this.el.getElementsByClassName("score")[0];
        },

        // 管理所有动画的方法
        animate:function(){
            // 声明一个变量,用于计数
            var count = 0;

            // 缓存this
            var self = this;

            // 开启定时器
            this.timer = setInterval(function(){
                // 调用天空移动的方法
                self.skyMove();

                // 游戏开始的时候
                if( self.startFlag ){
                    // 小鸟开始降落
                    self.birdDrop();
                    // 柱子移动
                    self.pipeMove();
                }

                // count自加1
                count++;

                // count是10的倍数的时候
                if( count % 10 === 0 ){
                    // 调用小鸟煽动翅膀的方法
                    self.birdFly( count );
                    
                    if( !self.startFlag ){// 游戏未开始的时候
                        // 调用小鸟跳跃的方法
                        self.birdJump();
                        // 调用开始按钮跳动的方法
                        self.startBound();
                    }
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
        },

        // 小鸟下落的函数
        birdDrop:function(){
            this.bridTop += ++this.birdStepY;
            this.oBird.style.top = this.bridTop + "px";

            // 小鸟碰撞检测的函数
            this.judgeKnock();
        },

        // 小鸟碰撞检测的函数
        judgeKnock:function(){
            // 边界碰撞判断
            this.judgeBoundary();
            // 柱子碰撞判断
            this.judgePipe();
        },

        // 边界碰撞判断的函数
        judgeBoundary:function(){
            if( this.bridTop <= this.minTop || this.bridTop >= this.maxTop ){
                this.failGame();
            }
        },

        // 游戏结束的函数
        failGame:function(){
            console.log("游戏结束");
            // 清除定时器
            window.clearInterval( this.timer );
        },

        // 柱子碰撞判断的函数
        judgePipe:function(){
            
        },

        // 生成柱子的函数
        // x为柱子的左偏移量
        createPipe:function( x ){
            // 设定上下两个柱子之间的距离固定为150px高
            
            // 柱子最低高度为: 50 
            // 柱子最高高度为: (600 - 150) / 2 = 450 / 2 = 225 

            /* // 上柱子+下柱子的高度总共为 450  
            var upHeight = this.getRandom( 50, 225 );
            var downHeight = 450 - upHeight;

            // 上柱子
            var oDiv1 = document.createElement("div");
            oDiv1.classList.add("pipe");
            oDiv1.classList.add("pipe-up");
            oDiv1.style.height = upHeight + "px";
            oDiv1.style.left = x + "px";
            this.el.appendChild( oDiv1 );

            // 下柱子
            var oDiv2 = document.createElement("div");
            oDiv2.classList.add("pipe");
            oDiv2.classList.add("pipe-down");
            oDiv2.style.height = downHeight + "px";
            oDiv2.style.left = x + "px";
            this.el.appendChild( oDiv2 ); */



            // 设定上下两个柱子之间的距离固定为150px高
            
            // 柱子最低高度为: 50 
            // 柱子最高高度为: (600 - 150) / 2 = 450 / 2 = 225 

            // 上柱子+下柱子的高度总共为 450  
            var upHeight = getRandom( 50, 225 );
            var downHeight = 450 - upHeight;

            // 上柱子
            var oUpPipe = creatEle("div", ["pipe","pipe-up"], {
                left : x+"px",
                height: upHeight + "px"
            });

            // 下柱子
            var oDownPipe = creatEle("div", ["pipe","pipe-down"], {
                left : x+"px",
                height:downHeight + "px"
            });

            this.el.appendChild( oUpPipe );
            this.el.appendChild( oDownPipe );

            // 把数组添加到数组中
            this.pipeArr.push( {
                up:oUpPipe,
                down:oDownPipe
            } );
        },

        // 柱子移动的函数
        pipeMove:function(){
            for(var i = 0; i < this.pipeArr.length; i++ ){
                // 获取上柱子的dom对象
                var oUpPipe = this.pipeArr[i].up;
                // 获取下柱子的dom对象
                var oDownPipe = this.pipeArr[i].down;
                // 原来的offsetLeft的基础上减去天空移动的步长
                var x = oUpPipe.offsetLeft - this.skyStep;
                // 设置柱子的left属性
                oUpPipe.style.left = x + "px";
                oDownPipe.style.left = x + "px";
            }
        },

        // 监听开始按钮的函数
        handleStart:function(){
            // 缓存this
            var self = this;

            // 给按钮绑定点击事件
            this.oStart.onclick = function(){
                // 显示分数层盒子
                self.oScore.style.display = "block";
                // 改变天空背景移动的速度
                self.skyStep = 5;
                // 隐藏开始游戏的按钮
                self.oStart.style.display = "none";
                // 改变游戏状态为开始
                self.startFlag = true;
                // 更改左偏移量
                self.oBird.style.left = "80px";
                // 取消小鸟身上的CSS过渡属性
                self.oBird.style.transition = "none";
                // 生成柱子
                for(var i = 0; i < self.pipeLength; i++ ){
                    // 执行生成柱子的函数
                    self.createPipe( 300 * (i + 1 ) );
                }
            }
        },

        // 监听父元素点击事件
        handleClick:function(){
            // 缓存this
            var self = this;
            // 绑定事件
            this.el.onclick = function( e ){
                // 获取触发事件的目标对象
                var dom = e.target;
                // 判断这个目标对象身上是否包含.start类名 
                var isStart = dom.classList.contains("start"); 
                // 点击的不是开始按钮
                if( !isStart ){
                    // 小鸟往上,修改小鸟下落的步长为负
                    self.birdStepY = -10;
                }
            }
        },


    }

    bird.init();
}