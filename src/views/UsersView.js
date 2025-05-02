import DataTable from '../components/users/DataTable.js';
import EditUserModal from '../components/users/EditUserModal.js';

export default {
  name: 'UsersView',
  props: {
    users: { type: Array, required: true }
  },
  components: { DataTable, EditUserModal },
  data() {
    return { editingUser: null };
  },
  methods: {
    onEdit(user) {
      this.editingUser = user;
    },
    onSave(updatedUser) {
      // Here you would normally update the user in your store or via API
      Object.assign(this.editingUser, updatedUser);
      this.editingUser = null;
    },
    onClose() {
      this.editingUser = null;
    }
  },
  template: `
    <div>
      <h2>Users</h2>
      <DataTable :items="users" @edit="onEdit" />
      <EditUserModal v-if="editingUser" :user="editingUser" @save="onSave" @close="onClose" />
    </div>
  `
};
