import DashboardView from '../views/DashboardView.js';
import UsersView from '../views/UsersView.js';
import SettingsView from '../views/SettingsView.js';
import ReportsView from '../views/ReportsView.js';

export default {
  name: 'MainContent',
  props: {
    currentView: { type: String, required: true },
    stockData: { type: Object, required: true }
  },
  components: { DashboardView, UsersView, SettingsView, ReportsView },
  template: `
    <main class="main-content">
      <DashboardView v-if="currentView === 'Dashboard'" :stock-data="stockData" />
      <UsersView v-else-if="currentView === 'Users'" />
      <SettingsView v-else-if="currentView === 'Settings'" />
      <ReportsView v-else-if="currentView === 'Reports'" />
    </main>
  `
};
