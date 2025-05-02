import CardGrid from '../components/CardGrid.js';

// Import UI components manually for preview
import Sidebar from '../components/Sidebar.js';
import Header from '../components/Header.js';
import Breadcrumbs from '../components/Breadcrumbs.js';
import NavButton from '../components/NavButton.js';
import StockLookup from '../components/widgets/StockLookup.js';
import InfoCard from '../components/widgets/InfoCard.js';
import ThemeToggle from '../components/settings/ThemeToggle.js';
import LanguageSelect from '../components/settings/LanguageSelect.js';
import EditUserModal from '../components/users/EditUserModal.js';
import DataTable from '../components/users/DataTable.js';

// Manually define list of components to display
const components = {
  CardGrid,
  Sidebar,
  Header,
  Breadcrumbs,
  NavButton,
  StockLookup,
  InfoCard,
  ThemeToggle,
  LanguageSelect,
  EditUserModal,
  DataTable
};
const componentList = Object.keys(components).map(name => ({ name }));

export default {
  name: 'ElementsView',
  components,
  created() {
    console.log('[ElementsView] available components:', componentList);
  },
  watch: {
    filter(newVal) {
      console.log('[ElementsView] filter changed to:', newVal);
    }
  },
  beforeMount() {
    console.log('[ElementsView] beforeMount - components available:', this.$options.components);
  },
  mounted() {
    console.log('[ElementsView] mounted - full list:', this.list);
  },
  data() {
    return {
      filter: '',
      list: componentList
    };
  },
  computed: {
    filteredList() {
      const term = this.filter.toLowerCase();
      return this.list.filter(item => item.name.toLowerCase().includes(term));
    }
  },
  methods: {
    logItem(item) {
      console.log('[ElementsView] previewing component:', item.name);
    }
  },
  template: `
    <div class="elements-view">
      <h1>Elements</h1>
      <input v-model="filter" placeholder="Search components..." />
      <CardGrid>
        <div v-for="item in filteredList" :key="item.name" class="component-card" @mouseenter="logItem(item)">
          <h3>{{ item.name }}</h3>
          <div class="preview">
            <component :is="item.name" />
          </div>
          <pre><code>import {{ item.name }} from '../components/{{ item.name }}.js'</code></pre>
        </div>
      </CardGrid>
    </div>
  `
}; 