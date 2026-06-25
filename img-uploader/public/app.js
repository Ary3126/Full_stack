const uploadForm = document.getElementById('upload-form');
const imageInput = document.getElementById('image-input');
const statusEl = document.getElementById('status');
const imagesList = document.getElementById('images-list');

const apiUrl = window.location.origin;

async function fetchImages() {
  imagesList.innerHTML = '<p>Loading images...</p>';
  try {
    const response = await fetch(`${apiUrl}/images`);
    if (!response.ok) {
      throw new Error('Unable to load images.');
    }

    const images = await response.json();

    if (!Array.isArray(images)) {
      throw new Error('Unexpected response.');
    }

    imagesList.innerHTML = images.length
      ? images.map(renderImageCard).join('')
      : '<p>No images uploaded yet.</p>';
  } catch (error) {
    imagesList.innerHTML = `<p class="error">Failed to load images. ${escapeHtml(error.message)}</p>`;
  }
}

function renderImageCard(image) {
  const imageUrl = `${window.location.origin}${image.url}`;
  return `
    <div class="card">
      <img src="${imageUrl}" alt="${escapeHtml(image.originalName)}" />
      <div class="card-body">
        <p>${escapeHtml(image.originalName)}</p>
        <p>Size: ${Math.round(image.size / 1024)} KB</p>
        <a href="${imageUrl}" target="_blank">View full image</a>
      </div>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!imageInput.files.length) {
    statusEl.textContent = 'Please select an image first.';
    statusEl.className = 'status error';
    return;
  }

  const file = imageInput.files[0];
  const formData = new FormData();
  formData.append('image', file);

  statusEl.textContent = 'Uploading...';
  statusEl.className = 'status';

  try {
    const response = await fetch(`${apiUrl}/upload`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Upload failed.');
    }

    statusEl.textContent = 'Upload successful!';
    statusEl.className = 'status success';
    imageInput.value = '';
    fetchImages();
  } catch (error) {
    statusEl.textContent = error.message;
    statusEl.className = 'status error';
  }
});

fetchImages();
