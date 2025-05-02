export default {
  name: 'DataTable',
  props: {
    items: { type: Array, required: true }
  },
  emits: ['edit'],
  template: `
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in items" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.status }}</td>
          <td><button class="btn_sied" @click="$emit('edit', user)">Edit</button></td>
        </tr>
      </tbody>
    </table>
  `
};
