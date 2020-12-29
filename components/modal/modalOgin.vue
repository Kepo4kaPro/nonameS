<template>
    <div class="main-login" :class="{'hidden' : isChange}">
      <div class="head-name">{{name[state]}}</div>
        <div class="state-swither" v-if="state === 0">
          <form v-on:submit.prevent="form_subbmit_login()" class="login-content">
            <div class="input-box">
              <input
                v-model="data.login.login"
                @input="login_input()"
                :pattern="consta.state[data.login.state].pattern"
                :title="consta.state[data.login.state].title"
                type="text"
                placeholder=" "
                minlength="3"
                autocomplete="username"
                required>
              <div class="placeholder">{{consta.state[data.login.state].name}}</div>
            </div>
            <div class="input-box">
              <input
                v-model="data.login.pass"
                title="Введите пароль."
                type="password"
                minlength="3"
                placeholder=" "
                autocomplete="current-password"
                required>
              <div class="placeholder">Пароль</div>
            </div>
            <input class="login-sub" type="submit" value="Войти">
          </form>
          <div class="descript">
            <p class="return-pass">Забыли пароль? <span>Востоновить</span></p>
            <p class="return-pass">Нет аккаунта? <span @click="change_state(1)">Регистрация</span></p>
          </div>
        </div>
        <div class="state-swither" v-if="state === 1">
          <form class="login-content" v-on:submit.prevent="form_subbmit_register()">
            <div class="input-box">
              <input
                v-model="data.register.login"
                title="Введите логин"
                type="text"
                placeholder=" "
                minlength="3"
                autocomplete="name"
                required>
              <div class="placeholder">Логин</div>
            </div>
            <div class="input-box">
              <input
                v-model="data.register.mailP"
                :title="consta.state[data.register.state].title"
                :pattern="consta.state[data.register.state].pattern"
                @input="phoneM_input()"
                type="text"
                placeholder=" "
                autocomplete="username"
                required>
              <div class="placeholder">{{consta.state[data.register.state].name}}</div>
            </div>
            <div class="input-box">
              <input
                v-model="data.register.pass"
                type="password"
                placeholder=" "
                minlength="3"
                title="Введите пароль."
                autocomplete="new-password"
                required>
              <div class="placeholder">Пароль</div>
            </div>
            <div class="input-box">
              <input
                v-model="data.register.passC"
                type="password"
                placeholder=" "
                :disabled="data.register.pass.length < 6"
                :pattern="data.register.pass"
                title="Пароли должны быть равны..."
                autocomplete="new-password"
                required>
              <div class="placeholder">Подтвердите пароль</div>
            </div>
            <input class="login-sub" type="submit" value="Зарегестрироватся">
          </form>
            <p class="return-pass">Есть аккаунт? <span @click="change_state(0)">Войти</span></p>
        </div>
      <p class="login-ore">- ИЛИ -</p>
      <div class="social-login">
        <div class="social-icons">
          <font-awesome-icon class="social-fa" :icon="['fab', 'vk']" />
        </div>
        <div class="social-icons">
          <font-awesome-icon class="social-fa" :icon="['fab', 'google']" />
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          consta: {
            state:{
              all : {
                name : "Логин | Телефон | Почта",
                pattern: "",
                title: "Введите логин, телефон или почту"
              },
              phone: {
                name : "Телефон",
                pattern: "[^_]*",
                title: "Введите телефон полностью",
              },
              phone_mail: {
                name : "Телефон | Почта",
                pattern: "",
                title: "Введите телефон или почту",
              },
              mail_login: {
                name : "Логин | Почта",
                pattern: "\\D{1,}",
                title: "Введите логин, или почту"
              },
              mail: {
                name : "Почта",
                title: "Введите корректный mail",
                pattern: "[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"
              }
            },
            mask: {
              phone: "+7 (___) ___-__-__"
            },
            cmask: {
              phone: "+ (___) ___-__-__"
            }
          },
          data:{
            login: {
              state: "all",
              login : "",
              pass  : ""
            },
            register: {
              state: "phone_mail",
              login : "",
              mailP : "",
              pass  : "",
              passC  : ""
            }
          },
          state : 0,
          isChange: false,
          name: {
            0: 'Авторизация',
            1: 'Регистрация'
          }
        }
      },
      methods: {
        form_subbmit_login(){
          let data = new FormData();
          data.append("login", this.data.login.state === "phone" ? this.data.login.login.replace(/\D/g, "") : this.data.login.login);
          data.append("pass", this.data.login.pass);

          let self = this;

          this.$axios.post('/login', data)
          .then(function (response) {
            let token = "Bearer "+response.data["token"];
            self.to_account(token)
          })
        },

        form_subbmit_register(){
          let data = new FormData();
          data.append("login", this.data.register.login);
          data.append("mailP", this.data.register.state === "phone" ? this.data.register.mailP.replace(/\D/g, "") : this.data.register.mailP);
          data.append("pass", this.data.register.pass);
          data.append("passc", this.data.register.passC);

          let self = this;

          this.$axios.post('/register', data)
            .then(function (response) {
              let token = "Bearer "+response.data["token"];
              self.to_account(token)
            })
        },

        to_account(token){
          localStorage.setItem('Authorization', token);
          this.$axios.defaults.headers.Authorization = token;
          this.$store.dispatch('modalv/closeModal');
          this.$router.push("/account");
          this.$store.dispatch('account/setNull');
        },

        login_input(){
          let data = this.data.login.login;
          if(data[0] && (data[0] === '+' || data[0] === '7' || data[0] === '9')){
            this.data.login.login = data === this.consta.cmask.phone ? "" : this.change_to_mask(window.event, data, this.consta.mask.phone);
          }
          data = this.data.login.login;
          if(data.length){
            if(data[0] && (data[0] === '+' || data[0] === '7' || data[0] === '9')){
              this.data.login.state = "phone"
            }else if(/@/.test(data)){
              this.data.login.state = "mail";
            }else this.data.login.state = "mail_login"
          }else this.data.login.state = "all"
        },
        phoneM_input(){
          let data = this.data.register.mailP;
          if(data[0] && (data[0] === '+' || data[0] === '7' || data[0] === '9')){
            this.data.register.mailP = data === this.consta.cmask.phone ? "" : this.change_to_mask(window.event, data, this.consta.mask.phone);
          }
          data = this.data.register.mailP;
          if(data.length){
            if(data[0] && (data[0] === '+' || data[0] === '7' || data[0] === '9')){
              this.data.register.state = "phone"
            }else{
              this.data.register.state = "mail";
            }
          }else this.data.register.state = "phone_mail"
        },

        set_cursor_pos(el, pos){
          el.focus();
          el.setSelectionRange(pos, pos);
        },
        change_to_mask(object, value, masked){
          let i = 0,
            mask = masked.replace(/\D/g, ""),
            val = value.replace(/\D/g, ""),
            max_char = masked.match(/[_]/g).length + mask.length;
          if(val.length > max_char) (val = val.slice(0,max_char));
          if(mask.length >= val.length) (val = mask);
          masked = masked.replace(/[_\d]/g, function (a) {
            return val.charAt(i++) || "_"
          });
          i = masked.lastIndexOf(val.substr(-1));
          i < masked.length && masked !== this.defaultValue ? i++ : i = masked.indexOf("_");
          this.$nextTick(() => this.set_cursor_pos(object.target, i));
          return masked
        },
        change_state(state){
          let self = this;
          this.isChange = true;
          setTimeout(()=>{
            self.state = state;
            self.isChange = false;
          }, 250);
        }
      }
    }
</script>

<style scoped>
  .main-login{
    transition: height .25s, opacity .25s;
    overflow: hidden;
  }
  .main-login.hidden{
    opacity: 0;
  }
  .head-name{
    width: 100%;
    text-align: center;
    margin-bottom: .5em;
  }
  .login-content{
    font-size: .66em;
  }
  .input-box{
    margin-bottom: .5em;
  }
  .login-sub{
    width: 100%;
    background-color: #000;
    border: none;
    border-radius: .5em;
    color: #fff;
    font-size: 1em;
    height: 2.9em;
  }
  .descript{
    display: flex;
    justify-content: space-between;
  }
  .return-pass, .login-ore{
    font-size: .45em;
    text-align: center;
    margin: .75em;
    color: #5f5f5f;
  }
  .return-pass span{
    text-transform: uppercase;
    font-weight: 700;
    color: #000;
    cursor: pointer;
  }
  .social-login{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .social-icons{
    background-color: #000;
    height: 1.25em;
    width: 1.25em;
    border-radius: .25em;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 .25em;
    cursor: pointer;
  }

  .social-fa{
    color: #fff;
    font-size: .9em;
  }
</style>
