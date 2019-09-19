const graphqlrequest = require('graphql-request')
const GraphQLClient = graphqlrequest.GraphQLClient

const insertUser = async (Area, CitizenID, City, Email, FirstName, LastName, Password, Phone, State) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `mutation {
        insert_citizens(objects: {Area: "${Area}", CitizenID: "${CitizenID}", City: "${City}", 
        Email: "${Email}", FirstName: "${FirstName}", LastName: "${LastName}", 
        Password: "${Password}", Phone: "${Phone}", State: "${State}"}) {
            affected_rows
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    return result
};
const getPassword = async (Email) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        citizens(where: {Email: {_eq: "${Email}"}}) {
            Password
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    // console.log(result)
    return result.citizens[0].Password
};
const getCitizenUuid = async (Email) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        citizens(where: {Email: {_eq: "${Email}"}}) {
            CitizenID
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    // console.log(result)
    return result.citizens[0].Password
};
exports.insertUser = insertUser
exports.getPassword = getPassword
exports.getCitizenUuid = getCitizenUuid