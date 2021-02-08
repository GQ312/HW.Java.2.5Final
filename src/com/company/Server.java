package com.company;

public class Server {
    private int downloadFile;

    public synchronized void download() {
        while (downloadFile != 0) {
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        downloadFile += 500;
        notify();
        System.out.println("New file is download!");
    }

    public synchronized int upload(int num) {
        while (downloadFile == 0) {
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        downloadFile -= 100;
        num += 100;
        notify();
        if (num > 500) {
            System.out.println("File have download!");}
//        } else {
//            System.out.println("Download is empty!");
//        }
        return num;
    }

}
