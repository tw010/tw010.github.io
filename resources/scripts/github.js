let repos = null

async function fetchUserRepositories(username) {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!response.ok) {
        throw new Error(response.status+"\n"+response.url);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      notify("#"+error, 5000);
      return null;
    }
}


function loadUserRepos(){
    fetchUserRepositories("tw010").then(repositories => {
        repos = repositories
        if(repos==null)
            setTimeout(loadUserRepos, 5000)
    })
}
loadUserRepos()

function waitForChange(valueToWatch) {
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (valueToWatch !== null) {
                clearInterval(interval);
                resolve(valueToWatch);
            }
        }, 100);
    });
}



function createRepoList() {
    waitForChange(repos).then(() => {
        const c = document.getElementById("github")
        c.innerHTML = ""
        for(let i in repos){
            const e = document.createElement("div")

            let gen = document.createElement("div")
            let name = document.createElement("a")
            name.innerText = repos[i].name
            name.href = repos[i].html_url
            gen.appendChild(name)

            let desc = document.createElement("p")
            desc.innerText = repos[i].description
            gen.appendChild(desc)

            if(repos[i].fork){
                let fork = document.createElement("a")
                fork.innerHTML = '<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" class="octicon octicon-repo-forked mr-2"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path></svg>'
                fork.append("fork")
                gen.appendChild(fork)
                console.log(repos[i])
            }

            let stats = document.createElement("div")
            stats.classList.add("stats")
            
            let stars = document.createElement("div")
            stars.innerHTML = '<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" class="octicon octicon-star d-inline-block mr-2"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path></svg>'
            stars.append(repos[i].stargazers_count)
            stats.appendChild(stars)
            let forks = document.createElement("div")
            forks.innerHTML = '<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" class="octicon octicon-repo-forked mr-2"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path></svg>'
            forks.append(repos[i].forks_count)
            stats.appendChild(forks)

            e.appendChild(stats)
            e.appendChild(gen)

            c.appendChild(e)
        }
    });
}