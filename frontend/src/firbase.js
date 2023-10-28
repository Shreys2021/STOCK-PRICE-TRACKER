
import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'

const config = {
    apiKey: "AIzaSyBboxRfZ3az9BBG4PDf8suPEo7hUhS47dQ",
    authDomain: "otto-bot-b73f0.firebaseapp.com",
    projectId: "otto-bot-b73f0",
    storageBucket: "otto-bot-b73f0.appspot.com",
    messagingSenderId: "113588209548",
    appId: "1:113588209548:web:d6674178b817213bc3f8a9"
}


export const app = initializeApp(config)
export const messaging = getMessaging(app);
