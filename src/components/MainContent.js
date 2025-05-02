import DashboardView from '../views/DashboardView.js';
import UsersView from '../views/UsersView.js';
import SettingsView from '../views/SettingsView.js';
import ReportsView from '../views/ReportsView.js';

export default {
  name: 'MainContent',
  props: {
    currentView: { type: String, required: true },
    stockData: { type: Object, required: true },
    activeUsers: { type: [Number, String], required: true },
    salesToday: { type: [Number, String], required: true },
    serverLoad: { type: [Number, String], required: true },
    users: { type: Array, required: true },
    settings: { type: Object, required: true }
  },
  components: { DashboardView, UsersView, SettingsView, ReportsView },
  template: `
    <main class="main-content">
      <DashboardView
        v-if="currentView === 'Dashboard'"
        :stock-data="stockData"
        :active-users="activeUsers"
        :sales-today="salesToday"
        :server-load="serverLoad"
      />
      <UsersView v-else-if="currentView === 'Users'" :users="users" />
      <SettingsView v-else-if="currentView === 'Settings'" :settings="settings" />
      <ReportsView v-else-if="currentView === 'Reports'" />
    </main>
  `
};
