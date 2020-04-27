class View {
    addPostsToNewsLine(posts, currentAuthor){
        let postsWrapper = document.getElementById("news-line");
        postsWrapper.innerHTML = "";
        posts.forEach((post) => {
            const f = this.renderPost(post, currentAuthor);
            postsWrapper.appendChild(f);
        });
    }

    renderPost(post,currentAuthor) {
        post = { ...post, likesCount: post.likes.length, postDate: moment(post.createdAt).format("On MMMM D, YYYY H:m"),hashTags: post.hashTags.join("  ")  };

        let template = document.getElementById("template-post");
        let fragment = template.content.cloneNode(true);
        let blocks = fragment.querySelectorAll("[data-target]");
        blocks.forEach((b) => {
            const key = b.getAttribute("data-target");
            if (typeof post[key] == 'undefined' ) { return; }
            if (b.hasAttribute("data-target-src")) {
                b.setAttribute(b.getAttribute("data-target-src"),post[key]);
            }
            else {

                b.innerHTML = post[key];
            }
        });
        const badAvatar = fragment.querySelector(".bad-avatar");
        if (post.author === currentAuthor){
             const img = document.createElement('img');
             img.className = 'avatar';
             img.src = "resourses/images/91e83b00c27bf4d5bb849a6ac2b81fe5.jpg";
             badAvatar.appendChild(img);
        }
        else {
            const div = document.createElement('div');
            div.className='icon';
            badAvatar.appendChild(div);
            const btns = fragment.querySelector(".buttons");
            btns.classList.add("hidden");
        }

        if(post.likes.includes(currentAuthor)){
            const pressedLike = fragment.querySelector(".like");
            pressedLike.className='like-pressed';
        }
        return fragment;
    }

    addPost(post){

    }

 }