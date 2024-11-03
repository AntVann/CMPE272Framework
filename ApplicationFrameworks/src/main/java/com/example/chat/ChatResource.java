package com.example.chat;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("/chat")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ChatResource {
    private final List<Message> messages = new ArrayList<>();

    @GET
    public Response getMessages() {
        return Response.ok(messages)
                      .header("Access-Control-Allow-Origin", "http://localhost:3000")
                      .header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
                      .header("Access-Control-Allow-Headers", "Content-Type")
                      .build();
    }

    @POST
    public Response postMessage(Message message) {
        messages.add(message);
        return Response.ok()
                      .header("Access-Control-Allow-Origin", "http://localhost:3000")
                      .header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
                      .header("Access-Control-Allow-Headers", "Content-Type")
                      .build();
    }

    @OPTIONS
    public Response preflight() {
        return Response.ok()
                      .header("Access-Control-Allow-Origin", "http://localhost:3000")
                      .header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
                      .header("Access-Control-Allow-Headers", "Content-Type")
                      .build();
    }
}
