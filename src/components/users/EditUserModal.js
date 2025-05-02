export default {
  name: 'EditUserModal',
  props: {
    user: { type: Object, required: true }
  },
  emits: ['save', 'close'],
  data() {
    return {
      formData: { ...this.user }
    };
  },
  methods: {
    onSave() {
      this.$emit('save', this.formData);
    }
  },
  template: `
    <div class="modal-overlay">
      <div class="modal">
        <h3>Edit User</h3>
        <label>User ID</label>
        <input type="text" class="textbox_001_sied" v-model="formData.id" readonly />
        <label>Name</label>
        <input type="text" class="textbox_001_sied" v-model="formData.name" />
        <label>Email</label>
        <input type="text" class="textbox_001_sied" v-model="formData.email" />
        <label>Status</label>
        <select class="select_so_001_sied" v-model="formData.status">
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <div class="modal-actions">
          <button class="btn_sied" @click="onSave">Save</button>
          <button class="btn_sied" @click="$emit('close')">Cancel</button>
        </div>
      </div>
    </div>
  `
};
