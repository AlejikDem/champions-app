const coreCards = require('./response.json');
const fs = require('fs');

const setCodes = new Set(coreCards.map(card => card.faction_code));
const categorizeByField = (field, cards) => cards.reduce((acc, card) => {
  const code = card[field];
  if (acc[code]) {
    acc[code].push(card);
  } else {
    acc[code] = [card];
  }
  return acc;
}, {});

const categories = categorizeByField('faction_code', coreCards);

setCodes.forEach(code => {
  console.log(code + ': ' + categories[code].length)
});

categories.hero = categorizeByField('card_set_code', categories.hero);
categories.encounter = categorizeByField('card_set_code', categories.encounter);

fs.writeFile('data/cards.json', JSON.stringify(categories), () => {});
