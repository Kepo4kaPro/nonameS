<template>
  <div class="account">
    <h1 class="profile-header">Профиль <span class="exit-fa" @click="exit_account()"><font-awesome-icon class="social-fa" :icon="['fas', 'sign-out-alt']" /></span></h1>
    <div class="profile-container">
      <div class="profile-linear">
        <div class="profile-box">
          <div class="box-name">
            <p>Аккаунт</p>
            <div class="box-edit" :class="{active:is_edit.profile}" @click="togle_edit_profile()">
              <font-awesome-icon class="social-fa" :icon="['fas', !is_edit.profile ? 'edit' : 'save']" />
            </div>
          </div>
          <form class="box-content">
            <div class="input-box">
              <input
                class="profile-input"
                type="text"
                placeholder=" "
                required
                v-model="data.account.login"
                minlength="3"
                :disabled="!is_edit.profile">
              <div class="placeholder">Логин</div>
            </div>
            <div class="input-split mb-all">
              <div class="input-box" style="width: 58%">
                <input
                  class="profile-input"
                  type="text"
                  placeholder=" "
                  required
                  v-model="data.account.mail"
                  pattern="[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"
                  :disabled="!is_edit.profile">
                <div class="placeholder">Почта</div>
              </div>
              <div class="input-box" style="width: 40%">
                <input
                  @input="phone_input()"
                  class="profile-input"
                  type="text" placeholder=" "
                  required
                  v-model="data.account.phone"
                  pattern="[^_]*"
                  :disabled="!is_edit.profile">
                <div class="placeholder">Телефон</div>
              </div>
            </div>
          </form>
        </div>
        <div class="profile-box" style="min-width: 15em">
          <div class="box-name">
            <p>Безопасноть</p>
            <div class="box-edit" :class="{active:is_edit.password}" @click="togle_edit_password()">
              <font-awesome-icon class="social-fa" :icon="['fas', !is_edit.password ? 'edit' : 'save']" />
            </div>
          </div>
          <form class="box-content">
            <div class="input-box">
              <input
                class="profile-input"
                type="password"
                placeholder=" "
                required
                v-model="data.password.old_pass"
                minlength="6"
                :disabled="!is_edit.password">
              <div class="placeholder">Старый пароль</div>
            </div>
            <div class="input-box solo">
              <input
                class="profile-input"
                type="password"
                placeholder=" "
                required
                v-model="data.password.new_pass"
                minlength="6"
                :disabled="!is_edit.password || data.password.old_pass.length < 6">
              <div class="placeholder">Новый пароль</div>
            </div>
            <div class="input-box solo">
              <input
                class="profile-input"
                type="password"
                placeholder=" "
                required
                v-model="data.password.new_pass2"
                minlength="6"
                :pattern="data.password.new_pass"
                :disabled="!is_edit.password || data.password.new_pass.length < 6">
              <div class="placeholder">Повторить пароль</div>
            </div>
          </form>
        </div>
      </div>
      <div class="profile-box" style="width: 100%">
        <div class="box-name">
          <p>Адрес доставки</p>
          <div class="box-edit" :class="{active:is_edit.address}" @click="togle_edit_address()">
            <font-awesome-icon class="social-fa" :icon="['fas', !is_edit.address ? 'edit' : 'save']" />
          </div>
        </div>
        <form class="box-content">
          <div class="input-box">
            <input
              class="profile-input"
              type="text"
              placeholder=" "
              required
              v-model="data.address.name"
              minlength="6"
              :disabled="!is_edit.address">
            <div class="placeholder">Фамилия Имя Отчество</div>
          </div>
          <div class="input-split mb-all">
            <div class="input-box" style="width: 20%">
              <input
                @input="index_input()"
                class="profile-input"
                type="text" placeholder=" "
                required
                pattern="[^_]*"
                v-model="data.address.index"
                :disabled="!is_edit.address">
              <div class="placeholder">Индекс</div>
            </div>
            <div class="input-box" style="width: 47.5%">
              <input
                class="profile-input"
                type="text"
                placeholder=" "
                required
                v-model="data.address.edge"
                :disabled="!is_edit.address">
              <div class="placeholder">Край | Облость | Регион</div>
            </div>
            <div class="input-box" style="width: 30%">
              <input
                class="profile-input"
                type="text" placeholder=" "
                required
                v-model="data.address.county"
                :disabled="!is_edit.address">
              <div class="placeholder">Город</div>
            </div>
          </div>
          <div class="input-split md-address">
            <div class="input-box" style="width: 68.9%">
              <input
                class="profile-input"
                type="text" placeholder=" "
                required
                v-model="data.address.streets"
                :disabled="!is_edit.address">
              <div class="placeholder">Улица | Переулок</div>
            </div>
            <div class="input-box" style="width: 10.8%">
              <input
                class="profile-input"
                type="text" placeholder=" "
                required
                v-model="data.address.house"
                :disabled="!is_edit.address">
              <div class="placeholder">Дом</div>
            </div>
            <div class="input-box" style="width: 18%">
              <input
                class="profile-input"
                type="text" placeholder=" "
                v-model="data.address.apartment"
                :disabled="!is_edit.address">
              <div class="placeholder">Квартира</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return {
          data: {
            account: {
              login: "",
              mail: "",
              phone: ""
            },
            password: {
              old_pass: "",
              new_pass: "",
              new_pass2: ""
            },
            address: {
              index: "",
              name: "",
              edge: "",
              county: "",
              streets: "",
              house: "",
              apartment: ""
            }
          },
          const: {
            mask:{
              phone: "+7 (___) ___-__-__",
              index: "______"
            },
            cmask: {
              phone: "+ (___) ___-__-__",
              index: "_____"
            }
          },
          is_edit: {
            profile: false,
            password: false,
            address: false
          }
        }
      },
      computed:{
        account(){
          return this.$store.getters["account/data"];
        }
      },
      watch:{
        account(){
          this.loading();
        }
      },
      mounted() {
        this.loading();
      },
      methods: {
        exit_account(){
          this.$axios.post('/logout');
          localStorage.setItem('Authorization', "");
          this.$axios.defaults.headers.Authorization = "";
          this.$router.push("/");
          this.$store.dispatch('account/fetch');
        },
        loading(){
          if(this.account){
            this.data.account.login = this.account.account.login;
            this.data.account.mail = this.account.account.mail;
            if(this.account.account.phone) this.data.account.phone = this.change_to_mask(this.account.account.phone, this.const.mask.phone, null);

            if (this.account.delivery){
              this.data.address.index = this.account.delivery.uindex;
              this.data.address.name = this.account.delivery.name;
              this.data.address.edge = this.account.delivery.edge;
              this.data.address.county = this.account.delivery.county;
              this.data.address.streets = this.account.delivery.streets;
              this.data.address.house = this.account.delivery.house;
              this.data.address.apartment = this.account.delivery.apartment;
            }
          }
        },
        togle_edit_profile() {
          this.is_edit.profile = !this.is_edit.profile;
        },
        togle_edit_password(){
          this.is_edit.password = !this.is_edit.password;
        },
        togle_edit_address(){
          this.is_edit.address = !this.is_edit.address;
        },
        index_input(){
          let data = this.data.address.index;

          if(data[0] && /\d/.test(data[0])){
            this.data.address.index = this.change_to_mask(data, this.const.mask.index, window.event);
          }else{
            this.data.address.index = "";
          }
        },
        phone_input(){
          let data = this.data.account.phone;
          if(data[0] && (data[0] === '+' || data[0] === '7' || data[0] === '9')){
            this.data.account.phone = data === this.const.cmask.phone ? "" : this.change_to_mask(data, this.const.mask.phone, window.event);
          }else{
            this.data.account.phone = ""
          }
        },
        set_cursor_pos(el, pos){
          el.focus();
          el.setSelectionRange(pos, pos);
        },
        change_to_mask(value, masked, object){
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
          if(object)
            this.$nextTick(() => this.set_cursor_pos(object.target, i));
          return masked
        }
      }
    }
</script>

<style scoped>

  .profile-header .exit-fa{
    color: #565656;
    font-size: .8em;
    padding: .1em;
    cursor: pointer;
  }


  .profile-header{
    font-size: 36px;
  }
  .profile-container{
    font-size: 24px;
    margin: .75em auto;
    display: flex;
    position: relative;
    padding: 0 1em;
    flex-wrap: wrap;
    max-width: 45em;
  }
  .profile-linear{
    display: flex;
    justify-content: space-between;
  }

  .profile-box{
    padding: .5em;
    position: relative;
  }
  .box-name{
    font-size: 1.2em;
    display: flex;
  }
  .box-name .box-edit{
    font-weight: 700;
    font-size: .7em;
    color: #565656;
    font-family: sans-serif;
    margin: 0 0 0 1em;
    cursor: pointer;
    transition: color .5s, background-color .5s;
    border-radius: .5em;
    user-select: none;
    position: absolute;
    right: .7em;
    height: 2em;
    width: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box-name .box-edit.active{
    background-color: #000;
    color: white;
  }
  .input-split{
    margin: .5em 0;
    display: flex;
    position: relative;
    justify-content: space-between;
  }

  .input-box.solo{
    margin: .5em 0;
  }

  .box-content{
    margin: .5em 0;
  }
  input[type="text"].profile-input:disabled,
  input[type="password"].profile-input:disabled
  {
    background-color: #ececec;
    transition: background-color .5s;
  }

  @media only screen and (max-width: 1023px){
    .profile-linear{
      flex-wrap: wrap;
      justify-content: center;
    }

    .profile-box{
      width: 100%;
    }

    .profile-container{
      max-width: 100vw;
    }
  }

  @media only screen and (max-width: 729px){
    .input-split.md-address{
      flex-wrap: wrap;
      margin: 0;
    }
    .input-split.md-address .input-box{
      width: 100% !important;
      margin-bottom: .5em;
    }

    .profile-header .exit-fa{
      position: absolute;
      transform: translate(-50%, -50%);
      right: .8em;
      top: 4.25em;
    }

  }
  @media only screen and (max-width: 649px){
    .input-split.mb-all{
      flex-wrap: wrap;
      margin: 0;
    }
    .input-box{
      width: 100% !important;
      margin-bottom: .5em;
    }
  }
  @media only screen and (max-width: 449px){
    .profile-container {
      font-size: 5.345vw;
    }
  }

</style>
