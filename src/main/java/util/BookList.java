package util;

import model.Bookmark;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.ArrayList;

/**
 * Created by syn on 2015-12-2.
 */
public class BookList {
    public static final ArrayList<Bookmark> booklist;
    public static final JSONArray js;
    public static String path;
    private static BookList BL;

    private BookList() {
        this.path = this.getClass().getClassLoader().getResource("/").getPath() + "bookmarks.json";
    }

    static {
        BL = new BookList();
        js = FileParse.toJson(path);
        booklist = new ArrayList<>();
        for (int i = 0; i < js.size(); i++) {
            JSONObject temp = js.getJSONObject(i);
            booklist.add((Bookmark) JSONObject.toBean(temp, Bookmark.class));
        }
        System.out.println(booklist.get(0).getCreated());
    }

    public static BookList getBookListInstance() {
        return BL;
    }

    public boolean delete(String title) {
        for (Bookmark temp : booklist) {
            if (temp.getTitle().contains(title)) {
                booklist.remove(temp);
                FileParse.WriteFile(path,booklist);
                return true;
            }
        }
        return false;
    }

    public boolean add(String title, String created,String url) {
        Bookmark temp = new Bookmark();
        temp.setTitle(title);
        temp.setCreated(created);
        temp.setUrl(url);
        booklist.add(temp);
        FileParse.WriteFile(path,booklist);
        return true;
    }
}
