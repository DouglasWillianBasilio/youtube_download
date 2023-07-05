import youtube_dl

# URL do vídeo no YouTube
video_url = 'https://www.youtube.com/watch?v=CUxB51YGhyI'

# Opções de download
ydl_opts = {
    'format': 'bestvideo[height<=2160]+bestaudio/best[height<=2160]',
    'outtmpl': 'video.mp4',
}

# Iniciar o download
with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    ydl.download([video_url])
