let url = new URL(location.href);
let id = url.searchParams.get('id')

fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(value => value.json())
    .then(value => {
        let infoDiv = document.createElement('div');
        infoDiv.id = 'infoDiv';

        let infoList = document.createElement('ul');
        infoList.className = 'ulList'
        for (const user in value) {
            let userListItem = document.createElement('li');
            if (typeof value[user] !== 'object') {
                userListItem.innerText = `${user} - ${value[user]} `;
            } else {
                userListItem.innerText = `${user} :`;
                let userList = document.createElement('ul');
                for (const key in value[user]) {
                    let keyListItem = document.createElement('li');
                    if (typeof value[user][key] !== 'object') {
                        keyListItem.innerText = `${key} - ${value[user][key]}`;
                    } else {
                        keyListItem.innerText = `${key} :`;
                        let innerList = document.createElement('ul');
                        for (const element in value[user][key]) {
                            let innerListItem = document.createElement('li');
                            if (typeof value[user][key][element] !== 'object') {
                                innerListItem.innerText = `${element} - ${value[user][key][element]}:`;
                            }
                            innerList.append(innerListItem);
                        }
                        keyListItem.append(innerList);
                    }
                    userList.append(keyListItem);
                }
                userListItem.append(userList);
            }
            infoList.append(userListItem);
        }
        infoDiv.append(infoList);
        document.body.append(infoDiv);

        let buttonDiv = document.createElement('div');
        buttonDiv.id = 'buttonDiv';
        let button = document.createElement('button');
        button.innerText = "post of current user";
        button.className = 'user-button';
        button.onclick = () => {
            button.disabled = true;
            fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
                .then(response => response.json())
                .then(posts => {
                    let postContainer = document.createElement('div');
                    postContainer.className = 'postContainer';
                    posts.forEach(post => {
                        let postDiv = document.createElement('div');
                        postDiv.className = 'postDiv';

                        let postTitle = document.createElement('p');
                        postTitle.innerText = post.title;
                        postTitle.className = 'postTitle';
                        postDiv.append(postTitle);

                        let postDetailsButton = document.createElement('button');
                        postDetailsButton.innerText = "Do u want to know more?";
                        postDetailsButton.className = 'postDetailsButton';
                        postDetailsButton.onclick = () => {
                            window.location.href = `postDetails.html?id=${post.id}`;
                        };
                        postDiv.append(postDetailsButton);

                        postContainer.append(postDiv);
                    });
                    buttonDiv.append(postContainer);
                });
        };
        buttonDiv.append(button);
        document.body.append(buttonDiv);
    });
