package servletsForPosts;

import org.apache.commons.io.IOUtils;
import posts.Post;
import posts.PostCollection;
import posts.EditInfo;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class ServletPosts extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");
        PostCollection postCollection = new PostCollection();
        if (PostCollection.hasPost(id)) {
            Optional<Post> post = PostCollection.getPost(id);
            response.setContentType("application/json");
            response.getWriter().print(post.get().toJson());
        } else {
            sendError(404, "Post not found", response);
        }
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");
        PostCollection postCollection = new PostCollection();
        if (PostCollection.removePost(id)) {
            sendMessage(200, "Post was removed", response);
        } else {
            sendError(400, "Post can\'t be removed", response);
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Post post = Post.fromJson(IOUtils.toString(request.getReader()));

        PostCollection postCollection = new PostCollection();
        post.setId(PostCollection.getAvailableId());

        if (!PostCollection.hasPost(post.getId())) {
            if (PostCollection.addPost(post)) {
                sendMessage(200, "Post was added", response);
            } else {
                System.out.println(">>> INVALIDATE POST");
                sendError(400, "Invalidate post", response);
            }
        } else {
            System.out.println(">>> post is exist");
            sendError(400, "Post is exist", response);
        }
    }

    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");
        PostCollection postCollection = new PostCollection();
        EditInfo editInfo = EditInfo.fromJson(IOUtils.toString(request.getReader()));
        if (editInfo == null) {
            System.out.println(">>> EditInfo is null" + request.getParameter("info"));
            sendError(400, "Invalidate post", response);
            return;
        }

        if (PostCollection.hasPost(id)) {
            if (PostCollection.editPost(id, editInfo)) {
                sendMessage(200, "Post was edited", response);
            } else {
                sendError(400, "Invalidate post", response);
            }
        } else {
            sendError(404, "Post not found", response);
        }
    }

    private void sendError(int status, String msg, HttpServletResponse resp) throws IOException {
        JsonObject json = new JsonObject();
        json.addProperty("status", status);
        json.addProperty("error", msg);

        resp.sendError(status, new Gson().toJson(json));
    }

    private void sendMessage(int status, String msg, HttpServletResponse resp) throws IOException {
        JsonObject json = new JsonObject();
        json.addProperty("status", status);
        json.addProperty("error", msg);

        resp.getWriter().print(new Gson().toJson(json));
    }
}
