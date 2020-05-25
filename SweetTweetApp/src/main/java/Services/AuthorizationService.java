package Services;

import posts.Post;
import posts.PostCollection;
import users.User;
import users.UserCollection;

import java.util.NoSuchElementException;
import java.util.Optional;

public class AuthorizationService {
    public boolean isPostAvailable(String postID, String userID) {
        try {
            UserCollection users = new UserCollection();
            Optional<User> user = UserCollection.getUserByID(userID);
            PostCollection posts = new PostCollection();
            Optional<Post> post = posts.getPost(postID);
            return user.get().getUsername().equals(post.get().getAuthor());
        } catch (NoSuchElementException nsee) {
            return false;
        }
    }

    public boolean isUserAvailable(String username, String userID) {
        UserCollection users = new UserCollection();
        Optional<User> user = UserCollection.getUserByID(userID);
        return username.equals(user.get().getUsername());
    }
}
