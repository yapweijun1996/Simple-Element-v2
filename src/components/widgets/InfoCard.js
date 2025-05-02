export default {
  name: 'InfoCard',
  props: {
    title: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
    buttonText: { type: String, default: '' }
  },
  created() {
    console.log('[InfoCard] props:', { title: this.title, value: this.value, buttonText: this.buttonText });
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