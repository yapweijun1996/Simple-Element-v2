import InfoCard from '../components/widgets/InfoCard.js';
import StockLookup from '../components/widgets/StockLookup.js';

export default {
  name: 'DashboardView',
  props: {
    stockData: { type: Object, required: true },
    activeUsers: { type: [Number, String], default: 0 },
    salesToday: { type: [Number, String], default: 0 },
    serverLoad: { type: [Number, String], default: 0 }
  },
  components: { InfoCard, StockLookup },
  template: `
    <div>
      <div class="cards">
        <InfoCard title="Active Users" :value="activeUsers" button-text="View" @action="() => {}" />
        <InfoCard title="Sales Today" :value="'$' + salesToday" button-text="Details" @action="() => {}" />
        <InfoCard title="Server Load" :value="serverLoad + '%'" button-text="Monitor" @action="() => {}" />
      </div>
      <StockLookup :stock-data="stockData" />
    </div>
  `
};
