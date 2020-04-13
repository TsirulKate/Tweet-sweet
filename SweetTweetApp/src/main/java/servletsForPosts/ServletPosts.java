package servletsForPosts;

import posts.Post;
import posts.PostsFunctions;
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
            PostsFunctions pf=new PostsFunctions();
            if(pf.hasPost(id)){
                Optional<Post> post=pf.getPost(id);
                response.setContentType("application/json");
                response.getWriter().print(post.get().toJson());
            }
            else{
                sendError(404, "Post not found", response);
            }
    }
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");
        PostsFunctions pf=new PostsFunctions();
        if(pf.removePost(id)){
            sendMessage(200,"Post was removed",response);
        }
        else{
            sendError(400, "Post can\'t be removed", response);
        }
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Post post=Post.fromJson(request.getParameter("info"));
        PostsFunctions pf=new PostsFunctions();

        if(post==null){
            sendError(400,"Invalidate post",response);
            return;
        }

        if(pf.hasPost(post.getId())){
            if(pf.addPost(post)){
                sendMessage(200,"Post was added",response);
            }
            else{
                sendError(400,"Invalidate post",response);
            }
        }
        else{
            sendError(400,"Post is exist",response);
        }
    }
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");
        PostsFunctions pf=new PostsFunctions();
        EditInfo editInfo=EditInfo.fromJson(request.getParameter("info"));
        if(editInfo==null){
            System.out.println(">>> EditInfo is null" + request.getParameter("info"));
            sendError(400,"Invalidate post",response);
            return;
        }

        if(pf.hasPost(id)){
            if(pf.editPost(id,editInfo)){
                sendMessage(200,"Post was edited",response);
            }
            else{
                sendError(400,"Invalidate post",response);
            }
        }
        else{
            sendError(404,"Post not found",response);
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
