<template>
  <section class="sectionDashboard">
    <article>
      <table class="table-user">
        <thead>
          <tr class="table-user-row">
            <th class="table-user-head">Nom</th>
            <th class="table-user-head">Nom de famille</th>
            <th class="table-user-head">Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in users" :key="i" class="table-user-row">
            <th class="head-user-responsive">Nom</th>
            <td>{{user.firstname}}</td>
            <th class="head-user-responsive">Nom de famille</th>
            <td>{{user.lastname}}</td>
            <th class="head-user-responsive">Email</th>
            <td class="last-user-td">{{user.email}}</td>
            <td>
              <router-link :to="'/dashboard/edit/' + user._id">
              <p>Edit</p>
              </router-link>
            </td>
            <td class="last-user-td is-clickable" @click="deleteUser(user._id)">X</td>
            <div v-for="(ami, i) in users.friendlist" :key="i">
              <td>{{ami[1]}}</td>
            </div>
          </tr>
        </tbody>
      </table>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: []
    };
  },
  methods: {
    async getUsers() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users"
      );
      this.users = apiRes.data;
    },
    async deleteUser(id) {
      const apiRes = await axios.delete(
        process.env.VUE_APP_BACKEND_URL + "/users/" + id
      );
      this.users = apiRes.data;
      this.getUsers()
    }
  },
  created() {
    try {
      this.getUsers();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionDashboard {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
  }
  .table-user-row {
    display: flex;
    flex-direction: column;
  }
  .table-user-head {
    display: none;
  }
  .last-user-td {
    margin-bottom: 20px;
  }
  .table-user {
    width: 100%;
  }
  .head--user-responsive {
    display: block;
  }
}

@media screen and (min-width: 980px) {
  .sectionDashboard {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
  }

  .table-user {
    border: 3px solid black;
    border-collapse: collapse;
    width: 100%;
  }
  .head-user-responsive {
    display: none;
  }
}

.sectionDashboard > article {
  width: 90%;
  height: 90%;
}

.table-user th {
  border: 1px solid;
  padding: 5px;
  text-align: center;
}

.table-user td {
  border: 1px solid;
  padding: 5px;
  text-align: center;
}

.is-clickable {
  cursor: pointer;
}
</style>