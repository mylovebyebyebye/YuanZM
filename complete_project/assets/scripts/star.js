cc.Class({
    extends: cc.Component,

    properties: {
        //player 和 star 完成触碰事件的最小距离
        pickRadius: 0
    },

    onLoad: function () {
      
    },

    //获取从game实例中传回的玩家距离
    getPlayerDistance : function(){
       var playerPsition = this.game.player.getPosition();

       //var playerPsition = this.game.player.getPosition();
       var distance = cc.pDistance( this.node.position, playerPsition);
       return distance;
    },
    //碰撞逻辑
    onPicked : function(){
        // 当星星呗收集时，调用game脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();
        //加分
        this.game.gainScore();
        //销毁当前的星星
        this.node.destroy();
    },
    //每帧判断距离，小于pickRadius 就执行收集行为
     update: function (dt) {
           if(this.getPlayerDistance() < this.pickRadius){
           this.onPicked();
           return;
         }
    }
});
