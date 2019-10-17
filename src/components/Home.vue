<template>
  <div class="home-wrapper">
    <button @click="consoleLanguage" type="button">print lang</button>
    <button @click="bruteForce" type="button">brute force</button>
    <div class="text-container">
      <h2>Input message</h2>
      <!-- <text-reader @load="message = $event"></text-reader> -->
      <textarea rows="15" v-model="message"></textarea>
      <h2>Key</h2>
      <!-- <textarea rows="10" v-model="key"></textarea> -->
      <input type="number" v-model="key" />
    </div>
    <select name="mode" id="mode" v-model="mode">
      <option value="Encrypt">Encrypt</option>
      <option value="Decrypt">Decrypt</option>
    </select>
    <select name="cipher" id="cipher" v-model="cipher">
      <option value="Caesar">Caesar</option>
      <option value="Tritemius">Tritemius</option>
    </select>
    <button @click="applyCipher" type="button" id="applyCipherButton">
      {{ mode }}
    </button>
  </div>
</template>

<script>
// import TextReader from '@/components/TextReader';
import generateLanguage from '@/utils/language.js';

export default {
  components: {
    // TextReader
  },

  data() {
    return {
      initialInput: '',
      message: '',
      key: '',
      mode: 'Encrypt',
      cipher: 'Caesar'
    };
  },

  computed: {
    language: () => generateLanguage(),
    cipherFunc: function() {
      let func;
      switch (this.cipher) {
        case 'Caesar':
          func = this.cipherCaesar;
          break;
        case 'Tritemius':
          func = this.cipherTritemius;
          break;
        default:
          func = this.cipherCaesar;
          break;
      }
      return func;
    }
  },

  methods: {
    applyCipher() {
      this.initialInput = this.message;

      this.message = this.cipherFunc(this.message, this.key);
    },

    cipherCaesar(input, key) {
      const shift = Number.parseInt(key);
      const modif = this.mode === 'Encrypt' ? 1 : -1;
      let output = '';
      let currCharIndex = 0;

      // TODO: read more about methods
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt

      // TODO: change to reducer
      for (let i = 0; i < input.length; i++) {
        currCharIndex = this.language.indexOf(input[i]);
        currCharIndex = (currCharIndex + shift * modif) % this.language.length;

        output += this.language.charAt(currCharIndex);
      }
      return output;
    },
    // eslint-disable-next-line no-unused-vars
    cipherTritemius(input, key) {},

    bruteForce() {
      const resultsTable = [];
      const length = this.language.length;
      const n = length < this.key ? length : this.key;

      console.log('>> Brute Force:');
      for (let i = 0; i <= n; i++) {
        resultsTable.push(this.cipherFunc(this.initialInput, i, this.mode, i));
      }
      console.table(resultsTable);
    },

    consoleLanguage() {
      console.log('>> Language:');
      console.table(this.language.split(''));
    }
  },

  mounted() {
    // this.consoleLanguage();
  }
};
</script>

<style lang="scss" scoped>
.home-wrapper {
  margin-top: 60px;
}
textarea {
  resize: none;
}
textarea {
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px;
  font-size: 14px;
  font-family: 'Helvetica Now', Montserrat, Arial, sans-serif;
}
</style>
