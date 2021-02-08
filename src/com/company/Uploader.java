package com.company;

public class Uploader extends Thread{
    public Server server;
    public int own = 0;

    public Uploader(Server server) {
        this.server = server;
    }

    public void run() {
        for (int i = 0; i < 6; i++) {
            server.upload(own);
//            if (own == 500) {
//                try {
//                    sleep(1000000);
//                } catch (InterruptedException e) {
//                    e.printStackTrace();
//                }
            }
        }
    }
