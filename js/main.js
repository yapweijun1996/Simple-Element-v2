// js/main.js
const Dashboard = {
  template: `
    <div>
      <div class="element-section page-header">
        <h1 class="element-title">Dashboard</h1>
      </div>

      <div class="element-section">
        <h2 class="element-title">Welcome</h2>
        <div class="element-demo">
          <p>Welcome to the admin dashboard.</p>
        </div>
      </div>

      <div class="element-section">
        <h2 class="element-title">Quick Actions</h2>
        <div class="element-demo">
          <input type="button" value="Add User" class="btn_sied" @click="$router.push('/users')" />
          <input type="button" value="View Users" class="btn_sied" @click="$router.push('/users')" />
          <input type="button" value="Settings" class="btn_sied" @click="$router.push('/settings')" />
        </div>
      </div>
    </div>
  `
};

const Users = {
  template: `
    <div>
      <div class="element-section page-header">
        <h1 class="element-title">Users</h1>
      </div>
      <table class="table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <input type="button" class="btn_sied" value="Edit" @click="editUser(user)" />
              <input type="button" class="btn_sied" value="Delete" @click="deleteUser(user.id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  data() {
    return {
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ]
    }
  },
  methods: {
    editUser(user) {
      alert('Edit ' + user.name);
    },
    deleteUser(id) {
      this.users = this.users.filter(u => u.id !== id);
    }
  }
};

const Settings = {
  template: `
    <div>
      <div class="element-section page-header">
        <h1 class="element-title">Settings</h1>
      </div>
      <form @submit.prevent="saveSettings">
        <div>
          <label class="label_so_001_sied">Site Title:</label>
          <input type="text" class="textbox_001_sied" v-model="settings.siteTitle" />
        </div>
        <div>
          <label class="checkbox_label_sied">Enable Notifications:</label>
          <input type="checkbox" class="checkbox_sied" v-model="settings.notifications" />
        </div>
        <input type="submit" class="btn_sied" value="Save" />
      </form>
    </div>
  `,
  data() {
    return {
      settings: {
        siteTitle: 'My Admin Panel',
        notifications: true
      }
    }
  },
  methods: {
    saveSettings() {
      alert('Settings Saved: ' + JSON.stringify(this.settings));
    }
  }
};

const Elements = {
  template: `
    <div>
      <div class="element-section page-header">
        <h1 class="element-title">UI Elements</h1>
      </div>
      <p>This page demonstrates the available UI components and how to use them.</p>
      
      <!-- Button Elements -->
      <div class="element-section">
        <h2 class="element-title">Buttons</h2>
        <div class="element-demo">
          <input type="button" value="Button" class="btn_sied">
        </div>
        <div class="code-block">
          <pre>&lt;input type="button" value="Button" class="btn_sied"&gt;</pre>
        </div>
        <div class="element-usage">
          Use the <code>btn_sied</code> class for styled buttons.
        </div>
      </div>
      
      <!-- Radio Elements -->
      <div class="element-section">
        <h2 class="element-title">Radio Buttons</h2>
        <div class="element-demo">
          <fieldset class="radio_fieldset_sied" role="radiogroup" aria-labelledby="standard-radio-legend">
            <legend id="standard-radio-legend">Standard Radio</legend>
            <div>
              <input id="html-demo" name="code_language_demo" value="HTML" type="radio" class="radio_sied">
              <label for="html-demo" class="radio_label_sied">HTML</label>
            </div>
            <div>
              <input id="css-demo" name="code_language_demo" value="CSS" type="radio" class="radio_sied">
              <label for="css-demo" class="radio_label_sied">CSS</label>
            </div>
            <div>
              <input id="js-demo" name="code_language_demo" value="JavaScript" type="radio" class="radio_sied">
              <label for="js-demo" class="radio_label_sied">JavaScript</label>
            </div>
          </fieldset>
          
          <h3 style="margin-top:15px;">Toolbar Radio</h3>
          <div class="radio_toolbar_sied" role="radiogroup" aria-label="Toolbar Radio">
            <div class="radio_toolbar_item_sied">
              <input id="type001-demo" name="radio_toolbar_demo" value="type001" type="radio" checked>
              <label for="type001-demo">Type 001</label>
            </div>
            <div class="radio_toolbar_item_sied">
              <input id="type002-demo" name="radio_toolbar_demo" value="type002" type="radio">
              <label for="type002-demo">Type 002</label>
            </div>
            <div class="radio_toolbar_item_sied">
              <input id="type003-demo" name="radio_toolbar_demo" value="type003" type="radio">
              <label for="type003-demo">Type 003</label>
            </div>
          </div>
        </div>
        <div class="code-block">
          <pre>&lt;!-- Standard Radio --&gt;
&lt;input id="html" name="code_language" value="HTML" type="radio" class="radio_sied"&gt;
&lt;label for="html" class="radio_label_sied"&gt;HTML&lt;/label&gt;

&lt;!-- Toolbar Radio --&gt;
&lt;div class="radio_toolbar_sied"&gt;
  &lt;div class="radio_toolbar_item_sied"&gt;
    &lt;input id="type001" name="radio_toolbar" value="type001" type="radio" checked&gt;
    &lt;label for="type001"&gt;Type 001&lt;/label&gt;
  &lt;/div&gt;
  &lt;!-- Add more items as needed --&gt;
&lt;/div&gt;</pre>
        </div>
        <div class="element-usage">
          Use <code>radio_sied</code> and <code>radio_label_sied</code> classes for standard radio buttons, or <code>radio_toolbar_sied</code> for button-style radios.
        </div>
      </div>
      
      <!-- Checkbox Elements -->
      <div class="element-section">
        <h2 class="element-title">Checkboxes</h2>
        <div class="element-demo">
          <fieldset class="checkbox_fieldset_sied" role="group" aria-labelledby="standard-checkbox-legend">
            <legend id="standard-checkbox-legend">Standard Checkbox</legend>
            <div>
              <input id="english-demo" name="display_language_demo" value="english" type="checkbox" class="checkbox_sied">
              <label for="english-demo" class="checkbox_label_sied">English</label>
            </div>
            <div>
              <input id="malay-demo" name="display_language_demo" value="malay" type="checkbox" class="checkbox_sied">
              <label for="malay-demo" class="checkbox_label_sied">Malay</label>
            </div>
          </fieldset>
          
          <h3 style="margin-top:15px;">Toolbar Checkbox</h3>
          <div class="checkbox_toolbar_sied" role="group" aria-label="Toolbar Checkbox">
            <div class="checkbox_toolbar_item_sied">
              <input id="langtype001-demo" name="checkbox_toolbar_demo" value="langtype001" type="checkbox">
              <label for="langtype001-demo">Language Type 001</label>
            </div>
            <div class="checkbox_toolbar_item_sied">
              <input id="langtype002-demo" name="checkbox_toolbar_demo" value="langtype002" type="checkbox">
              <label for="langtype002-demo">Language Type 002</label>
            </div>
          </div>
        </div>
        <div class="code-block">
          <pre>&lt;!-- Standard Checkbox --&gt;
&lt;input id="english" name="display_language" value="english" type="checkbox" class="checkbox_sied"&gt;
&lt;label for="english" class="checkbox_label_sied"&gt;English&lt;/label&gt;

&lt;!-- Toolbar Checkbox --&gt;
&lt;div class="checkbox_toolbar_sied"&gt;
  &lt;div class="checkbox_toolbar_item_sied"&gt;
    &lt;input id="langtype001" name="checkbox_toolbar" value="langtype001" type="checkbox"&gt;
    &lt;label for="langtype001"&gt;Language Type 001&lt;/label&gt;
  &lt;/div&gt;
  &lt;!-- Add more items as needed --&gt;
&lt;/div&gt;</pre>
        </div>
        <div class="element-usage">
          Use <code>checkbox_sied</code> and <code>checkbox_label_sied</code> classes for standard checkboxes, or <code>checkbox_toolbar_sied</code> for button-style checkboxes.
        </div>
      </div>
      
      <!-- Text Inputs -->
      <div class="element-section">
        <h2 class="element-title">Text Inputs</h2>
        <div class="element-demo">
          <h3>Style 1</h3>
          <input name="username1" placeholder="Default" type="text" class="textbox_001_sied">
          <input name="username2" placeholder="Error" type="text" class="textbox_001_sied error">
          <input name="username3" placeholder="Warning" type="text" class="textbox_001_sied warning">
          <input name="username4" placeholder="Success" type="text" class="textbox_001_sied success">
          
          <h3 style="margin-top:15px;">Style 2</h3>
          <input name="username5" placeholder="Default" type="text" class="textbox_002_sied">
          <input name="username6" placeholder="Error" type="text" class="textbox_002_sied error">
          <input name="username7" placeholder="Warning" type="text" class="textbox_002_sied warning">
          <input name="username8" placeholder="Success" type="text" class="textbox_002_sied success">
        </div>
        <div class="code-block">
          <pre>&lt;!-- Style 1 --&gt;
&lt;input name="username" placeholder="Default" type="text" class="textbox_001_sied"&gt;
&lt;input name="username" placeholder="Error" type="text" class="textbox_001_sied error"&gt;
&lt;input name="username" placeholder="Warning" type="text" class="textbox_001_sied warning"&gt;
&lt;input name="username" placeholder="Success" type="text" class="textbox_001_sied success"&gt;

&lt;!-- Style 2 --&gt;
&lt;input name="username" placeholder="Default" type="text" class="textbox_002_sied"&gt;
&lt;input name="username" placeholder="Error" type="text" class="textbox_002_sied error"&gt;
&lt;input name="username" placeholder="Warning" type="text" class="textbox_002_sied warning"&gt;
&lt;input name="username" placeholder="Success" type="text" class="textbox_002_sied success"&gt;</pre>
        </div>
        <div class="element-usage">
          Use <code>textbox_001_sied</code> or <code>textbox_002_sied</code> classes for styled inputs. Add status classes <code>error</code>, <code>warning</code>, or <code>success</code> as needed.
        </div>
      </div>
      
      <!-- Textarea -->
      <div class="element-section">
        <h2 class="element-title">Textarea</h2>
        <div class="element-demo">
          <textarea name="remark-demo" placeholder="Enter text here" class="textarea_001_sied" rows="4" style="width:100%;"></textarea>
        </div>
        <div class="code-block">
          <pre>&lt;textarea name="remark" placeholder="Enter text here" class="textarea_001_sied" rows="4" style="width:100%;"&gt;&lt;/textarea&gt;</pre>
        </div>
        <div class="element-usage">
          Use <code>textarea_001_sied</code> class for styled textareas. Add <code>rows</code> and <code>style="width:100%;"</code> attributes to control size.
        </div>
      </div>
      
      <!-- Select Options -->
      <div class="element-section">
        <h2 class="element-title">Select Dropdown</h2>
        <div class="element-demo">
          <label for="fruit-demo" class="label_so_001_sied">Choose a fruit:</label>
          <select name="fruit-demo" id="fruit-demo" class="select_so_001_sied">
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="cherry">Cherry</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div class="code-block">
          <pre>&lt;label for="fruit" class="label_so_001_sied"&gt;Choose a fruit:&lt;/label&gt;
&lt;select name="fruit" id="fruit" class="select_so_001_sied"&gt;
  &lt;option value="apple"&gt;Apple&lt;/option&gt;
  &lt;option value="banana"&gt;Banana&lt;/option&gt;
  &lt;option value="cherry"&gt;Cherry&lt;/option&gt;
  &lt;option value="date"&gt;Date&lt;/option&gt;
&lt;/select&gt;</pre>
        </div>
        <div class="element-usage">
          Use <code>label_so_001_sied</code> class for labels and <code>select_so_001_sied</code> class for select dropdowns.
        </div>
      </div>
      
      <!-- Font Sizes -->
      <div class="element-section">
        <h2 class="element-title">Font Sizes</h2>
        <div class="element-demo">
          <div class="font_sied_m_005">Font size -5px from base</div>
          <div class="font_sied_000">Base font size</div>
          <div class="font_sied_p_005">Font size +5px from base</div>
          <div class="font_sied_p_010">Font size +10px from base</div>
        </div>
        <div class="code-block">
          <pre>&lt;div class="font_sied_m_005"&gt;Font size -5px from base&lt;/div&gt;
&lt;div class="font_sied_000"&gt;Base font size&lt;/div&gt;
&lt;div class="font_sied_p_005"&gt;Font size +5px from base&lt;/div&gt;
&lt;div class="font_sied_p_010"&gt;Font size +10px from base&lt;/div&gt;</pre>
        </div>
        <div class="element-usage">
          Use classes <code>font_sied_000</code> for base size, <code>font_sied_p_###</code> for larger sizes (001-010), and <code>font_sied_m_###</code> for smaller sizes (001-010).
        </div>
      </div>
      
      <!-- Datalist -->
      <div class="element-section">
        <h2 class="element-title">Datalist Input</h2>
        <div class="element-demo">
          <input list="element-datalist" class="textbox_001_sied" type="text" placeholder="Type or select a stock code" id="element-datalist-input" autocomplete="off"
            oninput="updateStockDetails(this, document.getElementById('desc-demo'), document.getElementById('unique-demo'))" />
          <datalist id="element-datalist">
            <option value="AAPL">Apple Inc. - Technology</option>
            <option value="GOOGL">Alphabet Inc. - Technology</option>
            <option value="MSFT">Microsoft Corporation - Technology</option>
          </datalist>
          <div style="margin-top:10px;">
            <input id="desc-demo" type="text" placeholder="Description" class="textbox_001_sied" readonly />
            <input id="unique-demo" type="text" placeholder="Unique Code" class="textbox_001_sied" readonly />
          </div>
        </div>
        <div class="code-block">
          <pre>&lt;input list="datalist_id" class="textbox_001_sied" type="text" placeholder="Type or select..." id="input_id" autocomplete="off" oninput="updateStockDetails(this, document.getElementById('desc_id'), document.getElementById('unique_id'))"/&gt;
&lt;datalist id="datalist_id"&gt;
  &lt;option value="AAPL"&gt;Apple Inc. - Technology&lt;/option&gt;
  &lt;option value="GOOGL"&gt;Alphabet Inc. - Technology&lt;/option&gt;
  &lt;option value="MSFT"&gt;Microsoft Corporation - Technology&lt;/option&gt;
&lt;/datalist&gt;
&lt;div&gt;
  &lt;input id="desc_id" type="text" placeholder="Description" class="textbox_001_sied" readonly/&gt;
  &lt;input id="unique_id" type="text" placeholder="Unique Code" class="textbox_001_sied" readonly/&gt;
&lt;/div&gt;</pre>
        </div>
        <div class="element-usage">
          Combine <code>textbox_001_sied</code> with HTML5 datalist for searchable dropdown selections.
        </div>
      </div>
      
      <!-- Custom CSS Variables -->
      <div class="element-section">
        <h2 class="element-title">CSS Variables</h2>
        <div class="element-demo">
          <p>All styles are based on CSS variables that can be customized:</p>
          <ul style="list-style:inside; margin-top:10px;">
            <li><code>--backg-color</code>: Background color (default: white)</li>
            <li><code>--backg-color-hover</code>: Hover background color (default: black)</li>
            <li><code>--main-color</code>: Main theme color (default: black)</li>
            <li><code>--main-color-hover</code>: Hover text color (default: white)</li>
            <li><code>--main-color-error</code>: Error color (default: #EB1600)</li>
            <li><code>--main-color-warning</code>: Warning color (default: #FFF700)</li>
            <li><code>--main-color-success</code>: Success color (default: #14D114)</li>
            <li><code>--font-size</code>: Base font size (default: 16px)</li>
          </ul>
        </div>
        <div class="code-block">
          <pre>/* To customize the theme, override these variables */
:root {
  --backg-color: white;
  --backg-color-hover: black;
  --main-color: #3498db; /* Changed to blue */
  --main-color-hover: white;
  --font-size: 14px; /* Changed base font size */
}</pre>
        </div>
        <div class="element-usage">
          Override these CSS variables to customize the entire theme without modifying component classes.
        </div>
      </div>
    </div>
  `
};

const routes = [
  { path: '/', component: Dashboard },
  { path: '/users', component: Users },
  { path: '/settings', component: Settings },
  { path: '/elements', component: Elements }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const App = {
  data() {
    return { sidebarOpen: false };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    }
  },
  template: `
    <button class="sidebar-toggle" @click="toggleSidebar">☰</button>
    <nav :class="['sidebar', { open: sidebarOpen }]">
      <ul>
        <li><router-link to="/">Dashboard</router-link></li>
        <li><router-link to="/users">Users</router-link></li>
        <li><router-link to="/settings">Settings</router-link></li>
        <li><router-link to="/elements">UI Elements</router-link></li>
      </ul>
    </nav>
    <main class="content">
      <router-view></router-view>
    </main>
  `
};

const app = Vue.createApp(App);
app.use(router);
app.mount('#app'); 