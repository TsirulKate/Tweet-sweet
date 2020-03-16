import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.OutputStreamWriter;

public class FilterTime implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        long start = System.nanoTime();
        filterChain.doFilter(servletRequest, servletResponse);
        long end = System.nanoTime();
        long time = Math.round(end - start);
        HttpServletRequest httpServReq = (HttpServletRequest)servletRequest;
        System.out.println(httpServReq.getMethod() + " - " + httpServReq.getRequestURL() + " - " + time + " nanoseconds");
    }

    @Override
    public void destroy() {
    }
}
