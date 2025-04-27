const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    task: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['nebaigta', 'baigta'],
      default: 'nebaigta',
    },
  },
  {
    timestamps: true,
    collection: 'tasks',
  }
);

module.exports = mongoose.model('Task', tasksSchema);
