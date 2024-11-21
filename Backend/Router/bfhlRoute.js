import express from 'express';
import multer from 'multer';

const router = express.Router();


const upload = multer();

router.post('/post', upload.single('file'), (req, res) => {
  
  const { fullName, dob, collegeEmail, rollNumber, numbers, alphabets, file_b64 } = req.body;
  console.log('Form Data before sending to API:', req.body);

 
  const numbersArr = [];
  const alphabetsArr = [];
  let highestLowerCase = '';
  let isPrimeFound = false;

  const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

 
  numbers.forEach((item) => {
    if (!isNaN(item)) {
      numbersArr.push(item);
      if (isPrime(item)) {
        isPrimeFound = true;
      }
    }
  });

 
  alphabets.forEach((item) => {
    if (typeof item === 'string' && /^[a-zA-Z]$/.test(item)) {
      alphabetsArr.push(item);
      if (item === item.toLowerCase() && item > highestLowerCase) {
        highestLowerCase = item;
      }
    }
  });
 
  let fileValid = false;
  let fileMimeType = null;
  let fileSizeKb = null;

  if (file_b64) {
    try {
      const fileBuffer = Buffer.from(file_b64, 'base64');
      fileSizeKb = (fileBuffer.length / 1024).toFixed(2);
      fileValid = true;
      fileMimeType = 'application/octet-stream'; 
    } catch (error) {
      fileValid = false;
    }
  }
 
  res.status(200).json({
    is_success: true,
    user_id: process.env.USER_ID, 
    email: collegeEmail, 
    roll_number: rollNumber,  
    numbers: numbersArr,
    alphabets: alphabetsArr,
    highest_lowercase_alphabet: highestLowerCase ? [highestLowerCase] : [],
    is_prime_found: isPrimeFound,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb,
  });
});

export default router;
