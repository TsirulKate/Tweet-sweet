package posts;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;

public class PostFiltering {
    private LocalDateTime dateAfter;
    private LocalDateTime dateBefore;
    private String author;
    private String[] hashTags;

    public PostFiltering(LocalDateTime dateAfter, LocalDateTime dateBefore, String author, String[] hashTags) {
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

    public boolean test(Post post) {
        if (this.dateAfter != null && !this.dateAfter.isBefore(post.getCreatedAt())) {
            return false;
        }
        if (this.dateBefore != null && !this.dateBefore.isAfter(post.getCreatedAt())) {
            return false;
        }
        if (this.author != null && !post.getAuthor().equals(this.author)) {
            return false;
        }
        if (this.hashTags != null && (post.getHashTags().isEmpty() || !post.getHashTags().containsAll(Arrays.asList(this.hashTags)))) {
            return false;
        }
        return true;
    }

}
