export default {
  name: 'InfoCard',
  props: {
    title: { type: String, required: true },
    value: { type: [String, Number], required: true },
    buttonText: { type: String, required: true }
  },
  emits: ['action'],
  template: `
    <div class="card">
      <h3>{{ title }}</h3>
      <p>{{ value }}</p>
      <button class="btn_sied" @click="$emit('action')">{{ buttonText }}</button>
    </div>
  `
}; 