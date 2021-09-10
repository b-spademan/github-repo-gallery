// Div where profile info will appear
const profileElement = document.querySelector(".overview");
const username = "b-spademan";
const repoList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

// Async function to get API data from github
getUser = async function () {
    const resource = await fetch(`https://api.github.com/users/${username}`);
    const user = await resource.json();
    // console.log(user);
    displayUserInfo(user);
};
getUser();


const displayUserInfo = function (user) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = 
    `<figure>
        <img alt="user avatar" src=${user.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Bio:</strong> ${user.bio}</p>
        <p><strong>Location:</strong> ${user.location}</p>
        <p><strong>Number of public repos:</strong> ${user.public_repos}</p>
    </div>`;
    profileElement.append(userInfo);
    getRepos();
};

const getRepos = async function () {
    const githubRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repo = await githubRepos.json();
    console.log(repo);
    displayRepos(repo);
};

const displayRepos = function (repos) {
    for (const details of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${details.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function (repoName) {
    const specifics = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specifics.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (const language in languageData) {
    languages.push(language);
    console.log(languages);
    }
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    reposSection.classList.add("hide");
    const repoDiv = document.createElement("div");
    repoDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(repoDiv);
};


