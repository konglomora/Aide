import { initializeApp } from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyAYzjcYBshWL0mRNK21lH5kmtwybqySIAY',
    authDomain: 'aide-application.firebaseapp.com',
    projectId: 'aide-application',
    storageBucket: 'aide-application.appspot.com',
    messagingSenderId: '561150940236',
    appId: '1:561150940236:web:baf8992cb15c9f6ee850e9',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
