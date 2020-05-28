class View {

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

    renderPostsPage(posts, currentUser, funcForPostDeleting, operation, setPage, login, workWithLike, setButtonLoad) {
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
            logOutButton.addEventListener("click", () => login(null, null));
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
            const f = this.renderPost(post, currentUser, funcForPostDeleting, operation, setPage, workWithLike);
            postsWrapper.appendChild(f);
        });
        setButtonLoad(fragment.querySelector(".button-load"));
        postsPageWrapper.appendChild(fragment);

    }

    renderAuthorizationPage(setPage, login, renderError) {
        let authPageWrapper = document.getElementById("currentPage");
        authPageWrapper.innerHTML = "";
        let fragment = this.workWithTemplate("template-authorization-page", {});
        let logInButton = fragment.querySelector("form");
        logInButton.addEventListener("submit", (e) => {
            e.preventDefault();
            if (e.target.login.value && e.target.password.value) {
                login(e.target.login.value, e.target.password.value);
            } else {
                renderError("Incorrect data at authorization");
            }
        });
        authPageWrapper.appendChild(fragment);
    }

    renderPost(post, currentAuthor, funcForPostDeleting, operation, setPage, workWithLike) {
        post = {
            ...post,
            likesCount: post.likes.length,
            postDate: moment(post.createdAt).format("On MMMM D, YYYY H:mm"),
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
        let likePostButton = fragment.querySelector(".like,.like-pressed");

        if (editPostButton) {
            editPostButton.addEventListener("click", () => {
                operation(String(post.id));
                setPage("addEditPage");
            });
        }

        if (deletePostButton) {
            deletePostButton.addEventListener("click", () => funcForPostDeleting(post.id));
        }

        likePostButton.addEventListener("click", () => workWithLike(post.id));

        return fragment;
    }

    renderAddEditPage(currentUser, operation, post, tempID, funcForWork, renderError) {
        let addEditPageWrapper = document.getElementById("currentPage");
        addEditPageWrapper.innerHTML = "";
        let text, fragment;
        if (operation == "add") {
            text = "Create new post";
            fragment = this.workWithTemplate("template-add-edit-page", {
                user: currentUser,
                currentDate: moment().format("On MMMM D, YYYY H:mm"),
                buttonUploadPost: text
            });
        } else {
            text = "Edit post";
            fragment = this.workWithTemplate("template-add-edit-page", {
                user: currentUser,
                currentDate: moment(post.createdAt).format("On MMMM D, YYYY H:mm"),
                description: post.description,
                hashtags: post.hashTags.join(" "),
                buttonUploadPost: text
            });
        }

        let addEditForm = fragment.querySelector("form");
        const badAvatar = fragment.querySelector(".bad-avatar");
        const img = document.createElement('img');
        img.className = 'avatar';
        img.src = "resourses/images/91e83b00c27bf4d5bb849a6ac2b81fe5.jpg";
        badAvatar.appendChild(img);
        addEditForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (e.target.description.value) {
                if (operation == "add") {
                    funcForWork({
                        id: String(tempID),
                        description: e.target.description.value,
                        createdAt: new Date(),
                        author: currentUser,
                        hashTags: e.target.hashtags.value.split(" "),
                        likes: []
                    });
                } else {
                    funcForWork(Number(operation), {
                        description: e.target.description.value,
                        hashTags: e.target.hashtags.value.split(" ")
                    });
                }
            } else {
                renderError("Empty description");
            }
        })
        ;
        addEditPageWrapper.appendChild(fragment);
    }

    renderFilteringPosts(setFilters) {
        let filteringPageWrapper = document.getElementById("currentPage");
        filteringPageWrapper.innerHTML = "";
        let fragment = this.workWithTemplate("template-filteringPage", {});
        let filterButton = fragment.querySelector("form");
        let filters = {
            author: null,
            date_before: null,
            date_after: null,
            date: null,
            hashTags: null
        };
        filterButton.addEventListener("submit", (e) => {
            e.preventDefault();
            if (e.target.checkAuthor.checked) {
                filters.author = e.target.inputAuthor.value;
            }
            if (e.target.checkDate.checked) {
                filters.date = moment(e.target.inputDate.value).toDate();
            }
            if (e.target.checkDatePeriod.checked) {
                filters.date_after = moment(e.target.inputDateAfter.value).toDate();
                filters.date_before = moment(e.target.inputDateBefore.value).add("days", 1).toDate();
            }
            if (e.target.checkHashTags.checked) {
                filters.hashTags = e.target.inputHashTags.value.split(" ");
            }
            setFilters(filters);
        });
        filteringPageWrapper.appendChild(fragment);
    }

    renderError(textOfError, setErrorField) {
        setErrorField();
        let errorWrapper = document.getElementById("textarea-for-error");
        let fragment = this.workWithTemplate("template-textarea-for-error", {
            textError: textOfError
        });
        errorWrapper.appendChild(fragment);
    }
}