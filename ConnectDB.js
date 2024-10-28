import mongoose from 'mongoose';

const Connect = (MONGODB_URI) => {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
};

export { Connect };
