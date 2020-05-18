package servletsForPosts;

import org.apache.commons.io.IOUtils;
import posts.Post;
import posts.PostCollection;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class ServletInitPosts extends HttpServlet {

    @Override
    public void init() throws ServletException {
        ServletContext servletContext = getServletContext();
        InputStream inputStream = servletContext.getResourceAsStream("posts.json");
        String src;
        try {
            src = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
            Post[] masPosts = JSONDecorator.gson.fromJson(src, Post[].class);
            for (Post post : masPosts) {
                PostCollection.addPost(post);
            }
            //pf.sortByDateDescending();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try (OutputStreamWriter writer = new OutputStreamWriter(response.getOutputStream())) {
            writer.write("Array of posts is initialized\n");
            //pf.sortByDateDescending();
            List<Post> posts = PostCollection.getPosts(0, 20, null);
            for (Post post : posts) {
                writer.write(post.toString());
            }
        }
    }
}
