cc.Class({
    extends: cc.Component,

    properties: {
        
        //这个属性引用星星预览资源
        startPrefab:{
            default: null,
            type: cc.Prefab
        },
        //设置星星消失事件的随机范围
        maxStarDuration:0,
        minStarDuration:0,
        //地面节点，用于确定星星生成的高度
        ground:{
            default:null ,
            type: cc.Node
        },
        //player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player:{
            default : null ,
            type : cc.Node
        },
        //score引用
        scoreDisplay:{
            default : null,
            type : cc.Label
        },
        //得分音效引用
        scoreAudio: {
            default : null ,
            url : cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function () {
        //初始化记分
        this.score = 0 ;
        //坐标y
       this.groundY = this.ground.y+this.ground.height/2;
       this.spawnNewStar();
    },
    spawnNewStar : function(){
        // 关联模版， 生成新节点
        var newStar =  cc.instantiate(this.startPrefab);
        //将新节点添加到canvas上
        this.node.addChild(newStar);
        //为星星位置设定一个随机值
        newStar.setPosition(this.getNewStarPosition());
        //将Game 组件的实例 传入星星组件
        newStar.getComponent('star').game = this;
        //ewStar.getComponent('star').game=this;
    },
    getNewStarPosition : function(){
        var randX=0;
        // 根据地板位置和主角跳跃高度产生随机y
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('player').jumpHeight+50;
        // 根据屏幕宽度，随机产生 x
        var maxX=this.node.width/2;
        randX=cc.randomMinus1To1() * maxX;
        return cc.p(randX,randY)
    },
    //update: function (dt) {
    //},
    gainScore: function () {
        this.score += 1 ;
        this.scoreDisplay.string = 'score:' +this.score.toString();
        cc.audioEngine.playEffect( this.scoreAudio , false);
    },
    
});
