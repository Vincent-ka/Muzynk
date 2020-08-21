<template>
  <section class="sectionAmis">
    <article>
      <!-- <h2 class="chat-title">Chat</h2> -->
      <div class="chatbox" >
        <p v-for="(msg, index) in messages" :key="index">
          <span>{{ msg.user }}-</span>
          {{ msg.message }}
        </p>
      </div>
      <form class="chatform" @submit.prevent="sendMessage">
        <div>
          <!-- <label for="user">User:</label> -->
          <!-- <input type="text" v-model="user" /> -->
        </div>
        <div>
          <input class="chat-input" type="text" v-model="message"/>
        </div>
        <button type="submit" class="chat-submit">Send</button>
      </form>
    </article>
  </section>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      user: "",
      message: "",
      messages: [],
      socket: io("localhost:3001"),
    };
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit("SEND_MESSAGE", {
        user: this.user,
        message: this.message
      });
      this.message = "";
    }
  },
  mounted() {
    this.socket.on("MESSAGE", data => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
    });
  }
};
</script>

<style>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionAmis {
    height: 100%;
    width: 900%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (min-width: 980px) {
  .sectionAmis {
    width: 80%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.sectionAmis > article {
  width: 90%;
  height: 90%;
  position: relative;
}

.chatbox {
  background: red;
  width: 100%;
  height: 90%;
  background: white;
  overflow-y: auto;
  border: 2px solid black;
}

.chatbox p {
  margin-bottom: 20px;
}

.chatform {
  display: flex;
  position: absolute;
  bottom: 0;
  border-top: 1px solid;
  height: 10%;
  width: 100%;
  background: gray;
  justify-content: center;
  border: 2px solid black;
  border-top: none;
}

.chat-submit {
  width: 50px;
  height: 100%;
  align-self: center;
  margin-left: auto;
}

.chatform div {
  align-self: center;
}

.chat-input {
  margin-left: 10px
}
</style>
