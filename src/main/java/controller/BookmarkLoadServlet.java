package controller;

import net.sf.json.JSONArray;
import util.BookList;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by syn on 2015-12-1.
 */
@WebServlet("/show")
public class BookmarkLoadServlet extends HttpServlet {


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException, ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
        resp.getWriter().write(JSONArray.fromObject(BookList.getBookListInstance().booklist).toString());
    }
}
