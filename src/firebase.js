/* eslint-disable */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCTzscstZsBRovefyK6JoNjHyLxoYN-7IY",
  authDomain: "shopper-89651.firebaseapp.com",
  databaseURL: "https://shopper-89651-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shopper-89651",
  storageBucket: "shopper-89651.appspot.com",
  messagingSenderId: "1023746513206",
  appId: "1:1023746513206:web:6ca8faae3e2fa59ac43b97",
  measurementId: "G-7GFCX4NXPE"
};

export const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export {
  db
}
export const getUserState = () =>
  new Promise((resolve, reject) =>
    onAuthStateChanged(getAuth(), resolve, reject)
  );

export const useAuthState = () => {
  const user = ref(null);
  const error = ref(null);

  const auth = getAuth();
  let unsubscribe;
  onMounted(() => {
    unsubscribe = onAuthStateChanged(
      auth,
      (u) => (user.value = u),
      (e) => (error.value = e)
    );
  });
  onUnmounted(() => unsubscribe());

  const isAuthenticated = computed(() => user.value != null);

  return { user, error, isAuthenticated };
};
