package com.company;

public class Main {

    public static void main(String[] args) {

        Server server = new Server();
        Downloader downloader = new Downloader(server);
        Uploader uploader = new Uploader(server);
        downloader.start();
        uploader.start();

    }
}
