export default {
  name: 'ThemeToggle',
  props: {
    modelValue: { type: String, default: 'light' }
  },
  emits: ['update:modelValue'],
  template: `
    <label class="radio_label_sied">Theme:</label>
    <div class="radio_toolbar_sied">
      <div class="radio_toolbar_item_sied">
        <input type="radio" id="theme-light" value="light" :checked="modelValue === 'light'" @change="$emit('update:modelValue', $event.target.value)" />
        <label for="theme-light">Light</label>
      </div>
      <div class="radio_toolbar_item_sied">
        <input type="radio" id="theme-dark" value="dark" :checked="modelValue === 'dark'" @change="$emit('update:modelValue', $event.target.value)" />
        <label for="theme-dark">Dark</label>
      </div>
    </div>
  `
};
