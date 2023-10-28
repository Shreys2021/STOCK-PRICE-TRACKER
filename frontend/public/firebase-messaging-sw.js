importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyBboxRfZ3az9BBG4PDf8suPEo7hUhS47dQ",
    authDomain: "otto-bot-b73f0.firebaseapp.com",
    projectId: "otto-bot-b73f0",
    storageBucket: "otto-bot-b73f0.appspot.com",
    messagingSenderId: "113588209548",
    appId: "1:113588209548:web:d6674178b817213bc3f8a9"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});