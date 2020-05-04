package servletsForPosts;

import com.google.gson.Gson;
import posts.Post;
import posts.PostCollection;
import posts.PostFiltering;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class ServletTweetList extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws NumberFormatException, IOException {
        String temp = request.getParameter("skip");
        Integer skip = temp != null ? Integer.parseInt(temp) : null;
        temp = request.getParameter("top");
        Integer top = temp != null ? Integer.parseInt(temp) : null;

        String author = request.getParameter("author");
        String[] hashTags = request.getParameterValues("hashTags");
        temp = request.getParameter("dateAfter");
        LocalDateTime dateAfter = null;
        LocalDateTime dateBefore = null;
        if (temp != null) {
            dateAfter = LocalDateTime.from(DateTimeFormatter.ISO_LOCAL_DATE_TIME.parse(temp));
        }
        temp = request.getParameter("dateBefore");
        if (temp != null) {
            dateBefore = LocalDateTime.from(DateTimeFormatter.ISO_LOCAL_DATE_TIME.parse(temp));
        }

        PostFiltering postFilter = new PostFiltering(dateAfter, dateBefore, author, hashTags);
        List<Post> posts = PostCollection.getPosts(skip, top, postFilter);

        response.setContentType("application/json");
        response.getWriter().print(new Gson().toJson(posts));

    }
}
