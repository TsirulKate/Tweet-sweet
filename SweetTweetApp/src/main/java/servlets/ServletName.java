package servlets;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Map;

public class ServletName extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        try (OutputStreamWriter writer = new OutputStreamWriter(resp.getOutputStream())){
            Map<String,String[]> parameters = req.getParameterMap();
            String name=parameters.getOrDefault("name", new String[]{"Kate"})[0];
            writer.write("Name is " + name);
        }
    }
}