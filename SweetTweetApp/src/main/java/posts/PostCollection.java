package posts;

import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class PostCollection {

    private static HashMap<String, Post> posts = new HashMap<>();

    public PostCollection() {
    }

    public static List<Post> getAllPosts() {
        return new ArrayList<>(posts.values());
    }

    public static boolean hasPost(String postId) {
        return posts.containsKey(postId);
    }

    public static List<Post> getPosts(Integer skip, Integer top, PostFiltering filters) {
        if (skip == null) {
            skip = 0;
        }

        if (top == null) {
            top = 10;
        }

        sortByDateDescending();

        Collection<Post> collectionPosts = posts.values();

        if (filters == null) {
            return collectionPosts.stream().skip(skip).limit(top).collect(Collectors.toList());
        }

        return collectionPosts.stream().filter(filters::test).skip(skip).limit(top).collect(Collectors.toList());
    }

    public static Optional<Post> getPost(String postId) {
        if (Integer.parseInt(postId) > 0) {
            return posts.values().stream().filter(i -> i.getId().equals(postId)).findFirst();
        } else {
            return Optional.empty();
        }
    }

    private static boolean validatePost(Post post) {
        try {
            return Stream.of(post.getCreatedAt(), post.getAuthor(), post.getDescription(), post.getHashTags(), post.getLikes())
                    .allMatch(Objects::nonNull)
                    && Integer.parseInt(post.getId()) >= 0;
        } catch (NumberFormatException nfe) {
            return false;
        }
    }

    public static boolean addPost(Post post) {
        if (!PostCollection.validatePost(post)) {
            return false;
        } else if (hasPost(post.getId())) {
            return false;
        } else {
            posts.put(post.getId(), post);
            return true;
        }
    }

    public static boolean editPost(String postId, EditInfo editInformation) {
        if (!hasPost(postId)) {
            return false;
        }
        Post post = posts.get(postId);
        if(editInformation.hasDescription()){
            post.setDescription(editInformation.getDescription());
        }
        if(editInformation.hasPhotoLink()){
            post.setPhotoLink(editInformation.getPhotoLink());
        }
        if(editInformation.hasLikes()){
            post.setLikes(editInformation.getLikes());
        }
        if(editInformation.hasHashTags()){
            post.setHashTags(editInformation.getHashTags());
        }
        posts.put(postId,post);
        return true;
    }

    public static boolean removePost(String postId) {
        if (hasPost(postId)) {
            posts.remove(postId);
            return true;
        } else {
            return false;
        }
    }

    public static void sortByDateDescending() {
        posts.entrySet().stream().sorted(Map.Entry.comparingByValue(new ComparatorForPosts()));
    }
}
