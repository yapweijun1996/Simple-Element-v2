export default {
  name: 'Header',
  emits: ['logout'],
  template: `
    <header class="header">
      <div>My Admin Panel</div>
      <button class="btn_sied" @click="$emit('logout')">Logout</button>
    </header>
  `
};
