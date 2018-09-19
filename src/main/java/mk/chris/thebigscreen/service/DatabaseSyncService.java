package mk.chris.thebigscreen.service;

import org.springframework.scheduling.annotation.Scheduled;

public interface DatabaseSyncService {

    void seedDatabase();

    @Scheduled(cron = "0 0 6 * * ?")
    void updateDatabase();
}
