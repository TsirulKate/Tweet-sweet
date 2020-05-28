package users;

import org.apache.commons.codec.digest.DigestUtils;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class UserCollection {

    private static HashMap<String, User> users = new HashMap<>();
    public static int availableId = 2;

    public static String getHash(String password) {
        return new DigestUtils("SHA-256").digestAsHex(password);
    }

    public static boolean isHashEqual(String password, String passwordHash) {
        String passwordForCheck = new DigestUtils("SHA-256").digestAsHex(password);
        return passwordForCheck.equals(passwordHash);
    }

    public static String hasUser(String username) {
        List<User> usersForSearching = getAllUsers();
        for (User user : usersForSearching) {
            if (username.equals(user.getUsername())) {
                return user.getPassword();
            }
        }
        return null;
    }

    public static List<User> getAllUsers() {
        return new ArrayList<>(users.values());
    }

    private static boolean validateUser(User user) {
        try {
            return Stream.of(user.getUserID(), user.getUsername(), user.getPassword())
                    .allMatch(Objects::nonNull)
                    && Integer.parseInt(user.getUserID()) >= 0;
        } catch (NumberFormatException nfe) {
            return false;
        }
    }

    public static boolean addUser(User user) {
        if (user == null) {
            return false;
        } else if (!validateUser(user)) {
            return false;
        } else {
            availableId++;
            users.put(user.getUserID(), user);
            return true;
        }
    }

    public static Optional<User> getUserByName(String username) {
        if (username != null) {
            return users.values().stream().filter(i -> i.getUsername().equals(username)).findFirst();
        } else {
            return Optional.empty();
        }
    }

    public static Optional<User> getUserByID(String userID) {
        if (Integer.parseInt(userID) > 0) {
            return Optional.ofNullable(users.get(userID));
        } else {
            return Optional.empty();
        }
    }
}
