package servletsForPosts;

import com.google.gson.Gson;
import org.apache.commons.io.IOUtils;
import posts.Post;
import posts.PostsFunctions;

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
        InputStream inputStream=servletContext.getResourceAsStream("posts.json");
        WorkWithJSON workWithJSON=new WorkWithJSON();
        String src;
        try {
            src = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
            Post[] masPosts = WorkWithJSON.gson.fromJson(src, Post[].class);
            PostsFunctions pf=new PostsFunctions();
            for (Post post : masPosts) {
                pf.addPost(post);
            }
            pf.sortByDateDescending();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try (OutputStreamWriter writer = new OutputStreamWriter(response.getOutputStream())){
            PostsFunctions pf=new PostsFunctions();
            writer.write("Massive of posts is initialized\n");
            pf.sortByDateDescending();
            List<Post> posts = pf.getPosts(0,20,null);
            for (Post post : posts) {
                writer.write(post.toString());
            }
        }
    }
}
