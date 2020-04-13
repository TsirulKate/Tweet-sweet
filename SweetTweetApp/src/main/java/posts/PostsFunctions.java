package posts;

import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

public class PostsFunctions {

    private static HashMap<String, Post> posts = new HashMap<>();

    public PostsFunctions(){ }

    public List<Post> getAllPosts(){
        return new ArrayList<>(posts.values());
    }

    public boolean hasPost(String postId){
        return posts.containsKey(postId);
    }

    public List<Post> getPosts(Integer skip, Integer top, PostFiltering filters) {
        if (skip == null) {
            skip = 0;
        }

        if (top == null) {
            top = 10;
        }

        sortByDateDescending();

        Collection<Post> collectionPosts=posts.values();

        if (filters == null) {
            return collectionPosts.stream().skip(skip).limit(top).collect(Collectors.toList());
        }

        return collectionPosts.stream().filter(filters::filtering).skip(skip).limit(top).collect(Collectors.toList());
    }

    public Optional<Post> getPost(String postId){
        if(Integer.parseInt(postId)>0){
            return posts.values().stream().filter(i -> i.getId().equals(postId)).findFirst();
        }
        else{
            return null;
        }
    }

    public static boolean validatePost(Post post){
        try {
            if(Integer.parseInt(post.getId())<0){
                return false;
            }
            if(post.getCreatedAt()==null){
                return false;
            }
            if(post.getAuthor()==null){
                return false;
            }
            if(post.getDescription()==null){
                return false;
            }
            if(post.getHashTags()==null){
                return false;
            }
            return post.getLikes()!=null;
        }
        catch (NumberFormatException nfe){
            return false;
        }
    }

    public boolean addPost(Post post){
        if(!PostsFunctions.validatePost(post)){
            return false;
        }
        else if(hasPost(post.getId())){
            return false;
        }
        else{
            posts.put(post.getId(),post);
            return true;
        }
    }

    public boolean editPost(String postId,EditInfo editInformation){
        if(!hasPost(postId)){
            return false;
        }
        Post post=posts.get(postId);
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
        if(PostsFunctions.validatePost(post)){
            posts.put(postId,post);
            return true;
        }
        else{
            return false;
        }
    }

    public boolean removePost(String postId){
        if(hasPost(postId)){
            posts.remove(postId);
            return true;
        }
        else{
            return false;
        }
    }

    public void sortByDateDescending() {
        posts.entrySet().stream().sorted(Map.Entry.comparingByValue(new ComporatorForPost()));
    }
}
