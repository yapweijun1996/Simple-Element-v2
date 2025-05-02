import Sidebar from './components/Sidebar.js';
import Header from './components/Header.js';
import MainContent from './components/MainContent.js';

export default {
  components: { Sidebar, Header, MainContent },
  template: `
    <div class="admin-container">
      <Sidebar v-model="currentView" />
      <div class="main-area">
        <Header @logout="onLogout" />
        <MainContent :current-view="currentView" :stock-data="stockData" />
      </div>
    </div>
  `,
  data() {
    return {
      currentView: 'Dashboard',
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
