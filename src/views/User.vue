<template>
    <div class="login">
        <br>
      <div class="header">
        <img :src="logoImageUrl" alt="Logo" height="100" width="100" />
        <h1>Masuk</h1>
      </div>
      <form @submit.prevent="handleSubmit" class="login-form">
        <input
          name="email"
          placeholder="Email"
          type="email"
          class="login-input"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          class="login-input"
        />
        <br><br><br><br>
        <button type="submit" class="login-btn">Login</button>
      </form>
      <br><br><br>
      <div class="donthaveaccount">
        <p>Belum punya akun? <router-link to="/register">Daftar</router-link></p>
      </div>
    </div>
</template>
  
<script>
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  export default {
    name: "LoginForm",
    setup() {
      const auth = getAuth();
      const router = useRouter();
  
      const handleSubmit = async (e) => {
        const { email, password } = e.target.elements;
        try {
          await signInWithEmailAndPassword(auth, email.value, password.value);
          router.push("/Sidebar");
        } catch (e) {
          alert(e.message);
        }
      };
  
      return {
        handleSubmit ,
        logoImageUrl: 'https://shopper.nitipaja.online/storage/images/nitipaja.png',
     };
    },
  };
</script>
  
<style>
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .header {
    text-align: center;
    margin-bottom: 20px;
  }

  .header h1 {
    font-size: 24px;
    margin-top: 10px;
  }
  
  .login-input {
    width: 90%;
    height: 50px;
    font-size: 17px;
    padding: 0 25px;
    margin-bottom: 15px;
    border-radius: 10px; /* Penyesuaian lengkungan */
    border: 1px solid #ccc;
  }
  
  .login-btn {
    width: 100%;
    height: 50px;
    border-radius: 30px;
    border: none;
    background-color: #4677d5;
    color: #fff;
    font-size: 17px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .login-btn:hover {
    background-color: #345dbf;
  }
    .login-form {
        width: 100%;
        max-width: 400px;
    }
    .dont-have-account{
      display: flex;
      justify-content: center;
      font-size: 17px;
      color: #000;
      font-weight: 500;
  }
    .dont-have-account a{
        color: #4677D5;
        margin-left: 5px;

    }
    .dont-have-account a:hover{
        text-decoration: underline;
    }
</style>
  