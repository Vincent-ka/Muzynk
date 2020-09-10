<template>
  <section class="sectionNavigation">
    <article>
      <nav id="navigation" :class="isActive && 'is-active'">
        <ul>
          <li id="closeNavigation" @click="closeNav">X</li>
          <li class="forum lien-opa">
            <img src="./../../assets/accueil.png" alt="picto de l'accueil" />
            <router-link to="/">Forum</router-link>
          </li>
          <li class="feed lien-opa">
            <img src="./../../assets/feed.png" alt="picto du feed" />
            <router-link to="/feed">Feed</router-link>
          </li>
          <li class="chat lien-opa">
            <img src="./../../assets/chat.png" alt="picto du chat" />
            <router-link to="/chat">Chat</router-link>
          </li>
          <li class="profil lien-opa dashboard">
            <img src="./../../assets/profil.png" alt="picto du profil" />
            <router-link to="/profil">Profil</router-link>
          </li>
          <li v-if="currentUser && currentUser.role === 'admin'" class="dashboard lien-opa ">
            <img src="./../../assets/profil.png" alt="picto du profil" />
            <router-link to="/dashboard">Dashboard</router-link>
          </li>
        </ul>
      </nav>
    </article>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    currentUser() {
      const userInfos = this.$store.getters["user/current"]; // récupère l'user connecté depuis le store/user
      return userInfos; // retourne les infos, desormais accessible dans le component sous le nom currentUser
    }
  },
  methods: {
    closeNav() {
      this.isActive = !this.isActive
    }
  },
  beforeMount() {
    this.$ebus.$on("toggle-nav", () => {
      this.isActive = !this.isActive
    })
  }
};
</script>

<style>
@media screen and (max-width: 320px) {
}

@media screen and (min-width: 320px) and (max-width: 979px) {

.sectionNavigation {
  width: 0%;
  height: 100%;
}

  #navigation {
    padding: 50px;
    border: 1px solid black;
    position: fixed;
    height: 100vh;
    top: 0;
    width: 20%;
    min-width: 320px;
    background: #4f7f88;
    box-shadow: -3px 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1;
    right: -100%;
    transition: right 1s;
  }

  #navigation.is-active {
    right: 0%
  }

  #closeNavigation {
    text-decoration: none;
    color: #282828;
    font-size: 20px;
    text-transform: uppercase;
    cursor: pointer;
  }

  li.photoNav > div {
    width: 50px;
    height: 50px;
    border: 1px solid black;
    border-radius: 50%;
  }
}

@media screen and (min-width: 980px) {
  #navigation {
    width: 78%;
    height: 70%;
    background: #4f7f88;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
  }

  .photoNav {
    display: none;
  }

  #closeNavigation {
    display: none;
    height: 0;
    width: 0;
  }

  .sectionNavigation {
  width: 20%;
  height: 100%;
}
}



.sectionNavigation a {
  text-decoration: none;
  color: black;
  font-size: 20px;
}

.sectionNavigation > article {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sectionNavigation > article > nav > ul {
  list-style: none;
}

.sectionNavigation > article > nav > ul > li {
  margin-bottom: 40px;
}

.forum > a {
  margin-left: 15px;
}

.forum > img, .feed > img, .chat > img {
  width: 30px;
}

.profil > img, .dashboard > img {
  width: 20px;
}

.feed > a {
  margin-left: 15px;
}

.chat > a {
  margin-left: 15px;
}

.profil > a {
  margin-left: 17px;
}

.dashboard > a {
  margin-left: 17px;
}

img {
  width: 30px;
}
</style>