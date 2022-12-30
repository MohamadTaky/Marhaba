import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyC8NVGkNmVD_nUEZSeTYuvEc6Q-KQOtDaU",
	authDomain: "chat-app-dev-51e1d.firebaseapp.com",
	projectId: "chat-app-dev-51e1d",
	storageBucket: "chat-app-dev-51e1d.appspot.com",
	messagingSenderId: "736421368776",
	appId: "1:736421368776:web:bc13ccf2214691acc9a6fd",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default firebaseConfig;
