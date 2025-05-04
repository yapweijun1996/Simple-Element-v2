// js/main.js
const { defineAsyncComponent } = Vue;

// Async loading placeholder shown while component loads
const LoadingComponent = { template: '<div class="element-demo">Loading...</div>' };
// Error placeholder shown if loading fails, with retry button
const ErrorComponent = { template: '<div class="element-usage">Failed to load. <button class="btn_sied" @click="$forceUpdate()">Retry</button></div>' };

// Centralized confirmation dialog component
const ConfirmationDialog = {
  data() { return { show: false, message: '', resolve: null }; },
  template: `
    <div v-if="show" class="modal-overlay">
      <div class="element-section modal-content">
        <p>{{ message }}</p>
        <input type="button" class="btn_sied" value="Confirm" @click="confirm(true)" />
        <input type="button" class="btn_sied" value="Cancel" @click="confirm(false)" />
      </div>
    </div>
  `,
  methods: {
    open(msg) {
      this.message = msg;
      this.show = true;
      return new Promise(res => { this.resolve = res; });
    },
    confirm(val) {
      this.show = false;
      this.resolve(val);
    }
  }
};

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
          <input type="button" value="Add User" class="btn_sied" @click="$router.push('/users/create')" />
          <input type="button" value="View Users" class="btn_sied" @click="$router.push('/users')" />
          <input type="button" value="Settings" class="btn_sied" @click="$router.push('/settings')" />
        </div>
      </div>

      <!-- Key Metrics Cards -->
      <div class="element-section">
        <h2 class="element-title">Key Metrics</h2>
        <div class="element-demo metrics-container">
          <div class="card">
            <div class="card-title">Total Users</div>
            <div class="card-value">{{ userCount }}</div>
          </div>
          <div class="card">
            <div class="card-title">Total Orders</div>
            <div class="card-value">--</div>
          </div>
          <div class="card">
            <div class="card-title">Pending Tasks</div>
            <div class="card-value">--</div>
          </div>
        </div>
      </div>
    </div>
  `,
  computed: {
    // Compute the total number of users for the dashboard
    userCount() {
      return UserService.getUsers().length;
    }
  }
};

const Users = {
  template: `
    <div>
      <div class="element-section page-header">
        <h1 class="element-title">Users</h1>
      </div>
      <!-- Show skeleton placeholders while loading -->
      <div v-if="loading" class="element-demo">
        <div class="skeleton skeleton-row" v-for="i in 5" :key="i"></div>
      </div>
      <!-- Show data table when loading completes -->
      <table v-else-if="users.length" class="table">
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
      <div v-else class="element-section element-demo">
        <p>No users found. <input type="button" class="btn_sied" value="Create User" @click="$router.push('/users/create')" /></p>
      </div>
    </div>
  `,
  data() {
    return {
      loading: true,
      users: []
    };
  },
  created() {
    // Simulate loading delay for skeleton UI
    setTimeout(() => {
      this.users = UserService.getUsers();
      this.loading = false;
    }, 500);
  },
  methods: {
    editUser(user) {
      this.$router.push(`/users/${user.id}/edit`);
    },
    deleteUser(id) {
      // Use centralized confirmation dialog instead of window.confirm
      this.$root.$refs.confirm.open('Delete this user?').then(ok => {
        if (!ok) return;
        UserService.deleteUser(id);
        this.users = UserService.getUsers();
      });
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
  created() {
    try {
      const saved = JSON.parse(localStorage.getItem('admin_settings'));
      if (saved) this.settings = saved;
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  },
  methods: {
    saveSettings() {
      try {
        localStorage.setItem('admin_settings', JSON.stringify(this.settings));
        alert('Settings saved');
      } catch (error) {
        console.error('Error saving settings:', error);
        alert('Error saving settings: ' + error.message);
      }
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

// Async wrapper to lazy-load the Elements component (simulated code-split)
const ElementsAsync = defineAsyncComponent(() => new Promise(resolve => {
  setTimeout(() => resolve(Elements), 0);
}));

// 404 Not Found component for unmatched routes
const NotFound = {
  template: `
    <div class="element-section">
      <h1 class="element-title">404 - Page Not Found</h1>
      <p>The page you are looking for doesn't exist.</p>
      <input type="button" value="Go Home" class="btn_sied" @click="$router.push('/')" />
    </div>
  `
};

const UserService = {
  key: 'admin_users',
  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(this.key) || '[]');
    } catch (error) {
      console.error('Error getting users from localStorage:', error);
      return [];
    }
  },
  saveUsers(users) {
    try {
      if (!Array.isArray(users)) {
        console.error('Invalid users data - expected array');
        return false;
      }
      localStorage.setItem(this.key, JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Error saving users to localStorage:', error);
      return false;
    }
  },
  getUser(id) {
    try {
      if (!id || isNaN(parseInt(id))) {
        console.error('Invalid user id');
        return null;
      }
      return this.getUsers().find(u => u.id === id);
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },
  addUser(user) {
    try {
      if (!user || !user.name || !user.email) {
        console.error('Invalid user data');
        return false;
      }
      const users = this.getUsers();
      users.push(user);
      this.saveUsers(users);
      return true;
    } catch (error) {
      console.error('Error adding user:', error);
      return false;
    }
  },
  updateUser(updated) {
    try {
      if (!updated || !updated.id) {
        console.error('Invalid user data for update');
        return false;
      }
      const users = this.getUsers().map(u => u.id === updated.id ? updated : u);
      this.saveUsers(users);
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  },
  deleteUser(id) {
    try {
      if (!id || isNaN(parseInt(id))) {
        console.error('Invalid user id for deletion');
        return false;
      }
      const users = this.getUsers().filter(u => u.id !== id);
      this.saveUsers(users);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }
};

const CreateUser = {
  template: `
    <div>
      <div class="element-section page-header">
        <h1 class="element-title">Create User</h1>
      </div>
      <form @submit.prevent="createUser">
        <div>
          <label class="label_so_001_sied">Name:</label>
          <input type="text" class="textbox_001_sied" v-model="user.name" required />
        </div>
        <div>
          <label class="label_so_001_sied">Email:</label>
          <input type="email" class="textbox_001_sied" v-model="user.email" required />
        </div>
        <input type="submit" class="btn_sied" value="Create" />
      </form>
    </div>
  `,
  data() {
    return { user: { name: '', email: '' } };
  },
  methods: {
    createUser() {
      const users = UserService.getUsers();
      const maxId = users.reduce((max, u) => u.id > max ? u.id : max, 0);
      const newUser = { id: maxId + 1, name: this.user.name, email: this.user.email };
      UserService.addUser(newUser);
      this.$router.push('/users');
    }
  }
};

const EditUser = {
  template: `
    <div>
      <div class="element-section page-header">
        <h1 class="element-title">Edit User</h1>
      </div>
      <form @submit.prevent="updateUser">
        <div>
          <label class="label_so_001_sied">Name:</label>
          <input type="text" class="textbox_001_sied" v-model="user.name" required />
        </div>
        <div>
          <label class="label_so_001_sied">Email:</label>
          <input type="email" class="textbox_001_sied" v-model="user.email" required />
        </div>
        <input type="submit" class="btn_sied" value="Save" />
      </form>
    </div>
  `,
  data() {
    return { user: { id: null, name: '', email: '' } };
  },
  created() {
    const id = parseInt(this.$route.params.id);
    const existing = UserService.getUser(id);
    if (existing) {
      this.user = Object.assign({}, existing);
    }
  },
  methods: {
    updateUser() {
      UserService.updateUser(this.user);
      this.$router.push('/users');
    }
  }
};

// Step 6: Lazy-load Users with loading & error boundaries
const UsersAsync = defineAsyncComponent({
  loader: () => new Promise(resolve => setTimeout(() => resolve(Users), 0)),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
});

// Step 1: Add route meta titles for breadcrumbs
const routes = [
  { path: '/', component: Dashboard, meta: { title: 'Dashboard' } },
  { path: '/users', component: UsersAsync, meta: { title: 'Users' } },
  { path: '/users/create', component: CreateUser, meta: { title: 'Create User' } },
  { path: '/users/:id/edit', component: EditUser, meta: { title: 'Edit User' } },
  { path: '/settings', component: Settings, meta: { title: 'Settings' } },
  { path: '/elements', component: ElementsAsync, meta: { title: 'UI Elements' } },
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { title: 'Not Found' } }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

// Global component for breadcrumb navigation
const Breadcrumbs = {
  template: `
    <nav class="element-usage breadcrumb" aria-label="breadcrumb">
      <ul class="breadcrumb-list">
        <li v-for="(crumb, idx) in crumbs" :key="idx">
          <router-link v-if="idx < crumbs.length - 1" :to="crumb.path">{{ crumb.name }}</router-link>
          <span v-else>{{ crumb.name }}</span>
        </li>
      </ul>
    </nav>
  `,
  computed: {
    crumbs() {
      // Map matched routes to breadcrumb items (fall back to path segment if no meta.title)
      return this.$route.matched.map(r => ({
        name: r.meta && r.meta.title ? r.meta.title : r.path.replace(/\//g, ''),
        path: r.path
      }));
    }
  }
};

// Global component for toast notifications
const ToastContainer = {
  data() {
    return { toasts: [] };
  },
  template: `
    <div id="toast-container" class="element-demo toast-container">
      <div v-for="t in toasts" :key="t.id" class="toast" :class="t.type">{{ t.message }}</div>
    </div>
  `,
  methods: {
    addToast(message, type = 'info') {
      const id = Date.now();
      this.toasts.push({ id, message, type });
      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t.id !== id);
      }, 3000);
    }
  }
};

const App = {
  components: { ConfirmationDialog, Breadcrumbs, ToastContainer },
  data() {
    return {
      sidebarOpen: window.innerWidth >= 769,
      theme: localStorage.getItem('theme') || 'light',
      searchQuery: '',  // Step 3: search input state
      menuStates: {
        Core: true,
        Users: false
      },
      menuGroups: [
        {
          title: 'Core',
          items: [
            { name: 'Dashboard', path: '/' },
            { name: 'Settings', path: '/settings' },
            { name: 'UI Elements', path: '/elements' }
          ]
        },
        {
          title: 'Users',
          items: [
            { name: 'User List', path: '/users' },
            { name: 'Create User', path: '/users/create' }
          ]
        }
      ]
    };
  },
  computed: {
    // Filter menu items based on search query
    filteredMenuGroups() {
      const query = this.searchQuery.toLowerCase();
      return this.menuGroups
        .map(group => {
          const items = group.items.filter(item => item.name.toLowerCase().includes(query));
          return { ...group, items };
        })
        .filter(group => group.items.length > 0);
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    closeSidebar() {
      if (window.innerWidth < 769) {
        this.sidebarOpen = false;
      }
    },
    toggleGroup(group) {
      this.menuStates[group] = !this.menuStates[group];
    },
    isGroupActive(title) {
      return this.$route.matched.some(r => r.meta && r.meta.title === title);
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', this.theme);
      localStorage.setItem('theme', this.theme);
    }
  },
  template: `
    <ConfirmationDialog ref="confirm" />
    <button class="sidebar-toggle" @click="toggleSidebar" aria-label="Toggle navigation menu" :aria-expanded="sidebarOpen"></button>
    <!-- Step 3: Sidebar search filter -->
    <div class="element-demo" style="padding:8px;">
      <input
        type="text"
        v-model="searchQuery"
        class="textbox_001_sied"
        placeholder="Search menu..."
        aria-label="Search navigation menu"
      />
    </div>
    <div class="topbar-actions">
      <button class="btn_sied" @click="toggleTheme">{{ theme === 'light' ? '🌞' : '🌜' }}</button>
    </div>
    <nav
      :class="['sidebar', { open: sidebarOpen }]"
      role="menu"
      aria-label="Main navigation"
    >
      <div v-for="group in filteredMenuGroups" :key="group.title" class="sidebar-group">
        <div
          class="sidebar-group-title"
          @click="toggleGroup(group.title)"
          :class="{ active: isGroupActive(group.title) }"
          role="button"
          :aria-expanded="menuStates[group.title]"
          :aria-controls="'group-'+group.title"
        >
          {{ group.title }}
          <span class="chevron" :class="{ open: menuStates[group.title] }"></span>
        </div>
        <ul
          v-if="menuStates[group.title]"
          class="sidebar-group-list"
          :id="'group-'+group.title"
          role="menu"
        >
          <li
            v-for="item in group.items"
            :key="item.path"
            role="menuitem"
          >
            <router-link :to="item.path" @click="closeSidebar">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <main class="content" role="main">
      <Breadcrumbs></Breadcrumbs>
      <router-view></router-view>
      <ToastContainer></ToastContainer>
    </main>
  `
};

const app = Vue.createApp(App);

// Register global components to use anywhere in templates
app.component('Breadcrumbs', Breadcrumbs);
app.component('ToastContainer', ToastContainer);
app.component('ConfirmationDialog', ConfirmationDialog);

app.use(router);
app.mount('#app'); 