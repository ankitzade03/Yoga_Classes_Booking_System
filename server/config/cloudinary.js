// utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name:"dkhxqvhlt",
  api_key:"418184227249772",
  api_secret:"lvj4QoGiPQVY4v_pS1tvaIkP02A",
});

export default cloudinary;
