<template>
  <div class="home">
    <div v-if="DEBUG" class="debug-buttons">
      <button @click="consoleLanguage" type="button">print lang</button>
      <button @click="bruteForce" type="button">brute force</button>
    </div>
    <div class="message-key-container -br">
      <div class="message-container">
        <h2>Message</h2>
        <div class="message">
          <textarea rows="20" v-model="message"></textarea>
        </div>
      </div>
      <div class="key-container">
        <h2>Key</h2>
        <div class="key">
          <input type="number" v-model="key" />
        </div>
      </div>
      <!-- <text-reader @load="message = $event"></text-reader> -->
    </div>

    <div class="actions-container -br">
      <!-- TODO: create a separate component for selection -->
      <div class="select-container">
        <h4>Select action</h4>
        <select name="mode" id="mode" v-model="mode">
          <option value="Encrypt">Encrypt</option>
          <option value="Decrypt">Decrypt</option>
        </select>
      </div>
      <div class="select-container">
        <h4>Select cipher</h4>
        <select name="cipher" id="cipher" v-model="cipher">
          <option value="Caesar">Caesar</option>
          <option value="Tritemius">Tritemius</option>
        </select>
      </div>
      <button @click="applyCipher" type="button" id="applyCipherButton">{{ mode }}</button>
    </div>
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
      cipher: 'Caesar',
      ciphers: ['Caesar', 'Tritemius'],

      DEBUG: true
    };
  },

  computed: {
    language: () => generateLanguage(),
    cipherDelegate: function() {
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

      this.message = this.cipherDelegate(this.message, this.key);
    },

    cipherCaesar(input, key) {
      const length = this.language.length;
      const modif = this.mode === 'Encrypt' ? 1 : -1;

      // const shift = Number.parseInt(key);
      let shift = Number.parseInt(key);
      console.log(`>> SHIFT %: ${shift % length}`);
      if (shift < 0) shift = length + (shift % length);
      console.log(`>> SHIFT  : ${shift}`);
      let output = '';
      let currCharIndex = 0;

      // TODO: read more about methods
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt

      // TODO: (?) change to reducer
      for (let i = 0; i < input.length; i++) {
        currCharIndex = this.language.indexOf(input[i]);

        // Some symbol not found in the language
        if (currCharIndex < 0) {
          output += input[i]; // Leave it as it is
        } else {
          currCharIndex = (currCharIndex + shift * modif) % length;
          // Special check for negative, out of bounds index (due to % modulo)
          if (currCharIndex < 0) currCharIndex += length;

          output += this.language.charAt(currCharIndex);
        }
      }
      return output;
    },
    // eslint-disable-next-line no-unused-vars
    cipherTritemius(input, key) {},

    bruteForce() {
      const resultsTable = [];
      // const length = this.language.length;
      let n;

      // Choose to iterate over they key or the language
      // (depending on what is shorter)
      // if (length < Math.abs(this.key)) {
      // n = length;
      // if (this.key < 0) n *= -1;
      // } else {
      n = this.key;
      // }

      console.log('>> Brute Force:');
      if (n < 0) {
        for (let i = 0; i >= n; i--) {
          resultsTable.push(this.cipherDelegate(this.initialInput, i, this.mode, i));
        }
      } else {
        for (let i = 0; i <= n; i++) {
          resultsTable.push(this.cipherDelegate(this.initialInput, i, this.mode, i));
        }
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
textarea {
  resize: none;
  box-sizing: border-box;
  border: none;
  width: calc(100% - 20px);
  padding: 5px 10px;
  font-size: 14px;
  font-family: 'Helvetica Now', Montserrat, Arial, sans-serif;
}
input {
  width: calc(100% - 20px);
  min-height: 24px;
  outline: none;
  padding: 5px 10px;
  border: none;
}
h2 {
  width: calc(100% - 20px);
  text-align: center;
  color: #ffffff;
}
h4 {
  text-align: center;
  color: #ffffff;
  margin-block-start: 0;
  margin-block-end: 0.67em;
}
select {
  padding: 5px 10px;
  height: auto;
}
.home {
  padding: 20px;
  color: #ffffff;
}
.message-key-container {
  display: flex;
  justify-content: space-between;
}
.message-container {
  width: 60%;
  // padding: 0 10px;
}
.key-container {
  width: 30%;
  // padding: 0 40px;
}
.actions-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.select-container {
  text-align: center;

  //
}

/* debug */
.debug-buttons {
  display: flex;
  justify-content: space-around;
  margin: 0 400px;
}
</style>
