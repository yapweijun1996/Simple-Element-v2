export default {
  name: 'Sidebar',
  props: {
    modelValue: { type: String, default: 'Dashboard' }
  },
  emits: ['update:modelValue'],
  methods: {
    select(view) {
      this.$emit('update:modelValue', view);
    }
  },
  template: `
    <aside class="sidebar">
      <button class="btn_sied nav-btn" :class="{active: modelValue==='Dashboard'}" @click="select('Dashboard')">Dashboard</button>
      <button class="btn_sied nav-btn" :class="{active: modelValue==='Users'}" @click="select('Users')">Users</button>
      <button class="btn_sied nav-btn" :class="{active: modelValue==='Settings'}" @click="select('Settings')">Settings</button>
      <button class="btn_sied nav-btn" :class="{active: modelValue==='Reports'}" @click="select('Reports')">Reports</button>
    </aside>
  `
};
