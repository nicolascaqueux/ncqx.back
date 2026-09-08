import fs from 'fs';
import path from 'path';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_TOKEN;
const IMAGES_DIR = process.env.IMAGES_DIR || 'D:/nicol/Pictures/PUBLISHED';
const shouldReset = process.argv.includes('--reset');
const shouldPublish = !process.argv.includes('--draft');

if (!API_TOKEN) {
  throw new Error('STRAPI_TOKEN is required');
}

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
};

async function request(url, options = {}) {
  const response = await fetch(`${STRAPI_URL}${url}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${await response.text()}`);
  }

  return response.status === 204 ? null : response.json();
}

async function uploadImage(filePath) {
  const form = new FormData();
  form.append('files', new Blob([fs.readFileSync(filePath)]), path.basename(filePath));

  const uploaded = await request('/api/upload', {
    method: 'POST',
    body: form,
  });

  return uploaded[0];
}

async function getPhotoPosts() {
  const response = await request('/api/photo-posts?fields[0]=documentId&fields[1]=uid&pagination[pageSize]=100');
  return response.data;
}

async function deletePhotoPost(documentId) {
  await request(`/api/photo-posts/${documentId}`, { method: 'DELETE' });
}

async function createPhotoPost({ uid, photoId, aspectRatio }) {
  const response = await request('/api/photo-posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { uid, photo: photoId, aspect_ratio: aspectRatio } }),
  });

  return response.data;
}

function getAspectRatio(uploaded) {
  return uploaded.width >= uploaded.height ? 'horizontal' : 'vertical';
}

async function publishPhotoPost(documentId) {
  await request(`/api/photo-posts/${documentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { publishedAt: new Date().toISOString() } }),
  });
}

async function seed() {
  if (shouldReset && process.env.CONFIRM_RESET !== 'YES') {
    throw new Error('Refusing to reset without CONFIRM_RESET=YES');
  }

  const existingPosts = await getPhotoPosts();

  if (shouldReset) {
    for (const post of existingPosts) {
      await deletePhotoPost(post.documentId);
      console.log(`Deleted PhotoPost: ${post.documentId}`);
    }
  }

  const existingPostsByUid = new Map(
    shouldReset ? [] : existingPosts.filter((post) => post.uid).map((post) => [post.uid, post]),
  );
  const files = fs.readdirSync(IMAGES_DIR).filter((fileName) => /\.(jpe?g|png|webp)$/i.test(fileName));

  for (const fileName of files) {
    const filePath = path.join(IMAGES_DIR, fileName);
    const uid = path.parse(fileName).name;

    const existingPost = existingPostsByUid.get(uid);

    if (existingPost) {
      if (shouldPublish) {
        await publishPhotoPost(existingPost.documentId);
        console.log(`Published existing PhotoPost: ${uid}`);
      } else {
        console.log(`Skipped existing PhotoPost: ${uid}`);
      }
      continue;
    }

    try {
      const uploaded = await uploadImage(filePath);
      const post = await createPhotoPost({
        uid,
        photoId: uploaded.id,
        aspectRatio: getAspectRatio(uploaded),
      });

      if (shouldPublish) {
        await publishPhotoPost(post.documentId);
      }

      console.log(`Created PhotoPost: ${uid}`);
    } catch (error) {
      console.error(`Error creating ${fileName}:`, error.message);
    }
  }
}

seed().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
