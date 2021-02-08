package com.company;

public class Downloader extends Thread {
    public Server server;

    public Downloader(Server server) {
        this.server = server;
    }

    public void run() {
        for (int i = 0; i < 6; i++) {
        server.download();
        }
    }
}
