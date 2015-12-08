package util;

import java.io.*;
import java.util.ArrayList;

import net.sf.json.JSONArray;

/**
 * Created by syn on 2015-12-1.
 */
public class FileParse {
    public static String ReadFile(String path) {
        String result = "";
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(path), "UTF-8"));

            String temp;
            while ((temp = br.readLine()) != null) {
                result += temp;
            }
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }
    public static JSONArray toJson(String path) {
        String JsonContext = ReadFile(path);
        JSONArray jsString = JSONArray.fromObject(JsonContext);
        return jsString;
    }

    public static void WriteFile(String path, ArrayList list){
        File file =new File(path);
        try {
//            FileWriter fileWritter = new FileWriter(file.getName());
//            BufferedWriter bufferWritter = new BufferedWriter(fileWritter);
//            bufferWritter.write(JSONArray.fromObject(list).toString());
//            bufferWritter.flush();
//            bufferWritter.close();
            PrintWriter out=new PrintWriter(file,"UTF-8");
            out.println(JSONArray.fromObject(list).toString());
            out.flush();
            out.close();
        }
        catch (IOException e){
            e.printStackTrace();
        }
    }
}
