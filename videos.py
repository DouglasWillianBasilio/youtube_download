from pytube import YouTube

def download_video(video_url, output_path):
    try:
        # Cria uma instância do objeto YouTube com a URL do vídeo
        video = YouTube(video_url)

        # Seleciona a maior resolução disponível
        stream = video.streams.get_highest_resolution()

        # Inicia o download do vídeo
        stream.download(output_path)

        print("Download concluído com sucesso!")
    except Exception as e:
        print(f"Ocorreu um erro durante o download: {str(e)}")

# Exemplo de uso
video_url = "https://www.youtube.com/watch?v=gXuzkwRivfg"
output_folder = "C:/Users/xboxl/Desktop/video"

download_video(video_url, output_folder)
