import CardGrid from '../components/CardGrid.js';

// Import UI components manually for preview
import Sidebar from '../components/Sidebar.js';
import Header from '../components/Header.js';
import MainContent from '../components/MainContent.js';
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
  MainContent,
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
  template: `
    <div class="elements-view">
      <h1>Elements</h1>
      <input v-model="filter" placeholder="Search components..." />
      <CardGrid>
        <div v-for="item in filteredList" :key="item.name" class="component-card">
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