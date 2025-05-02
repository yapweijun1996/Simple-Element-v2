export default {
  name: 'Breadcrumbs',
  props: {
    items: { type: Array, default: () => [] }
  },
  template: `
    <nav class="breadcrumbs">
      <span v-for="(item, index) in items" :key="index">
        {{ item }}<span v-if="index < items.length - 1"> / </span>
      </span>
    </nav>
  `
};
