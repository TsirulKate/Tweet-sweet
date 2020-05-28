package users;

import JSONDecorator.JSONDecorator;

public class User {
    private String userID;
    private String username;
    private String password;

    public String getUserID() {
        return userID;
    }

    public String getUsername() {
        return username;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String toString() {
        return new String("userID: " + this.getUserID() + '\n' + "username: " + this.getUsername() + '\n' + "password: " + this.getPassword() + "\n\n");
    }

    public String toJson() {
        return JSONDecorator.getGson().toJson(this);
    }

    public static User fromJson(String json) {
        return JSONDecorator.getGson().fromJson(json, User.class);
    }
}
