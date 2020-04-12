package posts;

import java.util.HashMap;
import java.util.List;

public class postsFunctions {

    protected HashMap<String, Post> posts = new HashMap<>();

    public List<Post> getPosts(Integer skip, Integer top, PostFiltering filters) {
        if (skip == null) {
            skip = 0;
        }

        if (top == null) {
            top = 10;
        }

        if (filters == null) {
            return posts.values().stream()
                    .skip(skip)
                    .limit(top)
                    .collect(Collectors.toList());
        }

        return posts.values().stream()
                .filter(filter::match)
                .skip(skip)
                .limit(top)
                .collect(Collectors.toList());
    }

}
