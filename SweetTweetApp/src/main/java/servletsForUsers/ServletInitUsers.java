package servletsForUsers;

import JSONDecorator.JSONDecorator;
import org.apache.commons.io.IOUtils;
import users.User;
import users.UserCollection;

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

public class ServletInitUsers extends HttpServlet {
    @Override
    public void init() throws ServletException {
        ServletContext servletContext = getServletContext();
        InputStream inputStream = servletContext.getResourceAsStream("users.json");
        String source;
        JSONDecorator jsonD = new JSONDecorator();
        try {
            source = IOUtils.toString(inputStream, StandardCharsets.UTF_8);

            User[] masUsers = JSONDecorator.gson.fromJson(source, User[].class);
            for (User user : masUsers) {
                user.setPassword(UserCollection.getHash(user.getPassword()));
                UserCollection.addUser(user);
            }
            //pf.sortByDateDescending();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
            ServletException, IOException {
        try (OutputStreamWriter writer = new OutputStreamWriter(response.getOutputStream())) {
            writer.write("Array of users is initialized\n");
            //pf.sortByDateDescending();
            List<User> users = UserCollection.getAllUsers();
            for (User user : users) {
                writer.write(user.toString());
            }
        }
    }
}
