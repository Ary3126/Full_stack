# Image Uploader

Simple Node.js + Express image upload API using Multer and MongoDB.

## Features

- Upload images via `POST /upload`
- Save image metadata in MongoDB
- Serve uploaded images from `/uploads`
- List stored image metadata with `GET /images`

## Setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Create a `.env` file or use the default MongoDB URI
   ```txt
   MONGO_URI=mongodb://127.0.0.1:27017/imguploader
   PORT=4000
   ```
3. Start the server
   ```bash
   npm start
   ```

## Upload example

Use `multipart/form-data` with field name `image`.

```bash
curl -X POST http://localhost:4000/upload \
  -F "image=@/path/to/photo.jpg"
```

## API

- `POST /upload` - upload a single image
- `GET /images` - list all uploaded images metadata
- `GET /images/:id` - get metadata for a specific image
