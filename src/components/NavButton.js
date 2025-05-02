export default {
  name: 'NavButton',
  props: {
    label: { type: String, default: '' },
    value: { type: String, default: '' },
    modelValue: { type: String, default: '' }
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