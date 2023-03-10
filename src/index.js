import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FirebaseAppProvider } from "reactfire";
import FirebaseComponents from "components/firebase-components/firebase-components";
import "libraries/i18n";

const firebaseConfig = {
	apiKey: "AIzaSyC8NVGkNmVD_nUEZSeTYuvEc6Q-KQOtDaU",
	authDomain: "chat-app-dev-51e1d.firebaseapp.com",
	projectId: "chat-app-dev-51e1d",
	storageBucket: "chat-app-dev-51e1d.appspot.com",
	messagingSenderId: "736421368776",
	appId: "1:736421368776:web:bc13ccf2214691acc9a6fd",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<FirebaseAppProvider suspense firebaseConfig={firebaseConfig}>
				<FirebaseComponents>
					<App />
				</FirebaseComponents>
		</FirebaseAppProvider>
	</React.StrictMode>
);
