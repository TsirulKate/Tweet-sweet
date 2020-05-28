class PostsService {

    async init() {
        await fetch("/initPosts");
    }

    async getPosts(skip = 0, top = 10, filterConfig) {
        let filters = "";
        if (filterConfig) {
            if (filterConfig.author) {
                filters = filters + `&author=` + encodeURIComponent(filterConfig.author);
            }
            if (filterConfig.hashTags) {
                //filters=filters+filterConfig.hashTags.forEach((ht)=>"hashTags={")
                filterConfig.hashTags.forEach((tag) => {
                    filters = filters + `&hashTags=` + encodeURIComponent(tag);
                })
            }
            if (filterConfig.date_before && filterConfig.date_after) {
                filters = filters + `&dateBefore=` + encodeURIComponent(moment(filterConfig.date_before).format("YYYY-MM-DDTHH:mm:ss")) + `&dateAfter=`
                    + encodeURIComponent(moment(filterConfig.date_after).format("YYYY-MM-DDTHH:mm:ss"));
            }
        }
        let response = await fetch(`/tweets/search?skip=${0}&top=${top}${filters}`);
        // return responce.json().map((p) => ({...p, createdAt: new Date(p.createdAt)}));
        let json = await response.json();
        return json.map((p) => ({
            ...p, createdAt: new Date(
                p.createdAt.date.year, p.createdAt.date.month, p.createdAt.date.day,
                p.createdAt.time.hour, p.createdAt.time.minute, p.createdAt.time.second)
        }));
    }

    async getPost(postID) {
        let response = await fetch(`/tweets?id=${postID}`, {
            method: "get"
        });
        let json = await response.json();
        return json;
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

    async addPost(post) {
        let response = await fetch(`/tweets`, {
            method: "post",
            body: JSON.stringify({...post, createdAt: moment(post.createdAt).format("YYYY-MM-DDTHH:mm:ss")})
        });
        let json = await response.json();
        return json;
    }

    async editPost(postID, post) {
        let response = await fetch(`/tweets?id=${postID}`, {
            method: "put",
            body: JSON.stringify(post)
        });
        let json = await response.json();
        return json;
    }

    async removePost(postID) {
        let response = await fetch(`/tweets?id=${postID}`, {
            method: "delete"
        });
        let json = await response.json();
        return json;
    }
}


