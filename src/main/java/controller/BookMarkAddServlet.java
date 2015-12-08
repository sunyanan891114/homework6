package controller;

import util.BookList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by syn on 2015-12-4.
 */
@WebServlet("/add")
public class BookMarkAddServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String title = req.getParameter("title");
        String date = req.getParameter("created");
        String url = req.getParameter("url");
        BookList.getBookListInstance().add(title, date, url);
        resp.getWriter().write("true");
    }
}
