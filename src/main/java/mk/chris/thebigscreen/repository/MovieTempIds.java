package mk.chris.thebigscreen.repository;

import mk.chris.thebigscreen.domain.Movie;
import mk.chris.thebigscreen.domain.People;
import mk.chris.thebigscreen.domain.enumeration.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.*;
import java.util.LinkedHashSet;
import java.util.List;

@Component
public class MovieTempIds {

    JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource){
        jdbcTemplate = new JdbcTemplate(dataSource);
    }


    public LinkedHashSet<Integer> getIdsNotSaved(final List<Integer> ids){

        SingleConnectionDataSource scds = null;
        try {
            scds = new SingleConnectionDataSource(jdbcTemplate.getDataSource().getConnection(),true);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        JdbcTemplate scdsJdbcTemplate = null;
        LinkedHashSet<Integer> notFoundIds;
        try {
            scdsJdbcTemplate = new JdbcTemplate(scds);

            scdsJdbcTemplate.execute("create local temporary table movie_ids(id long)");
            scdsJdbcTemplate.batchUpdate("insert into movie_ids(id) values(?)",
                new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, ids.get(i).longValue());
                    }

                    @Override
                    public int getBatchSize() {
                        return ids.size();
                    }
                });
            notFoundIds = new LinkedHashSet<Integer>(scdsJdbcTemplate
                .query("select id from movie_ids " +
                        "where id not in (select id from movies)",
                    new IdMapper()
                ));
        }finally {
            if (scdsJdbcTemplate != null) {
                scdsJdbcTemplate.execute("drop table if exists movie_ids");
            }
            if (scds != null) {
                scds.destroy();
            }
        }
        return notFoundIds;
    }

    public LinkedHashSet<Movie> getMoviesByIds(final List<Integer> ids){

        SingleConnectionDataSource scds = null;
        try {
            scds = new SingleConnectionDataSource(jdbcTemplate.getDataSource().getConnection(),true);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        JdbcTemplate scdsJdbcTemplate = null;
        LinkedHashSet<Movie> moviesSet;
        try {
            scdsJdbcTemplate = new JdbcTemplate(scds);

            scdsJdbcTemplate.execute("create local temporary table movie_ids(id long)");
            scdsJdbcTemplate.batchUpdate("insert into movie_ids(id) values(?)",
                new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, ids.get(i).longValue());
                    }

                    @Override
                    public int getBatchSize() {
                        return ids.size();
                    }
                });
            moviesSet = new LinkedHashSet<Movie>(scdsJdbcTemplate
                .query("select id, imdb_id, backdrop_path, poster_path, original_title," +
                        "title, original_language, vote_average, popularity, vote_count, budget " +
                        "runtime, revenue, release_date, overview, status " +
                        "from movies " +
                        "where id in (select id from movie_ids)",
                    new MovieMapper()
                ));
        }finally {
            if (scdsJdbcTemplate != null) {
                scdsJdbcTemplate.execute("drop table if exists movie_ids");
            }
            if (scds != null) {
                scds.destroy();
            }
        }
        return moviesSet;
    }

    public class IdMapper implements RowMapper {
        @Override
        public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
            return Math.toIntExact(rs.getLong(1));
        }
    }

    public class MovieMapper implements RowMapper{
        @Override
        public Movie mapRow(ResultSet rs, int rowNum) throws SQLException {
            Movie movie = new Movie();
            movie.setId(rs.getLong(1));
            movie.setImdbId(rs.getString(2));
            movie.setBackdropPath(rs.getString(3));
            movie.setPosterPath(rs.getString(4));
            movie.setOriginalTitle(rs.getString(5));
            movie.setTitle(rs.getString(6));
            movie.setOriginalLanguage(rs.getString(7));
            movie.setVoteAverage(rs.getFloat(8));
            movie.setPopularity(rs.getFloat(9));
            movie.setVoteCount(rs.getLong(10));
            movie.setBudget(rs.getLong(11));
            movie.setRuntime(rs.getInt(12));
            movie.setRevenue(rs.getLong(13));

            Date releaseDate = rs.getDate(14);
            movie.setReleaseDate(releaseDate != null? releaseDate.toLocalDate() : null);

            Clob clob = rs.getClob(15);
            movie.setOverview(clob != null? clob.getSubString(1, (int)clob.length()): null);

            String status = rs.getString(16);
            movie.setStatus(Status.valueOf(status));

            return movie;
        }
    }
}
