import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getEtapasFromFirestore, adicionarDeputado, adicionarPresidente } from './js/firestoreRepo.js';
import { storagee } from './js/firebaseConfig.js';
import bodyParser from 'body-parser';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { Presidente } from './entidades/Presidente.js';
import { Deputado } from './entidades/Deputado.js';
import { Candidato } from './entidades/Candidato.js';

// Criação do middleware de upload
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let etapas;
getEtapasFromFirestore().then((data) => {
  etapas = data;
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/etapas', (req, res) => {
  res.json(etapas);
});

app.post('/deputado', upload.single('imagemDeputado'), async (req, res) => {
  const { numeroDeputado, partidoDeputado, nomeDeputado, dataNascimentoDeputado } = req.body;
  const dataNascimento = new Date(dataNascimentoDeputado);


  if (!req.file) {
    throw new Error('Arquivo não encontrado');
  }

  const urlImagem = await uploadImagem(req.file)

  const novoDeputado = new Deputado(nomeDeputado, partidoDeputado, numeroDeputado, urlImagem, dataNascimento);

  await adicionarDeputado(novoDeputado).then(async result => {
    if (result.success) {
      etapas = await getEtapasFromFirestore();
      res.redirect('/?status=success');
    }
    else {
      res.redirect(`/?status=error&message=${encodeURIComponent(result.message)}`);
    }

  });
});

app.post('/presidente', upload.fields([{ name: 'imagemPresidente', maxCount: 1 }, { name: 'imagemVicePresidente', maxCount: 1 }]), async (req, res) => {
  const { numeroPresidente, partidoPresidente, nomePresidente, dataNascimentoPresidente, numeroVicePresidente, partidoVicePresidente, nomeVicePresidente, dataNascimentoVicePresidente } = req.body;
  const dataNascimentoPresi = new Date(dataNascimentoPresidente);
  const dataNascimentoVicePresid = new Date(dataNascimentoVicePresidente);


  if (!req.files || Object.keys(req.files).length === 0) {
    throw new Error('Arquivo não encontrado');
  }

  const imagemPresidenteFile = req.files['imagemPresidente'][0];
  const imagemVicePresidenteFile = req.files['imagemVicePresidente'][0];

  const urlImagemPresidente = await uploadImagem(imagemPresidenteFile);
  const urlImagemVicePresidente = await uploadImagem(imagemVicePresidenteFile);

  const novoPresidente = new Presidente(nomePresidente, partidoPresidente, numeroPresidente, urlImagemPresidente, dataNascimentoPresi);
  novoPresidente.vicePresidente = new Candidato(nomeVicePresidente, partidoVicePresidente, numeroVicePresidente, urlImagemVicePresidente, dataNascimentoVicePresid);


  await adicionarPresidente(novoPresidente).then(async result => {
    if (result.success) {
      etapas = await getEtapasFromFirestore();
      res.redirect('/?status=success');
    } else {
      res.redirect(`/?status=error&message=${encodeURIComponent(result.message)}`);

    }
  });

});


async function uploadImagem(file) {
  const nomeArquivo = `${uuidv4()}_${file.originalname}`;
  const storageRef = ref(storagee, nomeArquivo);
  await uploadBytes(storageRef, file.buffer);
  return await getDownloadURL(storageRef);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

