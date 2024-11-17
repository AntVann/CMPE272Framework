package com.example.chat;

import io.dropwizard.Application;
import io.dropwizard.setup.Environment;

public class ChatApp extends Application<ApplicationConfiguration> {
    public static void main(String[] args) throws Exception {
        new ChatApp().run(args);
    }

    @Override
    public void run(ApplicationConfiguration configuration, Environment environment) {
        final ChatResource resource = new ChatResource();
        environment.jersey().register(resource);
    }
}
