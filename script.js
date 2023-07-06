import { google } from 'googleapis';
import fs from 'fs';

// Configurando as credenciais da API
const auth = new google.auth.GoogleAuth({
  keyFile: 'caminho/para/o/arquivo_de_credenciais.json',
  scopes: ['https://www.googleapis.com/auth/youtube.readonly']
});

// Criando um cliente da API do YouTube
const youtube = google.youtube({
  version: 'v3',
  auth: await auth.getClient()
});

// Função para fazer o download de um vídeo pelo ID
async function downloadVideo(videoId, outputPath) {
  try {
    // Fazendo a requisição para a API do YouTube para obter os detalhes do vídeo
    const response = await youtube.videos.list({
      part: 'snippet',
      id: videoId
    });

    // Verificando se o vídeo foi encontrado
    if (response.data.items.length === 0) {
      console.log('Vídeo não encontrado.');
      return;
    }

    // Obtendo a URL do vídeo
    const videoUrl = response.data.items[0].snippet.url;

    // Fazendo o download do vídeo
    const fileStream = fs.createWriteStream(`${outputPath}/${videoId}.mp4`);
    const request = await youtube.videos.download({
      id: videoId,
      alt: 'media'
    }, { responseType: 'stream' });

    request.data
      .on('error', (error) => {
        console.error('Erro durante o download do vídeo:', error);
      })
      .on('end', () => {
        console.log('Download concluído com sucesso!');
      })
      .pipe(fileStream);
  } catch (error) {
    console.error('Ocorreu um erro durante o download:', error);
  }
}

// Exemplo de uso
const videoId = 'VIDEO_ID';
const outputFolder = 'C:/Users/xboxl/Desktop/video';

downloadVideo(videoId, outputFolder);
