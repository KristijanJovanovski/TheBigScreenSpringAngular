package mk.chris.thebigscreen.service.util;

import com.google.common.base.Charsets;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.nio.file.Files;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.AbstractMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import java.util.zip.GZIPInputStream;

public class FileUtils {

    private static final Logger log = LoggerFactory.getLogger(FileUtils.class);
    private static String dateFormat = "MM_DD_YYYY";


    public static TreeSet<Integer> getIdsFromFile(String fileUrl){
        Instant startIdsTime = Instant.now();
        log.debug("Started getting ids at: {}", startIdsTime);
        log.debug("Started getting ids from file: {}", fileUrl);
        TreeSet<Integer> idsSet = new TreeSet<>(Integer::compare);
        try{
            List<String> lines = Files.readAllLines(new File(fileUrl).toPath(),Charsets.UTF_8);
            log.debug("Read {} lines into memory", lines.size());
            for(String line : lines){
                Boolean adult = Boolean.valueOf(line
                    .split(",")[0]
                    .split(":")[1]
                );
                Integer id = Integer.valueOf(line
                    .split(",")[1]
                    .split(":")[1]);

                if(!adult){
                    idsSet.add(id);
                }
            }
        } catch (IOException | NumberFormatException  e) {
            e.printStackTrace();
        }
        Instant endIdsTime = Instant.now();
        log.debug("Extracted {} ids.", idsSet.size());
        log.debug("Finished getting ids at: {}", endIdsTime);
        log.debug("Total time: {} milli.", endIdsTime.toEpochMilli() - startIdsTime.toEpochMilli());

        return idsSet;
    }

    public static TreeSet<Map.Entry<Integer,Float>> getIdsAndPopularityFromFile(String fileUrl){
        Instant startIdsTime = Instant.now();
        log.debug("Started getting ids and popularity at: {}", startIdsTime);
        log.debug("Started getting ids and popularity from file: {}", fileUrl);
        TreeSet<Map.Entry<Integer,Float>> idPopularitySet = new TreeSet<>(Map.Entry.comparingByKey());

        try {
            List<String> lines = Files.readAllLines(new File(fileUrl).toPath(),Charsets.UTF_8);

            for(String line : lines){
                Boolean adult = Boolean.valueOf(line
                    .split(",")[0]
                    .split(":")[1]
                );
                Integer id = Integer.valueOf(line
                    .split(",")[1]
                    .split(":")[1]);
                Float popularity = Float.valueOf(line
                    .split(",")[3]
                    .split(":")[1]);

                if(!adult){
                    idPopularitySet.add(new AbstractMap.SimpleEntry<>(id, popularity));
                }
            }
        } catch (IOException | NumberFormatException e) {
            e.printStackTrace();
        }
        Instant endIdsTime = Instant.now();

        log.debug("Extracted {} ids and popularity pairs.", idPopularitySet.size());
        log.debug("Finished getting ids and popularity at: {}", endIdsTime);
        log.debug("Total time: {} milli.", endIdsTime.toEpochMilli() - startIdsTime.toEpochMilli());

        return idPopularitySet;
    }

    public static String decompressFile(String fileUrl){
        Instant startDecompressTime = Instant.now();
        log.debug("Started decompressing at: {}", startDecompressTime);
        log.debug("Started decompressing from file: {}", fileUrl);

        String newFileUrl = fileUrl.replace(".gz","");
        if(new File(newFileUrl).exists()){
            log.debug("File already exists ");
            Instant endDecompressTime = Instant.now();
            log.debug("Finished decompressing at: {}", endDecompressTime);
            log.debug("Total time: {} milli", endDecompressTime.toEpochMilli() - startDecompressTime.toEpochMilli());
            return newFileUrl;
        }
        try (
            FileInputStream fis = new FileInputStream(fileUrl);
            GZIPInputStream gis = new GZIPInputStream(fis);
            FileOutputStream fos = new FileOutputStream(newFileUrl)
        ){
            byte[] buffer = new byte[1024];
            int len;
            while((len = gis.read(buffer)) != -1){
                fos.write(buffer, 0, len);
            }
            Instant endDecompressTime = Instant.now();
            log.debug("Finished decompressing at: {}", endDecompressTime);
            log.debug("Total time: {} milli", endDecompressTime.toEpochMilli() - startDecompressTime.toEpochMilli());
            return newFileUrl;
        } catch (IOException e) {
            e.printStackTrace();
        }
        log.debug("Couldn't decompress file!");
        return null;
    }

    public static String downloadFile(String saveDir, String url){
        try {
            return HttpDownloadUtil.downloadFile(url, saveDir);
        }catch (IOException ex){
            log.debug("IOException caught: {}",ex.getMessage());
        }
        return null;
    }

    public static String getFileName(String url, LocalDate date) {
        return url.replace(dateFormat, DateTimeFormatter.ofPattern("MM_dd_uuuu").format(date));
    }
}
