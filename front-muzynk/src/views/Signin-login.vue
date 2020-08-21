<template>
  <main class="main-log">
    <section class="sectionLog">
      <article>
        <form action="#" class="form-log">
          <h2>Connectez-vous</h2>

          <label for="input-email-log" class="is-clickable">Email</label>
          <input id="input-email-log" type="emil" class="input" name="email" />

          <label for="input-password-log" class="is-clickable">Mot de passe</label>
          <input id="input-password-log" type="password" class="input" name="password" />
          <button class="btn">ok</button>
        </form>
      </article>

      <article>
        <form action="#" class="form-log">
          <h2>Inscrivez vous</h2>

          <label for="input-firstname" class="is-clickable">Prénom</label>
          <input id="input-firtname" type="text" class="input" name="firstname" />

          <label for="input-lastname" class="is-clickable">Nom de famille</label>
          <input id="input-lastname" type="text" class="input" name="lastname" />

          <label for="input-email-sign" class="is-clickable">Email</label>
          <input id="input-email-sign" type="email" class="input" name="email" />

          <label for="input-password-sign" class="is-clickable">Mot de passe</label>
          <input id="input-password-sign" type="password" class="input" name="password" />

          <label for="input-checkpassword" class="is-clickable">Confirmation mot de passe</label>
          <input id="input-checkpassword" type="password" class="input" name="checkpassword" />
          <button class="btn">ok</button>
        </form>
      </article>
    </section>
  </main>
</template>

<script>
export default {};
</script>

<style>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionLog {
    overflow-y: auto;
  }

  .sectionLog > article {
    width: 100%;
    display: flex;
    justify-content: center;
    /* align-items: center; */
  }
}

@media screen and (min-width: 980px) {
  .sectionLog {
    display: flex;
    justify-content: space-around;
  }

  .sectionLog > article {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.main-log {
  height: 84vh;
  background: #426859;
}

.sectionLog {
  width: 100%;
  height: 100%;
}

.form-log {
  display: flex;
  flex-direction: column;
  max-width: 320px;
}

.form-log .label {
  cursor: pointer;
  margin-bottom: 6px;
}

.form-log .input {
  padding: 7px 0 7px 20px;
  margin-bottom: 10px;
  height: 32px;
  width: 100%;
}

.form-log .input:last-of-type {
  margin-bottom: 20px;
}

.form-log .input,
.form-log .btn {
  border: 1px solid;
  border-radius: 0.3rem;
}

.form-log .btn {
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 32px;
  max-width: 120px;
  margin-bottom: 20px;
}
</style>