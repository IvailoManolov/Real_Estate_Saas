import { auth } from 'express-oauth2-jwt-bearer';

//Hello
const jwtCheck = auth({
    audience: "http://localhost:8080",
    issuerBaseURL: "https://dev-8utzs7178ywemc3w.us.auth0.com",
    tokenSigningAlg: "RS256"
})

export default jwtCheck;