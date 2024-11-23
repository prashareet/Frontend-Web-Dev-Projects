

async function addCard(){
    const inputValue = document.querySelector("input").value;
    fetch(`https://api.github.com/users/${inputValue}`)
    .then(response => 
        response.json())
    .then((data)=> {
        const gitCardDiv = renderCardComponent(data);
        document.querySelector("body").appendChild(gitCardDiv);
    })
    .catch(error => console.error('Error:', error));
    document.querySelector("input").value = "";
}

function renderCardComponent(data) {
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card");
    // Card div made

    // Profile image section
    const profileImageDiv = document.createElement("div");
    profileImageDiv.setAttribute("class", "profile-image");
    const imageComponent = document.createElement("img");
    imageComponent.setAttribute("src", data.avatar_url);
    imageComponent.setAttribute("alt", `${data.name}'s Profile Picture`);
    profileImageDiv.appendChild(imageComponent);
    // Append profile image to card
    cardDiv.appendChild(profileImageDiv);

    // Profile details section
    const profileDetailsDiv = document.createElement("div");
    profileDetailsDiv.setAttribute("class", "profile-details");

    // Full name
    const fullNameComponent = document.createElement("h2");
    fullNameComponent.setAttribute("class", "full-name");
    fullNameComponent.innerHTML = data.name || "N/A"; // Default if no name provided
    profileDetailsDiv.appendChild(fullNameComponent);

    // Username
    const usernameComponent = document.createElement("p");
    usernameComponent.setAttribute("class", "username");
    usernameComponent.innerHTML = `@${data.login}`;
    profileDetailsDiv.appendChild(usernameComponent);

    // Stats section
    const statsDiv = document.createElement("div");
    statsDiv.setAttribute("class", "stats");

    // Followers stat
    const followersDiv = document.createElement("div");
    followersDiv.setAttribute("class", "stat");
    const followersCount = document.createElement("h3");
    followersCount.innerHTML = data.followers;
    const followersLabel = document.createElement("p");
    followersLabel.innerHTML = "Followers";
    followersDiv.appendChild(followersCount);
    followersDiv.appendChild(followersLabel);

    // Following stat
    const followingDiv = document.createElement("div");
    followingDiv.setAttribute("class", "stat");
    const followingCount = document.createElement("h3");
    followingCount.innerHTML = data.following;
    const followingLabel = document.createElement("p");
    followingLabel.innerHTML = "Following";
    followingDiv.appendChild(followingCount);
    followingDiv.appendChild(followingLabel);

    // Append stats to statsDiv
    statsDiv.appendChild(followersDiv);
    statsDiv.appendChild(followingDiv);

    // Append statsDiv to profile details
    profileDetailsDiv.appendChild(statsDiv);

    // Profile link
    const profileLink = document.createElement("a");
    profileLink.setAttribute("href", data.html_url);
    profileLink.setAttribute("target", "_blank");
    profileLink.setAttribute("class", "profile-link");
    profileLink.innerHTML = "View Profile";
    profileDetailsDiv.appendChild(profileLink);

    // Append profileDetailsDiv to card
    cardDiv.appendChild(profileDetailsDiv);

    // Return the complete card element
    return cardDiv;
}

/*
<div class="card">
        <div class="profile-image">
          <img src="https://avatars.githubusercontent.com/u/583231?v=4" alt="GitHub Profile Picture">
        </div>
        <div class="profile-details">
          <h2 class="full-name">The Octocat</h2>
          <p class="username">@octocat</p>
          <div class="stats">
            <div class="stat">
              <h3>5800</h3>
              <p>Followers</p>
            </div>
            <div class="stat">
              <h3>9</h3>
              <p>Following</p>
            </div>
          </div>
          <a href="https://github.com/octocat" target="_blank" class="profile-link">View Profile</a>
        </div>
 */