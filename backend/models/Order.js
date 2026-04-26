const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [{
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' 
    },
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  totalPrice: { 
    type: Number, 
    required: true 
  },
  deliveryFee: {
    type: Number,
    default: 20
  },
  deliveryAddress: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  paymentMethod: { 
    type: String, 
    enum: ['cash', 'card'],
    default: 'cash'
  },
  status: { 
    type: String, 
    enum: ['pending', 'preparing', 'on_the_way', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);