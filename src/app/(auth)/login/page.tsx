import { ModeToggle } from "@/components/darkmode";
import React from "react";

const LoginPage = () => {
    return (
        <main>
            \
            <ModeToggle />
            <h1>Login</h1>
            <form>
                <label>
                    Username
                    <input type="text" />
                </label>
                <label>
                    Password
                    <input type="password" />
                </label>
                <button type="submit">Login</button>
            </form>
        </main>
    );
};

export default LoginPage;
