export default {
  name: 'LanguageSelect',
  props: {
    modelValue: { type: String, default: 'en' }
  },
  emits: ['update:modelValue'],
  template: `
    <label class="label_so_001_sied">Language:</label>
    <select class="select_so_001_sied" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option value="en">English</option>
      <option value="ms">Malay</option>
      <option value="id">Indonesia</option>
    </select>
  `
};
