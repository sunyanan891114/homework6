package controller;

import util.BookList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by syn on 2015-12-2.
 */
@WebServlet("/delete")
public class BookMarkDeleteServlet extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String title = req.getParameter("title");
        boolean flag = BookList.getBookListInstance().delete(title);
        resp.getWriter().write(String.valueOf(flag));
    }
}
