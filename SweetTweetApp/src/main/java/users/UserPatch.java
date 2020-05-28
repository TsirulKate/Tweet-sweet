package users;

import JSONDecorator.JSONDecorator;

public class UserPatch {
    private String username;
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public static UserPatch fromJson(String json) {
        return JSONDecorator.getGson().fromJson(json, UserPatch.class);
    }
}
