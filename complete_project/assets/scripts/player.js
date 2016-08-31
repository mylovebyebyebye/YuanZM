cc.Class({
    extends: cc.Component,

    properties: {
       jumpHeight:150,
       jumpDuration:0.3,
       //最大移动速度
       maxMoveSpeed:400,
       //加速度
       accel:1000,
       //jump音效引用
        jumpAudio: {
            default : null,
            url : cc.AudioClip
        },
    },

    // use this for initialization
    onLoad: function () {
      // 初始化跳跃动作
      this.jumpAction = this.setJumpAction();
      this.node.runAction(this.jumpAction);
      // 加速度方向开关
      this.accLeft=false;
      this.accRight=false;
      // 主角当前水平方向速度
      this.xSpeed=0;
      //初始化键盘输入监听
      this.setInputControl();
    },
    setJumpAction:function(){
        //跳跃上升
        var jumpUp=cc.moveBy(this.jumpDuration, cc.p(0,this.jumpHeight)).easing(cc.easeCubicActionOut());
    
        //下落
        var jumpDown=cc.moveBy(this.jumpDuration, cc.p(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());
        //audio
        var callback = cc.callFunc( this.playJumpSound , this ) ;
        //不断重复
        return cc.repeatForever(cc.sequence(jumpUp , jumpDown , callback));
    },
    //jump 播放音效
    playJumpSound : function (){
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },
   setInputControl:function(){
       var self = this;
       // 添加键盘监听事件
       cc.eventManager.addListener({
           event: cc.EventListener.KEYBOARD,
           //键盘按下，判断指定方向，并设置相对加速度
           onKeyPressed: function(keyCode,event){
               switch(keyCode){
                   case cc.KEY.a:
                       self.accLeft=true;
                       self.accRight =false;
                       break ;
                   case cc.KEY.d:
                       self.accLeft=false;
                       self.accRight=true;
                       break ;
               }
           },
           //按键松开，停止加速度
           onKeyReleased : function(keyCode,event){
               switch(keyCode){
                   case cc.KEY.a:
                       self.accLeft =false;
                       break;
                   case cc.KEY.d:
                       self.accRight=false;
                       break;
               }
           }
       }, self.node);
   },
   update:function(dt){
       //根据当前加速度方向每帧更新速度
       if(this.accLeft){
           this.xSpeed -= this.accel * dt;
       }else if(this.accRight){
           this.xSpeed += this.accel *dt;
       }
       // 限制主角位置不能超过最大值
       if(Math.abs(this.xSpeed)>this.maxMoveSpeed){
           this.xSpeed=this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
       }
       //根据当前速度更新主角位置
       this.node.x += this.xSpeed * dt;
   }
});
