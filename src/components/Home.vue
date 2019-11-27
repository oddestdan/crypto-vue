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
        <div class="key" v-if="cipher === `Caesar`">
          <h2>Key</h2>
          <div class="caesar-key">
            <input type="number" v-model="key" />
          </div>
        </div>

        <div class="trithemius" v-else-if="cipher === `Trithemius`">
          <h2>Coefficients</h2>
          <div class="-col-between" v-if="trithemiusOption === 'Coefficients'">
            <span>ax²</span>
            <input class="-bot10" type="number" v-model="trithCoefs[2]" />
            <span>bx</span>
            <input class="-bot10" type="number" v-model="trithCoefs[1]" />
            <span>c</span>
            <input class="-bot10" type="number" v-model="trithCoefs[0]" />
          </div>
          <div class="-col-between" v-else-if="trithemiusOption === 'Motto'">
            <input type="text" v-model="key" />
          </div>
          <div class="-top10">
            <v-select
              v-model="trithemiusOption"
              :clearable="false"
              :placeholder="trithemiusOption"
              :options="['Motto', 'Coefficients']"
            ></v-select>
          </div>
        </div>

        <div class="-col-between -h-max" v-if="cipher === `XOR`">
          <h2>Gamma</h2>
          <div class="center-container">
            <textarea class="-bot10" rows="16" v-model="key" disabled></textarea>
            <button class="custom-button -m0" @click="key = generateGamma()">generate gamma</button>
          </div>
        </div>

        <div class="-col-between -h-max" v-if="cipher === `Book`">
          <h2>Poem</h2>
          <div class="center-container">
            <textarea class="-bot10" rows="16" v-model="key" disabled></textarea>
            <button class="custom-button -m0" @click="key = poem">generate poem</button>
          </div>
        </div>

        <div v-if="cipher === `DES` || cipher === `TripleDES` || cipher === `AES`">
          <h2>{{ cipher }} Passphrase</h2>
          <div class="center-container">
            <textarea rows="16" v-model="key"></textarea>
          </div>
        </div>
      </div>
      <!-- <text-reader @load="message = $event"></text-reader> -->
    </div>

    <div class="actions-container -br">
      <div class="center-container">
        <h4>Select action</h4>
        <v-select
          v-model="mode"
          :clearable="false"
          :placeholder="mode"
          :options="['Encrypt', 'Decrypt']"
        ></v-select>
      </div>
      <div class="center-container">
        <h4>Select cipher</h4>
        <v-select
          v-model="cipher"
          :clearable="false"
          :placeholder="cipher"
          :options="['Caesar', 'Trithemius', 'XOR', 'Book', 'DES', 'TripleDES', 'AES']"
        ></v-select>
      </div>
      <div class="action-buttons-container">
        <button class="custom-button" @click="applyCipher" type="button">{{ mode }} text</button>
        <div v-if="DEBUG" class="debug-buttons">
          <button class="custom-button" @click="consoleAlphabet" type="button">print lang</button>
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
import XOR from '@/ciphers/XOR.js';

import Book from '@/ciphers/Book.js';
import poem from '@/utils/poem.js';
// import DES from '@/ciphers/DES.js';
// import TripleDES from '@/ciphers/TripleDES.js';
// import AES from '@/ciphers/AES.js';

export default {
  components: {
    // TextReader
  },

  data() {
    return {
      message: 'Encrypt me!..',
      // key: '',
      key: 'Share a secret with me!',
      mode: 'Encrypt',
      cipher: 'DES',
      alphabet: () => {},

      trithCoefs: [2, 3, 0],
      trithemiusOption: 'Coefficients',

      poem: '',

      selfUnit: this,
      DEBUG: true
    };
  },

  computed: {
    // key: '',
    cipherDelegate: function() {
      let func;
      switch (this.cipher) {
        case 'Caesar':
          func = this.cipherCaesar;
          break;
        case 'Trithemius':
          func = this.cipherTrithemius;
          break;
        case 'XOR':
          func = this.cipherXOR;
          break;
        case 'Book':
          func = this.cipherBook;
          break;
        case 'DES':
          func = this.cipherDES;
          break;
        case 'TripleDES':
          func = this.cipherTripleDES;
          break;
        case 'AES':
          func = this.cipherAES;
          break;
        default:
          func = this.cipherDES;
          break;
      }
      return func;
    }
  },

  methods: {
    applyCipher() {
      // Additional settings for different ciphers

      // TODO: Can try to get rid of this line if use key[0] etc in lines 20+
      if (this.cipher === 'Trithemius')
        if (this.trithemiusOption === 'Coefficients') this.key = this.trithCoefs;

      // if (this.cipher === 'Book') this.key = poem;

      this.message = this.cipherDelegate(this.message, this.key, this.alphabet, this.mode);
    },

    // Ciphers
    cipherCaesar: (input, key, alphabet, mode) => Caesar(input, key, alphabet, mode),
    cipherTrithemius: (input, key, alphabet, mode) => Trithemius(input, key, alphabet, mode),
    cipherXOR: (input, key, alphabet, mode) => XOR(input, key, alphabet, mode),
    cipherBook: (input, key, alphabet, mode) => Book(input, key, alphabet, mode),
    cipherDES(input, key, alphabet, mode) {
      return this.AdvancedCipher(input, key, alphabet, mode);
    },
    cipherTripleDES(input, key, alphabet, mode) {
      return this.AdvancedCipher(input, key, alphabet, mode);
    },
    cipherAES(input, key, alphabet, mode) {
      return this.AdvancedCipher(input, key, alphabet, mode);
    },

    // DES, TripleDES, and AES ciphers
    AdvancedCipher(input, key, alphabet, mode) {
      console.log(`>> alphabet L = ${alphabet.length} not needed in Advanced ciphers`);
      const cipherFunc = this.CryptoJS[this.cipher];

      return mode === 'Encrypt'
        ? cipherFunc.encrypt(input, key).toString()
        : cipherFunc.decrypt(input, key).toString(this.CryptoJS.enc.Utf8);
    },

    // Random string generator
    generateGamma() {
      // // If generate gamma as [0-9a-z]
      // Integer -> String [0-9a-z]
      // let dec2alphanum = dec => ('0' + dec.toString(36)).substr(-2);

      // let arr = new Uint8Array(((this.message.length || 42) + 1) / 2);
      // window.crypto.getRandomValues(arr);
      // return Array.from(arr, dec2alphanum)
      //   .join('')
      //   .slice(0, -1);

      // // If generate gamma from whole alphabet
      const arr = [];
      let randIndex;
      for (let i = 0; i < this.message.length; i++) {
        randIndex = Number.parseInt(Math.random() * this.alphabet.length);
        arr[i] = this.alphabet[randIndex];
      }
      return arr.join('');
    },

    bruteForce() {
      const resultsTable = [];

      console.log('>> Brute Force:');
      for (let i = 0; i <= this.alphabet.length; i++) {
        resultsTable.push(this.cipherDelegate(this.message, i, this.alphabet, this.mode));
      }
      console.table(resultsTable);
    },

    consoleAlphabet() {
      console.log('>> Alphabet:');
      console.table(this.alphabet);
    }
  },

  mounted() {
    console.log('Creating alphabet....');
    this.alphabet = generateAlphabet();
    console.log('Alphabet created.');
    // this.consoleAlphabet();

    this.poem = poem;
  }

  // created() {}
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
  // width: calc(100% - 20px);
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
  padding: 0px 20px;
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
.center-container {
  text-align: center;
}
.end-container {
  text-align: end;
}
.action-buttons-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

/* debug */
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
