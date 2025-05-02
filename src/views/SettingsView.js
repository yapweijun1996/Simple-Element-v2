import LanguageSelect from '../components/settings/LanguageSelect.js';
import ThemeToggle from '../components/settings/ThemeToggle.js';

export default {
  name: 'SettingsView',
  props: {
    settings: { type: Object, required: true }
  },
  components: { LanguageSelect, ThemeToggle },
  template: `
    <div>
      <h2>Settings</h2>
      <LanguageSelect v-model="settings.language" />
      <br><br>
      <ThemeToggle v-model="settings.theme" />
    </div>
  `
};
