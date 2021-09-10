// Div where profile info will appear
const profileElement = document.querySelector(".overview");
const username = "b-spademan";
repoList = document.querySelector(".repo-list");

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
    const repoData = await githubRepos.json();
    console.log(repoData);
    displayRepos(repoData);
};

const displayRepos = function (repos) {
    for (const details of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${details.name}</h3>`;
        repoList.append(repoItem);
    }
};
