const { saveEmbedding } = require('./src/embed');

(async () => {
  await saveEmbedding('./data/your_file_name.pdf');  // Change to your file
})();
