import App from "./App";
import config from "./config/server.config";

class Index {
    private application: App;

    constructor() {
        this.application = new App(config);
    }

    public Main() {
        try {
            this.application.Listen();
        } catch (error) {
            throw error;
        }
    }
}

const index: Index = new Index();
index.Main();