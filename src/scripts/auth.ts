import {
    getAuth,
    signOut as signOutFirebase,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
export const auth = getAuth();

export async function signIn() {
    try {
        const result = await signInWithPopup(auth, provider);
        const credentials = GoogleAuthProvider.credentialFromResult(result);
        const token = credentials?.accessToken;
    } catch (err: any) {
        // Handle Errors here.
        const errorCode = err.code;
        const errorMessage = err.message;
        // The email of the user's account used.
        const email = err.customData?.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(err);

        console.error(errorCode);
        console.error(errorMessage);
        console.error(email);
        console.error(credential);
        // ...
    }
}

export function signOut() {
    signOutFirebase(auth)
        .then(() => {
            // Sign-out successful.
        })
        .catch((err) => {
            console.error(err);
            // An error happened.
        });
}
