package mk.chris.thebigscreen.service.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Instant;

public class HttpDownloadUtil {
    private static final int BUFFER_SIZE = 4096;

    private final static Logger log = LoggerFactory.getLogger(HttpDownloadUtil.class);


    /**
     * Downloads a file from a URL
     *
     * @param fileURL HTTP URL of the file to be downloaded
     * @param saveDir path of the directory to save the file
     * @throws IOException
     */
    public static String downloadFile(String fileURL, String saveDir) throws IOException {
        log.debug("Downloading file: {}", fileURL);
        URL url = new URL(fileURL);

        HttpURLConnection httpConn = null;
        // opens input stream from the HTTP connection
        InputStream inputStream = null;

        // opens an output stream to save into file
        FileOutputStream outputStream = null;
        try {
            httpConn = (HttpURLConnection) url.openConnection();

            int responseCode = httpConn.getResponseCode();

            // always check HTTP response code first
            if (responseCode == HttpURLConnection.HTTP_OK) {
                String fileName = "";
                String disposition = httpConn.getHeaderField("Content-Disposition");
                String contentType = httpConn.getContentType();
                int contentLength = httpConn.getContentLength();

                if (disposition != null) {
                    // extracts file name from header field
                    int index = disposition.indexOf("filename=");
                    if (index > 0) {
                        fileName = disposition.substring(index + 10,
                            disposition.length() - 1);
                    }
                } else {
                    // extracts file name from URL
                    fileName = fileURL.substring(fileURL.lastIndexOf("/") + 1,
                        fileURL.length());
                }

                log.debug("Content-Type:  {}", contentType);
                log.debug("Content-Disposition:  {}", disposition);
                log.debug("Content-Length:  {}", contentLength);
                log.debug("fileName:  {}", fileName);


                String saveFilePath = saveDir + File.separator + fileName;

                if(new File(saveFilePath).exists()){
                    return saveFilePath;
                }

                inputStream = httpConn.getInputStream();
                outputStream = new FileOutputStream(saveFilePath);

                Instant downloadStartedTime = Instant.now();
                log.debug("Downloading file started at: {}", downloadStartedTime);

                int bytesRead = -1;
                byte[] buffer = new byte[BUFFER_SIZE];
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytesRead);
                }

                Instant endDownloadTime = Instant.now();
                log.debug("File path: ", saveFilePath);
                log.debug("File downloaded at: {}", endDownloadTime);
                log.debug("Total time: {}", endDownloadTime.minusMillis(downloadStartedTime.toEpochMilli()));
                return saveFilePath;
            } else {
                log.debug("No file to download. Server replied HTTP code: {}", responseCode);
                return null;
            }
        } finally {
            if (inputStream != null) {
                inputStream.close();
            }
            if (outputStream != null) {
                outputStream.close();
            }
            if (httpConn != null) {
                httpConn.disconnect();
            }
        }
    }
}
