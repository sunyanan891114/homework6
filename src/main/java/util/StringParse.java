package util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by syn on 2015-12-1.
 */
public class StringParse {
    public static Date stringToDate(String s){
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Long time = Long.parseLong(s);
        String date = df.format(time);
        System.out.println(date);
        Date d;
        try{
            d = df.parse(date);
            System.out.println(d);
            return d;
        }catch (ParseException e){
            e.printStackTrace();
        }
        return null;
    }
}
