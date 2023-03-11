const client_id = '3MVG9SOw8KERNN08QHZ0gtLMowlSDQfO6xFS0uUsd6xQaZfRESmA4ubtooNtgYXcW87tTFUzAwS2nENyxVzxV'
const client_secret = '2FF03738195A555102F5036A6DAD8CEF415E5656915789A4780E4F445A5294DE'
const sfdc_user = 'janekgontarek@creative-wolf-se3i8r.com'
const sfdc_pass = 'AlDente123ymyQ6nDNHyqUuMZWj64RKYDB'
const grant_type = 'password'

const credentials = 'grant_type=' + grant_type + 
'&client_id=' + client_id + 
'&client_secret=' + client_secret + 
'&username=' + sfdc_user + 
'&password=' + sfdc_pass

export const salesforceUrl = 'https://creative-wolf-se3i8r-dev-ed.trailblaze.my.salesforce.com'

export function getAccessToken() {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: credentials
    };
    let accessToken;
    fetch("http://localhost:5173/auth", requestOptions)
        .then(response => response.json())
        .then(data => accessToken = data['access_token']);

    return accessToken;
}
