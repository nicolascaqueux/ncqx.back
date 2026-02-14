// scripts/seedPhotoposts.js

import fs from "fs";
import path from "path";
import axios from "axios";
import FormData from "form-data";

const STRAPI_URL = "http://localhost:1337";
const API_TOKEN =
  "9efe951f4fc7760c9bff47f5c121dcdd485a49bfed98891dc8f493a7b1c93240e74110358e75f4902d5dba07095eb20438351cc6f66d27b34000f5e5b47d90b3c47c7f727f60a4a155f04f6535991197b69da463aeede51070d205ede9eb11bc8aa0ea14c3bf96ab5020e7ad4165fc863cde1b66653948aa39eb2db8b1083dee"; // Create one in Settings > API Tokens

const IMAGES_DIR = "D:/nicol/Pictures/PROCESSED";

async function uploadImage(filePath) {
  const form = new FormData();
  form.append("files", fs.createReadStream(filePath));

  const res = await axios.post(`${STRAPI_URL}/api/upload`, form, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      ...form.getHeaders(),
    },
  });

  return res.data[0]; // Uploaded media object
}

async function createPhotoPost({ uid, thumbnailId, photoId }) {
  const res = await axios.post(
    `${STRAPI_URL}/api/photo-posts`,
    {
      data: {
        uid,
        thumbnail: thumbnailId,
        photo: photoId,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );

  return res.data;
}

async function seed() {
  const files = fs
    .readdirSync(IMAGES_DIR)
    .filter((f) => /\.(jpe?g|png)$/i.test(f));

  for (const fileName of files) {
    const filePath = path.join(IMAGES_DIR, fileName);
    const uid = path.parse(fileName).name; // use file name as UID

    try {
      const uploaded = await uploadImage(filePath);
      console.log(uploaded);
      const post = await createPhotoPost({
        uid,
        thumbnailId: uploaded.id,
        photoId: uploaded.id,
      });

      console.log(`✅ Created PhotoPost: ${uid}`);
    } catch (err) {
      console.error(
        `❌ Error creating for ${fileName}:`,
        err.response?.data || err.message
      );
    }
  }
}

seed();
