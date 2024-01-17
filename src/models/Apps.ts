// models/App.ts
import mongoose,{Schema} from 'mongoose';


const appSchema = new Schema({
  appName: { type: String, required: true },
  apiKey: { type: String, required: true, unique: true },
  whitelistedDomains: [{ type: String, required: true }],
});

const Apps = mongoose.models.Apps || mongoose.model('Apps', appSchema);
export default Apps
