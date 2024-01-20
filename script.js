//Fetching the User profile from github

async function getGitHubProfile() {

   
    const username = document.getElementById('username').value;
    const apiUrl = `https://api.github.com/users/${username}`;

      

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const nameElement = document.getElementById('name');
        const avatarElement = document.getElementById('avatar');
        const bioElement = document.getElementById('bio');
        const locationElement = document.getElementById('location');
        const reposElement = document.getElementById('repos');
    


        nameElement.innerText = data.name || data.login;
        avatarElement.src = data.avatar_url;
        bioElement.innerText = data.bio || 'No bio available';
        locationElement.innerText = data.location || 'No location available';
        reposElement.innerText = `Public Repositories: ${data.public_repos}`;
    
        
        
    } catch (error) {
        console.error('Error fetching GitHub profile:', error);
        
        const githubLinkElement = document.getElementById('github');
        githubLinkElement.innerHTML = `<a href="https://github.com/${username}" target="_blank"><i class="fa fa-link"></i> https://github.com/${username}</a>`;

        const twitterLinkElement = document.getElementById('twitter');
        twitterLinkElement.innerHTML = `<a href="https://twitter.com/${username}" target="_blank">https://twitter.com/${username}</a>`;

  // fetching the repositories of user

  const apiUrl = `https://api.github.com/users/${username}/repos`;

  try {
      const response = await fetch(apiUrl);
      const repos = await response.json();
  
      const repoContainer = document.getElementById('repoContainer');
      repoContainer.innerHTML = '';
  
      for (const repo of repos) {
          const repoBox = document.createElement('div');
          repoBox.classList.add('repoBox');
  
          const link = document.createElement('a');
          link.href = repo.html_url;
          link.textContent = repo.name;
          link.target = "_blank";
          
          const languageInfo = document.createElement('p');
          languageInfo.textContent = `${repo.language || 'Not specified'}`;
  
          const readmeUrl = `https://api.github.com/repos/${username}/${repo.name}/readme`;
  
          try {
              const readmeResponse = await fetch(readmeUrl);
              const readmeData = await readmeResponse.json();
  
              const readmeContent = atob(readmeData.content); // Decode Base64 content
              const readmeContainer = document.createElement('div');
              readmeContainer.innerHTML = `<strong>README:</strong><br>${readmeContent}`;
              repoBox.appendChild(readmeContainer);
          } catch (readmeError) {
              console.error('Error fetching README file:', readmeError);
          }
  
          repoBox.appendChild(link);
          repoBox.appendChild(languageInfo);
          repoContainer.appendChild(repoBox);
      }
  
  } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
  }
  
        
    
}

}





