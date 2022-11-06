const fs = require('fs');
const axios = require('axios');

const marvelCdbUrl = 'https://marvelcdb.com';
const imagesFolder = 'public/images';

const download = async (uri, code, callback = () => {}) => {
  const res = await axios.get(marvelCdbUrl + uri, {
    responseType: 'stream'
  });
  const filename = `${imagesFolder}/${code}.png`;
  res.data.pipe(fs.createWriteStream(filename)).on('close', callback);
};

axios.get(marvelCdbUrl + '/api/public/cards/core').then(({ data }) => {
  if (!fs.existsSync(imagesFolder)) {
    fs.mkdirSync(imagesFolder);
  }
  data.forEach(card => {
    const { code, imagesrc, backimagesrc, linked_card } = card;
    download(imagesrc, code, () => {
      if (linked_card) {
        download(linked_card.imagesrc, linked_card.code);
        if (linked_card.backimagesrc) {
          download(linked_card.backimagesrc, linked_card.code + 'b');
        }
      }
    })
    if (backimagesrc) {
      download(backimagesrc, code + 'b');
    }
  });
});
