const template = (name, subject, description) => {
    var text = ```
        Hello ${name}. You have posted your problem on our Problem Portal.
        The following details for your problems are as follows: 
        Category : ${subject}
        Description : ${description}
    ```;
    return text;
}
exports.template = template;