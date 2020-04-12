package posts;

import java.util.Date;

public final class Post {
    private String id;
    private String description;
    private Date createdAt;
    private String author;
    private String photoLink;
    private String[] hashTags;
    private String[] likes;

    public Post(String id, String description, Date createdAt, String author, String photoLink, String[] hashTags, String[] likes) {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.author = author;
        this.photoLink = photoLink;
        this.hashTags = hashTags;
        this.likes = likes;
    }

    public Post(Post post) { //need or not?
        this.id = post.id;
        this.description = post.description;
        this.createdAt = post.createdAt;
        this.author = post.author;
        this.photoLink = post.photoLink;
        this.hashTags = post.hashTags;
        this.likes = post.likes;
    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public String[] getHashTags() {
        return hashTags;
    }

    public void setTags(String[] hashTags) {
        this.hashTags = hashTags;
    }

    public String[] getLikes() {
        return likes;
    }

    public void setLikes(String[] likes) {
        this.likes = likes;
    }
}
