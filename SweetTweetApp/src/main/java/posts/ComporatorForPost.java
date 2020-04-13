package posts;

import java.util.Comparator;

public class ComporatorForPost implements Comparator<Post> {
    @Override
    public int compare(Post post1,Post post2) {
        if(post2.getCreatedAt().isAfter(post1.getCreatedAt())){
            return -1;
        }
        else if(post2.getCreatedAt().isBefore(post1.getCreatedAt())){
            return 1;
        }
        else{
            return 0;
        }
    }
}
