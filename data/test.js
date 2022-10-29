const fs = require('fs');
const response = require('./response.json');

// const packs = response.map(item => item.card_set_code);

// const filtered = arr => {
//   const exist = {};
//   return arr.filter(item => {
//     if (exist[item]) {
//       return false;
//     } else {
//       exist[item] = true;
//       return true;
//     }
//   })
// };
const spiderManCards = response.filter(item => item.card_set_code === 'spider_man');
console.log('Spider: ', spiderManCards.length);

// console.log(filtered(packs));
const json = JSON.stringify(spiderManCards);
fs.writeFile('spiderman.json', json, () => {
  console.log('Done');
});
