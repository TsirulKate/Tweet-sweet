class TweetList{
    constructor(posts){
        this._posts = (posts || []);
        this._availableId=(this._posts.length+1 || 0);
    }

    static sortByDateDescending(posts) {
        posts.sort((p1,p2) => p2.createdAt-p1.createdAt);
    }

    static sortByDateAscending(posts) {
        posts.sort((p1,p2) => p1.createdAt-p2.createdAt);
    }

    _filterByAuthors(posts,author) {
        return posts.filter(function(post) {
            return post.author===author;
        })
    }
    _filterByHashTags(posts,hashTags) {
        return posts.filter(post => hashTags.every(tag => post.hashTags.includes(tag)));
    }

    _filterByDates(posts,dates) {
        return posts.filter(function(post) {
            return post.createdAt >= new Date(dates[0]) && post.createdAt <= new Date(dates[1]);
        });
    }

    _filterByDate(posts,date) {
        return posts.filter(function(post) {
            return post.createdAt === date;
        });
    }

    getPosts(skip = 0, top = 10, filterConfig) {
        if (!Number.isInteger(parseInt(skip, 10)) || skip < 0 || !Number.isInteger(parseInt(top, 10)) || top <= 0) {
            console.warn("INCORRECT DATA");
            return [];
        }

        let searching=this._posts.slice(0,this._posts.length);
        TweetList.sortByDateDescending(searching);
        let searchingWasTryToFind=false;

        if (!filterConfig) {
            searching=searching.slice(skip,skip+top);
            return searching;
        } else {
            if (filterConfig.hasOwnProperty('date_after') && filterConfig.hasOwnProperty('date_before')
                && filterConfig.date_after && filterConfig.date_before) {
                let dates=[filterConfig.date_after,filterConfig.date_before];
                searching = this._filterByDates(searching,dates);
                searchingWasTryToFind=true;
            }

            if(filterConfig.hasOwnProperty('date') && filterConfig.date){
                searching=this._filterByDate(searching,filterConfig.date);
                searchingWasTryToFind=true;
            }

            if (filterConfig.hasOwnProperty('author') && filterConfig.author) {
                searching = this._filterByAuthors(searching,filterConfig.author);
                searchingWasTryToFind=true;
            }

            if (filterConfig.hasOwnProperty('hashTags') && filterConfig.hashTags) {
                searching = this._filterByHashTags(searching,filterConfig.hashTags);
                searchingWasTryToFind=true;
            }

            else if(!filterConfig.hasOwnProperty('date_after') && !filterConfig.hasOwnProperty('date_before')
                && !filterConfig.hasOwnProperty('author') && !filterConfig.hasOwnProperty('hashTags')) {
                console.warn("INCORRECT DATA");
                return [];
            }

            if(filterConfig.hasOwnProperty('date_after') && !filterConfig.hasOwnProperty('date_before') ||
                !filterConfig.hasOwnProperty('date_after') && filterConfig.hasOwnProperty('date_before')){
                console.warn("INCORRECT DATA");
                return [];
            }
        }

        if(searching.length === 0 || !searchingWasTryToFind){
            return [];
        }

        searching=searching.slice(skip,skip+top);
        return searching;
    }

    getPost(postID) {
        if (Number.isInteger(parseInt(postID, 10)) && postID >= 0) {
            for (let i = 0; i < this._posts.length; i++) {
                if (parseInt(postID, 10) === parseInt(this._posts[i].id, 10)) {
                    return this._posts[i];
                }
            }
            return new Object('NO POST');
        } else {
            return 'Incorrect data';
        }
    }

    static validatePost(post) {
        if (typeof post != 'object') {
            return 'Incorrect data';
        } else if (typeof post.description != "string") {
            return false;
        } else if (typeof post.author != "string") {
            return false;
        } else if (toString.call(post.hashTags) !== "[object Array]") {
            return false;
        } else return toString.call(post.likes) === "[object Array]";
    }

    addPost(post) {
        if (typeof post != 'object') {
            return 'Incorrect data';
        }

        if (!TweetList.validatePost(post)) {
            return false;
        }

        this._posts.push(post);

        if(this.getPost(post.id) !== 'NO POST'){
            this._availableId++;
        }

        return this.getPost(post.id) !== 'NO POST';
    }

    editPost(postID, post) {
        if (typeof post != 'object' || !Number.isInteger(parseInt(postID, 10))) {
            return 'Incorrect data';
        }

        let postToEdit = this.getPost(parseInt(postID, 10));

        if (post.hasOwnProperty('description')) {
            postToEdit.description = post.description;
        }

        if (post.hasOwnProperty('hashTags')) {
            postToEdit.hashTags = post.hashTags;
        }

        if (post.hasOwnProperty('photoLink')) {
            postToEdit.photoLink = post.photoLink;
        }

        return TweetList.validatePost(postToEdit);
    }

    removePost(postID) {
        if (!Number.isInteger(parseInt(postID, 10))) {
            return 'Incorrect data';
        }

        this._posts.splice(parseInt(postID, 10) - 1, 1);
        return this.getPost(postID) == 'NO POST';
    }

    addAll(posts){
        let noValidatePosts=[];

        const reducer = (accumulator, currentValue) => {
            if(TweetList.validatePost(currentValue)){
                this.addPost(currentValue);
            }
            else{
                accumulator.push(currentValue);
            }
            return accumulator;
        };
        noValidatePosts = posts.reduce(reducer,[]);
        return noValidatePosts;
    }

    addLike(postID,user_name){

        if (!Number.isInteger(parseInt(postID, 10))) {
            return false;
        }

        const post = this.getPost(postID);

        if (!post) {
            return false;
        }

        if (TweetList.validatePost(post) && post.likes.includes(user_name)) {
            return false;
        }

        const indexOfPost=this._posts.indexOf(post);
        const likes = (post.likes || []).concat([user_name]);

        this._posts[indexOfPost].likes=likes;
        return true;
    }

    removeLike(postID,user){
        if (!Number.isInteger(parseInt(postID, 10))) {
            return false;
        }

        const post = this.getPost(postID);

        if (!post) {
            return false;
        }

        if (TweetList.validatePost(post) && !post.likes.includes(user)) {
            return false;
        }

        const indexOfLike = post.likes.indexOf(user);
        post.likes.splice(indexOfLike,1);

        return true;
    }

    workWithLike(postId,user){
        if(this.getPost(postId).likes!=null && this.getPost(postId).likes.includes(user)){
            this.removeLike(postId,user);
        }
        else{
            this.addLike(postId,user);
        }
    }

    clear(){
        this._availableId=0;
        this._posts = [];
    }

    getAvailableId(){
        return this._availableId;
    }
}


