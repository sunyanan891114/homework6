import org.junit.Test;
import util.StringParse;

/**
 * Created by syn on 2015-12-1.
 */
public class StringTest {
    @Test
    public void testDate(){
        StringParse sp = new StringParse();
        System.out.println(sp.stringToDate("445555555"));
    }
}
