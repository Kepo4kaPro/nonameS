<template>
    <div v-if="isAnim" class="animation" v-bind:class="isTrans ? 'transparent' : ''">
      <div class="conten-box go-top">
        <div class="origin-box">
          <div class="name-box">
            <div class="content-area">
              NoNAME
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
          return {
            isAnim: true,
            isTrans: false
          }
        },
      mounted() {
        document.documentElement.style.overflow = 'hidden';
          let self = this;

          setTimeout(function () {
            self.isTrans = true;
          }, 1000);


          setTimeout(function () {
            self.isAnim = false;
            document.documentElement.style.overflow = 'auto';
          }, 2550)
      }
    }
</script>

<style>
  .conten-box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 40px;
    font-size: 24px;
  }
  .origin-box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
  }

  .name-box{
    width: 100%;
    height: 100%;
    transform: skew(-25deg);
    background-color: white;
    border-radius: .25em;
  }

  .content-area{
    width: 100%;
    height: 100%;
    transform: skew(25deg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-family: sans-serif;
    color: black;
  }
</style>

<style scoped>
  .animation{
    position: absolute;
    background-color: black;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 999;
    transition: 2s;
  }
  .animation.transparent{
    background-color: rgba(0, 0, 0, 0);
  }

  .conten-box.go-top{
    animation: go-top 1.5s ease-out forwards;
  }

  @keyframes go-top {
    0%{
      top: 50%;
      left: 50%;
      width: 30vw;
      height: 10vw;
      font-size: 6vw;
    }
    50%{
      top: 50%;
      left: 50%;
      width: 30vw;
      height: 10vw;
      font-size: 6vw;
    }
    100%{
      top: 32px;
      left: 90px;
      width: 120px;
      height: 40px;
      font-size: 24px;
    }
  }

  @keyframes go-top-mobile {
    0%{
      top: 50%;
      left: 50%;
      width: 60vw;
      height: 20vw;
      font-size: 12vw;
    }
    35%{
      top: 50%;
      left: 50%;
      width: 60vw;
      height: 20vw;
      font-size: 12vw;
    }
    100%{
      top: 32px;
      left: 90px;
      width: 120px;
      height: 40px;
      font-size: 24px;
    }
  }

  .origin-box.anim-fall{
    animation: linear anim-fall 5s 1s;
  }


  @keyframes anim-fall {
    0%{
      transform: translate(-50%, -50%) rotate(0deg);
    }
    10%{
      transform: translate(-50%, -50%) rotate(125deg);
    }
    20%{
      transform: translate(-50%, -50%) rotate(25deg);
    }
    30%{
      transform: translate(-50%, -50%) rotate(100deg);
    }
    40%{
      transform: translate(-50%, -50%) rotate(50deg);
    }
    50%{
      transform: translate(-50%, -50%) rotate(75deg);
    }
    100%{
      transform: translate(-50%, -50%) rotate(75deg);
    }
  }

  @media only screen and (max-width: 1023px){
    .conten-box.go-top{
      animation: go-top-mobile 1s ease-out forwards;
    }
  }
</style>
