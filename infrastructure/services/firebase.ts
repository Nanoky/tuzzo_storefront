// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import {
    FieldPath,
    Firestore,
    FirestoreDataConverter,
    WhereFilterOp,
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
    writeBatch,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCe9pA8wqwon1N4Sh2E5DXIpZ64r8d7-VI",
    authDomain: "ayoka-a2a41.firebaseapp.com",
    projectId: "ayoka-a2a41",
    storageBucket: "ayoka-a2a41.appspot.com",
    messagingSenderId: "639621872213",
    appId: "1:639621872213:web:5f99d872b7784ee8f7f2dc",
    measurementId: "G-DKDKPFGHVD",
};

export class Firebase {
    private _app!: FirebaseApp;
    public get app(): FirebaseApp {
        return this._app;
    }
    private set app(value: FirebaseApp) {
        this._app = value;
    }

    constructor() {
        // Initialize Firebase
        this.app = initializeApp(firebaseConfig);
    }
}

export class FireStoreService {
    private _db!: Firestore;
    private get db(): Firestore {
        return this._db;
    }
    private set db(value: Firestore) {
        this._db = value;
    }
    constructor(firebase: Firebase) {
        this.db = getFirestore(firebase.app);
    }

    async search<TData>(param: {
        collection: string;
        pathSegments?: string[];
        filters: {
            fieldPath: string | FieldPath;
            opStr: WhereFilterOp;
            value: unknown;
        }[];
        converter: FirestoreDataConverter<TData, any>;
        limit?: number;
        orderBy?: string;
    }) {
        const collectionRef = collection(
            this.db,
            param.collection,
            ...(param.pathSegments ?? [])
        );

        const q = query(
            collectionRef,
            ...param.filters.map((filter) =>
                where(filter.fieldPath, filter.opStr, filter.value)
            ),
            ...(param.limit ? [limit(param.limit)] : []),
            ...(param.orderBy ? [orderBy(param.orderBy)] : [])
        ).withConverter<TData>(param.converter);

        console.debug("q", q)

        const querySnapshot = await getDocs(q);

        console.debug("querySnapshot", querySnapshot.size);

        let data: TData[] = [];

        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });

        return data;
    }

    async searchRaw(param: {
        collection: string;
        pathSegments?: string[];
        filters: {
            fieldPath: string | FieldPath;
            opStr: WhereFilterOp;
            value: unknown;
        }[];
        limit?: number;
        orderBy?: string;
    }) {
        const collectionRef = collection(
            this.db,
            param.collection,
            ...(param.pathSegments ?? [])
        );

        const q = query(
            collectionRef,
            ...param.filters.map((filter) =>
                where(filter.fieldPath, filter.opStr, filter.value)
            ),
            ...(param.limit ? [limit(param.limit)] : []),
            ...(param.orderBy ? [orderBy(param.orderBy)] : [])
        );

        console.debug("q", q)

        const querySnapshot = await getDocs(q);

        console.debug("querySnapshot", querySnapshot.size);

        let data: any[] = [];

        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });

        return data;
    }

    async getAll<TData>(param: {
        collection: string;
        pathSegments?: string[];
        converter: FirestoreDataConverter<TData, any>;
        limit?: number;
    }) {
        const collectionRef = collection(
            this.db,
            param.collection,
            ...(param.pathSegments ?? [])
        );

        const q = query(
            collectionRef,
            ...(param.limit ? [limit(param.limit)] : [])
        ).withConverter(param.converter);

        const querySnapshot = await getDocs(q);

        let data: TData[] = [];

        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });

        return data;
    }

    async get<TData>(param: {
        collection: string;
        id: string;
        pathSegments?: string[];
        converter: FirestoreDataConverter<TData, any>;
    }) {
        const ref = doc(
            this.db,
            param.collection,
            ...(param.pathSegments ?? []),
            param.id
        ).withConverter(param.converter);
        const docSnap = await getDoc(ref);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    }

    async create<TData>(param: {
        collection: string;
        pathSegments?: string[];
        data: TData;
        converter?: FirestoreDataConverter<TData, any>;
        getConverter?: (db: Firestore) => FirestoreDataConverter<TData, any>;
    }) {
        let collectionRef: any = collection(
            this.db,
            param.collection,
            ...(param.pathSegments ?? [])
        );
        if (param.getConverter) {
            collectionRef = collectionRef.withConverter(
                param.getConverter(this.db)
            );
        }

        if (param.converter) {
            collectionRef = collectionRef.withConverter(param.converter);
        }
        const docRef = await addDoc(collectionRef, param.data);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    }

    async update<TData>(param: {
        collection: string;
        pathSegments?: string[];
        id: string;
        data: TData;
        converter: FirestoreDataConverter<TData, any>;
    }) {
        const collectionRef = collection(
            this.db,
            param.collection,
            ...(param.pathSegments ?? [])
        ).withConverter(param.converter);
        const docRef = doc(collectionRef, param.id);

        await updateDoc(docRef, param.converter.toFirestore(param.data));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    }

    async createMany<TData>(param: {
        collection: string;
        pathSegments?: string[];
        data: TData[];
        converter?: FirestoreDataConverter<TData, any>;
        getConverter?: (db: Firestore) => FirestoreDataConverter<TData, any>;
    }) {
        const batch = writeBatch(this.db);
        let collectionRef: any = collection(
            this.db,
            param.collection,
            ...(param.pathSegments ?? [])
        );

        if (param.getConverter) {
            collectionRef = collectionRef.withConverter(
                param.getConverter(this.db)
            );
        }

        if (param.converter) {
            collectionRef = collectionRef.withConverter(param.converter);
        }

        param.data.forEach((data) => {
            const docRef = doc(collectionRef);
            batch.set(docRef, data);
        });

        try {
            await batch.commit();
            return;
        } catch (error) {
            throw new Error("Erreur lors de l'enregistrement de la commande", {
                cause: error,
            });
        }
    }
}
