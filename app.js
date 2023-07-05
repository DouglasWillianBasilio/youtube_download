const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.get('/', function (req, res) {
  const { url } = req.query;

  res.header("Content-Disposition", 'attachment; filename="video.mp4"');
  ytdl(url, { quality: 'highestvideo' }).pipe(res);
});

app.listen(3000);
