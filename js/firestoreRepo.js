
import { getFirestore, collection, addDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import {app} from "./firebaseConfig.js";

const db = getFirestore(app);

async function adicionarDeputado(deputado) {
  try {
    const deputadoQuery = query(collection(db, "deputados"), where("numero", "==", deputado.numero));
    const deputadoSnapshot = await getDocs(deputadoQuery);
    if (!deputadoSnapshot.empty) {
      return { success: false, message: "Erro, já existe um deputado com esse número já cadastrado." };
    }

      const docRef = await addDoc(collection(db, "deputados"), {
        ...deputado,
        cargo: 'DEPUTADO'

      });
      return { success: true, message: ("Deputado adicionado com ID: ", docRef.id)};
  } catch (error) {
    return { success: false, message: "Erro ao adicionar deputado "};
  }
}
async function adicionarPresidente(presidente) {
  try {

    const presidenteQuery = query(collection(db, "presidente"), where("numero", "==", presidente.numero));
        const presidenteSnapshot = await getDocs(presidenteQuery);
        if (!presidenteSnapshot.empty) {
          return { success: false, message: "Erro, já existe um presidente com esse número já cadastrado." };
        }

    const docRef = await addDoc(collection(db, "presidente"), {
      nome: presidente.nome,
      dataNascimento: presidente.dataNascimento,
      numero: presidente.numero,
      partido: presidente.partido,
      urlImagem: presidente.urlImagem,
      cargo: 'PRESIDENTE',
      vicePresidente: {
        nome: presidente.vicePresidente.nome,
        dataNascimento: presidente.vicePresidente.dataNascimento,
        numero: presidente.vicePresidente.numero,
        partido: presidente.vicePresidente.partido,
        urlImagem: presidente.vicePresidente.urlImagem,
        cargo: 'VICE-PRESIDENTE',
      }
    });
    return { success: true, message: ("Presidente adicionado com ID: ", docRef.id)};
  } catch (error) {
    return { success: false, message: "Erro ao adicionar presidente "};
  }
}

async function getDeputado(id) {
  try {
    const docRef = doc(db, "deputados", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("Documento não encontrado!");
    }
  } catch (error) {
    console.error("Erro ao obter documento:", error);
    throw error;
  }
}

async function getEtapasFromFirestore() {
    try {
        const querySnapshotPresidente = await getDocs(collection(db, 'presidente'));
        const querySnapshotDeputado = await getDocs(collection(db, 'deputados'));
        const querySnapshotAdministrador = await getDocs(collection(db, 'administrador'));

        const presidenteEtapas = querySnapshotPresidente.docs.map(doc => doc.data());
        const deputadoEtapas = querySnapshotDeputado.docs.map(doc => doc.data());
        const administradorEtapas = querySnapshotAdministrador.docs.map(doc => doc.data());
        
        const object = [{
          titulo: 'ADMINISTRADOR',
          numeros: 6,
          administradores: administradorEtapas

        },
        {
          titulo: 'DEPUTADO',
          numeros: 4,
          candidatos: deputadoEtapas,
          cargo: 'Deputado'

        },
        {
          titulo: 'PRESIDENTE',
          numeros: 2,
          candidatos: presidenteEtapas,
          cargo: 'Presidente'

        }
      ]
        return { object };
    } catch (error) {
        console.error('Erro ao buscar etapas do Firestore:', error);
        throw error;
    }
}




export { adicionarDeputado, adicionarPresidente, getDeputado, getEtapasFromFirestore };