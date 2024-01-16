fetch('https://jsonplaceholder.typicode.com/users')
    .then(value => value.json())
    .then(value => {
        let container = document.getElementById('container');

        for (const user of value) {
            let div = document.createElement('div');
            div.className = 'user-div';

            let p = document.createElement('p');
            p.innerText = `${user.id} - ${user.name}`;
            p.className = 'user-p';

            let button = document.createElement('button');
            button.innerText = 'See more';
            button.className = 'users-button';
            button.onclick = () => {
                window.location.href = `userDetails.html?id=${user.id}`;
            };

            div.appendChild(p);
            div.appendChild(button);
            container.appendChild(div);
        }
    });
