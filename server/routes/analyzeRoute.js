const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Missing required field 'image'" });
    }

    const mlUrl = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000/analyze';

    const form = new FormData();
    form.append('image', req.file.buffer, {
      filename: req.file.originalname || 'image.jpg',
      contentType: req.file.mimetype || 'image/jpeg',
    });

    if (req.body.portion) form.append('portion', String(req.body.portion));
    if (req.body.portion_grams) form.append('portion_grams', String(req.body.portion_grams));
    if (req.body.user_profile) form.append('user_profile', String(req.body.user_profile));
    if (req.body.history) form.append('history', String(req.body.history));
    if (req.body.top_k) form.append('top_k', String(req.body.top_k));

    const resp = await axios.post(mlUrl, form, {
      headers: {
        ...form.getHeaders(),
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 60000,
    });

    return res.json(resp.data);
  } catch (err) {
    const status = err?.response?.status || 500;
    const detail = err?.response?.data || { error: err?.message || 'ML service error' };
    return res.status(status).json(detail);
  }
});

module.exports = router;
