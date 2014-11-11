
var field_map = [
  { maker: 1, description: 2 },
  { maker: 1, description: 2, model_no: 3, price: 4 },
  { description: 1, price: 2 },
  { size: 1, maker: 2, description: 3 },
  { maker: 1, description: 2, price: 3 },
  { description: 1, maker: 2, price: 3 },
  { maker: 1, description: 2, range: 3, price: 4 }
];

module.exports = {
  'chromatic.html': {
    name: 'Chromatic',
    fields: { maker: 1, description: 2, model_no: 3, price: 4 } 
  },
  'mallets.html': {
    name: 'Mallets',
    fields: { maker: 1, description: 2, model_no: 3, price: 4 } 
  },
  'accessories.html': {
    name: 'Accessories',
    fields: { maker: 1, description: 2, model_no: 3, price: 4 } 
  },
  'backline.html': {
    name: 'Backline',
    fields: { description: 1, price: 2 } 
  },
  'concert_drums.html': {
    name: 'Concert Drums',
    fields: { maker: 1, description: 2, model_no: 3, price: 4 } 
  },
  'ethnicdrums.html': [
    {
      name: 'Ethnic & Hand Drums',
      fields: { maker: 1, description: 2, model_no: 3, price: 4 }
    },
    {
      name: 'Steel Drums',
      fields: { maker: 1, description: 2, range: 3, price: 4 }
    }
  ],
  'drums.html': [
    {
      name: 'Drum Sets',
      fields: { maker: 1, description: 2, price: 3 }
    }, {
      name: 'Snare Drums',
      fields: { size: 1, maker: 2, description: 3 }
    }, {
      name: 'Misc. Drums',
      fields: { maker: 1, description: 2 }
    }
  ],
  'erc.html': {
    name: 'Emil Richards Collection',
    fields: { description: 1, more_info: 2, price: 3 }
  }
};

