
import { connect } from 'mongoose';
const connectDB = async () => {
  try {
    const mongoURI = 'mongodb+srv://naydenovayn:naydenovayn@cluster0.zqsvtnb.mongodb.net/PawPal?retryWrites=true&w=majority&appName=Cluster0';
    await connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
export default connectDB;