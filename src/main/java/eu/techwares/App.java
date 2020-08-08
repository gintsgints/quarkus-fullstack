package eu.techwares;

import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.info.Info;

import javax.ws.rs.core.Application;

@OpenAPIDefinition(info = @Info(title="Quarkus fullstack api", version = "1.0.0"))
public class App extends Application {
}
