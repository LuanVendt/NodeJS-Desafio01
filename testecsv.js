
import fs from 'fs';
import { parse } from 'csv-parse';
import axios from 'axios';

const csvFilePath = 'D:/Treinamento/Ignite/nodejs/desafio01/testeCSV.csv'; // Substitua pelo caminho do seu arquivo CSV

fs.access(csvFilePath, fs.constants.F_OK, async (err) => {
  if (err) {
    console.error('Arquivo CSV não encontrado:', csvFilePath);
    return;
  }

  const parser = fs.createReadStream(csvFilePath).pipe(parse({ columns: true }));

  const promises = [];

  for await (const record of parser) {
    promises.push(
      axios
        .post('http://localhost:3333/tasks', record)
        .then((response) => {
          console.log(`Registro enviado com sucesso: ${JSON.stringify(record)}. Resposta: ${JSON.stringify(response.data)}`);
        })
        .catch((error) => {
          console.error(`Erro ao enviar o registro: ${JSON.stringify(record)}. Erro: ${error.message}`);
        })
    );
  }

  // Aguarda todas as requisições serem concluídas antes de exibir a mensagem final
  await Promise.all(promises);

  console.log('Todas as requisições foram concluídas.');
});
