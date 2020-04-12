package posts;

import java.util.Date;

public class PostFiltering {
    private Date dateAfter;
    private Date dateBefore;
    private String author;
    private String[] hashTags;

    public PostFiltering(Date dateAfter, Date dateBefore, String author, String[] hashTags) {
        this.dateAfter = dateAfter;
        this.dateBefore = dateBefore;
        this.author = author;
        this.hashTags = hashTags;
    }

    public PostFiltering(PostFiltering post) { //need or not?
        this.dateAfter = post.dateAfter;
        this.dateBefore = post.dateBefore;
        this.author = post.author;
        this.hashTags = post.hashTags;
    }

    public boolean filtering(Post post){
        if(this.dateAfter!=null && !post.getCreatedAt().after(this.dateAfter)){
            return false;
        }
        if (this.dateBefore != null && !post.getCreatedAt().before(this.dateBefore)) {
            return false;
        }
        if(this.author!=null && !post.getAuthor().equals(this.author)){
            return false;
        }
        if(this.hashTags != null && )
        return true;
    }

}
