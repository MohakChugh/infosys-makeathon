const graphqlrequest = require('graphql-request');
const GraphQLClient = graphqlrequest.GraphQLClient;

const insertState = async (GovtID, StateID, StateName) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `mutation {
        insert_State(objects: {GovtID: "${GovtID}", StateID: "${StateID}", StateName: "${StateName}"}) {
            affected_rows
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const insertArea = async (AreaID, AreaName, CityID, GovtID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `mutation {
        insert_area(objects: {AreaID: "${AreaID}", AreaNAme: "${AreaName}", CityID: "${CityID}", GovtID: "${GovtID}"}) {
            affected_rows
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const insertCitizens = async (Area, CitizenID, City, Email, FirstName, LastName, Password, Phone, State) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `mutation {
        insert_citizens(objects: {Area: "${Area}", CitizenID: "${CitizenID}", 
        City: "${City}", Email: "${Email}", FirstName: "${FirstName}", LastName: "${LastName}", 
        Password: "${Password}", Phone: "${Phone}", State: "${State}"}) {
            affected_rows
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const insertCity = async (CityID, CityName, GovtID, StateID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `mutation {
        insert_city(objects: {CityID: "${CityID}", CityName: "${CityName}", GovtID: "${GovtID}", StateID: "${StateID}"}) {
            affected_rows
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const insertDigitalSignatures = async (ProblemID, Signature, SignerID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `mutation {
        insert_digital_signatures(objects: {ProblemID: "${ProblemID}", Signature: "${Signature}", SignerID: "${SignerID}"}) {
            affected_rows
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const insertGovtOfficial = async (AreaCode, CityCode, Email, FirstName, GovtID, LastName, Password, Phone, StateCode) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `mutation {
        insert_government_official(objects: {AreaCode: "${AreaCode}", CityCode: "${CityCode}", Email: "${Email}", FirstName: "${FirstName}", GovtID: "${GovtID}", LastName: "${LastName}", Password: "${Password}", Phone: "${Phone}", StateCode: "${StateCode}"}) {
            affected_rows
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const insertProblemTag = async (TagID, TagName) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `mutation {
        insert_problem_tags(objects: {TagID: "${TagID}", TagName: "${TagName}"}) {
            affected_rows
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const insertProblem = async (Area, ProbemRaiserID, ProblemDescription, ProblemID, ProblemTag) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `mutation {
        insert_problems(objects: {Area: "${Area}", ProblemRaiserID: "${ProbemRaiserID}", 
        ProblemDescription: "${ProblemDescription}", ProblemID: "${ProblemID}", ProblemTag: "${ProblemTag}"}) {
            affected_rows
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const insertStatus = async (StateCode, StatusDescription) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `mutation {
        insert_status(objects: {StatusCode: "${StateCode}", StatusDescription: "${StatusDescription}"}) {
            affected_rows
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const insertKey = async (citizenID, privateKey, publicKey) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    
    const query = `mutation {
        insert_keys(objects: {CitizenID: "${citizenID}", PrivateKey: "${privateKey}", PublicKey: "${publicKey}"}) {
        affected_rows
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
    
};
exports.insertState = insertState;
exports.insertArea = insertArea;
exports.insertCitizens = insertCitizens;
exports.insertCity = insertCity;
exports.insertDigitalSignatures = insertDigitalSignatures;
exports.insertGovtOfficial = insertGovtOfficial;
exports.insertProblemTag = insertProblemTag;
exports.insertProblem = insertProblem;
exports.insertStatus = insertStatus;
exports.insertKey = insertKey;
