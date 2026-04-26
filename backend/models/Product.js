const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Pizza','Burgers','Sandwiches','Salads','Pasta','Desserts','Sides']
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  image: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  rating: { 
    type: Number, 
    default: 4.5, 
    min: 0, 
    max: 5 
  },
  stock: { 
    type: Number, 
    default: 100 
  },
  available: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);