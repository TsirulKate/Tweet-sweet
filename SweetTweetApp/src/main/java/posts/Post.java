package posts;

import com.google.gson.GsonBuilder;
import servletsForPosts.WorkWithJSON;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;

public final class Post {
    private String id;
    private String description;
    private LocalDateTime createdAt;
    private String author;
    private String photoLink;
    private ArrayList<String> hashTags;
    private ArrayList<String> likes;

    public Post(String id, String description, LocalDateTime createdAt, String author, String photoLink, ArrayList<String> hashTags, ArrayList<String> likes) {
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

    public LocalDateTime getCreatedAt() {
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

    public ArrayList<String> getHashTags() {
        return hashTags;
    }

    public void setHashTags(ArrayList<String> hashTags) {
        this.hashTags = hashTags;
    }

    public ArrayList<String> getLikes() {
        return likes;
    }

    public void setLikes(ArrayList<String> likes) {
        this.likes = likes;
    }

    public String toJson() {
        return WorkWithJSON.getGson().toJson(this);
    }

    public static Post fromJson(String json) {
        return WorkWithJSON.getGson().fromJson(json, Post.class);
    }

    @Override
    public String toString(){
        return new String("id: "+this.getId()+'\n' + "author: "+this.getAuthor()+'\n'
        + "createdAt: "+this.getCreatedAt()+'\n' + "description: "+this.getDescription()+'\n'
                + "HashTags: "+this.getHashTags()+'\n' + "likes: "+this.getLikes()+"\n\n");
    }


}
