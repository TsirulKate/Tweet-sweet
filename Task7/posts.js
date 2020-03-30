"use strict";

class TweetList{
    constructor(posts){
        this._posts = (posts || []);
        this._availableId=(posts.length+1 || 0);
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
        return posts.filter(function(post) {
            let temp = 0;
            for (let i = 0; i < hashTags.length; i++) {
                if (post.hashTags.indexOf(hashTags[i]) >= 0) {
                    temp++;
                }
            }
            return temp === hashTags.length;
        })
    }

    _filterByDate(posts,dates) {
        return posts.filter(function(post) {
            return post.createdAt >= new Date(dates[0]) && post.createdAt <= new Date(dates[1]);
        });
    }
    getPosts(skip = 0, top = 10, filterConfig) {
        if (!Number.isInteger(parseInt(skip, 10)) || !(skip >= 0) || !Number.isInteger(parseInt(top, 10)) || !(top > 0)) {
            return 'Incorrect data';
        }
        let searching=this._posts.slice(0,this._posts.length);
        TweetList.sortByDateDescending(searching);
        let searchingWasTryToFind=false;
        if (filterConfig === undefined) {
            searching=searching.slice(skip,skip+top);
            return searching;
        } else {
            if (filterConfig.hasOwnProperty('date_after') && filterConfig.hasOwnProperty('date_before')) {
                let dates=[filterConfig.date_after,filterConfig.date_before];
                searching = this._filterByDate(searching,dates);
                searchingWasTryToFind=true;
            }
            if (filterConfig.hasOwnProperty('author')) {
                searching = this._filterByAuthors(searching,filterConfig.author);
                searchingWasTryToFind=true;
            }
            if (filterConfig.hasOwnProperty('hashTags')) {
                searching = this._filterByHashTags(searching,filterConfig.hashTags);
                searchingWasTryToFind=true;
            }
            else if(!filterConfig.hasOwnProperty('date_after') && !filterConfig.hasOwnProperty('date_before')
                && !filterConfig.hasOwnProperty('author') && !filterConfig.hasOwnProperty('hashTags')) {
                return 'Incorrect data';
            }
            if(filterConfig.hasOwnProperty('date_after') && !filterConfig.hasOwnProperty('date_before') ||
                !filterConfig.hasOwnProperty('date_after') && filterConfig.hasOwnProperty('date_before')){
                return 'Incorrect data';
            }

        }
        if(searching.length === 0 || !searchingWasTryToFind){
            return 'NO SUCH ELEMENTS';
        }
        searching=searching.slice(skip,skip+top);
        return searching;
    }

    getPost(id) {
        if (Number.isInteger(parseInt(id, 10)) && id >= 0) {
            for (let i = 0; i < this._posts.length; i++) {
                if (parseInt(id, 10) === parseInt(this._posts[i].id, 10)) {
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
        } else if (toString.call(post.createdAt) !== "[object Date]") {
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
        if (!TweetList.validatePost(post))
            return false;
        this._posts.push(post);
        if(this.getPost(post.id) !== 'NO POST'){
            this._availableId++;
        }
        return this.getPost(post.id) !== 'NO POST';
    }

    editPost(id, post) {
        if (typeof post != 'object' || !Number.isInteger(parseInt(id, 10))) {
            return 'Incorrect data';
        }
        let postToEdit = this.getPost(parseInt(id, 10) - 1);
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

    removePost(id) {
        if (!Number.isInteger(parseInt(id, 10))) {
            return 'Incorrect data';
        }
        this._posts.splice(parseInt(id, 10) - 1, 1);
        return this.getPost(id) == 'NO POST';
    }

    addAll(posts){
        let noValidatePosts=[];
        for(let i=0;i<posts.length;i++){
            if(TweetList.validatePost(posts[i])){
                this.addPost(posts[i]);
            }
            else{
                noValidatePosts.push(posts[i]);
            }
        }
        return noValidatePosts;
    }

    clear(){
        this._availableId=0;
        this._posts = [];
    }

    getAvailableId(){
        return this._availableId;
    }
}

let posts = [
    {
        id: '1',
        description: 'Work definitely comes first. I expect the same of my ideal other half too.',
        createdAt: new Date('2020-02-14T17:18:02'),
        author: 'IU',
        hashTags: ['#work', '#ideal'],
        likes: ['Tolik', 'Paula', 'Egor B', 'Britney Spears', 'J Lo']
    },
    {
        id: '2',
        description: 'I haven\'t found anywhere in the world where I want to be all the time.' +
            ' The best of my life is the moving. I look forward to going.',
        createdAt: new Date('2020-02-14T21:56:21'),
        author: 'Sean C',
        hashTags: ['#moving', '#world', '#travelling'],
        likes: ['Lola', 'Paula', 'Egor B', 'Vlada', 'Masha U']
    },
    {
        id: '3',
        description: 'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.',
        createdAt: new Date('2020-02-15T16:56:23'),
        author: 'Marie Curie',
        hashTags: ['#fear', '#understand'],
        likes: ['Lolita', 'Pasha', 'Egor B', 'Meril', 'Leonardo ']
    },
    {
        id: '4',
        description: 'When time passes, the breakup that tore my heart apart\n' +
            'When time passes, the young memories that kicked away at the blankets\n' +
            'It gets forgotten, gets forgotten, it just passes right by\n' +
            'It gets forgotten, gets forgotten, but back then I thought that was everything',
        createdAt: new Date('2020-02-16T22:14:58'),
        author: 'IU',
        hashTags: ['#TimePasses', '#optimism', '#heartbreak'],
        likes: ['Lola Skin', 'Li Min Ho', 'Egor B', 'Vova K']
    },
    {
        id: '5',
        description: 'Blues is a music genre and musical form which was originated in the Deep South ' +
            'of the United States around the 1870s by African-Americans from roots in African musical traditions,' +
            ' African-American work songs, and spirituals. ',
        createdAt: new Date('2020-02-16T23:23:23'),
        author: 'Alexander T',
        hashTags: ['#music', '#blues', '#history'],
        likes: ['Sean C', 'Paula', 'Egor B']
    },
    {
        id: '6',
        description: 'I want to launch a new challenge. Who is with me?',
        createdAt: new Date('2020-02-17T08:14:12'),
        author: 'Grif Hero',
        hashTags: ['#challenge'],
        likes: ['Alexander T', 'Paula', 'Leopold', 'Dean W', 'Sam W']
    },
    {
        id: '7',
        description: 'Let\'s play a game?',
        createdAt: new Date('2020-02-17T12:37:29'),
        author: 'Leopold',
        hashTags: ['#game', '#cat', '#friends'],
        likes: ['Paula', 'Egor B', 'Dean W', 'Sam W']
    },
    {
        id: '8',
        description: 'Block out all the negative energy, and just love',
        createdAt: new Date('2020-02-17T15:36:48'),
        author: 'Ariana G',
        hashTags: ['#energy', '#love'],
        likes: ['Lola', 'Paula', 'Dean W', 'Marie Curie']
    },
    {
        id: '9',
        description: 'Everyone is beautiful, everyone is perfect, and everyone is lovely.',
        createdAt: new Date('2020-02-18T10:48:36'),
        author: 'Ariana G',
        hashTags: ['#love', '#my', '#folowwers'],
        likes: ['Lola Skin', 'Paula', 'Marie Curie', 'Egor B', 'Dean W', 'Sam W']
    },
    {
        id: '10',
        description: 'I\'ve got guests for dinner!',
        createdAt: new Date('2020-02-18T12:21:42'),
        author: 'Leopold',
        photoLink: 'https://avatars.mds.yandex.net/get-pdb/964102/52b4f656-7bc2-4aaa-8eb9-88ca255d1b35/s600',
        hashTags: ['#guests', '#mouse', '#dinner'],
        likes: ['Lola', 'Paula', 'Egor B', 'Sam W']
    },
    {
        id: '11',
        description: 'We are the heroes of our time!',
        createdAt: new Date('2020-02-18T23:23:45'),
        author: 'Grif Hero',
        hashTags: ['#heroes', '#infinite'],
        likes: ['Lola', 'Alexander T', 'Egor B', 'Dean W', 'Sam W']
    },
    {
        id: '12',
        description: 'I think I fell in love with Singapore.',
        createdAt: new Date('2020-02-19T13:35:23'),
        author: 'IU',
        hashTags: ['#singapore', '#travelling'],
        likes: ['Lola Skin', 'Paula', 'Marie Curie', 'Egor B', 'Vlad F', 'Sam W']
    },
    {
        id: '13',
        description: 'Meditation is a great way to keep my body well-centered while juggling shooting schedules and recording sessions.',
        createdAt: new Date('2020-02-19T15:19:35'),
        author: 'Ariana G',
        hashTags: ['#meditation', '#join', '#health'],
        likes: ['Lola', 'Paula', 'Egor B', 'Marie Curie', 'Dean W', 'IU']
    },
    {
        id: '14',
        description: 'I cooked dinner from jars of food t hat I opened myself.',
        createdAt: new Date('2020-02-20T16:33:16'),
        author: 'Leopold',
        hashTags: ['#dinner', '#power'],
        likes: ['Lola', 'Alexander T', 'Dean W', 'Sam W']
    },
    {
        id: '15',
        description: 'I just think the most difficult thing to displace is privilege.',
        createdAt: new Date('2020-02-20T18:23:44'),
        author: 'Sean C',
        hashTags: ['#reflections'],
        likes: ['Lola', 'Paula', 'Egor B', 'Dean W', 'Sam W']
    }
];

let tweetList = new TweetList(posts);
console.log(tweetList.getPosts());
console.log(tweetList.getPosts(5,4));
console.log(tweetList.getPosts(0,5,{date_after:'2020-02-13T00:00:00', date_before:'2020-02-20T00:00:00'}));
console.log(tweetList.getPosts(0,5,{date_after:'2020-02-13T00:00:00', date_before:'2020-02-20T00:00:00', author:'Alexander T'}));
console.log(tweetList.getPosts(0,15,{date_after:'2020-02-13T00:00:00', date_before:'2020-02-20T00:00:00', author:'Alexander T', hashTags:['#music']}));
console.log(tweetList.getPosts(0,5,{date_after:'2020-02-13T00:00:00', date_before:'2020-02-20T00:00:00', hashTags:['#ideal']}));
console.log(tweetList.getPosts(0, 10, {author: 'IU', hashTags: ['#love']}));
console.log(tweetList.getPosts(0, 10, {author: 'IU'}));
console.log(tweetList.getPosts(0, 10, {hashTags: ['#love']}));

console.log(tweetList.getPosts(0,5,{ date_after:'2020-02-13T00:00:00'}));
console.log(tweetList.getPosts(0,20,{kwbke:'kejb'}));

console.log(tweetList.getPost('3'));

console.log('The posts[10] is validate: ' + TweetList.validatePost(posts[10]));
console.log('The posts is validate(should be false): ' + TweetList.validatePost({
    id: 1,
    description: 'Hello',
    createdAt: new Date('2020-03-21T09:34:15'),
    author: 'Alexander T',
    photoLink: 'https://img.stereo.ru/article-covers/2018/cd94b715ef23dafa68adf62f2127b260.jpg'
}));

console.log('The post with 17 id was remove: ' + tweetList.removePost('17'));

console.log('The post with 3 id was edit: ' + tweetList.editPost('3', {
    description: 'ljnla',
    hashTags: ['#ljds', '#sldsnl']
}));
console.log('The post with 5 id was edit(should be false): ' + tweetList.editPost('5', {
    hashTags: '#lol'
}));

console.log('The new post was added: ' + tweetList.addPost({
    id: tweetList.getAvailableId(),
    description: 'The best known blues musician today is B.B. King. His fame is well-deserved.\n' +
        '                Born in Indianola, Mississippi in 1925, he earned the nickname "B.B." ("Blues boy")\n' +
        '                while playing on radio programs in Memphis, Tennessee.',
    createdAt: new Date('2020-03-21T09:34:15'),
    author: 'Alexander T',
    photoLink: 'https://img.stereo.ru/article-covers/2018/cd94b715ef23dafa68adf62f2127b260.jpg',
    hashTags: ['#king', '#enjoy', '#bluise'],
    likes: []
}));
console.log('The new post was added(should be false): ' + tweetList.addPost({
    id: tweetList.getAvailableId(),
    description: 'The best known blues musician today is B.B. King. His fame is well-deserved.\n' +
        '                Born in Indianola, Mississippi in 1925, he earned the nickname "B.B." ("Blues boy")\n' +
        '                while playing on radio programs in Memphis, Tennessee.',
    createdAt: new Date('2020-03-21T09:34:15')
}));

let posts1 = [{
    id: '16',
    description: 'When I was young, even though I received so much love,\n' +
        '                I used to pay attention to people who disliked me. That\'s why my lyrics were so sharp and dark.',
    createdAt: new Date('2020-02-20T23:48:05'),
    author: 'IU',
    hashTags: ['#love', '#lyrics'],
    likes: ['Lola Skin', 'Paula', 'Egor B', 'Marie Curie', 'Dean W', 'Sam W']
},
    {
        id: '17',
        description: 'The best known blues musician today is B.B. King. His fame is well-deserved.\n' +
            '                Born in Indianola, Mississippi in 1925, he earned the nickname "B.B." ("Blues boy")\n' +
            '                while playing on radio programs in Memphis, Tennessee.',
        createdAt: new Date('2020-02-21T07:32:15'),
        author: 'Alexander T',
        photoLink: 'https://img.stereo.ru/article-covers/2018/cd94b715ef23dafa68adf62f2127b260.jpg',
        hashTags: ['#king', '#enjoy', '#bluise'],
        likes: ['Sean C', 'Egor B', 'Vlad K', 'Sam W']
    },
    {
        id: '18',
        description: 'There is nothing in the world so irresistibly contagious as laughter and good humor.',
        createdAt: new Date('2020-02-21T10:14:00'),
        author: 'Dickens',
        hashTags: ['#reflections', '#thinkaboutit'],
        likes: ['Lola', 'Paula', 'Egor B', 'Dean W', 'Sam W']
    },
    {
        id: '19',
        description: 'Kids, let\'s all get along!',
        createdAt: new Date('2020-02-22T15:34:10'),
        author: 'Leopold',
        hashTags: ['#friendly', '#cat', '#sweety'],
        likes: ['Kinnoske', 'Paula', 'Egor B', 'Dean W', 'Sam W']
    },
    {
        id: '20',
        description: 'America’s music culture would be incomplete without\n' +
            '                blues music. Thought it was created in the early decades of the 20th century,\n' +
            '                blues music has had a huge influence on American popular music\n' +
            '                up to the present days. ',
        createdAt: new Date('2020-02-22T20:40:00'),
        author: 'Alexander T',
        hashTags: ['#music', '#america', '#bluise'],
        likes: ['Lola Skin', 'Paula', 'Egor B', 'Dean W', 'Sam W']
    }];
console.log('Posts from the posts1 that are not validate:' );
console.log(tweetList.addAll(posts1));
tweetList.clear();
console.log(tweetList.getPost('0'));