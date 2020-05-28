package servletsForUsers;

import org.apache.commons.io.IOUtils;
import users.User;
import users.UserCollection;
import users.UserPatch;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Optional;

public class ServletUsers extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        UserPatch userPatch = UserPatch.fromJson(IOUtils.toString(request.getReader()));
        UserCollection postCollection = new UserCollection();
        String passwordMaybe = userPatch.getPassword();
        String passwordReal = UserCollection.hasUser(userPatch.getUsername());
        response.setContentType("application/json");
        if (passwordReal != null) {
            if (UserCollection.isHashEqual(passwordMaybe, passwordReal)) {
                Optional<User> user = UserCollection.getUserByName(userPatch.getUsername());
                HttpSession session = request.getSession();
                session.setAttribute("userId", user.get().getUserID());
                response.getWriter().print(user.get().toJson());
            } else {
                response.getWriter().print("{\"message\" : \"Wrong password\"}");
                response.setStatus(401);
            }
        } else {
            response.getWriter().print("{\"message\":\"No such user\"}");
            response.setStatus(404);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse responce) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if (session == null) {
            responce.getWriter().print("{\"message\":\"null\"}");
            responce.setStatus(400);
        }
        else {
            String userId = (String) session.getAttribute("userId");
            if (userId == null) {
                responce.getWriter().print("{\"message\":\"null\"}");
                responce.setStatus(400);
            }

            Optional<User> user = UserCollection.getUserByID(userId);
            responce.getWriter().print(user.get().toJson());
        }
    }
}
