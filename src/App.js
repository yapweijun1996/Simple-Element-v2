import Sidebar from './components/Sidebar.js';
import Header from './components/Header.js';
import MainContent from './components/MainContent.js';
import DashboardView from './components/DashboardView.js';

export default {
  components: { Sidebar, Header, MainContent, DashboardView },
  template: `
    <div class="admin-container">
      <Sidebar v-model="currentView" />
      <div class="main-area">
        <Header @logout="onLogout" />
        <MainContent
          :current-view="currentView"
          :stock-data="stockData"
          :active-users="activeUsers"
          :sales-today="salesToday"
          :server-load="serverLoad"
        />
      </div>
    </div>
  `,
  data() {
    return {
      currentView: 'Dashboard',
      activeUsers: 1234,
      salesToday: 4560,
      serverLoad: 67,
      stockData: {
        AAPL: { desc: 'Apple Inc. - Technology', unique: 'NASDAQ: AAPL' },
        GOOGL: { desc: 'Alphabet Inc. - Technology', unique: 'NASDAQ: GOOGL' },
        MSFT: { desc: 'Microsoft Corporation - Technology', unique: 'NASDAQ: MSFT' },
        AMZN: { desc: 'Amazon.com, Inc. - Consumer Goods', unique: 'NASDAQ: AMZN' },
        FB: { desc: 'Meta Platforms Inc. - Communication Services', unique: 'NASDAQ: FB' }
      }
    };
  },
  methods: {
    onLogout() {
      alert('Logged out');
    }
  }
};
