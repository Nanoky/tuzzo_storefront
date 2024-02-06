// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import {
    FieldPath,
    Firestore,
    FirestoreDataConverter,
    WhereFilterOp,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    query,
    where,
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
            ...(param.limit ? [limit(param.limit)] : [])
        ).withConverter<TData>(param.converter);

        const querySnapshot = await getDocs(q);

        let data: TData[] = [];

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
}
