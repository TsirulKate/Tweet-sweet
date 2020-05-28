class LogService {

    async init() {
        await fetch("/initUsers")
    }

    async authentication(username, password) {
        let response = await fetch(`/users`, {
            method: "post",
            body: JSON.stringify({username: username, password: password})
        });
        if (response.status === 401) {
            throw new Error("WRONG PASSWORD");
        }
        if (response.status === 404) {
            throw new Error("NO USER");
        }

        let json = await response.json();
        return json;
    }

    async checkLogin() {
        const response = await fetch('/users');
        if (response.status >= 400) {
            return null;
        }

        return response.json();
    }

    logout() {
        return fetch('/logout', {
            method: "post"
        });
    }
}

