package posts;

import java.util.Comparator;

public class ComparatorForPosts implements Comparator<Post> {
    @Override
    public int compare(Post post1, Post post2) {
        return post2.getCreatedAt().compareTo(post1.getCreatedAt());
    }
}
