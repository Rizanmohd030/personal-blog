// require('dotenv').config();
// const cloudinary = require('cloudinary').v2;

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Test the connection
// console.log('🔧 Testing Cloudinary configuration...');
// console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
// console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✅ Present' : '❌ Missing');
// console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ Present' : '❌ Missing');

// // Test upload a simple image (optional)
// async function testUpload() {
//   try {
//     const result = await cloudinary.uploader.upload(
//       'https://res.cloudinary.com/demo/image/upload/sample.jpg',
//       { folder: 'test-blog' }
//     );
//     console.log('✅ Cloudinary test successful!');
//     console.log('Image URL:', result.secure_url);
//   } catch (error) {
//     console.log('❌ Cloudinary test failed:', error.message);
//   }
// }

// testUpload();
