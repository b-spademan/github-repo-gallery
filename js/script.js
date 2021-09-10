// Div where profile info will appear
const profileElement = document.querySelector(".overview");
const username = "b-spademan";

// Async function to get API data from github
getUser = async function () {
    const resource = await fetch(`https://api.github.com/users/${username}`);
    const user = await resource.json();
    console.log(user);
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
};