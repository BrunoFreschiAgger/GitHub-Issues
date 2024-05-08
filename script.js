const gitHubForm = document.getElementById('gitHubForm');

gitHubForm.addEventListener('submit', (e) => {    
    e.preventDefault();

    let reponameInput = document.getElementById('reponameInput');

    let gitHubRepoName = reponameInput.value;

    requestReposIssues(gitHubRepoName);

});

const token = ' TOKEN ';

const requestReposIssues = (name) => {
    fetch(`https://api.github.com/repos/${name}/issues`,
        {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `token ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            formatResults(data);
        })
        .catch(error => console.error(error))
}

const formatResults = (data) => {
    for (let i in data) {
        let ul = document.getElementById('issuesRepo');

        let li = document.createElement('li');
        
        li.classList.add('list-group-item')
    
        li.innerHTML = (`
            <p><strong>Title:</strong> ${data[i].title}</p>
            <p><strong>User:</strong> ${data[i].user.login}</p>
            <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
        `);
        
        ul.appendChild(li);                
    }
}