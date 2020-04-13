package posts;

import servletsForPosts.WorkWithJSON;

import java.util.ArrayList;

public class EditInfo{
    private String description;
    private String photoLink;
    private ArrayList<String> hashTags;
    private ArrayList<String> likes;

    EditInfo(){
        description=photoLink=null;
        hashTags=likes=null;
    }

    EditInfo(String description,String photoLink,ArrayList<String> hashTags,ArrayList<String> likes){
        this.description=description;
        this.hashTags=hashTags;
        this.likes=likes;
        this.photoLink=photoLink;
    }

    String getDescription(){
        return description;
    }
    String getPhotoLink(){
        return photoLink;
    }
    ArrayList<String> getHashTags(){
        return hashTags;
    }

    ArrayList<String> getLikes(){
        return likes;
    }

    boolean hasDescription(){
        return this.description != null;
    }

    boolean hasPhotoLink(){
        return this.photoLink != null;
    }

    boolean hasHashTags(){
        return this.hashTags != null;
    }

    boolean hasLikes(){
        return this.likes != null;
    }

    public static EditInfo fromJson(String json) {
        return WorkWithJSON.getGson().fromJson(json, EditInfo.class);
    }
}
