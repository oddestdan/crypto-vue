<template>
  <div class="home-wrapper">
    <div class="text-container">
      <h2>Input message</h2>
      <!-- <text-reader @load="inputMessage = $event"></text-reader> -->
      <textarea rows="15" v-model="inputMessage"></textarea>
      <h2>Key</h2>
      <textarea rows="10" v-model="key"></textarea>
    </div>
    <select name="action" id="action" v-model="action">
      <option value="Encrypt">Encrypt</option>
      <option value="Decrypt">Decrypt</option>
    </select>
    <select name="cipher" id="cipher" v-model="cipher">
      <option value="Caesar">Caesar</option>
      <option value="Tritemius">Tritemius</option>
    </select>
    <button @click="applyAction" type="button" id="applyActionButton">
      {{ action }}
    </button>
  </div>
</template>

<script>
// import TextReader from '@/components/TextReader';

export default {
  components: {
    // TextReader
  },

  data() {
    return {
      inputMessage: '',
      action: 'Encrypt',
      cipher: 'Caesar',
      key: ''
    };
  },

  methods: {
    applyAction() {
      switch (this.cipher) {
        case 'Caesar':
          this.bruteForce(
            this.cipherCaesar,
            this.inputMessage,
            26,
            this.action
          );
          this.inputMessage = this.cipherCaesar(
            this.inputMessage,
            Number.parseInt(this.key),
            this.action
          );
          break;
        case 'Tritemius':
          this.inputMessage = this.cipherTritemius(
            this.inputMessage,
            this.key,
            this.action
          );
          break;
        default:
          this.inputMessage = this.cipherCaesar(
            this.inputMessage,
            Number.parseInt(this.key),
            this.action
          );
          break;
      }
    },

    cipherCaesar(input, shift, mode) {
      let modif = mode === 'Encrypt' ? 1 : -1;
      var output = '';
      var temp = 0;
      var i = 0;

      //step through the string 1 character at a time
      for (i = 0; i < input.length; i++) {
        //store the ASCII value of each character
        temp = input.charCodeAt(i);
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt

        if (temp >= 65 && temp <= 122)
          temp = ((temp - 65 + shift * modif) % 57) + 65;
        else temp = '?';

        // if (temp >= 65 && temp <= 90) {
        //   // Uppercase
        //   temp = ((temp - 65 + shift * modif) % 26) + 65;
        // } else if (temp >= 97 && temp <= 122) {
        //   // Lowercase
        //   temp = ((temp - 97 + shift * modif) % 26) + 97;
        // } else {
        //   temp = '?';
        // }

        output += String.fromCharCode(temp);
      }

      return output;

      // let sign = mode === 'Encrypt' ? 1 : -1;
      // return input
      //   .replace(/[^A-Z]/g, '')
      //   .replace(/./g, a =>
      //     String.fromCharCode(65 + ((a.charCodeAt(0) - 65 + shift * sign) % 26))
      //   );

      // Encrypting
      // if (mode == 'Encrypt') {
      //   return (input + '').replace(/./g, s =>
      //     String.fromCharCode(
      //       s.charCodeAt(0) + (s.toLowerCase() < 'n' ? key : -key)
      //     )
      //   );
      // }
      // // Decrypting
      // else {
      //   return (input + '').replace(/./g, s =>
      //     String.fromCharCode(
      //       s.charCodeAt(0) + (s.toLowerCase() < 'n' ? -key : +key)
      //     )
      //   );
      // }
    },
    // eslint-disable-next-line no-unused-vars
    cipherTritemius(input, key, mode) {},

    bruteForce(cipherFunc, input, length, mode) {
      console.log('>> Brute Force');
      let resultsTable = [];
      for (let i = 0; i < length; i++) {
        resultsTable.push(cipherFunc(input, i, mode, i));
      }
      console.table(resultsTable);
    }
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
