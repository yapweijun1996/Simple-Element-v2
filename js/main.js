// js/main.js
const Dashboard = {
  template: `
    <div>
      <div class="header"><h1>Dashboard</h1></div>
      <p>Welcome to the admin dashboard.</p>
    </div>
  `
};

const Users = {
  template: `
    <div>
      <div class="header"><h1>Users</h1></div>
      <table class="table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button class="button" @click="editUser(user)">Edit</button>
              <button class="button" @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  data() {
    return {
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ]
    }
  },
  methods: {
    editUser(user) {
      alert('Edit ' + user.name);
    },
    deleteUser(id) {
      this.users = this.users.filter(u => u.id !== id);
    }
  }
};

const Settings = {
  template: `
    <div>
      <div class="header"><h1>Settings</h1></div>
      <form @submit.prevent="saveSettings">
        <div>
          <label>Site Title:</label>
          <input type="text" v-model="settings.siteTitle" />
        </div>
        <div>
          <label>Enable Notifications:</label>
          <input type="checkbox" v-model="settings.notifications" />
        </div>
        <button class="button" type="submit">Save</button>
      </form>
    </div>
  `,
  data() {
    return {
      settings: {
        siteTitle: 'My Admin Panel',
        notifications: true
      }
    }
  },
  methods: {
    saveSettings() {
      alert('Settings Saved: ' + JSON.stringify(this.settings));
    }
  }
};

const routes = [
  { path: '/', component: Dashboard },
  { path: '/users', component: Users },
  { path: '/settings', component: Settings }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const app = Vue.createApp({
  template: `
    <nav class="sidebar">
      <ul>
        <li><router-link to="/">Dashboard</router-link></li>
        <li><router-link to="/users">Users</router-link></li>
        <li><router-link to="/settings">Settings</router-link></li>
      </ul>
    </nav>
    <main class="content">
      <router-view></router-view>
    </main>
  `
});

app.use(router);
app.mount('#app'); 