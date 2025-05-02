export default {
  name: 'NavButton',
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    modelValue: { type: String, required: true }
  },
  emits: ['update:modelValue'],
  template: `
    <button
      class="btn_sied nav-btn"
      :class="{ active: modelValue === value }"
      @click="$emit('update:modelValue', value)">
      {{ label }}
    </button>
  `
}; 