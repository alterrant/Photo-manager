import {
    createUserWithEmailAndPassword,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithRedirect,
    signOut,
} from 'firebase/auth';

export const logInGitHub = () => {
    const providerGitHub = new GithubAuthProvider();
    const auth = getAuth();
    // eslint-disable-next-line no-void
    void (async () => {
        await signInWithRedirect(auth, providerGitHub);
    })();
};

export const logInGoogle = () => {
    const providerGoogle = new GoogleAuthProvider();
    const auth = getAuth();
    // eslint-disable-next-line no-void
    void (async () => {
        await signInWithRedirect(auth, providerGoogle);
    });
};

// eslint-disable-next-line consistent-return
export const signIn = async ({ email, password }: any) => {
    try {
        const auth = getAuth();

        const signInUser = await signInWithEmailAndPassword(auth, email, password);
        return signInUser.user;
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return { errorCode, errorMessage };
    }
};

export const signUpRequest = async ({ email, password }: any) => {
    const signedUpInfo: any = {};
    try {
        const auth = getAuth();

        const signUpUser = await createUserWithEmailAndPassword(auth, email, password);
        signedUpInfo.signedUpUser = signUpUser.user;
    } catch (error: any) {
        signedUpInfo.error = {};
        signedUpInfo.error.errorCode = error.code;
        signedUpInfo.error.errorMessage = error.message;
    }
    return signedUpInfo;
};

// eslint-disable-next-line consistent-return
export const logOutRequest = async () => {
    try {
        const auth = getAuth();
        await signOut(auth);
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return { errorCode, errorMessage };
    }
};

// Getting profile info
// eslint-disable-next-line consistent-return
export const authUserProfile = (auth: any) => {
    const user = auth.currentUser;

    if (user !== null) {
        return {
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            emailVerified: user.emailVerified,
            uid: user.uid,
        };
    }
};

export const createUserProfile = (user: any) => {
    const userProfile: any = {};

    const {
        uid,
        email,
        emailVerified,
        displayName,
        isAnonymous,
        photoURL,
        phoneNumber,
        metadata: { creationTime, lastSignInTime },
    } = user;

    if (uid) userProfile.uid = uid;
    if (email) userProfile.email = email;
    if (emailVerified) userProfile.emailVerified = emailVerified;
    if (displayName) userProfile.displayName = displayName;
    if (isAnonymous) userProfile.isAnonymous = isAnonymous;
    if (photoURL) userProfile.photoURL = photoURL;
    if (phoneNumber) userProfile.phoneNumber = phoneNumber;
    if (creationTime) userProfile.creationTime = creationTime;
    if (lastSignInTime) userProfile.lastSignInTime = lastSignInTime;

    return userProfile;
};
