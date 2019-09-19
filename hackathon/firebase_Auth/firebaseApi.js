const firebase = require("firebase");
const getMainDefinition = require("apollo-utilities");
const HttpLink = require("apollo-link-http");
const split = require("apollo-link");
const ApolloClient = require("apollo-client");
const InMemoryCache = require("apollo-cache-inmemory");
require("cross-fetch/polyfill");
require("ws");

var firebaseConfig = {
};
firebase.initializeApp(firebaseConfig);

var userData = {};
//signup user
const signup = async (email, password) => {
    try {
        let user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if (user) {
            
        }
    } catch (error) {
        
    }
}

//signin user
const signin = async (email, password) => {
    try {
        let user = await firebase.auth().signInWithEmailAndPassword(email, password);
        if (user) {
            
        } else {
            
        }
    } catch (error) {
        
    }
}
//signout user
const signout = async () => {
    try {
        await firebase.auth().signOut();
    } catch (error) {
    }
}

const onAuthStateChanged = async (userData) => {
    firebase.auth().onAuthStateChanged(async user => {
        if (user) {
            let token = await user.getIdToken();
            let idTokenResult = await user.getIdTokenResult();
            //testing token
            userData.token = token;
            //setting custom hasura claim
            const hasuraClaim = idTokenResult.claims["https://hasura.io/jwt/claims"];
            if (hasuraClaim) {
                let hasuraApp = async () => {
                    await App(token);
                }
                hasuraApp();
            } else {
                token = user.token;
                let metadataRef = firebase
                    .database()
                    .ref("metadata/" + user.uid + "/refreshTime");
                metadataRef.on("value", async () => {
                    token = await user.getIdToken(true);
                    return token;
                })
            }
        }
    })
}

const App = token => {
    const headers = {
        Authorization: `Bearer ${token}`
    };
    const httpLink = new HttpLink.HttpLink({
        uri: "https://delhimohallasabha.herokuapp.com/v1/graphql",
        headers
    })
    const link = createNewLink();

    function newApolloClient() {
        return new ApolloClient.ApolloClient({
            link,
            cache: new InMemoryCache.InMemoryCache()
        });
    }
    // userData.status = 'in';

    function createNewLink() {
        return split.split(
            ({
                query
            }) => {
                const {
                    kind,
                    operation
                } = getMainDefinition(query);
                return kind === "OperationDefinition" && operation === "subscription";
            },
            httpLink,
            httpLink
        );
    }
}

exports.signin = signin;
exports.signout = signout;
exports.signup = signup;