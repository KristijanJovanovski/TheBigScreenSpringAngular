package mk.chris.thebigscreen.web.rest;

import com.codahale.metrics.annotation.Timed;
import mk.chris.thebigscreen.security.AuthoritiesConstants;
import mk.chris.thebigscreen.service.DatabaseSyncService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/database")
public class DatabaseController {


    private final DatabaseSyncService databaseSyncService;

    public DatabaseController(
        DatabaseSyncService databaseSyncService
    ){
        this.databaseSyncService = databaseSyncService;
    }

    /**
     * POST  /seed : Seeds the database.
     *
     */
//    @Timed
    @PostMapping("/seed")
    @Secured(AuthoritiesConstants.ADMIN)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void seedDatabase() {
        databaseSyncService.seedDatabase();
    }


}
