export default {
  name: 'StockLookup',
  props: {
    stockData: { type: Object, default: () => ({}) }
  },
  created() {
    console.log('[StockLookup] props.stockData:', this.stockData);
  },
  data() {
    return {
      selected: ''
    };
  },
  watch: {
    selected(newVal) {
      console.log('[StockLookup] selected changed to:', newVal);
    }
  },
  computed: {
    desc() {
      const entry = this.stockData?.[this.selected] || null;
      return entry ? entry.desc : '';
    },
    symbol() {
      const entry = this.stockData?.[this.selected] || null;
      return entry ? entry.unique : '';
    }
  },
  template: `
    <div class="widget">
      <h3>Stock Lookup</h3>
      <input list="stock-list" class="textbox_001_sied" v-model="selected" placeholder="Select or type stock code" />
      <datalist id="stock-list">
        <option v-for="(item, code) in stockData" :key="code" :value="code">{{ item.desc }}</option>
      </datalist>
      <br><br>
      <input type="text" class="textbox_001_sied" readonly :value="desc" placeholder="Stock description" />
      <input type="text" class="textbox_001_sied" readonly :value="symbol" placeholder="Stock symbol" />
    </div>
  `
}; 