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
const insertGovt = async (Area, GovtID, City, Email, FirstName, LastName, Password, Phone, State) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `mutation {
        insert_government_official(objects: {AreaCode: "${Area}", GovtID: "${GovtID}", CityCode: "${City}", 
        Email: "${Email}", FirstName: "${FirstName}", LastName: "${LastName}", 
        Password: "${Password}", Phone: "${Phone}", StateCode: "${State}"}) {
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
    
    if(result.citizens[0]) {
        return result.citizens[0].Password
    } else {
        return "no match found"
    }
};
const getGovtPassword = async (Email) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        government_official(where: {Email: {_eq: "${Email}"}}) {
            Password
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    
    if(result.government_official[0]) {
        return result.government_official[0].Password
    } else {
        return "no match found"
    }
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
        .then(data => { 

            if(data.citizens[0]) {
                return data.citizens[0].CitizenID
            } else {
                return "None"
            }
        })
        .catch((err) => { return err })
    return result
};

const getGovtUuid = async (Email) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        government_official(where: {Email: {_eq: "${Email}"}}) {
          GovtID
        }
      }`
    let result = await client.request(query)
        .then(data => { 

            if(data.government_official[0]) {
                return data.government_official[0].GovtID
            } else {
                return "None"
            }
        })
        .catch((err) => { return err })
    return result
};
exports.insertUser = insertUser
exports.getPassword = getPassword
exports.getCitizenUuid = getCitizenUuid
exports.getGovtUuid = getGovtUuid
exports.insertGovt = insertGovt
exports.getGovtPassword = getGovtPassword