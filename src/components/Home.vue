<template>
  <div class="home-wrapper">
    <div class="text-container">
      <h2>Input message</h2>
      <!-- <text-reader @load="inputMessage = $event"></text-reader> -->
      <textarea rows="15" v-model="inputMessage"></textarea>
      <h2>Key</h2>
      <textarea rows="10" v-model="key"></textarea>
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
      inputMessage: '',
      mode: 'Encrypt',
      cipher: 'Caesar',
      key: ''
    };
  },

  computed: {
    language: () => generateLanguage()
  },

  methods: {
    applyCipher() {
      switch (this.cipher) {
        case 'Caesar':
          this.bruteForce(this.cipherCaesar, this.inputMessage, 26);
          this.inputMessage = this.cipherCaesar(
            this.inputMessage,
            Number.parseInt(this.key)
          );
          break;
        case 'Tritemius':
          this.inputMessage = this.cipherTritemius(this.inputMessage, this.key);
          break;
        default:
          this.inputMessage = this.cipherCaesar(
            this.inputMessage,
            Number.parseInt(this.key)
          );
          break;
      }
    },

    cipherCaesar(input, shift) {
      let modif = this.mode === 'Encrypt' ? 1 : -1;
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

    bruteForce(cipherFunc, input, length) {
      console.log('>> Brute Force:');
      let resultsTable = [];
      for (let i = 0; i < length; i++) {
        resultsTable.push(cipherFunc(input, i, this.mode, i));
      }
      console.table(resultsTable);
    }
  },

  mounted() {
    console.log('>> Language:');
    console.table(this.language.split(''));
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
