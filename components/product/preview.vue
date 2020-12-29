<template>
    <div class="preview">

      <div id="pic_box" class="picture-box" v-bind:class="{right}">
          <img src="" alt="" class="active">
      </div>



      <div class="controls_next">
        <div v-on:click="next(true)" class="butt_next">
          <font-awesome-icon class="icon_next" icon="caret-left" />
        </div>
        <div v-on:click="next(false)" class="butt_next">
          <font-awesome-icon class="icon_next" icon="caret-right" />
        </div>
      </div>

      <div class="target_photo">
        <div class="butt_next_buttom" v-on:click="next(true)">
          <font-awesome-icon class="icon_next" icon="caret-left" />
        </div>
        <div v-for="(photo, index) in photos" class="photo_block" v-bind:class="{active: photos[index].active}" v-on:click="set_act_pict(index)">
        </div>
        <div class="butt_next_buttom" v-on:click="next(false)">
          <font-awesome-icon class="icon_next" icon="caret-right" />
        </div>
      </div>
    </div>
</template>

<script>
  import getPict from "../../static/getPict";
    export default {
      props: ['def_url'],
      data: function () {
        return {
          activ_photo: 0,
          force_direct: false,

          isSmallTime: false,

          last_pct_node: null,
          node_pattern: null,
          node_push: null,

          photos: [
          ],

          right: false,
          tuch_start: 0
        }
      },
      mounted() {
          let is_SWebP = function(){
            let webP = new Image();
            webP.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMw' + 'AgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
            webP.onload = webP.onerror = function () {
              return(webP.height === 2);
            };
          };

        let type = is_SWebP ? "webp" : "png";

        for(let i=0; i<this.def_url.length; i++){
          let nImg = new Image();
          nImg.src = getPict(type, this.def_url[i]);
          this.photos.push(
            {
              url: nImg.src,
              active: i === 0
            }
          );
        }

        this.node_pattern = this.$el.querySelector('#pic_box');
        this.last_pct_node = this.node_pattern.querySelector('#pic_box img');
        this.node_push = this.last_pct_node.cloneNode(true);
        this.last_pct_node.remove();
        this.last_pct_node = this.node_pattern.appendChild(this.node_push.cloneNode(false));
        this.last_pct_node.src = this.photos[this.activ_photo].url;
        this.node_push.classList.remove('active');



        this.$el.addEventListener('touchstart', function (e) {
          this.tuch_start = e.changedTouches[0].pageX;
        }, {passive: true});
        let self = this;
        this.$el.addEventListener('touchend', function (e) {
          self.swipe(e.changedTouches[0].pageX - this.tuch_start);
        }, {passive: true});
      },
      methods: {
        set_next(){
          let self = this;
          let obj_set = this.node_pattern.appendChild(this.node_push.cloneNode(false));
          let remove_obj = this.last_pct_node;
          this.last_pct_node = obj_set;

          obj_set.src = this.photos[this.activ_photo].url;


          setTimeout(function () {
            obj_set.classList.add('active');
          }, 10);

          this.isSmallTime = setTimeout(function () {
            self.isSmallTime = false;
          }, 500);

          remove_obj.classList.remove('active');
          remove_obj.classList.add('revios');
          setTimeout(function () {
            remove_obj.remove();
          }, 1000);
        },

        set_act_pict(id){
          this.photos[this.activ_photo].active = false;
          if(this.force_direct){

            this.right = this.force_direct > 0;

            this.activ_photo = id;
            this.set_next();
            this.force_direct = null
          }else{
            if(id > this.activ_photo){
              this.right = true;
              this.activ_photo = id;
              this.set_next();
            }else if(id < this.activ_photo){
              this.right = false;
              this.activ_photo = id;
              this.set_next();
            }
          }
          this.photos[id].active = true;
        },
        change_active_photo(change){
          let activ = this.activ_photo + change;
          if(activ < 0){
            activ = this.photos.length - 1;
          }
          if(activ > this.photos.length - 1){
            activ = 0;
          }
          this.set_act_pict(activ);
        },
        swipe(dist){
          if(dist > 50){
            this.next(false);
          }else if(dist < -50){
            this.next(true);
          }
        },
        next(is_right){
          this.force_direct = is_right ? 1 : -1;
          this.change_active_photo(this.force_direct);
        }
      }
    }
</script>

<style scoped>
  .target_photo{
    position: absolute;
    bottom: 0;
    width: 90%;
    height: 12%;
    transform: translateX(-50%);
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .photo_block{
    cursor: pointer;
    position: relative;
    width: .7em;
    height: .7em;
    border-radius: 50%;
    border: black solid 0.1em;
    margin: 0.2em;
  }

  .photo_block::before{
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    background: black;
    width: .4em;
    height: .4em;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: opacity .5s;
    opacity: 0;
  }


  .photo_block.active::before{
    opacity: 1;
  }

  .controls_next{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    z-index: 3;
  }


  .butt_next{
    height: 1em;
    width: 1em;
    border-radius: 50%;
    border: 0.1em solid black;
    margin: 0 .2em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .butt_next_buttom{
    margin: 0 .5em;
    font-size: 1.2em;
    display: none;
    cursor: pointer;
  }


  .icon_next{
    font-size: 0.9em;
  }


  .picture-box{
    position: relative;
    width: 70%;
    height: 100%;
  }


  .picture-box img{
    width: 100%;
    position: absolute;
    transform: scale(0.5) translate(-50%, -50%);
    top: 25%;
    left: -10%;
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
  }
  .picture-box.right img{
    left: 60%;
  }

  .picture-box img.active{
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: .8s ease-out, opacity .5s;
    opacity: 1;
    z-index: 2;
  }
  .picture-box img.revios{
    left: 60%;
    transition: .5s ease-out;
    opacity: 0;
  }

  .picture-box.right img.revios{
    left: -10%;
  }

  .preview{
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle, rgba(0,0,0,0.15), transparent 65%);
  }

  @media only screen and (min-width: 1667px){
    .preview{
      width: 730px;
      height: 876px;
      font-size: 50px;
    }
  }

  @media only screen and (min-width: 1024px) and (max-width: 1667px){
    .preview{
      width: calc((90vw - 40px)/2);
      height: calc((90vw - 40px)/2*876/730);
      font-size: calc((90vw - 40px)/2*50/730);
    }
  }


  @media only screen and (min-width: 1024px) and (max-width: 1279px){
    .controls_next{
      display: none;
    }
    .picture-box{
      width: 85%;
    }
    .butt_next_buttom{
      display: block;
    }
  }

  @media only screen and (max-width: 479px){
    .controls_next{
      display: none;
    }
    .picture-box{
      width: 85%;
    }
    .butt_next_buttom{
      display: block;
    }
  }

  @media only screen and (max-width: 1023px){
    .preview{
      width: 90vw;
      height: 108vw;
      font-size: 5.4vw;
    }
  }
</style>
