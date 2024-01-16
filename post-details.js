let url = new URL(location.href);
let postId = url.searchParams.get('id')

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => response.json())
    .then(post => {
        let postDiv = document.createElement('div');
        postDiv.id = 'postDiv';

        let crownImg = document.createElement('img');
        crownImg.src = 'img/free-icon-crown-11365751.png';
        crownImg.id = 'crownImg';
        document.body.appendChild(crownImg);

        for (const key in post) {
            let p = document.createElement('p');
            p.innerText = `${key}: ${post[key]}`;
            p.className = 'postP';
            postDiv.appendChild(p);
        }
        document.body.appendChild(postDiv);

        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(response => response.json())
            .then(comments => {
                let commentsDiv = document.createElement('div');
                commentsDiv.id = 'commentsDiv';

                comments.forEach(comment => {
                    let commentDiv = document.createElement('div');
                    commentDiv.className = 'commentDiv';

                    for (const key in comment) {
                        let p = document.createElement('p');
                        p.innerText = `${key}: ${comment[key]}`;
                        p.className = 'commentP';
                        commentDiv.appendChild(p);
                    }
                    commentsDiv.appendChild(commentDiv);
                });

                let commentsTitle = document.createElement('h1');
                commentsTitle.innerText = 'Post comments:';
                commentsTitle.className = 'commentsTitle';

                document.body.appendChild(commentsTitle);
                document.body.appendChild(commentsDiv);
            });
    });
