const graphqlrequest = require('graphql-request')
const GraphQLClient = graphqlrequest.GraphQLClient

const totalproblems = async () => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        problems {
            ProblemID
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    console.log(result.problems.length)
    return result
};
const activeProblems = async () => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        problems(where: {Status: {_eq: "0"}}) {
            relationship_status {
                StatusCode
            }
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    console.log(result.problems.length)
    return result
};
const resolvedProblems = async () => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        problems(where: {Status: {_eq: "1"}}) {
            relationship_status {
                StatusCode
            }
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    console.log(result.problems.length)
    return result
};
const getUpvotes = async (ProblemID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        problems(where: {ProblemID: {_eq: "${ProblemID}"}}) {
            UpVotes
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    // console.log(result.problems.length)
    return result
};
const getDownvotes = async (ProblemID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        problems(where: {ProblemID: {_eq: "${ProblemID}"}}) {
            DownVotes
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    // console.log(result.problems.length)
    return result
};
const UpVote = async (ProblemID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    let upvotecount = await getUpvotes(ProblemID);
    // console.log(upvotecount.problems[0].UpVotes);
    let count = upvotecount.problems[0].UpVotes;
    const query = `mutation {
        update_problems(where: {ProblemID: {_eq: "${ProblemID}"}}, _set: {UpVotes: "${++count}"}) {
            affected_rows
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    return result
};
const DownVote = async (ProblemID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    let upvotecount = await getDownvotes(ProblemID);
    console.log(upvotecount.problems[0].DownVotes);
    let count = upvotecount.problems[0].DownVotes;
    const query = `mutation {
        update_problems(where: {ProblemID: {_eq: "${ProblemID}"}}, _set: {DownVotes: "${++count}"}) {
            affected_rows
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    return result
};