/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
var player = new Vue({
    el: ".wrap",
    data: {
        searchText: "",
        songsList : [],
        musicUrl : "",
        musicCover : "",
        isPlaying : false,
        hotComments : [],
        mvUrl : "",
        isShow : false,
    },
    methods : {
        searchSong : function() {
            console.log("search");
            var that = this;
            axios.get("https://autumnfish.cn/search", {
              params: {
                "keywords": this.searchText
              }
            })
            .then(res => {
              
              that.songsList = res.data.result.songs;
              //console.log(that.songsList);
            })
        },
        playSong :function(songId){
          var that = this;
          axios.get("https://autumnfish.cn/song/url", {
            params: {
              id: songId
            }
          })
          .then(res => {
            
            that.musicUrl = res.data.data[0].url;
            //console.log(that.musicUrl);
          });

          // 歌曲图片获取
          axios.get("https://autumnfish.cn/song/detail", {
            params: {
              ids: songId
            }
          })
          .then(res => {
            that.musicCover = res.data.songs[0].al.picUrl;
            // console.log(that.musicCover);
          });

          //评论获取
          axios.get("https://autumnfish.cn/comment/hot", {
            params: {
              type: 0,
              id : songId
            }
          })
          .then(res => {
            that.hotComments = res.data.hotComments;
          })
        },
        play : function(){
          this.isPlaying = true;
        },
        pause : function(){
          this.isPlaying = false;
        },

        playMV : function(mvid) {
          var that = this;
          var audio = document.getElementById("audio");
          axios.get("https://autumnfish.cn/mv/url", {
            params: {
              id: mvid
            }
          })
          .then(res => {
            
            that.mvUrl = res.data.data.url;
            that.isShow = true;
            audio.pause();
            console.log(that.mvUrl);
          }).catch(err => {
            console.log(err.response.data);

            console.log(err.response.status);

            console.log(err.response.headers);

          })

        },
        hide : function(){
          this.isShow = false;
          var video = document.getElementById("mvVideo");
          video.pause();
          
        },
    },
});