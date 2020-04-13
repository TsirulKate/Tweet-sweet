package servletsForPosts;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import net.dongliu.gson.GsonJava8TypeAdapterFactory;

public class WorkWithJSON {
    static Gson gson;

    WorkWithJSON(){
        gson = new GsonBuilder().registerTypeAdapterFactory(new GsonJava8TypeAdapterFactory()).create();
    }

    public static Gson getGson() {
        return gson;
    }

    public String toJson(Object element){
        return gson.toJson(element);
    }

    public String toJson(JsonElement element){
        return gson.toJson(element);
    }

}
