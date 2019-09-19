const graphqlrequest = require('graphql-request');
const GraphQLClient = graphqlrequest.GraphQLClient;

const queryState = async (GovtID, StateID, StateName) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        State {
            GovtID
            StateID
            StateName
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const queryArea = async (GovtID, StateID, StateName) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        area {
            AreaID
            AreaNAme
            CityID
            GovtID
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const getCitizenByPhoneNUmber = async (phonenumber) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        citizens(where: {Phone: {_eq: "${phonenumber}"}}) {
            Area
            CitizenID
            City
            Email
            FirstName
            LastName
            Password
            Phone
            State
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const getCityBYGovtID = async (govtID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        city(where: {GovtID: {_eq: "${GovtID}"}}) {
            CityID
            CityName
            GovtID
            StateID
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const getDigitalSignatures = async (ProblemID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        digital_signatures(where: {ProblemID: {_eq: "${ProblemID}"}}) {
            ProblemID
            Signature
            SignerID
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const getGovtEmpData = async (Password) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        government_official(where: {Password: {_eq: "${Password}"}}) {
            AreaCode
            CityCode
            Email
            FirstName
            GovtID
            LastName
            Phone
            StateCode
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};

const problemTagEvent = async (TagID, TagName) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = ` {
        problem_tags(where: {TagID: {_eq: "${TagID}"}, TagName: {_eq: "${TagName}"}}) {
            TagID
            TagName
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const problemFeed = async () => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        problems {
            Area
            DigitalSignaturesCount
            OriginTImeStamp
            ProbemRaiserID
            ProblemDescription
            ProblemID
            ProblemTag
            ResolveTimeStamp
            Status
        }
    }`;
    let result = await client.request(query)
        .then(data => { 
            console.log(data);
            return data;
        })
        .catch((err) => { return err });
    console.log(result);
    return result;
};

const getProblemOfUser = async (ProblemRaiserID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = ` {
        problems(where: {ProbemRaiserID: {_eq: "${ProblemRaiserID}"}}) {
            Area
            DigitalSignaturesCount
            OriginTImeStamp
            ProbemRaiserID
            ProblemDescription
            ProblemID
            ProblemTag
            ResolveTimeStamp
            Status
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const getStatusWithStatusCode = async (StatusCode) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = ` {
        status(where: {StatusCode: {_eq: "${StatusCode}"}}) {
            StatusCode
            StatusDescription
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};

console.log(problemFeed());

exports.queryState = queryState;
exports.queryArea = queryArea;
exports.getCitizenByPhoneNUmber = getCitizenByPhoneNUmber;
exports.getCityBYGovtID = getCityBYGovtID;
exports.getDigitalSignatures = getDigitalSignatures;
exports.getGovtEmpData = getGovtEmpData;
exports.problemTagEvent = problemTagEvent;
exports.problemFeed = problemFeed;
exports.getProblemOfUser = getProblemOfUser;
exports.getStatusWithStatusCode = getStatusWithStatusCode;