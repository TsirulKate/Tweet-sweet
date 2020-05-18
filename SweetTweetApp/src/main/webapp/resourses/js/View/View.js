class View {

    renderPostsPage(posts, currentUser, operation, setPage, login) {
        let postsPageWrapper = document.getElementById("currentPage");
        postsPageWrapper.innerHTML = "";
        let fragment = this.workWithTemplate("template-posts-page", {});
        let fieldUserWrapper = fragment.querySelector(".field-user");
        fieldUserWrapper.innerHTML = "";
        if (currentUser != null) {
            let fragmentField = this.workWithTemplate("template-field-user", {user: currentUser});
            const badAvatar = fragmentField.querySelector(".bad-avatar");
            const img = document.createElement('img');
            img.className = 'avatar';
            img.src = "resourses/images/91e83b00c27bf4d5bb849a6ac2b81fe5.jpg";
            badAvatar.appendChild(img);
            let logOutButton = fragmentField.querySelector(".button-log");
            let addPostButton = fragmentField.querySelector(".button-add");
            logOutButton.addEventListener("click", () => login(null));
            addPostButton.addEventListener("click", () => {
                operation("add");
                setPage("addEditPage");
            });
            fieldUserWrapper.appendChild(fragmentField);
        } else {
            let fragmentField = this.workWithTemplate("template-auth-button", {});
            let authButton = fragmentField.querySelector(".button-authorization");
            authButton.addEventListener("click", () => setPage("authorization"));
            fieldUserWrapper.appendChild(fragmentField);
        }
        let postsWrapper = fragment.querySelector(".news-line");
        postsWrapper.innerHTML = "";
        posts.forEach((post) => {
            const f = this.renderPost(post, currentUser, operation, setPage);
            postsWrapper.appendChild(f);
        });
        postsPageWrapper.appendChild(fragment);

    }

    renderAuthorizationPage(setPage, login) {
        let authPageWrapper = document.getElementById("currentPage");
        authPageWrapper.innerHTML = "";
        let fragment = this.workWithTemplate("template-authorization-page", {});
        let logInButton = fragment.querySelector("form");
        logInButton.addEventListener("submit", (e) => {
            if (e.target.login.value) {
                login(e.target.login.value);
            }
        });
        authPageWrapper.appendChild(fragment);
    }

    workWithTemplate(templateElement, currentObject) {
        let template = document.getElementById(templateElement);
        let fragment = template.content.cloneNode(true);
        let blocks = fragment.querySelectorAll("[data-target]");
        blocks.forEach((b) => {
            const key = b.getAttribute("data-target");
            if (typeof currentObject[key] == 'undefined') {
                return;
            }
            if (b.hasAttribute("data-target-src")) {
                b.setAttribute(b.getAttribute("data-target-src"), currentObject[key]);
            } else {
                b.innerHTML = currentObject[key];
            }
        });
        return fragment;
    }

    renderPost(post, currentAuthor, operation, setPage) {
        post = {
            ...post,
            likesCount: post.likes.length,
            postDate: moment(post.createdAt).format("On MMMM D, YYYY H:m"),
            hashTags: post.hashTags.join("  ")
        };

        let fragment = this.workWithTemplate("template-post", post);
        const badAvatar = fragment.querySelector(".bad-avatar");

        if (post.author === currentAuthor) {
            const img = document.createElement('img');
            img.className = 'avatar';
            img.src = "resourses/images/91e83b00c27bf4d5bb849a6ac2b81fe5.jpg";
            badAvatar.appendChild(img);
        } else {
            const div = document.createElement('div');
            div.className = 'icon';
            badAvatar.appendChild(div);
            const btns = fragment.querySelector(".buttons");
            btns.classList.add("hidden");
        }

        if (post.likes.includes(currentAuthor)) {
            const pressedLike = fragment.querySelector(".like");
            pressedLike.className = 'like-pressed';
        }

        let editPostButton = fragment.querySelector(".button-edit");
        let deletePostButton = fragment.querySelector(".button-delete");
        if (editPostButton) {
            editPostButton.addEventListener("click", () => {
                operation = String(post.id);
                setPage("addEditPage");
            });
        }

        return fragment;
    }

    renderAddEditPage(currentUser, operation, post, availableID, funcForWork, setPage) {
        let addEditPageWrapper = document.getElementById("currentPage");
        addEditPageWrapper.innerHTML = "";
        let text;
        if (operation == "add") {
            text = "Create new post";
        } else {
            text = "Edit post";
        }
        let fragment = this.workWithTemplate("template-add-edit-page", {
            user: currentUser,
            currentDate: moment().format("On MMMM D, YYYY H:m"),
            buttonUploadPost: text
        });
        let addEditForm = fragment.querySelector("form");
        const badAvatar = fragment.querySelector(".bad-avatar");
        const img = document.createElement('img');
        img.className = 'avatar';
        img.src = "resourses/images/91e83b00c27bf4d5bb849a6ac2b81fe5.jpg";
        badAvatar.appendChild(img);
        addEditForm.addEventListener("submit", (e) => {
            if (e.target.description.value) {
                if (operation == "add") {
                    funcForWork({
                        id: String(availableID),
                        description: e.target.description.value,
                        createdAt: new Date(),
                        author: currentUser,
                        hashTags: e.target.hashtags.value.split(" "),
                        likes:[]
                    });
                } else {
                    funcForWork(Number(operation), {
                        description: e.target.description.value,
                        hashTags: e.target.hashtags.value.split(" ")
                    })
                }
            }
        });
        addEditPageWrapper.appendChild(fragment);
    }

}