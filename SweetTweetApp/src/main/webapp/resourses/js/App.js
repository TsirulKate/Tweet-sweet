const POSTS = [
    {
        "id": "1",
        "description": "Work definitely comes first. I expect the same of my ideal other half too.",
        "createdAt": "2020-02-14T17:18:02",
        "author": "IU",
        "hashTags": [
            "#work", "#ideal"
        ],
        "likes": [
            "Tolik", "Paula", "Egor B", "Britney Spears", "J Lo"
        ]
    },
    {
        "id": "2",
        "description": "I haven't found anywhere in the world where I want to be all the time. The best of my life is the moving. I look forward to going.",
        "createdAt": "2020-02-14T21:56:21",
        "author": "Sean C",
        "hashTags": ["#moving", "#world", "#travelling"],
        "likes": ["Alexander T", "Lola", "Paula", "Egor B", "Vlada", "Masha U"]
    },
    {
        "id": "3",
        "description": "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
        "createdAt": "2020-02-15T16:56:23",
        "author": "Marie Curie",
        "hashTags": ["#fear", "#understand"],
        "likes": ["Lolita", "Pasha", "Egor B", "Meril", "Leonardo "]
    },
    {
        "id": "4",
        "description": "When time passes, the breakup that tore my heart apart\n When time passes, the young memories that kicked away at the blankets\n It gets forgotten, gets forgotten, it just passes right by\n It gets forgotten, gets forgotten, but back then I thought that was everything",
        "createdAt": "2020-02-16T22:14:58",
        "author": "IU",
        "hashTags": ["#TimePasses", "#optimism", "#heartbreak"],
        "likes": ["Lola Skin", "Li Min Ho", "Egor B", "Vova K"]
    },
    {
        "id": "5",
        "description": "Blues is a music genre and musical form which was originated in the Deep South of the United States around the 1870s by African-Americans from roots in African musical traditions, African-American work songs, and spirituals. ",
        "createdAt": "2020-02-16T23:23:23",
        "author": "Alexander T",
        "hashTags": ["#music", "#blues", "#history"],
        "likes": ["Sean C", "Paula", "Egor B"]
    },
    {
        "id": "6",
        "description": "I want to launch a new challenge. Who is with me?",
        "createdAt": "2020-02-17T08:14:12",
        "author": "Grif Hero",
        "hashTags": ["#challenge"],
        "likes": ["Alexander T", "Paula", "Leopold", "Dean W", "Sam W"]
    },
    {
        "id": "7",
        "description": "Let's play a game?",
        "createdAt": "2020-02-17T12:37:29",
        "author": "Leopold",
        "hashTags": ["#game", "#cat", "#friends"],
        "likes": ["Paula", "Egor B", "Dean W", "Sam W"]
    },
    {
        "id": "8",
        "description": "Block out all the negative energy, and just love",
        "createdAt": "2020-02-17T15:36:48",
        "author": "Ariana G",
        "hashTags": ["#energy", "#love"],
        "likes": ["Lola", "Paula", "Dean W", "Marie Curie"]
    },
    {
        "id": "9",
        "description": "Everyone is beautiful, everyone is perfect, and everyone is lovely.",
        "createdAt": "2020-02-18T10:48:36",
        "author": "Ariana G",
        "hashTags": ["#love", "#my", "#folowwers"],
        "likes": ["Lola Skin", "Paula", "Marie Curie", "Egor B", "Dean W", "Sam W"]
    },
    {
        "id": "10",
        "description": "I've got guests for dinner!",
        "createdAt": "2020-02-18T12:21:42",
        "author": "Leopold",
        "photoLink": "https://avatars.mds.yandex.net/get-pdb/964102/52b4f656-7bc2-4aaa-8eb9-88ca255d1b35/s600",
        "hashTags": ["#guests", "#mouse", "#dinner"],
        "likes": ["Lola", "Paula", "Egor B", "Sam W"]
    },
    {
        "id": "11",
        "description": "We are the heroes of our time!",
        "createdAt": "2020-02-18T23:23:45",
        "author": "Grif Hero",
        "hashTags": ["#heroes", "#infinite"],
        "likes": ["Lola", "Alexander T", "Egor B", "Dean W", "Sam W"]
    },
    {
        "id": "12",
        "description": "I think I fell in love with Singapore.",
        "createdAt": "2020-02-19T13:35:23",
        "author": "IU",
        "hashTags": ["#singapore", "#travelling"],
        "likes": ["Lola Skin", "Paula", "Marie Curie", "Egor B", "Vlad F", "Sam W"]
    },
    {
        "id": "13",
        "description": "Meditation is a great way to keep my body well-centered while juggling shooting schedules and recording sessions.",
        "createdAt": "2020-02-19T15:19:35",
        "author": "Ariana G",
        "hashTags": ["#meditation", "#join", "#health"],
        "likes": ["Lola", "Paula", "Egor B", "Marie Curie", "Dean W", "IU"]
    },
    {
        "id": "14",
        "description": "I cooked dinner from jars of food t hat I opened myself.",
        "createdAt": "2020-02-20T16:33:16",
        "author": "Leopold",
        "hashTags": ["#dinner", "#power"],
        "likes": ["Lola", "Alexander T", "Dean W", "Sam W"]
    },
    {
        "id": "15",
        "description": "I just think the most difficult thing to displace is privilege.",
        "createdAt": "2020-02-20T18:23:44",
        "author": "Sean C",
        "hashTags": ["#reflections"],
        "likes": ["Lola", "Paula", "Egor B", "Dean W", "Sam W"]
    },
    {
        "id": "16",
        "description": "When I was young, even though I received so much love,\n I used to pay attention to people who disliked me. That\"s why my lyrics were so sharp and dark.",
        "createdAt": "2020-02-20T23:48:05",
        "author": "IU",
        "hashTags": ["#love", "#lyrics"],
        "likes": ["Lola Skin", "Paula", "Egor B", "Marie Curie", "Dean W", "Sam W"]
    },
    {
        "id": "17",
        "description": "The best known blues musician today is B.B. King. His fame is well-deserved.\n Born in Indianola, Mississippi in 1925, he earned the nickname \"B.B.\" (\"Blues boy\")\n while playing on radio programs in Memphis, Tennessee.",
        "createdAt": "2020-02-21T07:32:15",
        "author": "Alexander T",
        "photoLink": "https://img.stereo.ru/article-covers/2018/cd94b715ef23dafa68adf62f2127b260.jpg",
        "hashTags": ["#king", "#enjoy", "#bluise"],
        "likes": ["Sean C", "Egor B", "Vlad K", "Sam W"]
    },
    {
        "id": "18",
        "description": "There is nothing in the world so irresistibly contagious as laughter and good humor.",
        "createdAt": "2020-02-21T10:14:00",
        "author": "Dickens",
        "hashTags": ["#reflections", "#thinkaboutit"],
        "likes": ["Lola", "Paula", "Egor B", "Dean W", "Sam W"]
    },
    {
        "id": "19",
        "description": "Kids, let\'s all get along!",
        "createdAt": "2020-02-22T15:34:10",
        "author": "Leopold",
        "hashTags": ["#friendly", "#cat", "#sweety"],
        "likes": ["Kinnoske", "Paula", "Egor B", "Dean W", "Sam W"]
    },
    {
        "id": "20",
        "description": "America’s music culture would be incomplete without\n blues music. Thought it was created in the early decades of the 20th century,\n blues music has had a huge influence on American popular music\n up to the present days. ",
        "createdAt": "2020-02-22T20:40:00",
        "author": "Alexander T",
        "hashTags": ["#music", "#america", "#bluise"],
        "likes": ["Lola Skin", "Paula", "Egor B", "Dean W", "Sam W"]
    }
];

class App {

    constructor() {
        this.tweetList = new TweetList(POSTS.map((p) => ({...p, createdAt: new Date(p.createdAt)})));
        this.currentUser = null;
        this.view = new View();
        this.viewPosts = null;
        this.filters = null;
        this.top = 10;
        this.currentPage = "posts";
        this.operation = null;
        this.confirm = document.querySelector(".button-delete-post-on-field");
        this.cancel = document.querySelector(".button-cancel");
        this.message = document.querySelector(".field-for-deleting");
        this.error = document.querySelector(".field-for-error");
        this.loadMore = null;
        this.closeButton = null;
        this.filtering = null;
        this.postForDeleting = null;
        this.confirm.addEventListener("click", () => {
            this.deletePost(this.postForDeleting);
            this.message.classList.remove("emergence");
        });
        this.cancel.addEventListener("click", () => this.message.classList.remove("emergence"));
    }

    login(user) {
        this.currentUser = user;
        this.setPage("posts");
    }

    setPage(page) {
        this.currentPage = page;
        this.renderPage();
    }

    setOperation(operation) {
        this.operation = operation;
    }

    setFilters(filters) {
        this.filters = filters;
        this.setPage("posts");
    }

    setTop() {
        this.top += 10;
        this.setPage("posts");
    }

    setButtonLoad(button) {
        this.loadMore = button;
        this.loadMore.addEventListener("click", () => {
            this.setTop();
            if (this.isFull()) {
                this.loadMore.classList.add("shadow");
            }
        });
    }

    setPostForDeleting(postId) {
        this.postForDeleting = postId;
        this.message.classList.add("emergence");
    }

    setErrorField() {
        this.error.classList.add("emergence");
        this.closeButton = document.querySelector(".button-return");
        this.closeButton.addEventListener("click", () => {
                this.error.classList.remove("emergence");
                this.setPage("posts")
            }
        );
    }

    isFull() {
        return this.top >= (this.tweetList._availableId - 1);
    }

    renderPage() {
        switch (this.currentPage) {
            case "posts": {
                this.renderPosts();
                break;
            }
            case "authorization": {
                this.renderAuthPage();
                break;
            }
            case "addEditPage": {
                this.renderAddEditPage();
                break;
            }
            case "filtering": {
                this.renderFilteringPosts();
                break;
            }
        }
    }

    renderPosts() {
        this.viewPosts = this.tweetList.getPosts(0, this.top, this.filters);
        if (this.viewPosts === "Incorrect data") {
            this.renderError(this.viewPosts);
        }
        this.view.renderPostsPage(this.viewPosts, this.currentUser, this.setPostForDeleting.bind(this),
            this.setOperation.bind(this), this.setPage.bind(this), this.login.bind(this), this.workWithLike.bind(this),
            this.setButtonLoad.bind(this));
        if(this.viewPosts.length===0){
            this.loadMore.classList.add("shadow");
        }
        this.filtering = document.querySelector(".filtering-button");
        this.filtering.addEventListener("click", () => this.setPage("filtering"));
    }

    renderAuthPage() {
        this.view.renderAuthorizationPage(this.setPage.bind(this), this.login.bind(this),this.renderError.bind(this));
    }

    renderAddEditPage() {
        if (this.operation === "add") {
            this.view.renderAddEditPage(this.currentUser, this.operation, {}, this.tweetList._availableId, this.addPost.bind(this));
        } else {
            this.view.renderAddEditPage(this.currentUser, this.operation, this.tweetList.getPost(this.operation), null, this.editPost.bind(this));
        }
    }

    renderFilteringPosts() {
        this.view.renderFilteringPosts(this.setFilters.bind(this));
    }

    renderError(textError) {
        this.view.renderError(textError, this.setErrorField.bind(this));
    }

    addPost(post) {
        if (this.tweetList.addPost(post)) {
            this.setPage("posts");
        }
    }

    deletePost(postID) {
        if (this.tweetList.removePost(postID)) {
            this.setPage("posts");
        }
    }

    editPost(postID, post) {
        if (this.tweetList.editPost(postID, post)) {
            this.setPage("posts");
        }
    }

    /*filteringPosts() {
        if (this.tweetList.getPosts(0, this.top, this.filters)) {
            this.setPage("posts");
        }
    }*/

    workWithLike(postId) {
        this.tweetList.workWithLike(postId, this.currentUser);
        this.setPage("posts");
    }

}