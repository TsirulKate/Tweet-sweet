package posts;

import JSONDecorator.JSONDecorator;

import java.util.List;

public class EditInfo {
    private String description;
    private String photoLink;
    private List<String> hashTags;
    private List<String> likes;

    public EditInfo() {
    }

    public EditInfo(String description, String photoLink, List<String> hashTags, List<String> likes) {
        this.description = description;
        this.hashTags = hashTags;
        this.likes = likes;
        this.photoLink = photoLink;
    }

    String getDescription() {
        return description;
    }

    String getPhotoLink() {
        return photoLink;
    }

    List<String> getHashTags() {
        return hashTags;
    }

    List<String> getLikes() {
        return likes;
    }

    boolean hasDescription() {
        return this.description != null;
    }

    boolean hasPhotoLink() {
        return this.photoLink != null;
    }

    boolean hasHashTags() {
        return this.hashTags != null;
    }

    boolean hasLikes() {
        return this.likes != null;
    }

    public static EditInfo fromJson(String json) {
        return JSONDecorator.getGson().fromJson(json, EditInfo.class);
    }
}
