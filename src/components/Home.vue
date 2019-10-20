<template>
  <div class="home">
    <div class="message-key-container">
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
      <div class="select-container">
        <h4>Select action</h4>
        <v-select
          v-model="mode"
          :clearable="false"
          :placeholder="mode"
          :options="['Encrypt', 'Decrypt']"
        ></v-select>
      </div>
      <div class="select-container">
        <h4>Select cipher</h4>
        <v-select
          v-model="cipher"
          :clearable="false"
          :placeholder="cipher"
          :options="['Caesar', 'Trithemius']"
        ></v-select>
      </div>
      <div class="action-buttons-container">
        <button class="custom-button" @click="applyCipher" type="button">{{ mode }} text</button>
        <div v-if="DEBUG" class="debug-buttons">
          <button class="custom-button" @click="consoleLanguage" type="button">print lang</button>
          <button class="custom-button" @click="bruteForce" type="button">brute force</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import TextReader from '@/components/TextReader';
import generateAlphabet from '@/utils/alphabet.js';

import Caesar from '@/ciphers/Caesar.js';
import Trithemius from '@/ciphers/Trithemius.js';

export default {
  components: {
    // TextReader
  },

  data() {
    return {
      message: '',
      key: '',
      mode: 'Encrypt',
      cipher: 'Trithemius',

      DEBUG: true
    };
  },

  computed: {
    alphabet: () => generateAlphabet(),
    cipherDelegate: function() {
      let func;
      switch (this.cipher) {
        case 'Caesar':
          func = this.cipherCaesar;
          break;
        case 'Trithemius':
          func = this.cipherTrithemius;
          break;
        default:
          func = this.cipherTrithemius;
          break;
      }
      return func;
    }
  },

  methods: {
    applyCipher() {
      this.message = this.cipherDelegate(this.message, this.key, this.alphabet, this.mode);
    },

    // Ciphers
    cipherCaesar: (input, key, alphabet, mode) => Caesar(input, key, alphabet, mode),
    cipherTrithemius: (input, key, alphabet, mode) => Trithemius(input, key, alphabet, mode),

    bruteForce() {
      const resultsTable = [];

      console.log('>> Brute Force:');
      for (let i = 0; i <= this.alphabet.length; i++) {
        resultsTable.push(this.cipherDelegate(this.message, i, this.alphabet, this.mode));
      }
      console.table(resultsTable);
    },

    consoleLanguage() {
      console.log('>> Alphabet:');
      console.table(this.alphabet);
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
  font-size: 16px;
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
}
.key-container {
  width: 30%;
}
.actions-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
}
.select-container {
  text-align: center;
}
.action-buttons-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.debug-buttons {
  .custom-button {
    color: #2ecc71;

    &:after {
      background: #2ecc71;
      color: #ffffff;
    }

    &:hover,
    &:active {
      color: #0e83cd;
    }
  }
}
</style>
