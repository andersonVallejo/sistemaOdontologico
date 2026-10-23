import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { CitaDental, EstadoCita } from './types';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore with specified database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Google Firestore: Conexión establecida con éxito.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Verifique su conexión y configuración de Firebase.');
    }
  }
}

// Generate random confirmation code: ODO-XXXX
export function generarCodigoConfirmacion(): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomPart = '';
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ODO-${randomPart}`;
}

const COLLECTION_NAME = 'citas_dentales';

// Add new appointment to 'citas_dentales'
export async function guardarCita(datosCita: Omit<CitaDental, 'id'>): Promise<{ id: string; codigo: string }> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...datosCita,
      creado_en: new Date().toISOString(),
      timestamp: serverTimestamp()
    });
    return {
      id: docRef.id,
      codigo: datosCita.codigo
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, COLLECTION_NAME);
    throw error;
  }
}

// Update appointment status: 'completada' or 'cancelada'
export async function actualizarEstadoCita(id: string, nuevoEstado: EstadoCita): Promise<void> {
  const docPath = `${COLLECTION_NAME}/${id}`;
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      estado: nuevoEstado,
      actualizado_en: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, docPath);
    throw error;
  }
}

// Delete an appointment
export async function eliminarCita(id: string): Promise<void> {
  const docPath = `${COLLECTION_NAME}/${id}`;
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
    throw error;
  }
}

// Subscribe to real-time changes
export function suscribirCitas(
  callback: (citas: CitaDental[]) => void,
  onError?: (error: Error) => void
) {
  const q = query(collection(db, COLLECTION_NAME), orderBy('creado_en', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const citas: CitaDental[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          codigo: data.codigo || 'ODO-0000',
          nombre: data.nombre || 'Paciente',
          telefono: data.telefono || 'Sin teléfono',
          servicio: data.servicio || 'Consulta General',
          fecha: data.fecha || '',
          hora: data.hora || '',
          estado: data.estado || 'pendiente',
          notas: data.notas || '',
          creado_en: data.creado_en || ''
        } as CitaDental;
      });
      callback(citas);
    },
    (error) => {
      console.error('Error en suscripción Firestore:', error);
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    }
  );
}
